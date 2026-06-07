# Weather App

A React + Tailwind weather dashboard that integrates with Open-Meteo APIs for real-time weather lookup.

## Features

- City search with live API integration
- Loading, error, and success UI states
- Invalid city and network failure handling
- Clear feedback for unexpected data formats
- Search history with localStorage persistence
- Light/dark theme toggle and weather icon status indicators
- Hourly temperature forecast chart for the next 12 hours
- Hourly humidity forecast chart for the next 12 hours

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the app:
   ```sh
   npm run dev
   ```

## Notes

This app uses the Open-Meteo geocoding and weather APIs so no API key is required.
