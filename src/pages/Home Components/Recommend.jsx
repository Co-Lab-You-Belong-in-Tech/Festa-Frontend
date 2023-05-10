import { useCallback, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import dayjs from "dayjs";
import { BsHeart, BsHeartFill } from "react-icons/bs";

function Recommended({
  searchQuery,
  selectedEvent,
  updateSelectedEventList,
  calenderFilterDate,
}) {
  const [recommendedData = [], recommendedLoading, recommendedError] = useFetch(
    "/users/recommend-event"
  );
  const [upcomingData = [], upcomingLoading, upcomingError] =
    useFetch("/events");

  const filterLogic = useCallback(
    (array) => {
      console.log(searchQuery);
      return calenderFilterDate || searchQuery
        ? array.filter((event) => {
            const eventMinTime = new Date(event.start_date).getTime();
            const eventMaxTime = new Date(event.end_date).getTime();
            const filterTime = new Date(calenderFilterDate).getTime();
            console.log(eventMinTime);
            const inRange =
              eventMinTime <= filterTime && filterTime <= eventMaxTime;
            const matchName = event.name
              .toLowerCase()
              .includes(searchQuery.toLowerCase());
            return inRange || matchName;
          })
        : array;
    },
    [calenderFilterDate, searchQuery]
  );

  const filteredEvents = useMemo(
    () => filterLogic(recommendedData),
    [recommendedData, searchQuery, calenderFilterDate]
  );
  const filteredUpcomingEvents = useMemo(
    () => filterLogic(upcomingData),
    [upcomingData, searchQuery, calenderFilterDate]
  );
  const navigate = useNavigate();

  function handleClick(eventId) {
    navigate(`/event/${eventId}`);
  }

  return (
    <div className="container">
      <div className="row d-flex justify-content-between align-items-center event-list-header">
        <p className="fw-bold w-auto">Recommended for you</p>
        <Link
          to="/discover/recommended"
          className="view-more-button text-decoration-none text-white w-auto"
        >
          View More
        </Link>
      </div>
      {recommendedLoading && <h1>Loading</h1>}
      {recommendedError && <h1>{recommendedError}</h1>}

      {filteredEvents.length === 0 && !recommendedLoading && (
        <h2 className="no-event">No events matched your query</h2>
      )}
      <div className="row">
        {filteredEvents.slice(0, 4).map((event) => (
          <div
            key={event._id}
            onClick={() => handleClick(event._id)}
            className="col-12 col-md-6 md-p-3"
          >
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
                      {dayjs(event.start_date).format("MMMM DD, YYYY")} -{" "}
                      {dayjs(event.end_date).format("MMMM DD, YYYY")}
                    </p>
                    <p className="fw-bold eventname">{event.name}</p>
                    <p className="eventtext-paragraph">{event.venue},</p>
                    <p className="eventtext-paragraph">
                      {event.city} {event.state}
                    </p>
                  </div>
                </div>
                <div
                  className=""
                  onClick={() => updateSelectedEventList(event.id)}
                >
                  {selectedEvent.includes(event.id) ? (
                    <BsHeartFill />
                  ) : (
                    <BsHeart />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="upcoming-events">
        <div className="d-flex justify-content-between align-items-center event-list-header">
          <p className="fw-bold ">Upcoming Events</p>
          <Link
            to="/discover/upcoming-events"
            className="view-more-button text-decoration-none text-white"
          >
            View More
          </Link>
        </div>
        {upcomingLoading && <h1>Loading</h1>}
        {upcomingError && <h1>{upcomingError}</h1>}

        {filteredUpcomingEvents.length === 0 && !upcomingLoading && (
          <h2 className="no-event">No events matched your query</h2>
        )}
        {filteredUpcomingEvents.slice(0, 4).map((upcomingevent) => (
          <div
            key={upcomingevent._id}
            onClick={() => handleClick(upcomingevent._id)}
            className="eventlist"
          >
            <div className="d-flex justify-between align-start w-100 gap-2">
              <div className="d-flex gap-3 align-center flex-grow-1">
                <div className="eventimage-container">
                  <img
                    src={upcomingevent.image}
                    alt="eventimage"
                    className="eventimage"
                  />
                </div>
                <div className="eventtext">
                  <p className="eventtext-paragraph text-uppercase">
                    {dayjs(upcomingevent.start_date).format("MMMM DD, YYYY")} -{" "}
                    {dayjs(upcomingevent.end_date).format("MMMM DD, YYYY")}
                  </p>
                  <p className="fw-bold eventname">{upcomingevent.name}</p>
                  <p className="eventtext-paragraph">{upcomingevent.venue},</p>
                  <p className="eventtext-paragraph">
                    {upcomingevent.city} {upcomingevent.state}
                  </p>
                </div>
              </div>
              <div
                className=""
                onClick={() => updateSelectedEventList(upcomingevent.id)}
              >
                {selectedEvent.includes(upcomingevent.id) ? (
                  <BsHeartFill />
                ) : (
                  <BsHeart />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recommended;
