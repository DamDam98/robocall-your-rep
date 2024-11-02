"use client";

interface Option {
  value: string;
  label: string;
  description: string;
}

interface CustomSelectProps {
  options: Record<string, { label: string; description: string }>;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  label: string;
  canChooseMultiple?: boolean;
}

/**
 * Custom select component that supports single or multiple selection with descriptions
 * @param props Component properties including options and callbacks
 * @returns Custom select component
 */
export default function CustomSelect({
  options,
  value,
  onChange,
  label,
  canChooseMultiple = false,
}: CustomSelectProps) {
  const handleOptionClick = (optionValue: string) => {
    if (canChooseMultiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = currentValues.includes(optionValue)
        ? currentValues.filter((v) => v !== optionValue)
        : [...currentValues, optionValue];
      onChange(newValues);
    } else {
      onChange(optionValue);
    }
  };

  const isSelected = (optionValue: string) => {
    if (canChooseMultiple) {
      return Array.isArray(value) && value.includes(optionValue);
    }
    return value === optionValue;
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium mb-2">{label}</label>
      <div className="grid gap-3">
        {Object.entries(options).map(
          ([optionValue, { label, description }]) => (
            <div
              key={optionValue}
              className={`
                p-4 border rounded-lg cursor-pointer transition-colors
                hover:border-blue-500
                ${
                  isSelected(optionValue)
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200"
                }
              `}
              onClick={() => handleOptionClick(optionValue)}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`
                    mt-1 w-5 h-5 border rounded-${
                      canChooseMultiple ? "sm" : "full"
                    } 
                    flex-shrink-0 flex items-center justify-center transition-colors
                    ${
                      isSelected(optionValue)
                        ? "bg-blue-600 border-blue-600"
                        : "border-gray-300"
                    }
                  `}
                >
                  {isSelected(optionValue) && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{label}</span>
                  <span className="text-sm text-gray-500 mt-1">
                    {description}
                  </span>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
