// import "../styles/styles.css";
import { SportsEventsResponse } from "../../App.types";
import SelectButton from "../SelectButton/SelectButton";
import { convertTo12HrsTimeFormat } from "../../utilities/timeConverter";
import throttle from "../../utilities/throttle";
import "./EventCard.css";

interface EventCardProps {
  item: SportsEventsResponse;
  btnType: "select" | "remove";
  eventTimeOverlapping: boolean;
  handleSelectEvent?: (item: SportsEventsResponse) => void;
  handleRemoveEvent?: (item: SportsEventsResponse) => void;
}

export default function EventCard(props: EventCardProps) {
  const {
    item,
    btnType,
    eventTimeOverlapping,
    handleSelectEvent,
    handleRemoveEvent
  } = props;

  const onBtnClick = () => {
    if (btnType === "select" && handleSelectEvent) {
      handleSelectEvent(item);
    } else if (btnType === "remove" && handleRemoveEvent) {
      handleRemoveEvent(item);
    }
  };

  return (
    <div
      className={`EventCard ${
        eventTimeOverlapping ? "eventUnselectable" : "eventSelectable"
      }`}
      id={String(item.id)}
    >
      <div className="EventCategory">{item.event_category.charAt(0)}</div>
      <div className="EventDetails">
        <span style={{ fontWeight: "bold" }}>{item.event_name}</span>
        <span>({item.event_category})</span>
        <span>
          {convertTo12HrsTimeFormat(item.start_time)}-
          {convertTo12HrsTimeFormat(item.end_time)}
        </span>
        <SelectButton
          btnType={btnType}
          onBtnClick={throttle(onBtnClick, 3000)}
          btnClass="selectRemoveBtn"
          disabled={eventTimeOverlapping}
        />
      </div>
    </div>
  );
}
