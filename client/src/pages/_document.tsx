// import DocumentHead from '@/components/DocumentHead';
// import Document, {
//   DocumentContext,
//   Html,
//   Head,
//   Main,
//   NextScript,
// } from 'next/document';

// const MyDocument = () => {
//   return (
//     <Html lang="en">
//       <Head>
//         {/* add any custom meta tags, stylesheets, or scripts here */}
//         <DocumentHead />
//       </Head>
//       <body>
//         <Main />
//         <NextScript />
//       </body>
//     </Html>
//   );
// };

// /**
//  * since We are using Material-UI (MUI) and we might be concerned about server-side rendering (SSR) and ensuring that styles are correctly hydrated,
//  *  it's a good idea to implement server-side style handling for MUI.
//  */
// MyDocument.getInitialProps = async (ctx: DocumentContext) => {
//   const initialProps = await Document.getInitialProps(ctx);
//   return { ...initialProps };
// };

// export default MyDocument;

import * as React from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import { ServerStyleSheets } from '@mui/styles';
import theme from '@/lib/theme';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: [
        ...React.Children.toArray(initialProps.styles),
        sheets.getStyleElement(),
      ],
    };
  }

  render() {
    return (
      <Html lang={this.props.__NEXT_DATA__.props.pageProps.initialLanguage}>
        <Head>
          {/* Not exactly required, but good for perf */}
          <meta name="theme-color" content={theme.palette.primary.main} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
