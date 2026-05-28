import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import OpenAI from 'openai';
import apiClient from '../api/axiosClient';

const WandIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 4V2"/><path d="M15 16v-2"/><path d="M8 9h2"/><path d="M20 9h2"/><path d="M17.8 11.8 19 13"/><path d="M15 9h.01"/><path d="M17.8 6.2 19 5"/><path d="m3 21 9-9"/><path d="M12.2 6.2 11 5"/>
  </svg>
);

export const mangaDetailsLoader = async ({ params }) => {
  try {
    const response = await apiClient.get(`/manga/${params.id}`);
    return { manga: response.data.data };
  } catch (error) {
    console.error("خطا در دریافت جزئیات", error);
    return { manga: null };
  }
};

const MangaDetails = () => {
  const { manga } = useLoaderData();
  const navigate = useNavigate();
  
  const [translatedSynopsis, setTranslatedSynopsis] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);

  const handleTranslate = async () => {
    if (!manga.synopsis) return;
    
    setIsTranslating(true);
    try {
      const openai = new OpenAI({
        apiKey: import.meta.env.VITE_ARVAN_API_KEY,
        baseURL: import.meta.env.VITE_ARVAN_BASE_URL,
        dangerouslyAllowBrowser: true, 
        defaultHeaders: {
          'Authorization': import.meta.env.VITE_ARVAN_API_KEY 
        }
      });

      const response = await openai.chat.completions.create({
        model: import.meta.env.VITE_ARVAN_MODEL_NAME,
        messages: [
          {
            role: "system",
            content: "تو یک مترجم حرفه‌ای مانگا و انیمه هستی. لحن ترجمه‌ات باید جذاب، داستان‌گو و روان باشد."
          },
          {
            role: "user",
            content: `لطفاً خلاصه داستان زیر را به زبان فارسی ترجمه کن:\n\n${manga.synopsis}`
          }
        ],
        max_tokens: 3000,
        temperature: 0.7,
      });

      setTranslatedSynopsis(response.choices[0].message.content);
    } catch (error) {
      console.error("خطا در ارتباط با هوش مصنوعی:", error);
      setTranslatedSynopsis("متأسفانه در فرآیند ترجمه خطایی رخ داد. وضعیت اینترنت یا کلید دسترسی را بررسی کنید.");
    } finally {
      setIsTranslating(false);
    }
  };

  if (!manga) return <p className="text-center mt-20 text-red-500">مانگا پیدا نشد.</p>;

  return (
    <div className="max-w-5xl mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg">
      <button onClick={() => navigate(-1)} className="mb-6 text-blue-600 hover:underline">
        &larr; بازگشت
      </button>
      
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        <img 
          src={manga.images?.jpg?.large_image_url || 'https://via.placeholder.com/400x600'} 
          alt={manga.title} 
          className="w-full md:w-1/3 max-w-sm mx-auto rounded-lg shadow-md object-cover"
        />
        <div className="w-full md:w-2/3">
          <h1 className="text-2xl md:text-4xl font-bold mb-4">{manga.title}</h1>
          <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
            <span className="bg-gray-100 px-3 py-1 rounded">وضعیت: {manga.status}</span>
            <span className="bg-gray-100 px-3 py-1 rounded">امتیاز: {manga.score} / 10</span>
          </div>
          
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg md:text-xl font-semibold">خلاصه داستان:</h3>
            <button 
              onClick={handleTranslate}
              disabled={isTranslating}
              className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-full transition-colors disabled:opacity-50"
              title="ترجمه با هوش مصنوعی"
            >
              <WandIcon />
              {isTranslating ? 'در حال ترجمه...' : 'ترجمه جادویی'}
            </button>
          </div>

          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed text-justify" dir="ltr">
              {manga.synopsis || 'خلاصه‌ای برای این مانگا ثبت نشده است.'}
            </p>
            
            {translatedSynopsis && (
              <div className="p-4 bg-purple-50 border border-purple-100 rounded-lg">
                <p className="text-gray-800 leading-relaxed text-justify" dir="rtl">
                  {translatedSynopsis}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MangaDetails;