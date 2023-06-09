import "../../pages/Notification/Notification.css";
export const notifications = [
  {
    image: "/assets/notifications/EDC.png",
    name: "EDC Las Vegas",
    detail: (
      <span>
        Tickets are now on sale! Get it{" "}
        <a href="#" className="ticketlink">
          HERE
        </a>
      </span>
    ),
    date: "FEB 02",
    id: 1,
  },
  {
    image: "/assets/notifications/Coachella.png",
    name: "Coachella Weekend 1",
    detail: "Are you still  interested in this event?",
    date: "FEB 02",
    id: 2,
  },
  {
    image: "/assets/notifications/Beyond.png",
    name: "Beyond Wonderland",
    detail: "You favorited an event!",
    date: "FEB 02",
    id: 3,
  },
];
