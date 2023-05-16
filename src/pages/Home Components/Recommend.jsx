import { useCallback, useMemo, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import LoadingScreen from "../../components/Loading";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

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

  // const hertIconRef = useRef(null);

  const filterLogic = useCallback(
    (array) => {
      return array
        .filter((event) => {
          if (!calenderFilterDate) return true;
          const eventMinTime = new Date(
            dayjs(event.start_date, "DD/M/YYYY").format("YYYY-MM-DD")
          ).getTime();
          const eventMaxTime = new Date(
            dayjs(event.end_date, "DD/M/YYYY").format("YYYY-MM-DD")
          ).getTime();
          const filterTime = new Date(calenderFilterDate).getTime();
          const inRange =
            eventMinTime - 60 * 60 * 24 * 1000 <= filterTime &&
            filterTime <= eventMaxTime;

          return inRange;
        })
        .filter((event) => {
          return event.name.toLowerCase().includes(searchQuery.toLowerCase());
        });
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

  const goToDetails = useCallback((eventId) => {
    navigate(`/event/${eventId}`);
  }, []);

  // const handleHeartClick = (e, eventId) => {
  //   console.dir(e.target);
  //   e.stopPropagation();
  //   if (e.target.className === "heart-icon") {
  //     updateSelectedEventList(eventId);
  //   }
  // };

  const likeEvent = useCallback((id) => {
    updateSelectedEventList(id);
  }, []);

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
      {recommendedLoading && <LoadingScreen />}
      {recommendedError && <h1>{recommendedError}</h1>}

      {filteredEvents.length === 0 && !recommendedLoading && (
        <h2 className="no-event">No events matched your query</h2>
      )}
      <div className="row">
        {filteredEvents.slice(0, 4).map((event) => (
          <EventList
            key={event._id}
            {...event}
            selectedEvent={selectedEvent}
            goToDetails={goToDetails}
            likeEvent={likeEvent}
          />
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
        {upcomingLoading && <LoadingScreen />}
        {upcomingError && <h1>{upcomingError}</h1>}

        {filteredUpcomingEvents.length === 0 && !upcomingLoading && (
          <h2 className="no-event">No events matched your query</h2>
        )}
        {filteredUpcomingEvents.slice(0, 4).map((upcomingevent) => (
          <EventList
            key={upcomingevent._id}
            {...upcomingevent}
            selectedEvent={selectedEvent}
            goToDetails={goToDetails}
            likeEvent={likeEvent}
          />
        ))}
      </div>
    </div>
  );
}

export default Recommended;

function EventList({
  _id,
  image,
  start_date,
  end_date,
  name,
  venue,
  state,
  city,
  selectedEvent,
  likeEvent,
  goToDetails,
}) {
  const heartIconRef = useRef(null);

  const onClick = useCallback(
    (e) => {
      if (heartIconRef.current.contains(e.target)) {
        likeEvent(_id);
      } else {
        goToDetails(_id);
      }
    },
    [_id, likeEvent, goToDetails]
  );
  return (
    <div
      key={_id}
      onClick={onClick}
      className="eventlist md-border-right md-border-left"
    >
      <div className="d-flex justify-between align-start w-100 gap-2">
        <div className="d-flex gap-3 align-center flex-grow-1">
          <div className="eventimage-container">
            <img src={image} alt="eventimage" className="eventimage" />
          </div>
          <div className="eventtext">
            <p className="eventtext-paragraph text-uppercase">
              {dayjs(start_date, "DD/M/YYYY").format("MMM DD, YYYY")} -{" "}
              {dayjs(end_date, "DD/M/YYYY").format("MMM DD, YYYY")}
            </p>
            <p className="fw-bold eventname">{name}</p>
            <p className="eventtext-paragraph">{venue},</p>
            <p className="eventtext-paragraph">
              {city} {state}
            </p>
          </div>
        </div>
        <div ref={heartIconRef} className="heart-icon">
          {selectedEvent.includes(_id) ? <BsHeartFill /> : <BsHeart />}
        </div>
      </div>
    </div>
  );
}
