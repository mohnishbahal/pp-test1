import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, X, Plus, Minus, Upload, Image } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { PageHeader } from '../ui/PageHeader';

interface PersonaForm {
  name: string;
  age: string;
  occupation: string;
  goals: string[];
  painPoints: string[];
  customSections: {
    title: string;
    items: string[];
  }[];
  avatar: string | null;
}

export default function CreatePersona() {
  const navigate = useNavigate();
  const { addPersona } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const [form, setForm] = useState<PersonaForm>({
    name: '',
    age: '',
    occupation: '',
    goals: [''],
    painPoints: [''],
    customSections: [],
    avatar: null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const newPersona = {
        id: crypto.randomUUID(),
        ...form,
        avatar: previewUrl || `https://source.unsplash.com/400x400/?portrait&${Math.random()}`
      };
      
      await addPersona(newPersona);
      navigate('/personas');
    } catch (error) {
      console.error('Failed to create persona:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleArrayField = (
    field: 'goals' | 'painPoints' | string,
    action: 'add' | 'remove' | 'update',
    index?: number,
    value?: string,
    sectionIndex?: number
  ) => {
    if (field === 'goals' || field === 'painPoints') {
      const array = [...form[field]];
      
      if (action === 'add') {
        array.push('');
      } else if (action === 'remove' && index !== undefined) {
        array.splice(index, 1);
      } else if (action === 'update' && index !== undefined && value !== undefined) {
        array[index] = value;
      }

      setForm({ ...form, [field]: array });
    } else if (sectionIndex !== undefined) {
      const sections = [...form.customSections];
      const items = [...sections[sectionIndex].items];

      if (action === 'add') {
        items.push('');
      } else if (action === 'remove' && index !== undefined) {
        items.splice(index, 1);
      } else if (action === 'update' && index !== undefined && value !== undefined) {
        items[index] = value;
      }

      sections[sectionIndex] = { ...sections[sectionIndex], items };
      setForm({ ...form, customSections: sections });
    }
  };

  const addCustomSection = () => {
    setForm({
      ...form,
      customSections: [
        ...form.customSections,
        { title: 'New Section', items: [''] }
      ]
    });
  };

  const removeCustomSection = (index: number) => {
    const sections = [...form.customSections];
    sections.splice(index, 1);
    setForm({ ...form, customSections: sections });
  };

  const updateSectionTitle = (index: number, title: string) => {
    const sections = [...form.customSections];
    sections[index] = { ...sections[index], title };
    setForm({ ...form, customSections: sections });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader
        title="Create New Persona"
        description="Add details about your customer persona"
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="mb-6">
            <div className="flex items-center justify-center">
              <div className="relative group">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`
                    w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700 
                    cursor-pointer transition-all duration-200 
                    ${!previewUrl ? 'bg-gray-50 dark:bg-gray-900' : ''}
                    hover:border-primary dark:hover:border-primary
                  `}
                >
                  {previewUrl ? (
                    <img src={previewUrl} alt="Avatar preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <Image className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">Add photo</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <Upload className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all" />
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name
              </label>
              <Input
                type="text"
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Enter persona name"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Age
                </label>
                <Input
                  type="text"
                  id="age"
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                  placeholder="Enter age"
                  required
                />
              </div>

              <div>
                <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Occupation
                </label>
                <Input
                  type="text"
                  id="occupation"
                  value={form.occupation}
                  onChange={(e) => setForm({ ...form, occupation: e.target.value })}
                  placeholder="Enter occupation"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Goals</label>
              {form.goals.map((goal, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    type="text"
                    value={goal}
                    onChange={(e) => handleArrayField('goals', 'update', index, e.target.value)}
                    placeholder="Enter a goal"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleArrayField('goals', 'remove', index)}
                    disabled={form.goals.length === 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleArrayField('goals', 'add')}
                className="text-primary"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Goal
              </Button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pain Points</label>
              {form.painPoints.map((point, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    type="text"
                    value={point}
                    onChange={(e) => handleArrayField('painPoints', 'update', index, e.target.value)}
                    placeholder="Enter a pain point"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleArrayField('painPoints', 'remove', index)}
                    disabled={form.painPoints.length === 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleArrayField('painPoints', 'add')}
                className="text-primary"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Pain Point
              </Button>
            </div>

            {form.customSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <Input
                    type="text"
                    value={section.title}
                    onChange={(e) => updateSectionTitle(sectionIndex, e.target.value)}
                    className="text-sm font-medium bg-transparent border-none p-0 focus:ring-0 w-auto"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeCustomSection(sectionIndex)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                {section.items.map((item, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input
                      type="text"
                      value={item}
                      onChange={(e) => handleArrayField(`section${sectionIndex}`, 'update', index, e.target.value, sectionIndex)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleArrayField(`section${sectionIndex}`, 'remove', index, undefined, sectionIndex)}
                      disabled={section.items.length === 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleArrayField(`section${sectionIndex}`, 'add', undefined, undefined, sectionIndex)}
                  className="text-primary"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </div>
            ))}

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={addCustomSection}
              className="text-primary mt-4"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Section
            </Button>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => navigate('/personas')}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            icon={UserPlus}
            isLoading={loading}
          >
            Create Persona
          </Button>
        </div>
      </form>
    </div>
  );
}