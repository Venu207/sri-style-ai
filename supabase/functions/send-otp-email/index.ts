import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return new Response(JSON.stringify({ error: 'Email and OTP are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Use Supabase's built-in SMTP to send email via the Admin API
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    // Send email using fetch to a free email API or use the built-in approach
    // We'll use the Supabase Auth admin to send a custom email
    // Since we need a simple email, we'll use a lightweight approach with Gmail SMTP isn't available
    // Instead, let's use the Lovable API key approach with a simple email sender

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY not configured');
      return new Response(JSON.stringify({ 
        success: true, 
        fallback: true,
        message: 'OTP generated but email service not fully configured. OTP shown in app.' 
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Try sending via Resend (if configured) or fall back to demo mode
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    
    if (RESEND_API_KEY) {
      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Sri Style <onboarding@resend.dev>',
          to: [email],
          subject: 'Your Order Verification OTP',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
              <h2 style="color: #b8860b; text-align: center;">Sri Style - Order Verification</h2>
              <p style="color: #333; font-size: 16px;">Your OTP for order verification is:</p>
              <div style="background: #f8f4e8; border: 2px solid #b8860b; border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0;">
                <span style="font-size: 36px; font-weight: bold; letter-spacing: 12px; color: #b8860b;">${otp}</span>
              </div>
              <p style="color: #666; font-size: 14px;">This OTP is valid for 5 minutes. Do not share it with anyone.</p>
              <p style="color: #999; font-size: 12px; text-align: center; margin-top: 32px;">Sri Style - Your Fashion Destination</p>
            </div>
          `,
        }),
      });

      if (emailResponse.ok) {
        return new Response(JSON.stringify({ success: true, sent: true }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // Fallback: return success with fallback flag (OTP shown in toast on frontend)
    return new Response(JSON.stringify({ 
      success: true, 
      fallback: true,
      message: 'Email service not configured. OTP shown in app for demo.' 
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in send-otp-email:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
