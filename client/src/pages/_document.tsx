import * as React from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import {
  DocumentHeadTags,
  documentGetInitialProps,
} from '@mui/material-nextjs/v15-pagesRouter';
import type { DocumentHeadTagsProps } from '@mui/material-nextjs/v15-pagesRouter';
import theme from '@/lib/theme';

export default class MyDocument extends Document<DocumentHeadTagsProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const finalProps = await documentGetInitialProps(ctx);
    return finalProps;
  }

  render() {
    return (
      <Html lang={this.props.__NEXT_DATA__.props.pageProps.initialLanguage}>
        <Head>
          <DocumentHeadTags {...this.props} />
          {/* Not exactly required, but good for perf */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          {/* Google Fonts - Noto Sans with Greek subset support */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600;700&display=swap&subset=greek"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
