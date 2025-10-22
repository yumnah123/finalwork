import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Fetch pricing data
export async function GET() {
  try {
    const pricing = await prisma.pricing.findFirst();

    if (!pricing) {
      return NextResponse.json({ error: "No pricing found" }, { status: 404 });
    }

    // Restructure db data to match frontend format
    const formattedData = {
      baseFare: { default: pricing.baseFareDefault },
      costPerMile: pricing.costPerMile,
      costPerMinuteWaiting: pricing.costPerMinuteWaiting,
      surgeRules: {
        weekdayPeakPercentage: pricing.weekdayPeakPercentage,
        saturdayPercentage: pricing.saturdayPercentage,
        sundayPercentage: pricing.sundayPercentage,
      },
      peakHours: {
        start: pricing.peakStartHour,
        end: pricing.peakEndHour,
        eveningStart: pricing.eveningStartHour,
        eveningEnd: pricing.eveningEndHour,
      },
    };

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("GET /api/pricing error:", error);
    return NextResponse.json({ error: "Failed to fetch pricing" }, { status: 500 });
  }
}

//  Update pricing data
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const updated = await prisma.pricing.updateMany({
      data: {
        baseFareDefault: body.baseFare.default,
        costPerMile: body.costPerMile,
        costPerMinuteWaiting: body.costPerMinuteWaiting,
        weekdayPeakPercentage: body.surgeRules.weekdayPeakPercentage,
        saturdayPercentage: body.surgeRules.saturdayPercentage,
        sundayPercentage: body.surgeRules.sundayPercentage,
        peakStartHour: body.peakHours.start,
        peakEndHour: body.peakHours.end,
        eveningStartHour: body.peakHours.eveningStart,
        eveningEndHour: body.peakHours.eveningEnd,
      },
    });

    return NextResponse.json({
      message: "Pricing updated successfully",
      updated,
    });
  } catch (error) {
    console.error("PUT /api/pricing error:", error);
    return NextResponse.json({ error: "Failed to update pricing" }, { status: 500 });
  }
}
