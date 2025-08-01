import { useNavigate } from 'react-router-dom';

const QuestionButton = () => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className=" bg-[#08D485] rounded-[8px] w-[75px] h-[33px] px-[9px] py-[6px] text-[15px]"
      onClick={() => navigate('/personal/my/info/extra')}
    >
      질문답변
    </button>
  );
};

export default QuestionButton;
