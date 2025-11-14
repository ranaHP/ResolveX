import { Button } from '../../components/ui/button';
import { motion } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AccessDeniedPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-white to-primary-100 dark:from-gray-950 dark:via-gray-900 dark:to-primary-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md space-y-6 rounded-4xl border border-white/40 bg-white/70 p-10 text-center shadow-2xl backdrop-blur dark:border-gray-800/60 dark:bg-gray-950/80"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-rose-100 text-rose-500">
          <ShieldAlert className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Access Denied</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            You do not have sufficient permissions to view this area. Switch roles or contact your FixMate administrator.
          </p>
        </div>
        <Button onClick={() => navigate(-1)} className="w-full" variant="primary">
          Go back
        </Button>
      </motion.div>
    </div>
  );
};
