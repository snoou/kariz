import { useEffect, useState } from 'react';
import apiClient from '../api/axiosClient';
import SearchBox from '../components/SearchBox';
import MangaCard from '../components/MangaCard';

const Home = () => {
    const [topMangas, setTopMangas] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTopMangas = async () => {
            setLoading(true);
            try {
                const response = await apiClient.get(`/top/manga?page=${page}`);
                setTopMangas(response.data.data || []);
            } catch (error) {
                console.error("خطا در دریافت برترین مانگاها", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTopMangas();
    }, [page]);

    return (
        <div>
            <h1 className="text-4xl font-bold text-center mb-8">دروازه‌ای به دنیای مانگا</h1>
            <SearchBox />
            <h2 className="text-2xl font-semibold mb-6">برترین مانگاها</h2>
            {loading ? (
                <p className="text-center">در حال بارگذاری...</p>
            ) : (
                <div className="grid grid-cols-5 gap-6">
                    {topMangas.map((manga) => (
                        <MangaCard key={manga.id} manga={manga} />
                    ))}
                </div>
            )}

            <div className="flex justify-center mt-10 gap-4">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(p => p - 1)}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    قبلی
                </button>
                <span className="px-4 py-2">صفحه {page}</span>
                <button
                    onClick={() => setPage(p => p + 1)}
                    className="px-4 py-2 bg-gray-200 rounded"
                >
                    بعدی
                </button>
            </div>
        </div>
    );
};

export default Home;