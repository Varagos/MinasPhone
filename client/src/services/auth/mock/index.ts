import { IAuthProvider, UserData } from '..';

type MockDataType = {
  uid: string;
  name: string;
  email: string;
  photoURL?: string;
};

class MockAuthProvider implements IAuthProvider {
  private callback: any;
  private mockUserData = { uid: 'abc123', name: 'Test user', email: 'test@test.com', photoURL: 'https://randomuser.me/api/portraits/lego/6.jpg' };
  constructor() {
    console.log('MockAuthProvider created');
  }

  onAuthStateChanged(callback: (userData?: UserData) => any) {
// console.log('received authStateChanged subscription in mock', callback);
    this.callback = callback;
    const userDataString = localStorage.getItem('mockUserData');
    const userData = JSON.parse(userDataString || '{}');
// console.log('mockUserData from localStorage', userData);
    if (userDataString) setTimeout(() => callback(userData), 1000);
    else callback(undefined);
  }

  clearAuthentication() {
    localStorage.removeItem('mockUserData');
    this.callback(undefined);
// console.log('User signed out!');
  }

  signInWithGoogle() {
// console.log('Signing in with Google');
    const mapper = (data: MockDataType) => {
  // console.log('onAuthStateChanged', data);
      const userData: UserData = { id: data?.uid, displayName: data?.name, userUniqueId: data?.email, email: data?.email, photoURL: data?.photoURL };
      return userData;
      // data ? this.callback(userData) : this.callback(data);
    };
    const userData = mapper(this.mockUserData);
    localStorage.setItem('mockUserData', JSON.stringify(userData));
    setTimeout(() => this.callback(userData), 1000); // 
  }

  sendSignInLinkToEmail(email: string) {
// console.log('sendSignInLinkToEmail', email);
  }

  sendPhoneVerificationCode(phoneNumber: string): Promise<any> {
// console.log('sendPhoneVerificationCode', phoneNumber);
    return new Promise(() => '123456');
  }

  verifyPhoneCode(code: string) {
// console.log('verifyPhoneCode', code);
    return new Promise(() => true);
  }
}

export default MockAuthProvider;
