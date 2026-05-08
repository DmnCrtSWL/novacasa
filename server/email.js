const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendPasswordResetEmail(to, name, resetUrl) {
  await transporter.sendMail({
    from: `"Quiniela Nova Casa" <${process.env.SMTP_USER}>`,
    to,
    subject: 'Recuperación de contraseña - Quiniela Nova Casa',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; color: #1a1a2e;">
        <div style="background: linear-gradient(to right, #006847 33.33%, #ffffff 33.33%, #ffffff 66.66%, #CE1126 66.66%); height: 6px; border-radius: 4px 4px 0 0;"></div>
        <div style="padding: 32px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 12px 12px;">
          <h1 style="font-size: 22px; font-weight: 800; margin: 0 0 8px;">Recuperación de contraseña</h1>
          <p style="color: #6b6375; margin: 0 0 24px;">Quiniela Mundialista Nova Casa</p>

          <p style="margin: 0 0 16px;">Hola <strong>${name}</strong>,</p>
          <p style="margin: 0 0 24px;">Recibimos una solicitud para restablecer la contraseña de tu cuenta. Haz clic en el botón de abajo para continuar:</p>

          <a href="${resetUrl}" style="display: inline-block; padding: 12px 28px; background: #006847; color: #fff; font-weight: 700; text-decoration: none; border-radius: 8px; letter-spacing: 0.5px; margin-bottom: 24px;">
            Restablecer contraseña
          </a>

          <p style="margin: 0 0 8px; font-size: 13px; color: #6b6375;">Este enlace expira en <strong>1 hora</strong>.</p>
          <p style="margin: 0 0 24px; font-size: 13px; color: #6b6375;">Si no solicitaste este cambio, ignora este correo — tu contraseña seguirá siendo la misma.</p>

          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 24px 0;" />
          <p style="font-size: 12px; color: #b0b0c0; margin: 0;">Si el botón no funciona, copia y pega este enlace en tu navegador:<br/><a href="${resetUrl}" style="color: #006847; word-break: break-all;">${resetUrl}</a></p>
        </div>
      </div>
    `,
  });
}

module.exports = { sendPasswordResetEmail };
