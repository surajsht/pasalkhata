import { useRef, useState, useEffect } from "react"

const useOutsideClick = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
      if (!isOpen) return;
  
      const handleBodyClick = (e: MouseEvent) => {
        const targetElement = e.target as Node;
  
        if (
          ref.current &&
          !ref.current?.contains(targetElement)
        ) {
          setIsOpen(false);
        }
      };
  
      document.body.addEventListener("click", handleBodyClick);
  
      return () => document.body.removeEventListener("click", handleBodyClick);
    }, [isOpen]);

  return {isOpen, setIsOpen, ref}
}

export default useOutsideClick