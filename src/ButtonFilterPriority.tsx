import React from 'react';
import {filterPriorityType} from "./app/App";
import cx from "classnames";

type Props = {
    title: string
    className: string
    filterPriority: string
    onFilterPriorityHandler: (filterPriority: filterPriorityType)=> void
}
const ButtonFilterPriority = (props: Props) => {
    const isButtonActive= props.filterPriority === props.title
    const onClickFilterHandler = ()=>{
        props.onFilterPriorityHandler(props.title as filterPriorityType)
    }
    return (
        <button onClick={onClickFilterHandler}
                className={cx(props.className + ' ' +
                    'tw-text-white tw-font-bold tw-uppercase tw-py-2 tw-px-4 tw-mx-6 tw-rounded-full',
                    isButtonActive && 'tw-border-2 tw-border-rose-950' )}>{props.title}</button>
    );
};

export default ButtonFilterPriority;