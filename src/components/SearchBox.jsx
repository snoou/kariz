import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?q=${query.trim()}`);
        }
    };

    return (
        <form onSubmit={handleSearch} className="flex justify-center mb-10">
            <input
                type="text"
                placeholder="نام مانگا را جستجو کنید..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-1/2 p-4 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="bg-blue-600 text-white px-8 py-4 rounded-r-lg hover:bg-blue-700 transition"
            >
                جستجو
            </button>
        </form>
    );
};

export default SearchBox;