import {Head, Link} from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Guest from "@/Layouts/GuestLayout.jsx";
import {getProperties} from "@/Pages/Properties/Index.jsx";

export default function Create({  }) {
    const [name, setName ] = useState('');
    const [address, setAddress ] = useState('');

    function submitForm(event){
        event.preventDefault();
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                address: address
            })
        }
        fetch('/api/property',requestOptions).then(()=>{
            alert('created'); //todo: replace with proper success handling
            setName("");
            setAddress("");
        }).catch(
            error => alert(error) //todo: replace with proper error handling
        )
    }

    return (
        <Guest
            header={"Create Property"}
        >
            <Head title="Properties" />
                <form onSubmit={submitForm}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">

                        <div className="mt-10 ml-3 mr-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="name"
                                        value={name}
                                        onChange={event => {
                                            setName(event.target.value);
                                        }}
                                        name="name"
                                        type="text"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                                    Address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="address"
                                        value={address}
                                        onChange={event => {
                                            setAddress(event.target.value);
                                        }}
                                        name="address"
                                        type="text"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="block rounded-md bg-cyan-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                    >
                        Create
                    </button>
                </div>
            </form>
        </Guest>
    );
}
