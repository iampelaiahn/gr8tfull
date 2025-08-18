
"use client"

import Link from "next/link";
import { Home, Store, Calendar, Heart } from "lucide-react";
import BookNowDialog from "./book-now-dialog";
import { Artist } from "@/app/page";
import { cn } from "@/lib/utils";

type BottomNavBarProps = {
    artists: Artist[];
    activeArtist: Artist;
};

export default function BottomNavBar({ artists, activeArtist }: BottomNavBarProps) {
  return (
    <nav className={cn(
        "fixed bottom-4 left-1/2 -translate-x-1/2", // Centering
        "w-[calc(100vw-2rem)] max-w-md", // Width with padding
        "bg-black/30 backdrop-blur-md", // Background and blur
        "border border-white/10 rounded-full", // Pill shape
        "p-2 md:hidden" // Padding and visibility
    )}>
      <div className="flex justify-around items-center">
        <Link href="#home" className="flex flex-col items-center text-foreground hover:text-primary transition-colors">
          <Home className="h-6 w-6" />
          <span className="text-xs">Home</span>
        </Link>
        <Link href="/social-club" className="flex flex-col items-center text-foreground hover:text-primary transition-colors">
          <Store className="h-6 w-6" />
          <span className="text-xs">Social Club</span>
        </Link>
        <Link href="#events" className="flex flex-col items-center text-foreground hover:text-primary transition-colors">
          <Calendar className="h-6 w-6" />
          <span className="text-xs">Events</span>
        </Link>
        <Link href="#dedications" className="flex flex-col items-center text-foreground hover:text-primary transition-colors">
          <Heart className="h-6 w-6" />
          <span className="text-xs">Dedications</span>
        </Link>
        <div className="flex flex-col items-center text-foreground">
            <BookNowDialog artists={artists} activeArtist={activeArtist} />
            <span className="text-xs">Book Now</span>
        </div>
      </div>
    </nav>
  );
}
