import { AddressResult } from "../hooks/useAddressAutocomplete";
import { PricingConfig,QuoteBreakdown } from "./pricing-config";

export interface RouteData {
  distance: number;
  duration: number;
}

export class QuoteService {
  private static readonly OPENROUTE_SERVICE_API = "https://api.openrouteservice.org/v2";

  // You can get a free API key from https://openrouteservice.org/dev/#/signup
  // For demo purposes, we'll use a fallback calculation if no API key is provided
  private static readonly API_KEY = process.env.NEXT_PUBLIC_OPENROUTE_API_KEY;

  // Fetch Pricing Config dynamically( So we can change in future through admin panel)
  private static async getPricingConfig(): Promise<PricingConfig> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/pricing`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch pricing data");
    return res.json();
  }

  static async getRouteData(
    pickup: AddressResult,
    dropoff: AddressResult
  ): Promise<RouteData> {
    if (!this.API_KEY) {
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
        console.warn("OpenRouteService API failed, using fallback calculation");
        return this.calculateFallbackRoute(pickup, dropoff);
      }

      const data = await response.json();
      const route = data.features[0];
      const distance = route.properties.summary.distance / 1000; // meters → km
      const duration = route.properties.summary.duration; // seconds
      return { distance, duration };
    } catch (error) {
      console.error("Error fetching route data:", error);
      return this.calculateFallbackRoute(pickup, dropoff);
    }
  }

  private static calculateFallbackRoute(
    pickup: AddressResult,
    dropoff: AddressResult
  ): RouteData {
    const R = 6371;
    const dLat = this.toRad(parseFloat(dropoff.lat) - parseFloat(pickup.lat));
    const dLon = this.toRad(parseFloat(dropoff.lon) - parseFloat(pickup.lon));

    const lat1 = this.toRad(parseFloat(pickup.lat));
    const lat2 = this.toRad(parseFloat(dropoff.lat));

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    const duration = (distance / 50) * 3600;
    return { distance, duration };
  }

  private static toRad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  // Use fetched pricing config in calculations
  static async calculateQuote(
    pickup: AddressResult,
    dropoff: AddressResult,
    routeData: RouteData,
    selectedDate: Date
  ): Promise<QuoteBreakdown> {
    const config = await this.getPricingConfig(); // ✅ dynamic fetch

    const baseFare = config.baseFare.default;
    const distanceCost = routeData.distance * config.costPerMile * 0.621371;
    
     // Standard waiting time (10 minutes)
    const estimatedWaitingTime = 10;
    const waitingTimeCost = estimatedWaitingTime * config.costPerMinuteWaiting;

    // Calculate surge multiplier
    const surgeMultiplier = this.calculateSurgeMultiplier(selectedDate, config);
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
      validUntil,
    };
  }

  private static calculateSurgeMultiplier(
    selectedDate: Date,
    config: PricingConfig
  ): number {
    const day = selectedDate.getDay();
    if (day === 0) return config.surgeRules.sundayPercentage;
    if (day === 6) return config.surgeRules.saturdayPercentage;
    if (day >= 1 && day <= 5) return config.surgeRules.weekdayPeakPercentage;
    return 0;
  }

  
  static async generateQuote(
    pickup: AddressResult,
    dropoff: AddressResult,
    selectedDate: Date
  ): Promise<QuoteBreakdown> {
    const routeData = await this.getRouteData(pickup, dropoff);
    return this.calculateQuote(pickup, dropoff, routeData, selectedDate);
  }
}
