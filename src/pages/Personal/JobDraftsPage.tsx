import React, { useState } from "react";
import Topbar from "../../shared/components/topbar/Topbar";

const JobDraftsPage = () => {
    const [selected, setSelected] = useState(0);

    return (
        <Topbar>
            <div className="w-full h-full flex flex-col">
                <div className="mt-[17px] flex flex-col items-center">
                    <p className="text-[20px] font-semibold text-[#747474]">
                        일자리 신청함
                    </p>
                </div>
                <div className="w-[301px] flex gap-[13px] mt-[16px] justify-center self-center">
                    <button
                        className={`
                            flex-1 h-[45px] border-[1.3px] rounded-[8px] text-[16px] font-medium
                            ${selected === 0
                                ? "bg-[#ECF6F2] border-[#08D485] text-black"
                                : "bg-white border-[#08D485] text-black"}
                        `}
                        onClick={() => setSelected(0)}
                    >
                        작성 전
                    </button>
                    <button
                        className={`
                            flex-1 h-[45px] border-[1.3px] rounded-[8px] text-[16px] font-medium
                            ${selected === 1
                                ? "bg-[#ECF6F2] border-[#08D485] text-black"
                                : "bg-white border-[#08D485] text-black"}
                        `}
                        onClick={() => setSelected(1)}
                    >
                        작성중
                    </button>
                </div>
                <div
                    className="flex-1 w-full flex justify-center"
                    style={{ minHeight: 0 }} // flex-1에서 스크롤 영역 정상 동작 위해 필요
                >
                    <div
                        className="w-[335px] flex flex-col overflow-y-auto mt-[16px]"
                        style={{ maxHeight: "380px" }} // 필요에 따라 maxHeight 조절
                    >
                        {/* 여기에 콘텐츠 넣기 (지금은 빈 div로) */}
                        <div className="h-[600px] bg-[#F8FBF9] rounded-[16px] border border-[#E0E0E0]" />
                    </div>
                </div>
                <div className="w-full flex justify-center mt-[16px] mb-[24px]">
                    {selected === 0 ? (
                        <button className="w-[294px] h-[45px] bg-[#08D485] text-black rounded-[8px] text-[16px] font-semibold">
                            신청서 작성하기
                        </button>
                    ) : (
                        <button className="w-[294px] h-[45px] bg-[#08D485] text-black rounded-[8px] text-[16px] font-semibold">
                            신청서 이어서 작성하기
                        </button>
                    )}
                </div>
            </div>
        </Topbar>
    );
};

export default JobDraftsPage;
