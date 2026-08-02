
import iconSearch from '@/assets/icons/search-normal.png'
import { Button } from '@/components/Button/Button';
import type { ChatSession, ChatHistorySidebarProps } from '@/types/chat';

export type { ChatSession };

export const ChatHistorySidebar = ({
  searchQuery,
  setSearchQuery,
  sessions,
  activeSessionId,
  onSelectSession,
}: ChatHistorySidebarProps) => {
  // 1. Filter conversations by search keywords.
  const filteredSessions = sessions.filter((s) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 2. Automatically group conversations by the group field (Default is TODAY if not assigned).
  const groupedSessions = filteredSessions.reduce((acc, session) => {
    const groupName = session.group || 'TODAY';
    if (!acc[groupName]) {
      acc[groupName] = [];
    }
    acc[groupName].push(session);
    return acc;
  }, {} as Record<string, ChatSession[]>);

  return (
<aside className="hidden lg:flex w-370 min-w-280 max-w-300 bg-surface-sidebar flex-col h-full border-r border-slate-200/50 select-none">
{/* Header Chats & Search Box */}
      <div className="px-6 pt-12 pb-2">
        <h1 className="text-2xl font-bold text-brand-dark tracking-tight">Chats</h1>

        <div className="relative pt-7">
          <img
            src={iconSearch}
            alt="Search"
            className="absolute left-4 top-[calc(50%+14px)] -translate-y-1/2 w-4 h-4 pointer-events-none"
          />

          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-100/80 text-sm rounded-2xl pl-10 pr-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-400 transition shadow-sm shadow-slate-200/50"
          />
        </div>
      </div>

      {/* List of historical groups */}
      <div className="flex-1 overflow-y-auto px-5 py-3 space-y-6">
        {Object.keys(groupedSessions).length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-400">
            {searchQuery ? 'No chats found' : ''}
          </div>
        ) : (
          Object.entries(groupedSessions).map(([groupTitle, items]) => (
            <div key={groupTitle} className="space-y-2">
              {/* Group title (TODAY, YESTERDAY, ...) */}
              <h3 className="text-xxs font-bold text-slate-400/90 tracking-wider uppercase px-1">
                {groupTitle}
              </h3>

              {/* List of items in the group */}
              <div className="space-y-1">
                {items.map((session) => {
                  const isActive = session.id === activeSessionId;
                  return (
                    <Button
                      key={session.id}
                      type="button"
                      variant="ghost"
                      size="none"
                      onClick={() => onSelectSession(session.id)}
                      className={`w-full justify-start text-left px-3.5 py-3 min-h-11 rounded-2xl text-xs md:text-sm transition font-medium truncate block ${
                        isActive
                          ? 'bg-surface-active text-brand-dark font-semibold'
                          : 'text-brand-dark hover:bg-slate-100/60'
                      }`}
                    >
                      {session.title}
                    </Button>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
};
