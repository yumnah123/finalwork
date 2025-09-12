export interface PricingConfig {
  baseFare: {
    [key: string]: number;
  };
  costPerMile: number;
  costPerMinuteWaiting: number;
  surgeRules: {
    weekdayPeakPercentage: number; // Additional percentage during weekday peak hours (7-9 AM, 5-7 PM)
    saturdayPercentage: number; // Additional percentage on Saturdays
    sundayPercentage: number; // Additional percentage on Sundays
  };
  peakHours: {
    start: number; // 24-hour format (e.g., 7 for 7 AM)
    end: number; // 24-hour format (e.g., 9 for 9 AM)
    eveningStart: number; // 24-hour format (e.g., 17 for 5 PM)
    eveningEnd: number; // 24-hour format (e.g., 19 for 7 PM)
  };
}

export const pricingConfig: PricingConfig = {
  baseFare: {
    "Airport Transfer": 25.0,
    "Corporate Travel": 30.0,
    "Wedding Cars": 45.0,
    "Business & Social Events": 35.0,
    "Select Service": 20.0, // Default service
  },
  costPerMile: 2.5,
  costPerMinuteWaiting: 0.8,
  surgeRules: {
    weekdayPeakPercentage: 20, // 20% increase during peak hours on weekdays
    saturdayPercentage: 15, // 15% increase on Saturdays
    sundayPercentage: 10, // 10% increase on Sundays
  },
  peakHours: {
    start: 7, // 7 AM
    end: 9, // 9 AM
    eveningStart: 17, // 5 PM
    eveningEnd: 19, // 7 PM
  },
};

export interface QuoteBreakdown {
  baseFare: number;
  distanceCost: number;
  waitingTimeCost: number;
  surgeMultiplier: number;
  surgeAmount: number;
  subtotal: number;
  total: number;
  distance: number;
  estimatedDuration: number;
  serviceType: string;
  validUntil: Date;
}