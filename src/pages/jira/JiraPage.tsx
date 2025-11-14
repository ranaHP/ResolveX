import { useEffect, useState } from 'react';
import { dataService } from '../../services/dataService';
import { JiraProject } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';

interface JiraForm {
  issueId: string;
  jiraProjectId: string;
  component: string;
  labels: string;
}

export const JiraPage = () => {
  const [projects, setProjects] = useState<JiraProject[]>([]);
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, watch, reset } = useForm<JiraForm>({
    defaultValues: { issueId: '', jiraProjectId: '', component: '', labels: '' }
  });

  useEffect(() => {
    dataService.getJiraProjects().then(setProjects);
  }, []);

  const onSubmit = (values: JiraForm) => {
    dataService
      .createJiraTicket({
        issueId: values.issueId,
        jiraProjectId: values.jiraProjectId,
        component: values.component,
        labels: values.labels.split(',').map((label) => label.trim()).filter(Boolean)
      })
      .then((result) => {
        alert(`Jira ticket ${result.key} created successfully`);
        setOpen(false);
        reset();
      });
  };

  const selectedProject = projects.find((project) => project.id === watch('jiraProjectId'));

  return (
    <div className="space-y-8">
      <PageHeader
        title="Jira accelerator"
        description="Map FixMate issues to Jira epics and stories in seconds with reusable templates and smart field mapping."
        actions={
          <Button className="rounded-full" onClick={() => setOpen(true)}>
            Launch Jira sync
          </Button>
        }
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-500 dark:text-gray-300">
              <p>Key: {project.key}</p>
              <p>Components: {project.components.join(', ')}</p>
              <Button variant="ghost" className="rounded-full" onClick={() => setOpen(true)}>
                Create issue
              </Button>
            </CardContent>
          </Card>
        ))}
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
              <Dialog.Panel className="w-full max-w-lg space-y-6 rounded-3xl border border-gray-100 bg-white p-8 shadow-xl dark:border-gray-800 dark:bg-gray-900">
                <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-gray-100">Create Jira ticket</Dialog.Title>
                <form className="space-y-4 text-sm text-gray-600 dark:text-gray-300" onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label className="text-xs uppercase tracking-wide text-gray-400">FixMate issue ID</label>
                    <input
                      className="mt-1 h-11 w-full rounded-2xl border border-gray-200 px-4 dark:border-gray-700 dark:bg-gray-900"
                      placeholder="FM-1002"
                      {...register('issueId')}
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wide text-gray-400">Jira project</label>
                    <select
                      className="mt-1 h-11 w-full rounded-2xl border border-gray-200 px-4 dark:border-gray-700 dark:bg-gray-900"
                      {...register('jiraProjectId')}
                    >
                      <option value="">Select project</option>
                      {projects.map((project) => (
                        <option value={project.id} key={project.id}>
                          {project.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wide text-gray-400">Component</label>
                    <select
                      className="mt-1 h-11 w-full rounded-2xl border border-gray-200 px-4 dark:border-gray-700 dark:bg-gray-900"
                      {...register('component')}
                    >
                      <option value="">Select component</option>
                      {selectedProject?.components.map((component) => (
                        <option value={component} key={component}>
                          {component}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wide text-gray-400">Labels</label>
                    <input
                      className="mt-1 h-11 w-full rounded-2xl border border-gray-200 px-4 dark:border-gray-700 dark:bg-gray-900"
                      placeholder="incident, vip"
                      {...register('labels')}
                    />
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Create Jira issue</Button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
