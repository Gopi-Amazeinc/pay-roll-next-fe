import { Html, Head, Main, NextScript } from 'next/document';
// import {image} from '@/public/Images/digioffice_favicon.png'
export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <link
          rel="icon"
          href="/Images/digiofficefavicon.png"
          width= "auto" height= "auto"
        />
        </Head>
      <body >
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
