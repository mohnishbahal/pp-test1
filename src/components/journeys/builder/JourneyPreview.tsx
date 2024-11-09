import React from 'react';
import { Smile, Meh, Frown, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface JourneyPreviewProps {
  stages: Array<{
    id: string;
    name: string;
    touchpoints: Array<{
      id: string;
      name: string;
      description: string;
      emotion: 'positive' | 'neutral' | 'negative';
      customerAction?: string;
      customerJob?: string;
      image?: string;
      insights?: {
        needs: string[];
        painPoints: string[];
        opportunities: string[];
      };
      metrics?: {
        satisfaction: number;
        effort: number;
        completion: number;
      };
    }>;
  }>;
}

export function JourneyPreview({ stages }: JourneyPreviewProps) {
  const getEmotionIcon = (emotion: 'positive' | 'neutral' | 'negative') => {
    switch (emotion) {
      case 'positive':
        return <Smile className="w-5 h-5 text-green-500" />;
      case 'negative':
        return <Frown className="w-5 h-5 text-red-500" />;
      default:
        return <Meh className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getEmotionColor = (emotion: 'positive' | 'neutral' | 'negative') => {
    switch (emotion) {
      case 'positive':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'negative':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      default:
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
    }
  };

  const getMetricColor = (value: number) => {
    if (value >= 80) return 'bg-green-500';
    if (value >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-8">
      {stages.map((stage, stageIndex) => (
        <React.Fragment key={stage.id}>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 text-primary text-sm font-medium px-2 py-1 rounded">
                Stage {stageIndex + 1}
              </div>
              <h3 className="text-lg font-semibold">{stage.name}</h3>
            </div>

            <div className="space-y-4">
              {stage.touchpoints.map((touchpoint) => (
                <div
                  key={touchpoint.id}
                  className={cn(
                    "p-4 rounded-lg border",
                    getEmotionColor(touchpoint.emotion)
                  )}
                >
                  <div className="flex items-start gap-4">
                    {touchpoint.image && (
                      <img
                        src={touchpoint.image}
                        alt={touchpoint.name}
                        className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-base font-medium">{touchpoint.name}</h4>
                        {getEmotionIcon(touchpoint.emotion)}
                      </div>

                      <p className="text-sm text-muted-foreground mb-4">
                        {touchpoint.description}
                      </p>

                      {(touchpoint.customerAction || touchpoint.customerJob) && (
                        <div className="space-y-2 mb-4">
                          {touchpoint.customerAction && (
                            <div>
                              <div className="text-xs font-medium mb-1">Customer Action</div>
                              <p className="text-sm">{touchpoint.customerAction}</p>
                            </div>
                          )}
                          {touchpoint.customerJob && (
                            <div>
                              <div className="text-xs font-medium mb-1">Customer Job</div>
                              <p className="text-sm">{touchpoint.customerJob}</p>
                            </div>
                          )}
                        </div>
                      )}

                      {touchpoint.insights && (
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          {Object.entries(touchpoint.insights).map(([key, items]) => (
                            <div key={key}>
                              <div className="text-xs font-medium mb-2 capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </div>
                              <ul className="space-y-1">
                                {items.map((item, index) => (
                                  <li key={index} className="text-sm text-muted-foreground">
                                    • {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}

                      {touchpoint.metrics && (
                        <div className="grid grid-cols-3 gap-4">
                          {Object.entries(touchpoint.metrics).map(([key, value]) => (
                            <div key={key}>
                              <div className="text-xs text-muted-foreground mb-1 capitalize">
                                {key}
                              </div>
                              <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className={cn("h-full transition-all", getMetricColor(value))}
                                  style={{ width: `${value}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {stageIndex < stages.length - 1 && (
            <div className="flex justify-center py-2">
              <ArrowDown className="w-6 h-6 text-muted-foreground" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}