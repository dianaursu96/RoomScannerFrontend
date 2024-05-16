import React, { useState } from "react";
import { Chip, Stack } from "@mui/material";
import { FaCocktail } from "react-icons/fa";
import { GiButterToast } from "react-icons/gi";
import { FaBowlFood } from "react-icons/fa6";
import { LuDessert } from "react-icons/lu";
import { GiFrenchFries } from "react-icons/gi";
import { LuBedSingle as Single } from "react-icons/lu";
import { LuBedDouble as Double } from "react-icons/lu";
import { BsFillCalendarHeartFill as Matrimonial } from "react-icons/bs";
import { MdOutlineApartment as Suite } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { readerActions } from "../../../redux/store/reader-slice";
import "./CategoryBar.css";
import { useMediaQuery } from '@material-ui/core';

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

const CategoryBar = () => {
    const matches = useMediaQuery('(min-width:600px)');
    const currentCategory = useSelector((state) => state.reader.currentCategory);
    const [selectedCategory, setSelectedCategory] = useState(currentCategory);

    const dispatch = useDispatch();

    const handleClick = (category) => {
        if (selectedCategory === category.value) {
            setSelectedCategory("");
            dispatch(readerActions.setCurrentCategory(""));
        } else {
            setSelectedCategory(category.value);
            dispatch(readerActions.setCurrentCategory(category.value));
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
