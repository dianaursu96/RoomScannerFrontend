import React, { useState } from "react";
import { Chip, Stack } from "@mui/material";
import { LuBedSingle as Single } from "react-icons/lu";
import { LuBedDouble as Double } from "react-icons/lu";
import { BsFillCalendarHeartFill as Matrimonial } from "react-icons/bs";
import { MdOutlineApartment as Suite } from "react-icons/md";
import { useDispatch } from "react-redux";
import "./CategoryBar.css";

const categories = [
  {
    label: "Single",
    value: "SINGLE",
    icon: <Single />,
    selected: false,
  },
  {
    label: "Double",
    value: "DOUBLE",
    icon: <Double />,
    selected: false,
  },
  {
    label: "Matrimonial",
    value: "MATRIMONIAL",
    icon: <Matrimonial />,
    selected: false,
  },
  {
    label: "Suite",
    value: "SUITE",
    icon: <Suite />,
    selected: false,
  },
];

const CategoryBar = ({ handleRoomTypeChange }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const handleClick = (category) => {
    if (selectedCategory === category.value) {
      setSelectedCategory("");
    } else {
      setSelectedCategory(category.value);
      handleRoomTypeChange(category.value);
    }
  };

  return (
    <div className="categoryBar">
      <Stack
        sx={{ flexWrap: "wrap", rowGap: "10px", justifyContent: "center" }}
        direction="row"
        spacing={0}
      >
        {categories.map((category, index) => (
          <Chip
            key={index}
            label={category.label}
            icon={category.icon}
            onClick={() => handleClick(category)}
            style={{ margin: "5px" }}
            variant={
              selectedCategory === category.value ? "filled" : "outlined"
            }
          />
        ))}
      </Stack>
    </div>
  );
};

export default CategoryBar;
