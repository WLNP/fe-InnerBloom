import React from 'react';

interface PasswordValidationProps {
  password: string;
  confirmPassword: string;
}

export const PasswordValidation: React.FC<PasswordValidationProps> = ({
  password,
  confirmPassword,
}) => {
  const passwordStrength = {
    length: password.length >= 8 && password.length <= 16,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    specialChar: /[`~!@#$%^&*()-_=+]/.test(password),
  };

  const passwordMatch = password === confirmPassword;

  const getValidationIcon = (valid: boolean) => (
    valid ? <span className="text-green-500">✔</span> : <span className="text-red-500">✘</span>
  );

  const passwordRules = [
    { key: 'length', label: 'Password must be between 8 and 16 characters long.' },
    { key: 'uppercase', label: 'Password must contain at least one uppercase letter (A-Z).' },
    { key: 'lowercase', label: 'Password must contain at least one lowercase letter (a-z).' },
    { key: 'number', label: 'Password must contain at least one number (0-9).' },
    { key: 'specialChar', label: 'Password must contain at least one special character (`~!@#$%^&*()-_=+)' },
  ];

  if (!password) return null;

  return (
    <div className="gap-5 text-sm">
      {passwordRules.map(({ key, label }) => (
        <div key={key} className="flex items-center gap-2">
          {getValidationIcon(passwordStrength[key as keyof typeof passwordStrength])}
          <span
            className={
              passwordStrength[key as keyof typeof passwordStrength]
                ? 'text-green-600'
                : 'text-red-600'
            }
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};