"use client";

import { useEffect, useState } from "react";

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPhoneNumber: string;
  representativeName: string;
  onCall: (phoneNumber: string) => void;
}

/**
 * Modal component for initiating calls to representatives
 * @param props - Component properties including phone number and callbacks
 * @returns Modal component for calling
 */
export default function CallModal({
  isOpen,
  onClose,
  initialPhoneNumber,
  representativeName,
  onCall,
}: CallModalProps) {
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber);

  // Reset phone number when modal opens with new number
  useEffect(() => {
    setPhoneNumber(initialPhoneNumber);
  }, [initialPhoneNumber]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCall(phoneNumber);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold mb-4">
          Call {representativeName}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter phone number"
            />
          </div>

          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Call Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
