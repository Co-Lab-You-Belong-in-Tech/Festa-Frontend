import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// import useFetch from "../../hooks/useFetch";
import { Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";
import { VscCheck } from "react-icons/vsc";
import { RxQuestionMark } from "react-icons/rx";
import { BsBookmark } from "react-icons/bs";
import API_URL from "../../config";

function ActionComponent() {
  const { id } = useParams();
  //   const [data] = useFetch(`/events/${id}`);
  const handleDropdownSelection = (eventKey) => {
    switch (eventKey) {
      case "2":
        sendAction("interested");
        break;
      case "3":
        sendAction("maybe");
        break;
      case "4":
        sendAction("attending");
        break;
      default:
        break;
    }
  };
  const { token } = useSelector((state) => state.account);
  const sendAction = (action) => {
    // Make a request to the backend API endpoint using fetch or axios
    fetch(`${API_URL}/api/v1/users/action/${id}?action=${action}`, {
      method: "PATCH",
      body: JSON.stringify({ action }),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        // Handle response from the backend API
      })
      .catch((error) => {
        // Handle error from the backend API
      });
  };

  const title = (
    <span>
      <BsBookmark /> <span style={{ marginLeft: "0.5rem" }}>Event</span>
    </span>
  );

  return (
    <div className="mb-2">
      <DropdownButton as={ButtonGroup} id="dropdown-basic-button" title={title}>
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
    </div>
  );
}

export default ActionComponent;
