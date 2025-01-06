import { validateField, validateForm, hasErrors, validateEmail, ERROR_MESSAGE } from './validationUtils';

describe('Validation Utils', () => {
  describe('validateField', () => {
    it('should return error message if field is empty', () => {
      expect(validateField('name', '')).toBe(ERROR_MESSAGE);
    });

    it('should return empty string if field is not empty', () => {
      expect(validateField('name', 'John Doe')).toBe('');
    });
  });

  describe('validateForm', () => {
    it('should return errors for empty fields', () => {
      const formData = { name: '', email: '' };
      const expectedErrors = { name: ERROR_MESSAGE, email: ERROR_MESSAGE };
      expect(validateForm(formData)).toEqual(expectedErrors);
    });

    it('should return no errors for filled fields', () => {
      const formData = { name: 'John Doe', email: 'john.doe@example.com' };
      const expectedErrors = { name: '', email: '' };
      expect(validateForm(formData)).toEqual(expectedErrors);
    });
  });

  describe('hasErrors', () => {
    it('should return true if there are errors', () => {
      const errors = { name: ERROR_MESSAGE, email: '' };
      expect(hasErrors(errors)).toBe(true);
    });

    it('should return false if there are no errors', () => {
      const errors = { name: '', email: '' };
      expect(hasErrors(errors)).toBe(false);
    });
  });

  describe('validateEmail', () => {
    it('should return true for valid email', () => {
      expect(validateEmail('john.doe@example.com')).toBeTruthy();
    });

    it('should return false for invalid email', () => {
      expect(validateEmail('john.doe@com')).toBeFalsy();
    });
  });
});