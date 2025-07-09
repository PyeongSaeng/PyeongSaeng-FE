import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import JobRecommendationPage from './pages/Personal/JobRecommendationPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/job-recommendation" element={<JobRecommendationPage />} />
      </Routes>
    </Router>
  );
};

export default App;
