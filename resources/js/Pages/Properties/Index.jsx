import {Head, Link} from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Guest from "@/Layouts/GuestLayout.jsx";

export function getProperties(){
    return fetch('/api/property').then(data => data.json())
}
export default function Index({  }) {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        let mounted = true;
        getProperties()
            .then(items => {
                if(mounted) {
                    setProperties(items)
                }
            })
        return () => mounted = false;
    }, [])

    function deleteProperty(property){
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        }
        fetch('/api/property/' + property,requestOptions).then(()=>{
            getProperties().then(items => {
                setProperties(items)
            })
        })
    }

    return (
        <Guest
            header={"Properties"}
        >
            <Head title="Properties" />
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold leading-6 text-gray-900">Properties</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            A list of all the properties in the system
                        </p>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <Link
                            href="/property/create"
                            className="block rounded-md bg-cyan-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                        >
                            Add property
                        </Link>
                    </div>
                </div>
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        Name
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Address
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        No. Rooms
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {properties.map((property) => (
                                    <tr key={property.id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                            {property.name}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{property.address}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{property.no_rooms}</td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                            <Link href={'property/' + property.id + '/edit'} className="text-cyan-600 hover:text-cyan-900 pr-3">
                                                Edit<span className="sr-only"> {property.name}</span>
                                            </Link>
                                            <button onClick={()=> deleteProperty(property.id)} className="text-red-600 hover:text-red-900">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </Guest>
    );
}
