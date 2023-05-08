import {
  Badge,
  Button,
  ButtonGroup,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsArrowLeftShort, BsHeart, BsBookmark } from "react-icons/bs";
import { VscCheck } from "react-icons/vsc";
import { RxQuestionMark } from "react-icons/rx";
import useFetch from "../../hooks/useFetch";

import "./EventDetails.css";
import { useCallback } from "react";
import { toast } from "react-toastify";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, loading, error] = useFetch(`/events/${id}`);

  const { pathname, origin } = window.location;

  const copyToClipboard = useCallback(() => {
    navigator.clipboard
      .writeText(`${origin}${pathname}`)
      .then(() => toast("Link copied to clipboard"));
  }, []);

  if (!id) {
    return <div>No event selected</div>;
  }

  if (loading) {
    return <h1>Loading</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  // // Find the event with the matching id
  // const event = events.find((event) => event._id === parseInt(_id));

  // if (!event) {
  //   return <div>Event not found</div>;
  // }

  // Access the properties of the event object
  const {
    name,
    date,
    venue,
    city,
    image,
    type,
    age_restriction,
    artists,
    promoter,
    ticket_buying_link,
    price,
  } = data;
  const title = (
    <span>
      <BsBookmark /> <span style={{ marginLeft: "0.5rem" }}>Event</span>
    </span>
  );

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
            <p className="eventtext-paragraph">{date}</p>
            <p className="fw-bold eventname">{name}</p>
            <p className="eventtext-paragraph">{venue}</p>
            <p className="eventtext-paragraph">{city}</p>
          </div>
          <div className="d-flex flex-column right-side">
            <div className="d-flex" onClick={copyToClipboard}>
              <img
                src="/public/assets/events/Iconset/Share.svg"
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
          <div className="mb-2">
            {
              <DropdownButton
                as={ButtonGroup}
                id="dropdown-basic-button"
                title={title}
              >
                <Dropdown.Item eventKey="1"></Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="2">
                  <span>
                    <img src="/assets/events/Iconset/Star.svg" alt="" />
                  </span>{" "}
                  Interested
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="3">
                  <span>
                    <RxQuestionMark />
                  </span>{" "}
                  Maybe
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="4">
                  <span>
                    <VscCheck />
                  </span>{" "}
                  Attending
                </Dropdown.Item>
              </DropdownButton>
            }
          </div>
          <p className="fw-bold price">{price.split(" - ")[0]}</p>
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
              <a href="https://lasvegas.electricdaisycarnival.com/lineup/">
                HERE
              </a>
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
        <Link to={ticket_buying_link}>
          <Button className="find-ticket">Find Tickets</Button>
        </Link>
      </div>
    </div>
  );
};

export default EventDetails;
