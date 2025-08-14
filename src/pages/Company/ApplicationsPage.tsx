import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import Topbar from '../../shared/components/topbar/Topbar';
import PageHeader from '../../shared/components/PageHeader';
import { getMyJobPosts } from './apis/applications';

type PostItem = { id: number; title: string };

export default function ApplicationsPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);

        console.log(' GET /job/companies/me/posts?page=1&state=RECRUITING');
        const res = await getMyJobPosts({ page: 1, state: 'RECRUITING' });
        console.log('응답:', res);

        setPosts(res.jobPostList.map((p) => ({ id: p.id, title: p.title })));
      } catch (e: any) {
        console.error('공고 목록 로드 실패', e?.response ?? e);
        setError(e?.message || '목록을 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="h-[740px] flex flex-col bg-white font-pretendard">
      <Topbar />
      <div className="flex justify-center overflow-y-auto flex-1 pb-6">
        <div className="w-full max-w-[320px] flex flex-col items-center justify-start bg-white px-4 py-10">
          <PageHeader title="받은 신청서" />

          {loading && (
            <p className="text-[20px] text-gray-500 text-sm">
              데이터를 불러오는 중...
            </p>
          )}

          {error && <p className="text-red-500 text-sm">❌ {error}</p>}

          {!loading && !error && (
            <ul className="w-full space-y-6">
              {posts.map((post) => (
                <li
                  key={post.id}
                  className="w-full cursor-pointer"
                  onClick={() =>
                    navigate(`/company/jobs/applications/${post.id}`)
                  }
                >
                  <div className="flex items-center">
                    <span className="text-[16px] text-black font-normal">
                      {post.title}
                    </span>
                    <FiChevronRight className="text-[20px] text-black ml-[12px]" />
                  </div>
                </li>
              ))}
              {posts.length === 0 && (
                <li className="text-[20px] text-sm text-gray-400">
                  모집 중 공고가 없습니다.
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
