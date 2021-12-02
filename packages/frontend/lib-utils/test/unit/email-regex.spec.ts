import { validateEmail } from '$/email-regex';

test('validateEmail', () => {
  expect(validateEmail('asd@gmail.com')).toBeTruthy();

  expect(validateEmail('asdasd')).toBeFalsy();
});
