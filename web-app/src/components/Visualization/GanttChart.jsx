import React, { useState } from 'react';
import useSchedulerStore from '../../hooks/useScheduler';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { Maximize2, MoveHorizontal } from 'lucide-react';
import clsx from 'clsx';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const GanttChart = () => {
  const { results, processes } = useSchedulerStore();
  const [viewMode, setViewMode] = useState('fit'); // 'fit' or 'scroll'

  if (!results || !results.ganttChart || results.ganttChart.length === 0) {
    return (
      <Card className="w-full h-32 flex items-center justify-center text-muted-foreground border-dashed border-2 bg-muted/20 shadow-none">
        {processes.length === 0
          ? 'Add processes to start'
          : 'No schedule generated'}
      </Card>
    );
  }

  const { ganttChart } = results;
  const totalTime = ganttChart[ganttChart.length - 1].end;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <div className="bg-muted p-1 rounded-lg flex gap-1">
          <Button
            variant={viewMode === 'fit' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('fit')}
            className="h-8 text-xs gap-2"
          >
            <Maximize2 size={14} />
            Fit
          </Button>
          <Button
            variant={viewMode === 'scroll' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('scroll')}
            className="h-8 text-xs gap-2"
          >
            <MoveHorizontal size={14} />
            Scroll
          </Button>
        </div>
      </div>

      <div
        className={clsx(
          'w-full pb-4 custom-scrollbar',
          viewMode === 'scroll' && 'overflow-x-auto'
        )}
      >
        <div
          className="min-w-full transition-all duration-300 relative pt-6"
          style={{
            width:
              viewMode === 'scroll'
                ? `${Math.max(100, totalTime * 40)}px`
                : '100%',
          }}
        >
          <TooltipProvider>
            <div className="flex h-16 rounded-xl overflow-hidden border border-border bg-card relative mb-2 shadow-sm">
              <AnimatePresence>
                {ganttChart.map((block, index) => (
                  <Tooltip key={`${block.processId}-${index}-${block.start}`}>
                    <TooltipTrigger asChild>
                      <motion.div
                        initial={{ opacity: 0, scaleY: 0 }}
                        animate={{ opacity: 1, scaleY: 1 }}
                        exit={{ opacity: 0, scaleY: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="flex items-center justify-center relative group border-r border-white/20 last:border-r-0 hover:brightness-110 transition-all cursor-default"
                        style={{
                          width: `${((block.end - block.start) / totalTime) * 100}%`,
                          backgroundColor: block.color,
                        }}
                      >
                        <span className="text-white text-xs font-bold truncate px-1 drop-shadow-sm">
                          {block.processId}
                        </span>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="flex flex-col gap-1">
                        <div className="font-bold border-b pb-1 mb-1">
                          Process {block.processId}
                        </div>
                        <div className="grid grid-cols-2 gap-x-3 text-xs">
                          <span className="text-muted-foreground">Start:</span>
                          <span>{block.start}</span>
                          <span className="text-muted-foreground">End:</span>
                          <span>{block.end}</span>
                          <span className="text-muted-foreground">
                            Duration:
                          </span>
                          <span>{block.end - block.start}</span>
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </AnimatePresence>
            </div>
          </TooltipProvider>

          {/* Time Scale */}
          <div className="relative h-6 text-xs text-muted-foreground font-mono mt-1">
            <div className="absolute left-0 transform -translate-x-1/2 bg-background px-1 rounded border border-border">
              0
            </div>

            {ganttChart.map((block, index) => (
              <div
                key={`time-${index}`}
                className="absolute transform -translate-x-1/2 flex flex-col items-center group z-10"
                style={{ left: `${(block.end / totalTime) * 100}%` }}
              >
                <div className="h-3 w-px bg-border mb-1 group-hover:bg-primary transition-colors"></div>
                <span className="bg-background px-1 rounded border border-border group-hover:text-primary group-hover:border-primary transition-colors">
                  {block.end}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GanttChart;
