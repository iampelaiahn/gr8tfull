'use server';

import { prioritizeArtists, PrioritizeArtistsInput, PrioritizeArtistsOutput } from '@/ai/flows/prioritize-artists';

export async function getPrioritizedArtists(
  input: PrioritizeArtistsInput
): Promise<PrioritizeArtistsOutput> {
  try {
    const result = await prioritizeArtists(input);
    return result;
  } catch (error) {
    console.error("Error in getPrioritizedArtists server action:", error);
    throw new Error("Failed to prioritize artists due to a server error.");
  }
}
