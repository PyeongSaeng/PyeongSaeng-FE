import spinner from '../assets/spinner.gif';

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <img
        className="w-[50px] h-[50px] transform translate-y-[-80px]"
        src={spinner}
        alt="로딩 중..."
      />
    </div>
  );
};

export default Loading;
