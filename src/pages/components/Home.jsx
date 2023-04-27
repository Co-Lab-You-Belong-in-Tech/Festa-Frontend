import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Form } from "react-bootstrap";
import "./Home.css";
import { GrSearch } from "react-icons/gr";
import { SlLocationPin } from "react-icons/sl";

const Home = () => {
  const [date, setDate] = useState(new Date());
  //   let month = date.getMonth().toLocaleString("default", { month: "long" });
  //   let day = date.getDay();
  //   let dateFormat = `${month} ${day}`;
  return (
    <div className="container">
      <p className="text-white">Hi Julia,</p>
      <p className="text-white">Get started with your EDM journey!</p>
      <Form className="d-flex form-search">
        <span>
          <GrSearch className="text-white search-icon" />
        </span>
        <Form.Control
          type="search"
          placeholder="Search artist"
          className="me-2 search-form"
          aria-label="Search"
        />

        {/* <Button variant="outline-success">Search</Button> */}
      </Form>
      <div className="calendar-container">
        <Calendar onChange={setDate} value={date} calendarType="US" />
      </div>
      <div className="d-flex align-items-center ">
        <div className="d-flex align-items-center map">
          <SlLocationPin className="map-pin" />
          <p>Saint Paul, MN</p>
        </div>
        <div className="d-flex date">
          <img src="/public/assets/discover/calendar.svg" alt="calendar-logo" />
          <p>{date.toDateString()}</p>
        </div>
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
