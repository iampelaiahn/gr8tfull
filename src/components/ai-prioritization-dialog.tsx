"use client"

import { useState } from "react"
import { getPrioritizedArtists } from "@/app/actions"
import type { PrioritizeArtistsOutput } from "@/ai/flows/prioritize-artists"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Wand2, Loader2 } from "lucide-react"

type AIPrioritizationDialogProps = {
  artists: string[]
}

export default function AIPrioritizationDialog({ artists }: AIPrioritizationDialogProps) {
  const [open, setOpen] = useState(false)
  const [trends, setTrends] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<PrioritizeArtistsOutput | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const response = await getPrioritizedArtists({
        artists,
        currentMusicTrends: trends,
      })
      setResult(response)
    } catch (err) {
      setError("An error occurred while prioritizing artists. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Wand2 className="mr-2 h-4 w-4" />
          Prioritize with AI
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:sm:max-w-[600px] bg-background">
        <DialogHeader>
          <DialogTitle>AI Artist Prioritization</DialogTitle>
          <DialogDescription>
            Let AI suggest which producers to feature more prominently based on current music trends.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="trends" className="text-right">
                Music Trends
              </Label>
              <Input
                id="trends"
                value={trends}
                onChange={(e) => setTrends(e.target.value)}
                placeholder="e.g., Lofi beats, hyperpop, 80s synth revival"
                className="col-span-3"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Prioritizing...
                </>
              ) : (
                "Get Suggestions"
              )}
            </Button>
          </DialogFooter>
        </form>

        {error && <div className="mt-4 text-red-500">{error}</div>}

        {result && (
          <div className="mt-6 space-y-4">
            <div>
              <h4 className="font-semibold text-lg">Prioritized Artists:</h4>
              <ul className="list-decimal list-inside mt-2 space-y-1">
                {result.prioritizedArtists.map((artist, index) => (
                  <li key={index} className="text-foreground">{artist}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg">Reasoning:</h4>
              <p className="text-muted-foreground mt-2 text-sm">{result.reasoning}</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
