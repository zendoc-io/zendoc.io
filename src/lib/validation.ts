const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function checkEmailRegEx(email: string): boolean {
  const regEx = emailRegEx.test(email);
  if (regEx) {
    return true;
  }
  return false;
}
