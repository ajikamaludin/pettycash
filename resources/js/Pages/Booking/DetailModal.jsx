import React, { useEffect, useState } from "react";
import { formatDate } from "@/Utils";

export default function DetailModal(props) {
    const { isOpen, toggle = () => {}, booking = null, title } = props;
    const [data, setData] = useState({});

    const handleCancel = () => {
        toggle();
    };

    useEffect(() => {
        setData({
            booked: booking?.booked ? booking.booked : '',
            departure: booking?.departure
                ? formatDate(booking.departure).format('yyyy-MM-DD')
                : '',
            destination: booking?.destination ? booking.destination : '',
            flight_number: booking?.flight_number ? booking.flight_number : '',
            jumlah_koli: booking?.jumlah_koli ? booking.jumlah_koli : '',
            kemasan: booking?.kemasan ? booking.kemasan : '',
            master_awb: booking?.master_awb ? booking.master_awb : '',
            used: booking?.used ? booking.used : '',
            is_available: booking?.is_available ? booking.is_available : '',
        })
    }, [booking]);

    return (
        <div
            className="modal"
            style={
                isOpen
                    ? {
                          opacity: 1,
                          pointerEvents: 'auto',
                          visibility: 'visible',
                      }
                    : {}
            }
        >
            <div className="modal-box max-h-screen md:h-5/6 m-auto overflow-scroll">
                <h1 className="font-bold text-2xl pb-8">{title}</h1>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Master AWB</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Master AWB"
                        className={`input input-bordered`}
                        name="master_awb"
                        defaultValue={data.master_awb}
                        readOnly={true}
                    />
                    <label className="label">
                        <span className="label-text-alt"></span>
                    </label>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Flight Number</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Flight Number"
                        className={`input input-bordered`}
                        name="flight_number"
                        defaultValue={data.flight_number}
                        readOnly={true}
                    />
                    <label className="label">
                        <span className="label-text-alt"></span>
                    </label>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Departure</span>
                    </label>
                    <input
                        type="date"
                        placeholder="20/01/2022"
                        className={`input input-bordered`}
                        name="departure"
                        defaultValue={data.departure}
                        readOnly={true}
                    />
                    <label className="label">
                        <span className="label-text-alt"></span>
                    </label>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Destination</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Jakarta"
                        className={`input input-bordered`}
                        name="destination"
                        defaultValue={data.destination}
                        readOnly={true}
                    />
                    <label className="label">
                        <span className="label-text-alt"></span>
                    </label>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Jumlah Koli</span>
                    </label>
                    <input
                        type="text"
                        placeholder="0"
                        className={`input input-bordered`}
                        name="jumlah_koli"
                        defaultValue={data.jumlah_koli}
                        readOnly={true}
                    />
                    <label className="label">
                        <span className="label-text-alt"></span>
                    </label>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Kemasan</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Pack"
                        className={`input input-bordered`}
                        name="kemasan"
                        defaultValue={data.kemasan}
                        readOnly={true}
                    />
                    <label className="label"></label>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Booked</span>
                    </label>
                    <input
                        type="text"
                        placeholder="0"
                        className={`input input-bordered`}
                        name="booked"
                        defaultValue={data.booked}
                        readOnly={true}
                    />
                    <label className="label"></label>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Used</span>
                    </label>
                    <input
                        type="text"
                        placeholder="0"
                        className={`input input-bordered`}
                        name="used"
                        readOnly={true}
                        defaultValue={data.used}
                    />
                    <label className="label"></label>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Status</span>
                    </label>
                    <input
                        type="text"
                        placeholder="0"
                        className={`input input-bordered`}
                        name="used"
                        readOnly={true}
                        defaultValue={+data.is_available === 0 ? 'Available' : 'Closed'}
                    />
                    <label className="label"></label>
                </div>
                <div className="modal-action">
                    <label
                        htmlFor="my-modal-2"
                        className="btn"
                        onClick={handleCancel}
                    >
                        Tutup
                    </label>
                </div>
            </div>
        </div>
    )
};
