import { SportsEventsResponse } from "../App.types";

export default function timeOverlapCheck(
  listOfEvents: SportsEventsResponse[],
  eventData: SportsEventsResponse
) {
  const eventStartTime = new Date(eventData.start_time).getTime();
  const eventEndTime = new Date(eventData.end_time).getTime();

  for (let i of listOfEvents) {
    const itemStartTime = new Date(i.start_time).getTime();
    const itemEndTime = new Date(i.end_time).getTime();
    if (
      Math.max(
        Math.min(itemEndTime, eventEndTime) -
          Math.max(itemStartTime, eventStartTime),
        0
      ) > 0
    ) {
      return true;
    }
  }
  return false;
}
