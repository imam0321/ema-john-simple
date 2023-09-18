import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import './Home.css'

const Home = () => {
  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
    </div>
  );
};

export default Home;