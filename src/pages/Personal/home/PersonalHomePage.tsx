import Topbar from '../../../shared/components/topbar/Topbar';
import HomeBeforeLogin from './HomeBeforeLogin';
import HomeAfterLogin from './HomeAfterLogin';

const PersonalHomePage = () => {
  return (
    <div>
      <Topbar>
        {/* <HomeBeforeLogin /> */}
        <HomeAfterLogin />
      </Topbar>
    </div>
  );
};

export default PersonalHomePage;
