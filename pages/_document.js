import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <link
          rel="icon"
          href="/Images/digioffice_favicon.png"
          width= "auto" height= "auto"
        />
        </Head>
      <body style={{ backgroundColor: '#ffffff' }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
