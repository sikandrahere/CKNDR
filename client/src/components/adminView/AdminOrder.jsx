import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSelector, useDispatch } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { AdminOrderDetails } from '../allFiles';
import { getAllOrdersByAllusers } from '@/store/slices/adminOrderSlice';

const AdminOrder = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.adminOrder);

  useEffect(() => {
    dispatch(getAllOrdersByAllusers());
  }, [dispatch]);

  return (
    <div className="border border-gray-300 rounded-lg m-8 p-5">
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        {orders?.data?.length > 0 ? (
          orders.data.map((order) => (
            <CardContent key={order._id}>
              <Table>
                <thead>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Order Status</TableHead>
                    <TableHead>Order Price</TableHead>
                    <TableHead>
                      <span className="sr-only">Details</span>
                    </TableHead>
                  </TableRow>
                </thead>
                <TableBody>
                  <TableRow>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge>{order.orderStatus}</Badge>
                    </TableCell>
                    <TableCell>${order.totalAmount}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">View Details</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Product Detail</DialogTitle>
                          </DialogHeader>
                          <AdminOrderDetails order={order} />
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </Card>
    </div>
  );
};

export default AdminOrder;