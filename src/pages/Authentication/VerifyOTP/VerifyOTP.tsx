import React, { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormState } from '@/hooks/useFormState';
import { useOtpInput } from '@/hooks/useOtpInput';
import { useCountdown } from '@/hooks/useCountdown';
import { AuthPageLayout } from '@/components/layouts/AuthPageLayout';
import { Button } from '@/components/common/Button';

interface OtpDigitInputProps {
  index: number;
  value: string;
  setInputRef: (index: number, element: HTMLInputElement | null) => void;
  onChange: (index: number, value: string) => void;
  onKeyDown: (index: number, event: React.KeyboardEvent<HTMLInputElement>) => void;
  onPaste: (event: React.ClipboardEvent<HTMLInputElement>) => void;
}

const OtpDigitInput = memo(function OtpDigitInput({
  index,
  value,
  setInputRef,
  onChange,
  onKeyDown,
  onPaste,
}: OtpDigitInputProps) {
  const handleRef = useCallback((element: HTMLInputElement | null) => {
    setInputRef(index, element);
  }, [index, setInputRef]);
  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(index, event.target.value);
  }, [index, onChange]);
  const handleInputKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyDown(index, event);
  }, [index, onKeyDown]);

  return (
    <input
      type="text"
      maxLength={1}
      inputMode="numeric"
      value={value}
      ref={handleRef}
      onChange={handleInputChange}
      onKeyDown={handleInputKeyDown}
      onPaste={onPaste}
      className="w-10 md:w-12 h-12 md:h-14 text-center text-lg md:text-xl font-bold rounded-xl border border-gray-200 bg-gray-50/50 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 focus:bg-white transition shadow-xs font-sans"
    />
  );
});

export const VerifyOTP = () => {
  const navigate = useNavigate();
  const { isLoading, startLoading, stopLoading } = useFormState();
  const { otp, setInputRef, handleChange, handleKeyDown, handlePaste } = useOtpInput(6);
  const { counter, reset } = useCountdown(29);
  const handleVerify = useCallback((event: React.FormEvent) => {
    event.preventDefault();
    startLoading();

    // Mock API call to verify OTP
    setTimeout(() => {
      stopLoading();
      // On success, navigate to the reset password page
      navigate('/reset-password');
    }, 1500);
  }, [navigate, startLoading, stopLoading]);

  return (
    <AuthPageLayout
      title="Enter OTP"
      subtitle="Enter your email address to receive verification OTP"
      isLoading={isLoading}
      className="flex flex-col space-y-3.5"
    >

        {/* 2. Form */}
        <form className="space-y-3 translate-y-8" onSubmit={handleVerify}>
          {/* Label text "Enter OTP" directly above the input fields */}
          <div className="text-sm font-medium text-slate-800  ">Enter OTP</div>

          {/* OTP Input Fields */}
          <div className="flex items-center justify-center gap-1 md:gap-2 py-1">
            {otp.map((data, index) => (
              <React.Fragment key={`otp-${index}`}>
                <OtpDigitInput
                  index={index}
                  value={data}
                  setInputRef={setInputRef}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  onPaste={handlePaste}
                />
                {/* Visual dash separator between pairs of input boxes (after index 2) */}
                {index === 2 && (
                  <span className="text-gray-300 font-normal mx-1 select-none">
                    —
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Verify Button */}
          <Button
            className=" translate-y-9"
            type="submit"
            isLoading={isLoading}
            showArrow
          >
            Verify OTP
          </Button>
        </form>

        {/* 3. Resend OTP Link */}
        <div className="text-center text-sm text-gray-400 translate-y-20">
          Didn't receive OTP?{" "}
          {counter > 0 ? (
            <span className="text-blue-700 font-bold ml-1">
              Resend in 00:{counter < 10 ? `0${counter}` : counter}
            </span>
          ) : (
            <span
              className="text-blue-700 font-bold hover:underline cursor-pointer ml-1 transition"
              onClick={reset}
            >
              Resend OTP
            </span>
          )}
        </div>
    </AuthPageLayout>
  );
};
