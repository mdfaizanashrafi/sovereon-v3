import { Resend } from 'resend';

export default async function handler(req: any, res: any) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, error: 'Method Not Allowed. Use POST.' });
  }

  try {
    const { name, email, subject, message } = req.body || {};

    // Validate fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required parameters. "name", "email", and "message" are all required.',
      });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        error: 'Resend API key is missing. Please configure the RESEND_API_KEY environment variable on Vercel.',
      });
    }

    // Initialize Resend client
    const resend = new Resend(apiKey);

    // Send the email
    // onboarding@resend.dev is the default sender for free/unverified domains on Resend
    const result = await resend.emails.send({
      from: 'Sovereon Form <onboarding@resend.dev>',
      to: 'mdfaizanashrafi13032001@gmail.com',
      subject: subject || `Sovereon Consultation Request from ${name}`,
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e4e4e7; rounded: 12px; border-radius: 12px;">
          <h2 style="color: #18181b; font-size: 20px; font-weight: 800; margin-top: 0; margin-bottom: 8px; border-bottom: 2px solid #f97316; padding-bottom: 8px; text-transform: uppercase; letter-spacing: -0.025em;">
            New Sovereon System Ticket
          </h2>
          <p style="font-size: 14px; color: #71717a; font-family: monospace; margin-bottom: 24px;">
            TIMESTAMP: ${new Date().toISOString()} // STATUS: INCOMING
          </p>
          
          <div style="margin-bottom: 20px;">
            <label style="display: block; font-size: 11px; font-weight: bold; color: #a1a1aa; text-transform: uppercase; font-family: monospace;">Client Name</label>
            <span style="font-size: 15px; color: #18181b; font-weight: 600;">${name}</span>
          </div>

          <div style="margin-bottom: 20px;">
            <label style="display: block; font-size: 11px; font-weight: bold; color: #a1a1aa; text-transform: uppercase; font-family: monospace;">Email Address</label>
            <a href="mailto:${email}" style="font-size: 14px; color: #f97316; text-decoration: none;">${email}</a>
          </div>

          <div style="margin-bottom: 20px;">
            <label style="display: block; font-size: 11px; font-weight: bold; color: #a1a1aa; text-transform: uppercase; font-family: monospace;">Subject</label>
            <span style="font-size: 14px; color: #27272a; font-weight: 500;">${subject || 'No Subject Provided'}</span>
          </div>

          <div style="margin-bottom: 24px;">
            <label style="display: block; font-size: 11px; font-weight: bold; color: #a1a1aa; text-transform: uppercase; font-family: monospace; margin-bottom: 6px;">Operational Requirements</label>
            <div style="padding: 16px; border-left: 4px solid #f97316; background-color: #f4f4f5; font-size: 14px; color: #27272a; line-height: 1.6; border-radius: 4px; white-space: pre-wrap;">${message}</div>
          </div>
          
          <div style="border-t: 1px solid #e4e4e7; margin-top: 32px; padding-top: 16px; font-size: 10px; color: #a1a1aa; font-family: monospace; text-align: center;">
            SOVEREON SYSTEM DISPATCHER · SECURITY_LEVEL = ZERO_TRUST
          </div>
        </div>
      `,
    });

    if (result.error) {
      console.error('Resend API returned error:', result.error);
      return res.status(400).json({ success: false, error: result.error.message || result.error });
    }

    return res.status(200).json({ success: true, data: result.data });
  } catch (error: any) {
    console.error('Server error inside /api/contact:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'An internal server error occurred while sending the email.',
    });
  }
}
