import { useForm } from "@inertiajs/inertia-react";
import React, { useEffect } from "react";
import { formatDate } from "@/Utils";

export default function FormModal(props) {
    const { isOpen, toggle = () => {}, booking = null } = props;

    const { data, setData, post, put, processing, errors, clearErrors } =
        useForm({
            booked: "",
            departure: "",
            destination: "",
            flight_number: "",
            jumlah_koli: 0,
            kemasan: "",
            master_awb: "",
            used: 0,
            is_available: 0,
        });

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const handleReset = () => {
        setData({
            booked: '',
            departure: '',
            destination: '',
            flight_number: '',
            jumlah_koli: 0,
            kemasan: '',
            master_awb: '',
            used: 0,
            is_available: 0,
        })

        clearErrors();
    };

    const handleCancel = () => {
        handleReset();
        toggle();
    };

    const handleSubmit = () => {
        if (booking !== null) {
            put(route("monitoring-booking.update", booking), {
                onSuccess: () => Promise.all([handleReset(), toggle()]),
            });
            return;
        }

        post(route("monitoring-booking.store"), {
            onSuccess: () => Promise.all([handleReset(), toggle()]),
        });
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
            is_available: booking?.is_available ? booking.is_available : 0,
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
            <div className="modal-box">
                <h1 className="font-bold text-2xl pb-8">
                    Monitoring Booking Slot
                </h1>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Master AWB</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Master AWB"
                        className={`input input-bordered ${
                            errors.master_awb && 'input-error'
                        }`}
                        name="master_awb"
                        value={data.master_awb}
                        onChange={handleOnChange}
                    />
                    <label className="label">
                        <span className="label-text-alt">
                            {errors.master_awb}
                        </span>
                    </label>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Flight Number</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Flight Number"
                        className={`input input-bordered ${
                            errors.flight_number && 'input-error'
                        }`}
                        name="flight_number"
                        value={data.flight_number}
                        onChange={handleOnChange}
                    />
                    <label className="label">
                        <span className="label-text-alt">
                            {errors.flight_number}
                        </span>
                    </label>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Departure</span>
                    </label>
                    <input
                        type="date"
                        placeholder="20/01/2022"
                        className={`input input-bordered ${
                            errors.departure && 'input-error'
                        }`}
                        name="departure"
                        value={data.departure}
                        onChange={handleOnChange}
                    />
                    <label className="label">
                        <span className="label-text-alt">
                            {errors.departure}
                        </span>
                    </label>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Destination</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Jakarta"
                        className={`input input-bordered ${
                            errors.destination && 'input-error'
                        }`}
                        name="destination"
                        value={data.destination}
                        onChange={handleOnChange}
                    />
                    <label className="label">
                        <span className="label-text-alt">
                            {errors.destination}
                        </span>
                    </label>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Packaging</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Pack"
                        className={`input input-bordered ${
                            errors.kemasan && 'input-error'
                        }`}
                        name="kemasan"
                        value={data.kemasan}
                        onChange={handleOnChange}
                    />
                    <label className="label">
                        <span className="label-text-alt">{errors.kemasan}</span>
                    </label>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Booked</span>
                    </label>
                    <input
                        type="number"
                        placeholder="0"
                        className={`input input-bordered ${
                            errors.booked && 'input-error'
                        }`}
                        name="booked"
                        value={data.booked}
                        onChange={handleOnChange}
                    />
                    <label className="label">
                        <span className="label-text-alt">{errors.booked}</span>
                    </label>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Used</span>
                    </label>
                    <input
                        type="number"
                        placeholder="0"
                        className={`input input-bordered ${
                            errors.used && 'input-error'
                        }`}
                        name="used"
                        value={data.used}
                        onChange={handleOnChange}
                    />
                    <label className="label">
                        <span className="label-text-alt">{errors.used}</span>
                    </label>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Status</span>
                    </label>
                    <select
                        className="select select-bordered w-full"
                        onChange={(e) =>
                            setData('is_available', e.target.value)
                        }
                        value={+data.is_available}
                    >
                        <option value={0}>
                            Available
                        </option>
                        <option value={1}>
                            Closed
                        </option>
                    </select>
                    <label className="label">
                        <span className="label-text-alt">
                            {errors.is_available}
                        </span>
                    </label>
                </div>
                <div className="modal-action">
                    <label
                        htmlFor="my-modal-2"
                        className="btn"
                        onClick={handleSubmit}
                        disabled={processing}
                    >
                        Simpan
                    </label>
                    <label
                        htmlFor="my-modal-2"
                        className="btn btn-secondary"
                        onClick={handleCancel}
                        disabled={processing}
                    >
                        Batal
                    </label>
                </div>
            </div>
        </div>
    )
}
