"use client";

import CallModal from "@/components/CallModal";
import { generateCallPrompt } from "@/components/CallPrompt";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Representatives() {
  const router = useRouter();
  const { representatives, userInfo } = useStore();
  const [isPromptExpanded, setIsPromptExpanded] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    phoneNumber: "",
    representativeName: "",
    prompt: "",
  });
  const [isCallLoading, setIsCallLoading] = useState(false);
  const [callError, setCallError] = useState("");

  // Redirect if no data is present
  useEffect(() => {
    if (representatives.length === 0 || !userInfo.fullName) {
      router.push("/");
    }
  }, [representatives, userInfo, router]);

  const handleCallClick = (phoneNumber: string, name: string) => {
    const prompt = generateCallPrompt({
      fullName: userInfo.fullName,
      age: userInfo.age,
      zipCode: userInfo.zipCode,
      homeOwnershipStatus: userInfo.homeOwnershipStatus,
      representativeName: name,
      passionateIssues: userInfo.passionateIssues,
      gender: userInfo.gender,
      profession: userInfo.profession,
      income: userInfo.income,
      message: userInfo.message,
    });

    setModalState({
      isOpen: true,
      phoneNumber,
      representativeName: name,
      prompt,
    });
  };

  const handleCall = async (phoneNumber: string) => {
    setIsCallLoading(true);
    setCallError("");

    try {
      const response = await fetch("/api/bland", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber,
          gender: userInfo.gender,
          prompt: modalState.prompt,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to make call");
      }

      // Close modal on success
      setModalState((prev) => ({ ...prev, isOpen: false }));
    } catch (err) {
      setCallError(err instanceof Error ? err.message : "Failed to make call");
      console.error("Call error:", err);
    } finally {
      setIsCallLoading(false);
    }
  };

  const callPrompt = generateCallPrompt({
    fullName: userInfo.fullName,
    age: userInfo.age,
    zipCode: userInfo.zipCode,
    homeOwnershipStatus: userInfo.homeOwnershipStatus,
    representativeName: representatives[0]?.name || "your representative",
    passionateIssues: userInfo.passionateIssues,
    gender: userInfo.gender,
    profession: userInfo.profession,
    income: userInfo.income,
    message: userInfo.message,
  });

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Your Representatives</h1>
          <button
            onClick={() => router.push("/")}
            className="text-blue-600 hover:underline"
          >
            ← Edit Form
          </button>
        </div>

        <div className="grid gap-6 mb-8">
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
                <div className="flex items-center justify-between">
                  <p>
                    <span className="font-medium">Phone:</span>{" "}
                    {rep.phone || "No phone number available"}
                  </p>
                  <button
                    onClick={() => handleCallClick(rep.phone, rep.name)}
                    disabled={!rep.phone}
                    className={`px-4 py-2 rounded-lg text-sm ${
                      rep.phone
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Call
                  </button>
                </div>
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

        <div className="border rounded-lg overflow-hidden">
          <button
            onClick={() => setIsPromptExpanded(!isPromptExpanded)}
            className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
          >
            <span className="font-medium">Robo Call Prompt</span>
            <svg
              className={`w-5 h-5 transform transition-transform ${
                isPromptExpanded ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div
            className={`transition-all duration-200 ease-in-out ${
              isPromptExpanded
                ? "max-h-[1000px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="p-6 bg-white whitespace-pre-wrap">{callPrompt}</div>
          </div>
        </div>

        <CallModal
          isOpen={modalState.isOpen}
          onClose={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
          initialPhoneNumber={modalState.phoneNumber}
          representativeName={modalState.representativeName}
          onCall={handleCall}
          isLoading={isCallLoading}
          error={callError}
        />
      </main>
    </div>
  );
}
