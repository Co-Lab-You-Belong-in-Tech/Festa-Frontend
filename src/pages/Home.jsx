import { useState, useEffect, useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import "./Home.css";
import { LocationContext } from "./LocationContext";
import { GrSearch } from "react-icons/gr";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import { events, Upcomingevents } from "../components/data/Eventsdata";
import { Link } from "react-router-dom";
import axios from "axios";

// import AppLayout from "../components/Layout/AppLayout";

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

const Home = () => {
  const { location } = useContext(LocationContext);
  // const location = useLocation();
  // const city = location?.state?.city;
  // const state = location?.state?.state;
  // console.log(city);

  const formatter = Intl.DateTimeFormat("en-us", {
    month: "long",
    day: "numeric",
  });

  const [value, onChange] = useState(new Date());
  const formattedDate = formatter.format(value);
  useEffect(() => {}, [value]);

  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setToastData({
      text: "Saved Successfully",
      show: true,
    });

    setTimeout(() => {
      setToastData({
        text: "Saved Successfully",
        show: false,
      });
    }, 2000);
  };

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  const [values, setValue] = useState("");

  const handleChange = (event) => {
    const result = event.target.value.replace(/\D/g, "");

    setValue(result);
  };

  const [showMap, setShowMap] = useState(false);

  function handleMapShow(breakpoint) {
    setFullscreen(breakpoint);
    setShowMap(true);
  }

  const handleMapClose = () => {
    setShowMap(false);
    setToastData({
      text: "Saved Successfully",
      show: true,
    });

    setTimeout(() => {
      setToastData({
        text: "Saved Successfully",
        show: false,
      });
    }, 2000);
  };

  const [selectedEvent, setselectedEvent] = useState([]);

  function updateSelectedEventList(id) {
    if (!selectedEvent.includes(id)) {
      setselectedEvent((prev) => [...prev, id]);
    } else {
      setselectedEvent((prev) => prev.filter((eventId) => eventId !== id));
    }
  }

  const [toastData, setToastData] = useState({ text: "", show: false });

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="home-wrapper">
      <p className=" container fw-bold">Hi Julia,</p>
      <p className="container">Get started with your EDM journey!</p>
      <Form className="d-flex form-search container">
        <div className="input-group">
          <div className="input-group-text search-wrapper bg-white">
            <GrSearch className="text-white search-icon" />
          </div>
          <Form.Control
            type="search"
            placeholder="Search all events"
            className="me-2 search-form"
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* <Button variant="outline-success">Search</Button> */}
      </Form>

      <div className="d-flex align-items-center select mt-4">
        <div className="d-flex align-items-center map " onClick={handleMapShow}>
          <SlLocationPin className="map-pin " />
          <span>
            {location.city}, {location.state}
          </span>
        </div>
        <div className="d-flex date " onClick={handleShow}>
          <img src="/public/assets/discover/calendar.svg" alt="calendar-logo" />
          <p className="m-0">{formattedDate}</p>
        </div>
        <LocationModal
          showMap={showMap}
          setShowMap={setShowMap}
          fullscreen={fullscreen}
          values={values}
          handleChange={handleChange}
          handleMapClose={handleMapClose}
        />
        <CalendarModal
          show={show}
          setShow={setShow}
          fullscreen={fullscreen}
          value={value}
          onChange={onChange}
          handleClose={handleClose}
        />
      </div>

      <Recommended
        searchQuery={searchQuery}
        selectedEvent={selectedEvent}
        updateSelectedEventList={updateSelectedEventList}
      />
      <Toast {...toastData} />
    </div>
  );
};

export default Home;

