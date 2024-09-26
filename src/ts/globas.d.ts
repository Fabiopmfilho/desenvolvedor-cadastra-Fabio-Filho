// src/globals.d.ts

// Condicional para evitar conflitos com o 'AbortSignal' do DOM
// Usamos o Node.js como base aqui.
declare module NodeJS {
  interface AbortSignal {
    // Defina os métodos e propriedades que você precisa
    aborted: boolean;
    addEventListener(type: string, listener: (...args: any[]) => void): void;
    removeEventListener(type: string, listener: (...args: any[]) => void): void;
  }
}

// Em seu código TypeScript, você pode fazer referência direta ao Node.js AbortSignal:
// import { AbortController } from 'node:events';
