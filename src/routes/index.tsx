import { Routes, Route } from 'react-router-dom';
import JobRecommendationPage from '../pages/Personal/JobRecommendationPage';
import JobDetailPage from '../pages/Personal/JobDetailPage';
import PersonalHomePage from '../pages/Personal/home/PersonalHomePage';
import LoginMainPage from '../pages/Personal/LoginMain';
import SignIn from '../pages/Personal/SignIn';
import SeniorSignIn from '../pages/Personal/components/user/signIn/Senior/SeniorSignIn';
import CareSignIn from '../pages/Personal/components/user/signIn/Care/CareSignIn';
import JobApplyPage from '../pages/Personal/JobApplyPage';
import CompanyHomePage from '../pages/Company/home/CompanyHomePage';
import JobSavedPage from '../pages/Personal/JobSavedPage';
import JobDraftsPage from '../pages/Personal/JobDraftsPage';
import CompanyLoginPage from '../pages/Company/CompanyLogin';
import CompanySignin from '../pages/Company/CompanySignin';
import FindAccount from '../pages/Personal/components/user/FindAccount/FindAccount';
import CompanyFindAccount from '../pages/Company/components/FindAccount/FindAccount';
import CompanyJobListPage from '../pages/Company/CompanyJobListPage';
import PersonalDeleteAccount from '../pages/Personal/my/PersonalDeleteAccount';
import PersonalDeleteAccountDone from '../pages/Personal/my/PersonalDeleteAccountDone';
import PersonalInfo from '../pages/Personal/my/info/PersonalInfo';
import PersonalPasswordEdit from '../pages/Personal/my/info/PersonalPasswordEdit';
import ApplyResults from '../pages/Personal/my/apply/ApplyResults';
import ApplyDetail from '../pages/Personal/my/apply/ApplyDetail';
import BasicInfo from '../pages/Personal/my/info/BasicInfo';
import ExtraInfo from '../pages/Personal/my/info/ExtraInfo';
import BasicInfoEdit from '../pages/Personal/my/info/BasicInfoEdit';
import ExtraInfoEdit from '../pages/Personal/my/info/ExtraInfoEdit';
import PersonalPasswordEditDone from '../pages/Personal/my/info/PersonalPasswordEditDone';
import ApplicationsPage from '../pages/Company/ApplicationsPage';
import ApplicationDetailPage from '../pages/Company/ApplicationDetailPage';
import ApplicationResultsPage from '../pages/Company/ApplicationResultsPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* 개인 버전 */}
      <Route path="/" element={<PersonalHomePage />}></Route>
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
      <Route path="/personal/jobs/saved" element={<JobSavedPage />}></Route>
      <Route path="/personal/jobs/drafts" element={<JobDraftsPage />}></Route>
      <Route
        path="/personal/my/applied-results"
        element={<ApplyResults />}
      ></Route>
      <Route
        path="/personal/my/applied-results/:appliedId"
        element={<ApplyDetail />}
      ></Route>
      <Route path="/personal/my/info" element={<PersonalInfo />}>
        <Route path="basic" element={<BasicInfo />}></Route>
        <Route path="extra" element={<ExtraInfo />}></Route>
        <Route path="basic/edit" element={<BasicInfoEdit />}></Route>
        <Route path="extra/edit" element={<ExtraInfoEdit />}></Route>
      </Route>
      <Route
        path="/personal/my/info/basic/edit/password"
        element={<PersonalPasswordEdit />}
      ></Route>
      <Route
        path="/personal/my/info/basic/edit/password/done"
        element={<PersonalPasswordEditDone />}
      ></Route>
      <Route
        path="/personal/my/delete-account"
        element={<PersonalDeleteAccount />}
      ></Route>
      <Route
        path="/personal/my/delete-account/done"
        element={<PersonalDeleteAccountDone />}
      ></Route>
      <Route path="/personal/my/seniors" element={<></>}></Route>
      <Route path="/personal/find-account" element={<FindAccount />}></Route>

      {/* 기업버전 */}
      <Route path="/company" element={<CompanyHomePage />}></Route>
      <Route path="/company/join" element={<CompanySignin />}></Route>
      <Route path="/company/login" element={<CompanyLoginPage />}></Route>
      <Route
        path="/company/jobs/create-form"
        element={<CompanyJobListPage />}
      ></Route>

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
      <Route
        path="/company/find-account"
        element={<CompanyFindAccount />}
      ></Route>
    </Routes>
  );
};

export default AppRoutes;
