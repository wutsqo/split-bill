type Validate<T, K> = (value: T, data?: K) => string;

export function validate(
  validators: Array<Validate<any, any>>
): Validate<any, any> {
  return (value, data) => {
    for (const validator of validators) {
      const error = validator(value, data);
      if (error) return error;
    }
    return "";
  };
}

export function required(value: any) {
  if (value === "" || value === null) return "This field is required";
  return "";
}

export function isNumber(value: any) {
  if (isNaN(value)) return "This field must be a number";
  return "";
}

export function isEmail(value: any) {
  if (typeof value !== "string" || value.length === 0) {
    return "email is not valid";
  }
  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;

  if (!emailRegex.test(value)) {
    return "email is not valid";
  }

  return "";
}

export function isGreaterThan(data: any) {
  return (value: any) => {
    if (value <= data) return "This field must be greater than " + data;
    return "";
  };
}
