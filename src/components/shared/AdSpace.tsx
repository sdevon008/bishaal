import React, { useEffect } from 'react';

interface AdSpaceProps {
  size: 'banner' | 'mediumRectangle' | 'largeRectangle' | 'responsive';
  className?: string;
}

const AdSpace: React.FC<AdSpaceProps> = ({ size, className }) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      try {
        (window as any).adsbygoogle = (window as any).adsbygoogle || [];
        (window as any).adsbygoogle.push({});
      } catch (e) {
        console.error("Error pushing ad to adsbygoogle:", e);
      }
    }
  }, []);

  let adStyle = {};
  let adFormat = "horizontal";

  switch (size) {
    case 'banner':
      adStyle = { width: '728px', height: '90px' };
      adFormat = "horizontal";
      break;
    case 'mediumRectangle':
      adStyle = { width: '300px', height: '250px' };
      adFormat = "rectangle";
      break;
    case 'largeRectangle':
      adStyle = { width: '336px', height: '280px' };
      adFormat = "rectangle";
      break;
    case 'responsive':
      adStyle = { width: '100%', height: 'auto' };
      adFormat = "fluid";
      break;
    default:
      adStyle = { width: '728px', height: '90px' };
      adFormat = "horizontal";
      break;
  }

  if (process.env.NODE_ENV !== 'production') {
    return (
      <div className={`border-2 border-dashed border-gray-400 bg-gray-100 text-gray-500 text-center py-4 ${className}`} style={adStyle}>
        [Ad Placeholder - {size}]
      </div>
    );
  }

  return (
    <div className={className}>
      <ins className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID}
        data-ad-format={adFormat}
        data-full-width-responsive="true"></ins>
    </div>
  );
};

export default AdSpace;
