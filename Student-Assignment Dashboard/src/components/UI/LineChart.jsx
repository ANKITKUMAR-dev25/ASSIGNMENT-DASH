// src/components/UI/LineChart.jsx
import React from 'react';

export const LineChart = ({ data, labels, title, color = 'text-indigo-600', maxVal = 100 }) => {
    if (data.length < 2) {
        return <p className="text-center text-gray-500 italic mt-4">Need at least two data points to draw a line chart.</p>;
    }

    // Set a clean maximum scale for the chart (10% buffer added for visual breathing room)
    const chartMaxScale = maxVal + (maxVal * 0.1); 
    const normalizedData = data.map(val => (val / chartMaxScale) * 100);
    const dataCount = data.length;
    
    // Fixed width for centering the X-axis labels
    const labelWidth = 100; 

    return (
        <div className="p-4 bg-white rounded-lg shadow-inner">
            <h3 className={`text-xl font-bold mb-4 border-b pb-2 ${color}`}>{title}</h3>
            
            {/* Chart Container: Defines the plotting area */}
            <div className="relative w-full h-48">
                
                {/* Y-Axis (Left Edge): We wrap the whole plotting and labeling area */}
                <div className="absolute left-10 w-[calc(100%-40px)] h-full"> {/* Shift right by 40px for Y-axis labels */}
                    
                    {/* Inner Plotting Area with Axes */}
                    <div className="relative w-full h-full border-b border-l border-gray-300">
                        
                        {/* Y-Axis Grid Lines and Labels (inside the container) */}
                        {[100, 75, 50, 25, 0].map((y, index) => (
                            <div key={index} className="absolute left-0 w-full text-xs text-gray-400 border-t border-dashed border-gray-300" style={{ bottom: `${y}%` }}>
                                <span className="absolute -left-12 -top-2 w-10 text-right font-semibold">
                                    {Math.round((y / 100) * chartMaxScale)}
                                </span>
                            </div>
                        ))}

                        {/* Plotting Line Segments */}
                        {normalizedData.map((y, index) => {
                            const xPosition = (index / (dataCount - 1)) * 100;
                            
                            if (index > 0) {
                                const prevY = normalizedData[index - 1];
                                const prevXPosition = ((index - 1) / (dataCount - 1)) * 100;

                                const deltaX = currentXPosition - prevXPosition;
                                const deltaY = y - prevY;
                                const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                                const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
                                
                                const lineStyle = {
                                    position: 'absolute',
                                    left: `${prevXPosition}%`,
                                    bottom: `${prevY}%`,
                                    transformOrigin: '0% 0%',
                                    width: `${length}%`,
                                    transform: `rotate(${angle}deg)`,
                                };

                                return (
                                    <div 
                                        key={`line-${index}`} 
                                        style={lineStyle} 
                                        className="h-0.5 bg-indigo-600 rounded-full z-10"
                                    ></div>
                                );
                            }
                            return null;
                        })}

                        {/* Data Points */}
                        {normalizedData.map((y, index) => (
                            <div 
                                key={`point-${index}`} 
                                className={`absolute w-3 h-3 rounded-full bg-indigo-600 border-2 border-white shadow-lg z-20`} 
                                style={{ bottom: `calc(${y}% - 6px)`, left: `calc(${(index / (dataCount - 1)) * 100}% - 6px)` }}
                                title={`${labels[index]}: ${data[index]}`}
                            ></div>
                        ))}
                    </div>
                    
                    {/* X-Axis Labels: Aligned under the inner plotting area */}
                    <div className="relative w-full mt-2 text-xs text-gray-700 h-10">
                        {labels.map((label, index) => {
                            const pointPercentage = (index / (dataCount - 1)) * 100;
                            
                            // Calculate centered position relative to the start of the plotting area (0%)
                            let leftPosition = `calc(${pointPercentage}% - ${labelWidth / 2}px)`;

                            // Ensure labels stay within bounds of the chart's width
                            if (index === 0) {
                                leftPosition = `calc(0% - 6px)`; // Small offset from 0%
                            } else if (index === dataCount - 1) {
                                leftPosition = `calc(100% - ${labelWidth - 6}px)`; // Small offset from 100%
                            }

                            return (
                                <span 
                                    key={index} 
                                    className="absolute bottom-0 text-center font-medium max-w-[80px] truncate"
                                    style={{ 
                                        left: leftPosition,
                                        width: `${labelWidth}px`, 
                                    }}
                                >
                                    {label}
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};