import React, { useState } from "react";
import Styles from "./sort.module.css";
import Select from "react-select";
import classNames from "classnames";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSortAmountDownAlt } from "@fortawesome/free-solid-svg-icons";

export const SORT = ["popularity", "release_date", "vote_average", "revenue"];
export const TYPE = ["desc", "asc"];
const sorting = [
  {
    value: SORT[0],
    label: "Popularity",
  },
  {
    value: SORT[1],
    label: "Release Date",
  },
  {
    value: SORT[2],
    label: "Vote Avarage",
  },
  {
    value: SORT[3],
    label: "Revenue",
  },
];

const type = [
  {
    value: TYPE[0],
    label: "Descending",
  },
  {
    value: TYPE[1],
    label: "Ascending",
  },
];

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: "var( --primary-color )",
    borderColor: "var( --primary-color )",
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "var( --secondary-color )" : "white",
    backgroundColor: state.isFocused ? "#0d9" : "var( --primary-color )",
    borderColor: "var( --primary-color )",
  }),
  control: (provided) => ({
    ...provided,
    // none of react-select's styles are passed to <Control />
    backgroundColor: "var( --primary-color )",
    borderColor: "var( --primary-color )",
    color: "var( --secondary-color )",
  }),
};

const Sort = (props) => {
  const [toggle, setToggle] = useState(false);
  const [sortOption, setSortOption] = useState(sorting[0]);
  const [typeOption, setTypeOption] = useState(type[0]);

  const sortingChangeHandler = (option) => {
    setSortOption(option);
    props.onSortChange(option, typeOption);
  };

  const typeChangeHandler = (option) => {
    setTypeOption(option);
    props.onSortChange(sortOption, option);
  };
  return (
    <div className={Styles.fabContainer}>
        <div className={toggle? classNames(Styles.container,Styles.show):classNames(Styles.container,Styles.hide)}>
        {/* <p className={` ${Styles.para}`}>Sort By :</p> */}
        <Select


          styles={customStyles}
          menuPlacement="top"

          className={` ${Styles.select} ${Styles.sort}`}
          isSearchable={false}
          onChange={sortingChangeHandler}
          options={sorting}
          value={sortOption}
        />
        <Select
          styles={customStyles}
          menuPlacement="top"

          className={` ${Styles.select} ${Styles.type}`}
          value={typeOption}
          options={type}
          isSearchable={false}
          onChange={typeChangeHandler}
        />
      </div>
    
      <div onClick={() => setToggle(!toggle)} className={Styles.fab}>
        <FontAwesomeIcon size="2x" icon={faSortAmountDownAlt} inverse />
      </div>
      
    </div>
  );
};

export default Sort;
