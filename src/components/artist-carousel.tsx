
"use client"

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Artist, Project } from '@/app/page';
import SocialIcons from './social-icons';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

type ArtistCarouselProps = {
  artists: Artist[];
  onArtistChange: (artist: Artist) => void;
};

const ArtistCarousel = ({ artists, onArtistChange }: ArtistCarouselProps) => {
  const [showDetail, setShowDetail] = useState(false);
  const [currentArtistIndex, setCurrentArtistIndex] = useState(1);
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const activeArtist = artists[currentArtistIndex];

  useEffect(() => {
    onArtistChange(activeArtist);
  }, [activeArtist, onArtistChange]);
  
  const clearCarouselTimeout = () => {
    if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
    }
  };

  const clearAutoPlayTimeout = () => {
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }
  };
  
  const runAutoPlay = useCallback(() => {
    clearAutoPlayTimeout();
    autoPlayTimeoutRef.current = setTimeout(() => {
      // This is a direct call to the function wrapped by handleNext to avoid dependency issues.
      if (listRef.current) {
        clearCarouselTimeout();
        clearAutoPlayTimeout();
        const list = listRef.current;
        list.appendChild(list.children[0]);
        setCurrentArtistIndex(prevIndex => (prevIndex + 1) % artists.length);
        runAutoPlay();
      }
    }, 7000); 
  }, [artists.length]);

  const handleNext = useCallback(() => {
    if (listRef.current) {
      clearCarouselTimeout();
      clearAutoPlayTimeout();
      const list = listRef.current;
      list.appendChild(list.children[0]);
      setCurrentArtistIndex(prevIndex => (prevIndex + 1) % artists.length);
      runAutoPlay();
    }
  }, [artists.length, runAutoPlay]);


  const handlePrev = () => {
    if (listRef.current) {
        clearCarouselTimeout();
        clearAutoPlayTimeout();
        const list = listRef.current;
        list.prepend(list.children[list.children.length - 1]);
        setCurrentArtistIndex(prevIndex => (prevIndex - 1 + artists.length) % artists.length);
        runAutoPlay();
    }
  };

  const handleSeeMore = (artist: Artist) => {
    clearAutoPlayTimeout();
    const artistToShowIndex = artists.findIndex(a => a.id === artist.id);
    setCurrentArtistIndex(artistToShowIndex);
    setShowDetail(true);
  };

  const handleBack = () => {
    setShowDetail(false);
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayingTrack(null);
    }
    runAutoPlay();
  };
  
  const togglePlay = (trackUrl: string) => {
    if (audioRef.current) {
      if (playingTrack === trackUrl) {
        audioRef.current.pause();
        setPlayingTrack(null);
      } else {
        audioRef.current.src = trackUrl;
        audioRef.current.play();
        setPlayingTrack(trackUrl);
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 75) {
      // Swiped left
      handleNext();
    }
  
    if (touchStartX.current - touchEndX.current < -75) {
      // Swiped right
      handlePrev();
    }
  };

  
  useEffect(() => {
    runAutoPlay();

    const audio = audioRef.current;
    const handleEnded = () => setPlayingTrack(null);
    audio?.addEventListener('ended', handleEnded);

    return () => {
      audio?.removeEventListener('ended', handleEnded);
      clearCarouselTimeout();
      clearAutoPlayTimeout();
    };
  }, [runAutoPlay]);

  const { from, to } = activeArtist.gradient;
  const carouselStyle = {
    '--gradient-from': from,
    '--gradient-to': to,
  } as React.CSSProperties;

  return (
    <div 
        className={cn("carousel", { 'showDetail': showDetail })} 
        ref={carouselRef}
        style={carouselStyle}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
    >
      <audio ref={audioRef} />
        <div className="list" ref={listRef}>
            {artists.map((artist) => (
                 <div
                    key={artist.id}
                    className="item"
                 >
                    <div className="introduce">
                        <div className="title">{artist.title}</div>
                        <div className="topic">{artist.name}</div>
                        <div className="des">{artist.description}</div>
                        <button className="seeMore" onClick={() => handleSeeMore(artist)}>SEE MORE &#8594;</button>
                    </div>
                    <div className="detail">
                        <div className="title">{artist.name}</div>
                        <div className="des">{artist.longDescription}</div>
                        <SocialIcons socials={artist.socials} className="social-links" />
                        <h4>Top Projects</h4>
                        <div className="project-grid">
                            {artist.projects.length > 0 ? artist.projects.map((project: Project, projIndex: number) => (
                                <div key={projIndex} className={cn("project-card", { 'playing': playingTrack === project.trackPreviewUrl })} onClick={() => project.trackPreviewUrl && togglePlay(project.trackPreviewUrl)}>
                                    <Image src={project.imageUrl} alt={project.title} width={120} height={120} data-ai-hint={project.imageHint}/>
                                    <h5>{project.title}</h5>
                                    <p>{project.type}</p>
                                    {project.trackPreviewUrl && (
                                        <div className="project-card-player-overlay">
                                            {playingTrack === project.trackPreviewUrl ? <Pause size={32}/> : <Play size={32} />}
                                        </div>
                                    )}
                                </div>
                            )) : <p>No projects yet.</p>}
                        </div>
                    </div>
                     <Image src={artist.imageUrl} alt={artist.name} width={600} height={800} data-ai-hint={artist.imageHint} />
                </div>
            ))}
        </div>
      <div className="arrows hidden md:flex">
        <Button variant="outline" size="icon" id="prev" onClick={handlePrev}><ChevronLeft /></Button>
        <Button variant="outline" size="icon" id="next" onClick={handleNext}><ChevronRight /></Button>
      </div>
      <button id="back" onClick={handleBack}>
        &#8592; See All
      </button>
    </div>
  );
};

export default ArtistCarousel;
