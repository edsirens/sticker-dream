
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { StyleSelector } from './components/StyleSelector';
import { StickerDisplay } from './components/StickerDisplay';
import { generateSticker } from './services/geminiService';
import { STICKER_STYLES } from './constants';
import { StickerStyle } from './types';
import { GenerateIcon } from './components/icons';

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = (reader.result as string).split(',')[1];
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
  });


export default function App() {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<StickerStyle>(STICKER_STYLES[0]);
  const [generatedStickerUrl, setGeneratedStickerUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (file: File) => {
    setOriginalImage(file);
    setOriginalImageUrl(URL.createObjectURL(file));
    setGeneratedStickerUrl(null);
    setError(null);
  };

  const handleGenerateClick = useCallback(async () => {
    if (!originalImage || !selectedStyle) {
      setError("Please upload an image and select a style.");
      return;
    }

    setIsLoading(true);
    setGeneratedStickerUrl(null);
    setError(null);

    try {
      const imageBase64 = await fileToBase64(originalImage);
      const generatedBase64 = await generateSticker(imageBase64, originalImage.type, selectedStyle.name);
      setGeneratedStickerUrl(`data:image/png;base64,${generatedBase64}`);
    } catch (err) {
      console.error(err);
      setError("Failed to generate sticker. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, selectedStyle]);


  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <div className="relative isolate min-h-screen">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}}></div>
        </div>

        <Header />

        <main className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            
            {/* Control Panel */}
            <div className="bg-white/60 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200/50 flex flex-col gap-8">
              <div>
                <h2 className="text-xl font-bold text-gray-700 mb-1">1. Upload Your Image</h2>
                <p className="text-gray-500 mb-4">Select a photo of a person, pet, or object.</p>
                <ImageUploader onImageSelect={handleImageSelect} imageUrl={originalImageUrl} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-700 mb-1">2. Choose a Style</h2>
                <p className="text-gray-500 mb-4">Pick an artistic style for your new sticker.</p>
                <StyleSelector
                  styles={STICKER_STYLES}
                  selectedStyle={selectedStyle}
                  onStyleChange={setSelectedStyle}
                  disabled={!originalImage}
                />
              </div>

              <div className="mt-auto">
                <button
                  onClick={handleGenerateClick}
                  disabled={!originalImage || isLoading}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isLoading ? 'Dreaming up your sticker...' : (
                    <>
                      <GenerateIcon />
                      Generate Sticker
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Display Panel */}
            <div className="bg-white/60 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200/50">
              <h2 className="text-xl font-bold text-gray-700 mb-4">3. Your Sticker</h2>
              <StickerDisplay
                imageUrl={generatedStickerUrl}
                isLoading={isLoading}
                error={error}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
