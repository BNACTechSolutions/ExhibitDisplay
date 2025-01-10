"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ExhibitDataProps, TranslationProps } from "@/types/exhibitData";
import api from "@/api/index";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ChevronDown, Volume2, Video } from "lucide-react";

const ExhibitPage = () => {
  const router = useRouter();
  const [exhibitData, setExhibitData] = useState<ExhibitDataProps | null>(null);
  const [translation, setTranslation] = useState<TranslationProps | null>(null);
  const [language, setLanguage] = useState<string | null>(null);
  const [showISLModal, setShowISLModal] = useState(false);
  const path = usePathname();
  const code = path.split("/").pop();
  const clientCode = path.split("/")[1];

  useEffect(() => {
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
        setExhibitData(data.exhibit);

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

  return (
    <>
      {/* ISL Video Modal */}
      {showISLModal && exhibitData?.islVideo && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-3xl mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold text-amber-900">Sign Language Guide</h3>
              <button
                onClick={() => setShowISLModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="relative pt-[56.25%]">
              <video
                className="absolute inset-0 w-full h-full rounded-xl"
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
        </div>
      )}

      {/* Exhibit Page Content */}
      {exhibitData && (
        <div className="min-h-screen flex flex-col relative">
          {/* Navbar */}
          <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-40 shadow-md">
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => router.back()}
                    className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      const exhibitSection = document.getElementById("exhibit-section");
                      exhibitSection?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    Add New Code
                  </button>
                </div>
                <Image src="/logo/logo.png" alt="Logo" width={120} height={40} priority />
              </div>
            </div>
          </nav>

          {/* Hero Section */}
          <div
            className="relative h-screen flex items-center justify-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${exhibitData.titleImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
          >
            <div className="text-center text-white px-4">
              <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6 tracking-tight">
                {translation?.title || exhibitData.title}
              </h1>
            </div>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <ChevronDown size={48} className="text-white opacity-80" />
            </div>
          </div>

          {/* Main Content */}
          <div className="relative bg-white">
            <div className="max-w-6xl mx-auto px-4 py-16">
              <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-amber-100">
                <div className="space-y-8">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <h2 className="text-3xl md:text-4xl font-bold text-amber-900">
                        {translation?.title || exhibitData.title}
                      </h2>
                      {translation?.audioUrls?.title && (
                        <button
                          onClick={() => {
                            const audio = new Audio(translation.audioUrls.title);
                            audio.play();
                          }}
                          className="p-2 hover:bg-amber-50 rounded-full transition-colors"
                        >
                          <Volume2 className="w-6 h-6 text-amber-600" />
                        </button>
                      )}
                    </div>
                    <div className="flex justify-center gap-4">
                      <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                        {translation?.description || exhibitData.description}
                      </p>
                      {translation?.audioUrls?.description && (
                        <button
                          onClick={() => {
                            const audio = new Audio(translation.audioUrls.description);
                            audio.play();
                          }}
                          className="p-2 hover:bg-amber-50 rounded-full transition-colors"
                        >
                          <Volume2 className="w-6 h-6 text-amber-600" />
                        </button>
                      )}
                    </div>
                  </div>

                  {exhibitData.islVideo && (
                    <div className="flex justify-center pt-6">
                      <button
                        onClick={() => setShowISLModal(true)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200 transition-colors"
                      >
                        <Video className="w-5 h-5" />
                        <span>Watch in Sign Language</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Advertisement Section */}
            {exhibitData.advertisementImage && (
              <div className="mb-24">
                <div className="max-w-lg mx-auto">
                  <div className="bg-white rounded-2xl p-6 shadow-xl border border-amber-100">
                    <Image
                      src={exhibitData.advertisementImage}
                      alt="Advertisement"
                      width={400}
                      height={400}
                      className="rounded-lg object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ExhibitPage;