import { AuthProvider } from 'react-admin';
import { shouldLoadRoute } from './pages/Login/AdminRoute';
import signInClicked, { SignInStatus } from './pages/Login/signInHandler';
import { logout } from './pages/Login/signOutHandler';

const authProvider: AuthProvider = {
  // called when the user attempts to log in
  login: async ({ username, password }) => {
    const loginResult = await signInClicked(username, password);
    if (loginResult.status !== SignInStatus.OK) {
      return Promise.reject(loginResult.error);
    }
    console.log({ loginResult });
    const isAdmin = await shouldLoadRoute();
    if (!isAdmin) {
      // TODO log who tried to login
      return Promise.reject('Forbidden');
    }
    localStorage.setItem('username', username);
    // accept all username/password combinations
    return Promise.resolve();
  },
  // called when the user clicks on the logout button
  logout: async () => {
    await logout();

    localStorage.removeItem('username');
    return Promise.resolve();
  },
  // called when the API returns an error
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem('username');
      return Promise.reject();
    }
    return Promise.resolve();
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => {
    return localStorage.getItem('username') ? Promise.resolve() : Promise.reject();
  },
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: async () => {
    const shouldLoad = await shouldLoadRoute();
    // const role = localStorage.getItem('permissions');
    // return role ? Promise.resolve(role) : Promise.reject();
    return Promise.resolve(shouldLoad);
    // return shouldLoad ? Promise.resolve(true) : Promise.reject(false);
  },
};
export default authProvider;
