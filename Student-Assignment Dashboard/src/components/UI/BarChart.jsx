// src/components/UI/BarChart.jsx
import React from 'react';

/**
 * A CSS-driven component for displaying a bar chart.
 */
export const BarChart = ({ data, labels, title, color = 'bg-indigo-600', maxVal = 100 }) => {
    if (data.length === 0) {
        return <p className="text-center text-gray-500 italic mt-4">No data available to display the chart.</p>;
    }

    // Set a clean maximum scale for the chart (10% buffer added)
    const chartMaxScale = maxVal + (maxVal * 0.1); 
    
    // Normalize data to a 0-100 scale for plotting within the 200px height container
    const normalizedData = data.map(val => (val / chartMaxScale) * 100);

    return (
        <div className="p-4 bg-white rounded-lg shadow-inner">
            <h3 className={`text-xl font-bold mb-4 border-b pb-2 ${color.replace('bg-', 'text-')}`}>{title}</h3>
            
            <div className="relative w-full h-48">
                
                {/* Y-Axis (Left Edge) & Plotting Area */}
                <div className="absolute left-10 w-[calc(100%-40px)] h-full">
                    
                    <div className="relative w-full h-full border-b border-l border-gray-300 flex items-end justify-around px-2 space-x-3">
                        
                        {/* Y-Axis Grid Lines and Labels */}
                        {[100, 75, 50, 25, 0].map((y, index) => (
                            <div key={index} className="absolute left-0 w-full text-xs text-gray-400 border-t border-dashed border-gray-300" style={{ bottom: `${y}%` }}>
                                <span className="absolute -left-12 -top-2 w-10 text-right font-semibold">
                                    {Math.round((y / 100) * chartMaxScale)}
                                </span>
                            </div>
                        ))}

                        {/* Bars */}
                        {normalizedData.map((height, index) => (
                            <div key={index} className="flex flex-col items-center h-full justify-end relative z-10">
                                {/* Value Label */}
                                <div className="absolute top-0 text-xs font-bold text-gray-700 -mt-5">
                                    {data[index].toFixed(1)}
                                </div>
                                {/* Bar */}
                                <div 
                                    style={{ height: `${height}%` }} 
                                    className={`w-8 rounded-t-md transition-all duration-700 ${color} shadow-md hover:opacity-80`}
                                    title={`${labels[index]}: ${data[index].toFixed(1)}`}
                                ></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* X-Axis Labels */}
            <div className="flex justify-around w-full mt-2 text-xs text-gray-700 h-10 px-2 pl-12">
                {labels.map((label, index) => (
                    <span key={index} className="truncate text-center font-medium max-w-[80px]">
                        {label}
                    </span>
                ))}
            </div>
        </div>
    );
};