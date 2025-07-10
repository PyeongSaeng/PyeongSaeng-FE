import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Personal/Home';
import LoginMainPage from '../pages/Personal/user/LoginMain';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/join" element={<></>}></Route>
      <Route path="/join/senior" element={<></>}></Route>
      <Route path="/join/guardian" element={<></>}></Route>
      <Route path="/join/company" element={<></>}></Route>
      <Route path="/login" element={<LoginMainPage />}></Route>
      <Route path="/jobs/recommend" element={<></>}></Route>
      <Route path="/jobs/recommend/:id" element={<></>}></Route>
      <Route path="/jobs/recommend/:id/apply" element={<></>}></Route>
      <Route path="/jobs/recommend/:id/apply/question" element={<></>}></Route>
      <Route path="/jobs/saved" element={<></>}></Route>
      <Route path="/jobs/drafts" element={<></>}></Route>
      <Route path="/my" element={<></>}></Route>
      <Route path="/my/applied" element={<></>}></Route>
      <Route path="/my/applied/:id" element={<></>}></Route>
      <Route path="/my/applied/results" element={<></>}></Route>
      <Route path="/my/info" element={<></>}></Route>
      <Route path="/my/delete-account" element={<></>}></Route>
    </Routes>
  );
};

export default AppRoutes;
