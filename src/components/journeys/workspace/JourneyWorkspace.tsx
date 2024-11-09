import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { 
  ZoomIn, ZoomOut, MousePointer, Hand, Undo, Redo, 
  Save, Grid, Layout, Plus 
} from 'lucide-react';
import { LeftSidebar } from './LeftSidebar';
import { RightSidebar } from './RightSidebar';
import { JourneyCanvas } from './JourneyCanvas';
import { Toolbar } from './Toolbar';
import { useJourney } from '../../../hooks/useJourney';

export function JourneyWorkspace() {
  const { journey, updateJourney } = useJourney();
  const [zoom, setZoom] = useState(100);
  const [tool, setTool] = useState<'select' | 'hand' | 'connect'>('select');
  const [showGrid, setShowGrid] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handleZoom = (direction: 'in' | 'out') => {
    setZoom(prev => {
      const newZoom = direction === 'in' ? prev + 10 : prev - 10;
      return Math.min(Math.max(newZoom, 50), 200);
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
        {/* Left Sidebar */}
        <LeftSidebar />

        {/* Main Workspace */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Toolbar */}
          <div className="h-12 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setTool('select')}
                className={`p-1.5 rounded ${
                  tool === 'select' 
                    ? 'bg-gray-100 dark:bg-gray-700' 
                    : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                <MousePointer className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTool('hand')}
                className={`p-1.5 rounded ${
                  tool === 'hand' 
                    ? 'bg-gray-100 dark:bg-gray-700' 
                    : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                <Hand className="w-4 h-4" />
              </button>
              <div className="w-px h-4 bg-gray-200 dark:bg-gray-700" />
              <button
                onClick={() => handleZoom('in')}
                className="p-1.5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {zoom}%
              </span>
              <button
                onClick={() => handleZoom('out')}
                className="p-1.5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <div className="w-px h-4 bg-gray-200 dark:bg-gray-700" />
              <button
                onClick={() => setShowGrid(!showGrid)}
                className={`p-1.5 rounded ${
                  showGrid 
                    ? 'bg-gray-100 dark:bg-gray-700' 
                    : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <button className="p-1.5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                <Undo className="w-4 h-4" />
              </button>
              <button className="p-1.5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                <Redo className="w-4 h-4" />
              </button>
              <div className="w-px h-4 bg-gray-200 dark:bg-gray-700" />
              <button className="p-1.5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                <Layout className="w-4 h-4" />
              </button>
              <button 
                className="flex items-center px-3 py-1.5 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                onClick={() => setIsSaving(true)}
              >
                <Save className="w-4 h-4 mr-1.5" />
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 overflow-hidden">
            <JourneyCanvas
              zoom={zoom}
              tool={tool}
              showGrid={showGrid}
              journey={journey}
              onUpdate={updateJourney}
            />
          </div>

          {/* Floating Quick Actions */}
          <Toolbar />
        </div>

        {/* Right Sidebar */}
        <RightSidebar />
      </div>
    </DndProvider>
  );
}

export default JourneyWorkspace;