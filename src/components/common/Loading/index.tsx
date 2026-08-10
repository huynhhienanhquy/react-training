import appLogo from '@/assets/images/app-logo.png';

interface LoadingOverlayProps {
  isVisible?: boolean;
}

export const LoadingOverlay = ({ isVisible = true }: LoadingOverlayProps) => {
  if (!isVisible) return null;

  return (
    //  Matte finish for the ENTIRE screen
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-xs transition-all duration-300">

      {/* Spinner ring + Logo are located in the center of the screen.*/}
      <div className="relative flex items-center justify-center w-16 h-16">

        {/* Light blue sloping rotating bezel */}
        <div className="absolute inset-0 rounded-full border-3 border-white/30 border-t-blue-500 border-l-blue-400 animate-spin" />

        {/* Tripal Logo icon in the center*/}
        <div className="w-10 h-10 rounded-xl bg-blue-600 shadow-md flex items-center justify-center p-2">
          <img
            src={appLogo}
            alt="Tripal Logo"
            className="w-full h-full object-contain"
          />
        </div>

      </div>
    </div>
  );
};
