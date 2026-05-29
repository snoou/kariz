import { useLoaderData, useNavigate } from 'react-router-dom';
import apiClient from '../api/axiosClient';
import MangaCard from '../components/MangaCard';
import SearchBox from '../components/SearchBox';

export const searchLoader = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("q");
  const page = url.searchParams.get("page") || 1;

  if (!query) return { results: [], query: '', page: 1 };

  try {
    const response = await apiClient.get(`/manga?q=${query}&page=${page}`);
    return { results: response.data.data || [], query, page: Number(page) };
  } catch (error) {
    console.error("خطا در جستجو", error);
    return { results: [], query, page: Number(page) };
  }
};

const SearchResults = () => {
  const { results, query, page } = useLoaderData();
  const navigate = useNavigate();

  const handlePageChange = (newPage) => {
    navigate(`/search?q=${query}&page=${newPage}`);
  };

  return (
    <div>
      <SearchBox />
      <h2 className="text-xl md:text-2xl font-semibold mb-6">
        نتایج جستجو برای: "{query}"
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
        {results.length > 0 ? (
          results.map((manga) => (
            <MangaCard key={manga.mal_id} manga={manga} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">موردی یافت نشد.</p>
        )}
      </div>

      {results.length > 0 && (
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
      )}
    </div>
  );
};

export default SearchResults;