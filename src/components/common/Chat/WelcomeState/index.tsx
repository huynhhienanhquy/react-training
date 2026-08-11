import { memo } from 'react';
import lakeBoardwalkImage from '@/assets/images/lake-boardwalk.png';
import groupTravelersImage from '@/assets/images/group-travelers.png';
import tropicalBeachImage from '@/assets/images/tropical-beach.png';
import { Button } from '@/components/common/Button';

const DEFAULT_PROMPTS = [
  "Cheap flights from my location to Lagos",
  "Trending places to visit in Akwa-Ibom",
  "Plan a trip for the Calabar carnival",
  "How much will it cost to travel the Bahamas from Mali?",
  "Find Business Class flight from Owerri to Delta",
  "Routes from Miami to Long Island Beach"
];

interface WelcomeStateProps {
  prompts?: string[];
  onSelectPrompt: (prompt: string) => void;
}

export const WelcomeState = memo(function WelcomeState({
  prompts = DEFAULT_PROMPTS,
  onSelectPrompt
}: WelcomeStateProps) {
  const createPromptHandler = (prompt: string) => () => onSelectPrompt(prompt);

  return (
    <div className="my-auto flex w-full flex-1 flex-col items-center justify-center px-1 py-5 text-center md:-translate-y-10 md:px-4 md:py-6">
      {/* Visual Header Images */}
      <div className="mb-4 flex items-center justify-center -space-x-3 md:mb-6">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-3 border-white shadow-md z-10">
          <img
            src={lakeBoardwalkImage}
            alt="Nature"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-3 border-white shadow-md z-20">
          <img
            src={groupTravelersImage}
            alt="Travel group"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-3 border-white shadow-md z-30">
          <img
            src={tropicalBeachImage}
            alt="Resort beach"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Main Title */}
      <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-ink-deep md:mb-8 md:text-4xl">
        Let’s Plan Your Next Adventure
      </h2>

      {/* Prompts Section  */}
      <div className="mb-4 flex w-full max-w-4xl flex-col items-center gap-2 sm:gap-3 md:mb-8">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {prompts.slice(0, 3).map((prompt, index) => (
            <Button
              key={index}
              type="button"
              variant="outline"
              size="sm"
              className="max-w-full whitespace-normal rounded-2xl px-3 py-2 text-xs sm:px-4 sm:py-2.5"
              onClick={createPromptHandler(prompt)}
            >
              {prompt}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {prompts.slice(3, 5).map((prompt, index) => (
            <Button
              key={index + 3}
              type="button"
              variant="outline"
              size="sm"
              className="max-w-full whitespace-normal rounded-2xl px-3 py-2 text-xs sm:px-4 sm:py-2.5"
              onClick={createPromptHandler(prompt)}
            >
              {prompt}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {prompts.slice(5, 6).map((prompt, index) => (
            <Button
              key={index + 5}
              type="button"
              variant="outline"
              size="sm"
              className="max-w-full whitespace-normal rounded-2xl px-3 py-2 text-xs sm:px-4 sm:py-2.5"
              onClick={createPromptHandler(prompt)}
            >
              {prompt}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
});
