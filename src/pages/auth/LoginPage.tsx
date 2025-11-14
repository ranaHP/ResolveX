import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/button';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { login, selectAuth } from '../../store/slices/authSlice';
import { Navigate } from 'react-router-dom';

const schema = z.object({
  username: z.string().min(3, 'Username required'),
  password: z.string().min(4, 'Password required'),
  remember: z.boolean().optional()
});

type FormValues = z.infer<typeof schema>;

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { user, status, error } = useAppSelector(selectAuth);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { remember: true }
  });

  useEffect(() => {
    window.document.title = 'Login | FixMate';
  }, []);

  const onSubmit = (values: FormValues) => {
    dispatch(login({ ...values, remember: values.remember ?? false }));
  };

  if (user) {
    return <Navigate to="/app/dashboard" replace />;
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="space-y-2 text-center lg:text-left">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">Welcome back</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Sign in to orchestrate projects, issues, and Jira workflows with precision.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Email</label>
          <input
            type="email"
            placeholder="you@company.com"
            className="h-12 w-full rounded-2xl border border-gray-200 bg-white px-4 text-sm outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-200 dark:border-gray-700 dark:bg-gray-900"
            {...register('username')}
          />
          {errors.username && <p className="text-xs text-rose-500">{errors.username.message}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="h-12 w-full rounded-2xl border border-gray-200 bg-white px-4 text-sm outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-200 dark:border-gray-700 dark:bg-gray-900"
            {...register('password')}
          />
          {errors.password && <p className="text-xs text-rose-500">{errors.password.message}</p>}
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" className="rounded border-gray-300" {...register('remember')} />
            Remember me
          </label>
          <button type="button" className="text-primary-500 hover:text-primary-600">
            Forgot password?
          </button>
        </div>
        {error && <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-500">{error}</div>}
        <Button type="submit" className="w-full" loading={status === 'loading'}>
          Sign in
        </Button>
        <p className="text-center text-xs text-gray-400">
          Use emails like admin@fixmate.io, super@fixmate.io, support@fixmate.io for different experiences.
        </p>
      </form>
    </motion.div>
  );
};
