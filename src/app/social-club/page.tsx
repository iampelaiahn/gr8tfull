
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from "@/hooks/use-toast"
import Link from 'next/link';
import Image from 'next/image';
import { Ticket, ShoppingCart, CreditCard, CheckCircle } from 'lucide-react';

const events = [
  {
    id: 'evt-001',
    name: 'Nobody: Genesis Album Launch',
    date: '2024-10-26',
    location: 'Virtual Event',
    price: 15.00,
    imageUrl: 'https://placehold.co/600x400/7FDBFF/000000',
    imageHint: 'abstract album art'
  },
  {
    id: 'evt-002',
    name: 'imnotfamous: Subterranean Sounds Live',
    date: '2024-11-15',
    location: 'The Underground, London',
    price: 25.00,
    imageUrl: 'https://placehold.co/600x400/3D9970/000000',
    imageHint: 'dark club atmosphere'
  },
  {
    id: 'evt-003',
    name: 'gr8tful Music Festival',
    date: '2025-01-10',
    location: 'Los Angeles, CA',
    price: 75.00,
    imageUrl: 'https://placehold.co/600x400/FF851B/000000',
    imageHint: 'music festival stage'
  },
];

const fashionItems = [
  {
    id: 'fsh-001',
    name: 'gr8tful Classic Tee',
    price: 30.00,
    sizes: ['S', 'M', 'L', 'XL'],
    imageUrl: 'https://placehold.co/400x400/111111/ffffff',
    imageHint: 'black t-shirt'
  },
  {
    id: 'fsh-002',
    name: 'Animated Logo Hoodie',
    price: 65.00,
    sizes: ['M', 'L', 'XL'],
    imageUrl: 'https://placehold.co/400x400/B10DC9/ffffff',
    imageHint: 'purple hoodie'
  },
  {
    id: 'fsh-003',
    name: 'Visionary Beanie',
    price: 25.00,
    sizes: ['One Size'],
    imageUrl: 'https://placehold.co/400x400/FFDC00/000000',
    imageHint: 'yellow beanie'
  },
   {
    id: 'fsh-004',
    name: 'Soundwave Snapback',
    price: 35.00,
    sizes: ['One Size'],
    imageUrl: 'https://placehold.co/400x400/0074D9/ffffff',
    imageHint: 'blue snapback hat'
  },
];

type Product = typeof events[0] | typeof fashionItems[0];

export default function SocialClubPage() {
  const { toast } = useToast();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleBuyClick = (product: Product) => {
    setSelectedProduct(product);
    setShowConfirmation(false); // Reset to payment screen first
  };

  const handleConfirmPurchase = () => {
    // Simulate purchase confirmation
    setShowConfirmation(true);
    setTimeout(() => {
        const dialogCloseButton = document.getElementById('close-dialog');
        dialogCloseButton?.click();
        toast({
            title: "Purchase Successful!",
            description: `Your order for "${selectedProduct?.name}" has been confirmed.`,
        });
    }, 2000);
  }

  return (
    <>
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-50 flex justify-between items-center p-4 bg-black/30 backdrop-blur-md border-b border-white/10">
          <Link href="/" className="logo text-3xl font-bold flex items-center gap-1.5">
            <span>gr8tful</span>
          </Link>
          <Button asChild variant="outline">
            <Link href="/">Back to Home</Link>
          </Button>
        </header>

        <main className="flex-grow container mx-auto p-4 md:p-8">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-primary">Welcome to the Social Club</h1>
            <p className="text-xl text-muted-foreground mt-4">
              Your exclusive access to tickets and merch.
            </p>
          </div>

          <Tabs defaultValue="tickets" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="tickets"><Ticket className="mr-2"/> Tickets</TabsTrigger>
              <TabsTrigger value="fashion"><ShoppingCart className="mr-2"/> Fashion</TabsTrigger>
            </TabsList>

            <TabsContent value="tickets">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {events.map((event) => (
                        <Card key={event.id} className="social-club-card">
                            <CardHeader className="p-0">
                                <Image src={event.imageUrl} alt={event.name} width={600} height={400} className="rounded-t-lg aspect-[3/2] object-cover" data-ai-hint={event.imageHint} />
                            </CardHeader>
                            <CardContent className="p-4">
                                <CardTitle className="text-xl">{event.name}</CardTitle>
                                <CardDescription className="mt-2">{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} - {event.location}</CardDescription>
                            </CardContent>
                            <CardFooter className="p-4 flex justify-between items-center">
                                <span className="text-2xl font-bold text-primary">${event.price.toFixed(2)}</span>
                                <DialogTrigger asChild>
                                    <Button onClick={() => handleBuyClick(event)}>
                                        <Ticket className="mr-2"/> Get Ticket
                                    </Button>
                                </DialogTrigger>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </TabsContent>

            <TabsContent value="fashion">
                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                    {fashionItems.map((item) => (
                         <Card key={item.id} className="social-club-card text-center">
                            <CardHeader className="p-0">
                                 <Image src={item.imageUrl} alt={item.name} width={400} height={400} className="rounded-t-lg aspect-square object-cover" data-ai-hint={item.imageHint} />
                            </CardHeader>
                            <CardContent className="p-4">
                                <CardTitle className="text-lg">{item.name}</CardTitle>
                                <p className="text-muted-foreground text-sm mt-1">{item.sizes.join(' / ')}</p>
                            </CardContent>
                             <CardFooter className="p-4 flex justify-between items-center">
                                <span className="text-xl font-bold text-primary">${item.price.toFixed(2)}</span>
                                <DialogTrigger asChild>
                                    <Button size="sm" onClick={() => handleBuyClick(item)}>
                                        <ShoppingCart className="mr-2"/> Buy
                                    </Button>
                                </DialogTrigger>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>

       <Dialog onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="sm:max-w-md bg-background">
          {selectedProduct && (
             <>
                <DialogHeader>
                    <DialogTitle>{showConfirmation ? 'Thank You!' : `Purchase: ${selectedProduct.name}`}</DialogTitle>
                     {!showConfirmation && <DialogDescription>Confirm your purchase details below.</DialogDescription>}
                </DialogHeader>

                {showConfirmation ? (
                    <div className="flex flex-col items-center justify-center text-center py-8">
                        <CheckCircle className="h-24 w-24 text-green-500 animate-pulse" />
                        <p className="text-lg mt-4 font-semibold">Your order is confirmed!</p>
                        <p className="text-muted-foreground">You will receive an email shortly.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Item:</span>
                            <span className="font-semibold">{selectedProduct.name}</span>
                        </div>
                         <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Price:</span>
                            <span className="font-semibold">${(selectedProduct as any).price.toFixed(2)}</span>
                        </div>
                        <Button onClick={handleConfirmPurchase} className="w-full">
                           <CreditCard className="mr-2" /> Pay Now
                        </Button>
                    </div>
                )}
                <DialogTrigger asChild>
                    <button id="close-dialog" className="hidden">Close</button>
                </DialogTrigger>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
