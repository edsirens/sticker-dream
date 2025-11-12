
import React from 'react';
import { StickerIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="py-6">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-3">
          <StickerIcon />
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
            Sticker Dream
          </h1>
        </div>
        <p className="mt-2 text-lg text-gray-600">
          Turn your photos into awesome stickers with AI.
        </p>
      </div>
    </header>
  );
};
