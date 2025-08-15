
"use client"

import React from 'react';
import Link from 'next/link';
import { SocialLinks } from '@/app/page';
import { Spotify, Instagram, Youtube, Twitter, Mic, Music, Disc, Tent } from 'lucide-react';

// A more generic icon mapping
const socialIconMap: { [key: string]: React.ElementType } = {
  spotify: (props) => <svg {...props} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Spotify</title><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.842 17.842a.6.6 0 0 1-.84.204c-2.368-1.44-5.34-1.764-8.892-.96a.6.6 0 0 1-.684-.588.6.6 0 0 1 .588-.684c3.84-.864 7.104-.504 9.708 1.104a.6.6 0 0 1 .204.84zm1.26-2.736a.75.75 0 0 1-1.05.252c-2.7-1.668-6.756-2.124-9.936-1.164a.75.75 0 0 1-.84-.708.75.75 0 0 1 .708-.84c3.552-.996 7.944-.492 11.016 1.416a.75.75 0 0 1 .252 1.05zm.132-2.904c-3.216-1.92-8.568-2.064-11.664-1.14a.9.9 0 0 1-1.008-.864.9.9 0 0 1 .864-1.008c3.492-.996 9.384-.816 12.996 1.356a.9.9 0 0 1 .444 1.188.9.9 0 0 1-1.188.444z" fill="currentColor"/></svg>,
  instagram: Instagram,
  youtube: Youtube,
  youtubemusic: Disc,
  twitter: Twitter,
  mixcloud: Mic,
  soundcloud: Music,
  apple: (props) => <svg {...props} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Apple Music</title><path d="M12.126 10.158c.07.002.135.01.196.023.064.015.122.035.176.06.052.024.1.053.14.086.04.03.074.062.102.096s.05.068.066.104a.24.24 0 0 1 .03.11c0 .04-.008.077-.024.113a.222.222 0 0 1-.06.1c-.02.03-.047.058-.078.082s-.066.047-.104.067c-.037.02-.078.037-.12.05-.044.013-.09.023-.14.03-.05.007-.1.01-.15.01-.04 0-.08-.002-.116-.007a.232.232 0 0 1-.106-.026.23.23 0 0 1-.09-.06.21.21 0 0 1-.06-.09.214.214 0 0 1-.023-.107c0-.04.008-.077.024-.112.016-.036.038-.068.067-.098s.06-.056.096-.08.076-.04.12-.054c.042-.015.088-.024.135-.03.048-.005.097-.008.146-.008M9.54 2.034a.225.225 0 0 1 .204-.114.24.24 0 0 1 .207.1c.06.05.105.12.13.2.028.084.034.176.02.276-.013.1-.048.19-.104.276-.054.084-.13.153-.223.204-.09.053-.198.08-.32.08-.08 0-.156-.016-.228-.046a.32.32 0 0 1-.18-.148.42.42 0 0 1-.09-.23c-.003-.086.015-.164.054-.236a.3.3 0 0 1 .135-.157.284.284 0 0 1 .17-.058m4.925.33c.094.002.18.02.26.052a.31.31 0 0 1 .192.14.38.38 0 0 1 .08.204c.004.08-.014.156-.05.228a.33.33 0 0 1-.14.18.42.42 0 0 1-.21.08.38.38 0 0 1-.25-.06.31.31 0 0 1-.16-.16.32.32 0 0 1-.06-.214c0-.08.02-.15.06-.21.04-.06.09-.108.15-.14.06-.03.13-.05.2-.053m4.444 1.34L12 1.372 5.08 3.706l-4.52 8.32L7.35 22.63l6.92-2.33 4.52-8.32-6.796-9.946Z" fill="currentColor"/></svg>,
  bandcamp: (props) => <svg {...props} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Bandcamp</title><path d="M0 18.75l7.437-13.5H24l-7.438 13.5H0z" fill="currentColor"/></svg>,
  audiomack: (props) => <svg {...props} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Audiomack</title><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2.121 4.568l8.242 4.758-2.121 1.225-8.242-4.758 2.12-1.225zm-3.183 1.837l8.243 4.758-2.12 1.225-8.244-4.758 2.121-1.225zm8.242 6.5l2.122 1.225-8.243 4.758-2.12-1.225 8.24-4.758z" fill="currentColor"/></svg>,
};

type SocialIconsProps = {
  socials: SocialLinks;
  className?: string;
};

const SocialIcons = ({ socials, className }: SocialIconsProps) => {
  return (
    <div className={`flex items-center gap-4 text-muted-foreground ${className}`}>
      {Object.entries(socials).map(([key, href]) => {
        const Icon = socialIconMap[key];
        if (!Icon || !href) return null;
        return (
          <Link
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            <Icon className="h-6 w-6" />
            <span className="sr-only">{key}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default SocialIcons;

    