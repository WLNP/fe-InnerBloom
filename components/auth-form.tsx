'use client';

import { useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { PasswordValidation } from './ui/password-validation';

export function AuthForm({
  action,
  children,
  defaultEmail = '',
  isRegister = false,
}: {
  action: NonNullable<string | ((formData: FormData) => void | Promise<void>) | undefined>;
  children: React.ReactNode;
  defaultEmail?: string;
  isRegister?: boolean;
}) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  return (
    <form action={action} className="flex flex-col gap-4 px-4 sm:px-16">
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="email"
          className="text-zinc-600 font-normal dark:text-zinc-400"
        >
          Email Address
        </Label>
        <Input
          id="email"
          name="email"
          className="bg-muted text-md md:text-sm"
          type="email"
          placeholder="user@acme.com"
          autoComplete="email"
          required
          autoFocus
          defaultValue={defaultEmail}
        />
      </div>

      <div className="flex flex-col gap-2 relative">
        <Label
          htmlFor="password"
          className="text-zinc-600 font-normal dark:text-zinc-400"
        >
          Password
        </Label>
        <Input
          id="password"
          name="password"
          className="bg-muted text-md md:text-sm"
          type="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={handlePasswordChange}
        />
      </div>

      {isRegister && (
        <>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="confirmPassword"
              className="text-zinc-600 font-normal dark:text-zinc-400"
            >
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              className="bg-muted text-md md:text-sm"
              type="password"
              required
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              aria-live="polite"
            />
            <small
              className={`${
                password === confirmPassword ? 'text-green-600' : 'text-red-600'
              }`}
              aria-live="polite"
            >
              {confirmPassword && (password === confirmPassword ? 'Passwords match' : 'Passwords do not match')}
            </small>
          </div>

          <PasswordValidation
            password={password}
            confirmPassword={confirmPassword}
          />
        </>
      )}

      {children}
    </form>
  );
}