-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "password" TEXT,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pricing" (
    "id" TEXT NOT NULL,
    "serviceName" TEXT NOT NULL DEFAULT '',
    "price" INTEGER,
    "description" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Pricing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactPage" (
    "id" TEXT NOT NULL,
    "bookingService" TEXT NOT NULL DEFAULT '24/7 Available',
    "phoneSupport" TEXT NOT NULL DEFAULT '24/7 Available',
    "officeHours" TEXT NOT NULL DEFAULT 'Mon-Fri: 8:00-18:00',
    "weekendOffice" TEXT NOT NULL DEFAULT 'Sat-Sun: 9:00-17:00',
    "emergencyService" TEXT NOT NULL DEFAULT '24/7 Available',
    "note" TEXT NOT NULL DEFAULT 'Our vehicles operate 24/7, including weekends and holidays. Emergency bookings and urgent requests are always accommodated.',
    "faqs" JSONB DEFAULT '[]',

    CONSTRAINT "ContactPage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");
