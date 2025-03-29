import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { contactSchema } from '@/lib/validations/contact.schema';

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!canSendEmail(ip)) {
      return NextResponse.json(
        { success: false, message: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    
    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, message: 'Invalid form data', errors: validationResult.error.errors },
        { status: 400 }
      );
    }
    
    const { fullname, email, subject, message } = validationResult.data;

    if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
      console.error('Missing email configuration');
      return NextResponse.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Kén Homestay Website" <${process.env.EMAIL_USER}>`,
      to: 'sondt.21it@vku.udn.vn',
      replyTo: email,
      subject: `Contact Form: ${subject || 'Tin nhắn mới từ Kén Homestay'}`,
      text: `
        Tên: ${fullname}
        Email: ${email}
        Tiêu đề: ${subject || 'Not provided'}

        Message:
        ${message}

        Email đã được gửi từ website Kén Homestay.
      `,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 5px;">
          <h2 style="color: #333; border-bottom: 1px solid #eaeaea; padding-bottom: 10px;">Tin nhắn mới từ Kén Homestay</h2>
          
          <div style="margin: 20px 0;">
            <p><strong>Tên:</strong> ${fullname}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Tiêu đề:</strong> ${subject || 'Not provided'}</p>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <h3 style="margin-top: 0; color: #333;">Nội dung tin nhắn:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          
          <p style="font-size: 12px; color: #666; margin-top: 30px; text-align: center;">
            Email đã được gửi từ website Kén Homestay.
          </p>
        </div>
      `,
    };

    try {
      const sendMailPromise = new Promise<nodemailer.SentMessageInfo>((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) reject(err);
          else resolve(info);
        });
      });
      
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Email sending timed out')), 10000);
      });
      
      await Promise.race([sendMailPromise, timeoutPromise]);
      
      recordEmailSent(ip);

      return NextResponse.json({ 
        success: true, 
        message: 'Email đã được gửi thành công' 
      });
    } catch (emailError) {
      console.error('Error in email transmission:', emailError);
      return NextResponse.json(
        { success: false, message: 'Gửi email thất bại. Vui lòng thử lại sau.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { success: false, message: 'Đã xảy ra lỗi không mong muốn' },
      { status: 500 }
    );
  }
}

const emailLog: Record<string, { count: number, lastAttempt: number }> = {};

function canSendEmail(ip: string): boolean {
  const now = Date.now();
  const record = emailLog[ip];
  
  if (!record) return true;
  
  const hourInMs = 60 * 60 * 1000;
  if (now - record.lastAttempt > hourInMs) {
    return true;
  }
  
  return record.count < 10;
}

function recordEmailSent(ip: string): void {
  const now = Date.now();
  const record = emailLog[ip];
  
  if (!record) {
    emailLog[ip] = { count: 1, lastAttempt: now };
    return;
  }
  
  const hourInMs = 60 * 60 * 1000;
  if (now - record.lastAttempt > hourInMs) {
    emailLog[ip] = { count: 1, lastAttempt: now };
  } else {
    record.count += 1;
    record.lastAttempt = now;
  }
} 