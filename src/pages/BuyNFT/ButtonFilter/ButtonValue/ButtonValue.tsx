import { useEffect, useState } from "react";

import styled from "../../BuyNFT.module.scss";

interface IProps {
  value: string;
  setSelectedFilterValues: any;
  selectedFilterValues: any;
}
const ButtonValue: React.FC<IProps> = ({
  value,
  setSelectedFilterValues,
  selectedFilterValues,
}) => {
  const [isSelect, setIsSelect] = useState(false);

  useEffect(() => {
    if (selectedFilterValues !== undefined) {
      if (!selectedFilterValues.includes(value)) {
        setIsSelect(false);
      } else {
        setIsSelect(true);
      }
    }
  }, [selectedFilterValues, value]);

  const handleSelectValue = (e: any) => {
    setIsSelect(!isSelect);
    if (selectedFilterValues !== undefined) {
      if (selectedFilterValues.includes(value)) {
        const newArr = selectedFilterValues.filter((elem: string) => elem !== value);
        setSelectedFilterValues(newArr);
      } else {
        setSelectedFilterValues((prev: any) => [...prev, value]);
      }
    }
  };

  return (
    <div
      style={isSelect ? { background: "#0074f0", color: "white" } : { background: "white" }}
      onClick={(e) => handleSelectValue(e)}
      className={styled.filterValues}
    >
      {value}
    </div>
  );
};

export { ButtonValue };
