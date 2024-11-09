import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserPlus, X, Plus, Minus, Upload, Image } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';

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

export default function EditPersona() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { personas, updatePersona } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const currentPersona = personas.find(p => p.id === id);
  
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [form, setForm] = useState<PersonaForm>({
    name: '',
    age: '',
    occupation: '',
    goals: [''],
    painPoints: [''],
    customSections: [],
    avatar: null
  });

  useEffect(() => {
    if (currentPersona) {
      setForm({
        name: currentPersona.name,
        age: currentPersona.age,
        occupation: currentPersona.occupation,
        goals: currentPersona.goals,
        painPoints: currentPersona.painPoints,
        customSections: currentPersona.customSections || [],
        avatar: currentPersona.avatar
      });
      setPreviewUrl(currentPersona.avatar);
    } else {
      navigate('/personas');
    }
  }, [currentPersona, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPersona) return;
    
    const updatedPersona = {
      ...currentPersona,
      ...form,
      avatar: previewUrl || currentPersona.avatar
    };
    updatePersona(updatedPersona);
    navigate('/personas');
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!currentPersona) return null;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Persona</h1>
          <p className="text-gray-600 dark:text-gray-400">Update details about your customer persona</p>
        </div>
        <button
          onClick={() => navigate('/personas')}
          className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="mb-6">
            <div className="flex items-center justify-center">
              <div className="relative group">
                <div className={`w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200 ${!previewUrl ? 'bg-gray-50' : ''}`}>
                  {previewUrl ? (
                    <img src={previewUrl} alt="Avatar preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Image className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full shadow-lg hover:bg-indigo-700"
                >
                  <Upload className="w-4 h-4" />
                </button>
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
              <input
                type="text"
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Age
                </label>
                <input
                  type="text"
                  id="age"
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Occupation
                </label>
                <input
                  type="text"
                  id="occupation"
                  value={form.occupation}
                  onChange={(e) => setForm({ ...form, occupation: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Goals</label>
              {form.goals.map((goal, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={goal}
                    onChange={(e) => handleArrayField('goals', 'update', index, e.target.value)}
                    className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => handleArrayField('goals', 'remove', index)}
                    className="p-2 text-gray-400 hover:text-gray-500"
                    disabled={form.goals.length === 1}
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleArrayField('goals', 'add')}
                className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700"
              >
                <Plus className="w-4 h-4" />
                Add Goal
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pain Points</label>
              {form.painPoints.map((point, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={point}
                    onChange={(e) => handleArrayField('painPoints', 'update', index, e.target.value)}
                    className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => handleArrayField('painPoints', 'remove', index)}
                    className="p-2 text-gray-400 hover:text-gray-500"
                    disabled={form.painPoints.length === 1}
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleArrayField('painPoints', 'add')}
                className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700"
              >
                <Plus className="w-4 h-4" />
                Add Pain Point
              </button>
            </div>

            {form.customSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => updateSectionTitle(sectionIndex, e.target.value)}
                    className="text-sm font-medium text-gray-900 dark:text-white bg-transparent border-none p-0 focus:ring-0"
                  />
                  <button
                    type="button"
                    onClick={() => removeCustomSection(sectionIndex)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {section.items.map((item, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleArrayField(`section${sectionIndex}`, 'update', index, e.target.value, sectionIndex)}
                      className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => handleArrayField(`section${sectionIndex}`, 'remove', index, undefined, sectionIndex)}
                      className="p-2 text-gray-400 hover:text-gray-500"
                      disabled={section.items.length === 1}
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleArrayField(`section${sectionIndex}`, 'add', undefined, undefined, sectionIndex)}
                  className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700"
                >
                  <Plus className="w-4 h-4" />
                  Add Item
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addCustomSection}
              className="mt-4 flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700"
            >
              <Plus className="w-4 h-4" />
              Add New Section
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/personas')}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            icon={UserPlus}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}