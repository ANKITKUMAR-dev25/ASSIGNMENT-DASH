import React, { createContext, useContext, useState } from 'react';
import { mockAssignments, mockSubmissions } from '../data/mockData';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [assignments, setAssignments] = useState(mockAssignments);
  const [submissions, setSubmissions] = useState(mockSubmissions); 

  const addAssignment = (newAssignment) => {
    setAssignments(prev => [...prev, { ...newAssignment, id: Date.now().toString() }]);
  };

  const addSubmission = (submissionData) => {
    const existingSubmissionIndex = submissions.findIndex(
      s => s.assignmentId === submissionData.assignmentId && s.studentId === submissionData.studentId
    );
    
    if (existingSubmissionIndex !== -1) {
        setSubmissions(prev => {
            const newSubs = [...prev];
            newSubs[existingSubmissionIndex] = { 
                ...prev[existingSubmissionIndex],
                ...submissionData, 
                id: prev[existingSubmissionIndex].id, 
                status: 'submitted',
                score: null, 
                feedback: null 
            };
            return newSubs;
        });
    } else {
        setSubmissions(prev => [...prev, { ...submissionData, id: Date.now().toString(), status: 'submitted' }]);
    }
  };

  const gradeSubmission = (submissionId, score, feedback) => {
    setSubmissions(prevSubmissions => 
      prevSubmissions.map(sub => 
        sub.id === submissionId
          ? { 
              ...sub, 
              score: score, 
              feedback: feedback, 
              status: 'graded'
            }
          : sub
      )
    );
  };

  return (
    <DataContext.Provider value={{ 
        assignments, 
        submissions, 
        addAssignment, 
        addSubmission, 
        gradeSubmission 
    }}>
      {children}
    </DataContext.Provider>
  );
};