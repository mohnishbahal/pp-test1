import React, { useState } from 'react';
import { UserPlus, Sparkles } from 'lucide-react';

interface PersonaPrompt {
  productDescription: string;
  targetAudience: string;
}

interface GeneratedPersona {
  name: string;
  demographics: {
    age: string;
    gender: string;
    occupation: string;
    location: string;
  };
  goals: string[];
  painPoints: string[];
  activities: string[];
  quote: string;
}

export default function PersonaGenerator() {
  const [prompt, setPrompt] = useState<PersonaPrompt>({
    productDescription: '',
    targetAudience: '',
  });

  const [generatedPersona, setGeneratedPersona] = useState<GeneratedPersona | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    // Simulate persona generation (replace with actual API call)
    setTimeout(() => {
      setGeneratedPersona({
        name: "Sarah Chen",
        demographics: {
          age: "32",
          gender: "Female",
          occupation: "UX Designer",
          location: "San Francisco, CA"
        },
        goals: [
          "Streamline design workflow",
          "Better collaboration with team",
          "Stay updated with design trends"
        ],
        painPoints: [
          "Time-consuming feedback cycles",
          "Inconsistent design systems",
          "Communication gaps with developers"
        ],
        activities: [
          "Conducts user research",
          "Creates wireframes and prototypes",
          "Attends design team meetings",
          "Reviews user feedback"
        ],
        quote: "I need tools that help me work smarter, not harder, while keeping everyone in sync."
      });
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Persona Generator</h2>
        <p className="text-gray-600">Create detailed user personas based on your product and audience</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700 mb-1">
                Product Description
              </label>
              <textarea
                id="productDescription"
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Describe your product or service..."
                value={prompt.productDescription}
                onChange={(e) => setPrompt(prev => ({ ...prev, productDescription: e.target.value }))}
                required
              />
            </div>

            <div>
              <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700 mb-1">
                Target Audience
              </label>
              <textarea
                id="targetAudience"
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Describe your target audience..."
                value={prompt.targetAudience}
                onChange={(e) => setPrompt(prev => ({ ...prev, targetAudience: e.target.value }))}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Generate Persona
                </>
              )}
            </button>
          </form>
        </div>

        <div>
          {generatedPersona && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                  <UserPlus className="w-8 h-8 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{generatedPersona.name}</h3>
                  <p className="text-gray-600">
                    {generatedPersona.demographics.occupation} • {generatedPersona.demographics.location}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Demographics</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Age: {generatedPersona.demographics.age}</div>
                    <div>Gender: {generatedPersona.demographics.gender}</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Goals</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {generatedPersona.goals.map((goal, index) => (
                      <li key={index}>{goal}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Pain Points</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {generatedPersona.painPoints.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Daily Activities</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {generatedPersona.activities.map((activity, index) => (
                      <li key={index}>{activity}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Notable Quote</h4>
                  <blockquote className="text-sm italic text-gray-600 border-l-4 border-indigo-200 pl-4">
                    "{generatedPersona.quote}"
                  </blockquote>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}