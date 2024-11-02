"use client";

import CallModal from "@/components/CallModal";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Representatives() {
  const router = useRouter();
  const { representatives, userInfo } = useStore();
  const [modalState, setModalState] = useState({
    isOpen: false,
    phoneNumber: "",
    representativeName: "",
  });

  // Redirect if no data is present
  useEffect(() => {
    if (representatives.length === 0 || !userInfo.fullName) {
      router.push("/");
    }
  }, [representatives, userInfo, router]);

  const handleCallClick = (phoneNumber: string, name: string) => {
    setModalState({
      isOpen: true,
      phoneNumber,
      representativeName: name,
    });
  };

  const handleCall = (phoneNumber: string) => {
    console.log("Calling:", phoneNumber);
    // Implement call functionality
  };

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Your Representatives</h1>
          <button
            onClick={() => router.push("/")}
            className="text-blue-600 hover:underline"
          >
            ← Back to Search
          </button>
        </div>

        <p className="mb-6">
          Results for {userInfo.fullName} in {userInfo.zipCode}
        </p>

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

        <CallModal
          isOpen={modalState.isOpen}
          onClose={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
          initialPhoneNumber={modalState.phoneNumber}
          representativeName={modalState.representativeName}
          onCall={handleCall}
        />
      </main>
    </div>
  );
}
