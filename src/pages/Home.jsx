import { useLoaderData, useNavigate } from 'react-router-dom';
import apiClient from '../api/axiosClient';
import SearchBox from '../components/SearchBox';
import MangaCard from '../components/MangaCard';

export const homeLoader = async ({ request }) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || 1;
  try {
    const response = await apiClient.get(`/top/manga?page=${page}`);
    return { topMangas: response.data.data || [], page: Number(page) };
  } catch (error) {
    return { topMangas: [], page: Number(page) };
  }
};

const Home = () => {
  const { topMangas, page } = useLoaderData();
  const navigate = useNavigate();

  return (
    <div>
      <div className="text-center mb-12 transform -rotate-1">
        <h1 className="text-5xl md:text-7xl font-comic text-white text-shadow-comic drop-shadow-[4px_4px_0_rgba(0,0,0,1)] uppercase tracking-wider bg-black inline-block px-6 py-2 border-4 border-black">
          دنیای مانگا
        </h1>
      </div>
      <SearchBox />
      <div className="flex items-center gap-4 mb-8">
        <div className="h-1 bg-black flex-1"></div>
        <h2 className="text-3xl font-comic bg-white border-3 border-black px-4 py-1 shadow-[4px_4px_0_0_#000]">برترین‌های هفته</h2>
        <div className="h-1 bg-black flex-1"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6 md:gap-8">
        {topMangas.map((manga) => (
          <MangaCard key={manga.mal_id} manga={manga} />
        ))}
      </div>

      <div className="flex justify-center mt-12 gap-6 font-comic text-xl">
        <button
          disabled={page === 1}
          onClick={() => navigate(`/?page=${page - 1}`)}
          className="px-6 py-2 bg-red-500 text-white border-3 border-black shadow-[4px_4px_0_0_#000] disabled:opacity-50 disabled:translate-y-1 disabled:shadow-none active:translate-y-1 active:shadow-none"
        >
          &rarr; قبلی
        </button>
        <span className="px-6 py-2 bg-white border-3 border-black shadow-[4px_4px_0_0_#000]">
          بخش {page}
        </span>
        <button
          onClick={() => navigate(`/?page=${page + 1}`)}
          className="px-6 py-2 bg-blue-500 text-white border-3 border-black shadow-[4px_4px_0_0_#000] active:translate-y-1 active:shadow-none"
        >
          بعدی &larr;
        </button>
      </div>
    </div>
  );
};

export default Home;