import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Map, Plus, ArrowDown, Pencil, LayoutPanelLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { TouchpointDialog } from './TouchpointDialog';
import { JourneyPreview } from './JourneyPreview';
import { useApp } from '@/context/AppContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { PersonaSelector } from '../shared/PersonaSelector';
import { CoverImageUpload } from './CoverImageUpload';

const journeyStates = [
  { value: 'draft', label: 'Draft' },
  { value: 'current', label: 'Current State' },
  { value: 'future', label: 'To-Be State' }
] as const;

type JourneyState = typeof journeyStates[number]['value'];

export default function JourneyBuilder() {
  const navigate = useNavigate();
  const { addJourney } = useApp();
  const [isSaving, setIsSaving] = useState(false);
  const [journeyDetails, setJourneyDetails] = useState({
    name: '',
    description: '',
    coverImage: null as string | null,
    personaIds: [] as string[],
    state: 'draft' as JourneyState
  });
  const [stages, setStages] = useState([
    {
      id: '1',
      name: 'Awareness',
      touchpoints: [
        { id: '1', name: 'Initial Contact', description: 'First interaction with the product', emotion: 'neutral' }
      ]
    }
  ]);
  const [editingTouchpoint, setEditingTouchpoint] = useState<{
    stageId: string;
    touchpoint?: any;
  } | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleStageAdd = () => {
    setStages([
      ...stages,
      {
        id: crypto.randomUUID(),
        name: `Stage ${stages.length + 1}`,
        touchpoints: []
      }
    ]);
  };

  const handleStageUpdate = (stageId: string, updates: any) => {
    setStages(stages.map(stage => 
      stage.id === stageId ? { ...stage, ...updates } : stage
    ));
  };

  const handleTouchpointSave = (touchpoint: any) => {
    if (!editingTouchpoint) return;

    const { stageId } = editingTouchpoint;
    const stage = stages.find(s => s.id === stageId);
    
    if (!stage) return;

    const updatedTouchpoints = editingTouchpoint.touchpoint
      ? stage.touchpoints.map(t => 
          t.id === editingTouchpoint.touchpoint.id ? { ...touchpoint, id: t.id } : t
        )
      : [...stage.touchpoints, { ...touchpoint, id: crypto.randomUUID() }];

    handleStageUpdate(stageId, { touchpoints: updatedTouchpoints });
    setEditingTouchpoint(null);
  };

  const handleSave = async () => {
    if (!journeyDetails.name) {
      alert('Please enter a journey name');
      return;
    }

    try {
      setIsSaving(true);

      const journey = {
        id: crypto.randomUUID(),
        name: journeyDetails.name,
        description: journeyDetails.description,
        coverImage: journeyDetails.coverImage,
        personaIds: journeyDetails.personaIds,
        state: journeyDetails.state,
        status: 'draft' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        stages: stages.map((stage, index) => ({
          id: stage.id,
          name: stage.name,
          order: index,
          touchpoints: stage.touchpoints.map(touchpoint => ({
            id: touchpoint.id,
            name: touchpoint.name,
            description: touchpoint.description,
            emotion: touchpoint.emotion,
            customerAction: touchpoint.customerAction,
            customerJob: touchpoint.customerJob,
            image: touchpoint.image,
            insights: touchpoint.insights || {
              needs: [],
              painPoints: [],
              opportunities: []
            },
            metrics: touchpoint.metrics || {
              satisfaction: 0,
              effort: 0,
              completion: 0
            }
          }))
        }))
      };

      await addJourney(journey);
      navigate('/journeys');
    } catch (error) {
      console.error('Failed to save journey:', error);
      alert('Failed to save journey. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/journeys')}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Journeys
          </Button>
          <div className="flex items-center gap-2">
            <Button 
              variant={showPreview ? "default" : "outline"}
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
            >
              <LayoutPanelLeft className="w-4 h-4 mr-2" />
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </Button>
            <Button 
              size="sm"
              onClick={handleSave}
              disabled={isSaving}
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Journey'}
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1 max-w-2xl">
            <Input
              value={journeyDetails.name}
              onChange={(e) => setJourneyDetails(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter journey name"
              className="text-2xl font-bold mb-2 border-none bg-transparent px-0 h-auto focus-visible:ring-0"
            />
            <Textarea
              value={journeyDetails.description}
              onChange={(e) => setJourneyDetails(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the purpose of this journey"
              className="text-muted-foreground resize-none border-none bg-transparent px-0 focus-visible:ring-0"
              rows={2}
            />
          </div>
        </div>

        {/* Cover Image */}
        <CoverImageUpload
          image={journeyDetails.coverImage}
          onChange={(image) => setJourneyDetails(prev => ({ ...prev, coverImage: image }))}
        />

        {/* Journey Settings */}
        <div className="mb-8 grid grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium mb-2 block">Associated Personas</label>
            <PersonaSelector
              selectedIds={journeyDetails.personaIds}
              onChange={(ids) => setJourneyDetails(prev => ({ ...prev, personaIds: ids }))}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Journey State</label>
            <Select
              value={journeyDetails.state}
              onValueChange={(value: JourneyState) => 
                setJourneyDetails(prev => ({ ...prev, state: value }))
              }
            >
              {journeyStates.map(state => (
                <Select.Option key={state.value} value={state.value}>
                  {state.label}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Journey Canvas - Vertical Layout */}
          <div className={`space-y-6 ${showPreview ? 'w-1/2' : 'w-full max-w-3xl mx-auto'}`}>
            {stages.map((stage, index) => (
              <React.Fragment key={stage.id}>
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="bg-primary/10 text-primary text-sm font-medium px-2 py-1 rounded">
                        Stage {index + 1}
                      </div>
                      <input
                        type="text"
                        value={stage.name}
                        onChange={(e) => handleStageUpdate(stage.id, { name: e.target.value })}
                        className="text-lg font-semibold bg-transparent border-none focus:outline-none focus:ring-0 p-0"
                        placeholder="Stage Name"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Map className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Touchpoints */}
                  <div className="space-y-4">
                    {stage.touchpoints.map((touchpoint) => (
                      <div
                        key={touchpoint.id}
                        className="group relative p-4 bg-muted/50 rounded-lg border border-border hover:border-primary/50 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{touchpoint.name}</h4>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => setEditingTouchpoint({ stageId: stage.id, touchpoint })}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">{touchpoint.description}</p>
                      </div>
                    ))}
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-muted-foreground hover:text-foreground"
                      onClick={() => setEditingTouchpoint({ stageId: stage.id })}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Touchpoint
                    </Button>
                  </div>
                </div>

                {/* Connection Arrow */}
                {index < stages.length - 1 && (
                  <div className="flex justify-center">
                    <ArrowDown className="w-6 h-6 text-muted-foreground" />
                  </div>
                )}
              </React.Fragment>
            ))}

            {/* Add Stage Button */}
            <Button
              variant="outline"
              className="w-full py-6 border-dashed"
              onClick={handleStageAdd}
            >
              <Plus className="w-6 h-6 mr-2" />
              Add Stage
            </Button>
          </div>

          {/* Preview Panel */}
          {showPreview && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="w-1/2 border-l border-border pl-8"
            >
              <div className="sticky top-24">
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-border overflow-hidden">
                  <div className="border-b border-border px-6 py-4">
                    <h2 className="text-lg font-semibold">Journey Preview</h2>
                  </div>
                  <div className="p-6 max-h-[calc(100vh-12rem)] overflow-y-auto">
                    <JourneyPreview 
                      stages={stages}
                      personaIds={journeyDetails.personaIds}
                      state={journeyDetails.state}
                      coverImage={journeyDetails.coverImage}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Touchpoint Dialog */}
      <TouchpointDialog
        isOpen={editingTouchpoint !== null}
        onClose={() => setEditingTouchpoint(null)}
        onSave={handleTouchpointSave}
        initialData={editingTouchpoint?.touchpoint}
      />
    </div>
  );
}