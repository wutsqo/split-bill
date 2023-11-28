import { Dispatch, SetStateAction, useState as useStateReact } from "react";

interface Option<T> {
  useState?: (initialState: T | (() => T)) => [T, Dispatch<SetStateAction<T>>];
}

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

export default function useFormState<T extends Object>(
  initialData: T,
  validators: {
    [K in keyof T]?: (value: T[K]) => string | undefined;
  } = {},
  { useState = useStateReact }: Option<T> = {}
) {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useStateReact<Record<keyof T, string>>(() => {
    return Object.keys(validators).reduce((acc, key) => {
      acc[key as keyof T] = "";
      return acc;
    }, {} as Record<keyof T, string>);
  });
  const [touched, setTouched] = useStateReact<Record<keyof T, boolean>>(() => {
    return Object.keys(validators).reduce((acc, key) => {
      acc[key as keyof T] = false;
      return acc;
    }, {} as Record<keyof T, boolean>);
  });

  const updateData = <K extends keyof T>(key: K, value: T[K]) => {
    if (validators[key]) {
      setErrors((prev) => ({ ...prev, [key]: validators[key]!(value) }));
    }
    setTouched((prev) => ({ ...prev, [key]: true }));
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const resetData = () => {
    setData(initialData);
  };

  const isValid =
    Object.values(errors).every((error) => !error) &&
    Object.values(touched).every((touched) => touched);

  return {
    data,
    errors,
    updateData,
    resetData,
    isValid,
  };
}
