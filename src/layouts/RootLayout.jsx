import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className="min-h-screen text-gray-900 manga-bg">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-7xl">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;