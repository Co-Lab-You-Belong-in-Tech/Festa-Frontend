import { useState } from "react";
import { useSelector } from "react-redux";
import { artists } from "../../components/data/Artistdata";
import { BsCheck } from "react-icons/bs";

const Following = () => {
  const account = useSelector((state) => state.account);
  const favorites = account?.favorites;
  const [selectedArtist, setselectedArtist] = useState([]);
  function updateSelectedArtistList(id) {
    if (!selectedArtist.includes(id)) {
      setselectedArtist((prev) => [...prev, id]);
    } else {
      setselectedArtist((prev) => prev.filter((artistId) => artistId !== id));
    }
  }
  console.log(favorites);
  return (
    <div>
      <div className="">
        {artists.slice(0, 3).map((artist) => (
          <div
            key={artist.id}
            className="artistlist"
            onClick={() => {
              updateSelectedArtistList(artist.id);
            }}
          >
            <div className="d-flex align-items-center justify-content-center">
              <img
                src={artist.image}
                alt="artistimage"
                className="artistimage"
              />
              <p className="text-white">{artist.name}</p>
            </div>
            <div
              className="checkcircle"
              style={{
                background: "#fd7404",
              }}
            >
              <div>
                <BsCheck color={"#FFF"} className="checkmark" />
              </div>
            </div>
            {/* <p>{isClicked ? "Selected" : "Unchecked"}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Following;
