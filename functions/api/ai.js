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
      return new Response(
        JSON.stringify({ error: 'messages is required' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }

    const response = await fetch(
      `${context.env.ARVAN_BASE_URL}/chat/completions`,
      {
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
      }
    );

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  } catch (error) {
    console.error('AI Function Error:', error);

    return new Response(
      JSON.stringify({ error: 'خطا در ارتباط با سرویس هوش مصنوعی' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }
}