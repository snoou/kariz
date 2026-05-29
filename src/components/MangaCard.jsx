import { Link } from 'react-router-dom';

const MangaCard = ({ manga }) => {
  const imageUrl = manga.images?.jpg?.image_url || 'https://via.placeholder.com/300x400';

  return (
    <Link to={`/manga/${manga.mal_id}`} className="block h-full">
      <div className="comic-panel flex flex-col h-full rounded-xl overflow-hidden relative group">
        {/* برچسب امتیاز به سبک دیالوگ باکس */}
        <div className="absolute top-2 right-2 bg-yellow-400 border-2 border-black font-bold px-2 py-1 transform rotate-3 z-10 text-sm">
          ★ {manga.score || 'N/A'}
        </div>

        <div className="border-b-3 border-black overflow-hidden relative">
          <img
            src={imageUrl}
            alt={manga.title}
            className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0"
          />
        </div>

        <div className="p-4 flex-1 bg-white">
          <h3 className="text-xl font-comic line-clamp-1 mb-2 text-black">{manga.title}</h3>
          <p className="text-gray-700 text-sm mt-2 line-clamp-3 font-medium leading-relaxed">
            {manga.synopsis || 'خلاصه‌ای در دسترس نیست...'}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MangaCard;