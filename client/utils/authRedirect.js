/**
 * authRedirect()
 * Utility function to either redirect users to the login
 * or signup page depending on what they're trying to do
 */

export const authRedirect = redirectPathname => {
  const signupPaths = ['/create/job'];

  return signupPaths.includes(redirectPathname)
    ? `/signup?next=${redirectPathname}`
    : `/signin?next=${redirectPathname}`;
};

export default authRedirect;
