import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRoutes from './routes';

const App = () => {
  return (
    <div className="w-[360px] min-h-[740px] mx-auto shadow-xl bg-white">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
};

export default App;