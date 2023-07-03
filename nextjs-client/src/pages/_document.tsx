import DocumentHead from '@/components/DocumentHead';
import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';

const MyDocument = () => {
  return (
    <Html lang="en">
      <Head>
        {/* add any custom meta tags, stylesheets, or scripts here */}
        <DocumentHead />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const initialProps = await Document.getInitialProps(ctx);
  return { ...initialProps };
};

export default MyDocument;
