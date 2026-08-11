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

const PROMPT_BUTTON_CLASSES =
  'max-w-full whitespace-normal rounded-xl px-3 py-2 text-xs font-normal leading-5 text-slate-500 sm:px-4 sm:py-2.5 lg:px-5 lg:py-2 lg:text-base lg:leading-6';

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
    <div className="my-auto flex w-full flex-1 flex-col items-center justify-center px-1 py-5 text-center md:-translate-y-10 md:px-4 md:py-6 lg:translate-y-5 min-[1440px]:absolute min-[1440px]:inset-x-0 min-[1440px]:top-[127px] min-[1440px]:my-0 min-[1440px]:flex-none min-[1440px]:translate-y-0 min-[1440px]:py-0">
      {/* Visual Header Images */}
      <div className="mb-4 flex items-center justify-center -space-x-3 md:mb-6 lg:mb-5 min-[1440px]:mb-5">
        <div className="w-20 h-20 md:w-24 md:h-24 lg:w-[104px] lg:h-[104px] min-[1440px]:h-24 min-[1440px]:w-24 rounded-2xl overflow-hidden border-3 border-white shadow-md z-10">
          <img
            src={lakeBoardwalkImage}
            alt="Nature"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-20 h-20 md:w-24 md:h-24 lg:w-[104px] lg:h-[104px] min-[1440px]:h-24 min-[1440px]:w-24 rounded-2xl overflow-hidden border-3 border-white shadow-md z-20">
          <img
            src={groupTravelersImage}
            alt="Travel group"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-20 h-20 md:w-24 md:h-24 lg:w-[104px] lg:h-[104px] min-[1440px]:h-24 min-[1440px]:w-24 rounded-2xl overflow-hidden border-3 border-white shadow-md z-30">
          <img
            src={tropicalBeachImage}
            alt="Resort beach"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Main Title */}
      <h2 className="mb-5 text-2xl font-bold tracking-tight text-ink-deep md:mb-8 md:text-4xl lg:text-[40px] lg:leading-[48px] min-[1440px]:mb-11">
        {'Let\u2019s Plan Your Next Adventure'}
      </h2>

      {/* Prompts Section  */}
      <div className="mb-4 flex w-full max-w-4xl flex-col items-center gap-2 sm:gap-3 md:mb-8 lg:max-w-6xl lg:gap-5 min-[1440px]:gap-4">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-5 min-[1440px]:gap-4">
          {prompts.slice(0, 3).map((prompt, index) => (
            <Button
              key={index}
              type="button"
              variant="outline"
              size="sm"
              className={PROMPT_BUTTON_CLASSES}
              onClick={createPromptHandler(prompt)}
            >
              {prompt}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-5 min-[1440px]:gap-4">
          {prompts.slice(3, 5).map((prompt, index) => (
            <Button
              key={index + 3}
              type="button"
              variant="outline"
              size="sm"
              className={PROMPT_BUTTON_CLASSES}
              onClick={createPromptHandler(prompt)}
            >
              {prompt}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-5 min-[1440px]:gap-4">
          {prompts.slice(5, 6).map((prompt, index) => (
            <Button
              key={index + 5}
              type="button"
              variant="outline"
              size="sm"
              className={PROMPT_BUTTON_CLASSES}
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
