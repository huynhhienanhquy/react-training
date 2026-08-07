import lakeBoardwalkImage from '@/assets/images/lake-boardwalk.png';
import groupTravelersImage from '@/assets/images/group-travelers.png';
import tropicalBeachImage from '@/assets/images/tropical-beach.png';
import { Button } from '@/components/Button';

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

export const WelcomeState = ({
  prompts = DEFAULT_PROMPTS,
  onSelectPrompt
}: WelcomeStateProps) => {
  return (
    <div className=" w-full flex-1 flex flex-col items-center justify-center text-center my-auto py-6 px-4 -translate-y-20">
      {/* Visual Header Images */}
      <div className="flex items-center justify-center -space-x-3 mb-6">
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
      <h2 className="text-2xl md:text-4xl font-extrabold text-ink-deep tracking-tight mb-8">
        Let’s Plan Your Next Adventure
      </h2>

      {/* Prompts Section  */}
      <div className="flex flex-col items-center gap-3 w-full max-w-4xl mb-8">
        <div className="flex flex-wrap justify-center gap-3">
          {prompts.slice(0, 3).map((prompt, index) => (
            <Button
              key={index}
              type="button"
              variant="outline"
              size="sm"
              className="px-4 py-2.5 rounded-2xl"
              onClick={() => onSelectPrompt(prompt)}
            >
              {prompt}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {prompts.slice(3, 5).map((prompt, index) => (
            <Button
              key={index + 3}
              type="button"
              variant="outline"
              size="sm"
              className="px-4 py-2.5 rounded-2xl"
              onClick={() => onSelectPrompt(prompt)}
            >
              {prompt}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {prompts.slice(5, 6).map((prompt, index) => (
            <Button
              key={index + 5}
              type="button"
              variant="outline"
              size="sm"
              className="px-4 py-2.5 rounded-2xl"
              onClick={() => onSelectPrompt(prompt)}
            >
              {prompt}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
