
"use client";

import Link from "next/link";
import { Home, Store, Calendar, Heart, Send, QrCode } from "lucide-react";
import BookNowDialog from "./book-now-dialog";
import { Artist } from "@/app/page";
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarRail
} from "@/components/ui/sidebar";
import AnimatedLogo from "./animated-logo";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import QRCode from "qrcode.react";
import { useState } from "react";
import { Button } from "./ui/button";

type DesktopSidebarProps = {
    artists: Artist[];
    activeArtist: Artist;
};


const QRCodeGenerator = ({ text }: { text: string }) => {
  if (typeof window === 'undefined') {
    return <div className="w-48 h-48 bg-gray-200 animate-pulse" />;
  }
  return <QRCode value={text} size={192} />;
};

export default function DesktopSidebar({ artists, activeArtist }: DesktopSidebarProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const handleQrCodeClick = () => {
    if (typeof window !== 'undefined') {
        setQrCodeUrl(`${window.location.origin}/#producers?artist=${activeArtist.id}`);
    }
  };

  return (
    <>
        <SidebarRail />
        <SidebarHeader>
            <div className="flex items-center gap-2">
                <AnimatedLogo />
                <span className="text-xl font-semibold">gr8tful</span>
            </div>
        </SidebarHeader>
        <SidebarContent>
            <SidebarMenu>
                <SidebarMenuItem>
                    <Link href="/#home" className="w-full">
                        <SidebarMenuButton>
                            <Home/>
                            Home
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                     <Link href="/social-club" className="w-full">
                        <SidebarMenuButton>
                            <Store/>
                            Social Club
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <Link href="/#events" className="w-full">
                        <SidebarMenuButton>
                            <Calendar/>
                            Events
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <Link href="/#dedications" className="w-full">
                        <SidebarMenuButton>
                            <Heart/>
                            Dedications
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="flex-col !items-start gap-4">
             <Popover>
                <PopoverTrigger asChild>
                    <Button variant="ghost" onClick={handleQrCodeClick} className="w-full justify-start">
                        <QrCode />
                        <span>QR Code</span>
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
            <div>
                <BookNowDialog artists={artists} activeArtist={activeArtist} />
            </div>
        </SidebarFooter>
    </>
  );
}
