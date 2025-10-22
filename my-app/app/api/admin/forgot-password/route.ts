import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { sendResetEmail } from "@/lib/sendEmail"; 

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Find admin 
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    // Don't reveal if email exists (security best practice)
    if (!admin) {
      return NextResponse.json({
        message: "If an account exists, a reset link has been sent.",
      });
    }

    // Generate JWT reset token
    const token = jwt.sign(
      { email },
      process.env.RESET_TOKEN_SECRET!,
      { expiresIn: "15m" }
    );

    // Create reset link
    const resetLink = `${process.env.NEXTAUTH_URL}/admin/reset-password?token=${token}`;

    // Send reset email
    await sendResetEmail(email, resetLink);

    return NextResponse.json({
      message: "If an account exists, a reset link has been sent.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Failed to send reset link." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
