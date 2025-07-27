import Topbar from '../../../shared/components/topbar/Topbar';
import HomeAfterLogin from './HomeAfterLogin';
import HomeBeforeLogin from './HomeBeforeLogin';

const CompanyHomePage = () => {
  return (
    <div>
      <Topbar>
        <HomeBeforeLogin />
        {/* <HomeAfterLogin /> */}
      </Topbar>
    </div>
  );
};

export default CompanyHomePage;
