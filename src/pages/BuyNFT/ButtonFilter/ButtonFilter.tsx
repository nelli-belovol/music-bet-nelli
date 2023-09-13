import { useEffect, useState } from "react";
import { ReactComponent as ArrowDownSvg } from "../../../assets/svg/arrowDown.svg";
import { ReactComponent as ArrowUpSvg } from "../../../assets/svg/arrowUp.svg";
import { ButtonValue } from "./ButtonValue/ButtonValue";

import styled from "../BuyNFT.module.scss";
interface IProps {
  currentFilter: any;
  setCurrentFilter: any;
  additional?: boolean;
  filter: any;
  setSelectedFilterValues?: any;
  selectedFilterValues?: any;
}
const ButtonFilter: React.FC<IProps> = ({
  additional,
  filter,
  currentFilter,
  setCurrentFilter,
  setSelectedFilterValues,
  selectedFilterValues,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (currentFilter !== undefined && currentFilter.name === filter.name) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [currentFilter, filter.name]);

  const handleClick = () => {
    if (currentFilter === undefined || currentFilter.name !== filter.name) {
      setCurrentFilter(filter);
    } else if (currentFilter.name === filter.name) {
      setCurrentFilter();
    }
  };

  const handleSelectOption = (value: any) => {
    setIsOpen(false);
    setSelectedFilterValues(value)
  }

  return (
    <div className={styled.filterWrapper}>
      <button
        className={!additional ? styled.filterButton : styled.sortButton}
        onClick={handleClick}
      >
        <span>{filter.name}</span>
        <div>{!isOpen ? <ArrowDownSvg /> : <ArrowUpSvg />}</div>
      </button>
      {isOpen && (
        <ul className={styled.filterValuesList}>
          {filter.values.map((value: any) => (
            <ButtonValue
              selectedFilterValues={selectedFilterValues}
              key={value}
              setSelectedFilterValues={handleSelectOption}
              value={value}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export { ButtonFilter };
