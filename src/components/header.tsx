
"use client";

import { useState } from 'react';
import { QrCode } from 'lucide-react';
import AnimatedLogo from './animated-logo';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Artist } from '@/app/page';
import QRCode from 'qrcode.react';

type HeaderProps = {
  activeArtist: Artist;
};

const QRCodeGenerator = ({ text }: { text: string }) => {
  if (typeof window === 'undefined') {
    return <div className="w-48 h-48 bg-gray-200 animate-pulse" />;
  }
  return <QRCode value={text} size={192} />;
};

export default function Header({ activeArtist }: HeaderProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const handleQrCodeClick = () => {
    if (typeof window !== 'undefined') {
        setQrCodeUrl(`${window.location.origin}/#producers?artist=${activeArtist.id}`);
    }
  };

  return (
    <header className="main-header sticky top-5 z-50 flex flex-row justify-between items-center p-4 bg-black/30 backdrop-blur-md rounded-2xl border border-white/10">
      <div className="header-left flex items-center gap-4">
        <div className="logo text-2xl font-bold flex items-center gap-1">
          <span>gr</span>
          <AnimatedLogo />
          <span>tful</span>
        </div>
      </div>
      
      <div className="header-right flex items-center gap-5">
          <Popover>
            <PopoverTrigger asChild>
              <QrCode className="cursor-pointer" onClick={handleQrCodeClick} />
            </PopoverTrigger>
            <PopoverContent className="w-auto bg-background/80 backdrop-blur-md border-white/20 p-4">
                <div className="text-center text-foreground mb-2">
                    Scan for {activeArtist.name}'s profile
                </div>
                {qrCodeUrl ? (
                    <QRCodeGenerator text={qrCodeUrl} />
                ) : (
                    <div className="w-48 h-48 bg-gray-700 flex items-center justify-center">
                        <p className="text-foreground">Click QR icon again</p>
                    </div>
                )}
            </PopoverContent>
          </Popover>
      </div>
    </header>
  );
}
