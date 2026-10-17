import { useEffect } from "react";

type BodyScrollProp = {
  isOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const useBodyScrollLock = ({ isOpen, setIsModalOpen }: BodyScrollProp) => {
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    const handleWindowResize = () => {
      if (window.innerWidth >= 768) {
        document.body.style.overflow = previousOverflow;
        setIsModalOpen(false);
      }
    };

    window.addEventListener("resize", handleWindowResize);
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [isOpen]);
};

export default useBodyScrollLock;
