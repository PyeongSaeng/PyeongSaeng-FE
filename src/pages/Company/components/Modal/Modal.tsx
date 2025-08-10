import { ReactNode, useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // 약간의 지연을 두어 애니메이션이 보이도록
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 - 반투명 검은색 + 애니메이션 */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ease-out ${
          isVisible ? 'opacity-80' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* 모달 컨텐츠  */}
      <div
        className={`relative bg-white rounded-[1.3rem] p-[3.5rem] max-w-[31rem] w-[90%] mx-[3.6rem] transform transition-all duration-300 ease-out ${
          isVisible
            ? 'scale-100 translate-y-0 opacity-100'
            : 'scale-95 -translate-y-2 opacity-0'
        }`}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-[1.6rem] right-[1.6rem] text-black hover:text-gray-700 z-10 transition-colors duration-200"
        >
          <IoClose size={24} />
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
