import { useLoaderData, useNavigate } from 'react-router-dom';
import apiClient from '../api/axiosClient';
import SearchBox from '../components/SearchBox';
import MangaCard from '../components/MangaCard';

// تابع لودر برای دریافت دیتا قبل از لود شدن صفحه
export const homeLoader = async ({ request }) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || 1;
  
  try {
    const response = await apiClient.get(`/top/manga?page=${page}`);
    return { topMangas: response.data.data || [], page: Number(page) };
  } catch (error) {
    console.error("خطا در دریافت مانگاها", error);
    return { topMangas: [], page: Number(page) };
  }
};

const Home = () => {
  // دریافت دیتای آماده از لودر
  const { topMangas, page } = useLoaderData();
  const navigate = useNavigate();

  const handlePageChange = (newPage) => {
    navigate(`/?page=${newPage}`);
  };

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">دروازه‌ای به دنیای مانگا</h1>
      <SearchBox />
      
      <h2 className="text-xl md:text-2xl font-semibold mb-6">برترین مانگاها</h2>
      
      {/* گرید ریسپانسیو: موبایل 1 ستون، تبلت 2/3 ستون، دسکتاپ 4/5 ستون */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
        {topMangas.map((manga) => (
          <MangaCard key={manga.mal_id} manga={manga} />
        ))}
      </div>

      <div className="flex justify-center mt-10 gap-4">
        <button 
          disabled={page === 1} 
          onClick={() => handlePageChange(page - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          قبلی
        </button>
        <span className="px-4 py-2">صفحه {page}</span>
        <button 
          onClick={() => handlePageChange(page + 1)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          بعدی
        </button>
      </div>
    </div>
  );
};

export default Home;