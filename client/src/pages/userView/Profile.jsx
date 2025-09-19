import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { AccountOverview,Address, UserOrder } from '@/components/allFiles'
import { Button } from "@/components/ui/button"
import { logoutUser } from '@/store/slices/authSlice'


const Profile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = () => {
      dispatch(logoutUser())
      localStorage.removeItem('token')
        localStorage.removeItem('role')
        navigate('/user/login')

    };
    return (
        <div>
            <div className="mt-10 p-2">
                <AccountOverview/>
            </div>

            <div className=" m-1.5 p-5">
                <Tabs defaultValue="account">
                    <TabsList className="grid  grid-cols-2">
                        <TabsTrigger value="account">Order</TabsTrigger>
                        <TabsTrigger value="password">Address</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                        <UserOrder/>
                    </TabsContent>
                    <TabsContent value="password">
                        <Address/>
                    </TabsContent>
                </Tabs>   
            </div>
            <div>
                <Button className="m-5" onClick={handleLogout}>Logout</Button>
            </div>

        </div>
    )
}

export default Profile