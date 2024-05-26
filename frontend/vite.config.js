import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { resolve } from 'path';
import dotenv from 'dotenv';
import fs from 'fs';

const envPathPrimary = resolve(__dirname, '../.env'); // if dev
const envPathSecondary = resolve(__dirname, '../.env'); // if docker

const envPath = fs.existsSync(envPathPrimary) ? envPathPrimary : envPathSecondary;

console.log("using .env path:", envPath);
fs.writeFileSync('./vite-env-path.log', `Using .env path: ${envPath}\n`, { flag: 'a' });
// Load the environment variables from the selected .env file
dotenv.config({ path: envPath });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env,
  },
})
