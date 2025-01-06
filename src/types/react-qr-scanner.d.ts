declare module "react-qr-scanner" {
    import { CSSProperties } from "react";
  
    export interface QrReaderProps {
      delay?: number | false; // Delay between scans (in ms) or disable continuous scanning with `false`
      onScan: (data: string | null) => void; // Callback for scanning results
      onError: (error: any) => void; // Callback for errors
      style?: CSSProperties; // Inline styles for the scanner
      facingMode?: "environment" | "user"; // Camera facing mode
      className?: string; // Custom class name for the scanner container
      legacyMode?: boolean; // Enables legacy mode (file upload-based scanning)
      resolution?: number; // Video resolution (default: 640)
      showViewFinder?: boolean; // Whether to show the viewfinder (default: true)
    }
  
    const QrReader: React.FC<QrReaderProps>;
    export default QrReader;
  }
  