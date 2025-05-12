import React, { useEffect, useRef } from 'react';
import { ProgressData } from '../../types';

interface ProgressChartProps {
  data: ProgressData[];
  title?: string;
  dataKey: 'weight' | 'calories' | 'adherencePercentage';
  color?: string;
  className?: string;
}

export const ProgressChart: React.FC<ProgressChartProps> = ({
  data,
  title,
  dataKey,
  color = '#10B981',
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || data.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Get data values
    const values = data.map(item => item[dataKey]);
    const dates = data.map(item => new Date(item.date));

    // Calculate min and max for scaling
    const minValue = Math.min(...values) * 0.95;
    const maxValue = Math.max(...values) * 1.05;
    
    // Padding
    const padding = 40;
    const width = canvas.width - padding * 2;
    const height = canvas.height - padding * 2;

    // Draw axes
    ctx.beginPath();
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();

    // Draw y-axis labels and grid lines
    const steps = 5;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.font = '10px sans-serif';
    ctx.fillStyle = '#6b7280';

    for (let i = 0; i <= steps; i++) {
      const y = padding + height - (i / steps) * height;
      const value = minValue + (i / steps) * (maxValue - minValue);
      
      ctx.beginPath();
      ctx.strokeStyle = '#e5e7eb';
      ctx.moveTo(padding, y);
      ctx.lineTo(canvas.width - padding, y);
      ctx.stroke();
      
      ctx.fillText(value.toFixed(1), padding - 5, y);
    }

    // Draw x-axis labels (show only 5 dates evenly spaced)
    const xStep = Math.max(1, Math.floor(dates.length / 5));
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    for (let i = 0; i < dates.length; i += xStep) {
      const x = padding + (i / (dates.length - 1)) * width;
      const date = dates[i];
      const label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      
      ctx.fillText(label, x, canvas.height - padding + 5);
    }

    // Draw the line chart with animation
    const drawLine = (progress: number) => {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      
      for (let i = 0; i < Math.floor(dates.length * progress); i++) {
        const x = padding + (i / (dates.length - 1)) * width;
        const y = padding + height - ((values[i] - minValue) / (maxValue - minValue)) * height;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.stroke();
      
      // Draw points
      for (let i = 0; i < Math.floor(dates.length * progress); i++) {
        const x = padding + (i / (dates.length - 1)) * width;
        const y = padding + height - ((values[i] - minValue) / (maxValue - minValue)) * height;
        
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // Animate the drawing of the line
    let start: number | null = null;
    const duration = 1000; // 1 second

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Redraw axes
      ctx.beginPath();
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 1;
      ctx.moveTo(padding, padding);
      ctx.lineTo(padding, canvas.height - padding);
      ctx.lineTo(canvas.width - padding, canvas.height - padding);
      ctx.stroke();
      
      // Redraw grid and labels
      for (let i = 0; i <= steps; i++) {
        const y = padding + height - (i / steps) * height;
        const value = minValue + (i / steps) * (maxValue - minValue);
        
        ctx.beginPath();
        ctx.strokeStyle = '#e5e7eb';
        ctx.moveTo(padding, y);
        ctx.lineTo(canvas.width - padding, y);
        ctx.stroke();
        
        ctx.fillStyle = '#6b7280';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText(value.toFixed(1), padding - 5, y);
      }
      
      for (let i = 0; i < dates.length; i += xStep) {
        const x = padding + (i / (dates.length - 1)) * width;
        const date = dates[i];
        const label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(label, x, canvas.height - padding + 5);
      }
      
      // Draw the progress of the line
      drawLine(progress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [data, dataKey, color]);

  return (
    <div className={`w-full ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
      )}
      <canvas 
        ref={canvasRef} 
        width={600} 
        height={300} 
        className="w-full h-[300px] rounded-lg bg-white dark:bg-gray-800"
      ></canvas>
    </div>
  );
};