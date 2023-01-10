import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';

export default function Dashboard(props) {
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="Expense" />

            <div className="p-4">
                <div className="mx-auto max-w-7xl p-4 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className='flex justify-between space-x-0 lg:space-x-1 flex-row mb-2'>
                        <div className='btn'>Tambah</div>
                        <div className='btn'>Export Excel</div>
                    </div>
                    <div className='flex justify-between space-y-1 lg:space-y-0 space-x-0 lg:space-x-1 flex-col lg:flex-row'>
                        <div>
                            <div>Jumlah Record : 100</div>
                            <div>Jumlah Halaman : 24</div>
                        </div>
                        <div className='flex lg:space-x-2 space-x-0 lg:space-y-0 space-y-1 flex-col lg:flex-row'>
                            <div className='flex space-x-1'>
                                <input className='input input-bordered w-full lg:w-32' placeholder='start date' defaultValue={'01/10/2023'}/>
                                <input className='input input-bordered w-full lg:w-32' placeholder='end date'defaultValue={'01/10/2023'}/>
                            </div>
                            <div>
                                <input className='input input-bordered w-full' placeholder='search'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
