import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const schema = z.object({
  title: z.string().min(6, 'Title required'),
  projectId: z.string().min(1, 'Select project'),
  component: z.string().min(1, 'Select component'),
  description: z.string().min(12, 'Add context'),
  priority: z.enum(['Critical', 'High', 'Medium', 'Low']),
  criticality: z.enum(['Critical', 'High', 'Medium', 'Low']),
  notes: z.string().optional()
});

type IssueForm = z.infer<typeof schema>;

export const IssueCreatePage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<IssueForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      projectId: 'p1',
      component: 'Payments',
      description: '',
      priority: 'High',
      criticality: 'High',
      notes: ''
    }
  });

  const onSubmit = (values: IssueForm) => {
    console.log('Created issue', values);
    navigate('/app/issues');
  };

  return (
    <motion.div className="space-y-8" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <PageHeader
        title="Raise a new issue"
        description="Capture business impact, map components, and preview how FixMate will push this context to Jira."
      />
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Issue details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
            <div>
              <label className="text-xs uppercase tracking-wide text-gray-400">Title</label>
              <input
                className="mt-1 h-11 w-full rounded-2xl border border-gray-200 px-4 dark:border-gray-700 dark:bg-gray-900"
                placeholder="Payments failing for premium tier"
                {...register('title')}
              />
              {errors.title && <p className="text-xs text-rose-500">{errors.title.message}</p>}
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="text-xs uppercase tracking-wide text-gray-400">Project</label>
                <select
                  className="mt-1 h-11 w-full rounded-2xl border border-gray-200 px-4 dark:border-gray-700 dark:bg-gray-900"
                  {...register('projectId')}
                >
                  <option value="p1">Aurora Banking</option>
                  <option value="p2">Nova Commerce</option>
                </select>
                {errors.projectId && <p className="text-xs text-rose-500">{errors.projectId.message}</p>}
              </div>
              <div>
                <label className="text-xs uppercase tracking-wide text-gray-400">Component</label>
                <select
                  className="mt-1 h-11 w-full rounded-2xl border border-gray-200 px-4 dark:border-gray-700 dark:bg-gray-900"
                  {...register('component')}
                >
                  <option value="Payments">Payments</option>
                  <option value="Authentication">Authentication</option>
                  <option value="Notifications">Notifications</option>
                </select>
                {errors.component && <p className="text-xs text-rose-500">{errors.component.message}</p>}
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wide text-gray-400">Description</label>
              <textarea
                rows={5}
                className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-3 dark:border-gray-700 dark:bg-gray-900"
                placeholder="Outline the issue, expected behavior, business impact, and reproduction steps."
                {...register('description')}
              />
              {errors.description && <p className="text-xs text-rose-500">{errors.description.message}</p>}
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="text-xs uppercase tracking-wide text-gray-400">Priority</label>
                <Controller
                  control={control}
                  name="priority"
                  render={({ field }) => (
                    <div className="flex gap-2">
                      {(['Critical', 'High', 'Medium', 'Low'] as const).map((option) => (
                        <button
                          key={option}
                          type="button"
                          className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                            field.value === option
                              ? 'bg-primary-500 text-white'
                              : 'bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
                          }`}
                          onClick={() => field.onChange(option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wide text-gray-400">Criticality</label>
                <select
                  className="mt-1 h-11 w-full rounded-2xl border border-gray-200 px-4 dark:border-gray-700 dark:bg-gray-900"
                  {...register('criticality')}
                >
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wide text-gray-400">Internal notes</label>
              <textarea
                rows={3}
                className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-3 dark:border-gray-700 dark:bg-gray-900"
                placeholder="Add any context for support or engineering teams"
                {...register('notes')}
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Jira preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
            <p>Summary: {watch('title') || 'Issue summary will appear here'}</p>
            <p>Project mapping: {watch('projectId')}</p>
            <p>Component: {watch('component')}</p>
            <p>Priority: {watch('priority')}</p>
            <p>Criticality: {watch('criticality')}</p>
            <p className="text-xs text-gray-400">Attachments upload available after submission.</p>
            <Button type="submit" className="w-full rounded-full" loading={isSubmitting}>
              Submit issue
            </Button>
          </CardContent>
        </Card>
      </form>
    </motion.div>
  );
};
