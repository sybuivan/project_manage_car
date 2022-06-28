import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.scss';
import { router, routes } from './constants';
import { MainLayout } from './layouts';
import { Header, Sidebar } from './components';
import './assets/css/_variable.scss';
import './assets/css/reset.scss';
import OverLayProvider from './components/OverLay/provider';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <MainLayout>
      <Router>
        <Header />
        <div className="app-wrapper">
          <Sidebar />
          <div className="app-content">
            <Route exact path="/">
              <Redirect to={router.DANH_SACH_SAN_PHAM} />
            </Route>
            <Switch>
              {routes.map((route) => (
                <Route key={route.path} {...route} />
              ))}
            </Switch>
          </div>
        </div>
      </Router>
      <OverLayProvider />
      <ToastContainer />
    </MainLayout>
  );
}

export default App;
