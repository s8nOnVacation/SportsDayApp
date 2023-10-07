import React from "react";
import PillButton from "../PillButton/PillButton";
import "./QuickFilters.css";

interface QuickFiltersProps {
  selectedFilters: string[];
  eventCategoriesList: string[];
  handleCategorySelect: (category: string) => void;
}

function QuickFilters(props: QuickFiltersProps) {
  const { selectedFilters, eventCategoriesList, handleCategorySelect } = props;
  return (
    <div className="FilterPillsWrapper">
      <span>Categories</span>
      <span className="FilterPills">
        <PillButton
          key={"all"}
          item={"All"}
          selectedList={selectedFilters}
          handlePillClick={() => handleCategorySelect("all")}
          showCrossIconOnSelection={false}
          pillBtnClass={
            selectedFilters.length === 0 ||
            selectedFilters.length === eventCategoriesList.length
              ? "selectedFilter"
              : "unselectedFilter"
          }
        />
        {eventCategoriesList.map((item) => {
          return (
            <PillButton
              key={item}
              item={item}
              selectedList={selectedFilters}
              handlePillClick={() => handleCategorySelect(item)}
              showCrossIconOnSelection={true}
              pillBtnClass={
                selectedFilters.includes(item)
                  ? "selectedFilter"
                  : "unselectedFilter"
              }
            />
          );
        })}
      </span>
    </div>
  );
}

export default React.memo(QuickFilters);
