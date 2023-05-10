import { useState } from "react";
import { Button } from "react-bootstrap";
import Favorite from "./Favorite";
import Attending from "./Attending";
import Following from "./Following";
import AppLayout from "../../components/Layout/AppLayout";
import "./Profile.css";

const Profile = () => {
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
  return (
    <AppLayout>
      <div>
        <div className="d-flex justify-content-between">
          <p>Julia Lyn</p>
          <Button>Log Out</Button>
        </div>
        <div className="d-flex justify-content-between">
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
            <h2>Attending Screen</h2>
            <Attending />
          </div>
        )}

        {showFollowingScreen && (
          <div>
            <h2>Following Screen</h2>
            <Following />
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Profile;
