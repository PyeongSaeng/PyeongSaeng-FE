import { useState } from "react";

export default function AddressSearchInput() {
  const [address, setAddress] = useState(""); // 주소
  const [zipcode, setZipcode] = useState(""); // 우편번호
  const [detail, setDetail] = useState("");   // 상세주소


  const handleSearch = () => {
    // @ts-ignore (카카오 전역 객체 타입 무시)
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        setZipcode(data.zonecode);
        setAddress(data.roadAddress || data.jibunAddress);
      },
    }).open();
  };

  return (
    <div className="flex flex-col gap-[10px] items-center justify-center">
      <div className="flex gap-[7px]">
        <input
          type="text"
          placeholder="주소를 입력하세요"
          className="w-[141px] h-[45px] border border-[#E1E1E1] rounded-[8px] text-[16px] text-center text-[#000000] placeholder:text-[#c2c2c2] font-medium"
          value={address}
          readOnly
        />
        <button
          className="w-[83px] h-[45px] bg-[#0D29B7] text-white rounded-[8px] text-[14px] font-medium"
          type="button"
          onClick={handleSearch}
        >
          주소 검색
        </button>
      </div>
      <input
        type="text"
        placeholder="상세 주소를 입력하세요"
        className="w-[231px] h-[45px] border border-[#E1E1E1] rounded-[8px] text-[16px] text-center text-[#000000] placeholder:text-[#c2c2c2]"
        value={detail}
        onChange={e => setDetail(e.target.value)}
      />
    </div>
  );
}
