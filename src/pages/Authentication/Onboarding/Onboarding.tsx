import { useCallback, useState, type ChangeEvent, type FormEvent } from 'react';
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
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const handleFullNameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => setFullName(event.target.value), []);
  const handleCountryToggle = useCallback(() => setIsCountryOpen((prev) => !prev), []);
  const createCountryHandler = useCallback((value: string) => () => {
    setCountry(value);
    setIsCountryOpen(false);
  }, []);
  const handleSignIn = useCallback(() => navigate('/login'), [navigate]);

  const handleStartPlanning = useCallback((event: FormEvent) => {
    event.preventDefault();
    startLoading();

    setTimeout(() => {
      stopLoading();
      navigate('/dashboard');
    }, 300);
  }, [navigate, startLoading, stopLoading]);

  return (
    <AuthLayout inset heroInset>
      <AuthPageLayout
        title="Let's Get To Know You!"
        subtitle="Provide only the information provided so that Tripal can know you better"
        isLoading={isLoading}
        footer={{
          questionText: 'Already have an account?',
          actionText: 'Sign In',
          onActionClick: handleSignIn,
          className: 'mt-5.5 text-base',
        }}
      >
        <div className="mt-10">
          <form
            className=""
            onSubmit={handleStartPlanning}
            autoComplete="off"
          >
            <InputField
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={handleFullNameChange}
              className="h-14 rounded-2xl px-4 py-0 text-base"
              wrapperClassName="mb-0 space-y-4"
              required
            />

            <div className="mt-8 flex flex-col space-y-4">
              <label className="text-base font-medium text-brand-dark-alt" htmlFor="country">
                Country
              </label>
              <div className="relative">
                <input
                  id="country"
                  type="hidden"
                  value={country}
                  required
                />
                <button
                  type="button"
                  role="combobox"
                  aria-controls="country-options"
                  aria-expanded={isCountryOpen}
                  aria-label="Country"
                  className="flex h-14 w-full cursor-pointer items-center rounded-2xl border border-gray-100 bg-gray-50/30 px-4 pr-12 text-left text-sm text-slate-400 transition focus:border-blue-500 focus:outline-none"
                  onClick={handleCountryToggle}
                >
                  {country === 'VN'
                    ? 'Vietnam'
                    : country === 'US'
                      ? 'United States'
                      : 'Select country'}
                </button>
                <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 text-2xs">
                  <ArrowDownIcon aria-label="Select country" />
                </div>

                {isCountryOpen && (
                  <div
                    id="country-options"
                    role="listbox"
                    className="absolute inset-x-0 top-dropdown z-20 max-h-24 overflow-y-auto rounded-xl border border-slate-200 bg-white p-1 text-sm shadow-lg"
                  >
                    <button
                      type="button"
                      role="option"
                      aria-selected={country === 'VN'}
                      className="flex h-9 w-full items-center rounded-lg px-3 text-left text-sm font-normal text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                      onClick={createCountryHandler('VN')}
                    >
                      Vietnam
                    </button>
                    <button
                      type="button"
                      role="option"
                      aria-selected={country === 'US'}
                      className="flex h-9 w-full items-center rounded-lg px-3 text-left text-sm font-normal text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                      onClick={createCountryHandler('US')}
                    >
                      United States
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-14">
              <Button
                type="submit"
                isLoading={isLoading}
                showArrow
                className="h-13 rounded-xl py-0 text-base font-normal"
              >
                Start Planning Trips
              </Button>
            </div>
          </form>
        </div>
      </AuthPageLayout>
    </AuthLayout>
  );
};
