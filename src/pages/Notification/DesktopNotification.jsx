// import { Button, OverlayTrigger, Popover} from 'react-bootstrap';
// import AppLayout from "../../components/Layout/AppLayout";
// import { notifications } from "../../components/data/NotificationsData";
// import "./Notification.css";

// const DesktopNotification = () => {
// const [showPopover, setShowPopover] = useState(false);

// const handlePopoverClose = () => {
//   setShowPopover(false);
// };

// const handlePopoverOpen = () => {
//   setShowPopover(true);
// };
//   return (
//     <AppLayout>
//       <div>
//         <h1 className="text-center notification-heading">Notifications</h1>
//         {notifications.map((notification) => (
//           <div
//             key={notification.id}
//             className="notificationlist d-flex align-items-center justify-content-between"
//           >
//             <div className="d-flex align-items-center justify-content-center">
//               <div className="">
//                 <img
//                   src={notification.image}
//                   alt="notificationimage"
//                   className="notificationimage"
//                 />
//               </div>
//               <div>
//                 <p className="text-white">{notification.name}</p>
//                 <p>{notification.detail}</p>
//               </div>
//             </div>
//             <div className="d-flex flex-column align-items-center gap-1">
//               <p>{notification.date}</p>
//               <img src="/assets/notifications/Iconset/trash.svg" alt="" />
//             </div>
//           </div>
//         ))}

//         {notifications.length == 0 && (
//           <div className="text-center no-result">No Notifications</div>
//         )}
//       </div>
//     </AppLayout>
//   );
// };

// export default DesktopNotification;

// import Button from 'react-bootstrap/Button';
// import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
// import Popover from 'react-bootstrap/Popover';

// const popover = (
//   <Popover id="popover-basic">
//     <Popover.Header as="h3">Popover right</Popover.Header>
//     <Popover.Body>
//       And here's some <strong>amazing</strong> content. It's very engaging.
//       right?
//     </Popover.Body>
//   </Popover>
// );

// const Example = () => (
//   <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
//     <Button variant="success">Click me to see</Button>
//   </OverlayTrigger>
// );

// render(<Example />);

import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { notifications } from "../../components/data/NotificationsData";
import "./Notification.css";
import AppLayout from "../../components/Layout/AppLayout";

const DesktopNotification = () => {
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Notifications</Popover.Header>
      <Popover.Body>
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
      </Popover.Body>
    </Popover>
  );

  return (
    <AppLayout>
      <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
        <Button variant="success">Click me to see</Button>
      </OverlayTrigger>
    </AppLayout>
  );
};

export default DesktopNotification;
