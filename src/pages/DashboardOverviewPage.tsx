import React from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import KPIStatCard from '@/components/KPIStatCard';
import MetricChartCard from '@/components/MetricChartCard';
import { DateRangePicker } from '@/components/ui/date-range-picker'; // Assuming this exists as per shadcn/ui structure or is custom
import { DollarSign, ShoppingCart, Users, TrendingUp } from 'lucide-react';

// Placeholder data for charts
const salesTrendData = [
  { name: 'Mon', sales: 4000, lastWeek: 3500 },
  { name: 'Tue', sales: 3000, lastWeek: 2800 },
  { name: 'Wed', sales: 2000, lastWeek: 2200 },
  { name: 'Thu', sales: 2780, lastWeek: 2900 },
  { name: 'Fri', sales: 1890, lastWeek: 2100 },
  { name: 'Sat', sales: 2390, lastWeek: 2500 },
  { name: 'Sun', sales: 3490, lastWeek: 3200 },
];

const userActivityData = [
  { name: 'Jan', activeUsers: 400 },
  { name: 'Feb', activeUsers: 300 },
  { name: 'Mar', activeUsers: 500 },
  { name: 'Apr', activeUsers: 450 },
  { name: 'May', activeUsers: 600 },
  { name: 'Jun', activeUsers: 700 },
];

const DashboardOverviewPage: React.FC = () => {
  console.log('DashboardOverviewPage loaded');
  const [dateRange, setDateRange] = React.useState<Date | undefined>(undefined); // Simplified for placeholder

  return (
    <div className="flex min-h-screen bg-background">
      <NavigationMenu />
      <div className="flex-1 flex flex-col ml-64"> {/* ml-64 matches NavigationMenu width */}
        <Header pageTitle="Dashboard Overview" />
        <main className="flex-grow p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Welcome Back!</h2>
            <DateRangePicker 
              onSelect={setDateRange} // Placeholder prop
              // Pass other necessary props like initialDate, etc.
              className="w-auto"
            />
          </div>

          {/* KPI Stats Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPIStatCard
              title="Total Revenue"
              value="$45,231.89"
              trend="up"
              trendValue="+20.1% from last month"
              icon={DollarSign}
              description="Based on selected period"
            />
            <KPIStatCard
              title="Total Orders"
              value="2,350"
              trend="up"
              trendValue="+180 since last week"
              icon={ShoppingCart}
              description="New orders processed"
            />
            <KPIStatCard
              title="New Customers"
              value="1,200"
              trend="down"
              trendValue="-10.5% from last month"
              icon={Users}
              description="First-time buyers"
            />
            <KPIStatCard
              title="Average Order Value"
              value="$120.50"
              trend="neutral"
              trendValue="No significant change"
              icon={TrendingUp}
              description="Compared to last period"
            />
          </section>

          {/* Charts Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MetricChartCard
              title="Sales Trend"
              description="Showing sales performance over the selected period."
              chartData={salesTrendData}
              chartType="line"
              dataKeyX="name"
              dataKeysY={[
                { key: 'sales', color: '#8884d8', name: 'Current Period' },
                { key: 'lastWeek', color: '#82ca9d', name: 'Previous Period' }
              ]}
            />
            <MetricChartCard
              title="User Activity"
              description="Monthly active users."
              chartData={userActivityData}
              chartType="bar"
              dataKeyX="name"
              dataKeysY={[{ key: 'activeUsers', color: '#ffc658', name: 'Active Users' }]}
            />
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardOverviewPage;