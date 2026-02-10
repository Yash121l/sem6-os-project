import React from 'react';
import { Download, FileText } from 'lucide-react';
import useSchedulerStore from '../../hooks/useScheduler';
import { exportToCSV, downloadJSON } from '../../utils/export';
import { Button } from '@/components/ui/button';

const ExportControls = () => {
  const { results, processes } = useSchedulerStore();

  const handleExportCSV = () => {
    if (!results || !results.processes) return;

    const headers = [
      'Process ID',
      'Arrival Time',
      'Burst Time',
      'Priority',
      'Completion Time',
      'Turnaround Time',
      'Waiting Time',
      'Response Time',
    ];
    const rows = results.processes.map((p) => [
      p.id,
      p.arrivalTime,
      p.burstTime,
      p.priority || '',
      p.completionTime,
      p.turnaroundTime,
      p.waitingTime,
      p.responseTime,
    ]);

    exportToCSV([headers, ...rows], 'scheduler_results.csv');
  };

  const handleExportJSON = () => {
    if (!results) return;
    downloadJSON({ processes, results }, 'scheduler_data.json');
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        onClick={handleExportCSV}
        disabled={!results}
        className="gap-2"
        size="sm"
      >
        <FileText className="h-4 w-4" />
        Export CSV
      </Button>
      <Button
        variant="outline"
        onClick={handleExportJSON}
        disabled={!results}
        className="gap-2"
        size="sm"
      >
        <Download className="h-4 w-4" />
        Save JSON
      </Button>
    </div>
  );
};

export default ExportControls;
