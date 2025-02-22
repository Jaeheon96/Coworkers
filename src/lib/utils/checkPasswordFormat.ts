export default function checkPasswordFormat(password: string) {
  // const pattern = /^[!@#$%^&*a-zA-Z0-9-]+$/;
  const pattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]+$/;
  return pattern.test(password);
}
