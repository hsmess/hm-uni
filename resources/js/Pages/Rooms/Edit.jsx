import {Head} from '@inertiajs/react';
import {useEffect, useState} from 'react';
import Guest from "@/Layouts/GuestLayout.jsx";

export default function Edit({ room }) {
    const [name, setName ] = useState('');
    const [size, setSize ] = useState('');
    async function submitForm(event){
        event.preventDefault();
        const requestOptions = {
            method: "PUT",
            headers: { 'Content-Type': 'application/json', 'Accept' : 'application/json' },
            body: JSON.stringify({
                name: name,
                size: size
            })
        }
        await fetch('/api/room/' + room.id,requestOptions).then((response) => {
            if (response.status >= 400 && response.status < 600) {
                throw new Error('Validation failed or other server error'); //Todo: implement proper validation handling
            }
            return response;
        }).then((returnedResponse) => {
            // Your response to manipulate
            alert('success');
            window.location.href = '/rooms?property='+ room.property_id;
        }).catch((error) => {
            // Your error is here!
            alert(error);
        });
    }
    useEffect(() => {
        if(room){
            setName(room.name)
            setSize(room.size)
        }
    }, [])

    return (
        <Guest
            header={"Editing Room: " + room.name}
        >
            <Head title="Rooms" />
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
                                    Size (m/sq)
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="size"
                                        value={size}
                                        onChange={event => {
                                            setSize(event.target.value);
                                        }}
                                        name="size"
                                        type="number"
                                        step="0.01"
                                        min="0"
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
                        Update
                    </button>
                </div>
            </form>
        </Guest>
    );
}
