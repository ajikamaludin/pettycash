import React, { useEffect, useState } from "react";
import Modal from "@/Components/Modal";
import InputError from "@/Components/InputError";
import { DatePickerInput } from "@/Components/DatePickerInput";
import { useForm, usePage } from "@inertiajs/inertia-react";
import { toast } from "react-toastify";

export default function FormModal(props) {
    const { auth: { user } } = usePage().props

    const { modalState } = props
    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        id: null,
        name: "",
        description: "",
        job_number: "",
        date_expense: new Date(),
        amount: "",
        isIncome: 0,
        is_paid: 0,
    })

    const setType = (type) => {
        setData('isIncome',type)
    }

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value)
    }

    const handleReset = () => {
        modalState.setData(null)
        reset()
        clearErrors()
    }

    const handleClose = () => {
        handleReset()
        modalState.toggle()
    }

    const handleSubmit = () => {
        const expense = modalState.data
        if(expense !== null) {
            put(route('expenses.update', expense), {
                onSuccess: () => {
                    toast.success('item updated')
                    handleClose()
                }
            })
            return
        } 
        post(route('expenses.store'), {
            onSuccess: () => {
                toast.success('item created')
                handleClose()
            }
        })
    }

    const title = data.id ? 'Edit Data' : 'Tambah Data'

    useEffect(() => {
        const expense = modalState.data
        if (expense !== null) {
            setData({
                id: expense?.id,
                name: expense?.name,
                description: expense?.description,
                job_number: expense?.job_number,
                date_expense: new Date(expense?.date_expense),
                amount: expense?.amount,
                isIncome: expense?.isIncome,
                is_paid: expense?.is_paid,
            })
            return 
        }
    }, [modalState])

    return (
        <Modal
            isOpen={modalState.isOpen}
            toggle={handleClose}
            title={title}
        >
            {+user.role === 1 && (
                <div className="tabs w-full mb-2">
                    <a 
                        className={`tab tab-bordered w-1/2 ${data.isIncome === 0 ? 'tab-active' : ''}`}
                        onClick={() => setType(0)}
                    >
                        Pengeluaran
                    </a>
                    <a 
                        className={`tab tab-bordered w-1/2 ${data.isIncome === 1 ? 'tab-active' : ''}`}
                        onClick={() => setType(1)}
                    >
                        Pemasukan
                    </a>
                </div>
            )}

            {data.isIncome === 0 && (
                <>
                    <div className="form-control mb-2">
                        <label>Nama</label>
                        <input
                            className="input input-bordered"
                            name="name"
                            value={data.name}
                            onChange={handleOnChange}
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div className="form-control mb-2">
                        <label>Job Number</label>
                        <input
                            className="input input-bordered"
                            name="job_number"
                            value={data.job_number}
                            onChange={handleOnChange}
                        />
                        <InputError message={errors.job_number} className="mt-2" />
                    </div>
                </>
            )}

            <div className="form-control mb-2">
                <label>Deskripsi</label>
                <textarea
                    className="textarea textarea-bordered"
                    name="description"
                    value={data.description}
                    onChange={handleOnChange}
                    rows={5}
                />
                <InputError message={errors.description} className="mt-2" />
            </div>
            <div className="form-control mb-2">
                <label>Tanggal</label>
                <DatePickerInput
                    value={data.date_expense}
                    onChange={date => setData('date_expense', date)}
                />
                <InputError message={errors.date_expense} className="mt-2" />
            </div>
            <div className="form-control mb-2">
                <label>Amount</label>
                <input
                    type="number"
                    className="input input-bordered"
                    name="amount"
                    value={data.amount}
                    onChange={handleOnChange}
                />
                <InputError message={errors.amount} className="mt-2" />
            </div>

            {data.isIncome === 0 && (
                <div className="form-control mb-2">
                    <label>Status</label>
                    <select 
                        name="is_paid"
                        className="select select-bordered w-full" 
                        disabled={+user.role === 2}
                        value={data.is_paid}
                        onChange={handleOnChange}
                    >
                        <option value="0">Draft</option>
                        <option value="1">Paid</option>
                        <option value="2">Approve</option>
                        <option value="3">Reject</option>
                    </select>
                    <InputError message={errors.amount} className="mt-2" />
                </div>
            )}

            <div className="w-full flex justify-end space-x-1 items-center mt-2">
                <button
                    className="btn"
                    onClick={handleSubmit}
                    disabled={processing} 
                >
                    Simpan
                </button>
                <button
                    className="btn btn-secondary"
                    onClick={handleClose}
                    type="secondary"
                >
                    Batal
                </button>
            </div>
        </Modal>
    )
}