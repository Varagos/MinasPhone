import { getUsersNewestFirst } from 'supertokens-node';
import { IAuthProvider } from '../authProvider.js';

export class SuperTokens implements IAuthProvider {
  async getUsers() {
    // get the latest 100 users
    let usersResponse = await getUsersNewestFirst();

    let users = usersResponse.users;
    return users;
    let nextPaginationToken = usersResponse.nextPaginationToken;

    // get the next 200 users
    usersResponse = await getUsersNewestFirst({
      limit: 200,
      paginationToken: nextPaginationToken,
    });

    users = usersResponse.users;
    nextPaginationToken = usersResponse.nextPaginationToken;

    // get for specific recipes
    usersResponse = await getUsersNewestFirst({
      limit: 200,
      paginationToken: nextPaginationToken,
      // only get for those users who signed up with EmailPassword
      includeRecipeIds: ['emailpassword'],
    });

    users = usersResponse.users;
    nextPaginationToken = usersResponse.nextPaginationToken;
  }
}
