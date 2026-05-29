import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.trim().toLowerCase();
    
    if (q === 'hazhir' || q === 'هژیر') {
      navigate(`/manga/hazhir-sensei`);
    } else if (q) {
      navigate(`/search?q=${q}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row justify-center mb-12 gap-3 max-w-2xl mx-auto">
      <input
        type="text"
        placeholder="به دنبال کدام داستان می‌گردی؟..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full sm:w-2/3 p-4 border-3 border-black shadow-[4px_4px_0_0_#000] focus:outline-none focus:-translate-y-1 focus:shadow-[6px_6px_0_0_#000] transition-all font-bold text-lg"
      />
      <button 
        type="submit" 
        className="w-full sm:w-1/3 bg-yellow-400 text-black border-3 border-black shadow-[4px_4px_0_0_#000] px-8 py-4 font-comic text-2xl hover:bg-yellow-300 active:translate-y-1 active:translate-x-1 active:shadow-none transition-all"
      >
        جستجو کن!
      </button>
    </form>
  );
};

export default SearchBox;