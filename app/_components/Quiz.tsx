'use client'

import React, {useEffect, useState} from 'react';
import {MdClose, MdDone} from "react-icons/md";

const Quiz = ({ quizData }) => {
    const [userAnswers, setUserAnswers] = useState({});
    const [results, setResults] = useState(null);
    useEffect(() => {
        setUserAnswers({});
        setResults(null);
    }, [quizData]);

    const handleOptionChange = (question, option) => {
        setUserAnswers(prev => ({ ...prev, [question]: option }));
    };

    const handleSubmit = () => {
        const evaluationResults = quizData.map(question => {
            const userAnswer = userAnswers[question.question];
            const isCorrect = userAnswer === question.answer;
            return {
                question: question.question,
                userAnswer,
                isCorrect,
                correctAnswer: question.answer
            };
        });

        setResults(evaluationResults);
    };

    return (
        <div>
            <div>
                {quizData.map((question, index) => (
                    <div key={index} className="p-4">
                        <p className="text-lg font-semibold">{question.question}</p>
                        <form>
                            {question.options.map((option, idx) => (
                                <div key={idx} className="mt-2">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            className="form-radio"
                                            name={question.question}
                                            value={option}
                                            checked={userAnswers[question.question] === option}
                                            onChange={() => handleOptionChange(question.question, option)}
                                        />
                                        <span className="ml-2">{option}</span>
                                    </label>
                                </div>
                            ))}
                        </form>
                    </div>
                ))}

                <div className="p-4 flex items-center justify-between">
                    <button className="btn btn-blue" onClick={handleSubmit}>Submit</button>
                </div>

                {results && (
                    <div className="p-4">
                        <h2 className="text-2xl font-bold mb-4">Results</h2>
                        <ul>
                            {results.map((result, index) => (
                                <li key={index} className="mb-2">
                                    <p><strong>{result.question}</strong></p>
                                    <p className={`mt-1 ${result.isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                                        Your Answer: {result.userAnswer} {result.isCorrect ? <MdDone color="green" size={20} /> : <MdClose color="red" size={20} />}
                                    </p>
                                    {!result.isCorrect && <p className="mt-1 text-gray-500">Correct Answer: {result.correctAnswer}</p>}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Quiz;

