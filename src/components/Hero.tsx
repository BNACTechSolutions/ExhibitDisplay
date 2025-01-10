import React from "react";
import placeholder from "../../public/placeholder.jpg";
import AudioButton from "./AudioButton";

type Translation = {
  audioUrls: {
    title: string;
    description: string;
  };
  language: string;
  title: string;
  description: string;
  _id: string;
};

type LandingPage = {
  _id: string;
  clientId: string;
  displayImage: string;
  title: string;
  description: string;
  uniqueUrl: string;
  qrCode: string;
  translations: Translation[];
  __v: number;
};

type LandingResponse = {
  landingPage: LandingPage;
};

type HeroProps = {
  title: string;
  description: string;
  audioTitle?: string;
  audioDescription?: string;
};

const Hero = ({ title, description, audioDescription, audioTitle }: HeroProps) => {
  return (
    <div className="">

      <div className="flex flex-col md:flex-row items-center justify-center pt-20 pb-10 px-4 ">

        {/* Text Section */}
        <div className="p-6 rounded-lg shadow-lg bg-white/85 backdrop:blur-2xl w-full md:w-1/2">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 flex items-center space-x-2">
            {title}
            {/* Audio Button for Title */}
            {audioTitle && (
              // 
              <AudioButton
                audioUrl={audioTitle}
              />
            )}
          </h1>
          <p className="text-gray-600 flex items-center">
            {description}
            {/* Audio Button for Description */}
            {audioDescription && (
              // <button
              //   onClick={() => new Audio(audioDescription).play()}
              //   className="text-blue-500 ml-4"
              // >
              //   🎧
              // </button>
              <AudioButton
                audioUrl={audioDescription}
              />
            )}
          </p>
        </div>

      </div>
    </div>
  );
};

export default Hero;
