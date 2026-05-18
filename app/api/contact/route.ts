import {NextResponse} from 'next/server';

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

const CONTACT_TO = process.env.CONTACT_TO || 'cmaathey@gmail.com';
const CONTACT_FROM = process.env.CONTACT_FROM || 'onboarding@resend.dev';

export async function POST(req: Request) {
  const data = (await req.json()) as ContactPayload;
  const name = (data.name || '').toString().trim();
  const email = (data.email || '').toString().trim();
  const subject = (data.subject || '').toString().trim();
  const message = (data.message || '').toString().trim();

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ok: false, error: 'RESEND_API_KEY missing'}, {status: 500});
  }

  if (!name || !email || !message) {
    return NextResponse.json({ok: false, error: 'Missing fields'}, {status: 400});
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return NextResponse.json({ok: false, error: 'Invalid email'}, {status: 400});
  }

  const mailSubject = subject ? `[Portfolio] ${subject}` : '[Portfolio] Nouveau message';
  const text = [
    `Nom: ${name}`,
    `Email: ${email}`,
    '',
    message
  ].join('\n');

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
    const err = await res.text();
    return NextResponse.json({ok: false, error: err}, {status: 502});
  }

  return NextResponse.json({ok: true});
}
