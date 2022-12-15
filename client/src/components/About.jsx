import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function About(props) {
  return (
    <div className="about container">
      <p>联系方式</p>
      <NavLink to="/about/email" className="navigation">
        邮箱
      </NavLink>
      <NavLink to="/about/tel" className="navigation">
        电话
      </NavLink>
      <Outlet />
    </div>
  );
}

export default About;
