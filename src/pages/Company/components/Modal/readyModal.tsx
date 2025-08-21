import Modal from './Modal';

interface ReadyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReadyModal = ({ isOpen, onClose }: ReadyModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center justify-center text-center">
        {/* 경고 아이콘 */}
        <div className="mb-[2rem]">
          <img
            src="/icons/warning.svg"
            alt="경고 아이콘"
            width={62}
            height={62}
          />
        </div>

        {/* 메시지 */}
        <div className="text-[1.6rem] font-semibold text-[#747474] leading-[2.5rem]">
          <p>아직 준비 중인 기능입니다.</p>
        </div>
      </div>
    </Modal>
  );
};

export default ReadyModal;
