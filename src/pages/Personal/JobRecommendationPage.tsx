import { useState } from 'react';

const dummyJobs = [
    {
        id: 1,
        name: '죽전2동 행정복지센터 미화원',
        image: '/icons/search_line.png',
    },
    {
        id: 2,
        name: '죽전2동 행정복지센터 미화원',
        image: '/icons/search_line.png',
    },
    {
        id: 3,
        name: '죽전2동 행정복지센터 미화원',
        image: '/icons/search_line.png',
    },
    {
        id: 4,
        name: '죽전2동 행정복지센터 미화원',
        image: '/icons/search_line.png',
    },
];

const JobRecommendationPage = () => {
    const [search, setSearch] = useState('');

    return (
        <div className="relative w-full h-full overflow-y-scroll bg-white">
            <div className="sticky top-0 left-0 w-full flex justify-center bg-white">
                <div className="mt-[181px] relative w-[293px] h-[48px]">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="필요한 일자리를 찾아보세요"
                        className="w-full h-full pl-[20px] pr-[40px] py-[12px] rounded-[23px] border-[3px] border-[#00CB89] bg-white text-[16px] focus:outline-none"
                    />
                    <img
                        src="/icons/search_line.png"
                        alt="search"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-[23px] h-[23px]"
                    />
                </div>
            </div>

            <div className="mt-[43px] pb-10">
                <div className="ml-[37px]">
                    <p className="text-[20px] font-semibold text-[#747474]">
                        맞춤 일자리 추천
                    </p>
                    <p className="mt-[4px] text-[12px] font-normal text-[#747474]">
                        입력하신 정보를 바탕으로 일자리를 추천해드려요
                    </p>
                </div>
                <div className="ml-[35px]">
                    <div className="mt-[24px] flex flex-col gap-[36px]">
                        {dummyJobs.map((job) => (
                            <div key={job.id}>
                                <p className="text-[14px] font-normal text-black mb-2">{job.name}</p>
                                <img
                                    src={job.image}
                                    alt={job.name}
                                    className="w-[293px] h-auto rounded-[8px] border border-gray-200"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobRecommendationPage;
