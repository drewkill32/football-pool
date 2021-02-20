import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../auth';
import PreseasonHome from '../Preseason';

const Home = () => {
  const { user, signout } = useAuth();
  const isPreseason = true;
  const history = useHistory();

  return isPreseason ? (
    <PreseasonHome />
  ) : (
    <div >
      <p>Welcome {user!.name}</p>
      <button onClick={() => signout(() => history.push('/'))}>Sign Out</button>
    </div>
  );
};

export default Home;
