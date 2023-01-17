import React, { useEffect } from "react";
import Modal from "@/Components/Modal";
import { useForm, usePage } from "@inertiajs/react";
import { formatDate, formatIDR } from "@/Utils";

export default function FormModal(props) {
    const { auth: { user } } = usePage().props

    const { modalState } = props
    const { data, setData } = useForm({
        id: null,
        name: "",
        description: "",
        job_number: "",
        date_expense: new Date(),
        amount: "",
        isIncome: 0,
        is_paid: 4,
        status: ""
    })

    const handleClose = () => {
        modalState.toggle()
    }

    useEffect(() => {
        const expense = modalState.data
        if (expense !== null) {
            setData({
                id: expense?.id,
                name: expense?.name,
                description: expense?.description,
                job_number: expense?.job_number,
                date_expense: expense?.date_expense,
                amount: expense?.amount,
                isIncome: +expense?.isIncome,
                is_paid: expense?.is_paid,
                status: expense?.status,
            })
            return 
        }
    }, [modalState])

    return (
        <Modal
            isOpen={modalState.isOpen}
            toggle={handleClose}
            title={'Detail'}
        >

            {data.isIncome === 0 && (
                <>
                    <div className="form-control mb-2">
                        <label>Nama</label>
                        <input
                            className="input input-bordered"
                            name="name"
                            value={data.name}
                            readOnly={true}
                        />
                    </div>
                    <div className="form-control mb-2">
                        <label>Job Number</label>
                        <input
                            className="input input-bordered"
                            name="job_number"
                            value={data.job_number}
                            readOnly={true}
                        />
                    </div>
                </>
            )}

            <div className="form-control mb-2">
                <label>Deskripsi</label>
                <textarea
                    className="textarea textarea-bordered"
                    name="description"
                    value={data.description}
                    readOnly={true}
                    rows={5}
                />
            </div>
            <div className="form-control mb-2">
                <label>Tanggal</label>
                <input
                    className="input input-bordered"
                    value={formatDate(data.date_expense).format('DD-MM-yyyy')}
                    readOnly={true}
                />
            </div>
            <div className="form-control mb-2">
                <label>Amount</label>
                <input
                    type="text"
                    className="input input-bordered"
                    name="amount"
                    value={formatIDR(data.amount)}
                    readOnly={true}
                />
            </div>

            <div className="form-control mb-2">
                <label>Tanggal</label>
                <input
                    className="input input-bordered"
                    value={data.status}
                    readOnly={true}
                />
            </div>

            <div className="w-full flex justify-end space-x-1 items-center mt-2">
                <button
                    className="btn btn-secondary"
                    onClick={handleClose}
                    type="secondary"
                >
                    Close
                </button>
            </div>
        </Modal>
    )
}