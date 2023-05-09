import AppLayout from "../components/Layout/AppLayout";
import { notifications } from "../components/data/NotificationsData";
import "./Notification.css";

const Notification = () => {
  return (
    <AppLayout>
      <div>
        <h1 className="text-center notification-heading">Notifications</h1>
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="notificationlist d-flex align-items-center justify-content-between"
          >
            <div className="d-flex align-items-center justify-content-center">
              <div className="">
                <img
                  src={notification.image}
                  alt="notificationimage"
                  className="notificationimage"
                />
              </div>
              <div>
                <p className="text-white">{notification.name}</p>
                <p>{notification.detail}</p>
              </div>
            </div>
            <div className="d-flex flex-column align-items-center gap-1">
              <p>{notification.date}</p>
              <img src="/assets/notifications/Iconset/trash.svg" alt="" />
            </div>
          </div>
        ))}

        {notifications.length == 0 && (
          <div className="text-center no-result">No Notifications</div>
        )}
      </div>
    </AppLayout>
  );
};

export default Notification;
