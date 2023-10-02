"use client"

import React from "react";
import {QuizContent} from "@/app/_utils/planetscale";
import QuizComponent from "@/app/_components/QuizComponent";

interface QuizContentListProps {
  quizContents: QuizContent[];
  onSelect: (QuizContent) => void;
}

const QuizContentList = ({ quizContents, onSelect } : QuizContentListProps) => {
  return (
    <div className='overflow-x-auto'>
      <table className='table w-full'>
        {/* head */}
        <thead>
          <tr>
            <th>Quiz</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {quizContents && quizContents.map((quizContent) => (
            <QuizComponent key={quizContent.content_id} quizContent={quizContent} onSelect={onSelect} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuizContentList;
