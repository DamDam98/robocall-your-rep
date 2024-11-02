"use client";

import { HOME_OWNERSHIP_OPTIONS, PASSIONATE_ISSUES } from "@/types";

interface CallPromptParams {
  fullName: string;
  age: string;
  zipCode: string;
  homeOwnershipStatus: string;
  representativeName: string;
  passionateIssues: string[];
  gender: string;
  profession: string;
  income: string;
  message?: string;
}

/**
 * Formats user information into a calling script
 * @param params User information and preferences
 * @returns Formatted string for call script
 */
export function generateCallPrompt({
  fullName,
  age,
  zipCode,
  homeOwnershipStatus,
  representativeName,
  passionateIssues,
  gender,
  profession,
  income,
  message,
}: CallPromptParams): string {
  const formatHomeOwnershipStatus = () => {
    const status =
      HOME_OWNERSHIP_OPTIONS[
        homeOwnershipStatus as keyof typeof HOME_OWNERSHIP_OPTIONS
      ];
    return status?.label.toLowerCase() || "";
  };

  const formatIssues = () => {
    return passionateIssues
      .map((issue) => {
        const issueDetails =
          PASSIONATE_ISSUES[issue as keyof typeof PASSIONATE_ISSUES];
        return `${issueDetails.label} (${issueDetails.description})`;
      })
      .join("; ");
  };

  const genderPronoun =
    gender === "female" ? "woman" : gender === "male" ? "man" : "person";

  let prompt = `Hello Representative ${representativeName}, I'm ${fullName}, a ${age}-year-old ${genderPronoun} and ${formatHomeOwnershipStatus()} in ${zipCode}. I'm calling about the housing crisis affecting our community. I'd specifically like to discuss ${formatIssues()}.`;

  prompt += ` I work as a ${profession.toLowerCase()} making ${income.toLowerCase()}.`;

  if (message?.trim()) {
    prompt += ` I wanted to add that ${message}.`;
  }

  prompt +=
    "\n\nIf you can't help, I understand. I'm simply a passionate voter who wants my voice heard. Thank you for your time.";

  return prompt;
}
