#!/usr/bin/env node
/* eslint-disable no-console */

/**
 * Script to update Telegram channel subscriber counts
 *
 * Usage:
 *   node scripts/update-telegram-stats.js
 *
 * Or with custom values:
 *   CHANNEL=english_with_omarr SUBSCRIBERS=900 node scripts/update-telegram-stats.js
 */

const https = require('https');
const http = require('http');

// Configuration
const channels = [
  { name: 'english_with_omarr', subscribers: 897 },
  { name: 'Omar2007S', subscribers: 50 },
];

// Override with environment variables if provided
const customChannel = process.env.CHANNEL;
const customSubscribers = process.env.SUBSCRIBERS;

if (customChannel && customSubscribers) {
  channels.length = 0; // Clear array
  channels.push({
    name: customChannel,
    subscribers: parseInt(customSubscribers, 10),
  });
}

// Get API endpoint and key
const apiUrl = process.env.API_URL || 'http://localhost:3000';
const apiKey = process.env.ADMIN_API_KEY || 'your_secure_admin_api_key_here';

function updateChannel(channel) {
  return new Promise((resolve, reject) => {
    const url = new URL('/api/telegram-stats', apiUrl);
    const isHttps = url.protocol === 'https:';
    const client = isHttps ? https : http;

    const postData = JSON.stringify({
      channel: channel.name,
      subscribers: channel.subscribers,
    });

    const options = {
      hostname: url.hostname,
      port: url.port || (isHttps ? 443 : 80),
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'x-api-key': apiKey,
      },
    };

    const req = client.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log(
            `✓ Updated ${channel.name}: ${channel.subscribers} subscribers`
          );
          resolve(JSON.parse(data));
        } else {
          console.error(
            `✗ Failed to update ${channel.name}: ${res.statusCode}`
          );
          console.error(`  Response: ${data}`);
          reject(new Error(`HTTP ${res.statusCode}`));
        }
      });
    });

    req.on('error', (error) => {
      console.error(`✗ Error updating ${channel.name}:`, error.message);
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

async function updateAll() {
  console.log(`Updating Telegram stats for ${channels.length} channel(s)...\n`);

  for (const channel of channels) {
    try {
      await updateChannel(channel);
    } catch (error) {
      // Error already logged, continue with next channel
    }
  }

  console.log('\nDone!');
}

updateAll();
