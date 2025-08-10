import Modal from './Modal';

interface BusinessNumberErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BusinessNumberErrorModal = ({
  isOpen,
  onClose,
}: BusinessNumberErrorModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center text-center pt-[1rem]">
        {/* 경고 아이콘 */}
        <div className="mb-[2rem]">
          <img
            src="/icons/mingcute_warning-fill.svg"
            alt="경고"
            width={62}
            height={62}
          />
        </div>

        {/* 메시지 */}
        <div className="text-[1.8rem] font-semibold text-[#333333] leading-[2.6rem]">
          <p>사업자 등록번호가 정확하지 않습니다.</p>
          <p>회원가입을 다시 시도해주세요</p>
        </div>
      </div>
    </Modal>
  );
};

export default BusinessNumberErrorModal;
