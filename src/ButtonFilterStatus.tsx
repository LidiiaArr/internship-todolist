import React from 'react';
import {filterStatusType} from "./app/App";
import cx from "classnames";

type Props ={
    title: string
    className: string
    onFilterStatusHandler: (filterStatus: filterStatusType)=> void
    filterStatus: filterStatusType
}
export const ButtonFilterStatus = (props: Props) => {
    const isButtonActive = props.filterStatus === props.title
    const onClickFilterHandler = ()=> {
        props.onFilterStatusHandler(props.title as filterStatusType)
    }

    return (
        <button onClick={onClickFilterHandler}
                className={cx(props.className + ' ' +
                    'tw-text-white tw-font-bold tw-uppercase tw-py-2 tw-px-4 tw-mx-6 tw-rounded-full', isButtonActive && 'tw-border-2 tw-border-rose-950' )}>{props.title}</button>
    );
};
