import styled from "./Search.module.scss";
import loupe from "../../assets/loupe.svg";

interface IProps {
  placeholder: string;
  borderStyle?: string;
  value: string;
  onChange: any;
  onClickLoupe?: any;
}

const Search: React.FC<IProps> = ({ placeholder, borderStyle, value, onChange, onClickLoupe }) => {
  return (
    <div className={styled.container}>
      <img onClick={onClickLoupe} className={styled.loupe} src={loupe} alt='loupe' />
      <input
        value={value}
        onChange={onChange}
        style={borderStyle ? { border: borderStyle } : { border: "none" }}
        className={styled.search}
        type='text'
        placeholder={placeholder}
      />
    </div>
  );
};

export { Search };
