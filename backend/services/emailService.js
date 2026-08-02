const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendPasswordResetEmail = async (toEmail, resetUrl) => {

    await resend.emails.send({

        from: "MarketPulse <onboarding@resend.dev>",

        to: toEmail,

        subject: "Reset your MarketPulse password",

        html: `
            <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;">
                <h2 style="color:#111827;">Reset your password</h2>
                <p style="color:#6b7280;line-height:1.6;">
                    We received a request to reset your MarketPulse password.
                    Click the button below to choose a new one. This link
                    expires in 30 minutes.
                </p>
                <a href="${resetUrl}" style="display:inline-block;background:#387ed1;color:#ffffff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:600;margin-top:16px;">
                    Reset Password
                </a>
                <p style="color:#9ca3af;font-size:13px;margin-top:24px;">
                    If you didn't request this, you can safely ignore this email.
                </p>
            </div>
        `,

    });

};

module.exports = { sendPasswordResetEmail };