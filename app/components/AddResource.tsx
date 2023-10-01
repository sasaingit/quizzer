"use client";

import {AiOutlinePlus} from "react-icons/ai";
import Modal from "./Modal";
import {FormEventHandler, useState} from "react";
import {useRouter} from "next/navigation";
import uploadFile from "@/app/actions/uploadFile";

const AddResource = () => {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const res = await uploadFile(formData);
        setModalOpen(false);
        router.refresh();
    };


    return (
        <div>
            <button
                onClick={() => setModalOpen(true)}
                className='btn btn-primary w-full'
            >
                Add new resource <AiOutlinePlus className='ml-2' size={18}/>
            </button>

            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <form onSubmit={handleSubmit}>
                    <h3 className='font-bold text-lg'>Add new resource</h3>
                    <div className='modal-action'>
                        <input type="file" name="file"
                               className="file-input file-input-bordered file-input-primary w-full max-w-xs"/>
                        <button type='submit' className='btn'>
                            Upload
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default AddResource;
