import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { SubmissionTracker } from './SubmissionTracker'; 
import { GlobalStats } from './GlobalStats';
import { Button } from '../UI/Button';
import { BarChart } from '../UI/BarChart';

export const AdminDashboard = () => {
  const { assignments, submissions } = useData();

  // --- CHART LOGIC: Submission Rate Bar Chart ---
  const sortedAssignments = [...assignments].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  const submissionRateLabels = sortedAssignments.map(a => a.title.split(' ').slice(0, 2).join(' '));
  
  const totalStudents = 3; 
  
  const submissionRateData = sortedAssignments.map(assignment => {
      const submittedCount = new Set(
          submissions.filter(s => s.assignmentId === assignment.id).map(s => s.studentId)
      ).size;
      return (submittedCount / totalStudents) * 100;
  });
  
  const showSubmissionRateChart = submissionRateData.length >= 1;
  // --------------------------------------------------------


  return (
    <div className="p-8 dashboard-content">
      <h1 className="text-4xl font-extrabold mb-2 text-gray-800">👑 Admin Control Panel</h1>
      <p className="text-gray-500 mb-8">Manage assignments, track submissions, and view class performance.</p>
      
      {/* --- Section 1: Create Assignment Action --- */}
      <div className="flex justify-between items-center mb-10 bg-indigo-500 p-6 rounded-xl shadow-lg text-white">
        <div className="text-2xl font-semibold">
            Ready to publish a new challenge?
        </div>
        <Link to="/admin/new">
          <Button className="bg-white text-indigo-700 hover:bg-gray-100 font-extrabold py-3 px-8 text-lg shadow-2xl">
            + Create New Assignment
          </Button>
        </Link>
      </div>
      
      {/* --- Section 2: Global Stats and Submission Tracker (Side-by-Side) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        
        <div className="lg:col-span-2 space-y-8">
            {/* 1. Average Score Bar Chart (GlobalStats component) */}
            <GlobalStats /> 

            {/* 2. SUBMISSION RATE BAR CHART */}
            {showSubmissionRateChart ? (
                <div className="bg-white p-6 rounded-xl shadow-xl border-t-4 border-red-500">
                    <BarChart 
                        data={submissionRateData}
                        labels={submissionRateLabels}
                        title="Submission Rate (%) by Assignment"
                        color="bg-red-600"
                        maxVal={100} 
                    />
                </div>
            ) : (
                <div className="p-4 bg-gray-100 rounded-xl border border-gray-300 text-gray-600">
                    Create assignments and receive submissions to view the rate chart.
                </div>
            )}
        </div>

        <SubmissionTracker isMini={true} /> 
        
      </div>

      {/* --- Section 3: Assignment List --- */}
      
      <div className="bg-white p-8 rounded-xl shadow-2xl border-t-4 border-blue-500">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2 text-gray-800">Assignment List ({assignments.length})</h2>
        {assignments.length === 0 ? (
          <p className="text-gray-500 italic">No assignments have been created yet.</p>
        ) : (
          <ul className="space-y-4">
            {assignments.map(assignment => (
              <li key={assignment.id} className="p-4 border border-gray-100 rounded-lg bg-gray-50 flex justify-between items-center hover:bg-gray-100 transition duration-150 shadow-sm">
                <div>
                  <h3 className="text-lg font-bold text-blue-700">{assignment.title}</h3>
                  <p className="text-sm text-gray-600">Due: **{assignment.dueDate}** | Max Score: {assignment.maxScore}</p>
                </div>
                <Link to={`/admin/submissions/${assignment.id}`}>
                  <button className="text-sm bg-purple-100 text-purple-600 hover:bg-purple-600 hover:text-white py-2 px-4 rounded-lg font-medium transition duration-150">
                    View & Grade Submissions →
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};