
import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { DownloadIcon, MagicWandIcon } from './icons';

interface StickerDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
}

export const StickerDisplay: React.FC<StickerDisplayProps> = ({ imageUrl, isLoading, error }) => {
  const Placeholder = () => (
    <div className="text-center text-gray-500 flex flex-col items-center justify-center h-full gap-4 p-4">
      <MagicWandIcon />
      <h3 className="text-lg font-semibold">Your sticker will appear here</h3>
      <p className="max-w-xs mx-auto">Upload an image and choose a style to create your first sticker.</p>
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full aspect-square bg-gray-100 rounded-xl flex items-center justify-center p-4 border border-gray-200 overflow-hidden">
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-center text-red-600 p-4">
            <h3 className="font-bold mb-2">Oops! Something went wrong.</h3>
            <p className="text-sm">{error}</p>
          </div>
        ) : imageUrl ? (
          <div className="relative group w-full h-full flex items-center justify-center">
            <img src={imageUrl} alt="Generated Sticker" className="max-w-full max-h-full object-contain" />
            <a
              href={imageUrl}
              download="sticker-dream.png"
              className="absolute bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-90 hover:bg-blue-700"
              aria-label="Download Sticker"
            >
              <DownloadIcon />
            </a>
          </div>
        ) : (
          <Placeholder />
        )}
      </div>
      {imageUrl && (
        <button
          className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Show design on products
        </button>
      )}
    </div>
  );
};
