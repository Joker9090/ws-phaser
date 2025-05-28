//@ts-nocheck

import { Html, Head, Main, NextScript } from 'next/document'


export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
      
        <link rel="icon" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Cosmic Wonderar" />
        <meta name="keywords" content="arcade, game, retro, pixel art, javascript, phaser" />
        <meta name="author" content="Noswar" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#000000" />
        <link rel="prefetch" as="font" href="/fonts/arcadeFont.otf" type="font/otf" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <div style={{ fontFamily: 'Arcade' }} />
      </body>
    </Html>
  )
}
