import { ReactNode } from 'react';
import { IoClose } from 'react-icons/io5';

interface ModalProps {
  children: ReactNode;
  setModal: (state: boolean) => void;
}

const Modal = ({ children, setModal }: ModalProps) => {
  return (
    <div className="w-[310px] h-[187px] rounded-[10px] bg-white absolute p-[10px] z-30">
      <div className="w-full flex justify-end">
        <button type="button" onClick={() => setModal(false)}>
          <IoClose size={24} />
        </button>
      </div>
      <div className="w-[full] h-[full] flex flex-col justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default Modal;
