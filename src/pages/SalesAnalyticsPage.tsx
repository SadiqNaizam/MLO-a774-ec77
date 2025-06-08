import React from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MetricChartCard from '@/components/MetricChartCard';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';

// Placeholder data
const salesDataMonthly = [
  { month: 'Jan', revenue: 12000, orders: 150 }, { month: 'Feb', revenue: 15000, orders: 180 },
  { month: 'Mar', revenue: 11000, orders: 130 }, { month: 'Apr', revenue: 17000, orders: 200 },
  { month: 'May', revenue: 19000, orders: 220 }, { month: 'Jun', revenue: 21000, orders: 250 },
];
const productSalesData = [
  { category: 'Electronics', revenue: 25000 }, { category: 'Books', revenue: 15000 },
  { category: 'Clothing', revenue: 20000 }, { category: 'Home Goods', revenue: 10000 },
];
const recentOrdersData = [
  { id: 'ORD001', customer: 'Alice Smith', date: '2023-10-26', total: 150.75, status: 'Delivered', items: 3 },
  { id: 'ORD002', customer: 'Bob Johnson', date: '2023-10-25', total: 89.99, status: 'Processing', items: 1 },
  { id: 'ORD003', customer: 'Carol Williams', date: '2023-10-25', total: 210.00, status: 'Shipped', items: 5 },
  { id: 'ORD004', customer: 'David Brown', date: '2023-10-24', total: 45.50, status: 'Delivered', items: 2 },
  { id: 'ORD005', customer: 'Eve Davis', date: '2023-10-23', total: 300.20, status: 'Delivered', items: 7 },
];

const SalesAnalyticsPage: React.FC = () => {
  console.log('SalesAnalyticsPage loaded');
  const [dateRange, setDateRange] = React.useState<Date | undefined>(undefined);

  return (
    <div className="flex min-h-screen bg-background">
      <NavigationMenu />
      <div className="flex-1 flex flex-col ml-64">
        <Header pageTitle="Sales Analytics" />
        <main className="flex-grow p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Detailed Sales Performance</h2>
            <DateRangePicker onSelect={setDateRange} className="w-auto"/>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="byProduct">By Product/Category</TabsTrigger>
              <TabsTrigger value="recentOrders">Recent Orders</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4">
              <MetricChartCard
                title="Monthly Revenue & Orders"
                description="Track your sales trends over time."
                chartData={salesDataMonthly}
                chartType="line"
                dataKeyX="month"
                dataKeysY={[
                  { key: 'revenue', color: '#8884d8', name: 'Revenue ($)' },
                  { key: 'orders', color: '#82ca9d', name: 'Orders' }
                ]}
              />
            </TabsContent>
            <TabsContent value="byProduct" className="mt-4">
              <MetricChartCard
                title="Revenue by Product Category"
                description="Understand which categories are driving sales."
                chartData={productSalesData}
                chartType="bar"
                dataKeyX="category"
                dataKeysY={[{ key: 'revenue', color: '#ff7300', name: 'Revenue ($)' }]}
              />
            </TabsContent>
            <TabsContent value="recentOrders" className="mt-4 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Recent Orders</h3>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" /> Export Data
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrdersData.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.items}</TableCell>
                      <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                      <TableCell>{order.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Pagination>
                <PaginationContent>
                  <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                  <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationEllipsis /></PaginationItem>
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

export default SalesAnalyticsPage;