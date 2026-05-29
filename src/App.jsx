import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home, { homeLoader } from './pages/Home';
import SearchResults, { searchLoader } from './pages/SearchResults';
import MangaDetails, { mangaDetailsLoader } from './pages/MangaDetails';
import NotFound from './pages/NotFound';
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '*',
        element: <NotFound />,
      },
      {
        index: true,
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: 'search',
        element: <SearchResults />,
        loader: searchLoader,
      },
      {
        path: 'manga/:id',
        element: <MangaDetails />,
        loader: mangaDetailsLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider
    router={router}
    fallbackElement={
      <div className="flex justify-center items-center min-h-screen text-xl font-semibold">
        در حال برقراری ارتباط با دروازه مانگا...
      </div>
    }
  />;
}

export default App;