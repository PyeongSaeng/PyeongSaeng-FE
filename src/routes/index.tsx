import { Routes, Route } from 'react-router-dom';
import JobRecommendationPage from '../pages/Personal/JobRecommendationPage';
import JobDetailPage from '../pages/Personal/JobDetailPage';
import PersonalHomePage from '../pages/Personal/home/PersonalHomePage';
import LoginMainPage from '../pages/Personal/user/LoginMain';
import SignIn from '../pages/Personal/user/signIn/SignIn';
import SeniorSignIn from '../pages/Personal/user/signIn/Senior/SeniorSignIn';
import CareSignIn from '../pages/Personal/user/signIn/Care/CareSignIn';
import JobApplyPage from '../pages/Personal/JobApplyPage';
import QuestionDetail from '../pages/Personal/QuestionDetailPage';
import CompanyHomePage from '../pages/Company/home/CompanyHomePage';
import JobSavedPage from '../pages/Personal/JobSavedPage';
import JobDraftsPage from '../pages/Personal/JobDraftsPage';
import ApplicationsPage from '../pages/Company/ApplicationsPage';
import ApplicationDetailPage from '../pages/Company/ApplicationDetailPage';
import ApplicationResultsPage from '../pages/Company/ApplicationResultsPage';

import CompanyJobListPage from '../pages/Company/CompanyJobListPage';
// import ExtraQuestionsPage from '../pages/Personal/ExtraQuestionsPage';
import Test from '../shared/components/topbar/Test';

const AppRoutes = () => {
  return (
    <Routes>
      {/* 개인 버전 */}
      <Route path="/personal" element={<PersonalHomePage />}></Route>
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
      <Route path="/company" element={<CompanyHomePage />}></Route>
      <Route path="/company/join" element={<></>}></Route>
      <Route path="/company/login" element={<></>}></Route>
      <Route
        path="/company/jobs/create-form"
        element={<CompanyJobListPage />}
      ></Route>
      <Route path="/company/jobs/applications" element={<></>}></Route>

      <Route
        path="/company/jobs/applications"
        element={<ApplicationsPage />}
      ></Route>
      <Route
        path="/company/jobs/applications/:title"
        element={<ApplicationDetailPage />}
      />

      <Route
        path="/company/jobs/applications/:applicationId/results"
        element={<ApplicationResultsPage />}
      ></Route>
      <Route path="/company/my" element={<></>}></Route>
      <Route path="/company/my/delete-account" element={<></>}></Route>
    </Routes>
  );
};

export default AppRoutes;
