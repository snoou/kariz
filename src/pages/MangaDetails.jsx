import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../api/axiosClient';

const MangaDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [manga, setManga] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await apiClient.get(`/manga/${id}`);
                setManga(response.data.data);
            } catch (error) {
                console.error("خطا در دریافت جزئیات", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    if (loading) return <p className="text-center mt-20">در حال بارگذاری...</p>;
    if (!manga) return <p className="text-center mt-20 text-red-500">مانگا پیدا نشد.</p>;

    return (
        <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
            <button onClick={() => navigate(-1)} className="mb-6 text-blue-600 hover:underline">
                &larr; بازگشت
            </button>

            <div className="flex gap-8">
                <img
                    src={manga.coverImage || 'https://via.placeholder.com/400x600'}
                    alt={manga.title}
                    className="w-1/3 rounded-lg shadow-md object-cover"
                />
                <div className="w-2/3">
                    <h1 className="text-4xl font-bold mb-4">{manga.title}</h1>
                    <div className="flex gap-4 mb-6 text-sm text-gray-600">
                        <span>وضعیت: {manga.status}</span>
                        <span>امتیاز: {manga.score}/10</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">خلاصه داستان:</h3>
                    <p className="text-gray-700 leading-relaxed text-justify">
                        {manga.synopsis}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MangaDetails;