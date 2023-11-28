import { isRunningInBrowser } from "@/utils/common";
import { Dispatch, SetStateAction, useState, useRef, useEffect } from "react";

export function useLocalStorageState<T = string>(
  key: string,
  defaultValue: T | (() => T)
): [T, Dispatch<SetStateAction<T>>] {
  const [initialized, setInitialized] = useState(false);
  const [state, setState] = useState(defaultValue);
  const prevKeyRef = useRef(key);

  const setValueFromLocalStorage = () => {
    if (!isRunningInBrowser()) return;

    const valueInLocalStorage = window.localStorage.getItem(key);
    if (valueInLocalStorage) {
      const deserializedValue = JSON.parse(valueInLocalStorage);
      setState(deserializedValue);
    }
  };

  const setLocalStorageState = (nextState: T | ((prevState: T) => T)) => {
    if (!initialized) {
      setValueFromLocalStorage();
    } else {
      setState((prevState) => {
        const newState =
          nextState instanceof Function ? nextState(prevState) : nextState;

        const serializedNewState = JSON.stringify(newState);
        window.localStorage.setItem(key, serializedNewState);
        return newState;
      });
    }
  };

  useEffect(() => {
    setValueFromLocalStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized]);

  useEffect(() => {
    if (!isRunningInBrowser()) return;
    if (!initialized) {
      setInitialized(true);
      return;
    }
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    window.localStorage.setItem(key, JSON.stringify(state));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [state, setLocalStorageState];
}
