import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSelector, useDispatch } from 'react-redux';
import { Badge } from "@/components/ui/badge";
import { UserOrderDetails } from '../allFiles';
import { getAllOrdersByUser } from '@/store/slices/userOrderSlice.js';


const UserOrder = () => {
  const { orders } = useSelector((state) => state.userOrder);
  const dispatch = useDispatch();
  const userId = localStorage.getItem("token");
  
  useEffect(() => {
    dispatch(getAllOrdersByUser(userId));
  }, [dispatch, userId]);

  return (
    <div className="border border-gray-300 rounded-lg m-1.5 p-5">
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <CardContent key={order._id}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Order Status</TableHead>
                    <TableHead>Order Price</TableHead>
                    <TableHead>
                      <span className="sr-only">Details</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>{order.orderDate}</TableCell>
                    <TableCell>
                      <Badge>{order.orderStatus}</Badge>
                    </TableCell>
                    <TableCell>{order.totalAmount}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">View Details</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Product Detail</DialogTitle>
                            <DialogDescription>
                              <UserOrderDetails order={order} />
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          ))
        ) : (
          <CardContent>
            <p>No orders found</p>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default UserOrder;