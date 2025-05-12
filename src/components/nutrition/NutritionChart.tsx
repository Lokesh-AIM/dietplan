import React from 'react';

interface NutritionData {
  label: string;
  value: number;
  color: string;
  percentage: number;
}

interface NutritionChartProps {
  data: NutritionData[];
  size?: number;
  thickness?: number;
  className?: string;
  showLabels?: boolean;
}

export const NutritionChart: React.FC<NutritionChartProps> = ({
  data,
  size = 200,
  thickness = 30,
  className = '',
  showLabels = true,
}) => {
  const radius = size / 2;
  const innerRadius = radius - thickness;
  const center = size / 2;
  const totalValue = data.reduce((acc, item) => acc + item.value, 0);

  let currentAngle = 0;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div style={{ width: size, height: size }} className="relative">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {data.map((item, index) => {
            const angle = (item.value / totalValue) * 360;
            const startAngle = currentAngle;
            const endAngle = currentAngle + angle;
            
            // Convert angles to radians
            const startRad = (startAngle - 90) * (Math.PI / 180);
            const endRad = (endAngle - 90) * (Math.PI / 180);
            
            const startX = center + innerRadius * Math.cos(startRad);
            const startY = center + innerRadius * Math.sin(startRad);
            const endX = center + innerRadius * Math.cos(endRad);
            const endY = center + innerRadius * Math.sin(endRad);
            
            const outerStartX = center + radius * Math.cos(startRad);
            const outerStartY = center + radius * Math.sin(startRad);
            const outerEndX = center + radius * Math.cos(endRad);
            const outerEndY = center + radius * Math.sin(endRad);
            
            // Flag for which arc to draw (always the smaller one)
            const largeArcFlag = angle > 180 ? 1 : 0;
            
            // Create path
            const path = [
              `M ${outerStartX} ${outerStartY}`, // Move to start point
              `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${outerEndX} ${outerEndY}`, // Draw outer arc
              `L ${endX} ${endY}`, // Line to inner arc end
              `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${startX} ${startY}`, // Draw inner arc
              'Z', // Close path
            ].join(' ');
            
            currentAngle = endAngle;
            
            return (
              <path
                key={index}
                d={path}
                fill={item.color}
                className="transition-all duration-500 ease-in-out"
                style={{
                  transformOrigin: 'center',
                  transform: 'scale(1)',
                  opacity: 1,
                }}
              >
                <animate
                  attributeName="opacity"
                  values="0;1"
                  dur="0.5s"
                  fill="freeze"
                  begin={`${index * 0.1}s`}
                />
                <animate
                  attributeName="transform"
                  values="scale(0.95);scale(1)"
                  dur="0.5s"
                  fill="freeze"
                  begin={`${index * 0.1}s`}
                />
              </path>
            );
          })}
          
          {/* Center circle for aesthetic purposes */}
          <circle
            cx={center}
            cy={center}
            r={innerRadius - 5}
            fill="white"
            className="dark:fill-gray-800"
          />
        </svg>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-xl font-bold">{totalValue}</div>
            <div className="text-sm text-gray-500">Total Calories</div>
          </div>
        </div>
      </div>
      
      {showLabels && (
        <div className="mt-4 grid grid-cols-2 gap-4 w-full">
          {data.map((item, index) => (
            <div key={index} className="flex items-center">
              <div 
                className="w-4 h-4 rounded-sm mr-2" 
                style={{ backgroundColor: item.color }}
              ></div>
              <div>
                <div className="text-sm font-medium">{item.label}</div>
                <div className="text-xs text-gray-500">
                  {item.value}g ({item.percentage}%)
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};