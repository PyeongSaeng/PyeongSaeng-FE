import { Routes, Route } from 'react-router-dom';
import JobRecommendationPage from '../pages/Personal/JobRecommendationPage';
import JobDetailPage from '../pages/Personal/JobDetailPage';
import HomePage from '../pages/Personal/HomePage';
// import QuestionDetail from '../pages/Personal/QuestionDetailPage';
// import ExtraQuestionsPage from '../pages/Personal/ExtraQuestionsPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* 메인메뉴 */}
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/join" element={<></>}></Route>
      <Route path="/join/senior" element={<></>}></Route>
      <Route path="/join/guardian" element={<></>}></Route>
      <Route path="/join/company" element={<></>}></Route>
      <Route path="/login" element={<></>}></Route>
      <Route path="/jobs/recommend" element={<JobRecommendationPage />}></Route>
      <Route path="/jobs/recommend/:id" element={<JobDetailPage />}></Route>
      <Route path="/jobs/recommend/:id/apply" element={<></>}></Route>
      <Route
        path="/jobs/recommend/:id/apply/additional"
        element={<></>}
      ></Route>

      {/* <Route
        path="/jobs/recommend/:id/apply/question/detail"
        element={<QuestionDetail />}
      ></Route> */}

      {/* 세부메뉴 */}
      <Route path="/jobs/saved" element={<></>}></Route>
      <Route path="/jobs/drafts" element={<></>}></Route>
      <Route path="/my/applied" element={<></>}></Route>
      <Route path="/my/applied/:id" element={<></>}></Route>
      <Route path="/my/applied/results" element={<></>}></Route>
      <Route path="/my/info" element={<></>}></Route>
      <Route path="/my/delete-account" element={<></>}></Route>

      <Route path="/my/seniors" element={<></>}></Route>
    </Routes>
  );
};

export default AppRoutes;
