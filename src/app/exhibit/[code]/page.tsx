"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ExhibitDataProps, TranslationProps } from "@/types/exhibitData";
import api from "@/api/index";
import Cookies from "js-cookie";

const ExhibitPage = () => {
  const [exhibitData, setExhibitData] = useState<ExhibitDataProps | null>(null);
  const [language, setLanguage] = useState<string | null>(null);
  const [showLanguageSelector, setShowLanguageSelector] = useState<boolean>(false);
  const path = usePathname();
  const code = path.split("/").pop();

  useEffect(() => {
    const savedLanguage = Cookies.get("language");
    if (!savedLanguage) {
      setShowLanguageSelector(true);
    } else {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    const fetchExhibitDetails = async () => {
      try {
        const response = await api.get(`/api/exhibit/${code}`);
        if (response.status !== 200) {
          throw new Error("Failed to fetch exhibits");
        }
        const data = response.data;
        setExhibitData(data.exhibit);
      } catch (error) {
        console.error("Error fetching exhibit detail:", error);
      }
    };

    fetchExhibitDetails();
  }, [code]);

  const handleLanguageSelect = (selectedLanguage: string) => {
    Cookies.set("language", selectedLanguage, { expires: 365 });
    setLanguage(selectedLanguage);
    setShowLanguageSelector(false);
  };

  const selectedTranslation = exhibitData?.translations.find(
    (trans: TranslationProps) =>
      trans.language.toLowerCase() === (language)
  );

  return (
    <div className="flex flex-col w-10/12 md:w-9/12 mx-auto py-10 mt-16 md:py-20 md:mt-20">
      {/* Language Selector Modal */}
      {showLanguageSelector && exhibitData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Choose a Language</h2>
            <ul className="space-y-2">
              {exhibitData.translations.map((trans) => (
                <li key={trans.language}>
                  <button
                    className="w-full text-left py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded"
                    onClick={() => handleLanguageSelect(trans.language.toLowerCase())}
                  >
                    {trans.language.charAt(0).toUpperCase() + trans.language.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {exhibitData ? (
        <div className="flex flex-col gap-8 md:gap-12 font-sans">
          {/* Exhibit Title */}
          <div className="flex flex-col gap-3 bg-[#ebebeb] border border-stone-200 rounded p-5">
            <h1 className="text-lg text-[#003A6F] text-center font-semibold md:text-2xl">
              {selectedTranslation?.title || exhibitData.title}
            </h1>
          </div>

          {/* Title Image */}
          <Image
            className="w-full max-h-96 z-0 object-cover"
            src={exhibitData.titleImage}
            alt={selectedTranslation?.title || exhibitData.title || "Exhibit Image"}
            width={800}
            height={600}
          />

          {/* Description */}
          <div className="bg-white text-sm md:text-base font-sans leading-8 md:px-20">
            {selectedTranslation?.description || exhibitData.description}
          </div>

          {/* Additional Images */}
          <div className="flex flex-col gap-6">
            <h2 className="text-lg font-semibold text-center text-[#003A6F]">
              More Images
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {exhibitData.images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`Exhibit Image ${index + 1}`}
                  width={400}
                  height={300}
                  className="rounded shadow-md object-cover"
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">Loading exhibit data...</p>
      )}
    </div>
  );
};

export default ExhibitPage;
