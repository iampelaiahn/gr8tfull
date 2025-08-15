'use server';

/**
 * @fileOverview AI-powered tool that suggests which producers to feature more prominently in the carousel based on current music trends.
 *
 * - prioritizeArtists - A function that handles the artist prioritization process.
 * - PrioritizeArtistsInput - The input type for the prioritizeArtists function.
 * - PrioritizeArtistsOutput - The return type for the prioritizeArtists function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PrioritizeArtistsInputSchema = z.object({
  artists: z
    .array(z.string())
    .describe('An array of artist names currently in the carousel.'),
  currentMusicTrends: z
    .string()
    .describe('A description of current music trends.'),
});
export type PrioritizeArtistsInput = z.infer<typeof PrioritizeArtistsInputSchema>;

const PrioritizeArtistsOutputSchema = z.object({
  prioritizedArtists: z
    .array(z.string())
    .describe(
      'An array of artist names, prioritized based on current music trends.'
    ),
  reasoning: z
    .string()
    .describe(
      'The reasoning behind the prioritization, explaining why each artist was chosen.'
    ),
});
export type PrioritizeArtistsOutput = z.infer<typeof PrioritizeArtistsOutputSchema>;

export async function prioritizeArtists(input: PrioritizeArtistsInput): Promise<PrioritizeArtistsOutput> {
  return prioritizeArtistsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'prioritizeArtistsPrompt',
  input: {schema: PrioritizeArtistsInputSchema},
  output: {schema: PrioritizeArtistsOutputSchema},
  prompt: `You are an AI assistant helping to curate a music artist carousel for a website called gr8tful.

  Given the following list of artists currently in the carousel:
  {{#each artists}}
  - {{{this}}}
  {{/each}}

  And given the following description of current music trends:
  {{{currentMusicTrends}}}

  Please provide a prioritized list of artists to feature more prominently in the carousel, and explain your reasoning for each choice.
  The output must be valid JSON conforming to the PrioritizeArtistsOutputSchema schema.`, // Ensure schema is respected
});

const prioritizeArtistsFlow = ai.defineFlow(
  {
    name: 'prioritizeArtistsFlow',
    inputSchema: PrioritizeArtistsInputSchema,
    outputSchema: PrioritizeArtistsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
