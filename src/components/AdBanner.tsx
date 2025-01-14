"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type StickyAdBannerProps = {
  adImage: string;
  altText: string;
};

const StickyAdBanner: React.FC<StickyAdBannerProps> = ({
  adImage,
  altText,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <>
      {/* Ad Banner */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-300 transition-transform duration-300 }`}
      >
       
        

        {/* Ad Content */}
        <div className="flex justify-center items-center py-4">
          <img
            src={adImage}
            alt={altText}
            className="max-w-full max-h-16 object-contain"
          />
        </div>
      </div>

      
    </>
  );
};

export default StickyAdBanner;
