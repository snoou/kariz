import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import MangaDetails from './pages/MangaDetails';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans min-w-[1280px]">
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/manga/:id" element={<MangaDetails />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;