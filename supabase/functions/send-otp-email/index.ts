import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return new Response(JSON.stringify({ error: 'Email and OTP are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      return new Response(JSON.stringify({ 
        success: true, 
        fallback: true,
        message: 'Email service not configured. OTP shown in app.' 
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Sri Style <onboarding@resend.dev>',
        to: [email],
        subject: 'Your Order Verification OTP - Sri Style',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #ffffff;">
            <h2 style="color: #b8860b; text-align: center; margin-bottom: 24px;">Sri Style - Order Verification</h2>
            <p style="color: #333; font-size: 16px; text-align: center;">Your OTP for order verification is:</p>
            <div style="background: #f8f4e8; border: 2px solid #b8860b; border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0;">
              <span style="font-size: 36px; font-weight: bold; letter-spacing: 12px; color: #b8860b;">${otp}</span>
            </div>
            <p style="color: #666; font-size: 14px; text-align: center;">This OTP is valid for 5 minutes. Do not share it with anyone.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
            <p style="color: #999; font-size: 12px; text-align: center;">Sri Style - Your Fashion Destination</p>
          </div>
        `,
      }),
    });

    const responseData = await emailResponse.json();

    if (emailResponse.ok) {
      console.log('Email sent successfully to:', email);
      return new Response(JSON.stringify({ success: true, sent: true }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } else {
      console.error('Resend API error:', JSON.stringify(responseData));
      return new Response(JSON.stringify({ 
        success: true, 
        fallback: true,
        message: 'Email delivery failed. OTP shown in app.',
        error: responseData 
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    console.error('Error in send-otp-email:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
