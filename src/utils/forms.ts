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
