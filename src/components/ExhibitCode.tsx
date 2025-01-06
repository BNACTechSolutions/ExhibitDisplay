"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

type ExhibitCodeProps = {
  client_code: string;
};


const ExhibitCode = ({client_code}: ExhibitCodeProps) => {
  const [exhibitCode, setExhibitCode] = useState<string>("");
  const router = useRouter();

  const onSubmit = () => {
    router.push(`${client_code}/exhibit/${exhibitCode}`);
    console.log("Exhibit Code: ", exhibitCode);
  };

  return (
    <div className="flex flex-col items-center justify-center   px-6  ">
      {/* Outer Box */}
      <div className="bg-white rounded-lg shadow-lg p-10 max-w-md w-full bg-white/85 backdrop:blur-lg">
        {/* Label */}
        <div className="text-lg font-medium text-black mb-6 text-center">
          Enter Exhibit Code
        </div>
        {/* Input and Button */}
        <div className="flex flex-col items-center gap-6">
          <input
            type="text"
            placeholder="Exhibit Code"
            className="px-4 py-3 w-full rounded-lg border border-purple-300 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out"
            value={exhibitCode}
            onChange={(e) => setExhibitCode(e.target.value)}
          />
          <button
            className="bg-purple-600 text-white px-6 py-3 w-full rounded-lg shadow-md hover:bg-purple-700 transition duration-300"
            onClick={onSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExhibitCode;
