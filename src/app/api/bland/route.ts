import { NextResponse } from "next/server";

const apiKey = process.env.BLAND_API_KEY;

export async function POST(request: Request) {
  const body = await request.json();

  console.log("Body:", body);

  const { phoneNumber, prompt, gender } = body;

  const getVoice = (gender: string) => {
    if (gender === "male") {
      return "ryan";
    } else {
      return "maya"; // female voice
    }
  };

  try {
    const options = {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone_number: phoneNumber,
        task: prompt,
        voice: getVoice(gender),
      }),
    };

    fetch("https://api.bland.ai/v1/calls", options)
      .then(async (response) => {
        console.log("Response:", response);
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`HTTP error! status: ${response.status} - ${text}`);
          });
        }
        return response.json();
      })
      .then((data) => console.log("This the Response Data", data))
      .catch((err) => console.error("Bland AI Fetch error:", err));
    return NextResponse.json("");
  } catch (error) {
    console.error("Error calling bland ai:", error);
    return NextResponse.json(
      { error: "Failed to fetch bland" },
      { status: 500 }
    );
  }
}
