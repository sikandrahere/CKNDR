import { DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";


function UserOrderDetails({ order }) {

    return (
        <DialogContent className="sm:max-w-[600px]">
            {order && (<div className="grid gap-3">
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
                    {order.cartProducts.map((product) => (
                        <div className="grid gap-2" key={product._id}>
                            <div className="font-medium">Order Details</div>
                            <ul className="grid gap-2">
                                <li className="flex items-center justify-between">
                                    <span>Name: {product.name}</span>
                                    <span>Quantity: {product.quantity}</span>
                                    <span>Price: ${product.price}</span>
                                </li>
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="grid gap-2">
                    {order.address.map((address) => (
                        <div className="grid gap-2" key={address._id}>
                            <div className="font-medium">Shipping Info</div>
                            <div className="grid gap-0.5 text-muted-foreground">
                                <span>{address.name}</span>
                                <span>{address.flat}</span>
                                <span>{address.area}</span>
                                <span>{address.city}</span>
                                <span>{address.pincode}</span>
                                <span>{address.phone}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>)
            }
        </DialogContent>
    );
}

export default UserOrderDetails;