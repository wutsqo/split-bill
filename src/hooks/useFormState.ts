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
      acc[key as keyof T] =
        validators[key as keyof T]!(initialData[key as keyof T]) ?? "";
      return acc;
    }, {} as Record<keyof T, string>);
  });

  const updateData = <K extends keyof T>(key: K, value: T[K]) => {
    if (validators[key]) {
      setErrors((prev) => ({ ...prev, [key]: validators[key]!(value) }));
    }

    setData((prev) => ({ ...prev, [key]: value }));
  };

  const resetData = () => {
    setData(initialData);
    setErrors(
      Object.keys(validators).reduce((acc, key) => {
        acc[key as keyof T] =
          validators[key as keyof T]!(initialData[key as keyof T]) ?? "";
        return acc;
      }, {} as Record<keyof T, string>)
    );
  };

  const isValid = Object.values(errors).every((error) => error === "");

  return {
    data,
    errors,
    updateData,
    resetData,
    isValid,
  };
}
