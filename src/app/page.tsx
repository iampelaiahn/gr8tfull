
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/header';
import { Card, CardContent } from '@/components/ui/card';
import AIPrioritizationDialog from '@/components/ai-prioritization-dialog';
import ArtistCarousel from '@/components/artist-carousel';

export type Project = {
  title: string;
  type: string;
  imageUrl: string;
  imageHint: string;
};

export type SocialLinks = {
  spotify?: string;
  instagram?: string;
  youtube?: string;
  twitter?: string;
  mixcloud?: string;
  soundcloud?: string;
  apple?: string;
  bandcamp?: string;
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
    projects: [],
    socials: { spotify: '#', instagram: '#' },
  },
  {
    id: 'ai-souxid3',
    name: 'A.I. Souxid3',
    title: 'Artist & Visionary',
    description: 'Pushing the boundaries of art and technology.',
    longDescription: 'An artist and visionary exploring the intersection of artificial intelligence and human creativity.',
    imageUrl: 'https://placehold.co/600x800/39CCCC/ffffff',
    imageHint: "futuristic art",
    projects: [],
    socials: { youtube: '#', twitter: '#' },
  },
  {
    id: 'imnotfamous',
    name: 'imnotfamous',
    title: 'DJ & MC',
    description: 'The voice of the underground.',
    longDescription: 'A dynamic DJ and MC known for electrifying crowds with a unique blend of genres.',
    imageUrl: 'https://placehold.co/600x800/3D9970/ffffff',
    imageHint: "dj equipment",
    projects: [],
    socials: { mixcloud: '#', soundcloud: '#' },
  },
  {
    id: 'dontworry',
    name: 'DontWorry',
    title: 'Producer & Artist',
    description: 'Crafting sounds that soothe the soul.',
    longDescription: 'A producer, artist, and sound engineer dedicated to creating music that inspires peace and tranquility.',
    imageUrl: 'https://placehold.co/600x800/2ECC40/000000',
    imageHint: "calm nature",
    projects: [],
    socials: { apple: '#' },
  },
  {
    id: 'jintzu-okkzki',
    name: 'Jintzu Okzki',
    title: 'Sound Pioneer',
    description: 'A trailblazing producer and sound mentor.',
    longDescription: 'A legendary sound pioneer, producer, and mentor who has shaped the careers of many.',
    imageUrl: 'https://placehold.co/600x800/FFDC00/000000',
    imageHint: "audio waves",
    projects: [],
    socials: { bandcamp: '#' },
  },
  {
    id: 'dj-local',
    name: 'Dj local',
    title: 'DJ & MC',
    description: 'Your friendly neighborhood DJ.',
    longDescription: 'Bringing the party to your local scene with infectious energy and crowd-pleasing mixes.',
    imageUrl: 'https://placehold.co/600x800/FF851B/000000',
    imageHint: "street party",
    projects: [],
    socials: { soundcloud: '#' },
  },
  {
    id: 'micheal',
    name: 'Micheal',
    title: 'Archangel',
    description: 'Third eyes and butterflies.',
    longDescription: 'An enigmatic artist whose work transcends genres, focusing on spiritual and ethereal themes.',
    imageUrl: 'https://placehold.co/600x800/F012BE/ffffff',
    imageHint: "ethereal angel",
    projects: [],
    socials: { youtube: '#' },
  },
  {
    id: '!NV3RC3',
    name: '!NV3RC3',
    title: 'Mastermind',
    description: 'The visionary strategist behind the scenes.',
    longDescription: 'A mega-artist and idealist, the mastermind strategist shaping the gr8tful vision.',
    imageUrl: 'https://placehold.co/600x800/B10DC9/ffffff',
    imageHint: "abstract strategy",
    projects: [],
    socials: { twitter: '#' },
  },
  {
    id: 'luna-flare',
    name: 'Luna Flare',
    title: 'Vocalist & Songwriter',
    description: 'Weaving melodies that capture the heart.',
    longDescription: 'A vocalist and songwriter with a hauntingly beautiful voice and a knack for storytelling.',
    imageUrl: 'https://placehold.co/600x800/FF69B4/ffffff',
    imageHint: "female vocalist",
    projects: [],
    socials: { spotify: '#', instagram: '#' },
  },
  {
    id: 'code-maestro',
    name: 'Code Maestro',
    title: 'Algorithmic Composer',
    description: 'Generating beats with pure logic.',
    longDescription: 'A programmer and musician who creates complex soundscapes using algorithms and code.',
    imageUrl: 'https://placehold.co/600x800/00008B/ffffff',
    imageHint: "binary code",
    projects: [],
    socials: { twitter: '#' },
  },
  {
    id: 'groove-guardian',
    name: 'Groove Guardian',
    title: 'Funk & Soul Bassist',
    description: 'Laying down the foundation for dance.',
    longDescription: 'A master of the bass guitar, bringing funk and soul to every track.',
    imageUrl: 'https://placehold.co/600x800/800080/ffffff',
    imageHint: "bass guitar",
    projects: [],
    socials: { bandcamp: '#', youtube: '#' },
  }
];

export default function Home() {
  const [artists, setArtists] = useState(artistsData);
  const [activeArtist, setActiveArtist] = useState(artists[0]);
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

        <div className="content-section mb-10" id="producers">
           <div className="content-header flex justify-between items-center mb-5 flex-wrap gap-4">
            <div>
              <h2 className="text-2xl m-0">Meet our Producers</h2>
              <p className="text-muted-foreground m-0">{dateString}</p>
            </div>
            <AIPrioritizationDialog artists={artists.map(a => a.name)} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {artists.map((artist) => (
              <Card key={artist.id} className="bg-card border-border/20">
                <CardContent className="p-0">
                  <Image src={artist.imageUrl} alt={artist.name} width={600} height={800} className="rounded-t-lg object-cover aspect-[4/5]" data-ai-hint={artist.imageHint} />
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{artist.name}</h3>
                    <p className="text-muted-foreground text-sm">{artist.title}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

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
      </main>
    </div>
  );
}
