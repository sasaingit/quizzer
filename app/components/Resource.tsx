"use client";

import {useState} from "react";
import {FiEye, FiTrash2} from "react-icons/fi";
import Modal from "./Modal";
import {useRouter} from "next/navigation";
import {ResourceType} from "@/lib/planetscale";

interface ResourceProps {
    resource: ResourceType;
    onSelect: (ResourceType) => void;
}

const Resource = ({resource, onSelect}: ResourceProps) => {
    const router = useRouter();
    const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);

    const handleDeleteResource = async (id: number) => {
        console.log('######### delete');
        setOpenModalDeleted(false);
        router.refresh();
    };

    const handleViewResource = async (resource: ResourceType) => {
        onSelect(resource);
    };

    return (
        <tr key={resource.id}>
            <td className='w-full'>{resource.name}</td>
            <td className='flex gap-5'>
                <FiEye
                    onClick={() => handleViewResource(resource)}
                    cursor='pointer'
                    className='text-blue-500'
                    size={25}
                />
                <FiTrash2
                    onClick={() => setOpenModalDeleted(true)}
                    cursor='pointer'
                    className='text-red-500'
                    size={25}
                />
                <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
                    <h3 className='text-lg'>
                        Are you sure, you want to delete this resource?
                    </h3>
                    <div className='modal-action'>
                        <button onClick={() => handleDeleteResource(resource.id)} className='btn'>
                            Yes
                        </button>
                    </div>
                </Modal>
            </td>
        </tr>
    );
};

export default Resource;
