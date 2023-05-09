import { useState } from "react";
import { Button } from "react-bootstrap";
import Favorite from "./Favorite";
import Attending from "./Attending";
import Following from "./Following";

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
    <div>
      <div className="d-flex justify-content-between">
        <p>Julia Lyn</p>
        <Button>Log Out</Button>
      </div>
      <div className="d-flex justify-content-between">
        <Button onClick={handleFavoriteButtonClick}>Favorite</Button>
        <Button onClick={handleAttendingButtonClick}>Attending</Button>
        <Button onClick={handleFollowingButtonClick}>Following</Button>
      </div>

      {showFavoriteScreen && (
        <div>
          <h2>Favorite Screen</h2>
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
  );
};

export default Profile;
