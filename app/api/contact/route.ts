import {NextResponse} from 'next/server';
import {prisma} from '@/lib/prisma';

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

const CONTACT_TO = process.env.CONTACT_TO || '';
const CONTACT_FROM = process.env.CONTACT_FROM || 'onboarding@resend.dev';

export async function POST(req: Request) {
  const data = (await req.json()) as ContactPayload;
  const name = (data.name || '').toString().trim();
  const email = (data.email || '').toString().trim();
  const subject = (data.subject || '').toString().trim();
  const message = (data.message || '').toString().trim();

  if (!name || !email || !message) {
    return NextResponse.json({ok: false, error: 'Missing fields'}, {status: 400});
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return NextResponse.json({ok: false, error: 'Invalid email'}, {status: 400});
  }

  // Le message est toujours enregistré en base (consultable dans /admin/messages),
  // même si l'envoi d'email ci-dessous échoue ou n'est pas configuré.
  await prisma.contactSubmission.create({
    data: {name, email, subject: subject || null, message}
  });

  if (process.env.RESEND_API_KEY) {
    const mailSubject = subject ? `[OPS CORPORATION] ${subject}` : '[OPS CORPORATION] Nouveau message';
    const text = [`Nom: ${name}`, `Email: ${email}`, '', message].join('\n');

    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: CONTACT_FROM,
          to: CONTACT_TO,
          reply_to: email,
          subject: mailSubject,
          text
        })
      });
      if (!res.ok) {
        console.error('Resend error:', await res.text());
      }
    } catch (err) {
      console.error('Resend request failed:', err);
    }
  }

  return NextResponse.json({ok: true});
}
