
"use client";

import { useState } from 'react';
import { QrCode, Bell } from 'lucide-react';
import AnimatedLogo from './animated-logo';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Artist } from '@/app/page';
import QRCode from 'qrcode.react';
import { Button } from './ui/button';

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
  const [hasUnseenNotifications, setHasUnseenNotifications] = useState(true);

  const handleQrCodeClick = () => {
    if (typeof window !== 'undefined') {
        setQrCodeUrl(`${window.location.origin}/#producers?artist=${activeArtist.id}`);
    }
  };

  const handleNotificationsOpen = (open: boolean) => {
    if (open && hasUnseenNotifications) {
      setHasUnseenNotifications(false);
    }
  };

  return (
    <header className="main-header sticky top-5 z-50 flex flex-row justify-between items-center p-2 bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 w-full">
      <div className="header-left flex items-center gap-2">
        <div className="logo text-2xl font-bold flex items-center gap-1">
          <span>gr</span>
          <AnimatedLogo />
          <span>tful</span>
        </div>
      </div>
      
      <div className="header-right flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handleQrCodeClick}>
                <QrCode className="cursor-pointer h-5 w-5" />
              </Button>
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
          
          <Popover onOpenChange={handleNotificationsOpen}>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    {hasUnseenNotifications && (
                        <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500" />
                    )}
                    <Bell className="h-5 w-5"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-background/80 backdrop-blur-md border-white/20">
                 <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Notifications</h4>
                        <p className="text-sm text-muted-foreground">
                        You have 3 new messages.
                        </p>
                    </div>
                     <div className="grid gap-2">
                         <div className="flex items-start gap-4">
                             <div className="font-bold text-primary">imnotfamous</div>
                             <p className="text-sm text-muted-foreground">
                             Just dropped a new mix! Check it out.
                             </p>
                         </div>
                         <div className="flex items-start gap-4">
                              <div className="font-bold text-accent">Nobody</div>
                             <p className="text-sm text-muted-foreground">
                             "Genesis" album is now live!
                             </p>
                         </div>
                         <div className="flex items-start gap-4">
                              <div className="font-bold text-destructive-foreground">!NV3RC3</div>
                             <p className="text-sm text-muted-foreground">
                             New merch available in the social club.
                             </p>
                         </div>
                    </div>
                </div>
            </PopoverContent>
          </Popover>
      </div>
    </header>
  );
}
