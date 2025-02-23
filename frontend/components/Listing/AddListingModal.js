import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import useAirbnb from '../../hooks/useAirbnb'

export default function AddListingModal({ addAirbnb, addListingModalOpen, setAddListingModalOpen }) {
    const  { addOrganization } = useAirbnb()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [maxMemberNumber, setmaxMemberNumber] = useState(0)
    const [logo, setLogo] = useState('')

    const closeModal = () => {
        setAddListingModalOpen(false)
    }

    const onCreate = (e) => {
        e.preventDefault()

        addOrganization({
            name,
            description,
            maxMemberNumber,
            logo,
        })

        closeModal()
    }

    return (
        <Transition appear show={addListingModalOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={closeModal}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                    Create an organization
                                </Dialog.Title>

                                <div className="mt-2">
                                    <div className="grid grid-cols-1 gap-3">
                                        <label className="flex flex-col border rounded-lg px-3 py-2" htmlFor="name">
                                            <span className="text-xs font-light">Name</span>
                                            <input onChange={(e) => setName(e.target.value)} className="outline-none bg-transparent text-sm pt-1" type="text" id="name" name="name" />
                                        </label>

                                        <label className="flex flex-col border rounded-lg px-3 py-2" htmlFor="description">
                                            <span className="text-xs font-light">Description</span>
                                            <input onChange={(e) => setDescription(e.target.value)} className="outline-none bg-transparent text-sm pt-1" type="text" id="description" name="description" />
                                        </label>

                                        <label className="flex flex-col border rounded-lg px-3 py-2" htmlFor="maxMemberNumber">
                                            <span className="text-xs font-light">Maximum number of members</span>
                                            <input onChange={(e) => setmaxMemberNumber(e.target.value)} className="outline-none bg-transparent text-sm pt-1" type="number" id="maxMemberNumber" name="maxMemberNumber" />
                                        </label>

                                        <label className="flex flex-col border rounded-lg px-3 py-2" htmlFor="logo">
                                            <span className="text-xs font-light">Logo</span>
                                            <input onChange={(e) => setLogo(e.target.value)} className="outline-none bg-transparent text-sm pt-1" type="text" id="logo" name="logo" />
                                        </label>
                                    </div>

                                    <div className="mt-4 flex justify-end">
                                        <button onClick={onCreate} type="button" className="border rounded-lg px-4 py-2 text-sm font-medium">
                                            Create
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}