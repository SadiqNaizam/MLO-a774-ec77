import React from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import KPIStatCard from '@/components/KPIStatCard';
import MetricChartCard from '@/components/MetricChartCard';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";
import { UserPlus, Users, Repeat, Activity } from 'lucide-react';

// Placeholder data
const customerGrowthData = [
  { month: 'Jan', new: 50, returning: 200 }, { month: 'Feb', new: 60, returning: 220 },
  { month: 'Mar', new: 45, returning: 210 }, { month: 'Apr', new: 70, returning: 250 },
  { month: 'May', new: 80, returning: 280 }, { month: 'Jun', new: 90, returning: 300 },
];
const topCustomersData = [
  { id: 'CUST001', name: 'John Doe', email: 'john.doe@example.com', totalSpent: 1250.50, orders: 15, segment: 'VIP' },
  { id: 'CUST002', name: 'Jane Smith', email: 'jane.smith@example.com', totalSpent: 980.00, orders: 10, segment: 'Loyal' },
  { id: 'CUST003', name: 'Mike Brown', email: 'mike.brown@example.com', totalSpent: 750.75, orders: 8, segment: 'Regular' },
  { id: 'CUST004', name: 'Lisa Green', email: 'lisa.green@example.com', totalSpent: 500.20, orders: 5, segment: 'New' },
  { id: 'CUST005', name: 'Kevin White', email: 'kevin.white@example.com', totalSpent: 1500.00, orders: 20, segment: 'VIP' },
];

const CustomerInsightsPage: React.FC = () => {
  console.log('CustomerInsightsPage loaded');
  const [dateRange, setDateRange] = React.useState<Date | undefined>(undefined);

  return (
    <div className="flex min-h-screen bg-background">
      <NavigationMenu />
      <div className="flex-1 flex flex-col ml-64">
        <Header pageTitle="Customer Insights" />
        <main className="flex-grow p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Understanding Your Customers</h2>
            <DateRangePicker onSelect={setDateRange} className="w-auto"/>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPIStatCard title="Total Customers" value="3,560" icon={Users} trend="up" trendValue="+5% MoM" />
            <KPIStatCard title="New Customers (This Month)" value="180" icon={UserPlus} trend="up" trendValue="+12%" />
            <KPIStatCard title="Returning Customers" value="85%" icon={Repeat} trend="neutral" description="Retention Rate" />
            <KPIStatCard title="Avg. Customer Lifetime Value" value="$850" icon={Activity} trend="up" trendValue="+$50 YoY" />
          </section>

          <Tabs defaultValue="growth" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="growth">Customer Growth</TabsTrigger>
              <TabsTrigger value="topCustomers">Top Customers</TabsTrigger>
            </TabsList>
            <TabsContent value="growth" className="mt-4">
              <MetricChartCard
                title="New vs. Returning Customers"
                description="Monthly customer acquisition and retention."
                chartData={customerGrowthData}
                chartType="area"
                dataKeyX="month"
                dataKeysY={[
                  { key: 'new', color: '#82ca9d', name: 'New Customers' },
                  { key: 'returning', color: '#8884d8', name: 'Returning Customers' }
                ]}
              />
            </TabsContent>
            <TabsContent value="topCustomers" className="mt-4 space-y-4">
              <h3 className="text-xl font-semibold">Top Customer List</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Segment</TableHead>
                    <TableHead className="text-right">Total Spent</TableHead>
                    <TableHead className="text-right">Orders</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topCustomersData.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.id}</TableCell>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.segment}</TableCell>
                      <TableCell className="text-right">${customer.totalSpent.toFixed(2)}</TableCell>
                      <TableCell className="text-right">{customer.orders}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Pagination>
                <PaginationContent>
                  <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                  <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationNext href="#" /></PaginationItem>
                </PaginationContent>
              </Pagination>
            </TabsContent>
          </Tabs>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default CustomerInsightsPage;