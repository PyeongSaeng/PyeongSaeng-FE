import { Routes, Route } from 'react-router-dom';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<></>}></Route>
      <Route path="/jobs/recommend" element={<></>}></Route>
      <Route path="/jobs/recommend/:id" element={<></>}></Route>
      <Route path="/jobs/recommend/:id/apply" element={<></>}></Route>
      <Route path="/join" element={<></>}></Route>
      <Route path="/join/senior" element={<></>}></Route>
      <Route path="/join/guardian" element={<></>}></Route>
      <Route path="/join/company" element={<></>}></Route>
      <Route path="/login" element={<></>}></Route>
      <Route path="/jobs/saved" element={<></>}></Route>
      <Route path="/jobs/drafts" element={<></>}></Route>
      <Route path="/questions" element={<></>}></Route>
      <Route path="/my" element={<></>}></Route>
      <Route path="/my/jobs/applied" element={<></>}></Route>
      <Route path="/my/jobs/applied/:id" element={<></>}></Route>
      <Route path="/my/info" element={<></>}></Route>
      <Route path="/my/delete-account" element={<></>}></Route>
    </Routes>
  );
};

export default AppRoutes;
