const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function onRequestPost(context) {
  try {
    const body = await context.request.json();

    if (!body.messages || !Array.isArray(body.messages)) {
      return new Response(JSON.stringify({ error: 'messages is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const apiUrl = `${context.env.ARVAN_BASE_URL}/chat/completions`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${context.env.ARVAN_API_KEY}`,
      },
      body: JSON.stringify({
        model: context.env.ARVAN_MODEL_NAME,
        messages: body.messages,
        max_tokens: body.max_tokens ?? 2500,
        temperature: body.temperature ?? 0.7,
      }),
    });

    // خواندن پاسخ به صورت متنی برای جلوگیری از خطای پارس JSON
    const rawText = await response.text();
    let data;
    
    try {
      data = JSON.parse(rawText);
    } catch (e) {
      // اگر پاسخ آروان JSON نباشد (مثلا ارور 502 یا 404 بدهد)
      data = { raw_response: rawText };
    }

    // اگر درخواست به آروان ناموفق بود، ارور دقیق را به فرانت‌اند بفرست
    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error: 'Arvan API Request Failed',
          status: response.status,
          details: data,
          attemptedUrl: apiUrl
        }), 
        {
          status: response.status,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Cloudflare Function Error', message: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
}