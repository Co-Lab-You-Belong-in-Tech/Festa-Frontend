import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API_URL from "../../config";
import { BsCheck } from "react-icons/bs";

const Following = () => {
  const { token } = useSelector((state) => state.account);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Fetch user data from the /users/me endpoint
    fetch(`${API_URL}/api/v1/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Extract the favorites array from the user data
        const { favorites } = data.payload.data.user;
        setFavorites(favorites);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <div className="row">
      {favorites.map((favorite) => (
        <div className="col-12 col-md-6 md-p-3 mb-md-4" key={favorite._id}>
          <div className="artistlist">
            <div className="d-flex align-items-center justify-content-center">
              <img
                src={favorite.image}
                alt="artistimage"
                className="artistimage"
              />
              <p className="text-white">{favorite.name}</p>
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default Following;
