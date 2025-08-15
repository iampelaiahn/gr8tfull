
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function SocialClubPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
       <header className="sticky top-0 z-50 flex justify-between items-center p-4 bg-black/30 backdrop-blur-md border-b border-white/10">
        <Link href="/" className="logo text-3xl font-bold flex items-center gap-1.5">
          <span>gr8tful</span>
        </Link>
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </header>
      <main className="flex-grow flex items-center justify-center p-8">
        <Card className="w-full max-w-2xl text-center bg-card/50 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-5xl font-bold text-primary">Welcome to the Social Club</CardTitle>
            <CardDescription className="text-xl text-muted-foreground mt-4">
              This is the space for our community. Connect, share, and vibe with us.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mt-6 text-lg">
              More exciting things are coming soon. Stay tuned for exclusive content, events, and a place to connect with fellow music lovers and the gr8tful team.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
