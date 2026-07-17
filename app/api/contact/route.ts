import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/config/site.config";

// POST /api/contact
// Recibe los datos del formulario de contacto y envía un email al negocio
// con toda la información del cliente, usando Resend.
//
// Requiere las variables de entorno (ver .env.example):
// - RESEND_API_KEY
// - CONTACT_FROM_EMAIL  (dirección verificada en Resend, ej. web@tudominio.com)
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const { name, email, projectType, location, message } = body as Record<string, string>;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields (name, email and message)" },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    console.error("Faltan RESEND_API_KEY o CONTACT_FROM_EMAIL en las variables de entorno");
    return NextResponse.json(
      { ok: false, error: "The form isn't set up yet. Please call us in the meantime." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: `${siteConfig.business.name} — Web <${fromEmail}>`,
      to: siteConfig.contact.notifyEmail,
      reply_to: email,
      subject: `New website enquiry — ${name}`,
      html: `
        <h2>New message from ${siteConfig.business.name}</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${projectType ? `<p><strong>Project type:</strong> ${escapeHtml(projectType)}</p>` : ""}
        ${location ? `<p><strong>Area:</strong> ${escapeHtml(location)}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
      `,
    });

    if (error) {
      console.error("Error de Resend:", error);
      return NextResponse.json({ ok: false, error: "Couldn't send the message" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error enviando email de contacto:", err);
    return NextResponse.json({ ok: false, error: "Couldn't send the message" }, { status: 500 });
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
