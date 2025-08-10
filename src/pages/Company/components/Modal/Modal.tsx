import { ReactNode } from 'react';
import { IoClose } from 'react-icons/io5';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* 모달 컨텐츠 */}
      <div className="relative bg-white rounded-[0.8rem] p-[2.4rem] max-w-[32rem] w-[90%] mx-4">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-[1.6rem] right-[1.6rem] text-gray-500 hover:text-gray-700"
        >
          <IoClose size={24} />
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
