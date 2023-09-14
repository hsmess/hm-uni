import {Head, Link} from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Guest from "@/Layouts/GuestLayout.jsx";

export function getProperties(){
    return fetch('/api/property').then(data => data.json())
}

export function getRooms(property_id){
    return fetch('/api/room/' + property_id).then(data => data.json())
}
export default function Index({  }) {
    const [properties, setProperties] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const searchParams = new URLSearchParams(document.location.search)
    //load the properties for the dropdown
    useEffect(() => {
        let mounted = true;
        getProperties()
            .then(items => {
                if(mounted) {
                    setProperties(items)
                }
            })
        if(searchParams.has('property'))
        {
            setSelectedProperty(searchParams.get('property'))
            getRooms(searchParams.get('property')).then(items => {
                setRooms(items)
            })
        }

        return () => mounted = false;
    }, [])

    function deleteRoom(room){
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        }
        fetch('/api/room/' + room,requestOptions).then(()=>{
            getRooms(selectedProperty).then(items => {
                setRooms(items)
            })
        })
    }

    return (
        <Guest
            header={"Rooms"}
        >
            <Head title="Rooms" />

            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold leading-6 text-gray-900">Select Property</h1>
                        <p className="mt-2 text-sm text-gray-700">
                           Select property here, rooms will be displayed below once selected
                        </p>
                    </div>
                </div>
                <div className="sm:flex sm:items-center w-[300px]">
                    <div>
                        <select
                            value={selectedProperty}
                            onChange={event => {
                                setSelectedProperty(event.target.value);
                                getRooms(event.target.value).then(items => {
                                    setRooms(items)
                                })
                            }}
                            id="property"
                            name="property"
                            className="mt-2 block w-[300px] rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-cyan-600 sm:text-sm sm:leading-6"
                        >
                            <option value="">-</option>
                            {properties.map((property) => (
                                <option  key={property.id} value={property.id}>{property.name}</option>
                            ))}
                        </select>
                    </div>

                </div>
                {selectedProperty && <div className="mt-8 flow-root" >
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h2 className="text-base font-semibold leading-6 text-gray-900">Rooms</h2>
                        </div>
                        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                            <Link
                                href={'/room/create?property=' + selectedProperty}
                                className="block rounded-md bg-cyan-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                            >
                                Add room
                            </Link>
                        </div>
                    </div>
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            {rooms.length > 0 ? <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        Name
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Size
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {rooms.map((room) => (
                                    <tr key={room.id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                            {room.name}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{room.size}</td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                            <Link href={'room/' + room.id + '/edit'} className="text-cyan-600 hover:text-cyan-900 pr-3">
                                                Edit<span className="sr-only"> {room.name}</span>
                                            </Link>
                                            <button onClick={()=> deleteRoom(room.id)} className="text-red-600 hover:text-red-900">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                                :
                            <table className="min-w-full divide-y divide-gray-300">
                                <tbody className="divide-y divide-gray-200">
                                    <tr>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                            No Rooms yet...
                                            <Link href={'room/create?property=' + selectedProperty} className="text-cyan-600 hover:text-cyan-900 pr-3">
                                                Create one?
                                            </Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            }
                        </div>
                    </div>
                </div>}
            </div>

        </Guest>
    );
}
