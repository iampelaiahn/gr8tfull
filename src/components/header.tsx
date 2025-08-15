
"use client";

import { useState } from 'react';
import { QrCode, Bell } from 'lucide-react';
import AnimatedLogo from './animated-logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Artist } from '@/app/page';
import QRCode from 'qrcode.react';
import BookNowDialog from './book-now-dialog';
import { Separator } from './ui/separator';

type HeaderProps = {
  activeArtist: Artist;
  artists: Artist[];
};

const QRCodeGenerator = ({ text }: { text: string }) => {
  if (typeof window === 'undefined') {
    return <div className="w-48 h-48 bg-gray-200 animate-pulse" />;
  }
  return <QRCode value={text} size={192} />;
};

const notifications = [
    { id: 1, title: 'New Album Drop', description: 'Nobody just released their new album "Genesis"!', time: '2h ago' },
    { id: 2, title: 'Live Now!', description: 'imnotfamous is streaming a live set from the studio.', time: '1d ago' },
    { id: 3, title: 'Event Reminder', description: 'Don\'t miss the Gr8tful Music Festival next month.', time: '3d ago' },
];

export default function Header({ activeArtist, artists }: HeaderProps) {
  const [activeLink, setActiveLink] = useState('Home');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [hasUnseenNotifications, setHasUnseenNotifications] = useState(true);

  const navLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'Social Club', href: '/social-club'},
    { name: 'Events', href: '/#events' },
    { name: 'Dedications', href: '/#dedications' },
  ];

  const handleQrCodeClick = () => {
    if (typeof window !== 'undefined') {
        setQrCodeUrl(`${window.location.origin}/#producers?artist=${activeArtist.id}`);
    }
  };

  const handleNavClick = (name: string) => {
    // Only set active link for on-page navigation
    if (name === 'Home' || name === 'Dedications' || name === 'Events') {
      setActiveLink(name);
    } else {
      setActiveLink(''); // Reset for external pages
    }
  }

  return (
    <header className="main-header sticky top-5 z-50 flex flex-col md:flex-row justify-between items-center p-4 bg-black/30 backdrop-blur-md rounded-2xl border border-white/10">
      <div className="header-left flex items-center gap-5">
        <div className="logo text-3xl font-bold flex items-center gap-1.5">
          <span>gr</span>
          <AnimatedLogo />
          <span>tful</span>
        </div>
      </div>
      <nav className="hidden lg:block">
        <ul className="flex items-center gap-2.5 list-none m-0 p-1.5 bg-black/50 rounded-2xl">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                onClick={() => handleNavClick(link.name)}
                className={`px-4 py-2 rounded-xl transition-colors duration-300 cursor-pointer ${
                  activeLink === link.name ? 'bg-background' : ''
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            <BookNowDialog artists={artists} activeArtist={activeArtist} />
          </li>
        </ul>
      </nav>
      <div className="header-right flex items-center gap-5">
        <div className="header-icons flex items-center gap-5 text-xl">
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
          
          <Popover onOpenChange={(open) => { if(open) setHasUnseenNotifications(false)}}>
            <PopoverTrigger asChild>
              <div className="notification-icon relative cursor-pointer">
                <Bell />
                {hasUnseenNotifications && <span className="notification-dot absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-background"></span>}
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-background/80 backdrop-blur-md border-white/20 p-0">
                <div className="p-4">
                   <h4 className="font-medium text-foreground">Notifications</h4>
                </div>
                <Separator />
                <div className="p-2 max-h-80 overflow-y-auto">
                    {notifications.length > 0 ? (
                        notifications.map((notification, index) => (
                            <div key={notification.id} className="p-2 hover:bg-muted/50 rounded-lg">
                                <p className="font-semibold text-sm text-foreground">{notification.title}</p>
                                <p className="text-xs text-muted-foreground">{notification.description}</p>
                                <p className="text-xs text-muted-foreground/50 mt-1 text-right">{notification.time}</p>
                                {index < notifications.length - 1 && <Separator className="my-2 bg-border/50" />}
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-muted-foreground text-center p-4">No new notifications</p>
                    )}
                </div>
            </PopoverContent>
          </Popover>

        </div>
        <Avatar>
          <AvatarImage src="https://placehold.co/36x36" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
