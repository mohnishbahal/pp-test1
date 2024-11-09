import React, { useRef } from 'react';
import { Camera, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CoverImageUploadProps {
  image: string | null;
  onChange: (image: string | null) => void;
}

export function CoverImageUpload({ image, onChange }: CoverImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-8">
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="relative group cursor-pointer"
      >
        <div className={cn(
          "w-full h-48 rounded-xl overflow-hidden border-2 border-dashed",
          "transition-colors duration-200",
          image ? 'border-transparent' : 'border-muted hover:border-muted-foreground'
        )}>
          {image ? (
            <>
              <img 
                src={image} 
                alt="Journey cover" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="w-8 h-8 text-white" />
              </div>
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Camera className="w-8 h-8 text-muted-foreground mb-2" />
              <p className="text-sm font-medium text-muted-foreground">
                Add a cover image
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Recommended size: 1280x360px
              </p>
            </div>
          )}
        </div>

        {image && (
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              onChange(null);
            }}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
}