'use client'

import React, { useState } from 'react';
import QuizContentList from './QuizContentList'; // Adjust the import path accordingly
import Quiz from './Quiz';
import {QuizContent} from "@/app/_utils/planetscale"; // Adjust the import path accordingly

function Container({ quizContents } : QuizContent[] ) {
    const [selectedQuizData, setSelectedQuizData] = useState(null);

    const handleQuizSelect = (QuizContent) => {
        setSelectedQuizData(QuizContent.data)
    }

    return (
        <div className="container">
            <QuizContentList quizContents={quizContents} onSelect={handleQuizSelect} />
            {selectedQuizData && <Quiz quizData={selectedQuizData} />}
        </div>
    );
}

export default Container;
