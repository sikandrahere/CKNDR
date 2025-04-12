import { useState } from "react";
import { DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { Toaster, toast } from "sonner";
import {  useDispatch } from "react-redux";
import { getAllOrdersByAllusers, updateOrderStatus } from "@/store/slices/adminOrderSlice";

const initialFormData = {
  status: "",
};

function AdminOrderDetails({ order }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialFormData);

  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;

    const data={
      orderId:order._id,
      orderStatus:status
    }
    dispatch(updateOrderStatus(data))
    .then((res) => {
      if (res.payload.success) {
        dispatch(getAllOrdersByAllusers());
        toast.success("Order status updated successfully.");
        setFormData(initialFormData);
      } else {
        if (res.payload.message) {
        toast.error("Failed to update order status.");
      }
      }
    })
    
  }
  
  function handleStatusChange(value) {
    setFormData({ ...formData, status: value });
  }


  return (
    <DialogContent
      className="sm:max-w-[600px]"
      aria-describedby="dialog-description"
    >
      <Toaster position="top-center" />
      <div id="dialog-description" className="grid gap-3">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{order._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{order.orderDate}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>${order.totalAmount}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment method</p>
            <Label>{order.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{order.paymentStatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge>{order.orderStatus}</Badge>
            </Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-2">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            {order.cartProducts.map((product) => (
              <ul className="grid gap-2" key={product._id}>
                <li className="flex items-center justify-between">
                  <span>Title: {product.name}</span>
                  <span>Quantity: {product.quantity}</span>
                  <span>Price: ${product.price}</span>
                </li>
              </ul>
            ))}
          </div>
        </div>
        <div className="grid gap-2">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            {order.address.map((address, index) => (
              <div
                key={index}
                className="grid gap-0.5 text-muted-foreground"
              >
                <span>{address.name}</span>
                <span>{address.flat}</span>
                <span>{address.area}</span>
                <span>{address.city}</span>
                <span>{address.pincode}</span>
                <span>{address.phone}</span>
              </div>
            ))}
          </div>
        </div>
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Update order status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="inProcess">In Process</SelectItem>
              <SelectItem value="inShipping">In Shipping</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div>
          <Button
            className="w-full mt-2"
            onClick={handleUpdateStatus}
          >
            Update Status
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetails;