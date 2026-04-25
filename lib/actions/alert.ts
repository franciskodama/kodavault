'use server';

import { v4 } from 'uuid';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { AlertType } from '@/lib/types';
import { Resend } from 'resend';

export async function sendAlertEmail(alert: any, currentPrice: number) {
  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not defined');
    }
    const resend = new Resend(process.env.RESEND_API_KEY);
    const user = await prisma.user.findUnique({
      where: { uid: alert.uid }
    });

    if (!user || !user.email) return;

    await resend.emails.send({
      from: 'Trezo Alerts <onboarding@resend.dev>',
      to: user.email,
      subject: `🚨 Price Alert: ${alert.asset} reached $${currentPrice}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #0f172a; padding: 24px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Price Alert Triggered</h1>
          </div>
          <div style="padding: 24px;">
            <p style="font-size: 16px; color: #475569;">Hello ${user.name || 'there'},</p>
            <p style="font-size: 18px; color: #0f172a; font-weight: 600;">
              Your alert for <span style="color: #3b82f6;">${alert.asset}</span> has been triggered!
            </p>
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 24px 0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #64748b;">Target Price:</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: 600;">$${alert.price}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b;">Current Price:</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: 600; color: #ef4444;">$${currentPrice}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b;">Condition:</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: 600;">${alert.type === 'above' ? 'Price Above' : 'Price Below'}</td>
                </tr>
              </table>
            </div>
            ${alert.note ? `<p style="color: #64748b; font-style: italic; margin-bottom: 24px;">Note: ${alert.note}</p>` : ''}
            <a href="${process.env.NEXTAUTH_URL}/dashboard" 
               style="display: block; text-align: center; padding: 14px; background-color: #0f172a; color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">
              View Dashboard
            </a>
          </div>
          <div style="background-color: #f1f5f9; padding: 16px; text-align: center; font-size: 12px; color: #94a3b8;">
            © ${new Date().getFullYear()} Trezo. All rights reserved.
          </div>
        </div>
      `
    });

    // Mark alert as triggered in DB to avoid duplicate emails
    await prisma.alert.update({ 
      where: { id: alert.id }, 
      data: { triggered: true } 
    });

    return true;
  } catch (error) {
    console.error('Failed to send alert email:', error);
    return false;
  }
}

export const getAlerts = async (uid: string) => {
  try {
    const alerts = await prisma.alert.findMany({
      where: {
        uid,
      },
    });
    return JSON.parse(JSON.stringify(alerts));
  } catch (error) {
    return { error: 'Failed to find alerts' };
  }
};

export async function addAlert(formData: AlertType) {
  const { uid, asset, price, type, note, emailOptin, whatsappOptin } = formData;

  try {
    await prisma.alert.create({
      data: {
        id: v4(),
        uid,
        created_at: new Date(),
        asset: asset.toUpperCase(),
        price: Number(price),
        type,
        note,
        emailOptin,
        whatsappOptin,
      },
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function updateAlert(formData: AlertType) {
  const { id, uid, asset, price, type, note, emailOptin, whatsappOptin } =
    formData;

  try {
    await prisma.alert.update({
      where: {
        id,
      },
      data: {
        id,
        created_at: new Date(),
        uid,
        asset,
        price: Number(price),
        type,
        note,
        emailOptin,
        whatsappOptin,
      },
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function deleteAlert(id: string) {
  try {
    await prisma.alert.delete({
      where: {
        id,
      },
    });

    revalidatePath('/shortcut');
  } catch (error) {
    console.error(error);
    throw new Error('🚨 Failed to delete Shortcut');
  }
}
