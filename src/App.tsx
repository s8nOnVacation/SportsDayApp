import "./styles/styles.css";
import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { SportsEventsResponse } from "./App.types";
import EventCardWrapper from "./components/EventCard/EventCardWrapper";
import SearchBar from "./components/SearchBar/SearchBar";
import QuickFilters from "./components/QuickFilters/QuickFilters";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  toast.clearWaitingQueue();
  const getPosts = async () => {
    const results = await fetch(
      "https://run.mocky.io/v3/2744c231-8991-4ae8-bc45-1f645437585a"
    );
    return results.json();
  };

  const { data = [], status, error } = useQuery<SportsEventsResponse[], Error>(
    "sportsEvents",
    () => getPosts()
  );

  const [unselectedEventsList, setUnselectedEventsList] = useState<
    SportsEventsResponse[]
  >([]);

  const [localEventsList, setLocalEventsList] = useState<
    SportsEventsResponse[]
  >([]);

  const [selectedEventsList, setSelectedEventsList] = useState<
    SportsEventsResponse[]
  >([]);

  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  useEffect(() => {
    if (status === "success") {
      setUnselectedEventsList(data);
    }
  }, [status, data]);

  function handleSelectEvent(item: SportsEventsResponse) {
    if (selectedEventsList.length < 3) {
      const newSelectedList = selectedEventsList.concat(item);
      const newUnselectedList = unselectedEventsList.filter(
        (event) => event.id !== item.id
      );
      setSelectedEventsList(newSelectedList);
      setUnselectedEventsList(newUnselectedList);
    } else {
      toast.error("Cannot select more than 3 events", {
        position: "bottom-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
    }
  }

  function handleRemoveEvent(item: SportsEventsResponse) {
    const newSelectedList = selectedEventsList.filter(
      (event) => event.id !== item.id
    );
    const newUnselectedList = unselectedEventsList.concat(item);
    setSelectedEventsList(newSelectedList);
    setUnselectedEventsList(newUnselectedList);
  }

  function handleSearchInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const searchResults = unselectedEventsList.filter((item) =>
      item.event_name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    if (event.target.value.length > 0 && searchResults.length === 0) {
      toast.info("No Search Result Found", {
        position: "bottom-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
    }
    setLocalEventsList(searchResults);
  }

  function handleCategorySelect(category: string) {
    if (category === "all") {
      setSelectedFilters([]);
    } else if (selectedFilters.includes(category)) {
      setSelectedFilters(selectedFilters.filter((item) => item !== category));
    } else setSelectedFilters([...selectedFilters, category]);
  }

  useEffect(() => {
    setLocalEventsList(
      unselectedEventsList.filter((item) =>
        selectedFilters.length > 0
          ? selectedFilters.some((category) => item.event_category === category)
          : unselectedEventsList
      )
    );
  }, [selectedFilters, unselectedEventsList]);

  const eventCategoriesList = useMemo(() => {
    return data.reduce((acc: string[], curr) => {
      if (!acc.includes(curr.event_category)) acc.push(curr.event_category);
      return acc;
    }, []);
  }, [data]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>{error!.message}</div>;
  }

  return (
    <div className="App">
      <section className="AllEventsSection">
        <h3>All Events</h3>
        <SearchBar handleSearchInputChange={handleSearchInputChange} />
        <QuickFilters
          selectedFilters={selectedFilters}
          eventCategoriesList={eventCategoriesList}
          handleCategorySelect={handleCategorySelect}
        />
        <EventCardWrapper
          handleSelectEvent={handleSelectEvent}
          unselectedEventsList={
            localEventsList.length > 0 ? localEventsList : unselectedEventsList
          }
          selectedEventsList={selectedEventsList}
        />
      </section>

      <section className="SelectedEventsSection">
        <h3>Selected Events</h3>
        <EventCardWrapper
          handleRemoveEvent={handleRemoveEvent}
          listType="selected"
          unselectedEventsList={unselectedEventsList}
          selectedEventsList={selectedEventsList}
          showSubmitButton={true}
        />
      </section>

      <ToastContainer limit={1} />
    </div>
  );
}
