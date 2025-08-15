
"use client"

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Artist, Project } from '@/app/page';
import SocialIcons from './social-icons';
import { Button } from './ui/button';
import BookNowDialog from './book-now-dialog';
import { cn } from '@/lib/utils';

type ArtistCarouselProps = {
  artists: Artist[];
  onArtistChange: (artist: Artist) => void;
};

const ArtistCarousel = ({ artists, onArtistChange }: ArtistCarouselProps) => {
  const [showDetail, setShowDetail] = useState(false);
  const [currentArtistIndex, setCurrentArtistIndex] = useState(1); // Start with the second item as active
  const carouselRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const activeArtist = artists[currentArtistIndex];

  useEffect(() => {
    onArtistChange(activeArtist);
  }, [activeArtist, onArtistChange]);

  const handleNext = () => {
    if (carouselRef.current) {
        carouselRef.current.classList.remove('prev');
        carouselRef.current.classList.add('next');
        const lastItem = itemsRef.current.shift();
        if(lastItem) itemsRef.current.push(lastItem);

        // Update the DOM structure
        const list = carouselRef.current.querySelector('.list');
        if (list) {
            const firstChild = list.children[0];
            list.appendChild(firstChild);
        }
    }
  };

  const handlePrev = () => {
    if (carouselRef.current) {
        carouselRef.current.classList.remove('next');
        carouselRef.current.classList.add('prev');
        const firstItem = itemsRef.current.pop();
        if(firstItem) itemsRef.current.unshift(firstItem);
         // Update the DOM structure
         const list = carouselRef.current.querySelector('.list');
         if (list) {
             const lastChild = list.children[list.children.length - 1];
             list.prepend(lastChild);
         }
    }
  };

  const handleSeeMore = (artist: Artist) => {
    setCurrentArtistIndex(artists.findIndex(a => a.id === artist.id));
    setShowDetail(true);
  };

  const handleBack = () => {
    setShowDetail(false);
  };

  return (
    <div className={cn("carousel", { 'showDetail': showDetail })} ref={carouselRef}>
        <div className="list">
            {artists.map((artist, index) => (
                 <div
                    key={artist.id}
                    className="item"
                    ref={el => itemsRef.current[index] = el}
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
                        <SocialIcons socials={artist.socials} />
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
