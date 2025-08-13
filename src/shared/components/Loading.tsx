import spinner from '../assets/spinner.gif';

// const Loading = () => {
//   return (
//     <div className="flex justify-center items-center h-screen">
//       <img className={'w-[50px] h-[50px]'} src={spinner} alt="로딩 중..." />
//     </div>
//   );
// };

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-[100dvh] flex justify-center items-center">
      <img className="w-[50px] h-[50px]" src={spinner} alt="로딩 중..." />
    </div>
  );
};
export default Loading;
