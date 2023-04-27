import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./ChooseArtist.css";
import { artists } from "./Artistdata";
import { BsCheck } from "react-icons/bs";
import { GrSearch } from "react-icons/gr";
const ChooseArtist = () => {
  const [selectedArtist, setselectedArtist] = useState([]);

  function updateSelectedArtistList(id) {
    if (!selectedArtist.includes(id)) {
      setselectedArtist((prev) => [...prev, id]);
    } else {
      setselectedArtist((prev) => prev.filter((artistId) => artistId !== id));
    }
  }

  const [searchQuery, setSearchQuery] = useState("");
  const filteredArtists = artists.filter((artist) =>
    artist.name.includes(searchQuery)
  );

  return (
    <div className="">
      <div className="img-container">
        <img
          src="/assets/Logo_PNG.svg"
          alt="Logo"
          className="img-fluid mx-auto"
        />
      </div>
      <p className="text-center text-white container">
        Follow your favorite artist to build your feed and stay updated for
        tickets
      </p>
      <Form className="d-flex form-search container">
        <div className="input-group">
          <div className="input-group-text search-wrapper bg-white">
            <GrSearch className="text-white search-icon" />
          </div>
          <Form.Control
            type="search"
            input
            placeholder="Search artist"
            className="me-2 search-form"
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* <Button variant="outline-success">Search</Button> */}
      </Form>
      <p className="text-white container">Suggested Artists</p>
      {filteredArtists.map((artist) => (
        <div
          key={artist.id}
          className="artistlist"
          onClick={() => updateSelectedArtistList(artist.id)}
        >
          <div className="d-flex">
            <img src={artist.image} alt="artistimage" className="artistimage" />
            <p className="text-white">{artist.name}</p>
          </div>
          <div
            className="checkcircle"
            style={{
              background: selectedArtist.includes(artist.id)
                ? "#fd7404"
                : "#fff",
            }}
          >
            <div>
              <BsCheck
                color={selectedArtist.includes(artist.id) ? "#FFF" : "#a1a1a1"}
                className="checkmark"
              />
            </div>
          </div>
          {/* <p>{isClicked ? "Selected" : "Unchecked"}</p> */}
        </div>
      ))}

      {filteredArtists.length == 0 && (
        <div className="text-center no-result">No Result</div>
      )}

      <div className=" container">
        <Button variant="primary" type="submit" className="artist-btn">
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ChooseArtist;
