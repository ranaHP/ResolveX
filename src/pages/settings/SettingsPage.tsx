import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { useForm } from 'react-hook-form';

interface SettingsForm {
  defaultSlaCritical: number;
  defaultSlaHigh: number;
  defaultSlaMedium: number;
  defaultSlaLow: number;
  jiraBaseUrl: string;
  jiraEmail: string;
  jiraToken: string;
  notifications: boolean;
}

export const SettingsPage = () => {
  const { register, handleSubmit } = useForm<SettingsForm>({
    defaultValues: {
      defaultSlaCritical: 4,
      defaultSlaHigh: 8,
      defaultSlaMedium: 24,
      defaultSlaLow: 72,
      jiraBaseUrl: 'https://your-domain.atlassian.net',
      jiraEmail: 'support@fixmate.io',
      jiraToken: '',
      notifications: true
    }
  });

  const onSubmit = (values: SettingsForm) => {
    console.log(values);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Control center"
        description="Adjust SLA defaults, manage Jira authentication, and fine-tune notification strategy."
      />
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>SLA defaults (hours)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <label className="text-xs uppercase tracking-wide text-gray-400">Critical</label>
              <input
                type="number"
                className="mt-1 h-11 w-full rounded-2xl border border-gray-200 px-4 dark:border-gray-700 dark:bg-gray-900"
                {...register('defaultSlaCritical', { valueAsNumber: true })}
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wide text-gray-400">High</label>
              <input
                type="number"
                className="mt-1 h-11 w-full rounded-2xl border border-gray-200 px-4 dark:border-gray-700 dark:bg-gray-900"
                {...register('defaultSlaHigh', { valueAsNumber: true })}
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wide text-gray-400">Medium</label>
              <input
                type="number"
                className="mt-1 h-11 w-full rounded-2xl border border-gray-200 px-4 dark:border-gray-700 dark:bg-gray-900"
                {...register('defaultSlaMedium', { valueAsNumber: true })}
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wide text-gray-400">Low</label>
              <input
                type="number"
                className="mt-1 h-11 w-full rounded-2xl border border-gray-200 px-4 dark:border-gray-700 dark:bg-gray-900"
                {...register('defaultSlaLow', { valueAsNumber: true })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Jira integration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <label className="text-xs uppercase tracking-wide text-gray-400">Base URL</label>
              <input
                className="mt-1 h-11 w-full rounded-2xl border border-gray-200 px-4 dark:border-gray-700 dark:bg-gray-900"
                {...register('jiraBaseUrl')}
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wide text-gray-400">Email / Username</label>
              <input
                className="mt-1 h-11 w-full rounded-2xl border border-gray-200 px-4 dark:border-gray-700 dark:bg-gray-900"
                {...register('jiraEmail')}
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wide text-gray-400">API token</label>
              <input
                type="password"
                className="mt-1 h-11 w-full rounded-2xl border border-gray-200 px-4 dark:border-gray-700 dark:bg-gray-900"
                {...register('jiraToken')}
              />
            </div>
            <Button type="button" variant="outline" className="rounded-full">
              Test connection
            </Button>
          </CardContent>
        </Card>

        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between rounded-2xl bg-gray-50 px-6 py-5 text-sm dark:bg-gray-900">
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">In-app & email alerts</p>
              <p className="text-xs text-gray-400">
                Receive nudges when SLAs breach, Jira sync fails, or business needs input.
              </p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" className="peer sr-only" {...register('notifications')} />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 transition peer-checked:bg-primary-500" />
              <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-5" />
            </label>
          </CardContent>
        </Card>
        <div className="xl:col-span-2">
          <Button type="submit" className="rounded-full px-6">
            Save preferences
          </Button>
        </div>
      </form>
    </div>
  );
};
