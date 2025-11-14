import { Menu, Search, SunMedium, Moon, Bell } from 'lucide-react';
import { Button } from '../ui/button';
import { useTheme } from '../../hooks/useTheme';
import { useAppDispatch } from '../../store/hooks';
import { logout } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface TopbarProps {
  onToggleSidebar?: () => void;
  userName?: string;
  avatar?: string;
}

export const Topbar = ({ onToggleSidebar, userName, avatar }: TopbarProps) => {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-100 bg-white/60 px-6 backdrop-blur dark:border-gray-800 dark:bg-gray-950/60">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="xl:hidden" onClick={onToggleSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
        <div className="relative hidden md:flex">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            placeholder="Search issues, projects, users..."
            className="h-11 w-80 rounded-full border border-transparent bg-gray-100/60 pl-12 pr-4 text-sm text-gray-700 outline-none transition focus:border-primary-500 focus:bg-white dark:bg-gray-900/60 dark:text-gray-200"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === 'dark' ? <SunMedium className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-3 rounded-full bg-white/80 px-3 py-1.5 text-left shadow-sm transition hover:bg-primary-50/80 dark:bg-gray-900/80"
        >
          <img src={avatar} alt={userName} className="h-9 w-9 rounded-full object-cover" />
          <div className="hidden text-sm font-medium text-gray-700 dark:text-gray-200 md:block">
            <div>{userName}</div>
            <span className="text-xs text-gray-400">View profile</span>
          </div>
        </button>
      </div>
      <Transition show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-sm rounded-3xl border border-gray-100 bg-white p-6 shadow-xl transition dark:border-gray-800 dark:bg-gray-900">
                <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-gray-100">Account</Dialog.Title>
                <div className="mt-4 space-y-4 text-sm text-gray-500 dark:text-gray-300">
                  <p>Signed in as {userName}</p>
                  <Button className="w-full" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </header>
  );
};
