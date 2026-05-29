import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import OpenAI from 'openai';
import apiClient from '../api/axiosClient';

const WandIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 4V2" /><path d="M15 16v-2" /><path d="m3 21 9-9" /><path d="M12.2 6.2 11 5" />
  </svg>
);

const BrainIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" /><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
  </svg>
);

const ZapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

export const mangaDetailsLoader = async ({ params }) => {
  if (params.id === 'hazhir-sensei') {
    return {
      manga: {
        mal_id: 'hazhir-sensei',
        title: 'هژیر (The Legendary Sensei)',
        images: {
          jpg: {
            large_image_url: '/public/ha.png' 
          }
        },
        score: 'OVER 9000 💥',
        status: 'در حال کامپایلِ جهان...',
        synopsis: 'در دورانی که باگ‌ها گرند لاین را تسخیر کرده بودند و کدها در تاریکی کامپایل نمی‌شدند، استادی از دل کوه‌های فوجی با کیبوردی از جنس نور طلوع کرد... گفته می‌شود او می‌تواند ری‌اکت را فقط با نگاه کردن به مانیتور دیباگ کند.',
        genres: [{ name: 'اکشن' }, { name: 'برنامه‌نویسی حماسی' }],
        themes: [{ name: 'کاتارسیس کدها' }],
        isEasterEgg: true
      }
    };
  }

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

  const [sibylData, setSibylData] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState("");

  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const getOpenAIClient = () => new OpenAI({
    apiKey: import.meta.env.VITE_ARVAN_API_KEY,
    baseURL: import.meta.env.VITE_ARVAN_BASE_URL,
    dangerouslyAllowBrowser: true,
    defaultHeaders: { 'Authorization': import.meta.env.VITE_ARVAN_API_KEY }
  });

  const handleTranslate = async () => {
    if (!manga.synopsis) return;

    if (manga.isEasterEgg) {
      setIsTranslating(true);
      setTimeout(() => {
        setTranslatedSynopsis("نیاز به ترجمه نیست! کدهای استاد هژیر به تمام زبان‌های برنامه‌نویسی و انسانیِ کیهان قابل فهم است.");
        setIsTranslating(false);
      }, 1500);
      return;
    }

    setIsTranslating(true);
    try {
      const openai = getOpenAIClient();
      const response = await openai.chat.completions.create({
        model: import.meta.env.VITE_ARVAN_MODEL_NAME,
        messages: [
          { role: "system", content: "تو یک مترجم حرفه‌ای مانگا هستی. لحن ترجمه‌ات باید جذاب و روان باشد." },
          { role: "user", content: `این داستان را به فارسی روان ترجمه کن:\n\n${manga.synopsis}` }
        ],
        max_tokens: 3000,
        temperature: 0.7,
      });
      setTranslatedSynopsis(response.choices[0].message.content);
    } catch (error) {
      console.error("خطا:", error);
      setTranslatedSynopsis("خطا در ارتباط با سرور هوش مصنوعی برای ترجمه.");
    } finally {
      setIsTranslating(false);
    }
  };

  const handleDeepAnalysis = async () => {
    if (!manga.synopsis) return;

    if (manga.isEasterEgg) {
      setIsAnalyzing(true);
      setTimeout(() => {
        setSibylData({
          character_psychology: "سطح انرژی روانی این کاراکتر غیرقابل اندازه‌گیری است. مواجهه با کدهای تمیز او باعث کاتارسیس برنامه‌نویسان و وحشت باگ‌ها می‌شود.",
          powers_and_inspirations: [
            {
              power: "کیبورد نوری (The Radiant Keyboard)",
              inspiration: "الهام گرفته از افسانه‌های باستانیِ توسعه‌دهندگان سینیور که بدون موس و فقط با شورت‌کات‌ها کد می‌زنند."
            },
            {
              power: "چشمِ کامپایلر (Compiler's Eye)",
              inspiration: "توانایی دیدن ارورها قبل از ذخیره کردن فایل؛ الهام گرفته شده از شارینگان در خاندان اوچیها."
            }
          ]
        });
        setIsAnalyzing(false);
      }, 2000);
      return;
    }

    setIsAnalyzing(true);
    setAnalysisError("");

    try {
      const openai = getOpenAIClient();
      const genres = manga.genres?.map(g => g.name).join('، ') || 'نامشخص';
      const themes = manga.themes?.map(t => t.name).join('، ') || 'نامشخص';

      const response = await openai.chat.completions.create({
        model: import.meta.env.VITE_ARVAN_MODEL_NAME,
        messages: [
          {
            role: "system",
            content: `تو یک دستیار هوشمند تحلیل مانگا هستی.
            شما باید خروجی را دقیقاً در قالب یک آبجکت JSON معتبر (بدون تگ مارک‌داون) با ساختار زیر برگردانی:
            {
              "character_psychology": "یک توضیح خیلی کوتاه (حداکثر ۲ تا ۳ خط) درباره مشکل روانی، تروما یا درگیری‌های ذهنی شخصیت‌های اصلی داستان.",
              "powers_and_inspirations": [
                {
                  "power": "نام قدرت یا مهارت خاص (مثلاً نام تکنیک، جادو، یا سیستم مبارزه)",
                  "inspiration": "توضیح کوتاه که این قدرت از چه چیزی در دنیای واقعی، اساطیر، علم یا فرهنگ الهام گرفته شده است."
                }
              ]
            }
            نکته: اگر داستان قدرت ماورایی ندارد، مهارت‌های برجسته شخصیت‌ها را بنویس و بگو از چه چیزی در دنیای واقعی الهام گرفته‌اند.`
          },
          {
            role: "user",
            content: `نام اثر: ${manga.title}\nژانرها: ${genres}\nتم‌ها: ${themes}\nخلاصه: ${manga.synopsis}`
          }
        ],
        max_tokens: 2500,
        temperature: 0.7,
      });

      let rawContent = response.choices[0].message.content;
      let cleanJson = rawContent.replace(/```json/gi, '').replace(/```/gi, '').trim();
      const parsedData = JSON.parse(cleanJson);
      setSibylData(parsedData);

    } catch (error) {
      console.error("خطای تحلیل:", error);
      setAnalysisError("ارتباط با هسته تحلیلی قطع شد یا فرمت دیتا نامعتبر بود. لطفاً دوباره تلاش کنید.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!manga) return <p className="text-center font-comic text-3xl mt-20 bg-white p-6 border-4 border-black inline-block">مانگا پیدا نشد!</p>;

  return (
    <div className="max-w-6xl mx-auto">
      <button onClick={() => navigate(-1)} className="mb-6 bg-black text-white px-4 py-2 font-comic text-xl hover:-translate-x-2 transition-transform shadow-[4px_4px_0_0_#ef4444]">
        &larr; بازگشت
      </button>

      <div className="comic-panel p-6 md:p-10 mb-12 flex flex-col md:flex-row gap-8 bg-white relative">
        <img
          src={manga.images?.jpg?.large_image_url || 'https://via.placeholder.com/400x600'}
          alt={manga.title}
          className="w-full md:w-1/3 border-4 border-black object-cover shadow-[6px_6px_0_0_#000] rotate-1 hover:rotate-0 transition-transform"
        />
        <div className="w-full md:w-2/3 flex flex-col">
          <h1 className="text-4xl md:text-6xl font-comic mb-4 uppercase leading-tight bg-yellow-300 inline-block px-3 py-1 border-3 border-black w-fit transform -rotate-1 shadow-[4px_4px_0_0_#000]">
            {manga.title}
          </h1>

          <div className="flex flex-wrap gap-4 mb-6 font-comic text-lg">
            <span className="bg-blue-400 border-2 border-black px-3 py-1 shadow-[2px_2px_0_0_#000]">امتیاز: {manga.score || 'نامشخص'}</span>
            <span className="bg-green-400 border-2 border-black px-3 py-1 shadow-[2px_2px_0_0_#000]">وضعیت: {manga.status}</span>
          </div>

          <div className="bg-gray-100 p-5 border-3 border-black relative mb-6">
            <div className="absolute -top-4 left-4 bg-black text-white font-comic px-3 py-1 text-sm shadow-[2px_2px_0_0_#cbd5e1]">خلاصه داستان</div>
            <p className="text-gray-800 leading-loose text-justify font-medium mt-2" dir="ltr">
              {manga.synopsis || 'خلاصه‌ای در دسترس نیست.'}
            </p>
          </div>

          {translatedSynopsis && (
            <div className="bg-purple-100 p-5 border-3 border-black border-dashed relative">
              <div className="absolute -top-4 right-4 bg-purple-600 text-white font-comic px-3 py-1 text-sm shadow-[2px_2px_0_0_#000]">ترجمه جادویی</div>
              <p className="text-gray-900 leading-loose text-justify font-bold mt-2" dir="rtl">
                {translatedSynopsis}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="relative mb-12">
        <div className="text-center mb-8 relative flex justify-center">
          <h2 className="text-3xl md:text-4xl font-comic bg-black text-white inline-block px-6 py-2 border-4 border-black transform rotate-1 shadow-[6px_6px_0_0_#facc15] relative z-10">
            سیستم تحلیل سیبیل ⚡
          </h2>
          <button 
            onClick={() => setShowEasterEgg(!showEasterEgg)}
            className="absolute top-0 right-1/4 w-3 h-3 bg-red-500 rounded-full cursor-pointer hover:scale-150 transition-transform opacity-40 hover:opacity-100 z-20"
            title="سیستم را هک کن..."
          ></button>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <button
            onClick={handleTranslate}
            disabled={isTranslating}
            className="flex items-center gap-2 px-6 py-3 bg-fuchsia-400 border-3 border-black shadow-[4px_4px_0_0_#000] font-comic text-xl hover:bg-fuchsia-300 active:translate-y-1 active:shadow-none disabled:opacity-50 transition-all"
          >
            <WandIcon /> {isTranslating ? 'در حال جادو...' : 'ترجمه داستان'}
          </button>

          <button
            onClick={handleDeepAnalysis}
            disabled={isAnalyzing}
            className="flex items-center gap-2 px-6 py-3 bg-teal-400 border-3 border-black shadow-[4px_4px_0_0_#000] font-comic text-xl hover:bg-teal-300 active:translate-y-1 active:shadow-none disabled:opacity-50 transition-all"
          >
            <ZapIcon /> {isAnalyzing ? 'در حال پردازش...' : 'کالبدشکافی روان و قدرت‌ها'}
          </button>
        </div>

        {analysisError && (
          <div className="bg-red-500 text-white font-comic text-center p-4 border-4 border-black mb-6 transform -rotate-1 max-w-2xl mx-auto shadow-[4px_4px_0_0_#000]">
            {analysisError}
          </div>
        )}

        {sibylData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="comic-panel p-6 bg-rose-100 relative transform -rotate-1 h-fit">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-rose-500 text-white border-3 border-black font-comic px-4 py-1 text-xl shadow-[2px_2px_0_0_#000] whitespace-nowrap">
                آسیب‌شناسی روانی
              </div>
              <div className="mt-4 flex items-start gap-3">
                <BrainIcon className="text-rose-600 shrink-0 mt-1" />
                <p className="text-gray-900 font-bold leading-loose text-lg text-justify">
                  {sibylData.character_psychology}
                </p>
              </div>
            </div>

            <div className="comic-panel p-6 bg-indigo-100 relative transform rotate-1">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white border-3 border-black font-comic px-4 py-1 text-xl shadow-[2px_2px_0_0_#000] whitespace-nowrap">
                ریشه‌شناسی مهارت‌ها
              </div>
              <ul className="mt-4 space-y-4">
                {sibylData.powers_and_inspirations.map((item, index) => (
                  <li key={index} className="bg-white border-3 border-black p-4 shadow-[4px_4px_0_0_#000]">
                    <div className="font-comic text-xl text-indigo-700 border-b-2 border-dashed border-black pb-2 mb-2 flex items-center gap-2">
                      <ZapIcon /> {item.power}
                    </div>
                    <div className="text-gray-800 font-bold leading-relaxed text-justify">
                      {item.inspiration}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {showEasterEgg && (
          <div className="mt-12 comic-panel p-8 bg-zinc-900 border-4 border-yellow-500 relative transform -rotate-1 animate-fade-in transition-all">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black border-4 border-black font-comic px-6 py-2 text-2xl shadow-[4px_4px_0_0_#000] whitespace-nowrap">
              فایل‌های محرمانه‌ی معمار باز شد! ⚠
            </div>
            
            <div className="mt-6 flex flex-col md:flex-row items-center gap-6">
              <div className="w-32 h-32 bg-yellow-400 border-4 border-black flex items-center justify-center rounded-full shadow-[4px_4px_0_0_#fff] shrink-0 transform rotate-6">
                <span className="font-comic text-6xl font-bold">H</span>
              </div>
              
              <div className="text-white space-y-4">
                <h4 className="font-comic text-2xl text-yellow-400 border-b-2 border-dashed border-gray-600 pb-2">
                  پیام سیستم: استاد هژیر وارد می‌شود...
                </h4>
                <p className="leading-relaxed text-justify text-lg font-bold text-gray-200" dir="rtl">
                  «ای کاوشگرِ کدهای پنهان... تو به هسته‌ی مرکزی سیبیل رسیدی. 
                  آنجا که منطقِ صفر و یک با هنر درمی‌آمیزد و باگ‌ها همچون دیوهای سپید به زانو درمی‌آیند. 
                  عبور تو از دروازه‌های این ماژول، نشانِ یک شینوبیِ راستین در مسیرِ توسعه است. 
                  کدهایت تمیز و کامپایل‌هایت بی‌خطا باد!»
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default MangaDetails;