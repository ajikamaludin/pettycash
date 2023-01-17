import { useForm } from "@inertiajs/react";
import React, { useRef } from "react";

export default function ImportModal(props) {
    const { isOpen, toggle = () => {}, booking = null } = props;

    const { data, setData, post, progress, errors, clearErrors } = useForm({
        file_booking_import: null,
    });

    const inputFileImport = useRef();

    const handleReset = () => {
        setData({
            file_booking_import: "",
        });

        clearErrors();
    };

    const handleCancel = () => {
        toggle();
        handleReset();
    };

    function handleSubmit(e) {
        e.preventDefault();
        post(route("monitoring-booking.import"), {
            forceFormData: false,
            onSuccess: () => Promise.all([handleReset(), toggle()]),
        });
        return;
    }

    return (
        <div
            className="modal"
            style={
                isOpen
                    ? {
                          opacity: 1,
                          pointerEvents: "auto",
                          visibility: "visible",
                      }
                    : {}
            }
        >
            <div className="modal-box  max-h-screen m-auto">
                <h1 className="font-bold text-2xl pb-8">Import File Booking</h1>
                <p>
                    Unduh format file import{" "}
                    <a
                        className="underline text-blue-500"
                        href="/awb-format.csv"
                    >
                        disini
                    </a>
                </p>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input
                        ref={inputFileImport}
                        type="file"
                        name="file_booking_import"
                        onChange={(e) =>
                            setData("file_booking_import", e.target.files[0])
                        }
                    />
                    {progress && (
                        <progress value={progress.percentage} max="100">
                            {progress.percentage}%
                        </progress>
                    )}
                    <div className="modal-action">
                        <label
                            htmlFor="my-modal-2"
                            className="btn btn-accent"
                            onClick={(e) => handleSubmit(e)}
                            disabled={progress}
                        >
                            Import
                        </label>
                        <label
                            htmlFor="my-modal-2"
                            className="btn"
                            onClick={handleCancel}
                            disabled={progress}
                        >
                            Batal
                        </label>
                    </div>
                </form>
            </div>
        </div>
    );
};
