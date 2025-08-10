import Topbar from '../../../shared/components/topbar/Topbar';
import HomeBeforeLogin from './HomeBeforeLogin';
import HomeAfterLogin from './HomeAfterLogin';

const PersonalHomePage = () => {
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

export default PersonalHomePage;
