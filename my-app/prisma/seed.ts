import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Seed Superadmin 1
  const hashedPassword1 = bcrypt.hashSync("hello12345&A", 10);

  const superadmin1 = await prisma.admin.upsert({
    where: { email: "areebaahmed314@gmail.com" },
    update: {},
    create: {
      name: "Areeba Ahmed",
      email: "areebaahmed314@gmail.com",
      password: hashedPassword1,
      role: "superadmin",
    },
  });

  console.log("Superadmin 1 created:", superadmin1);

  // Seed Superadmin 2
  const hashedPassword2 = bcrypt.hashSync("Admin12345&", 10);

  const superadmin2 = await prisma.admin.upsert({
    where: { email: "baigannas9@gmail.com" },
    update: {},
    create: {
      name: "Talha",
      email: "baigannas9@gmail.com",
      password: hashedPassword2,
      role: "superadmin",
    },
  });

  console.log("Superadmin 2 created:", superadmin2);

  // Seed Pricing Data (only if not already seeded)
  const existingPricing = await prisma.pricing.findFirst();

  if (!existingPricing) {
    const pricing = await prisma.pricing.create({
      data: {
        baseFareDefault: 25.0,
        costPerMile: 2.5,
        costPerMinuteWaiting: 0.8,
        weekdayPeakPercentage: 20,
        saturdayPercentage: 15,
        sundayPercentage: 10,
        peakStartHour: 7,
        peakEndHour: 9,
        eveningStartHour: 17,
        eveningEndHour: 19,
      },
    });

    console.log("Pricing seeded:", pricing);
  } else {
    console.log("Pricing already exists, skipping seeding.");
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error("Error while seeding:", err);
    prisma.$disconnect();
    process.exit(1);
  });
