import React, { useEffect } from "react";
import DatePicker from "react-datepicker";  

export const DatePickerRangeInput = ({
    startDate,
    setStartDate,
    endDate,
    setEndDate,
}) => {
    
    if(typeof(endDate) === 'string') {
        endDate = new Date(endDate)
    }

    return (
        <div className="flex space-x-1">
            <div className="relative">
                <DatePicker
                    selected={startDate}
                    onChange={(dates) => {
                        const [start, end] = dates;
                        setStartDate(start);
                        setEndDate(end);
                    }}
                    selectsRange
                    startDate={startDate}
                    endDate={endDate}
                    nextMonthButtonLabel=">"
                    previousMonthButtonLabel="<"
                    popperClassName="react-datepicker-left"
                />
            </div>
        </div>
    );
};
