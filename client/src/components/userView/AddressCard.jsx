import React from 'react'
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const AddressCard = ({addresses,handleDeleteAddress,handleEditAddress}) => {
    
  return (
    <div>
        <div className="flex flex-wrap gap-5 w-full">
                {addresses && addresses.length > 0 ? (
                    addresses.map((address, index) => (
                        <Card
                            key={index}
                            className="border border-gray-300 rounded-lg p-3 min-w-[300px] shadow-md hover:shadow-lg"
                        >
                            <CardContent className="gap-4">
                                <p>Name: {address.name}</p>
                                <p>Flat: {address.flat}</p>
                                <p>Area: {address.area}</p>
                                <p>City: {address.city}</p>
                                <p>Pincode: {address.pincode}</p>
                                <p>Phone: {address.phone}</p>
                            </CardContent>
                            <CardFooter className="flex justify-between gap-10">
                                <Button onClick={() => handleEditAddress(address)}>Edit</Button>
                                <Button onClick={() => handleDeleteAddress(address._id)}>Delete</Button>
                            </CardFooter>
                        </Card>
                    ))
                ) : (
                    <p>No addresses found , please add one</p>
                )}
            </div>
    </div>
  )
}

export default AddressCard