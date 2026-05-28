import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import apiClient from '../api/axiosClient';
import MangaCard from '../components/MangaCard';
import SearchBox from '../components/SearchBox';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');

    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!query) return;

        const fetchSearchResults = async () => {
            setLoading(true);
            try {
                // در بخش useEffect:
                const response = await apiClient.get(`/manga?q=${query}&page=${page}`);
                setResults(response.data.data || []);
            } catch (error) {
                console.error("خطا در جستجو", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [query, page]);

    return (
        <div>
            <SearchBox />
            <h2 className="text-2xl font-semibold mb-6">نتایج جستجو برای: "{query}"</h2>

            {loading ? (
                <p className="text-center">در حال بارگذاری...</p>
            ) : (
                <div className="grid grid-cols-5 gap-6">
                    {results.length > 0 ? (
                        results.map((manga) => (
                            <MangaCard key={manga.id} manga={manga} />
                        ))
                    ) : (
                        <p className="col-span-5 text-center text-gray-500">موردی یافت نشد.</p>
                    )}
                </div>
            )}

            {/* دکمه‌های صفحه‌بندی مشابه هوم‌پیج در اینجا قرار می‌گیرد */}
        </div>
    );
};

export default SearchResults;