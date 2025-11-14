import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts';
import { dataService } from '../../services/dataService';
import { useEffect, useState } from 'react';
import { TrendPoint } from '../../types';
import { ChartTooltipContent } from '../../components/visuals/ChartContainer';
import { Button } from '../../components/ui/button';

export const ReportsPage = () => {
  const [trends, setTrends] = useState<TrendPoint[]>([]);

  useEffect(() => {
    dataService.getDashboard().then((payload) => setTrends(payload.trends));
  }, []);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Analytics & reports"
        description="Generate executive summaries, SLA posture decks, and root-cause analysis with one click."
        actions={<Button variant="secondary">Export PDF</Button>}
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>SLA compliance over time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer>
                <LineChart data={trends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
                  <XAxis dataKey="date" stroke="rgba(100,116,139,0.6)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(100,116,139,0.6)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="value" stroke="#0e6dff" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Business impact score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer>
                <AreaChart data={trends}>
                  <defs>
                    <linearGradient id="impact" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.6} />
                      <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
                  <XAxis dataKey="date" stroke="rgba(100,116,139,0.6)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(100,116,139,0.6)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="value" stroke="#22d3ee" strokeWidth={2} fill="url(#impact)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
