import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import Favorite from "./Favorite";
import Attending from "./Attending";
import Following from "./Following";
import AppLayout from "../../components/Layout/AppLayout";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { logoutAccount } from "../../redux/features/account/accountSlice";

const Profile = () => {
  const { isLoggedIn, register_success } = useSelector(
    (state) => state.account
  );
  const account = useSelector((state) => state.account);

  const [showFavoriteScreen, setShowFavoriteScreen] = useState(true);
  const [showAttendingScreen, setShowAttendingScreen] = useState(false);
  const [showFollowingScreen, setShowFollowingScreen] = useState(false);

  function handleFavoriteButtonClick() {
    setShowFavoriteScreen(true);
    setShowAttendingScreen(false);
    setShowFollowingScreen(false);
  }

  function handleAttendingButtonClick() {
    setShowFavoriteScreen(false);
    setShowAttendingScreen(true);
    setShowFollowingScreen(false);
  }

  function handleFollowingButtonClick() {
    setShowFavoriteScreen(false);
    setShowAttendingScreen(false);
    setShowFollowingScreen(true);
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutAccount());
    navigate("/login");
  }

  return (
    <AppLayout>
      <div>
        <div className="d-flex justify-content-between profile-header ">
          <p className="fw-bold">
            {" "}
            {(isLoggedIn || register_success) && account?.name}
          </p>
          <Button className="logout-btn" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
        <div className="d-flex justify-content-between justify-content-md-start pt-4 pb-4 profile-buttons-wrapper">
          <Button
            onClick={handleFavoriteButtonClick}
            style={{
              background: showFavoriteScreen ? "#fd7404" : "#EEA835",
            }}
            className="profile-buttons"
          >
            Favorite
          </Button>
          <Button
            onClick={handleAttendingButtonClick}
            style={{
              background: showAttendingScreen ? "#fd7404" : "#EEA835",
            }}
            className="profile-buttons"
          >
            Attending
          </Button>
          <Button
            onClick={handleFollowingButtonClick}
            style={{
              background: showFollowingScreen ? "#fd7404" : "#EEA835",
            }}
            className="profile-buttons"
          >
            Following
          </Button>
        </div>

        {showFavoriteScreen && (
          <div>
            <Favorite />
          </div>
        )}

        {showAttendingScreen && (
          <div>
            <Attending />
          </div>
        )}

        {showFollowingScreen && (
          <div>
            <Following />
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Profile;
