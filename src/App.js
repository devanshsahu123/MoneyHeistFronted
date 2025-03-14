import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpPage from "./auth/SignUpPage";
import LogInPage from "./auth/LogInPage";
import RootPage from "./DashBoard/RootPage";
import HomePage from "./DashBoard/HomePage";
import DepositeAmount from "./MoneyManagment/DepositeAmount";
import WithdrawPage from "./DashBoard/WithdrawPage.js";
import LinkAccount from "./DashBoard/LinkAccount.js";
import VipClub from "./DashBoard/VipClub.js";
import MyTaskList from "./MoneyManagment/MyTaskList.js";
import MyTeam from "./MoneyManagment/MyTeam.js";
import InviteFriend from "./MoneyManagment/InviteFriend.js";
import AboutUs from "./MoneyManagment/AboutUs.js";
import TransactionHistory from "./admin/transactionHistory.js";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/deposite" element={<DepositeAmount />} />
        <Route path="/withdraw" element={<WithdrawPage />} />
        <Route path="/link-account" element={<LinkAccount />} />
        <Route path="/vip-club" element={<VipClub />} />
        <Route path="/my-task" element={<MyTaskList />} />
        <Route path="/my-team" element={<MyTeam />} />
        <Route path="/invite" element={<InviteFriend />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/admin" element={<TransactionHistory />} />
      </Routes>
    </Router>
  );
};

export default App;
