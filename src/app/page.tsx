
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AIPrioritizationDialog from '@/components/ai-prioritization-dialog';
import ArtistCarousel from '@/components/artist-carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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

const artistsData: Artist[] = [
  {
    id: 'nobody',
    name: 'Nobody',
    title: 'Main Character',
    description: 'The artist, producer, and owner of the web app.',
    longDescription: 'The driving force behind gr8tful, a multi-talented artist and producer shaping the future of sound.',
    imageUrl: 'https://placehold.co/600x800/7FDBFF/000000',
    imageHint: "man portrait",
    projects: [
        { title: 'Genesis', type: 'Album', imageUrl: 'https://placehold.co/200x200/7FDBFF/000000', imageHint: 'abstract album art', trackPreviewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
        { title: 'Vibes', type: 'Single', imageUrl: 'https://placehold.co/200x200/7FDBFF/ffffff', imageHint: 'colorful soundwaves', trackPreviewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    ],
    socials: { spotify: '#', instagram: '#', apple: '#', youtube: '#' },
    gradient: { from: 'hsl(var(--primary))', to: 'hsl(var(--accent))' },
  },
  {
    id: 'ai-souxid3',
    name: 'A.I. Souxid3',
    title: 'Artist & Visionary',
    description: 'Pushing the boundaries of art and technology.',
    longDescription: 'An artist and visionary exploring the intersection of artificial intelligence and human creativity.',
    imageUrl: 'https://placehold.co/600x800/39CCCC/ffffff',
    imageHint: "futuristic art",
    projects: [
        { title: 'Digital Dreams', type: 'EP', imageUrl: 'https://placehold.co/200x200/39CCCC/000000', imageHint: 'ai generated landscape', trackPreviewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
        { title: 'Neural Net', type: 'Single', imageUrl: 'https://placehold.co/200x200/39CCCC/ffffff', imageHint: 'glowing brain network', trackPreviewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
    ],
    socials: { youtube: '#', twitter: '#', youtubemusic: '#' },
    gradient: { from: '#39CCCC', to: '#001f3f' },
  },
  {
    id: 'imnotfamous',
    name: 'imnotfamous',
    title: 'DJ & MC',
    description: 'The voice of the underground.',
    longDescription: 'A dynamic DJ and MC known for electrifying crowds with a unique blend of genres.',
    imageUrl: 'https://placehold.co/600x800/3D9970/ffffff',
    imageHint: "dj equipment",
    projects: [
        { title: 'Subterranean Sounds', type: 'Mix', imageUrl: 'https://placehold.co/200x200/3D9970/000000', imageHint: 'dark club atmosphere', trackPreviewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
        { title: 'Rinse Out', type: 'Live Set', imageUrl: 'https://placehold.co/200x200/3D9970/ffffff', imageHint: 'crowd cheering', trackPreviewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
    ],
    socials: { mixcloud: '#', soundcloud: '#', audiomack: '#' },
    gradient: { from: '#3D9970', to: '#01FF70' },
  },
  {
    id: 'dontworry',
    name: 'DontWorry',
    title: 'Producer & Artist',
    description: 'Crafting sounds that soothe the soul.',
    longDescription: 'A producer, artist, and sound engineer dedicated to creating music that inspires peace and tranquility.',
    imageUrl: 'https://placehold.co/600x800/2ECC40/000000',
    imageHint: "calm nature",
    projects: [
        { title: 'Serenity', type: 'Album', imageUrl: 'https://placehold.co/200x200/2ECC40/000000', imageHint: 'zen garden', trackPreviewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
        { title: 'Breathe', type: 'Single', imageUrl: 'https://placehold.co/200x200/2ECC40/ffffff', imageHint: 'soft clouds', trackPreviewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
    ],
    socials: { apple: '#', spotify: '#' },
    gradient: { from: '#2ECC40', to: '#FFFFFF' },
  },
  {
    id: 'jintzu-okkzki',
    name: 'Jintzu Okzki',
    title: 'Sound Pioneer',
    description: 'A trailblazing producer and sound mentor.',
    longDescription: 'A legendary sound pioneer, producer, and mentor who has shaped the careers of many.',
    imageUrl: 'https://placehold.co/600x800/FFDC00/000000',
    imageHint: "audio waves",
    projects: [
        { title: 'Legacy', type: 'Compilation', imageUrl: 'https://placehold.co/200x200/FFDC00/000000', imageHint: 'gold record', trackPreviewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3' },
        { title: 'The Mentor', type: 'Documentary', imageUrl: 'https://placehold.co/200x200/FFDC00/ffffff', imageHint: 'old studio photo', trackPreviewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3' },
    ],
    socials: { bandcamp: '#', youtube: '#' },
    gradient: { from: '#FFDC00', to: '#FF851B' },
  },
  {
    id: 'dj-local',
    name: 'Dj local',
    title: 'DJ & MC',
    description: 'Your friendly neighborhood DJ.',
    longDescription: 'Bringing the party to your local scene with infectious energy and crowd-pleasing mixes.',
    imageUrl: 'https://placehold.co/600x800/FF851B/000000',
    imageHint: "street party",
    projects: [
        { title: 'Block Party', type: 'Mix', imageUrl: 'https://placehold.co/200x200/FF851B/000000', imageHint: 'boombox illustration', trackPreviewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3' },
        { title: 'Summer Jams', type: 'Playlist', imageUrl: 'https://placehold.co/200x200/FF851B/ffffff', imageHint: 'beach sunset', trackPreviewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3' },
    ],
    socials: { soundcloud: '#', instagram: '#' },
    gradient: { from: '#FF851B', to: '#FF4136' },
  },
  {
    id: 'micheal',
    name: 'Micheal',
    title: 'Archangel',
    description: 'Third eyes and butterflies.',
    longDescription: 'An enigmatic artist whose work transcends genres, focusing on spiritual and ethereal themes.',
    imageUrl: 'https://placehold.co/600x800/F012BE/ffffff',
    imageHint: "ethereal angel",
    projects: [
        { title: 'Ascension', type: 'Album', imageUrl: 'https://placehold.co/200x200/F012BE/000000', imageHint: 'angel wings', trackPreviewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3' },
        { title: 'Metamorphosis', type: 'Visual EP', imageUrl: 'https://placehold.co/200x200/F012BE/ffffff', imageHint: 'butterfly abstract', trackPreviewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3' },
    ],
    socials: { youtube: '#', bandcamp: '#' },
    gradient: { from: '#F012BE', to: '#B10DC9' },
  },
  {
    id: '!NV3RC3',
    name: '!NV3RC3',
    title: 'Mastermind',
    description: 'The visionary strategist behind the scenes.',
    longDescription: 'A mega-artist and idealist, the mastermind strategist shaping the gr8tful vision.',
    imageUrl: 'https://placehold.co/600x800/B10DC9/ffffff',
    imageHint: "abstract strategy",
    projects: [
        { title: 'The Blueprint', type: 'Manifesto', imageUrl: 'https://placehold.co/200x200/B10DC9/000000', imageHint: 'architectural drawing', trackPreviewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3' },
        { title: 'Vision', type: 'Concept Album', imageUrl: 'https://placehold.co/200x200/B10DC9/ffffff', imageHint: 'crystal ball', trackPreviewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3' },
    ],
    socials: { twitter: '#' },
    gradient: { from: '#B10DC9', to: '#85144b' },
  },
  {
    id: 'luna-flare',
    name: 'Luna Flare',
    title: 'Vocalist & Songwriter',
    description: 'Weaving melodies that capture the heart.',
    longDescription: 'A vocalist and songwriter with a hauntingly beautiful voice and a knack for storytelling.',
    imageUrl: 'https://placehold.co/600x800/FF69B4/ffffff',
    imageHint: "female vocalist",
    projects: [
        { title: 'Starlight Stories', type: 'Album', imageUrl: 'https://placehold.co/200x200/FF69B4/000000', imageHint: 'night sky', trackPreviewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
        { title: 'Echoes', type: 'Acoustic EP', imageUrl: 'https://placehold.co/200x200/FF69B4/ffffff', imageHint: 'guitar silhouette', trackPreviewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    ],
    socials: { spotify: '#', instagram: '#', youtubemusic: '#' },
    gradient: { from: '#FF69B4', to: '#FFB6C1' },
  },
  {
    id: 'code-maestro',
    name: 'Code Maestro',
    title: 'Algorithmic Composer',
    description: 'Generating beats with pure logic.',
    longDescription: 'A programmer and musician who creates complex soundscapes using algorithms and code.',
    imageUrl: 'https://placehold.co/600x800/00008B/ffffff',
    imageHint: "binary code",
    projects: [
        { title: 'Generative Suite', type: 'Album', imageUrl: 'https://placehold.co/200x200/00008B/000000', imageHint: 'matrix code', trackPreviewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
        { title: 'Recursion', type: 'Single', imageUrl: 'https://placehold.co/200x200/00008B/ffffff', imageHint: 'fractal pattern', trackPreviewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
    ],
    socials: { twitter: '#', bandcamp: '#' },
    gradient: { from: '#00008B', to: '#000000' },
  },
  {
    id: 'groove-guardian',
    name: 'Groove Guardian',
    title: 'Funk & Soul Bassist',
    description: 'Laying down the foundation for dance.',
    longDescription: 'A master of the bass guitar, bringing funk and soul to every track.',
    imageUrl: 'https://placehold.co/600x800/800080/ffffff',
    imageHint: "bass guitar",
    projects: [
        { title: 'The Pocket', type: 'Instrumental Album', imageUrl: 'https://placehold.co/200x200/800080/000000', imageHint: 'close up bass strings', trackPreviewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
        { title: 'Funkadelic Tribute', type: 'Live Session', imageUrl: 'https://placehold.co/200x200/800080/ffffff', imageHint: 'vintage funk band', trackPreviewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
    ],
    socials: { bandcamp: '#', youtube: '#' },
    gradient: { from: '#800080', to: '#4B0082' },
  }
];


export default function Home() {
  const [artists, setArtists] = useState(artistsData);
  const [activeArtist, setActiveArtist] = useState(artists[1]); // Start with second artist to match carousel
  const [dateString, setDateString] = useState('');

  useEffect(() => {
    const today = new Date();
    setDateString(today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', year: 'numeric' }));
  }, []);

  return (
    <div className="hero-section min-h-screen flex flex-col p-5 md:p-10 box-border" id="home">
      <Header activeArtist={activeArtist} artists={artists} />
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
  );
}

    