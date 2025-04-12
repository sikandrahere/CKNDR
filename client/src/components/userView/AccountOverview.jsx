import React, { use, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '@/store/slices/authSlice';

const AccountOverview = () => {
    const dispatch = useDispatch();
    const userId=localStorage.getItem("token")
    const { user, loading, error } = useSelector((state) => state.auth);

    // Fetch user data on component mount
    useEffect(() => {
        dispatch(fetchUser(userId));
    },[dispatch,userId] );

    return (
        <div>
            {user ? (
             <Card className="w-[350px] border border-gray-300  p-5 rounded-xl">
                <CardHeader>
                    <CardTitle>Account Overview</CardTitle>
                    <CardDescription>Personal Information</CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <p>Loading user data...</p>
                    ) : error ? (
                        <p>Error: {error.message}</p>
                    ) : user ? (
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Name: {user.name}</Label>
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="framework">Email: {user.email}</Label>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <p>No user data available ,Please login</p>
                    )}
                </CardContent>
            </Card>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default AccountOverview;