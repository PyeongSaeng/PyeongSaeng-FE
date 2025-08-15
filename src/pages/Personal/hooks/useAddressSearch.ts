import { useEffect } from 'react';

interface AddressData {
  zonecode: string;
  roadAddress: string;
}

interface UseAddressSearchProps {
  onComplete: (data: AddressData) => void;
}

const useAddressSearch = ({ onComplete }: UseAddressSearchProps) => {
  // 주소 검색 스크립트 로드
  useEffect(() => {
    if (!window.daum?.Postcode) {
      const script = document.createElement('script');
      script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const openAddressSearch = () => {
    if (window.daum?.Postcode) {
      new window.daum.Postcode({
        oncomplete: function (data: any) {
          onComplete({
            zonecode: data.zonecode,
            roadAddress: data.roadAddress,
          });
        },
      }).open();
    } else {
      alert('주소 검색 스크립트가 로드되지 않았습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return { openAddressSearch };
};

export default useAddressSearch; 