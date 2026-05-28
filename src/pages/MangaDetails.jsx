import { useLoaderData, useNavigate } from 'react-router-dom';
import apiClient from '../api/axiosClient';

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

  if (!manga) return <p className="text-center mt-20 text-red-500">مانگا پیدا نشد.</p>;

  return (
    <div className="max-w-5xl mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg">
      <button onClick={() => navigate(-1)} className="mb-6 text-blue-600 hover:underline">
        &larr; بازگشت
      </button>
      
      {/* فلکس ریسپانسیو: در موبایل ستونی، در تبلت و دسکتاپ ردیفی */}
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
          <h3 className="text-lg md:text-xl font-semibold mb-2">خلاصه داستان:</h3>
          <p className="text-gray-700 leading-relaxed text-justify">
            {manga.synopsis || 'خلاصه‌ای برای این مانگا ثبت نشده است.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MangaDetails;