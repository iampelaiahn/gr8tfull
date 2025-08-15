
"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Image from "next/image"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Artist } from "@/app/page"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  artist: z.string().min(1, { message: "Please select an artist." }),
  eventDate: z.date({
    required_error: "An event date is required.",
  }),
  eventTime: z.array(z.number()).min(1).max(1),
  eventType: z.string().min(1, { message: "Please select an event type." }),
  message: z.string().optional(),
})

type BookNowDialogProps = {
  artists: Artist[]
  activeArtist: Artist
}

export default function BookNowDialog({ artists, activeArtist }: BookNowDialogProps) {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      artist: activeArtist?.id || "",
      eventTime: [18], // Default to 6 PM
      message: "",
    },
  })
  
  useEffect(() => {
    if (open && activeArtist) {
      form.setValue('artist', activeArtist.id);
    }
  }, [activeArtist, form, open]);


  function onSubmit(values: z.infer<typeof formSchema>) {
    const submissionData = {
        ...values,
        eventTime: `${values.eventTime[0]}:00`,
    }
    console.log("Booking request submitted:", submissionData)
    toast({
      title: "Booking Request Sent!",
      description: "We'll get back to you soon.",
    })
    setOpen(false)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="px-4 py-2 rounded-xl transition-colors duration-300 cursor-pointer"
        >
          Book Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-background">
        <DialogHeader>
          <DialogTitle>Book an Artist</DialogTitle>
          <DialogDescription>
            Fill out the form below to book an artist for your event.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="artist"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Select an Artist</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-3 md:grid-cols-4 gap-4"
                    >
                      {artists.map((artist) => (
                        <FormItem key={artist.id} className="space-y-0">
                          <FormControl>
                            <RadioGroupItem value={artist.id} className="sr-only" />
                          </FormControl>
                          <FormLabel className={cn(
                            "font-normal block rounded-full border-2 border-muted bg-popover p-1 hover:border-accent has-[[data-state=checked]]:border-primary cursor-pointer",
                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          )}>
                              <div className="relative aspect-square w-full mb-1 overflow-hidden rounded-full">
                                <Image
                                  src={artist.imageUrl}
                                  alt={artist.name}
                                  fill
                                  className="object-cover"
                                  data-ai-hint={artist.imageHint}
                                />
                              </div>
                              <span className="block text-center text-xs font-medium text-foreground">
                                {artist.name}
                              </span>
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="eventType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type of Event</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an event type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="private-party">Private Party</SelectItem>
                        <SelectItem value="corporate-event">Corporate Event</SelectItem>
                        <SelectItem value="festival">Festival</SelectItem>
                        <SelectItem value="club-night">Club Night</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="eventDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of Event</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="eventTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hour of Event (24h format)</FormLabel>
                   <FormControl>
                    <Slider
                        min={0}
                        max={23}
                        step={1}
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    Selected time: {field.value?.[0]}:00
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a bit about your event"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="secondary">
                        Cancel
                    </Button>
                </DialogClose>
              <Button type="submit">Submit Request</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
