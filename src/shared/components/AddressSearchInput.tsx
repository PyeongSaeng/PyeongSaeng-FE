interface Props {
  address: string;
  detailAddress: string;
  onChangeAddress: (address: string) => void;
  onChangeZipcode: (zipcode: string) => void;
  onChangeDetail: (detail: string) => void;
  onChangeRoadAddress?: (roadAddress: string) => void;
}

export default function AddressSearchInput({
  address,
  detailAddress,
  onChangeAddress,
  onChangeZipcode,
  onChangeDetail,
  onChangeRoadAddress,
}: Props) {
  const handleSearch = () => {
    // @ts-ignore
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        onChangeZipcode(data.zonecode);
        onChangeAddress(data.roadAddress || data.jibunAddress);
        onChangeRoadAddress?.(data.roadAddress);
      },
    }).open();
  };

  return (
    <div className="flex flex-col gap-[10px] items-center justify-center">
      <div className="flex gap-[7px]">
        <input
          type="text"
          placeholder="주소를 입력하세요"
          value={address}
          readOnly
          className="w-[141px] h-[45px] border border-[#E1E1E1] rounded-[8px] text-[16px] text-center text-[#000000] placeholder:text-[#c2c2c2] font-medium"
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
        value={detailAddress}
        onChange={(e) => onChangeDetail(e.target.value)}
        className="w-[231px] h-[45px] border border-[#E1E1E1] rounded-[8px] text-[16px] text-center text-[#000000] placeholder:text-[#c2c2c2]"
      />
    </div>
  );
}
