import { Badge, Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsArrowLeftShort, BsHeart } from "react-icons/bs";

import useFetch from "../../hooks/useFetch";

import "./EventDetails.css";
import { useCallback } from "react";
import { toast } from "react-toastify";
import moment from "moment-timezone";
import LoadingScreen from "../../components/Loading";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import ActionComponent from "./Action";
dayjs.extend(customParseFormat);

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, loading, error] = useFetch(`/events/${id}`);

  const copyToClipboard = useCallback(() => {
    const { name, start_date, end_date, venue, state, city, time } = data;

    // Get start and end times in PT
    const [start_time_str, end_time_str] = time.split(" - ");
    const start_time_moment = moment.tz(
      `${start_date} ${start_time_str}`,
      "DD-MM-YYYY h:mma",
      "America/Los_Angeles"
    );

    const end_time_moment = moment.tz(
      `${end_date} ${end_time_str}`,
      "DD-MM-YYYY h:mma",
      "America/Los_Angeles"
    );

    const start_utc = start_time_moment.utc().format("YYYYMMDDTHHmmSS[Z]");
    const end_utc = end_time_moment.utc().format("YYYYMMDDTHHmmSS[Z]");
    console.log(start_utc, "start_utc");
    console.log(end_utc, "end_utc");
    const icsFileContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${start_utc}
DTEND:${end_utc}
SUMMARY:${name}
LOCATION:${venue}, ${city}, ${state}
DESCRIPTION:${name} at ${venue}
END:VEVENT
END:VCALENDAR`;

    // Create download link and trigger click
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

    // Show success message
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
    type,
    age_restriction,
    artists,
    lineup_link,
    promoter,
    ticket_buying_link,
    price,
  } = data;

  return (
    <div>
      <div style={{ position: "relative" }}>
        <BsArrowLeftShort onClick={() => navigate(-1)} className="to-back" />

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
