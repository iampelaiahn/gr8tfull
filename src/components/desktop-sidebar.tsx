
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
  SidebarRail,
  SidebarTrigger
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
        <SidebarHeader className="flex-row justify-between">
            <div className="flex items-center gap-2">
                <AnimatedLogo />
                <span className="text-xl font-semibold group-data-[collapsible=icon]:hidden">gr8tful</span>
            </div>
             <SidebarTrigger />
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
            <div>
                <BookNowDialog artists={artists} activeArtist={activeArtist} />
            </div>
        </SidebarFooter>
    </>
  );
}
