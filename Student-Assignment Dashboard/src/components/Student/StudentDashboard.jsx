import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { BarChart } from '../UI/BarChart'; 

// Helper component for clean stat display
const DashboardStat = ({ title, value, color }) => (
    <div className={`p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ${color} text-center`}>
        <div className="text-5xl font-extrabold">{value}</div>
        <div className="text-lg font-medium mt-2">{title}</div>
    </div>
);

export const StudentDashboard = () => {
  const { user } = useAuth();
  const { assignments, submissions } = useData();
  
  const now = new Date();
  const totalAssignments = assignments.length;
  const mySubmissions = submissions.filter(s => s.studentId === user.id);
  
  const submittedAssignmentIds = new Set(mySubmissions.map(s => s.assignmentId));
  const submittedCount = submittedAssignmentIds.size;
  const gradedCount = mySubmissions.filter(s => s.status === 'graded').length;
  
  const assignmentsDue = assignments.filter(assignment => {
      const hasSubmitted = submittedAssignmentIds.has(assignment.id);
      const dueDate = new Date(assignment.dueDate);
      dueDate.setHours(0, 0, 0, 0); 
      const todayStart = new Date(now);
      todayStart.setHours(0, 0, 0, 0);
      return !hasSubmitted && dueDate >= todayStart;
  });
  const assignmentsDueCount = assignmentsDue.length;

  const overdueAssignments = assignments.filter(assignment => {
      const hasSubmitted = submittedAssignmentIds.has(assignment.id);
      const dueDate = new Date(assignment.dueDate);
      dueDate.setHours(23, 59, 59, 999); 
      return !hasSubmitted && dueDate < now;
  });
  const overdueCount = overdueAssignments.length;


  // --- CHART LOGIC: Performance Bar Chart ---
  const gradedSubmissions = mySubmissions
    .filter(s => s.status === 'graded')
    .sort((a, b) => new Date(a.submittedOn) - new Date(b.submittedOn));

  const performanceLabels = gradedSubmissions.map(sub => {
    const assignment = assignments.find(a => a.id === sub.assignmentId);
    return assignment ? assignment.title.split(' ').slice(0, 2).join(' ') : 'N/A';
  });
  
  const performanceScores = gradedSubmissions.map(sub => sub.score);
  const maxScoreData = gradedSubmissions.map(sub => {
    const assignment = assignments.find(a => a.id === sub.assignmentId);
    return assignment ? assignment.maxScore : 100;
  });
  
  const overallMaxScore = maxScoreData.length > 0 ? Math.max(...maxScoreData) : 100;
  const showPerformanceChart = performanceScores.length >= 1;


  return (
    <div className="p-8 dashboard-content">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-800">
        👋 Welcome back, <span className="text-indigo-600">{user?.username}</span>!
      </h1>
      <p className="text-gray-500 mb-8">Your assignment overview at a glance.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <DashboardStat 
            title="Total Assignments" 
            value={totalAssignments} 
            color="bg-white text-gray-800" 
        />
        <DashboardStat 
            title="Submissions Sent" 
            value={submittedCount} 
            color="bg-green-50 text-green-700 border-b-4 border-green-400" 
        />
        <DashboardStat 
            title="Graded Returns" 
            value={gradedCount} 
            color="bg-indigo-50 text-indigo-700 border-b-4 border-indigo-400" 
        />
        <DashboardStat 
            title="Assignments Due" 
            value={assignmentsDueCount} 
            color="bg-red-50 text-red-700 border-b-4 border-red-400" 
        />
      </div>

      {overdueCount > 0 && (
          <div className="mb-10 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded-lg shadow-md">
              <span className="font-bold">{overdueCount} Assignment{overdueCount > 1 ? 's' : ''} Overdue!</span> Please submit immediately.
          </div>
      )}


      {/* PERFORMANCE BAR CHART */}
      {showPerformanceChart ? (
          <div className="mb-10 bg-white p-8 rounded-xl shadow-2xl border-t-4 border-purple-500">
              <BarChart
                  data={performanceScores}
                  labels={performanceLabels}
                  title="Your Performance Scores"
                  color="bg-purple-600"
                  maxVal={overallMaxScore}
              />
          </div>
      ) : gradedCount > 0 ? (
          <p className="text-center text-gray-500 italic mb-10">Only {gradedCount} assignment has been graded so far.</p>
      ) : null}


      <div className="bg-white p-8 rounded-xl shadow-2xl border-t-4 border-blue-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Action Center</h2>
        <p className="text-gray-600 mb-6">Access your full list of assignments to view grades or submit new work.</p>
        <Link
          to="/assignments"
          className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-xl transition duration-150 text-lg group"
        >
          View All Assignments
          <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </div>
  );
};