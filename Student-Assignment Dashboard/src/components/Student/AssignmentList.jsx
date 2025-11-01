import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { SubmissionModal } from './SubmissionModal';
import { Button } from '../UI/Button';

export const AssignmentList = () => {
  const { assignments, submissions } = useData();
  const { user } = useAuth();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const openSubmissionModal = (assignment) => {
    setSelectedAssignment(assignment);
    setIsModalOpen(true);
  };

  const getStatus = (assignment) => {
    const submission = submissions.find(s => 
      s.assignmentId === assignment.id && s.studentId === user.id
    );
    
    const now = new Date();
    const dueDate = new Date(assignment.dueDate);
    dueDate.setHours(23, 59, 59, 999); 

    if (submission) {
        if (submission.status === 'graded') return 'Graded';
        return 'Submitted';
    }

    if (dueDate < now) {
        return 'Overdue';
    }

    return 'Pending';
  };

  const getBorderColor = (status) => {
    switch (status) {
        case 'Graded': return 'border-purple-600';
        case 'Submitted': return 'border-green-600';
        case 'Overdue': return 'border-red-600';
        default: return 'border-blue-600';
    }
  };

  return (
    <div className="p-8 dashboard-content">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800">📚 Available Assignments</h1>
      
      <div className="space-y-6">
        {assignments.map(assignment => {
            const status = getStatus(assignment);
            return (
                <div 
                    key={assignment.id} 
                    className={`bg-white p-6 rounded-xl shadow-lg border-l-4 hover:shadow-2xl transition duration-300 ${getBorderColor(status)} flex justify-between items-center`}
                >
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{assignment.title}</h2>
                        <p className="text-gray-600 mt-1">{assignment.description}</p>
                        <p className={`text-sm font-medium mt-2 ${status === 'Overdue' ? 'text-red-700 font-bold' : 'text-gray-500'}`}>
                            Due Date: **{assignment.dueDate}**
                        </p>
                    </div>
                    
                    <div className="text-right">
                        <span className={`inline-block px-4 py-1 text-sm font-extrabold rounded-full shadow-md ${
                            status === 'Graded' ? 'bg-purple-600 text-white' : 
                            status === 'Submitted' ? 'bg-green-100 text-green-700' : 
                            status === 'Overdue' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                        } mb-3`}>
                            {status}
                        </span>
                        
                        <Button
                            onClick={() => openSubmissionModal(assignment)}
                            className={`ml-4 py-2 px-4 shadow-lg ${
                                status === 'Submitted' || status === 'Graded'
                                ? 'bg-purple-600 hover:bg-purple-700'
                                : 'bg-indigo-600 hover:bg-indigo-700'
                            }`}
                        >
                            {status === 'Graded' ? 'View Grade/Resubmit' : 
                            status === 'Submitted' ? 'View/Resubmit' : 
                            status === 'Overdue' ? 'Submit Now (Late)' : 'Submit Assignment'}
                        </Button>
                    </div>
                </div>
            )})}
      </div>

      {selectedAssignment && (
        <SubmissionModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          assignment={selectedAssignment}
        />
      )}
    </div>
  );
};