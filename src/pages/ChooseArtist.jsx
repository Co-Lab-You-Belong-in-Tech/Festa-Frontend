import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
// import axios from "axios";
import "./ChooseArtist.css";
import { artists } from "../components/data/Artistdata";
import { BsCheck } from "react-icons/bs";
import { GrSearch } from "react-icons/gr";
// import API_URL from "../config";
const ChooseArtist = () => {
  const navigate = useNavigate();

  const [selectedArtist, setselectedArtist] = useState([]);

  function updateSelectedArtistList(id) {
    if (!selectedArtist.includes(id)) {
      setselectedArtist((prev) => [...prev, id]);
    } else {
      setselectedArtist((prev) => prev.filter((artistId) => artistId !== id));
    }
  }

  // Function to handle adding an artist to favorites
  // const addToFavorites = async (artistId) => {
  //   try {
  //     // Send a POST request to your backend API
  //     const response = await axios.post(
  //       `${API_URL}/api/v1/users/favorite-artist`,
  //       { artistId }
  //     );

  //     // Handle the response
  //     if (response.status === 200) {
  //       // Artist successfully added to favorites
  //       console.log("Artist added to favorites!");
  //     } else {
  //       // Handle other response statuses or error cases
  //       console.error("Failed to add artist to favorites");
  //     }
  //   } catch (error) {
  //     // Handle error
  //     console.error("Error adding artist to favorites", error);
  //   }
  // };

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
      <p className="text-white container mt-4">Suggested Artists</p>
      {filteredArtists.map((artist) => (
        <div
          key={artist.id}
          className="artistlist"
          onClick={() => {
            updateSelectedArtistList(artist.id);
            // addToFavorites(artist.id);
          }}
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
        <Button
          variant="primary"
          type="submit"
          className="artist-btn"
          onClick={() => navigate("/location")}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ChooseArtist;
