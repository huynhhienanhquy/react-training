import React from 'react';
import iconSearch from '../../assets/icons/search-normal.png'

export interface ChatSession {
  id: string;
  title: string;
  group?: string;
}

interface ChatHistorySidebarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  sessions: ChatSession[];
  activeSessionId: string | null;
  onSelectSession: (id: string) => void;
}

export const ChatHistorySidebar: React.FC<ChatHistorySidebarProps> = ({
  searchQuery,
  setSearchQuery,
  sessions,
  activeSessionId,
  onSelectSession,
}) => {
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
    <aside className="hidden lg:flex w-72 md:w-80 bg-surface-sidebar flex-col h-full shrink-0 border-r border-slate-200/50 select-none">
      {/* Header Chats & Search Box */}
      <div className="p-6 pb-2">
        <h1 className="text-2xl font-bold text-brand-dark tracking-tight">Chats</h1>

        <div className="mt-4 relative">
          <img src={iconSearch} alt="Search" className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
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
                    <button
                      key={session.id}
                      onClick={() => onSelectSession(session.id)}
                      className={`w-full text-left px-3.5 py-3 min-h-11 rounded-2xl text-xs md:text-sm transition font-medium truncate block ${
                        isActive
                          ? 'bg-surface-active text-brand-dark font-semibold'
                          : 'text-brand-dark hover:bg-slate-100/60'
                      }`}
                    >
                      {session.title}
                    </button>
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
