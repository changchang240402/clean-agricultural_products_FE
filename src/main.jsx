import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import Login from './page/Login/Login'
import Register from './page/Register/Register'
import './index.css'
import store from '../src/redux/store/index';
import TraderNavigation from './page/Trader/TraderNavigation';
import SellerNavigation from './page/Seller/SellerNavigation';
import AdminNavigation from './page/Admin/AdminNavigation';
import UserNavigation from './page/User/UserNavigation';
import Popup from './page/Orther/Popup'
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path='' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='user/*' element={<UserNavigation />} />
        <Route path='admin/*' element={<AdminNavigation />} />
        <Route path='seller/*' element={<SellerNavigation />} />
        <Route path='trader/*' element={<TraderNavigation />} />
        <Route path='popup' element={<Popup />} />
      </Routes>
      <ToastContainer />
    </Router>
  </Provider>
)
