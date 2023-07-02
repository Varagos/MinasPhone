import Session from 'supertokens-web-js/recipe/session';
import { UserRoleClaim /*PermissionClaim*/ } from 'supertokens-web-js/recipe/userroles';

async function doesSessionExist(): Promise<boolean> {
  if (await Session.doesSessionExist()) {
    console.log('user is logged in');
    return true;
  }
  console.log('user is not logged in');
  return false;
}

export async function shouldLoadRoute(): Promise<boolean> {
  const sessionExists = await doesSessionExist();
  if (!sessionExists) {
    // no session exists, so we do not allow access to this page.
    return false;
  }
  let validationErrors = await Session.validateClaims({
    overrideGlobalClaimValidators: (globalValidators) => [
      ...globalValidators,
      UserRoleClaim.validators.includes('admin'),
      /* PermissionClaim.validators.includes("modify") */
    ],
  });
  console.log({ validationErrors });

  if (validationErrors.length === 0) {
    // user is an admin
    return true;
  }

  for (const err of validationErrors) {
    if (err.validatorId === UserRoleClaim.id) {
      // user roles claim check failed
    } else {
      // some other claim check failed (from the global validators list)
    }
  }
  return false;
}
