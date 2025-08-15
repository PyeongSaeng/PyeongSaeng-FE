import { useEffect } from 'react';

const useClickOutside = (
  refs: React.RefObject<HTMLElement | null>[],
  callback: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      // 모든 ref가 외부 클릭인지 확인
      const isOutside = refs.every(ref => 
        !ref.current || !ref.current.contains(event.target as Node)
      );
      
      if (isOutside) {
        callback();
      }
    };

    // 마우스와 터치 이벤트 모두 등록
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [refs, callback]);
};

export default useClickOutside; 