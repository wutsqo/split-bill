import { useState } from "react";

export default function useFormState<T extends Object>(
  initialData: T,
  validators: {
    [K in keyof T]?: (value: T[K]) => string | undefined;
  } = {}
) {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState<Record<keyof T, string>>(() => {
    return Object.keys(validators).reduce((acc, key) => {
      acc[key as keyof T] = "";
      return acc;
    }, {} as Record<keyof T, string>);
  });
  const [touched, setTouched] = useState<Record<keyof T, boolean>>(() => {
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
    setTouched((prev) => {
      return Object.keys(prev).reduce((acc, key) => {
        acc[key as keyof T] = false;
        return acc;
      }, {} as Record<keyof T, boolean>);
    });
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
