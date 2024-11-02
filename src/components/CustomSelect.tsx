"use client";

interface CustomSelectProps {
  options: Record<string, { label: string; description: string }>;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  label: string;
  canChooseMultiple?: boolean;
  maxSelections?: number;
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
  maxSelections = 3,
}: CustomSelectProps) {
  const handleOptionClick = (optionValue: string) => {
    if (canChooseMultiple) {
      const currentValues = Array.isArray(value) ? value : [];

      // If option is already selected, allow deselecting
      if (currentValues.includes(optionValue)) {
        const newValues = currentValues.filter((v) => v !== optionValue);
        onChange(newValues);
        return;
      }

      // If not selected and haven't reached limit, allow selecting
      if (currentValues.length < maxSelections) {
        onChange([...currentValues, optionValue]);
      }
      // If at limit, don't add new selection
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

  const currentSelectionCount = Array.isArray(value) ? value.length : 0;
  const isAtSelectionLimit =
    canChooseMultiple && currentSelectionCount >= maxSelections;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium">{label}</label>
        {canChooseMultiple && (
          <span className="text-sm text-gray-500">
            {currentSelectionCount}/{maxSelections} selected
          </span>
        )}
      </div>
      <div className="grid gap-3">
        {Object.entries(options).map(
          ([optionValue, { label, description }]) => {
            const isOptionSelected = isSelected(optionValue);
            const isDisabled = isAtSelectionLimit && !isOptionSelected;

            return (
              <div
                key={optionValue}
                className={`
                p-4 border rounded-lg transition-colors
                ${
                  isDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer hover:border-blue-500"
                }
                ${
                  isOptionSelected
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200"
                }
              `}
                onClick={() => !isDisabled && handleOptionClick(optionValue)}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`
                    mt-1 w-5 h-5 border rounded-${
                      canChooseMultiple ? "sm" : "full"
                    }
                    flex-shrink-0 flex items-center justify-center transition-colors
                    ${
                      isOptionSelected
                        ? "bg-blue-600 border-blue-600"
                        : "border-gray-300"
                    }
                  `}
                  >
                    {isOptionSelected && (
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
            );
          }
        )}
      </div>
    </div>
  );
}
