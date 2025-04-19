import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { statusColorMap } from "@/lib/utils";

interface TrendGraphProps {
  data: number[];
  labels: string[];
  status: string;
}

export function TrendGraph({ data, labels, status }: TrendGraphProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    
    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const color = statusColorMap[status as keyof typeof statusColorMap] || statusColorMap.TRENDING;

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Popularity',
          data,
          borderColor: color,
          backgroundColor: `${color}20`,
          fill: true,
          tension: 0.4,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)',
              font: {
                size: 10
              }
            }
          },
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)',
              font: {
                size: 10
              },
              maxRotation: 0
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(30, 30, 30, 0.9)',
            titleFont: {
              size: 12
            },
            bodyFont: {
              size: 12
            },
            padding: 10,
            caretSize: 5
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, labels, status]);

  return <canvas ref={chartRef} />;
}
