import React from 'react';
import image1 from '../../../../assets/images/Rectangle 1.png'
import image2 from '../../../../assets/images/Rectangle 2.png'
import image3 from '../../../../assets/images/Rectangle 3.png'

interface WelcomeStateProps {
  prompts: string[];
  onSelectPrompt: (prompt: string) => void;
}

export const WelcomeState: React.FC<WelcomeStateProps> = ({ prompts, onSelectPrompt }) => {
  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center text-center my-auto py-6">
      {/* Visual Header Images */}
      <div className="flex items-center justify-center -space-x-3 mb-6">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 border-white shadow-lg transform -rotate-6">
          <img src={image1} alt="Beach" className="w-full h-full object-cover" />
        </div>
        <div className="w-22 h-22 md:w-28 md:h-28 rounded-2xl overflow-hidden border-2 border-white shadow-xl z-10">
          <img src={image2} alt="Travel" className="w-full h-full object-cover" />
        </div>
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 border-white shadow-lg transform rotate-6">
          <img src={image3} alt="Resort" className="w-full h-full object-cover" />
        </div>
      </div>

      <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-8">
        Let’s Plan Your Next Adventure
      </h2>

      <div className="flex flex-wrap justify-center gap-2.5 max-w-3xl mb-8">
        {prompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onSelectPrompt(prompt)}
            className="bg-white hover:bg-blue-50/50 text-slate-700 text-xs md:text-sm px-4 py-2.5 rounded-full border border-slate-200 shadow-sm font-medium transition hover:-translate-y-0.5"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};
