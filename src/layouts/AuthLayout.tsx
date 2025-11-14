import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LifeBuoy } from 'lucide-react';

export const AuthLayout = () => (
  <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-white to-primary-100 dark:from-gray-950 dark:via-gray-900 dark:to-primary-950">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative mx-auto flex w-full max-w-5xl overflow-hidden rounded-4xl border border-white/40 bg-white/60 shadow-2xl backdrop-blur dark:border-gray-800/60 dark:bg-gray-950/80"
    >
      <div className="hidden w-1/2 flex-col justify-between bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 p-12 text-white lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
            <LifeBuoy className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/70">ResolveX</p>
            <h2 className="text-2xl font-semibold">FixMate</h2>
          </div>
        </div>
        <div className="space-y-6">
          <h3 className="text-3xl font-semibold leading-tight">Orchestrate issue resolution with precision.</h3>
          <p className="text-sm text-white/80">
            Empower business, support, and engineering teams with role-aware dashboards, instant Jira sync, and SLA intelligence.
          </p>
        </div>
        <p className="text-xs text-white/60">Developed by Hansana Ranaweera</p>
      </div>
      <div className="w-full p-10 lg:w-1/2 lg:p-16">
        <Outlet />
      </div>
    </motion.div>
  </div>
);
