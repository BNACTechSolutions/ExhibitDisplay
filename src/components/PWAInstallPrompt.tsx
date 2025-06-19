import { useEffect, useState } from 'react';
import { X, Download, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface PWAInstallPromptProps {
  onClose?: () => void;
}

const PWAInstallPrompt = ({ onClose }: PWAInstallPromptProps) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    const checkIfInstalled = () => {
      // Check if running as PWA
      if (window.matchMedia('(display-mode: standalone)').matches || 
          (window.navigator as any).standalone ||
          document.referrer.includes('android-app://')) {
        setIsInstalled(true);
        return true;
      }
      return false;
    };

    // Check if user has already dismissed the prompt
    const hasUserDismissed = localStorage.getItem('pwa-install-dismissed');
    const lastDismissedTime = localStorage.getItem('pwa-install-dismissed-time');
    
    // Show again after 7 days if previously dismissed
    const shouldShowAgain = !lastDismissedTime || 
      (Date.now() - parseInt(lastDismissedTime)) > 7 * 24 * 60 * 60 * 1000;

    if (checkIfInstalled() || (hasUserDismissed && !shouldShowAgain)) {
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show our custom prompt after a short delay
      setTimeout(() => {
        setShowPrompt(true);
      }, 2000);
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      localStorage.removeItem('pwa-install-dismissed');
      localStorage.removeItem('pwa-install-dismissed-time');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // For browsers that don't support beforeinstallprompt (like iOS Safari)
    // Show the prompt anyway with manual instructions
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isInStandaloneMode = (window.navigator as any).standalone;
    
    if (isIOS && !isInStandaloneMode && !hasUserDismissed) {
      setTimeout(() => {
        setShowPrompt(true);
      }, 2000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Show the browser's install prompt
      deferredPrompt.prompt();
      
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
    localStorage.setItem('pwa-install-dismissed-time', Date.now().toString());
    onClose?.();
  };

  const getInstallInstructions = () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    
    if (isIOS) {
      return {
        title: "Install App on iOS",
        steps: [
          "Tap the Share button at the bottom of the screen",
          "Scroll down and tap 'Add to Home Screen'",
          "Tap 'Add' to install the app"
        ]
      };
    } else if (isAndroid) {
      return {
        title: "Install App on Android",
        steps: [
          "Tap the menu (⋮) in your browser",
          "Select 'Add to Home screen' or 'Install app'",
          "Tap 'Add' or 'Install' to confirm"
        ]
      };
    } else {
      return {
        title: "Install App on Desktop",
        steps: [
          "Look for the install icon in your browser's address bar",
          "Click 'Install' when prompted",
          "The app will be added to your desktop"
        ]
      };
    }
  };

  if (!showPrompt || isInstalled) {
    return null;
  }

  const instructions = getInstallInstructions();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Smartphone className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              Install App
            </h3>
          </div>
          <button
            onClick={handleDismiss}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 mb-6">
            Install this app for a better experience! Get faster loading, offline access, and native app features.
          </p>

          {/* Benefits */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Works offline</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Faster loading</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Native app experience</span>
            </div>
          </div>

          {/* Install Button */}
          {deferredPrompt && (
            <button
              onClick={handleInstallClick}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 mb-4"
            >
              <Download className="w-5 h-5" />
              Install App
            </button>
          )}

          {/* Manual Instructions for iOS/other browsers */}
          {!deferredPrompt && (
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-gray-900 mb-3">{instructions.title}</h4>
              <ol className="space-y-2">
                {instructions.steps.map((step, index) => (
                  <li key={index} className="flex gap-3 text-sm text-gray-600">
                    <span className="flex-shrink-0 w-5 h-5 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-xs font-medium">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Dismiss Button */}
          <button
            onClick={handleDismiss}
            className="w-full text-gray-500 hover:text-gray-700 py-2 transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;