"use client";

import {useState} from "react";
import {FiEye, FiTrash2} from "react-icons/fi";
import Modal from "./Modal";
import {useRouter} from "next/navigation";
import {QuizContent} from "@/app/_utils/planetscale";

interface QuizContentProps {
    quizContent: QuizContent;
    onSelect: (QuizContent) => void;
}

const QuizComponent = ({quizContent, onSelect}: QuizContentProps) => {
    const router = useRouter();
    const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);

    const handleDeleteQuizContent = async (id: number | null) => {
        console.log('######### delete');
        setOpenModalDeleted(false);
        router.refresh();
    };

    const handleViewQuizContent = async (quizContent: QuizContent) => {
        onSelect(quizContent);
    };

    return (
        <tr key={quizContent.content_id}>
            <td className='w-full'>{quizContent.quiz_name}</td>
            <td className='flex gap-5'>
                <FiEye
                    onClick={() => handleViewQuizContent(quizContent)}
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
                        Are you sure, you want to delete this quiz?
                    </h3>
                    <div className='modal-action'>
                        <button onClick={() => handleDeleteQuizContent(quizContent.content_id)} className='btn'>
                            Yes
                        </button>
                    </div>
                </Modal>
            </td>
        </tr>
    );
};

export default QuizComponent;
