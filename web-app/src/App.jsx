import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Sidebar from './components/Layout/Sidebar';
import ProcessInput from './components/Input/ProcessInput';
import GanttChart from './components/Visualization/GanttChart';
import MetricsTable from './components/Metrics/MetricsTable';
import AlgorithmSelector from './components/Controls/AlgorithmSelector';
import PlaybackControls from './components/Controls/PlaybackControls';
import ExportControls from './components/Controls/ExportControls';
import PresetSelector from './components/Input/PresetSelector';
import AlgorithmExplanation from './components/Educational/AlgorithmExplanation';
import AlgorithmsLanding from './components/Educational/AlgorithmsLanding';
import ComparisonView from './components/Comparison/ComparisonView';
import Terms from './components/Legal/Terms';
import Privacy from './components/Legal/Privacy';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const VisualizerParams = () => (
  <>
    {/* Controls Section */}
    <Card className="mb-6 animate-in fade-in slide-in-from-top-4 duration-500 border-border shadow-sm">
      <CardContent className="p-4 flex flex-col md:flex-row flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <AlgorithmSelector />
          <div className="hidden sm:block h-6 w-px bg-border mx-2"></div>
          <PresetSelector />
        </div>
        <div className="flex flex-wrap justify-center sm:flex-nowrap items-center gap-4 w-full md:w-auto">
          <PlaybackControls />
          <div className="hidden sm:block h-6 w-px bg-border mx-2"></div>
          <ExportControls />
        </div>
      </CardContent>
    </Card>

    {/* Input Section */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="lg:col-span-1 h-full">
        <ProcessInput />
      </div>
      <div className="lg:col-span-2 space-y-6">
        {/* Visualization */}
        <Card className="border-border shadow-sm hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Gantt Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <GanttChart />
          </CardContent>
        </Card>

        {/* Metrics */}
        <Card className="border-border shadow-sm hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <MetricsTable />
          </CardContent>
        </Card>
      </div>
    </div>
  </>
);

const AlgorithmsPage = () => (
  <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
    <h2 className="text-2xl font-bold mb-6 text-foreground">
      Algorithm Details
    </h2>
    <AlgorithmSelector />
    <div className="mt-6">
      <AlgorithmExplanation />
    </div>
  </div>
);

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <Router>
      <div className="flex flex-col h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary transition-colors duration-300">
        <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="flex flex-1 overflow-hidden relative">
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
          <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar relative w-full">
            <div className="max-w-7xl mx-auto">
              <Routes>
                <Route
                  path="/"
                  element={<Navigate to="/visualizer" replace />}
                />
                <Route path="/visualizer" element={<VisualizerParams />} />
                <Route path="/algorithms" element={<AlgorithmsLanding />} />
                <Route
                  path="/algorithms/:id"
                  element={<AlgorithmExplanation />}
                />
                <Route
                  path="/comparison"
                  element={
                    <div className="animate-in fade-in duration-500">
                      <ComparisonView />
                    </div>
                  }
                />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
              </Routes>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
