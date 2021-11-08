import { config } from "dotenv";

try {
  const result = config();
  if(result && result.parsed) {
    Object.keys(result.parsed).forEach(key => {
      process.env[key] = result.parsed[key];
    });
  }
} catch(e) {
  console.info('.env file not found, skipping..');
}


import App from './server';
const PORT = process.env.APP_PORT || 3001
new App(PORT).listen();
