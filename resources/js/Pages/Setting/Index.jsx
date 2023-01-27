import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({auth, name}) {
    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Setting</h2>}
        >
            <Head title="Setting" />

            <h1>Hello {name} {auth.name}</h1>

        </AuthenticatedLayout>
    );
}
