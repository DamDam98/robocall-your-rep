"use client";

import CustomSelect from "@/components/CustomSelect";
import { useStore } from "@/store/useStore";
import {
  HOME_OWNERSHIP_OPTIONS,
  HomeOwnershipStatus,
  PASSIONATE_ISSUES,
  UserFormData,
} from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const { setUserInfo, setLoading, setError, setRepresentatives } = useStore();
  const [formData, setFormData] = useState<UserFormData>({
    fullName: "",
    zipCode: "",
    age: "",
    gender: "",
    profession: "",
    income: "",
    homeOwnershipStatus: "",
    passionateIssues: [],
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/representatives?zip=${formData.zipCode}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch representatives");
      }

      const data = await response.json();
      setRepresentatives(data.results);
      setUserInfo(formData);
      router.push("/representatives");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error fetching representatives"
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Find Your Representatives</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium mb-2"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, fullName: e.target.value }))
                }
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label
                htmlFor="zipCode"
                className="block text-sm font-medium mb-2"
              >
                ZIP Code
              </label>
              <input
                id="zipCode"
                type="text"
                pattern="[0-9]{5}"
                value={formData.zipCode}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, zipCode: e.target.value }))
                }
                className="w-full px-4 py-2 border rounded-lg"
                maxLength={5}
                required
              />
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-medium mb-2">
                Age
              </label>
              <input
                id="age"
                type="number"
                min="18"
                max="120"
                value={formData.age}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, age: e.target.value }))
                }
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium mb-2"
              >
                Gender
              </label>
              <select
                id="gender"
                value={formData.gender}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    gender: e.target.value as "male" | "female" | "",
                  }))
                }
                className="w-full px-4 py-2 border rounded-lg"
                required
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="profession"
                className="block text-sm font-medium mb-2"
              >
                Profession
              </label>
              <input
                id="profession"
                type="text"
                value={formData.profession}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    profession: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label
                htmlFor="income"
                className="block text-sm font-medium mb-2"
              >
                Income
              </label>
              <input
                id="income"
                type="text"
                value={formData.income}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, income: e.target.value }))
                }
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
          </div>

          <div className="space-y-6">
            <CustomSelect
              label="Home Ownership Status"
              options={HOME_OWNERSHIP_OPTIONS}
              value={formData.homeOwnershipStatus}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  homeOwnershipStatus: value as HomeOwnershipStatus,
                }))
              }
            />

            <CustomSelect
              label="Issues You're Passionate About"
              options={PASSIONATE_ISSUES}
              value={formData.passionateIssues}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  passionateIssues: value as string[],
                }))
              }
              canChooseMultiple
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message to Representatives
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, message: e.target.value }))
              }
              className="w-full px-4 py-2 border rounded-lg"
              rows={4}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
          >
            Find Representatives
          </button>
        </form>
      </main>
    </div>
  );
}
