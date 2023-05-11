import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
export const createICSFile = () => {
  const { id } = useParams();
  const [data] = useFetch(`/events/${id}`);
  const { name, start_date, end_date, venue, state, city } = data;
  const startDate = new Date(start_date);
  const endDate = new Date(end_date);
  const formattedStartDate = startDate.toISOString().replace(/-|:|\.\d+/g, "");
  const formattedEndDate = endDate.toISOString().replace(/-|:|\.\d+/g, "");

  const calendar = `BEGIN:VCALENDAR
  VERSION:2.0
  BEGIN:VEVENT
  SUMMARY:${name}
  DTSTART:${formattedStartDate}
  DTEND:${formattedEndDate}
  LOCATION:${venue}, ${city} ${state}
  END:VEVENT
  END:VCALENDAR`;

  const element = document.createElement("a");
  const file = new Blob([calendar], { type: "text/calendar" });
  element.href = URL.createObjectURL(file);
  element.download = `${name}.ics`;
  document.body.appendChild(element);
  element.click();
};
