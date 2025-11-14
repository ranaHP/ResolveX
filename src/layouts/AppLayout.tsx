import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/navigation/Sidebar';
import { Topbar } from '../components/navigation/Topbar';
import { useAppSelector } from '../store/hooks';
import { selectCurrentUser } from '../store/slices/authSlice';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';

export const AppLayout = () => {
  const user = useAppSelector(selectCurrentUser);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900">
      <Sidebar role={user?.role ?? null} collapsed={false} />
      <AnimatePresence>
        {isSidebarOpen && (
          <Dialog open={isSidebarOpen} onClose={() => setSidebarOpen(false)} className="relative z-50 xl:hidden">
            <motion.div className="fixed inset-0 bg-black/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <div className="fixed inset-y-0 left-0 flex max-w-xs">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ duration: 0.3 }}
                className="flex w-72 flex-col border-r border-gray-100 bg-white px-6 py-8 dark:border-gray-800 dark:bg-gray-950"
              >
                <Sidebar role={user?.role ?? null} collapsed={false} isMobile />
              </motion.div>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
      <div className="xl:pl-72">
        <Topbar
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          userName={user?.name}
          avatar={user?.avatar ?? 'https://i.pravatar.cc/150?img=8'}
        />
        <main className="mx-auto w-full max-w-[1400px] px-6 pb-16 pt-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
