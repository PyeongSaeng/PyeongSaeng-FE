/// <reference types="vite/client" />

declare global {
  interface Window {
    daum?: {
      Postcode: any;
    };
  }
}

export {};
