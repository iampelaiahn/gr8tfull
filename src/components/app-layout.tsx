
"use client";

import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  useSidebar,
  SidebarTrigger,
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
        <div className="flex items-center gap-2 p-2 md:p-4">
            <div className="md:hidden">
              <Header activeArtist={activeArtist} />
            </div>
            <div className="hidden md:block">
                <SidebarTrigger />
            </div>
        </div>
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
