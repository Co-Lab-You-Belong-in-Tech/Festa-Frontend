import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./ChooseArtist.css";
import { artists } from "./Artistdata";
import { BsCheck } from "react-icons/bs";
import { GrSearch } from "react-icons/gr";
const ChooseArtist = () => {
  let white = "#FFF";
  let gray = "#BFBFBF";

  const [bgColor, setBgColor] = useState(white);
  const [checkColor, setCheckColor] = useState(gray);

  const changeColor = () => {
    let yellow = "#EEA835";

    setBgColor(yellow);
    setCheckColor(white);
  };

  const [isClicked, setIsClicked] = useState(false);

  const handleChange = () => {
    setIsClicked(!isClicked);
    console.log("Clicked");
  };

  return (
    <div className="container">
      <div className="img-container">
        <img
          src="/assets/Logo_PNG.svg"
          alt="Logo"
          className="img-fluid mx-auto"
        />
      </div>
      <p className="text-center text-white">
        Follow your favorite artist to build your feed and stay updated for
        tickets
      </p>
      <Form className="d-flex form-search">
        <span>
          <GrSearch className="text-white search-icon" />
        </span>
        <Form.Control
          type="search"
          placeholder="Search artist"
          className="me-2 search-form"
          aria-label="Search"
        />

        {/* <Button variant="outline-success">Search</Button> */}
      </Form>
      <p className="text-white">Suggested Artists</p>
      {artists.map((artist) => (
        <div key={artist.id} className="artistlist">
          <div className="d-flex">
            <img src={artist.image} alt="artistimage" />
            <p className="text-white">{artist.name}</p>
          </div>
          <div
            className="checkcircle"
            style={{ background: bgColor }}
            onClick={changeColor}
            onChange={handleChange}
            // onChange={() => setIsClicked((prev) => !prev)}
          >
            <div>
              <BsCheck
                className="checkmark"
                style={{ color: checkColor }}
                onClick={changeColor}
              />
            </div>
          </div>
          {/* <p>{isClicked ? "Selected" : "Unchecked"}</p> */}
        </div>
      ))}
      <Button variant="primary" type="submit" className="artist-btn">
        Continue
      </Button>
    </div>
  );
};

export default ChooseArtist;
