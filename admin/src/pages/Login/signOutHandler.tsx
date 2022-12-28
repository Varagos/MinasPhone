import Session from 'supertokens-web-js/recipe/session';

export async function logout() {
  await Session.signOut();
}
