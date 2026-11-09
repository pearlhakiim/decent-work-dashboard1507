import React, { useState, useEffect } from 'react';
import indikatorData from './data/indikatorLengkap.json';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import OverviewView from './components/OverviewView';
import GroupDetailView from './components/GroupDetailView';
import LoginPage from './components/LoginPage';
import { getStoredUser, logoutUser } from './data/auth';

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => getStoredUser());
  const [activeGroupId, setActiveGroupId] = useState('overview');
  const [activeSubId, setActiveSubId] = useState(null);
  const [selectedYear, setSelectedYear] = useState(indikatorData.meta.defaultYear || 2025);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
  };

  // If not logged in, show LoginPage
  if (!currentUser) {
    return <LoginPage onLoginSuccess={(user) => setCurrentUser(user)} />;
  }

  const activeGroup =
    activeGroupId !== 'overview' ? indikatorData.indicator_groups[activeGroupId] : null;

  const activeSub =
    activeGroup && activeSubId
      ? activeGroup.sub_indicators?.[activeSubId] || Object.values(activeGroup.sub_indicators || {})[0]
      : (activeGroup ? Object.values(activeGroup.sub_indicators || {})[0] : null);

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-800 antialiased font-sans relative overflow-x-hidden">
      {/* Mobile Backdrop when Sidebar is open */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-slate-950/60 z-20 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        indicatorGroups={indikatorData.indicator_groups}
        activeGroupId={activeGroupId}
        setActiveGroupId={setActiveGroupId}
        activeSubId={activeSubId}
        setActiveSubId={setActiveSubId}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header
          meta={indikatorData.meta}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          activeGroup={activeGroup}
          activeSub={activeSub}
          currentUser={currentUser}
          onLogout={handleLogout}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        />

        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">
          {activeGroupId === 'overview' ? (
            <OverviewView
              indicatorGroups={indikatorData.indicator_groups}
              tablesByFile={indikatorData.tables_by_file}
              selectedYear={selectedYear}
              onSelectGroup={(groupId) => {
                setActiveGroupId(groupId);
                const grp = indikatorData.indicator_groups[groupId];
                const firstSub = grp ? Object.values(grp.sub_indicators || {})[0] : null;
                setActiveSubId(firstSub ? firstSub.id : null);
              }}
            />
          ) : (
            <GroupDetailView
              group={activeGroup}
              activeSubId={activeSubId}
              setActiveSubId={setActiveSubId}
              tablesByFile={indikatorData.tables_by_file}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
            />
          )}
        </main>
      </div>
    </div>
  );
}
