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
// import ExtraQuestionsPage from '../pages/Personal/ExtraQuestionsPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/join" element={<SignIn />}></Route>
      <Route path="/join/senior" element={<SeniorSignIn />}></Route>
      <Route path="/join/guardian" element={<CareSignIn />}></Route>
      <Route path="/join/company" element={<></>}></Route>
      <Route path="/login" element={<LoginMainPage />}></Route>
      <Route path="/jobs/recommend" element={<JobRecommendationPage />}></Route>
      <Route path="/jobs/recommend/:id" element={<JobDetailPage />}></Route>
      <Route
        path="/jobs/recommend/:id/apply"
        element={<JobApplyPage />}
      ></Route>
      <Route path="/jobs/recommend/:id/apply/question" element={<></>}></Route>
      <Route
        path="/jobs/recommend/:id/apply/question/detail"
        element={<QuestionDetail />}
      ></Route>
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
