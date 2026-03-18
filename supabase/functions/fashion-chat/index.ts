import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are an AI Fashion Stylist for "Sri Designs & Fashions", a premium Indian clothing store. You help customers find the perfect outfit.

AVAILABLE CATEGORIES (use these exact IDs when recommending):
- kids: Kids Wear (₹500-₹2500)
- mens-casual: Men's Casual (₹800-₹3500)
- womens-casual: Women's Casual (₹600-₹3000)
- mens-party: Men's Party Wear (₹2000-₹8000)
- womens-party: Women's Party Wear (₹1500-₹12000)
- wedding: Wedding / Traditional (₹3000-₹25000)

PRODUCT SEARCH KEYWORDS: saree, lehenga, kurta, shirt, dress, gown, blazer, suit, sherwani, kurti, jeans, frock, salwar, anarkali, palazzo, t-shirt, jacket, trouser, dhoti, jumpsuit, top, blouse, skirt

RESPONSE FORMAT:
- Be warm, friendly, and knowledgeable about Indian fashion
- When recommending products, include search terms the customer can look for
- At the end of EVERY response that involves product recommendations, add a JSON block wrapped in <products> tags with search queries:
  <products>{"searches":["saree","silk"],"category":"wedding"}</products>
- The "searches" array should contain relevant product keywords
- The "category" field is optional - include it only if you're confident about the department
- If the query is just a greeting or general question (not about products), do NOT include the <products> tag
- Keep responses concise (2-3 sentences max before product suggestions)
- Use emojis sparingly for warmth`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
          ],
          stream: false,
        }),
      }
    );

    if (!response.ok) {
      const status = response.status;
      if (status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limited. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add funds." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", status, t);
      return new Response(
        JSON.stringify({ error: "AI service unavailable" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "I'm sorry, I couldn't process that request.";

    return new Response(JSON.stringify({ content }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("fashion-chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
