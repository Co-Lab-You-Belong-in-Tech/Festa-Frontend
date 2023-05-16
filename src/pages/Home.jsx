import { useState, useEffect, useContext, useCallback } from "react";
import { useSelector } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import "./Home.css";
import { LocationContext } from "./LocationContext";
import Recommended from "./Home Components/Recommend";
import { GrSearch } from "react-icons/gr";
import API_URL from "../config";

import { SlLocationPin } from "react-icons/sl";

import axios from "axios";

import AppLayout from "../components/Layout/AppLayout";
import useFetch from "../hooks/useFetch";

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

const Home = () => {
  const { location } = useContext(LocationContext);

  const formatter = Intl.DateTimeFormat("en-us", {
    month: "long",
    day: "numeric",
  });

  const [value, onChange] = useState(null);
  const formattedDate = value ? formatter.format(value) : null;
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

  const [data, , , mutate] = useFetch("/users/me");

  const { token } = useSelector((state) => state.account);

  const selectedEvent =
    data?.data?.user?.favorite_events?.map((event) => event._id) ?? [];

  const updateSelectedEventList = useCallback(
    async (id) => {
      // his api is on point now
      try {
        const response = await axios.post(
          `${API_URL}/api/v1/users/favorite-event`,
          {
            events: [id],
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          await mutate();
        }
      } catch (error) {
        console.error(error);
      }
    },
    [selectedEvent, token, mutate]
  );

  const [toastData, setToastData] = useState({ text: "", show: false });

  const [searchQuery, setSearchQuery] = useState("");

  const { isLoggedIn, register_success } = useSelector(
    (state) => state.account
  );
  const account = useSelector((state) => state.account);

  return (
    <AppLayout>
      <div className="home-wrapper ">
        <p className=" container fw-bold">
          Hi {(isLoggedIn || register_success) && account?.name?.split(" ")[0]},
        </p>
        <p className="container">Get started with your EDM journey!</p>
        <div className="d-md-grid d-block">
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
            <div
              className="d-flex align-items-center map "
              onClick={handleMapShow}
            >
              <>
                <div className="d-flex gap-1">
                  <SlLocationPin className="map-pin" />
                  {location.city && location.state && location.zipcode ? (
                    <span>
                      {location.city}, {location.state}
                    </span>
                  ) : (
                    <span>Pick location</span>
                  )}
                </div>
              </>
            </div>
            <div className="d-flex date " onClick={handleShow}>
              <img src="/assets/discover/calendar.svg" alt="calendar-logo" />
              <p className="m-0 text-uppercase">{formattedDate}</p>
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
        </div>

        <Recommended
          calenderFilterDate={value}
          searchQuery={searchQuery}
          selectedEvent={selectedEvent}
          updateSelectedEventList={updateSelectedEventList}
        />
        <Toast {...toastData} />
      </div>
    </AppLayout>
  );
};

export default Home;

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
          {location.city}, {location.state}
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
