"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import ExhibitCode from "@/components/ExhibitCode";
import api from "@/api/index";
import Cookies from "js-cookie";
import { debounce } from "lodash";
import { ChevronDown, Volume2, Video } from "lucide-react";
import StickyAdBanner from "@/components/AdBanner";

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
  advertisementImage: string;
  islVideo: string;
  __v: number;
};

type PageProps = {
  params: {
    client_code: string;
  };
};

type ApiResponse = {
  success: boolean;
  message?: string;
};

export default function Page({ params }: PageProps) {
  const [bgImage, setBgImage] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [landingData, setLandingData] = useState<LandingPage | null>(null);
  const [showLanguageSelector, setShowLanguageSelector] =
    useState<boolean>(false);
  const [visitorName, setVisitorName] = useState<string>("");
  const [visitorPhone, setVisitorPhone] = useState<string>("");
  const [formError, setFormError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showISLModal, setShowISLModal] = useState(false);

  useEffect(() => {
    const savedLanguage = Cookies.get("language");
    const savedVisitorName = Cookies.get("visitorName");
    const savedVisitorPhone = Cookies.get("visitorPhone");

    if (savedVisitorName && savedVisitorPhone) {
      // If visitor details are already stored, skip the form
      setVisitorName(savedVisitorName);
      setVisitorPhone(savedVisitorPhone);
      setLanguage(savedLanguage || ""); // Default to saved language
      setShowLanguageSelector(false);
    } else if (!savedLanguage) {
      setShowLanguageSelector(true);
    } else {
      setLanguage(savedLanguage);
      setShowLanguageSelector(true);
    }
  }, []);

  useEffect(() => {
    const fetchLandingDetails = debounce(async () => {
      console.log("Fetching landing details...");
      if (!visitorPhone || visitorPhone.length < 10) return; // Ensure phone number is complete
      try {
        const response = await api.get<LandingPage>(
          `/api/landing/${params.client_code}?mobile=${visitorPhone}`
        );
        setLandingData(response.data);
        setBgImage(response.data.displayImage);
        console.log("Landing details fetched:", response.data);
      } catch (error) {
        console.error("Error fetching landing details:", error);
      }
    }, 500); // 500ms debounce delay

    fetchLandingDetails();

    // Cleanup function to cancel the debounce on unmount
    return () => fetchLandingDetails.cancel();
  }, [params.client_code, visitorPhone]);

  const scrollToExhibit = () => {
    const element = document.getElementById("exhibit-section");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const PostVisitorData = async (): Promise<ApiResponse> => {
    try {
      const response = await api.post("/api/client/visitor-data", {
        name: visitorName,
        mobile: visitorPhone,
        clientLink: params.client_code,
      });

      // Handle 204 No Content response
      if (response.status === 204) {
        return {
          success: true,
          message: "Visitor data submitted successfully",
        };
      }

      return response.data;
    } catch (error: any) {
      console.error("Error posting visitor data:", error);
      return {
        success: false,
        message:
          error.response?.data?.message || "Error submitting visitor data",
      };
    }
  };

  const handleSubmit = async () => {
    setFormError("");
    setIsSubmitting(true);

    // Form validation
    if (!visitorName.trim()) {
      setFormError("Please enter your name");
      setIsSubmitting(false);
      return;
    }

    if (!visitorPhone.trim()) {
      setFormError("Please enter your phone number");
      setIsSubmitting(false);
      return;
    }

    if (!language) {
      setFormError("Please select a language");
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await PostVisitorData();
      console.log(result);
      if (result.message === "Visitor data stored successfully") {
        Cookies.set("language", language, { expires: 365 });
        Cookies.set("visitorName", visitorName, { expires: 365 });
        Cookies.set("visitorPhone", visitorPhone, { expires: 365 }); // Save phone number in cookies
        setShowLanguageSelector(false);
      } else {
        setFormError(
          result.message || "Error submitting visitor data. Please try again."
        );
      }
    } catch (error) {
      setFormError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedTranslation = landingData?.translations.find(
    (t) => t.language === language
  );

  return (
    <>
      {/* Language Selector Modal */}
      {showLanguageSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4">Welcome</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  placeholder="Enter your name"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="border p-2 rounded w-full"
                  value={visitorPhone}
                  onChange={(e) => setVisitorPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Language
                </label>
                <select
                  className="border p-2 rounded w-full"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  disabled={isSubmitting}
                >
                  <option value="" disabled>
                    Choose a language
                  </option>
                  {landingData?.translations.map((translation) => (
                    <option key={translation._id} value={translation.language}>
                      {translation.language}
                    </option>
                  ))}
                </select>
              </div>

              {formError && (
                <p className="text-red-500 text-sm mt-2">{formError}</p>
              )}

              <button
                className={`w-full py-2 px-4 rounded transition-colors ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : visitorName.trim() && visitorPhone.trim() && language
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-300 cursor-not-allowed text-gray-500"
                }`}
                onClick={handleSubmit}
                disabled={
                  isSubmitting ||
                  !visitorName.trim() ||
                  !visitorPhone.trim() ||
                  !language
                }
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ISL Video Modal */}
      {showISLModal && landingData?.islVideo && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-3xl mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold text-amber-900">
                Sign Language Guide
              </h3>
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
                <source src={landingData.islVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}

      {!showLanguageSelector && landingData && (
        <div className="min-h-screen flex flex-col relative">
          {/* Navbar */}
          <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-40 shadow-md">
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <Image
                    src="/logo/logo.png" // Replace with your logo path
                    alt="Aditi Logo"
                    width={120}
                    height={40}
                    priority
                  />
                </div>
                <button
                  onClick={scrollToExhibit}
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                >
                  Enter Exhibit Code
                </button>
              </div>
            </div>
          </nav>

          {/* Hero Section */}
          <div
            className="relative h-screen flex items-center justify-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
          >
            <div className="text-center text-white px-4">
              <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6 tracking-tight">
                {selectedTranslation?.title || landingData.title}
              </h1>
            </div>

            <div
              className="absolute bottom-24 left-auto transform -translate-x-1/2 animate-bounce hover:cursor-pointer"
              onClick={() =>
                window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
              }
            >
              <ChevronDown size={48} className="text-white opacity-80" />
            </div>
          </div>

          {/* Content Section */}
          <div
            className="relative"
            style={{
              backgroundImage: `linear-gradient(to bottom, #f4e2a8, #f8f1e4)`,
              backgroundAttachment: "fixed",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Main Content Container */}
            <div className="max-w-6xl mx-auto px-4 py-16">
              {/* Title, Description, and Audio Section */}
              <div className="mb-24">
                <div className="max-w-4xl mx-auto">
                  <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-amber-100">
                    <div className="space-y-8">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-4 mb-6">
                          <h2 className="text-3xl md:text-4xl font-bold text-amber-900">
                            {selectedTranslation?.title || landingData.title}
                          </h2>
                          {selectedTranslation?.audioUrls.title && (
                            <button
                              className="p-2 hover:bg-amber-50 rounded-full transition-colors"
                              onClick={() => {
                                const audio = new Audio(
                                  selectedTranslation.audioUrls.title
                                );
                                audio.play();
                              }}
                            >
                              <Volume2 className="w-6 h-6 text-amber-600" />
                            </button>
                          )}
                        </div>

                        <div className="space-y-4">
                          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                            {selectedTranslation?.description ||
                              landingData.description}
                          </p>
                          {selectedTranslation?.audioUrls.description && (
                            <button
                              className="inline-flex items-center gap-2 px-4 py-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                              onClick={() => {
                                const audio = new Audio(
                                  selectedTranslation.audioUrls.description
                                );
                                audio.play();
                              }}
                            >
                              <Volume2 className="w-5 h-5" />
                              <span>Listen to Description</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {landingData.islVideo && (
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
              </div>

              {/* Advertisement Section */}
              {landingData.advertisementImage && (
                // <div className="mb-24">
                //   <div className="max-w-lg mx-auto"> {/* Controlled max width */}
                //     <div className="bg-white rounded-2xl p-6 shadow-xl border border-amber-100">
                //       <div className="relative aspect-video">
                //         <Image
                //           src={landingData.advertisementImage}
                //           alt="Advertisement"
                //           fill
                //           className="rounded-lg object-cover"
                //           priority
                //         />
                //       </div>
                //     </div>
                //   </div>
                // </div>

                <StickyAdBanner
                  adImage={landingData.advertisementImage}
                  altText="Advertisement"
                />
              )}

              {/* Exhibit Code Section */}
              <div
                id="exhibit-section"
                className="max-w-4xl mx-auto scroll-mt-20"
              >
                <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-amber-100">
                  <ExhibitCode client_code={params.client_code} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
