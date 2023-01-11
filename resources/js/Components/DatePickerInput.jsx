import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";  

export const DatePickerRangeInput = ({
    startDate,
    endDate,
    setFilterDate
}) => {
    const [_startDate, setStartDate] = useState(startDate)
    const [_endDate, setEndDate] = useState(typeof(endDate) === 'string' ? new Date(endDate) : endDate)

    const handleDateChanges = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        if (end !== null) {
            setFilterDate(dates)
        }
    }

    return (
        <div className="flex space-x-1">
            <div className="relative">
                <DatePicker
                    selected={_startDate}
                    onChange={handleDateChanges}
                    selectsRange
                    startDate={_startDate}
                    endDate={_endDate}
                    nextMonthButtonLabel=">"
                    previousMonthButtonLabel="<"
                    popperClassName="react-datepicker-left"
                />
            </div>
        </div>
    );
};

export const DatePickerInput = ({
    value,
    onChange,
}) => {
    return (
        <div className="relative w-full">
            <DatePicker
                selected={value}
                onChange={onChange}
                nextMonthButtonLabel=">"
                previousMonthButtonLabel="<"
                popperClassName="react-datepicker-left"
                dateFormat={'dd-MM-yyyy'}
            />
        </div>
    )
}