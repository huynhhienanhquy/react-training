import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '@/components/common/Auth/AuthLayout';
import { AuthPageLayout } from '@/components/layouts/AuthPageLayout';
import { Button } from '@/components/common/Button';
import { InputField } from '@/components/common/InputField';
import ArrowDownIcon from '@/components/common/Icons/ArrowDownIcon';
import { useFormState } from '@/hooks/useFormState';

export const Onboarding = () => {
  const navigate = useNavigate();
  const { isLoading, startLoading, stopLoading } = useFormState();
  const [fullName, setFullName] = useState('');
  const [country, setCountry] = useState('');
  const handleFullNameChange = (event: ChangeEvent<HTMLInputElement>) => setFullName(event.target.value);
  const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => setCountry(event.target.value);
  const handleSignIn = () => navigate('/login');

  const handleStartPlanning = (event: FormEvent) => {
    event.preventDefault();
    startLoading();

    setTimeout(() => {
      stopLoading();
      navigate('/dashboard');
    }, 300);
  };

  return (
    <AuthLayout>
      <AuthPageLayout
        title="Let's Get To Know You!"
        subtitle="Provide only the information provided so that Tripal can know you better"
        isLoading={isLoading}
        footer={{
          questionText: 'Already have an account?',
          actionText: 'Sign In',
          onActionClick: handleSignIn,
        }}
      >
        <div className="mt-5 translate-y-7">
          <form
            className="space-y-6"
            onSubmit={handleStartPlanning}
            autoComplete="off"
          >
            <InputField
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={handleFullNameChange}
              required
            />

            <div className="flex flex-col space-y-2">
              <label className="text-sm2 font-bold text-brand-dark-alt" htmlFor="country">
                Country
              </label>
              <div className="relative">
                <select
                  id="country"
                  className="w-full px-5 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 text-base focus:outline-none focus:border-blue-500 transition appearance-none cursor-pointer text-slate-700 pr-12"
                  value={country}
                  onChange={handleCountryChange}
                  required
                >
                  <option value="" disabled hidden>
                    Select country
                  </option>
                  <option value="VN">Vietnam</option>
                  <option value="US">United States</option>
                </select>
                <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 text-2xs">
                  <ArrowDownIcon aria-label="Select country" />
                </div>
              </div>
            </div>

            <div className="pt-4 translate-y-7">
              <Button type="submit" isLoading={isLoading} showArrow>
                Start Planning Trips
              </Button>
            </div>
          </form>
        </div>
      </AuthPageLayout>
    </AuthLayout>
  );
};
