
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AIPrioritizationDialog from '@/components/ai-prioritization-dialog';
import ArtistCarousel from '@/components/artist-carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import BottomNavBar from '@/components/bottom-nav-bar';
import { artistsData } from '@/lib/artists';
import AppLayout from '@/components/app-layout';

export type Project = {
  title: string;
  type: string;
  imageUrl: string;
  imageHint: string;
  trackPreviewUrl?: string;
};

export type SocialLinks = {
  spotify?: string;
  instagram?: string;
  youtube?: string;
  youtubemusic?: string;
  twitter?: string;
  mixcloud?: string;
  soundcloud?: string;
  apple?: string;
  bandcamp?: string;
  audiomack?: string;
};

export type Artist = {
  id: string;
  name: string;
  title: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  imageHint: string;
  projects: Project[];
  socials: SocialLinks;
  gradient: { from: string; to: string };
};

export default function Home() {
  const [artists, setArtists] = useState(artistsData);
  const [activeArtist, setActiveArtist] = useState(artists[1]); // Start with second artist to match carousel
  const [dateString, setDateString] = useState('');

  useEffect(() => {
    const today = new Date();
    setDateString(today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', year: 'numeric' }));
  }, []);

  return (
    <AppLayout artists={artists} activeArtist={activeArtist}>
      <div className="hero-section flex flex-col p-5 md:p-10 box-border" id="home">
        <main className="hero-content flex-grow flex flex-col pt-8">

          <ArtistCarousel artists={artists} onArtistChange={setActiveArtist} />
          
          <div className="content-section" id="events">
            <div className="content-header mb-5">
              <div>
                <h2 className="text-2xl m-0">Events</h2>
              </div>
            </div>
            <div className="content-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 min-h-[450px]">
              <Card className="relative flex flex-col justify-end p-6 rounded-2xl overflow-hidden bg-cover bg-center border-0" style={{backgroundImage: "url('https://placehold.co/600x800/BE1AD6/000000')"}} data-ai-hint="new album">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <CardContent className="relative z-10 p-0">
                      <h3 className="text-3xl m-0 mb-2 leading-tight">New Album Drop: "Nobody"</h3>
                      <p className="text-muted-foreground">Listen to the new album from the founder, out now!</p>
                  </CardContent>
              </Card>
              <Card className="relative flex flex-col justify-end p-6 rounded-2xl overflow-hidden bg-cover bg-center border-0" style={{backgroundImage: "url('https://placehold.co/600x800/FF851B/000000')"}} data-ai-hint="new podcast">
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <CardContent className="relative z-10 p-0">
                      <h3 className="text-3xl m-0 mb-2 leading-tight">Podcast Ep. 5 with Jintzu Okzki</h3>
                      <p className="text-muted-foreground">A deep dive into the art of sound design.</p>
                  </CardContent>
              </Card>
              <Card className="relative flex flex-col justify-end p-6 rounded-2xl overflow-hidden bg-cover bg-center border-0" style={{backgroundImage: "url('https://placehold.co/600x800/3d9970/ffffff')"}} data-ai-hint="live event">
                  <div className="live-badge absolute top-5 left-5 bg-red-600 text-white py-1 px-3 rounded-lg text-sm font-bold z-10">LIVE NOW</div>
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <CardContent className="relative z-10 p-0">
                      <h3 className="text-3xl m-0 mb-2 leading-tight">imnotfamous Live Set</h3>
                      <p className="text-muted-foreground">Streaming live from our studio.</p>
                  </CardContent>
              </Card>
            </div>
          </div>

          <div className="content-section py-16" id="dedications">
            <div className="content-header mb-8 text-center">
              <h2 className="text-4xl m-0">Dedications</h2>
              <p className="text-muted-foreground mt-2">A special thanks to the people who made it all possible.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-card/50 backdrop-blur-sm border-white/10">
                <CardHeader className="flex-row items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="https://placehold.co/100x100/FFDC00/000000" alt="Jintzu Okkzki" data-ai-hint="wise person" />
                    <AvatarFallback>JO</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>Jintzu Okkzki</CardTitle>
                    <p className="text-muted-foreground">The Mentor</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">"To the one who saw the spark and fanned it into a flame. Your guidance was the compass that led me here. Thank you for everything."</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 backdrop-blur-sm border-white/10">
                <CardHeader className="flex-row items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="https://placehold.co/100x100/B10DC9/ffffff" alt="!NV3RC3" data-ai-hint="visionary person" />
                    <AvatarFallback>!N</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>!NV3RC3</CardTitle>
                    <p className="text-muted-foreground">The Visionary</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">"For the vision that challenged me, the standards that pushed me, and the belief that lifted me. We're building the future you imagined."</p>
                </CardContent>
              </Card>
               <Card className="bg-card/50 backdrop-blur-sm border-white/10">
                <CardHeader className="flex-row items-center gap-4">
                   <Avatar className="h-16 w-16">
                     <AvatarImage src="https://placehold.co/100x100/F012BE/ffffff" alt="Micheal" data-ai-hint="ethereal angel" />
                     <AvatarFallback>M</AvatarFallback>
                   </Avatar>
                   <div>
                     <CardTitle>The Community</CardTitle>
                     <p className="text-muted-foreground">The Inspiration</p>
                   </div>
                </CardHeader>
                <CardContent>
                   <p className="text-foreground/80">"To every listener, supporter, and collaborator. You are the heartbeat of this journey. This is for you, always."</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </AppLayout>
  );
}
