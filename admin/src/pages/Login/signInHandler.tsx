import { signIn } from 'supertokens-web-js/recipe/emailpassword';

export enum SignInStatus {
  OK,
  FIELD_ERROR,
  WRONG_CREDENTIALS_ERROR,
}
type SignInResponse = {
  status: SignInStatus;
  error?: string;
};
async function signInClicked(email: string, password: string): Promise<SignInResponse> {
  try {
    let response = await signIn({
      formFields: [
        {
          id: 'email',
          value: email,
        },
        {
          id: 'password',
          value: password,
        },
      ],
    });

    if (response.status === 'FIELD_ERROR') {
      let errorMessage: string | undefined;
      for (const formField of response.formFields) {
        if (formField.id === 'email') {
          // Email validation failed (for example incorrect email syntax).
          window.alert(formField.error);
          errorMessage = formField.error;
        }
      }
      return {
        status: SignInStatus.WRONG_CREDENTIALS_ERROR,
        error: errorMessage,
      };
    } else if (response.status === 'WRONG_CREDENTIALS_ERROR') {
      //   window.alert('Email password combination is incorrect.');
      return {
        status: SignInStatus.WRONG_CREDENTIALS_ERROR,
        error: 'Email password combination is incorrect.',
      };
    } else {
      // sign in successful. The session tokens are automatically handled by
      // the frontend SDK.
      //   window.location.href = '/homepage';
      return {
        status: SignInStatus.OK,
      };
    }
  } catch (err: any) {
    console.error(err);
    let message: string;
    if (err.isSuperTokensGeneralError === true) {
      // this may be a custom error message sent from the API by you.
      message = err.message;
      window.alert(err.message);
    } else {
      message = 'Oops! Something went wrong.';
      window.alert('Oops! Something went wrong.');
    }

    return {
      status: SignInStatus.WRONG_CREDENTIALS_ERROR,
      error: message,
    };
  }
}

export default signInClicked;
