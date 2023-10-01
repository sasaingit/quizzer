'use client'

import React, { useState } from 'react';
import ResourceList from './ResourceList'; // Adjust the import path accordingly
import Quiz from './Quiz'; // Adjust the import path accordingly

function Container({ resources }) {
    const [selectedQuizData, setSelectedQuizData] = useState(null);

    const handleResourceSelect = (resource) => {
        setSelectedQuizData(JSON.parse(resource.data))
    }

    return (
        <div className="container">
            <ResourceList resources={resources} onSelect={handleResourceSelect} />
            {selectedQuizData && <Quiz quizData={selectedQuizData} />}
        </div>
    );
}

export default Container;
