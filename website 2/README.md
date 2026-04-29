
# workoutapp

This is a code bundle for workoutapp. The original project is available at https://www.figma.com/design/QvDKeZKPoV3ylHNW4w9kI1/workoutapp.

## Project Structure

- `client/`: canonical Vite + React + TypeScript frontend
- `server/`: Express + TypeScript + SQLite backend
- `src/`: legacy leftover path and not part of the active frontend anymore
- `my-app/`: unrelated older scaffold and not part of the active client/server app

## Running the code

Install dependencies in the root, client, and server packages:

- `npm install`
- `npm --prefix client install`
- `npm --prefix server install`

Run both client and server together:

- `npm run dev`

Or run them separately:

- `npm run dev:client`
- `npm run dev:server`

The frontend expects the API at `http://localhost:4000/api` by default. Override this with `VITE_API_BASE_URL` in the client if needed.
  
