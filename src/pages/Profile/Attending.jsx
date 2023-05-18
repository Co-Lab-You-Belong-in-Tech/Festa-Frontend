import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
// import { events } from "../../components/data/Eventsdata";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import API_URL from "../../config";

const Attending = () => {
  const [selectedEvent, setselectedEvent] = useState([]);
  // const [Attendingdata = []] = useFetch(`/users/action?action=attending`);

  function updateSelectedEventList(id) {
    if (!selectedEvent.includes(id)) {
      setselectedEvent((prev) => [...prev, id]);
    } else {
      setselectedEvent((prev) => prev.filter((eventId) => eventId !== id));
    }
  }

  const { token } = useSelector((state) => state.account);
  const [attending, setAttending] = useState([]);

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
        const { attending_events } = data.payload.data.user;
        setAttending(attending_events);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <div className="row">
      {attending.map((event) =>
        AttendingEventList(event, updateSelectedEventList, selectedEvent)
      )}
      {attending.length === 0 && (
        <p className="text-center no-result">No Event </p>
      )}
    </div>
  );
};

export default Attending;

function AttendingEventList(event, updateSelectedEventList, selectedEvent) {
  return (
    <div key={event.id}>
      <div className="col-12 col-md-6 md-p-3 mb-md-4">
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
                  {dayjs(event.start_date, "DD-MM-YYYY").format("MMM DD, YYYY")}{" "}
                  - {dayjs(event.end_date, "DD-MM-YYYY").format("MMM DD, YYYY")}
                </p>
                <p className="fw-bold eventname">{event.name}</p>
                <p className="eventtext-paragraph">{event.venue},</p>
                <p className="eventtext-paragraph">
                  {event.city} {event.state}
                </p>
              </div>
            </div>
            <div className="" onClick={() => updateSelectedEventList(event.id)}>
              {selectedEvent.includes(event.id) ? <BsHeartFill /> : <BsHeart />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
