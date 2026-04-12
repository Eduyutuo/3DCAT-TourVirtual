import { useState } from 'react';
import RoutePlanner from './components/RoutePlanner';
import GuidedViewer from './components/GuidedViewer';

export default function App() {
  const [viewMode, setViewMode] = useState('planning'); // 'planning' | 'playback'
  const [selectedRoute, setSelectedRoute] = useState([]);

  const handleStartTour = (route) => {
    setSelectedRoute(route);
    setViewMode('playback');
  };

  const handleExitTour = () => {
    setViewMode('planning');
    // Decide if we want to reset the route or keep it. Let's keep it so they can edit it.
  };

  return (
    <>
      {viewMode === 'planning' && (
        <RoutePlanner onStartTour={handleStartTour} />
      )}
      
      {viewMode === 'playback' && (
        <GuidedViewer route={selectedRoute} onExit={handleExitTour} />
      )}
    </>
  );
}
