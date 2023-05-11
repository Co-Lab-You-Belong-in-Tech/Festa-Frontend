// import { useSelector } from "react-redux";
import {
  Badge,
  Button,
  // ButtonGroup,
  // Dropdown,
  // DropdownButton,
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsArrowLeftShort, BsHeart, BsBookmark } from "react-icons/bs";
// import { VscCheck } from "react-icons/vsc";
// import { RxQuestionMark } from "react-icons/rx";
import useFetch from "../../hooks/useFetch";

import "./EventDetails.css";
import { useCallback } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import LoadingScreen from "../../components/Loading";
// import ActionComponent from "./Action";
// import API_URL from "../../config";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import ActionComponent from "./Action";
dayjs.extend(customParseFormat);
// import { DateTime } from "luxon";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, loading, error] = useFetch(`/events/${id}`);

  // const { pathname, origin } = window.location;

  const copyToClipboard = useCallback(() => {
    const startdateString = start_date;
    const enddateString = end_date;
    const startdate = moment(startdateString, "DD-MM-YYYY").toDate();
    const enddate = moment(enddateString, "DD-MM-YYYY").toDate();
    console.log(enddate);

    const timeRegex = /(\d+)(am|pm) - (\d+)(am|pm) PT/;
    const match = time.match(timeRegex);

    const startHour = parseInt(match[1]) + (match[2] === "pm" ? 12 : 0);

    const endHour = parseInt(match[3]) + (match[4] === "pm" ? 12 : 0);

    const startDateObj = new Date(startdate);
    startDateObj.setHours(startHour); // Set the hours to 5 PM
    startDateObj.setMinutes(0); // Set the minutes to 0
    startDateObj.setSeconds(0);
    const startDateTime = startDateObj.toISOString();
    console.log(startDateTime, "start");

    const endDateObj = new Date(enddate);
    endDateObj.setHours(endHour); // Set the hours to 2 AM
    endDateObj.setMinutes(0); // Set the minutes to 0
    endDateObj.setSeconds(0);
    const endDateTime = endDateObj.toISOString();

    console.log(endDateTime, "end");

    const icsFileContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${startDateTime}
DTEND:${endDateTime}
SUMMARY:${name}
LOCATION:${venue}, ${city}, ${state}
DESCRIPTION:${name} at ${venue}
END:VEVENT
END:VCALENDAR`.replace(/\n\s*/g, "");

    const blob = new Blob([icsFileContent], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${name.replace(/\s/g, "")}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast("Event added to calendar");
  }, [data]);

  //   navigator.clipboard
  //     .writeText(`${origin}${pathname}`)
  //     .then(() => toast("Link copied to clipboard"));
  // }, []);

  if (!id) {
    return <div>No event selected</div>;
  }

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  const {
    name,
    start_date,
    end_date,
    venue,
    state,
    city,
    image,
    time,
    type,
    age_restriction,
    artists,
    lineup_link,
    promoter,
    ticket_buying_link,
    price,
  } = data;
  // const title = (
  //   <span>
  //     <BsBookmark /> <span style={{ marginLeft: "0.5rem" }}>Event</span>
  //   </span>
  // );

  // const handleDropdownSelection = (eventKey) => {
  //   switch (eventKey) {
  //     case "2":
  //       sendAction("interested");
  //       break;
  //     case "3":
  //       sendAction("maybe");
  //       break;
  //     case "4":
  //       sendAction("attending");
  //       break;
  //     default:
  //       break;
  //   }
  // };
  // const { token } = useSelector((state) => state.account);
  // const sendAction = (action) => {
  //   // Make a request to the backend API endpoint using fetch or axios
  //   fetch(`${API_URL}/api/v1/users/action/${id}?action=${action}`, {
  //     method: "PATCH",
  //     body: JSON.stringify({ action }),
  //     headers: {
  //       "Content-Type": "application/json",
  //       authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((response) => {
  //       // Handle response from the backend API
  //     })
  //     .catch((error) => {
  //       // Handle error from the backend API
  //     });
  // };

  return (
    <div>
      <div style={{ position: "relative" }}>
        <BsArrowLeftShort onClick={() => navigate(-1)} className="to-back" />
        {/* <img src="/assets/events/EDC Vegas 2023 1.png" alt="EDC Vegas" /> */}
        <span className="image-wrapper">
          <img src={image} alt={image} />
        </span>
      </div>

      <div className="details-wrapper mt-5 ">
        <div className="d-flex justify-content-between mb-3">
          <div className="eventtext  ">
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
          <div className="d-flex flex-column right-side">
            <div className="d-flex">
              <img
                onClick={copyToClipboard}
                src="/assets/events/Iconset/Share.svg"
                alt="share Icon"
              />
              <BsHeart />
            </div>
            <div>
              <Badge pill className="event-type">
                {type}
              </Badge>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between mt-3 ">
          <ActionComponent />
          {/* <div className="mb-2">
            {
              <DropdownButton
                as={ButtonGroup}
                id="dropdown-basic-button"
                title={title}
              >
                <Dropdown.Item eventKey="1"></Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  eventKey="2"
                  onClick={() => handleDropdownSelection("2")}
                >
                  <span>
                    <img src="/assets/events/Iconset/Star.svg" alt="" />
                  </span>{" "}
                  Interested
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  eventKey="3"
                  onClick={() => handleDropdownSelection("3")}
                >
                  <span>
                    <RxQuestionMark />
                  </span>{" "}
                  Maybe
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  eventKey="4"
                  onClick={() => handleDropdownSelection("4")}
                >
                  <span>
                    <VscCheck />
                  </span>{" "}
                  Attending
                </Dropdown.Item>
              </DropdownButton>
            }
          </div> */}
          <p className="fw-bold price">{price}</p>
        </div>
        <div>
          <h2>Highlighted Artists</h2>

          {artists.slice(0, 4).map((artist) => (
            <div key={artist.id} className="">
              <ul>
                <li>{artist}</li>
              </ul>
            </div>
          ))}

          <p>
            More Listed{" "}
            <span className="event-link">
              <Link to={lineup_link} target="_blank">
                HERE
              </Link>
            </span>
          </p>
        </div>
        <div>
          <p>
            <strong>Promoted by</strong>: <span>{promoter}</span>
          </p>
          <p>
            Age Restriction: <span>{age_restriction}</span> years
          </p>
        </div>
        <Link to={ticket_buying_link} target="_blank">
          <Button className="find-ticket">Find Tickets</Button>
        </Link>
      </div>
    </div>
  );
};

export default EventDetails;
