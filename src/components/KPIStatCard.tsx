import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react'; // Trend icons

interface KPIStatCardProps {
  title: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string; // e.g., "+5.2%"
  icon?: React.ElementType;
  description?: string;
  className?: string;
}

const KPIStatCard: React.FC<KPIStatCardProps> = ({
  title,
  value,
  trend,
  trendValue,
  icon: Icon,
  description,
  className,
}) => {
  console.log("Rendering KPIStatCard:", title, value);

  const trendIcon = trend === 'up' ? <ArrowUpRight className="h-4 w-4 text-green-500" /> :
                    trend === 'down' ? <ArrowDownRight className="h-4 w-4 text-red-500" /> :
                    trend === 'neutral' ? <Minus className="h-4 w-4 text-gray-500" /> : null;

  const trendColor = trend === 'up' ? 'text-green-500' :
                     trend === 'down' ? 'text-red-500' :
                     'text-gray-500';

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-gray-800">{value}</div>
        {trendValue && (
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            {trendIcon}
            <span className={cn("ml-1", trendColor)}>{trendValue}</span>
            {description && <span className="ml-1 text-gray-500"> {description}</span>}
          </div>
        )}
        {!trendValue && description && (
           <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default KPIStatCard;