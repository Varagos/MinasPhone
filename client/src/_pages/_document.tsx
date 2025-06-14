import * as React from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentProps,
} from 'next/document';
import {
  DocumentHeadTags,
  createEmotionCache,
  documentGetInitialProps,
} from '@mui/material-nextjs/v14-pagesRouter';
import type { DocumentHeadTagsProps } from '@mui/material-nextjs/v14-pagesRouter';
import theme from '@/lib/theme';

export default function MyDocument(
  props: DocumentProps & DocumentHeadTagsProps
) {
  return (
    <Html lang={props.__NEXT_DATA__.props.pageProps?.initialLanguage || 'el'}>
      <Head>
        <DocumentHeadTags {...props} />
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

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const initialProps = await documentGetInitialProps(ctx, {
    emotionCache: createEmotionCache({
      enableCssLayer: true,
      key: 'css',
    }),
  });
  return initialProps;
};
