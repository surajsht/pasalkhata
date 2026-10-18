import { useEffect } from "react";
import useProductStore from "../store/useProductStore";

const useDebounce = (value: string, delay: number) => {
  const debouncedValue = useProductStore((state) => state.debouncedValue);
  const setDebouncedValue = useProductStore((state) => state.setDebouncedValue);

  useEffect(() => {
    let timer;

    timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value]);

  return debouncedValue;
};

export default useDebounce;
