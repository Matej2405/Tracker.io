import { Fragment, useState } from 'react'; 
import { Dialog, Transition } from '@headlessui/react';

export default function CreateOrganizationModal({ 
    isOpen, 
    onClose,
    onCreateOrganization 
}) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [maxMembers, setMaxMembers] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreateOrganization({
            name,
            description,
            maxMemberNumber: maxMembers,
            image
        });
        onClose();
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                    Create Organization
                                </Dialog.Title>
                                <div className="mt-2">
                                    <div className="grid grid-cols-1 gap-3">
                                        <label className="flex flex-col border rounded-lg px-3 py-2">
                                            <span className="text-xs font-light">Organization Name</span>
                                            <input
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="outline-none bg-transparent text-sm pt-1"
                                            />
                                        </label>

                                        <label className="flex flex-col border rounded-lg px-3 py-2">
                                            <span className="text-xs font-light">Description</span>
                                            <textarea
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                className="outline-none bg-transparent text-sm pt-1 resize-none"
                                                rows="3"
                                            />
                                        </label>

                                        <label className="flex flex-col border rounded-lg px-3 py-2">
                                            <span className="text-xs font-light">Max Members</span>
                                            <input
                                                type="number"
                                                value={maxMembers}
                                                onChange={(e) => setMaxMembers(e.target.value)}
                                                className="outline-none bg-transparent text-sm pt-1"
                                            />
                                        </label>

                                        <label className="flex flex-col border rounded-lg px-3 py-2">
                                            <span className="text-xs font-light">Image URL</span>
                                            <input
                                                value={image}
                                                onChange={(e) => setImage(e.target.value)}
                                                className="outline-none bg-transparent text-sm pt-1"
                                            />
                                        </label>
                                    </div>

                                    <div className="mt-4 flex justify-end gap-2">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            onClick={handleSubmit}
                                            className="px-4 py-2 text-sm font-medium text-white bg-purple-500 hover:bg-purple-600 rounded-lg"
                                        >
                                            Create Organization
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}