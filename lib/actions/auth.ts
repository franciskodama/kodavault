'use server';

import prisma from '@/lib/prisma';
import { Resend } from 'resend';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const resend = new Resend(process.env.RESEND_API_KEY);

export const requestPasswordReset = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { error: 'Email not found in our database' };
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 3600000); // 1 hour from now

    await prisma.user.update({
      where: { email },
      data: {
        passwordResetToken: token,
        passwordResetExpires: expires,
      },
    });

    const resetLink = `${process.env.NEXTAUTH_URL}/reset-password/${token}`;

    await resend.emails.send({
      from: 'Trezo <onboarding@resend.dev>',
      to: email,
      subject: 'Reset your password',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #0f172a;">Password Reset Request</h1>
          <p style="color: #475569; line-height: 1.6;">
            We received a request to reset your password for your Trezo account. 
            Click the button below to set a new password:
          </p>
          <a href="${resetLink}" 
             style="display: inline-block; padding: 12px 24px; background-color: #0f172a; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; margin-top: 16px;">
            Reset Password
          </a>
          <p style="color: #94a3b8; font-size: 14px; margin-top: 32px;">
            If you didn't request this, you can safely ignore this email. 
            The link will expire in 1 hour.
          </p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 32px 0;" />
          <p style="color: #94a3b8; font-size: 12px; text-align: center;">
            © ${new Date().getFullYear()} Trezo. All rights reserved.
          </p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Error requesting password reset:', error);
    return { error: 'Failed to process request' };
  }
};

export const resetPassword = async (token: string, password: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        passwordResetToken: token,
        passwordResetExpires: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return { error: 'Invalid or expired token' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null,
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error resetting password:', error);
    return { error: 'Failed to reset password' };
  }
};
