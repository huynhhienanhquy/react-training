import image1 from '@/assets/images/Rectangle 1.png';
import image2 from '@/assets/images/Rectangle 2.png';
import image3 from '@/assets/images/Rectangle 3.png';

// Danh sách prompt chuẩn theo ảnh thiết kế
const DEFAULT_PROMPTS = [
  // Hàng 1
  "Cheap flights from my location to Lagos",
  "Trending places to visit in Akwa-Ibom",
  "Plan a trip for the Calabar carnival",
  // Hàng 2
  "How much will it cost to travel the Bahamas from Mali?",
  "Find Business Class flight from Owerri to Delta",
  // Hàng 3
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
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-[3px] border-white shadow-md z-10">
          <img
            src={image1}
            alt="Nature"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-[3px] border-white shadow-md z-20">
          <img
            src={image2}
            alt="Travel group"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-[3px] border-white shadow-md z-30">
          <img
            src={image3}
            alt="Resort beach"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Main Title */}
      <h2 className="text-2xl md:text-4xl font-extrabold text-[#0B0F2A] tracking-tight mb-8">
        Let’s Plan Your Next Adventure
      </h2>

      {/* Prompts Section (Layout 3 hàng giống hệt thiết kế) */}
      <div className="flex flex-col items-center gap-3 w-full max-w-4xl mb-8">
        {/* Hàng 1: 3 nút */}
        <div className="flex flex-wrap justify-center gap-3">
          {prompts.slice(0, 3).map((prompt, index) => (
            <button
              key={index}
              onClick={() => onSelectPrompt(prompt)}
              className="bg-white hover:bg-slate-50 text-slate-600 text-xs md:text-sm px-4 py-2.5 rounded-2xl border border-slate-100 shadow-sm font-medium transition duration-200"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Hàng 2: 2 nút */}
        <div className="flex flex-wrap justify-center gap-3">
          {prompts.slice(3, 5).map((prompt, index) => (
            <button
              key={index + 3}
              onClick={() => onSelectPrompt(prompt)}
              className="bg-white hover:bg-slate-50 text-slate-600 text-xs md:text-sm px-4 py-2.5 rounded-2xl border border-slate-100 shadow-sm font-medium transition duration-200"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Hàng 3: 1 nút */}
        <div className="flex flex-wrap justify-center gap-3">
          {prompts.slice(5, 6).map((prompt, index) => (
            <button
              key={index + 5}
              onClick={() => onSelectPrompt(prompt)}
              className="bg-white hover:bg-slate-50 text-slate-600 text-xs md:text-sm px-4 py-2.5 rounded-2xl border border-slate-100 shadow-sm font-medium transition duration-200"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
