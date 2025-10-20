import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, honeypot } = body;

    if (honeypot && honeypot.trim() !== '') {
      return NextResponse.json(
        { success: false, error: 'Spam detection triggered' },
        { status: 400 }
      );
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Send mail
    const to = process.env.CONTACT_TO_EMAIL || 'omarrmohamedd05@gmail.com';
    const host = process.env.SMTP_HOST || '';
    const port = parseInt(process.env.SMTP_PORT || '587', 10);
    const user = process.env.SMTP_USER || '';
    const pass = process.env.SMTP_PASS || '';
    const secure = process.env.SMTP_SECURE === 'true' || port === 465;

    let transporter;
    let previewUrl: string | undefined;
    let fromLabel = process.env.SMTP_FROM;

    if (!host || !user || !pass) {
      // Ethereal test account fallback for local/dev testing
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: { user: testAccount.user, pass: testAccount.pass },
      });
      fromLabel = `Website Contact <${testAccount.user}>`;
    } else {
      transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: { user, pass },
      });
      fromLabel = fromLabel || `Website Contact <${user}>`;
    }

    const subject = `New message from ${name}`;
    const html = `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${message}</p>
      <hr/>
      <p>Sent at: ${new Date().toLocaleString('en-GB')}</p>
    `;

    const info = await transporter.sendMail({
      from: fromLabel,
      to: to,
      subject,
      html,
      replyTo: email,
    });

    // If using Ethereal, include preview URL
    try {
      const url = nodemailer.getTestMessageUrl(info);
      if (url) previewUrl = url;
    } catch {
      // ignore preview URL resolution failures (e.g., non-Ethereal transports)
      previewUrl = undefined;
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your message! I'll get back to you soon.",
        previewUrl: previewUrl,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
