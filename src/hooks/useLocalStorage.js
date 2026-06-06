import { useState, useEffect } from "react";

export const useLocalStorage = (key, initialValue) => {
  // --- STATE: Lưu giá trị từ localStorage hoặc initialValue ---
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // --- EFFECT: Lưu dữ liệu vào localStorage khi storedValue thay đổi ---
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);
  return [storedValue, setStoredValue];
};
