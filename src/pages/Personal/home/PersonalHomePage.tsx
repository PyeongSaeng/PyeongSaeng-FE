import { useEffect, useState } from 'react';
import Topbar from '../../../shared/components/topbar/Topbar';
import HomeBeforeLogin from './HomeBeforeLogin';
import HomeAfterLogin from './HomeAfterLogin';

const PersonalHomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);
  }, []);

  if (isLoggedIn === null) {
    return null;
  }

  return (
    <div>
      <Topbar>{isLoggedIn ? <HomeAfterLogin /> : <HomeBeforeLogin />}</Topbar>
    </div>
  );
};

export default PersonalHomePage;
