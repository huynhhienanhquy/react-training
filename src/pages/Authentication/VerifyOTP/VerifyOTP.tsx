import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormState } from '../../../hooks/useFormState';
import { useOtpInput } from '../../../hooks/useOtpInput';
import { useCountdown } from '../../../hooks/useCountdown';
import { AuthLayout } from '../../../components/auth/AuthLayout/AuthLayout';
import { Button } from '../../../components/Button/Button';
import { AuthHeader } from '../../../components/auth/AuthHeader/AuthHeader';

export const VerifyOTP = () => {
  const navigate = useNavigate();
  const { isLoading, startLoading, stopLoading } = useFormState();
  const { otp, inputRefs, handleChange, handleKeyDown, handlePaste } = useOtpInput(6);
  const { counter, reset } = useCountdown(29);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    startLoading();

    setTimeout(() => {
      stopLoading();
      navigate('/reset-password');
    }, 300);
  };

  return (
    <AuthLayout isLoading={isLoading}>
      {/* Reduce the overall spacing between blocks to space-y-3.5*/}
      <div className="flex flex-col space-y-3.5">
        {/* 1. Header */}
        <AuthHeader
          title="Enter OTP"
          subtitle="We have sent a verification code to your email address"
        />

        {/* 2. Form */}
        <form className="space-y-3" onSubmit={handleVerify}>
          <div className="flex items-center justify-center gap-1 md:gap-2 py-1">
            {otp.map((data, index) => (
              <React.Fragment key={`otp-${index}`}>
                <input
                  type="text"
                  maxLength={1}
                  inputMode="numeric"
                  value={data}
                  ref={(el) => { if (el) inputRefs.current[index] = el; }}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-10 md:w-12 h-12 md:h-14 text-center text-lg md:text-xl font-bold rounded-xl border border-gray-200 bg-gray-50/50 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 focus:bg-white transition shadow-xs font-mono"
                />
                {index === 2 && (
                  <span className="text-gray-300 font-normal mx-1 select-none">—</span>
                )}
              </React.Fragment>
            ))}
          </div>

          <Button
            type="submit"
            isLoading={isLoading}
            showArrow
          >
            Verify OTP
          </Button>
        </form>

        {/* 3. Resend OTP Link */}
        <div className="text-center text-sm text-gray-400">
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
      </div>
    </AuthLayout>
  );
};
