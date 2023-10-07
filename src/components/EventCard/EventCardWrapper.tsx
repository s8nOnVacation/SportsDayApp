import EventCard from "./EventCard";
import { SportsEventsResponse } from "../../App.types";
import timeOverlapCheck from "../../utilities/timeOverlapCheck";
import SelectButton from "../SelectButton/SelectButton";
import { useNavigate } from "react-router-dom";
import "./EventCard.css";
import { toast } from "react-toastify";

interface EventCardWrapperProps {
  listType?: "selected" | "unselected";
  unselectedEventsList: SportsEventsResponse[];
  selectedEventsList: SportsEventsResponse[];
  handleSelectEvent?: (item: SportsEventsResponse) => void;
  handleRemoveEvent?: (item: SportsEventsResponse) => void;
  showSubmitButton?: boolean;
}

export default function EventCardWrapper(props: EventCardWrapperProps) {
  const {
    listType = "unselected",
    unselectedEventsList,
    selectedEventsList,
    handleSelectEvent,
    handleRemoveEvent,
    showSubmitButton = false
  } = props;

  let navigate = useNavigate();

  const handleSubmitClick = () => {
    let studentId = prompt("Enter your student id");
    if (studentId !== null) {
      localStorage.setItem(studentId, JSON.stringify(selectedEventsList));
      //Make api call here to submit the student id and his selections
      navigate(`/selectionSuccess/${studentId}`, { replace: true });
    } else {
      toast.error("Student ID is required for submitting the selections", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
    }
  };

  return (
    <div className={listType + "_Section"}>
      <div className="EventCardWrapper">
        {(listType === "selected"
          ? selectedEventsList
          : unselectedEventsList
        )?.map((item) => {
          return (
            <EventCard
              key={item.id}
              item={item}
              btnType={listType === "selected" ? "remove" : "select"}
              eventTimeOverlapping={
                listType === "unselected" &&
                timeOverlapCheck(selectedEventsList, item)
              }
              handleSelectEvent={handleSelectEvent}
              handleRemoveEvent={handleRemoveEvent}
            />
          );
        })}
      </div>

      {showSubmitButton && (
        <div className="submitBtnWrapper">
          <SelectButton
            btnType={"submit"}
            onBtnClick={handleSubmitClick}
            btnClass="submitBtn"
            disabled={![1, 2, 3].includes(selectedEventsList.length)}
          />
        </div>
      )}
    </div>
  );
}
