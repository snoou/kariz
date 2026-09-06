export async function onRequestGet(context) {
  const requestUrl = new URL(context.request.url);
  const targetUrl = requestUrl.searchParams.get('url');

  if (!targetUrl) {
    return new Response('URL is required', { status: 400 });
  }

  try {
    const imageResponse = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Referer': new URL(targetUrl).origin 
      }
    });

    if (!imageResponse.ok) {
      return new Response('Failed to fetch image', { status: imageResponse.status });
    }

    const imageBuffer = await imageResponse.arrayBuffer();
    
    return new Response(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': imageResponse.headers.get('Content-Type') || 'image/jpeg',
        'Cache-Control': 'public, max-age=86400',
        'Access-Control-Allow-Origin': '*',
      }
    });
  } catch (error) {
    return new Response('Error fetching image', { status: 500 });
  }
}