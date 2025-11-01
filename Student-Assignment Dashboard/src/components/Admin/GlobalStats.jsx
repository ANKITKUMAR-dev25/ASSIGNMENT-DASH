import React from 'react';
import { useData } from '../../contexts/DataContext';
import { mockUsers } from '../../data/mockData';

const ChartBar = ({ label, score, maxScore }) => {
  const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
  const heightStyle = {
    height: `${Math.max(10, percentage)}%`,
  };
  
  let barColor = 'bg-green-600';
  if (percentage < 70) barColor = 'bg-yellow-500';
  if (percentage < 50) barColor = 'bg-red-600';

  return (
    <div className="flex flex-col items-center h-full justify-end relative">
      <div className="absolute top-0 text-xs font-bold text-gray-700 -mt-5">
        {score.toFixed(1)}
      </div>
      <div 
        style={heightStyle} 
        className={`w-10 rounded-t-md transition-all duration-700 ${barColor} shadow-md`}
        title={`${label}: Avg Score ${score.toFixed(1)} / ${maxScore}`}
      ></div>
      <div className="mt-2 text-xs font-medium text-center text-gray-600 w-full truncate">
        {label}
      </div>
    </div>
  );
};

export const GlobalStats = () => {
  const { assignments, submissions } = useData();
  const totalStudents = mockUsers.filter(u => u.role === 'student').length;

  if (assignments.length === 0 || totalStudents === 0) {
    return null;
  }

  const stats = assignments.map(assignment => {
    const gradedSubmissions = submissions.filter(
      s => s.assignmentId === assignment.id && s.status === 'graded'
    );

    const totalScore = gradedSubmissions.reduce((sum, sub) => sum + (sub.score || 0), 0);
    const avgScore = gradedSubmissions.length > 0 ? totalScore / gradedSubmissions.length : 0;
    
    return {
      ...assignment,
      avgScore,
      gradedCount: gradedSubmissions.length,
    };
  });
  
  const gradedStats = stats.filter(s => s.gradedCount > 0);
  const chartMaxScale = Math.max(...assignments.map(a => a.maxScore));

  return (
    <div className="p-6 bg-white shadow-xl rounded-lg border-t-4 border-blue-500">
      <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-3">📊 Average Class Performance by Assignment</h2>
      
      {gradedStats.length === 0 ? (
          <p className="text-gray-500 italic">No assignments have been graded yet to display chart data.</p>
      ) : (
          <div className="flex flex-col items-center">
              <div className="w-full h-64 border-b border-l border-gray-300 flex justify-around items-end p-2 space-x-4">
                  {gradedStats.map(stat => (
                      <ChartBar
                          key={stat.id}
                          label={stat.title.split(' ').slice(0, 2).join(' ')}
                          score={stat.avgScore}
                          maxScore={chartMaxScale}
                      />
                  ))}
              </div>
              <p className="mt-4 text-sm text-gray-600">Y-Axis: Average Score. X-Axis: Assignment Title.</p>
          </div>
      )}
    </div>
  );
};