// TODO: simplify regex.
/*
 * deprecated.
 */
export const validateEmail = (email: string): boolean => {
  const re =
    /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z-]+\.)+[A-Za-z]{2,}))$/;
  return re.test(email.toLowerCase());
};
