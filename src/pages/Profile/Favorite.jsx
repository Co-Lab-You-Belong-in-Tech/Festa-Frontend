import dayjs from "dayjs";
import { events } from "../../components/data/Eventsdata";
import { BsHeartFill } from "react-icons/bs";
const Favorite = () => {
  return (
    <div>
      {events.slice(0, 4).map((event) => (
        <div className="row" key={event.id}>
          <div className="col-12 col-md-6 md-p-3">
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
                <div className="">
                  <BsHeartFill />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {events.length === 0 && (
        <p className="text-center no-result">No Favorite Event </p>
      )}
    </div>
  );
};

export default Favorite;
