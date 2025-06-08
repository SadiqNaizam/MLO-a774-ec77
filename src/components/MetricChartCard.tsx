import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, BarChart, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, Bar, Area } from 'recharts'; // Assuming recharts is used

interface ChartDataItem {
  [key: string]: string | number; // e.g., { name: 'Jan', uv: 4000, pv: 2400 }
}

interface MetricChartCardProps {
  title: string;
  description?: string;
  chartData: ChartDataItem[];
  chartType?: 'line' | 'bar' | 'area';
  dataKeyX: string; // Key for X-axis data (e.g., 'name' for month)
  dataKeysY: { key: string; color: string; name?: string; type?: 'monotone' | 'linear' | 'step' }[]; // Keys for Y-axis data and their colors
  className?: string;
  height?: number;
}

const MetricChartCard: React.FC<MetricChartCardProps> = ({
  title,
  description,
  chartData,
  chartType = 'line',
  dataKeyX,
  dataKeysY,
  className,
  height = 300,
}) => {
  console.log("Rendering MetricChartCard:", title, "Type:", chartType, "Data points:", chartData.length);

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} />
            <XAxis dataKey={dataKeyX} fontSize={12} tickLine={false} axisLine={false} />
            <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
            <Tooltip
              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '0.5rem', padding: '0.5rem 1rem' }}
              cursor={{ fill: 'rgba(200, 200, 200, 0.2)' }}
            />
            <Legend wrapperStyle={{fontSize: "12px"}} />
            {dataKeysY.map(item => <Bar key={item.key} dataKey={item.key} fill={item.color} name={item.name || item.key} radius={[4, 4, 0, 0]} />)}
          </BarChart>
        );
      case 'area':
        return (
          <AreaChart data={chartData}>
            <defs>
              {dataKeysY.map(item => (
                <linearGradient key={`grad-${item.key}`} id={`color-${item.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={item.color} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={item.color} stopOpacity={0}/>
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} />
            <XAxis dataKey={dataKeyX} fontSize={12} tickLine={false} axisLine={false} />
            <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
            <Tooltip
              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '0.5rem', padding: '0.5rem 1rem' }}
              cursor={{ fill: 'rgba(200, 200, 200, 0.2)' }}
            />
            <Legend wrapperStyle={{fontSize: "12px"}} />
            {dataKeysY.map(item => <Area key={item.key} type={item.type || "monotone"} dataKey={item.key} stroke={item.color} fillOpacity={1} fill={`url(#color-${item.key})`} name={item.name || item.key} />)}
          </AreaChart>
        );
      case 'line':
      default:
        return (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} />
            <XAxis dataKey={dataKeyX} fontSize={12} tickLine={false} axisLine={false} />
            <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
            <Tooltip
              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '0.5rem', padding: '0.5rem 1rem' }}
              cursor={{ fill: 'rgba(200, 200, 200, 0.2)' }}
            />
            <Legend wrapperStyle={{fontSize: "12px"}} />
            {dataKeysY.map(item => <Line key={item.key} type={item.type || "monotone"} dataKey={item.key} stroke={item.color} strokeWidth={2} name={item.name || item.key} dot={{ r: 3 }} activeDot={{ r: 5 }} />)}
          </LineChart>
        );
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          {renderChart()}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default MetricChartCard;