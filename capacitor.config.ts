
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.e225bd5709c9411e8599d3085ad88888',
  appName: 'resident-link-app',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: "https://e225bd57-09c9-411e-8599-d3085ad88888.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  android: {
    allowMixedContent: true,
  }
};

export default config;
