export const ERROR_MESSAGE = 'Field is required';

export const validateField = (name: string, value: string) => {
  if (!value.trim()) {
    return ERROR_MESSAGE;
  }
  return '';
};

export const validateForm = <T extends { [key: string]: any }>(formData: T): { [K in keyof T]: string } => {
  const errors = {} as { [K in keyof T]: string };
  Object.keys(formData).forEach((key) => {
    errors[key as keyof T] = validateField(key, formData[key]);
  });
  return errors;
};

export const hasErrors = (errors: { [key: string]: string }) => {
  return Object.values(errors).some((error) => error !== '');
};

export const validateEmail = (email: string) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };