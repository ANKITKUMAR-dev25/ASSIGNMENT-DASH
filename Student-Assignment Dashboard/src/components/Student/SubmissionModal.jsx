import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { Button } from '../UI/Button';

export const SubmissionModal = ({ isOpen, onClose, assignment }) => {
  const { user } = useAuth();
  const { addSubmission, submissions } = useData(); 
  
  const existingSubmission = submissions.find(
    s => s.assignmentId === assignment.id && s.studentId === user.id
  );

  const [fileInputKey, setFileInputKey] = useState(Date.now()); 
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);
  const [isVerified, setIsVerified] = useState(false);

  useState(() => {
      if (existingSubmission) {
          setFile({ name: existingSubmission.fileName });
      }
  }, [existingSubmission]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleConfirmation = () => {
    setStep(2);
  };

  const handleSubmitFinal = () => {
    if (!file || !isVerified) {
      alert("Please select a file and check the verification box.");
      return;
    }

    const submissionData = {
      assignmentId: assignment.id,
      studentId: user.id,
      submittedOn: new Date().toISOString().split('T')[0],
      fileName: file.name,
    };
    
    addSubmission(submissionData);
    
    setStep(3);
  };

  const resetAndClose = () => {
    setStep(1);
    setFile(null);
    setIsVerified(false);
    setFileInputKey(Date.now()); 
    onClose();
  };

  const isGraded = existingSubmission?.status === 'graded';
  const isOverdue = new Date(assignment.dueDate) < new Date();

  const submissionStatusBlock = (
      <div className={`p-3 rounded-md mb-4 border ${isGraded ? 'bg-purple-50 border-purple-200' : 'bg-green-50 border-green-200'}`}>
          <p className="font-semibold text-lg">
            {isOverdue && !existingSubmission && <span className="text-red-600">⚠️ Assignment is Overdue!</span>}
            {isGraded && '✅ GRADING RECEIVED'}
            {existingSubmission && !isGraded && '✅ Submitted Previously'}
            {!existingSubmission && !isOverdue && 'Pending Submission'}
          </p>
          {existingSubmission && (
            <>
                <p className="text-sm text-gray-600">File: **{existingSubmission.fileName}**</p>
                <p className="text-sm text-gray-600">On: {existingSubmission.submittedOn}</p>
            </>
          )}
          {isGraded && (
              <>
                <p className="text-xl font-bold mt-2 text-purple-700">Score: {existingSubmission.score} / {assignment.maxScore}</p>
                <p className="text-sm italic mt-1">Feedback: {existingSubmission.feedback || 'None provided.'}</p>
              </>
          )}
      </div>
  );


  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-indigo-700 border-b pb-3 mb-4">
          {step === 3 ? '✅ Submission Complete' : `${existingSubmission ? 'View/Resubmit' : 'Submit'}: ${assignment.title}`}
        </h2>

        {submissionStatusBlock}

        {/* --- STEP 1: Upload File --- */}
        {step === 1 && (
          <div className="space-y-4">
            <p className="font-medium">Due Date: **{assignment.dueDate}**</p>
            <label className="block text-sm font-medium text-gray-700">Select File for {existingSubmission ? 'Resubmission' : 'Submission'}</label>
            <input 
                key={fileInputKey}
                type="file" 
                onChange={handleFileChange} 
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <div className="flex justify-end space-x-3 pt-4">
                <Button variant="secondary" onClick={resetAndClose}>Cancel</Button>
                <Button 
                    onClick={handleConfirmation} 
                    disabled={!file}
                >
                    Proceed to Verification
                </Button>
            </div>
          </div>
        )}

        {/* --- STEP 2: Verification --- */}
        {step === 2 && (
          <div className="space-y-6">
            <p className="text-lg font-semibold">Confirm Submission Details:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
                <li>**Assignment:** {assignment.title}</li>
                <li>**File:** {file?.name || 'N/A'}</li>
                <li>**Submitting as:** {user.username}</li>
            </ul>
            <div className="flex items-start">
              <input
                id="verification-check"
                type="checkbox"
                checked={isVerified}
                onChange={(e) => setIsVerified(e.target.checked)}
                className="h-5 w-5 text-indigo-600 rounded mt-1"
              />
              <label htmlFor="verification-check" className="ml-3 text-sm text-gray-900 font-medium">
                I solemnly affirm that this submission is my own work.
              </label>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="secondary" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button 
                onClick={handleSubmitFinal}
                disabled={!isVerified}
                className="bg-green-600 hover:bg-green-700"
              >
                Final Submit
              </Button>
            </div>
          </div>
        )}

        {/* --- STEP 3: Success --- */}
        {step === 3 && (
          <div className="text-center space-y-4">
            <p className="text-green-600 text-xl font-medium">Your assignment has been successfully submitted!</p>
            <p className="text-gray-600">The status has been updated in your assignment list.</p>
            <Button onClick={resetAndClose}>
              Close
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};