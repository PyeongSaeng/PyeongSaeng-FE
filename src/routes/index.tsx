import { Routes, Route } from 'react-router-dom';
import JobRecommendationPage from '../pages/Personal/JobRecommendationPage';
import JobDetailPage from '../pages/Personal/JobDetailPage';
import HomePage from '../pages/Personal/HomePage';
import LoginMainPage from '../pages/Personal/user/LoginMain';
import SignIn from '../pages/Personal/user/signIn/SignIn';
import SeniorSignIn from '../pages/Personal/user/signIn/Senior/SeniorSignIn';
import CareSignIn from '../pages/Personal/user/signIn/Care/CareSignIn';
import JobApplyPage from '../pages/Personal/JobApplyPage';
import QuestionDetail from '../pages/Personal/QuestionDetailPage';
import JobSavedPage from '../pages/Personal/JobSavedPage';
import JobDraftsPage from '../pages/Personal/JobDraftsPage';
// import ExtraQuestionsPage from '../pages/Personal/ExtraQuestionsPage';


const AppRoutes = () => {
  return (
    <Routes>
      {/* 개인 버전 */}
      <Route path="/personal" element={<HomePage />}></Route>
      <Route path="/personal/join" element={<SignIn />}></Route>
      <Route path="/personal/join/senior" element={<SeniorSignIn />}></Route>
      <Route path="/personal/join/guardian" element={<CareSignIn />}></Route>
      <Route path="/personal/login" element={<LoginMainPage />}></Route>
      <Route
        path="/personal/jobs/recommend"
        element={<JobRecommendationPage />}
      ></Route>
      <Route
        path="/personal/jobs/recommend/:jobId"
        element={<JobDetailPage />}
      ></Route>
      <Route
        path="/personal/jobs/recommend/:jobId/apply"
        element={<JobApplyPage />}
      ></Route>
      <Route
        path="/personal/jobs/recommend/:jobId/apply/question"
        element={<></>}
      ></Route>
      <Route
        path="/personal/jobs/recommend/:jobId/apply/question/detail"
        element={<QuestionDetail />}
      ></Route>
      <Route path="/personal/jobs/saved" element={<JobSavedPage />}></Route>
      <Route path="/personal/jobs/drafts" element={<JobDraftsPage />}></Route>
      <Route path="/personal/my/applied" element={<></>}></Route>
      <Route path="/personal/my/applied/:appliedId" element={<></>}></Route>
      <Route path="/personal/my/applied/results" element={<></>}></Route>
      <Route path="/personal/my/info" element={<></>}></Route>
      <Route path="/personal/my/delete-account" element={<></>}></Route>
      <Route path="/personal/my/seniors" element={<></>}></Route>

      {/* 기업버전 */}
      <Route path="/company" element={<></>}></Route>
      <Route path="/company/join" element={<></>}></Route>
      <Route path="/company/login" element={<></>}></Route>
      <Route path="/company/jobs/create-form" element={<></>}></Route>
      <Route path="/company/jobs/applications" element={<></>}></Route>
      <Route
        path="/company/jobs/applications/:applicationId"
        element={<></>}
      ></Route>
      <Route path="/company/jobs/applications/results" element={<></>}></Route>
      <Route path="/company/my" element={<></>}></Route>
      <Route path="/company/my/delete-account" element={<></>}></Route>
    </Routes>
  );
};

export default AppRoutes;
