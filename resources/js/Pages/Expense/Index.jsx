import React, { useState, useEffect, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import qs from 'qs'
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import { Head } from '@inertiajs/inertia-react';
import { usePrevious } from 'react-use';
import { toast } from 'react-toastify';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import Print from './Print';
import ModalConfirm from '@/Components/ModalConfirm';
import FormModal from './FormModal';
import { DatePickerRangeInput } from '@/Components/DatePickerInput';
import { useModalState } from '@/Hook';
import { formatDate, formatIDR } from '@/Utils';


export default function Dashboard(props) {
    const { auth, expenses: { data, links, total, last_page }, _startDate, _endDate, _limit, _q } = props
    
    const [items, setItems] = useState([])
    const [startDate] = useState(_startDate)
    const [endDate] = useState(_endDate)
    const [filterDate, setFilterDate] = useState([_startDate, _endDate])
    const [search, setSearch] = useState(_q);
    const [limit, setLimit] = useState(_limit)
    const preValue = usePrevious(`${search}-${filterDate[0]}-${filterDate[1]}-${limit}`);

    const componentToPrint = useRef();
    const printBtn = useRef();
    const [name, setName] = useState('')
    
    const handleBeforePrint = () => {
        const tmpname = window.prompt('Masukan Nama:')
        if(tmpname !== null) {
            new Promise((resolve, _) => {
                setName(tmpname)
                resolve(null)
            })
            .then(() => {
                handlePrint()
            })
        }
    }

    const handlePrint = () => {
        printBtn.current.click()
    }

    const handleCheckAllItem = (e) => {
        setItems(items.map(item => {
            return {
                ...item,
                isChecked: e.target.checked,
            }
        }))
    }

    const formModal = useModalState()
    const toggle = (expense = null) => {
        formModal.setData(expense)
        formModal.toggle()
    }

    // TODO:
    // add -> operator hanya expense, kasir expense/income
    // edit -> menyesuaikan
    // detail
    // export
    // 

    const handleCheckItem = (e) => {
        setItems(items.map(item => {
            if (item.id === +e.target.value) {
                return {
                    ...item,
                    isChecked: e.target.checked,
                }
            }
            return item
        }))
    }

    const handleExport = () => {
        const params = items
            .map((item) => {
                if (item.isChecked) {
                    return item.id;
                }
            })
            .filter((isChecked) => {
                return isChecked !== undefined;
            });

        fetch(route('expenses.export') +'?'+ qs.stringify({ids: params, start_date: filterDate[0], end_date: filterDate[1]}, { encodeValuesOnly:true }))
        .then( res => res.blob() )
        .then( blob => {
            var file = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = file;
            a.download = "expenses.xlsx";
            document.body.appendChild(a);
            a.click();
            a.remove();
        });
    };

    const confirmModal = useModalState(false);
    const handleDelete = (expense) => {
        confirmModal.setData(expense);
        confirmModal.toggle();
    };

    const onDelete = () => {
        const expense = confirmModal.data;
        if (expense != null) {
            Inertia.delete(
                route("expenses.destroy", expense), {
                    onSuccess: () => toast.success("item deleted"),
                }
            );
        }
    };

    const params = {
        q: search,
        startDate: filterDate[0], 
        endDate: filterDate[1],
        limit,
    };

    useEffect(() => {
        if (preValue) {
            Inertia.get(
                route(route().current()),
                { q: search, startDate: filterDate[0], endDate: filterDate[1], limit },
                {
                    replace: true,
                    preserveState: true,
                }
            )
        }
    }, [search, filterDate, limit])

    useEffect(() => {
        setItems(data.map(item => {
            return {
                ...item, 
                isChecked: false
            }
        }))
    }, [data])

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="Expense" />

            <div className="p-4">
                <div className="mx-auto max-w-7xl p-4 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className='flex justify-between space-x-0 lg:space-x-1 flex-row mb-2'>
                        <div 
                            className='btn'
                            onClick={() => toggle()}
                        >
                            Tambah
                        </div>
                        {+auth.user.role === 1 ? (
                            <div 
                                className='btn'
                                onClick={handleExport}
                            >
                                Export Excel
                            </div>
                        ) : (
                            <div 
                                className='btn'
                                onClick={handleBeforePrint}
                            >
                                Print
                            </div>
                        )}
                    </div>
                    <div className='flex justify-between space-y-1 lg:space-y-0 space-x-0 lg:space-x-1 flex-col lg:flex-row'>
                        <div>
                            <div>Jumlah Record : {total}</div>
                            <div>Jumlah Halaman : {last_page}</div>
                        </div>
                        <div className='flex lg:space-x-2 space-x-0 lg:space-y-0 space-y-1 flex-col lg:flex-row'>
                            <div className='flex space-x-1'>
                                <DatePickerRangeInput
                                    startDate={new Date(startDate)}
                                    endDate={endDate}
                                    setFilterDate={setFilterDate}
                                />
                            </div>
                            <div>
                                <input 
                                    className='input input-bordered w-full' 
                                    placeholder='search'
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto mt-2">
                        <table className="table w-full table-zebra">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th>
                                        <div className="flex items-center">
                                            <input
                                                onChange={(e) => handleCheckAllItem(e)}
                                                className="checkbox checkbox-xs"
                                                type="checkbox"
                                            />
                                        </div>
                                    </th>
                                    <th>No</th>
                                    <th>Tanggal</th>
                                    <th>Name</th>
                                    <th>Job Number</th>
                                    <th className='w-10'>Description</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Opsi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {items.map((expense, index) => {
                                    return (
                                        <tr key={expense.id}>
                                            <td>
                                                <div className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="checkbox checkbox-xs"
                                                        checked={expense.isChecked}
                                                        value={expense.id}
                                                        onChange={(e) => handleCheckItem(e)}
                                                    />
                                                </div>
                                            </td>
                                            <td className="text-sm font-medium text-gray-900 text-center">
                                                {index + 1}
                                            </td>
                                            <td className="text-sm font-medium text-gray-900">
                                                {formatDate(expense.date_expense).format('DD-MM-yyyy')}
                                            </td>
                                            <td className="text-sm font-medium text-gray-900 truncate">
                                                {expense.name}
                                            </td>
                                            <td className="text-sm text-gray-900">
                                                {expense.job_number}
                                            </td>
                                            <td className="text-sm text-gray-500">
                                                {expense.description}
                                            </td>
                                            <td className="text-sm text-right text-gray-500">
                                                {formatIDR(expense.amount)}
                                            </td>
                                            <td>
                                                {expense.status}
                                            </td>
                                            <td className="flex gap-1  text-sm text-gray-500">
                                                {+auth.user.role === 3 ? (
                                                    <>
                                                        <Link 
                                                            href={route('expenses.decision', [expense.id, 2])}
                                                            method="put"
                                                            className="btn btn-xs"
                                                        >
                                                            Approve
                                                        </Link>
                                                        <Link 
                                                            href={route('expenses.decision', [expense.id, 3])}
                                                            method="put"
                                                            className="btn btn-xs"
                                                        >
                                                            Reject
                                                        </Link>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button
                                                            onClick={() => {}}
                                                            className="btn btn-xs"
                                                        >
                                                            Detail
                                                        </button>
                                                        <button
                                                            onClick={() => toggle(expense)}
                                                            className="btn btn-xs"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(expense)}
                                                            className="btn btn-xs"
                                                        >
                                                            Hapus
                                                        </button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className='flex w-full'>
                        <div className="flex mx-auto items-end mt-4">
                            <Pagination
                                links={links}
                                params={params}
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
            <ReactToPrint
                trigger={() => (
                    <button
                        ref={printBtn}
                        className="hidden"
                    >
                        Print
                    </button>
                )}
                content={() =>
                    componentToPrint.current
                }
            />
            <div className="hidden">
                <Print
                    name={name}
                    expenses={items}
                    ref={componentToPrint}
                />
            </div>
            <ModalConfirm
                isOpen={confirmModal.isOpen}
                toggle={confirmModal.toggle}
                onConfirm={onDelete}
            />
            <FormModal
                modalState={formModal}
            />
        </AuthenticatedLayout>
    );
}
