
"use client"

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
  const carouselRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeArtist = artists[currentArtistIndex];

  useEffect(() => {
    onArtistChange(activeArtist);
  }, [activeArtist, onArtistChange]);

  const clearCarouselTimeout = () => {
    if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
    }
  };

  const handleNext = useCallback(() => {
    if (listRef.current) {
      clearCarouselTimeout();
      const list = listRef.current;
      list.classList.add('next');
      const firstChild = list.children[0];
      list.appendChild(firstChild.cloneNode(true));
      list.removeChild(firstChild);
      setCurrentArtistIndex(prevIndex => (prevIndex + 1) % artists.length);
      
      timeoutRef.current = setTimeout(() => {
        list.classList.remove('next');
      }, 500);
    }
  }, [artists.length]);

  const handlePrev = () => {
    if (listRef.current) {
        clearCarouselTimeout();
        const list = listRef.current;
        list.classList.add('prev');
        const lastChild = list.children[list.children.length - 1];
        list.prepend(lastChild.cloneNode(true));
        list.removeChild(lastChild);
        setCurrentArtistIndex(prevIndex => (prevIndex - 1 + artists.length) % artists.length);

        timeoutRef.current = setTimeout(() => {
          list.classList.remove('prev');
      }, 500);
    }
  };

  const handleSeeMore = (artist: Artist) => {
    const artistToShowIndex = artists.findIndex(a => a.id === artist.id);
    setCurrentArtistIndex(artistToShowIndex);
    setShowDetail(true);
  };

  const handleBack = () => {
    setShowDetail(false);
  };
  
  useEffect(() => {
    return () => clearCarouselTimeout(); // Cleanup on unmount
  }, []);

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
    >
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
                                <div key={projIndex} className="project-card">
                                    <Image src={project.imageUrl} alt={project.title} width={120} height={120} data-ai-hint={project.imageHint}/>
                                    <h5>{project.title}</h5>
                                    <p>{project.type}</p>
                                </div>
                            )) : <p>No projects yet.</p>}
                        </div>
                    </div>
                     <Image src={artist.imageUrl} alt={artist.name} width={600} height={800} data-ai-hint={artist.imageHint} />
                </div>
            ))}
        </div>
      <div className="arrows">
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
