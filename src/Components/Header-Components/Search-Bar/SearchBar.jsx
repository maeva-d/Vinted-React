import "./search-bar.scss";

const SearchBar = ({ value, onChange, onKeyDown }) => {
  return (
    <input
      className="search-bar"
      type="text"
      placeholder="&#128270; Rechercher des articles"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
};

export default SearchBar;
