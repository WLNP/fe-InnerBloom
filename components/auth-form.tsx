import { useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';

export function AuthForm({
  action,
  children,
  defaultEmail = '',
  isRegister = false, // Flag untuk register atau login
}: {
  action: NonNullable<
    string | ((formData: FormData) => void | Promise<void>) | undefined
  >;
  children: React.ReactNode;
  defaultEmail?: string;
  isRegister?: boolean;
}) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);

  // Track validation criteria
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });

  // Validasi Password
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);

    // Validasi password
    setPasswordStrength({
      length: value.length >= 8 && value.length <= 16,
      uppercase: /[A-Z]/.test(value),
      number: /[0-9]/.test(value),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    });
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setConfirmPassword(value);
    setPasswordMatch(value === password); // Check if passwords match
  };

  // Icon untuk status validasi
  const getValidationIcon = (valid: boolean) => (
    valid ? <span className="text-green-500">✔</span> : <span className="text-red-500">✘</span>
  );

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
          required
          value={password}
          onChange={handlePasswordChange}
        />

        {/* Box status validasi yang hanya muncul jika password sudah diisi */}
        {password && (
          <div className="absolute right-0 top-0 flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-2">
              {getValidationIcon(passwordStrength.length)}
              <span className={passwordStrength.length ? "text-green-600" : "text-red-600"}>8-16 characters</span>
            </div>
            <div className="flex items-center gap-2">
              {getValidationIcon(passwordStrength.uppercase)}
              <span className={passwordStrength.uppercase ? "text-green-600" : "text-red-600"}>Uppercase letter</span>
            </div>
            <div className="flex items-center gap-2">
              {getValidationIcon(passwordStrength.number)}
              <span className={passwordStrength.number ? "text-green-600" : "text-red-600"}>Number</span>
            </div>
            <div className="flex items-center gap-2">
              {getValidationIcon(passwordStrength.specialChar)}
              <span className={passwordStrength.specialChar ? "text-green-600" : "text-red-600"}>Special character</span>
            </div>
          </div>
        )}
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
            />
            {!passwordMatch && (
              <small className="text-red-600">Passwords do not match</small>
            )}
          </div>
        </>
      )}

      {children}
    </form>
  );
}