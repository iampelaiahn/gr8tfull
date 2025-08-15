"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Artist } from "@/app/page"
import SocialIcons from "@/components/social-icons"
import BookNowDialog from "./book-now-dialog"

type ArtistCarouselProps = {
  artists: Artist[]
  onArtistChange: (artist: Artist) => void
}

export default function ArtistCarousel({ artists, onArtistChange }: ArtistCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [selectedArtist, setSelectedArtist] = React.useState<Artist>(artists[0]);

  React.useEffect(() => {
    if (!api) {
      return
    }

    const handleSelect = () => {
      const selectedIndex = api.selectedScrollSnap()
      setCurrent(selectedIndex)
      const newSelectedArtist = artists[selectedIndex];
      setSelectedArtist(newSelectedArtist);
      onArtistChange(newSelectedArtist)
    };

    api.on("select", handleSelect)
    handleSelect();

    return () => {
      api.off("select", handleSelect)
    }
  }, [api, artists, onArtistChange])

  return (
    <div className="w-full max-w-6xl mx-auto py-12" id="social">
      <Carousel setApi={setApi} className="w-full relative">
        <CarouselContent>
          {artists.map((artist) => (
            <CarouselItem key={artist.id}>
              <Card className="bg-transparent border-0 shadow-none text-foreground">
                <CardContent className="relative flex flex-col md:flex-row items-center justify-center p-0 gap-8 min-h-[60vh]">
                  <div className="md:w-1/3 relative aspect-[4/5] w-full max-w-sm self-center md:self-auto">
                    <Image
                      src={artist.imageUrl}
                      alt={artist.name}
                      fill
                      className="object-cover rounded-lg shadow-2xl shadow-primary/20"
                      data-ai-hint={artist.imageHint}
                    />
                  </div>
                  <div className="md:w-2/3 flex flex-col items-start text-left max-w-lg">
                    <p className="text-primary font-semibold mb-2">{artist.title}</p>
                    <h2 className="text-4xl md:text-6xl font-bold mb-4">{artist.name}</h2>
                    <p className="text-muted-foreground mb-6">{artist.longDescription}</p>
                    <div className="flex items-center gap-4 mb-6">
                         <SocialIcons socials={artist.socials} />
                    </div>
                    <div className="flex flex-wrap gap-4">
                       <BookNowDialog artists={artists} activeArtist={artist} />
                        <Button variant="outline" asChild>
                            <Link href="#producers">View All Producers</Link>
                        </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-4">
                <CarouselPrevious className="static -translate-y-0" />
                <div className="py-2 text-center text-sm text-muted-foreground">
                    {current + 1} / {artists.length}
                </div>
                <CarouselNext className="static -translate-y-0" />
            </div>
        </div>
      </Carousel>
    </div>
  )
}
