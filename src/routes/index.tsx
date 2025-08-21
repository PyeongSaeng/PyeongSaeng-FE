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
import SeniorInfo from '../pages/Personal/my/seniors/info/SeniorInfo';
import PersonalPasswordEdit from '../pages/Personal/my/PersonalPasswordEdit';
import BasicInfo from '../pages/Personal/my/seniors/info/BasicInfo';
import ExtraInfo from '../pages/Personal/my/seniors/info/ExtraInfo';
import BasicInfoEdit from '../pages/Personal/my/seniors/info/BasicInfoEdit';
import ExtraInfoEdit from '../pages/Personal/my/seniors/info/ExtraInfoEdit';
import PersonalPasswordEditDone from '../pages/Personal/my/PersonalPasswordEditDone';
import ApplicationsPage from '../pages/Company/ApplicationsPage';
import ApplicationDetailPage from '../pages/Company/ApplicationDetailPage';
import ApplicationResultsPage from '../pages/Company/ApplicationResultsPage';
import KakaoCallback from '../pages/Personal/KakaoCallback';
import CareInfo from '../pages/Personal/my/cares/info/CareInfo';
import CareInfoEdit from '../pages/Personal/my/cares/info/CareInfoEdit';
import LinkingSenior from '../pages/Personal/my/cares/care-seniors/LinkingSenior';
import CompanyDeleteAccount from '../pages/Company/my/CompanyDeleteAccount';
import CompanyDeleteAccountDone from '../pages/Company/my/CompanyDeleteAccountDone';
import ClosedJopList from '../pages/Company/my/ClosedJobList';
import CompanyInfo from '../pages/Company/my/CompanyInfo';
import CompanyInfoEdit from '../pages/Company/my/CompanyInfoEdit';
import CompanyPasswordEdit from '../pages/Company/my/CompanyPasswordEdit';
import CompanyPasswordEditDone from '../pages/Company/my/CompanyPasswordEditDone';
import CareCheckApplicationDetail from '../pages/Personal/my/cares/care-seniors/CareCheckApplicationDetail';
import CareCheckApplicationResults from '../pages/Personal/my/cares/care-seniors/CareCheckApplicationResults';
import SeniorApplyResults from '../pages/Personal/my/seniors/SeniorApplyResults';
import SeniorApplyDetail from '../pages/Personal/my/seniors/SeniorApplyDetail';
import RepostStep1 from '../pages/Company/my/RepostStep1';
import RepostStep2 from '../pages/Company/my/RePostStep2';
import SeniorExtraInfo from '../pages/Personal/my/cares/care-seniors/SeniorExtraInfo';
import SeniorExtraInfoEdit from '../pages/Personal/my/cares/care-seniors/SeniorExtraInfoEdit';
import ClosedJobRepostDetail from '../pages/Company/my/ClosedJobRepostDetail';
import JobApplyPageTest from '../pages/Personal/JobApplyPageTest';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PersonalHomePage />}></Route>
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
        element={<JobApplyPageTest />}
      ></Route>
      <Route
        path="/personal/jobs/recommend/:jobId/apply/question"
        element={<></>}
      ></Route>
      <Route path="/personal/jobs/saved" element={<JobSavedPage />}></Route>
      <Route path="/personal/jobs/drafts" element={<JobDraftsPage />}></Route>
      <Route
        path="/personal/senior-my/applied-results"
        element={<SeniorApplyResults />}
      ></Route>
      <Route
        path="/personal/senior-my/applied-results/:applicationId"
        element={<SeniorApplyDetail />}
      ></Route>
      {/* 시니어 마이메뉴 */}
      <Route path="/personal/senior-my/info" element={<SeniorInfo />}>
        <Route path="basic" element={<BasicInfo />}></Route>
        <Route path="extra" element={<ExtraInfo />}></Route>
        <Route path="basic/edit" element={<BasicInfoEdit />}></Route>
        <Route path="extra/edit" element={<ExtraInfoEdit />}></Route>
      </Route>
      {/* 보호자 마이메뉴 */}
      <Route path="/personal/care-my/info" element={<CareInfo />}></Route>
      <Route
        path="/personal/care-my/info/edit"
        element={<CareInfoEdit />}
      ></Route>
      <Route
        path="/personal/care-my/link-seniors"
        element={<LinkingSenior />}
      ></Route>
      <Route
        path="/personal/care-my/senior/:seniorId/application-results"
        element={<CareCheckApplicationResults />}
      ></Route>
      <Route
        path="/personal/care-my/senior/:seniorId/application-results/:applicationId"
        element={<CareCheckApplicationDetail />}
      ></Route>
      <Route
        path="/personal/care-my/senior/:seniorId/extra"
        element={<SeniorExtraInfo />}
      ></Route>
      <Route
        path="/personal/care-my/senior/:seniorId/extra/edit"
        element={<SeniorExtraInfoEdit />}
      ></Route>
      <Route
        path="/personal/password-edit"
        element={<PersonalPasswordEdit />}
      ></Route>
      <Route
        path="/personal/password-edit/done"
        element={<PersonalPasswordEditDone />}
      ></Route>
      <Route
        path="/personal/delete-account"
        element={<PersonalDeleteAccount />}
      ></Route>
      <Route
        path="/personal/delete-account/done"
        element={<PersonalDeleteAccountDone />}
      ></Route>
      <Route path="/personal/find-account" element={<FindAccount />}></Route>
      <Route path="/auth/callback" element={<KakaoCallback />} /> {/* 로그인 */}
      <Route path="/auth/signup/kakao" element={<KakaoCallback />} />{' '}
      {/* 회원가입 */}
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
        path="/company/jobs/applications/:jobPostId"
        element={<ApplicationDetailPage />}
      />
      <Route
        path="/company/jobs/applications/:jobPostId/results"
        element={<ApplicationResultsPage />}
      ></Route>
      <Route path="/company/jobs/repost" element={<ClosedJopList />}></Route>
      <Route
        path="/company/jobs/repost/:jobPostId"
        element={<ClosedJobRepostDetail />}
      >
        <Route path="step1" element={<RepostStep1 />}></Route>
        <Route path="step2" element={<RepostStep2 />}></Route>
      </Route>
      <Route path="/company/my/info" element={<CompanyInfo />}></Route>
      <Route path="/company/my/info/edit" element={<CompanyInfoEdit />}></Route>
      <Route
        path="/company/delete-account"
        element={<CompanyDeleteAccount />}
      ></Route>
      <Route
        path="/company/delete-account/done"
        element={<CompanyDeleteAccountDone />}
      ></Route>
      <Route
        path="/company/password-edit"
        element={<CompanyPasswordEdit />}
      ></Route>
      <Route
        path="/company/password-edit/done"
        element={<CompanyPasswordEditDone />}
      ></Route>
      <Route
        path="/company/find-account"
        element={<CompanyFindAccount />}
      ></Route>
    </Routes>
  );
};

export default AppRoutes;
