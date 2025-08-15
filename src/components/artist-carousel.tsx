'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import type { Artist } from '@/app/page';
import { Button } from '@/components/ui/button';
import SocialIcon from '@/components/social-icons';

type ArtistCarouselProps = {
  artists: Artist[];
};

export default function ArtistCarousel({ artists: initialArtists }: ArtistCarouselProps) {
  const [artists, setArtists] = useState(initialArtists);
  const [carouselClass, setCarouselClass] = useState('');
  const [showDetail, setShowDetail] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoSlideInterval = useRef<NodeJS.Timeout | null>(null);
  const animationTimeout = useRef<NodeJS.Timeout | null>(null);

  const stopAutoSlider = useCallback(() => {
    if (autoSlideInterval.current) {
      clearInterval(autoSlideInterval.current);
    }
  }, []);

  const startAutoSlider = useCallback(() => {
    stopAutoSlider();
    autoSlideInterval.current = setInterval(() => {
      handleSlide('next');
    }, 6000);
  }, [stopAutoSlider]);

  const handleSlide = useCallback((type: 'next' | 'prev') => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCarouselClass(type);
    
    if (animationTimeout.current) clearTimeout(animationTimeout.current);
    animationTimeout.current = setTimeout(() => {
      setArtists(currentArtists => {
        const newArtists = [...currentArtists];
        if (type === 'next') {
          newArtists.push(newArtists.shift()!);
        } else {
          newArtists.unshift(newArtists.pop()!);
        }
        return newArtists;
      });
      setCarouselClass('');
      setIsAnimating(false);
    }, 1100);
  }, [isAnimating]);
  
  const handleSeeMore = () => {
    setShowDetail(true);
    stopAutoSlider();
  };

  const handleBack = () => {
    setShowDetail(false);
    startAutoSlider();
  };

  useEffect(() => {
    startAutoSlider();
    return () => {
      stopAutoSlider();
      if (animationTimeout.current) clearTimeout(animationTimeout.current);
    };
  }, [startAutoSlider, stopAutoSlider]);

  const activeArtist = artists[1];

  return (
    <div className={`carousel ${carouselClass} ${showDetail ? 'showDetail' : ''}`}>
      <div className="list">
        {artists.map((artist) => (
          <div className="item" key={artist.id}>
            <Image
              src={artist.imageUrl}
              alt={artist.name}
              width={600}
              height={800}
              className="object-cover"
              data-ai-hint={artist.imageHint}
            />
            <div className="introduce">
              <div className="title">{artist.title}</div>
              <div className="topic">{artist.name}</div>
              <div className="des">{artist.description}</div>
              <button className="seeMore" onClick={handleSeeMore}>
                SEE MORE &#8594;
              </button>
            </div>
            <div className="detail">
              <div className="title">{activeArtist?.name}</div>
              <div className="des">{activeArtist?.longDescription}</div>
              <h4>Top Projects</h4>
              <div className="project-grid">
                {activeArtist?.projects.map((project) => (
                  <div className="project-card" key={project.title}>
                    <Image src={project.imageUrl} alt={project.title} width={120} height={120} data-ai-hint={project.imageHint}/>
                    <h5>{project.title}</h5>
                    <p>{project.type}</p>
                  </div>
                ))}
              </div>
              <div className="social-links">
                {activeArtist?.socials && Object.entries(activeArtist.socials).map(([platform, url]) => (
                  <a href={url} key={platform} target="_blank" rel="noopener noreferrer">
                    <SocialIcon platform={platform as keyof Artist['socials']} className="w-6 h-6 text-foreground hover:text-accent" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="arrows">
        <Button
          id="prev"
          variant="outline"
          size="icon"
          className="w-10 h-10 rounded-full border-white/30 bg-black/30 text-lg text-white hover:bg-black/50"
          onClick={() => { handleSlide('prev'); startAutoSlider(); }}
          disabled={isAnimating}
        >
          &lt;
        </Button>
        <Button
          id="next"
          variant="outline"
          size="icon"
          className="w-10 h-10 rounded-full border-white/30 bg-black/30 text-lg text-white hover:bg-black/50"
          onClick={() => { handleSlide('next'); startAutoSlider(); }}
          disabled={isAnimating}
        >
          &gt;
        </Button>
      </div>
      <button id="back" onClick={handleBack}>
        See All &lt;
      </button>
    </div>
  );
}
