import React, { useEffect, useState } from "react";
import { HeaderGeneral } from "../../components/HeaderGeneral/HeaderGeneral";
import { ReactComponent as DeleteSvg } from "../../assets/svg/delete.svg";
import styled from "./BuyNFT.module.scss";
import { Search } from "../../components/Search/Search";
import { ButtonFilter } from "./ButtonFilter/ButtonFilter";
import { CardElement } from "../../components/ExploreSwiper/CardElement/CardElement";
import { CurrentCardElement } from "../../components/ExploreSwiper/CurrentCardElement/CurrentCardElement";
import { musicAPI } from "../../api/api";
import { useSearchParams } from "react-router-dom";

const filters = [
  { name: "Status", values: ["Buy Now", "On Auction", "New", "Has Offers"] },
  { name: "Year", values: ["the 20's", "the 10's", "the 00's", "the 90's", "the 80's"] },
  {
    name: "Genres",
    values: [
      "POP",
      "hip hop",
      "Jazz",
      "Rhythm and blues",
      "Country music",
      "Folk music",
      "Blues",
      "Electronic",
      "Classical",
      "Heavy metal",
      "Dance",
      "Punk",
      "Alternative rock",
      "Funk",
      "Latin",
      "Techno",
      "House",
      "Disco",
      "Instrumental",
      "SOUNDTRACK",
      "Trance",
      "New-age",
    ],
  },
  { name: "Price", values: ["0.358", "0.359", "0.360", "0.361", "0.362"] },
];

const sort = [{ name: "Sort By Price", values: ["ASC", "DESC"] }];
const BuyNFT = () => {
  const [currentFilter, setCurrentFilter] = useState();
  const [selectedFilterValues, setSelectedFilterValues] = useState([]);
  const [tracks, setTracks] = useState<any>([]);
  const [nameSearch, setNameSearch] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const searchQuery = searchParams.get('search');

    if (searchQuery) {
      setNameSearch(searchQuery);
    }
  }, []);
  useEffect(() => {
    musicAPI.getMusic([{ name: 'name', value: nameSearch }]).then((res) => {
      setTracks(res.data.data);
    });
  }, [nameSearch]);

  const handleClearAll = () => {
    setSelectedFilterValues([]);
  };

  const handleDelFilterValue = (value: string) => {
    const newArr = selectedFilterValues.filter((elem) => elem !== value);
    setSelectedFilterValues(newArr);
  };
  return (
    <div style={{ width: "100%" }}>
      <HeaderGeneral title='Buy NFT' />
      <div className={styled.containerBuyNFT}>
        
        <div className={styled.scrollWrapper}>
          <ul className={styled.selectedValuesList}>
            {selectedFilterValues.map((value) => (
              <li key={value} className={styled.selectedValuesItem}>
                <span>{value}</span>
                <div className={styled.deleteSvg} onClick={() => handleDelFilterValue(value)}>
                  <DeleteSvg />
                </div>
              </li>
            ))}
            {selectedFilterValues.length !== 0 && (
              <button className={styled.selectedClearAll} onClick={handleClearAll}>
                Clear All
              </button>
            )}
          </ul>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between"}} className={styled.containerSearchAnd}>
          <Search placeholder='Search NFT' value={nameSearch} onChange={(e: any) => { setNameSearch(e.target.value)}} borderStyle='1px solid #E2E2E2' />
          <div className={styled.controllers}>
            <ButtonFilter
                key={sort[0].name}
                setCurrentFilter={setCurrentFilter}
                currentFilter={currentFilter}
                additional
                filter={sort[0]}
              />
          </div>
        </div>

        <div className={styled.cardList}>
        {tracks.map((track: any) => {
          return (
            <CurrentCardElement key={track.id} track={track}/>
          );
        })}
        </div>
      </div>
    </div>
  );
};

export { BuyNFT };
