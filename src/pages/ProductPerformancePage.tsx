import React from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MetricChartCard from '@/components/MetricChartCard';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge"; // For stock status

// Placeholder data
const salesByCategoryData = [
  { category: 'Gadgets', sales: 35000 }, { category: 'Accessories', sales: 22000 },
  { category: 'Software', sales: 18000 }, { category: 'Books', sales: 12000 },
];
const productPerformanceData = [
  { id: 'PROD001', name: 'SuperWidget X', category: 'Gadgets', unitsSold: 500, revenue: 25000, stock: 150, status: 'In Stock' },
  { id: 'PROD002', name: 'MegaDongle', category: 'Accessories', unitsSold: 1200, revenue: 12000, stock: 5, status: 'Low Stock' },
  { id: 'PROD003', name: 'ProSoftware Suite', category: 'Software', unitsSold: 150, revenue: 15000, stock: 0, status: 'Out of Stock' },
  { id: 'PROD004', name: 'Learning React Book', category: 'Books', unitsSold: 300, revenue: 9000, stock: 80, status: 'In Stock' },
  { id: 'PROD005', name: 'Wireless Mouse', category: 'Accessories', unitsSold: 800, revenue: 10000, stock: 30, status: 'In Stock' },
];

const ProductPerformancePage: React.FC = () => {
  console.log('ProductPerformancePage loaded');
  const [dateRange, setDateRange] = React.useState<Date | undefined>(undefined);

  const getStockBadgeVariant = (status: string) => {
    if (status === 'In Stock') return 'default'; // 'success' from example is not a shadcn default
    if (status === 'Low Stock') return 'secondary'; // 'warning' from example is not a shadcn default
    if (status === 'Out of Stock') return 'destructive';
    return 'outline';
  };


  return (
    <div className="flex min-h-screen bg-background">
      <NavigationMenu />
      <div className="flex-1 flex flex-col ml-64">
        <Header pageTitle="Product Performance" />
        <main className="flex-grow p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Analyze Product Success</h2>
            <DateRangePicker onSelect={setDateRange} className="w-auto"/>
          </div>

          <Tabs defaultValue="bestSellers" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="bestSellers">Best Sellers & Performance</TabsTrigger>
              <TabsTrigger value="byCategory">Sales by Category</TabsTrigger>
            </TabsList>
            <TabsContent value="bestSellers" className="mt-4 space-y-4">
              <h3 className="text-xl font-semibold">Product Performance Details</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Units Sold</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                    <TableHead className="text-right">Stock</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productPerformanceData.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell className="text-right">{product.unitsSold}</TableCell>
                      <TableCell className="text-right">${product.revenue.toFixed(2)}</TableCell>
                      <TableCell className="text-right">{product.stock}</TableCell>
                      <TableCell>
                        <Badge variant={getStockBadgeVariant(product.status)}>{product.status}</Badge>
                      </TableCell>
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
            <TabsContent value="byCategory" className="mt-4">
              <MetricChartCard
                title="Sales by Product Category"
                description="Identify top-performing categories."
                chartData={salesByCategoryData}
                chartType="bar"
                dataKeyX="category"
                dataKeysY={[{ key: 'sales', color: '#22c55e', name: 'Sales ($)' }]}
              />
            </TabsContent>
          </Tabs>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default ProductPerformancePage;