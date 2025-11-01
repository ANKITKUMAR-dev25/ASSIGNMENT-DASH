import React from 'react';
import { useData } from '../../contexts/DataContext';
import { mockUsers } from '../../data/mockData';
import { ProgressIndicator } from '../UI/ProgressIndicator';

export const SubmissionTracker = ({ isMini = false }) => {
  const { assignments, submissions } = useData();
  
  const totalStudents = mockUsers.filter(user => user.role === 'student').length;

  if (assignments.length === 0 || totalStudents === 0) {
    return null;
  }

  const trackedAssignments = assignments.map(assignment => {
    const submittedStudentIds = new Set(
        submissions
            .filter(sub => sub.assignmentId === assignment.id)
            .map(sub => sub.studentId)
    );
    
    const submittedCount = submittedStudentIds.size;
    const submissionRate = totalStudents > 0 
        ? Math.round((submittedCount / totalStudents) * 100)
        : 0;

    return {
      ...assignment,
      submittedCount,
      submissionRate,
    };
  });

  const wrapperClass = isMini 
      ? "p-6 bg-white shadow-xl rounded-xl border-t-4 border-green-500 h-full" 
      : "mt-10 p-6 bg-white shadow-xl rounded-lg";

  return (
    <div className={wrapperClass}>
      <h2 className={`font-bold text-gray-800 ${isMini ? 'text-xl mb-4' : 'text-3xl mb-6 border-b pb-3'}`}>
          🎯 Submission Rate Summary
      </h2>
      
      <div className="space-y-4">
        {trackedAssignments.map((assignment) => (
          <div key={assignment.id} className="p-3 border border-gray-100 rounded-lg bg-white shadow-sm">
            <h3 className="text-sm font-semibold text-blue-700 mb-1 truncate">{assignment.title}</h3>
            
            <div className="flex items-center space-x-3">
              <div className="w-full">
                <ProgressIndicator 
                  percentage={assignment.submissionRate} 
                  color={assignment.submissionRate < 50 ? 'bg-red-500' : 'bg-green-600'} 
                />
              </div>
              <div className="flex-shrink-0">
                <span className="text-sm font-bold text-gray-800">{assignment.submissionRate}%</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
                ({assignment.submittedCount} / {totalStudents} submitted)
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};