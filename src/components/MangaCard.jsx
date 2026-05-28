import { Link } from 'react-router-dom';

const MangaCard = ({ manga }) => {
  const imageUrl = manga.images.jpg.image_url;

  return (
    <Link to={`/manga/${manga.mal_id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        <img 
          src={imageUrl} 
          alt={manga.title} 
          className="w-full h-80 object-cover"
        />
        <div className="p-4 flex-1">
          <h3 className="text-lg font-bold truncate">{manga.title}</h3>
          <p className="text-gray-600 text-sm mt-2 line-clamp-3">
            {manga.synopsis || 'خلاصه‌ای برای این مانگا ثبت نشده است.'}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MangaCard;