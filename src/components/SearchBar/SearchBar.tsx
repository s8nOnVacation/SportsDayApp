import debounce from "../../utilities/debounce";
import "./SearchBar.css";

interface SearchBarProps {
  handleSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar(props: SearchBarProps) {
  const { handleSearchInputChange } = props;
  return (
    <div className="SearchBar">
      <i className="fa fa-search"></i>
      <input
        type="search"
        className="searchEvent"
        placeholder="Enter Event Name"
        onChange={(e) => debounce(handleSearchInputChange(e), 5000)}
      />
    </div>
  );
}
