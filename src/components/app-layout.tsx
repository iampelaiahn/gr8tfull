
"use client";

import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  useSidebar,
} from "@/components/ui/sidebar"
import DesktopSidebar from "@/components/desktop-sidebar";
import Header from "@/components/header";
import BottomNavBar from "@/components/bottom-nav-bar";
import { Artist } from "@/app/page";
import { useIsMobile } from "@/hooks/use-mobile";

type AppLayoutProps = {
  children: React.ReactNode;
  artists: Artist[];
  activeArtist: Artist;
};

function AppLayoutContent({ children, artists, activeArtist }: AppLayoutProps) {
  const isMobile = useIsMobile();
  
  return (
    <>
      <Sidebar>
        <DesktopSidebar artists={artists} activeArtist={activeArtist}/>
      </Sidebar>
      <SidebarInset>
        {!isMobile ? null : <Header activeArtist={activeArtist} />}
        {children}
        {!isMobile ? null : <BottomNavBar artists={artists} activeArtist={activeArtist}/>}
      </SidebarInset>
    </>
  );
}

export default function AppLayout({ children, artists, activeArtist }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <AppLayoutContent artists={artists} activeArtist={activeArtist}>
        {children}
      </AppLayoutContent>
    </SidebarProvider>
  );
}
