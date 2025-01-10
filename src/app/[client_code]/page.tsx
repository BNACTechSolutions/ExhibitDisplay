"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Hero from "@/components/Hero";
import ExhibitCode from "@/components/ExhibitCode";
import api from "@/api/index";
import Cookies from "js-cookie";
import { debounce } from "lodash";

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
      if (!visitorPhone || visitorPhone.length < 10) return; // Ensure phone number is complete
      try {
        const response = await api.get<LandingPage>(
          `/api/landing/${params.client_code}?mobile=${visitorPhone}`
        );
        setLandingData(response.data);
        setBgImage(response.data.displayImage);
      } catch (error) {
        console.error("Error fetching landing details:", error);
      }
    }, 500); // 500ms debounce delay

    fetchLandingDetails();

    // Cleanup function to cancel the debounce on unmount
    return () => fetchLandingDetails.cancel();
  }, [params.client_code, visitorPhone]);

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

      {!showLanguageSelector && landingData && (
     <div 
     className="min-h-screen bg-gray-100 flex flex-col font-display relative" 
     style={{ 
       backgroundImage: `url(${bgImage})`, 
       backgroundSize: "cover", 
       backgroundPosition: "center", 
       backgroundRepeat: "no-repeat", 
     }} 
   > 
     <div className="flex flex-col items-center px-4 gap-8">
       <div className="w-full">
         <Hero 
           title={selectedTranslation?.title || landingData.title} 
           description={ 
             selectedTranslation?.description || landingData.description 
           } 
           audioTitle={selectedTranslation?.audioUrls.title} 
           audioDescription={selectedTranslation?.audioUrls.description} 
         />
       </div>
       
       {landingData.islVideo && (
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
               <source src={landingData.islVideo} type="video/mp4" />
               Your browser does not support the video tag.
             </video>
           </div>
         </div>
       )}
     </div>
   
     {landingData.advertisementImage && (
       <div className="flex py-8 justify-center pb-3"> 
         <Image 
           src={landingData.advertisementImage} 
           alt="Advertisement" 
           width={400} 
           height={400} 
           priority 
         /> 
       </div>
     )}
   
     <ExhibitCode client_code={params.client_code} /> 
   </div>
      )}
    </>
  );
}
