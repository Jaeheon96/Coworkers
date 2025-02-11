export default function checkPasswordFormat(password: string) {
  const pattern = /^[!@#$%^&*a-zA-Z0-9-]+$/;
  return pattern.test(password);
}
