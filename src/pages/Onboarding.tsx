import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/auth/AuthLayout';
import { Button } from '../components/ui/button/Button';
import iconArrowDown from '../assets/icons/arrow-down.png'
import { AuthHeader } from '../components/auth/AuthHeader';
import { InputField } from '../components/ui/input/InputField';
import { AuthFooter } from '../components/auth/AuthFooter';

export const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleStartPlanning = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 300);
  };

  return (
    <AuthLayout isLoading={isLoading}>
      {/* 1. Header */}
      <AuthHeader
        title="Let’s Get To Know You!"
        subtitle="Provide only the information provided so that Tripal can know you better"
      />

      <form className="space-y-6" onSubmit={handleStartPlanning} autoComplete="off">
        {/* 2. Enter Full Name */}
        <InputField
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        {/* 3. Country Selection Dropdown*/}
        <div className="flex flex-col space-y-2">
          <label className="text-[15px] font-bold text-[#0d1b3e]">
            Country
          </label>
          <div className="relative">
            <select
              className="w-full px-5 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 text-base focus:outline-none focus:border-blue-500 transition appearance-none cursor-pointer text-slate-700 pr-12"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            >
              <option value="" disabled hidden className="text-gray-300">Select country</option>
              <option value="VN">Vietnam</option>
              <option value="US">United States</option>
            </select>
            {/*  Dropdown arrow */}
            <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 text-[10px]">
              <img src={iconArrowDown} alt="iconArrowDown" />
            </div>
          </div>
        </div>

        {/* 4. Button submit*/}
        <div className="pt-4">
          <Button type="submit" isLoading={isLoading}>
            Start Planning Trips &rarr;
          </Button>
        </div>
      </form>

      {/* 5. Footer */}
      <AuthFooter
        questionText="Already have an account?"
        actionText="Sign In"
        onActionClick={() => navigate('/login')}
      />
    </AuthLayout>
  );
};
