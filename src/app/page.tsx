"use client";

import { useState } from "react";

interface Representative {
  name: string;
  party: string;
  state: string;
  district: string;
  phone: string;
  office: string;
  link: string;
}

interface ApiResponse {
  results: Representative[];
}

/**
 * Home component that displays a zip code input form and shows representatives
 * @returns React component
 */
export default function Home() {
  const [zipCode, setZipCode] = useState("");
  const [representatives, setRepresentatives] = useState<Representative[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * Handles the form submission to fetch representatives data
   * @param e - Form submission event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/representatives?zip=${zipCode}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch representatives");
      }

      const data: ApiResponse = await response.json();
      setRepresentatives(data.results);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Error fetching representatives. Please try again."
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Find Your Representatives</h1>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              pattern="[0-9]{5}"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="Enter ZIP code"
              className="px-4 py-2 border rounded-lg flex-grow"
              maxLength={5}
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
            >
              {isLoading ? "Loading..." : "Search"}
            </button>
          </div>
        </form>

        {error && <div className="text-red-600 mb-4">{error}</div>}

        {representatives.length > 0 && (
          <div className="grid gap-6">
            {representatives.map((rep, index) => (
              <div key={index} className="border rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-2">{rep.name}</h2>
                <div className="grid gap-2">
                  <p>
                    <span className="font-medium">Party:</span> {rep.party}
                  </p>
                  <p>
                    <span className="font-medium">State:</span> {rep.state}
                  </p>
                  {rep.district && (
                    <p>
                      <span className="font-medium">District:</span>{" "}
                      {rep.district}
                    </p>
                  )}
                  {rep.phone && (
                    <p>
                      <span className="font-medium">Phone:</span> {rep.phone}
                    </p>
                  )}
                  {rep.office && (
                    <p>
                      <span className="font-medium">Office:</span> {rep.office}
                    </p>
                  )}
                  {rep.link && (
                    <a
                      href={rep.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Official Website →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
