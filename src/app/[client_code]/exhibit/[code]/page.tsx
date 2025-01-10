"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ExhibitDataProps, TranslationProps } from "@/types/exhibitData";
import api from "@/api/index";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import AudioButton from "@/components/AudioButton";

const ExhibitPage = () => {
    const router = useRouter();
  const [exhibitData, setExhibitData] = useState<ExhibitDataProps | null>(null);
  const [translation, setTranslation] = useState<TranslationProps | null>(null);
  const [language, setLanguage] = useState<string | null>(null);
  const [exhibitCode, setExhibitCode] = useState<string>("");
  const path = usePathname();
  const code = path.split("/").pop();
  const clientCode = path.split("/")[1];
  console.log("Client Code: ", clientCode);

  useEffect(() => {
    // Check for saved language in cookies
    const savedLanguage = Cookies.get("language");
    setLanguage(savedLanguage || "english"); // Default to English
  }, []);

  useEffect(() => {
    const fetchExhibitDetails = async () => {
      try {
        const response = await api.get(`/api/exhibit/${code}`);
        if (response.status !== 200) {
          throw new Error("Failed to fetch exhibits");
        }
        const data = response.data;
        console.log("Exhibit data:", data);
        setExhibitData(data.exhibit);

        // Find and set the translation based on the selected language
        const selectedTranslation = data.exhibit.translations.find(
          (trans: TranslationProps) => trans.language.toLowerCase() === (language || "english")
        );
        setTranslation(selectedTranslation || null);
      } catch (error) {
        console.error("Error fetching exhibit detail:", error);
      }
    };

    if (language) {
      fetchExhibitDetails();
    }
  }, [code, language]);

  const handleLanguageSelect = (selectedLanguage: string) => {
    Cookies.set("language", selectedLanguage, { expires: 365 });
    setLanguage(selectedLanguage);
  };

  return (
    <div className="flex flex-col w-11/12 md:w-8/12 mx-auto py-10 mt-16">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#003A6F] text-sm md:text-base font-semibold hover:text-[#005A9C] transition-all"
        >
          <Icon icon="material-symbols:home" style={{color: "black"}} className="text-lg md:text-xl" />
          Back
        </button>
        <div className="flex flex-row items-center gap-2">
        <input
            type="text"
            placeholder="Exhibit Code"
            className="px-4 py-3 w-full rounded-lg border border-gray-500 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-600 transition duration-300 ease-in-out"
            value={exhibitCode}
            onChange={(e) => setExhibitCode(e.target.value)}
          />
          <button
            
            onClick={() => router.push(`/${clientCode}/exhibit/${exhibitCode}`)}><Icon icon="akar-icons:search" style={{color: "black"}} className="text-lg md:text-xl" /></button>
          
        </div>
        
      </div>
      {exhibitData ? (
        <div className="flex flex-col gap-8 font-sans">
          {/* Language Selector */}
          {/* <div className="flex justify-end">
            <select
              value={language || "english"}
              onChange={(e) => handleLanguageSelect(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 text-gray-600"
            >
              {exhibitData.translations.map((trans) => (
                <option key={trans._id} value={trans.language}>
                  {trans.language.charAt(0).toUpperCase() + trans.language.slice(1)}
                </option>
              ))}
            </select>
          </div> */}

          {/* Exhibit Title */}
          <div className="flex justify-center items-center bg-gray-100 border border-gray-300 rounded-lg p-4">
            <h1 className="text-xl md:text-3xl font-semibold text-gray-800 text-center pr-2">
              {translation?.title || exhibitData.title}
            </h1>
            {translation?.audioUrls?.title && (
              <AudioButton
                audioUrl={translation?.audioUrls?.title}
              />
            )}
          </div>

          {/* Title Image */}
          <div className="rounded-lg overflow-hidden shadow-md">
            <Image
              className="object-contain w-full h-1/2"
              src={exhibitData.titleImage}
              alt={translation?.title || exhibitData.title || "Exhibit Image"}
              width={800}
              height={250}
              priority
            />
          </div>

          {exhibitData.advertisementImage && (
                 <div className="flex py-8 justify-center pb-3"> 
                   <Image 
                     src={exhibitData.advertisementImage} 
                     alt="Advertisement" 
                     width={400} 
                     height={400} 
                     priority 
                   /> 
                 </div>
               )}

          {/* Description */}
          <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm text-gray-700 leading-relaxed">
          {translation?.audioUrls?.description && (
              // <button
              //   onClick={() => new Audio(translation?.audioUrls?.description).play()}
              //   className="text-blue-500 ml-4"
              // >
              //   🎧
              // </button>
              <AudioButton
                audioUrl={translation?.audioUrls?.description}
              />
            )}
            <p className="text-base md:text-lg">
              {translation?.description || exhibitData.description}
            </p>
          </div>

          {exhibitData.islVideo && (
         <div className="w-full flex justify-center">
          
           <div className="w-full max-w-md">
           <div className="text-center">ISL Video</div> {/* Reduced max-width for better proportions */}
             <video
               className="rounded-lg shadow-lg w-full aspect-video" /* Added aspect-video for consistent proportions */
               controls
               autoPlay
               muted
               loop
               playsInline
             >
               <source src={exhibitData.islVideo} type="video/mp4" />
               Your browser does not support the video tag.
             </video>
           </div>
         </div>
       )}

          {/* Additional Images */}
          {exhibitData.images.length > 0 && (
            <div className="flex flex-col gap-6">
              <h2 className="text-lg md:text-xl font-medium text-gray-800 text-center">
                More Images
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {exhibitData.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative w-full pt-[75%] rounded-lg overflow-hidden shadow-md"
                  >
                    <Image
                      src={image}
                      alt={`Exhibit Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">Loading exhibit data...</p>
      )}
    </div>
  );
};

export default ExhibitPage;
