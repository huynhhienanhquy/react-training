// src/pages/VerifyOTP.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/auth/AuthLayout';
import { Button } from '../components/ui/button/Button';
import { AuthHeader } from '../components/auth/AuthHeader';

export const VerifyOTP: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [counter, setCounter] = useState<number>(29);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  // OTP countdown timer
  useEffect(() => {
    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => { if (timer) clearInterval(timer); };
  }, [counter]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Automatically jump to the next cell
    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Press Backspace to indent the cell.
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    // Check if the pasted string is exactly 6 digits.
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("");
      setOtp(digits);
      // Focus on the last box after you've finished pasting.
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulated OTP authentication successful.
    setTimeout(() => {
      setIsLoading(false);
      navigate('/reset-password');
    }, 300);
  };

  return (
    <AuthLayout isLoading={isLoading}>
      {/* 1. Header*/}
      <AuthHeader
        title="Enter OTP"
        subtitle="We have sent a verification code to your email address"
      />

      <form className="space-y-8" onSubmit={handleVerify}>
        {/* 2. The 6-cell OTP input area is clustered with hyphens. */}
        <div className="flex items-center justify-center gap-2">
          {otp.map((data, index) => (
            <React.Fragment key={index}>
              <input
                type="text"
                maxLength={1}
                inputMode="numeric"
                value={data}
                ref={(el) => { if (el) inputRefs.current[index] = el; }}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className="w-12 h-14 text-center text-xl font-bold rounded-xl border border-gray-100 bg-gray-50/30 text-[#0d1b3e] focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 focus:bg-white transition shadow-sm font-mono"
              />
              {index === 2 && (
                <span className="text-gray-300 font-normal mx-1 select-none">—</span>
              )}
            </React.Fragment>
          ))}
        </div>


        {/* 3. Button submit*/}
        <div className="pt-2">
          <Button type="submit" isLoading={isLoading}>
            Verify & Proceed &rarr;
          </Button>
        </div>
      </form>

      {/* 4. The timer sends the code back. */}
      <div className="text-center text-[15px] text-gray-400 mt-12">
        Didn't receive OTP?{" "}
        {counter > 0 ? (
          <span className="text-[#1d4ed8] font-bold ml-1">
            Resend in 00:{counter < 10 ? `0${counter}` : counter}
          </span>
        ) : (
          <span
            className="text-[#1d4ed8] font-bold hover:underline cursor-pointer ml-1 transition"
            onClick={() => setCounter(29)}
          >
            Resend OTP
          </span>
        )}
      </div>
    </AuthLayout>
  );
};
