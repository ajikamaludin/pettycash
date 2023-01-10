import React, { useState, useEffect } from 'react'
import { usePrevious } from "react-use";
import { Inertia } from "@inertiajs/inertia";

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from "@/Components/Pagination";
import { DatePickerRangeInput } from "@/Components/DatePickerInput";
import { useModalState } from "@/Hook";
import { Head } from '@inertiajs/inertia-react';
import { formatDate } from "@/Utils";
import { toast } from 'react-toastify';

export default function Dashboard(props) {
    const { _startDate, _endDate, _limit } = props

    const [startDate, setStartDate] = useState(_startDate)
    const [endDate, setEndDate] = useState(_endDate)
    
    const { data: bookings, links } = props.booking;
    const [bookingsChecked, setBookingsChecked] = useState(
        bookings.map((booking) => {
            return {
                ...booking,
                isChecked: false,
            };
        })
    );

    const [search, setSearch] = useState("");
    const [limit, setLimit] = useState(_limit)
    const preValue = usePrevious(`${search}-${startDate}-${endDate}-${limit}`);
    const [booking, setBooking] = useState(null);
    const [ids, setIds] = useState({});


    const formModal = useModalState(false);
    const handleEdit = (booking = null) => {
        setBooking(booking);
        formModal.toggle();
    };

    const confirmModal = useModalState(false);
    const handleDelete = (booking) => {
        confirmModal.setData(booking);
        confirmModal.toggle();
    };

    const detailModal = useModalState(false);
    const handleDetail = (booking = null) => {
        setBooking(booking);
        detailModal.toggle();
    };

    const bookingModal = useModalState(false);
    const handleBooking = () => {
        bookingModal.toggle();
    };

    const onDelete = () => {
        const booking = confirmModal.data;
        if (booking != null) {
            Inertia.delete(
                route("monitoring-booking.destroy", booking), {
                    onSuccess: () => toast.success("item delete"),
                }
            );
        }
    };

    const handleCheckedCheckbox = (e) => {
        setBookingsChecked(
            bookingsChecked.map((booking) => {
                if (booking.id === e.target.defaultValue * 1) {
                    return {
                        ...booking,
                        isChecked: !booking.isChecked,
                    };
                } else {
                    return booking;
                }
            })
        );
    };

    const handleMouseOverExport = () => {
        let params = bookingsChecked
            .map((booking) => {
                if (booking.isChecked) {
                    return booking.id;
                }
            })
            .filter((isChecked) => {
                return isChecked !== undefined;
            });

        setIds(params);
    };

    const handleCheckAll = (e) => {
        setBookingsChecked((prevBookingsChecked) => {
            return prevBookingsChecked.map((booking) => {
                return {
                    ...booking,
                    isChecked: e.target.checked,
                };
            });
        });
    };

    const params = { ids };

    useEffect(() => {
        setBookingsChecked(
            bookings.map((booking) => {
                return {
                    ...booking,
                    isChecked: false,
                };
            })
        );
    }, [bookings]);

    useEffect(() => {
        if (preValue) {
            Inertia.get(
                route(route().current()),
                { q: search, startDate, endDate, limit },
                {
                    replace: true,
                    preserveState: true,
                }
            )
        }
    }, [search, startDate, endDate, limit])

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="Booking" />

            <div className="p-4">
                <div className="mx-auto max-w-7xl p-4 bg-white overflow-hidden shadow-sm sm:rounded-lg min-h-screen">
                    <div className='flex justify-between space-x-0 lg:space-x-1 flex-row mb-2'>
                        <div className='flex space-x-1'>
                            <div className='btn'>Tambah</div>
                            <div className='btn'>Import Excel</div>
                        </div>
                        <div className='btn'>Export Excel</div>
                    </div>
                    <div className='flex justify-between space-y-1 lg:space-y-0 space-x-0 lg:space-x-1 flex-col lg:flex-row'>
                        <div>
                            Terakhir diperbarui: {props.last_updated
                                                    ? formatDate(props.last_updated).format('DD/MM/Y hh:mm') 
                                                    : 'Belum ada pembaruan'}
                        </div>
                        <div className='flex lg:space-x-2 space-x-0 lg:space-y-0 space-y-1 flex-col lg:flex-row'>
                            <div className='flex space-x-1'>
                                <DatePickerRangeInput
                                    startDate={new Date(startDate)}
                                    setStartDate={setStartDate}
                                    endDate={endDate}
                                    setEndDate={setEndDate}
                                />
                            </div>
                            <div>
                                <input className='input input-bordered w-full' placeholder='search'/>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto mt-2">
                        <table className="table w-full table-zebra">
                            <thead>
                                <tr>
                                    <th>
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-xs"
                                            onChange={(e) =>handleCheckAll(e)}
                                        />
                                    </th>
                                    <th>Master AWB</th>
                                    <th>Flight Number</th>
                                    <th>Departure</th>
                                    <th>Destination</th>
                                    <th>Booked</th>
                                    <th>Packaging</th>
                                    <th>Used</th>
                                    <th>Status</th>
                                    <th>Opsi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookingsChecked.map((booking) => (
                                    <tr key={booking.id}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                className="checkbox checkbox-xs"
                                                onChange={(e) => handleCheckedCheckbox(e)}
                                                checked={booking.isChecked}
                                                value={booking.id}
                                            />
                                        </td>
                                        <td>{booking.master_awb}</td>
                                        <td>{booking.flight_number}</td>
                                        <td>
                                            {formatDate(booking.departure).format('DD/MM/yyyy')}
                                        </td>
                                        <td>{booking.destination}</td>
                                        <td>{booking.booked}</td>
                                        <td>{booking.kemasan}</td>
                                        <td>{booking.used}</td>
                                        <td>
                                            {+booking.is_available === 0
                                                ? 'Available'
                                                : 'Closed'}
                                        </td>
                                        <td className="flex gap-1">
                                            <button
                                                className="btn btn-neutral btn-xs"
                                                onClick={() => handleDetail(booking)}
                                            >
                                                Detail
                                            </button>
                                            <button
                                                className="btn btn-neutral btn-xs"
                                                onClick={() => handleEdit(booking)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-neutral btn-xs"
                                                onClick={() => handleDelete(booking)}
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='flex w-full'>
                    <div className="flex mx-auto items-end mt-4">
                        <Pagination
                            links={links}
                            params={{
                                q: search,
                                startDate,
                                endDate,
                                limit,
                            }}
                        />
                        <div>
                            <select
                                className="select select-bordered w-full max-w-xs"
                                onChange={(e) => setLimit(e.target.value)}
                                value={limit}
                            >
                                <option value="10">10</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
