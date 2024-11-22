import "./search-bar.scss";

const SearchBar = ({ value, onChange }) => {
  return (
    // <div size = "big-screen">
    <input
      className="search-bar"
      type="text"
      placeholder="&#128270; Rechercher des articles"
      value={value}
      onChange={onChange}
    />
    // </div>
  );
};

export default SearchBar;
