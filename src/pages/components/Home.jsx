import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Alert, Button, Form, InputGroup, Modal } from "react-bootstrap";
import "./Home.css";
import { GrSearch } from "react-icons/gr";
import { SlLocationPin } from "react-icons/sl";

const Home = () => {
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  const formatter = Intl.DateTimeFormat("en-us", {
    month: "long",
    day: "numeric",
  });

  const [value, onChange] = useState(new Date());
  const formattedDate = formatter.format(value);
  useEffect(() => {
    console.log(formatter.format(value));
  }, [value]);

  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

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

  const handleMapClose = () => setShowMap(false);

  return (
    <div className="">
      <p className=" container fw-bold">Hi Julia,</p>
      <p className="container">Get started with your EDM journey!</p>
      <Form className="d-flex form-search container">
        <div className="input-group">
          <div className="input-group-text search-wrapper bg-white">
            <GrSearch className="text-white search-icon" />
          </div>
          <Form.Control
            type="search"
            input
            placeholder="Search all events"
            className="me-2 search-form"
            aria-label="Search"
          />
        </div>

        {/* <Button variant="outline-success">Search</Button> */}
      </Form>

      <div className="d-flex align-items-center select">
        <div className="d-flex align-items-center map" onClick={handleMapShow}>
          <SlLocationPin className="map-pin " />
          <p>Saint Paul, MN</p>
        </div>
        <div className="d-flex date" onClick={handleShow}>
          <img src="/public/assets/discover/calendar.svg" alt="calendar-logo" />
          <p>{formattedDate}</p>
        </div>

        <Modal
          className="modal"
          show={showMap}
          fullscreen={fullscreen}
          onHide={() => setShowMap(false)}
        >
          <Modal.Header className="modal-header" closeButton>
            <Modal.Title className="fw-bold text-center">
              Select Location
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex align-items-center map">
              <SlLocationPin className="map-pin " />
              <p>Saint Paul, MN</p>
            </div>
            <p className="fw-bold location">Add New Location</p>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Your ZIP Code"
                aria-label="Your ZIP Code"
                aria-describedby="basic-addon1"
                className="zip-input"
                value={values}
                onChange={handleChange}
                required
              />
            </InputGroup>
            {/* <Alert
              color="primary"
              dismissible
              visible={visible}
              onClose={() => setVisible(false)}
            >
              Saved Successfully
            </Alert> */}
            <div className="btn-wrap">
              <Button className="save-btn-zip" onClick={handleMapClose}>
                Save
              </Button>
            </div>
          </Modal.Body>
        </Modal>

        <Modal
          className="modal"
          show={show}
          fullscreen={fullscreen}
          onHide={() => setShow(false)}
        >
          <Modal.Header className="modal-header" closeButton>
            <Modal.Title className="fw-bold text-center">
              Select Date
            </Modal.Title>
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
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <p className="fw-bold ">Recommended for you</p>
        <a href="" className="text-decoration-none text-white">
          View More
        </a>
      </div>
    </div>
  );
};

export default Home;
