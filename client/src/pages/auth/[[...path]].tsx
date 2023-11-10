import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { EmailPasswordPreBuiltUI } from 'supertokens-auth-react/recipe/emailpassword/prebuiltui';
import { redirectToAuth } from 'supertokens-auth-react';
import { canHandleRoute, getRoutingComponent } from 'supertokens-auth-react/ui';

const SuperTokensComponentNoSSR = dynamic<{}>(
  new Promise((res) =>
    res(() => getRoutingComponent([EmailPasswordPreBuiltUI]))
  ),
  { ssr: false }
);

export default function Auth() {
  // if the user visits a page that is not handled by us (like /auth/random), then we redirect them back to the auth page.
  useEffect(() => {
    if (canHandleRoute([EmailPasswordPreBuiltUI]) === false) {
      redirectToAuth();
    }
  }, []);

  return <SuperTokensComponentNoSSR />;
}
