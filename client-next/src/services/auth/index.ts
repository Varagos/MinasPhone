import axios from 'axios';
// import Session from 'supertokens-auth-react/recipe/session';

// const axiosInstance = axios.create({
//   /*...*/
// });
// Session.addAxiosInterceptors(axiosInstance);

// async function callAPI() {
//   // use axios as you normally do
//   const response = await axiosInstance.get('https://yourapi.com');
// }

// import FirebaseAuthProvider from './firebase';
// import MockAuthProvider from './mock';

export type UserData = {
  id: string;
  displayName?: string;
  email?: string;
  phoneNumber?: string;
  userUniqueId: string; // email or phone number
  photoURL?: string;
};

export interface IAuthProvider {
  clearAuthentication: () => void;
  onAuthStateChanged: (callback: (user?: UserData) => void) => any;
  sendSignInLinkToEmail: (email: string) => void;
  signInWithGoogle: () => void;
  sendPhoneVerificationCode: (phoneNumber: string) => Promise<any>;
  verifyPhoneCode: (code: string) => Promise<any>;
}

export interface IMockAuthProvider extends IAuthProvider {
  fakeOnAuthStateChanged: (user: UserData) => void;
}
