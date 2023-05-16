// import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import API_URL from "../../config";
import { events } from "../../components/data/Eventsdata";
import { BsHeartFill } from "react-icons/bs";
const Favorite = () => {
  const { token } = useSelector((state) => state.account);
  const [favoriteEvents, setFavoriteEvents] = useState([]);

  useEffect(() => {
    // Fetch user data from the /users/me endpoint
    fetch(`${API_URL}/api/v1/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Extract the favorites_events array from the user data
        const { favorite_events } = data.payload.data.user;
        setFavoriteEvents(favorite_events);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <div>
      <div className="row">
        {favoriteEvents.map((event) => (
          <div className="col-12 col-md-6 md-p-3 mb-md-4" key={event.id}>
            <div className="eventlist">
              <div className="d-flex justify-between align-start w-100 gap-2">
                <div className="d-flex gap-3 align-center flex-grow-1">
                  <div className="eventimage-container">
                    <img
                      src={event.image}
                      alt="eventimage"
                      className="eventimage"
                    />
                  </div>
                  <div className="eventtext">
                    <p className="eventtext-paragraph text-uppercase">
                      {event.date}
                    </p>
                    <p className="fw-bold eventname">{event.name}</p>
                    <p className="eventtext-paragraph">{event.venue},</p>
                    <p className="eventtext-paragraph">
                      {event.city} {event.state}
                    </p>
                  </div>
                </div>
                <div className="">
                  <BsHeartFill />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {events.length === 0 && (
        <p className="text-center no-result">No Favorite Event </p>
      )}
    </div>
  );
};

export default Favorite;
