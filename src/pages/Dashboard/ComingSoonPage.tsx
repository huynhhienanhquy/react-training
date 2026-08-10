import { useLocation } from 'react-router-dom';

const pageTitles: Record<string, string> = {
  '/favorites': 'Favorites',
  '/rewards': 'Rewards',
  '/routes-map': 'Routes Map',
  '/community': 'Community',
  '/settings': 'Settings',
};

export const ComingSoonPage = () => {
  const { pathname } = useLocation();
  const title = pageTitles[pathname] ?? 'Page';

  return (
    <main className="flex-1 bg-surface-section flex items-center justify-center p-6">
      <div className="max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-brand-dark">{title}</h1>
        <p className="mt-2 text-sm text-slate-500">This feature is coming soon.</p>
      </div>
    </main>
  );
};
