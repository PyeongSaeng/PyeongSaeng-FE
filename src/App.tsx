import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AppRoutes from './routes';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className="w-[360px] min-h-[740px] mx-auto shadow-xl bg-white overflow-y-auto">
      <BrowserRouter>
        <AppRoutes />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          closeOnClick={true}
          pauseOnHover={false}
        />
      </BrowserRouter>
    </div>
  );
};

export default App;
