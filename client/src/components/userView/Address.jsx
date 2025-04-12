import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster, toast } from "sonner";
import { useSelector, useDispatch } from 'react-redux';
import { createAddress, deleteAddress, editAddress, fetchAddresses } from '@/store/slices/addressSlice';
import { AddressCard } from '../allFiles';

const Address = () => {
    const dispatch = useDispatch();
    const userId = localStorage.getItem("token");
    const { addresses, isLoading } = useSelector((state) => state.address);
    const [currentEditedId, setCurrentEditedId] = useState(null);
    const [data, setData] = useState({
        userId: localStorage.getItem("token"),
        name: "",
        flat: "",
        area: "",
        city: "",
        pincode: "",
        phone: "",
    });

    // Update individual fields
    const handleInputChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        if (userId) {
            dispatch(fetchAddresses(userId));
        }
    }, [dispatch]);


    const handleAddAddress = async () => {
        try {
          // Validate required fields
          if (
            !data.userId ||
            !data.name ||
            !data.flat ||
            !data.area ||
            !data.city ||
            !data.pincode ||
            !data.phone
          ) {
            toast.error("Please fill in all the required fields!");
            return;
          }
      
          // Limit the number of addresses to 3
          if (addresses.length >= 3) {
            toast.error("You can add only 3 addresses.");
            setData({
              userId: userId,
              name: "",
              flat: "",
              area: "",
              city: "",
              pincode: "",
              phone: "",
            });
            return;
          }
      
          let result;
      
          if (currentEditedId !== null) {
            // Edit existing address
            result = await dispatch(
              editAddress({
                userId,
                addressId: currentEditedId,
                data,
              })
            ).unwrap();
            if (result.success) {
              toast.success("Address updated successfully!");
            } else {
              toast.error(result.message || "Failed to update address.");
              return;
            }
          } else {
            // Add new address
            result = await dispatch(createAddress(data)).unwrap();
            if (result.success) {
              toast.success("Address added successfully!");
            } else {
              toast.error(result.message || "Failed to add address.");
              return;
            }
          }
      
          // Reset the form data and fetch updated addresses
          setData({
            userId: userId,
            name: "",
            flat: "",
            area: "",
            city: "",
            pincode: "",
            phone: "",
          });
      
          if (userId) {
            dispatch(fetchAddresses(userId));
          }
        } catch (error) {
          console.error("Error processing address:", error);
          toast.error("An unexpected error occurred. Please try again.");
        }
      };

    const handleDeleteAddress = async (addressId) => {
        try {
            const result = await dispatch(deleteAddress({ userId, addressId })).unwrap();
            if (result.success) {
                toast.success("Address deleted successfully!");
                dispatch(fetchAddresses(userId));
            } else {
                toast.error(result.message || "Failed to delete address.");
            }
        } catch (error) {
            console.error("Error deleting address:", error);
            toast.error("An unexpected error occurred. Please try again.");
        }
    };

    const handleEditAddress = (address) => {
        setCurrentEditedId(address._id);
        setData({
            userId: userId,
            name: address.name,
            flat: address.flat,
            area: address.area,
            city: address.city,
            pincode: address.pincode,
            phone: address.phone,
        });
    }

    return (
        <div >
            <Toaster position="top-center" />
            <AddressCard addresses={addresses} handleDeleteAddress={handleDeleteAddress}  handleEditAddress={handleEditAddress} />
            <div className="border border-gray-300 rounded-lg mt-1.5 p-1  w-[350px]">
                <Card >
                    <CardHeader>
                        <CardTitle>{currentEditedId ? "Edit Address" : "Add Address"}</CardTitle>
                        <CardDescription>Enter your address</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Flat</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="Name"
                                        value={data.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="flat">Flat</Label>
                                    <Input
                                        id="flat"
                                        name="flat"
                                        placeholder="Flat"
                                        value={data.flat}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="area">Area</Label>
                                    <Input
                                        id="area"
                                        name="area"
                                        placeholder="Area"
                                        value={data.area}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="city">City</Label>
                                    <Input
                                        id="city"
                                        name="city"
                                        placeholder="City"
                                        value={data.city}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="pincode">Pincode</Label>
                                    <Input
                                        id="pincode"
                                        name="pincode"
                                        placeholder="Pincode"
                                        value={data.pincode}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        placeholder="Phone"
                                        value={data.phone}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button onClick={handleAddAddress}>{currentEditedId ? "Update Address" : "Add Address"}</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default Address;