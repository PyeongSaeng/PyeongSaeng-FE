import Topbar from '../../../shared/components/topbar/Topbar';
import HomeAfterLogin from './HomeAfterLogin';
import HomeBeforeLogin from './HomeBeforeLogin';

const CompanyHomePage = () => {
  return (
    <div>
      <Topbar>
        {localStorage.getItem('accessToken') ? (
          <HomeAfterLogin />
        ) : (
          <HomeBeforeLogin />
        )}
      </Topbar>
    </div>
  );
};

export default CompanyHomePage;
