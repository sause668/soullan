import { useLocation, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { IoChevronBack } from "react-icons/io5";

import "./Navigation.css";

function Navigation() {
  const nav = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div id="navCon">
      {(currentPath === '/') ? (
        <div id="navLogoCon">
          <img src="/imgs/logo.png" alt="logo" id="navLogo"/>
        </div>
      ):(
        <div id="backButtonCon">
          <button id="backButton" type="button" onClick={()=>nav(-1)}>
            <IoChevronBack id="backButtonIcon" />
          </button>
        </div>
      )}
      <div id={(currentPath === '/') ? 'navTitleCon':''} >
        <h1 id="navTitle" onClick={()=>nav('/')}>Soul Academy</h1>
      </div>
      <ProfileButton/>
    </div>
  );
}

export default Navigation;