function Recommended({ searchQuery, selectedEvent, updateSelectedEventList }) {
  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredUpcomingEvents = Upcomingevents.filter((upcomingevent) =>
    upcomingevent.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center event-list-header">
        <p className="fw-bold ">Recommended for you</p>
        <Link
          to="/discover/recommended"
          className="view-more-button text-decoration-none text-white"
        >
          View More
        </Link>
      </div>
      {filteredEvents.slice(0, 4).map((event) => (
        <div key={event.id} className="eventlist">
          <div className="d-flex justify-between align-start w-100 gap-2">
            <div className="d-flex gap-3 align-center flex-grow-1">
              <div>
                <img
                  src={event.image}
                  alt="eventimage"
                  className="eventimage"
                />
              </div>
              <div className="eventtext">
                <p className="eventtext-paragraph">{event.date}</p>
                <p className="fw-bold eventname">{event.name}</p>
                <p className="eventtext-paragraph">{event.venue}</p>
                <p className="eventtext-paragraph">{event.city}</p>
              </div>
            </div>
            <div className="" onClick={() => updateSelectedEventList(event.id)}>
              {selectedEvent.includes(event.id) ? <BsHeartFill /> : <BsHeart />}
            </div>
          </div>
        </div>
      ))}

      <div className="d-flex justify-content-between align-items-center event-list-header">
        <p className="fw-bold ">Upcoming Events</p>
        <Link
          to="/discover/upcoming-events"
          className="view-more-button text-decoration-none text-white"
        >
          View More
        </Link>
      </div>
      {filteredUpcomingEvents.slice(0, 4).map((upcomingevent) => (
        <div key={upcomingevent.id} className="eventlist">
          <div className="d-flex justify-between align-start w-100 gap-2">
            <div className="d-flex gap-3 align-center flex-grow-1">
              <div>
                <img
                  src={upcomingevent.image}
                  alt="eventimage"
                  className="eventimage"
                />
              </div>
              <div className="eventtext">
                <p className="eventtext-paragraph">{upcomingevent.date}</p>
                <p className="fw-bold eventname">{upcomingevent.name}</p>
                <p className="eventtext-paragraph">{upcomingevent.venue}</p>
                <p className="eventtext-paragraph">{upcomingevent.city}</p>
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
  );
}

function CalendarModal({
  show,

  setShow,
  value,
  onChange,
  handleClose,
}) {
  return (
    <Modal className="modal" show={show} onHide={() => setShow(false)}>
      <Modal.Header className="modal-header" closeButton>
        <Modal.Title className="fw-bold text-center">Select Date</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="calendar-container">
          <Calendar
            value={value}
            onChange={onChange}
            calendarType="US"
            formatShortWeekday={(locale, date) =>
              weekDays[new Date(date).getDay()]
            }
          />
        </div>
        {/* <Alert
          color="primary"
          dismissible
          visible={visible}
          onClose={() => setVisible(false)}
        >
          Saved Successfully
        </Alert> */}
        <div className="btn-wrap">
          <Button className="save-btn" onClick={handleClose}>
            Save
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export function LocationModal({ showMap, setShowMap, handleMapClose }) {
  const { location, updateLocation } = useContext(LocationContext);
  const [zipcode, setZipcode] = useState("");

  const handleZipcodeChange = (e) => {
    setZipcode(e.target.value);
  };

  const handleLookup = async () => {
    try {
      const response = await axios.get(
        `https://api.zippopotam.us/us/${zipcode}`
      );
      const city = response.data.places[0]["place name"];
      const state = response.data.places[0]["state abbreviation"];
      return { city, state, zipcode };
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const onClickHandler = async () => {
    handleMapClose();
    try {
      const { city, state, zipcode } = await handleLookup();
      updateLocation(city, state, zipcode);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <Modal className="modal" show={showMap} onHide={() => setShowMap(false)}>
      <Modal.Header className="modal-header" closeButton>
        <Modal.Title className="fw-bold text-center">
          Select Location
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex align-items-center Modalmap">
          <SlLocationPin className="map-pin" />
          <span>
            {location.city}, {location.state}
          </span>
        </div>
        <p className="fw-bold location">Add New Location</p>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Your ZIP Code"
            aria-label="Your ZIP Code"
            aria-describedby="basic-addon1"
            className="zip-input"
            value={zipcode}
            onChange={handleZipcodeChange}
            required
          />
        </InputGroup>
        <div className="btn-wrap">
          <Button className="save-btn-zip" onClick={onClickHandler}>
            Save
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

function Toast({ text, show }) {
  return (
    show && (
      <div className="toast-wrapper">
        <div className="toast-content">
          <p>{text}</p>
        </div>
      </div>
    )
  );
}
