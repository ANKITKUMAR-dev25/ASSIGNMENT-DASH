import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { mockUsers } from '../../data/mockData';
import { Button } from '../UI/Button';

// --- GradingForm Component (Internal) ---
const GradingForm = ({ submission, maxScore, onGrade }) => {
  const [score, setScore] = useState(submission.score || '');
  const [feedback, setFeedback] = useState(submission.feedback || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const numericScore = parseFloat(score);

    if (isNaN(numericScore) || numericScore < 0 || numericScore > maxScore) {
      alert(`Please enter a valid score between 0 and ${maxScore}.`);
      return;
    }
    
    onGrade(submission.id, numericScore, feedback); 
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg border border-indigo-200 mt-3 space-y-3">
        <div className="flex space-x-4">
            <div className="w-1/3">
                <label className="block text-sm font-medium text-gray-700">Score (Max: {maxScore})</label>
                <input
                    type="number"
                    min="0"
                    max={maxScore}
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>
            <div className="w-2/3">
                <label className="block text-sm font-medium text-gray-700">Feedback</label>
                <textarea
                    rows="2"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    placeholder="Enter grading comments here..."
                />
            </div>
        </div>
        <Button 
            type="submit" 
            className="bg-green-600 hover:bg-green-700"
        >
            {submission.status === 'graded' ? 'Update Grade' : 'Save Grade'} 
        </Button>
    </form>
  );
};


export const AssignmentSubmissions = () => {
  const { assignmentId } = useParams();
  const { assignments, submissions, gradeSubmission } = useData(); 
  
  const [openGradingId, setOpenGradingId] = useState(null);

  const assignment = assignments.find(a => a.id === assignmentId);
  const relevantSubmissions = submissions.filter(s => s.assignmentId === assignmentId);
  
  const studentMap = mockUsers
    .filter(u => u.role === 'student')
    .reduce((map, user) => {
        map[user.id] = user.username;
        return map;
    }, {});

  if (!assignment) {
    return (
      <div className="p-8 text-center text-xl text-red-600">
        Assignment not found. <Link to="/admin" className="text-blue-600 hover:underline">Go back to dashboard</Link>.
      </div>
    );
  }

  const handleGrade = (submissionId, score, feedback) => {
    gradeSubmission(submissionId, score, feedback); 
    setOpenGradingId(null); 
  };

  const sortedSubmissions = relevantSubmissions.sort((a, b) => {
    if (a.status === 'graded' && b.status !== 'graded') return 1;
    if (a.status !== 'graded' && b.status === 'graded') return -1;
    return new Date(b.submittedOn) - new Date(a.submittedOn);
  });

  return (
    <div className="p-8">
      <Link to="/admin" className="text-blue-600 hover:underline mb-4 block">← Back to Dashboard</Link>
      <h1 className="text-4xl font-extrabold mb-2 text-gray-800">📦 Grade Submissions for:</h1>
      <h2 className="text-3xl font-semibold text-indigo-700 mb-8">"{assignment.title}" (Max: {assignment.maxScore})</h2>

      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h3 className="text-2xl font-bold mb-4 border-b pb-2">Submissions Received ({relevantSubmissions.length})</h3>
        
        {relevantSubmissions.length === 0 ? (
            <p className="text-gray-500 italic">No submissions received yet.</p>
        ) : (
            <div className="space-y-4">
                {sortedSubmissions.map(sub => {
                    const isGraded = sub.status === 'graded';
                    const isFormOpen = openGradingId === sub.id;

                    return (
                        <div key={sub.id} className={`p-4 rounded-lg shadow-md ${isGraded ? 'bg-green-50' : 'bg-red-50'}`}>
                            
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-xl font-bold text-gray-800">Student: {studentMap[sub.studentId] || 'Unknown'}</p>
                                    <p className="text-sm text-gray-600">Submitted: {sub.submittedOn}</p>
                                    <p className="text-sm text-gray-600">File: **{sub.fileName}**</p>
                                </div>
                                <div className="text-right">
                                    {isGraded ? (
                                        <p className="text-3xl font-extrabold text-green-700">
                                            {sub.score} / {assignment.maxScore}
                                        </p>
                                    ) : (
                                        <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-red-200 text-red-800">
                                            Needs Grading
                                        </span>
                                    )}
                                </div>
                            </div>
                            
                            <div className="flex justify-end space-x-3 mt-3 border-t pt-3">
                                <a href="#" 
                                    className="text-blue-600 hover:underline font-medium text-sm" 
                                    onClick={(e) => { e.preventDefault(); alert(`Simulating download of: ${sub.fileName}`); }}
                                >
                                    Download File
                                </a>
                                <Button 
                                    variant={isGraded ? 'secondary' : 'primary'} 
                                    onClick={() => setOpenGradingId(isFormOpen ? null : sub.id)}
                                >
                                    {isFormOpen ? 'Close Grading' : (isGraded ? 'Edit Grade' : 'Grade Now')}
                                </Button>
                            </div>

                            {isFormOpen && (
                                <GradingForm 
                                    submission={sub} 
                                    maxScore={assignment.maxScore} 
                                    onGrade={handleGrade}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        )}
      </div>
    </div>
  );
};