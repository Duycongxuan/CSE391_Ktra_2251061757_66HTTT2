import { useState, useRef, useCallback } from "react";

export const useToast = () => {
  const [openToast, setOpenToast] = useState(false);
  const [typeToast, setTypeToast] = useState("");
  const toastTimerRef = useRef(null);

  const toastMessageMap = {
    add: "Thêm mới thành công",
    edit: "Cập nhật thành công",
    delete: "Xóa thành công",
  };

  const triggerToast = useCallback((type) => {
    setTypeToast(type);
    setOpenToast(true);

    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }

    toastTimerRef.current = setTimeout(() => {
      setOpenToast(false);
    }, 3000);
  }, []);

  const toastMessage = toastMessageMap[typeToast] || "";

  return {
    openToast,
    typeToast,
    toastMessage,
    triggerToast,
    setOpenToast,
  };
};
