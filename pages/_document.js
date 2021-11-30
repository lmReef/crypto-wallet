// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, { Html } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <Html>
            {initialProps.styles}
            {sheet.getStyleElement()}
            <title>Crypto Watcher</title>
            <meta name="description" content="Reef's portfolio site" />
            <link rel="icon" href="/favicon.ico" />
            <link
              rel="preload"
              href="https://fonts.googleapis.com/css?family=Poppins&display=optional"
            />
          </Html>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
