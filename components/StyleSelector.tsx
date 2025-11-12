
import React from 'react';
import { StickerStyle } from '../types';

interface StyleSelectorProps {
  styles: StickerStyle[];
  selectedStyle: StickerStyle;
  onStyleChange: (style: StickerStyle) => void;
  disabled?: boolean;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ styles, selectedStyle, onStyleChange, disabled = false }) => {
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 gap-3 transition-opacity duration-300 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      {styles.map((style) => (
        <button
          key={style.id}
          onClick={() => onStyleChange(style)}
          disabled={disabled}
          className={`px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
            ${selectedStyle.id === style.id 
              ? 'bg-indigo-600 text-white shadow-md' 
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
        >
          {style.name}
        </button>
      ))}
    </div>
  );
};
