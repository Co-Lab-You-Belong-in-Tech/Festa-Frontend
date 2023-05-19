import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import "./ChooseArtist.css";

import { BsCheck } from "react-icons/bs";
import { GrSearch } from "react-icons/gr";
import API_URL from "../config";
import useFetch from "../hooks/useFetch";
import { useSelector } from "react-redux";
import LoadingScreen from "../components/Loading";
import AppLayout from "../components/Layout/AppLayout";
import { toast } from "react-toastify";
const ChooseArtist = () => {
  const navigate = useNavigate();

  const [data = [], loading, error] = useFetch("/artists");

  const [selectedArtist, setselectedArtist] = useState([]);

  const { token } = useSelector((state) => state.account);

  function updateSelectedArtistList(id) {
    if (!selectedArtist.includes(id)) {
      setselectedArtist((prev) => [...prev, id]);
    } else {
      setselectedArtist((prev) => prev.filter((artistId) => artistId !== id));
    }
  }

  // Function to handle adding an artist to favorites
  const addToFavorites = async () => {
    try {
      const responses = await Promise.all(
        selectedArtist.map((id) =>
          axios.post(
            `${API_URL}/api/v1/users/favorite-artist`,
            {
              artists: [id],
            },
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          )
        )
      );

      navigate("/location");
    } catch (error) {
      // Handle error
      toast.error("Error adding artist to favorites", error);
    }
  };

  const [searchQuery, setSearchQuery] = useState("");
  const filteredArtists = data.filter((artist) =>
    artist.name.join(" ").includes(searchQuery)
  );

  return (
    <AppLayout renderSide={false} renderNav={false}>
      <div className="">
        <div className="img-container d-grid d-md-none">
          <img
            src="/assets/Logo_PNG.svg"
            alt="Logo"
            className="img-fluid mx-auto"
          />
        </div>
        <div className="row">
          <p className="text-center text-white container col-12 col-md-6 mt-md-5 ">
            Follow your favorite artist to build your feed and stay updated for
            tickets
          </p>
        </div>
        <div className="row d-md-flex justify-content-md-between">
          <Form className="d-flex form-search container col-12 col-md-6">
            <div className="input-group ">
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
        </div>
        <p className="text-white container mt-4 suggested-artist">
          Suggested Artists
        </p>
        {loading && <LoadingScreen />}
        {error && <h1>{error}</h1>}
        <div className="d-flex justify-content-center artist-wrapper ">
          <div className="row">
            {filteredArtists.map((artist) => (
              <div
                key={artist._id}
                className="col-12 col-md-6 md-p-5"
                onClick={() => {
                  updateSelectedArtistList(artist._id);
                }}
              >
                <div className="artistlist">
                  <div className="d-flex align-items-center justify-content-center">
                    <img
                      src={artist.image}
                      alt="artistimage"
                      className="artistimage"
                    />
                    <p className="text-white">{artist.name.join(" ")}</p>
                  </div>
                  <div
                    className="checkcircle"
                    style={{
                      background: selectedArtist.includes(artist._id)
                        ? "#fd7404"
                        : "#fff",
                    }}
                  >
                    <div>
                      <BsCheck
                        color={
                          selectedArtist.includes(artist._id)
                            ? "#FFF"
                            : "#a1a1a1"
                        }
                        className="checkmark"
                      />
                    </div>
                  </div>
                </div>
                {/* <p>{isClicked ? "Selected" : "Unchecked"}</p> */}
              </div>
            ))}
          </div>
        </div>

        {filteredArtists.length == 0 && !loading && (
          <div className="text-center no-result">No Result</div>
        )}

        <div className="row d-flex justify-content-center button-wrap">
          <Button
            variant="primary"
            type="submit"
            className="artist-btn col-12 col-md-6"
            onClick={() => addToFavorites()}
          >
            Continue
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default ChooseArtist;
