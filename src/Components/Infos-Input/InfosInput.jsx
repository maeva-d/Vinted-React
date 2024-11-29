import "./infos-input.scss";

const InfosInput = ({ id, type, placeholder, value, onChange, onKeyDown }) => {
  return id === "description" ? (
    <textarea
      className="infos-input"
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  ) : (
    <input
      className="infos-input"
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
};

export default InfosInput;
