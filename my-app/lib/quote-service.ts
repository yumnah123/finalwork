import { pricingConfig, QuoteBreakdown } from './pricing-config';
import { AddressResult } from '../hooks/useAddressAutocomplete';

export interface RouteData {
  distance: number; // in kilometers
  duration: number; // in seconds
}

export class QuoteService {
  private static readonly OPENROUTE_SERVICE_API = 'https://api.openrouteservice.org/v2';
  
  // You can get a free API key from https://openrouteservice.org/dev/#/signup
  // For demo purposes, we'll use a fallback calculation if no API key is provided
  private static readonly API_KEY = process.env.NEXT_PUBLIC_OPENROUTE_API_KEY;

  static async getRouteData(
    pickup: AddressResult,
    dropoff: AddressResult
  ): Promise<RouteData> {
    if (!this.API_KEY) {
      // Fallback to simple distance calculation using Haversine formula
      return this.calculateFallbackRoute(pickup, dropoff);
    }

    try {
      const response = await fetch(
        `${this.OPENROUTE_SERVICE_API}/directions/driving-car?` +
          new URLSearchParams({
            api_key: this.API_KEY,
            start: `${pickup.lon},${pickup.lat}`,
            end: `${dropoff.lon},${dropoff.lat}`,
          })
      );

      if (!response.ok) {
        console.warn('OpenRouteService API failed, using fallback calculation');
        return this.calculateFallbackRoute(pickup, dropoff);
      }

      const data = await response.json();
      const route = data.features[0];
      const distance = route.properties.summary.distance / 1000; // Convert meters to kilometers
      const duration = route.properties.summary.duration; // Already in seconds

      return { distance, duration };
    } catch (error) {
      console.error('Error fetching route data:', error);
      return this.calculateFallbackRoute(pickup, dropoff);
    }
  }

  private static calculateFallbackRoute(
    pickup: AddressResult,
    dropoff: AddressResult
  ): RouteData {
    // Haversine formula for distance calculation
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRad(parseFloat(dropoff.lat) - parseFloat(pickup.lat));
    const dLon = this.toRad(parseFloat(dropoff.lon) - parseFloat(pickup.lon));
    
    const lat1 = this.toRad(parseFloat(pickup.lat));
    const lat2 = this.toRad(parseFloat(dropoff.lat));

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers

    // Estimate duration: average speed of 50 km/h in urban areas
    const duration = (distance / 50) * 3600; // Convert hours to seconds

    return { distance, duration };
  }

  private static toRad(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  static calculateQuote(
    pickup: AddressResult,
    dropoff: AddressResult,
    routeData: RouteData,
    serviceType: string,
    selectedDate: Date,
  ): QuoteBreakdown {
    const baseFare = pricingConfig.baseFare[serviceType] || pricingConfig.baseFare["Select Service"];
    const distanceCost = routeData.distance * pricingConfig.costPerMile * 0.621371; // Convert km to miles
    
    // Estimate waiting time based on service type (in minutes)
    const estimatedWaitingTime = this.getEstimatedWaitingTime(serviceType);
    const waitingTimeCost = estimatedWaitingTime * pricingConfig.costPerMinuteWaiting;

    // Calculate surge multiplier
    const surgeMultiplier = this.calculateSurgeMultiplier(selectedDate);
    const subtotal = baseFare + distanceCost + waitingTimeCost;
    const surgeAmount = subtotal * (surgeMultiplier / 100);
    const total = subtotal + surgeAmount;

    // Quote valid for 30 minutes
    const validUntil = new Date(Date.now() + 30 * 60 * 1000);

    return {
      baseFare,
      distanceCost,
      waitingTimeCost,
      surgeMultiplier,
      surgeAmount,
      subtotal,
      total,
      distance: routeData.distance,
      estimatedDuration: routeData.duration,
      serviceType,
      validUntil,
    };
  }

  private static getEstimatedWaitingTime(serviceType: string): number {
    const waitingTimes: { [key: string]: number } = {
      "Airport Transfer": 15, // 15 minutes waiting time
      "Corporate Travel": 5,  // 5 minutes waiting time
      "Wedding Cars": 30,     // 30 minutes waiting time
      "Business & Social Events": 20, // 20 minutes waiting time
      "Select Service": 10,   // 10 minutes waiting time
    };
    
    return waitingTimes[serviceType] || waitingTimes["Select Service"];
  }

  private static calculateSurgeMultiplier(selectedDate: Date): number {
    const dayOfWeek = selectedDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
    // const hour = parseInt(selectedTime.split(':')[0]);

    // Sunday surge
    if (dayOfWeek === 0) {
      return pricingConfig.surgeRules.sundayPercentage;
    }

    // Saturday surge
    if (dayOfWeek === 6) {
      return pricingConfig.surgeRules.saturdayPercentage;
    }

    // Weekday peak hours surge (Monday to Friday)
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      // const isPeakHour =
      //   (hour >= pricingConfig.peakHours.start && hour < pricingConfig.peakHours.end) ||
      //   (hour >= pricingConfig.peakHours.eveningStart && hour < pricingConfig.peakHours.eveningEnd);

      // if (isPeakHour) {
        return pricingConfig.surgeRules.weekdayPeakPercentage;
      // }
    }

    return 0; // No surge
  }

  static async generateQuote(
    pickup: AddressResult,
    dropoff: AddressResult,
    serviceType: string,
    selectedDate: Date,
  ): Promise<QuoteBreakdown> {
    const routeData = await this.getRouteData(pickup, dropoff);
    return this.calculateQuote(pickup, dropoff, routeData, serviceType, selectedDate);
  }
}