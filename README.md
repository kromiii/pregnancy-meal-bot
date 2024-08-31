# Pregnancy Meal Bot

This project is a LINE bot designed to assist pregnant women with meal planning and nutrition. It integrates with LINE messaging, Perplexity API, and OpenAI's GPT to provide automated responses and logging functionality.

## Setup

1. Create a new Google Apps Script project.
2. Copy the contents of each TypeScript file into separate `.ts` files in your project.
3. Set up the necessary script properties:
   - PERPLEXITY_APIKEY
   - LINE_ACCESS_TOKEN
4. Deploy the web app and set up the LINE webhook to point to your deployed app URL.

## Features

- Responds to LINE messages using Perplexity API
- Includes OpenAI GPT integration for potential future use

## File Structure

- `src/config.ts`: Configuration and environment variables
- `src/types.ts`: TypeScript type definitions
- `src/perplexity.ts`: Perplexity API integration
- `src/line.ts`: LINE messaging integration
- `src/main.ts`: Main entry point for the Apps Script web app
- `appsscript.json`: Apps Script manifest file

## Usage

The bot automatically responds to incoming LINE messages. It uses the Perplexity API to generate responses.
