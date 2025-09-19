import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { PanelRightClose } from 'lucide-react';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { IoMan } from "react-icons/io5";
import { IoIosWoman } from "react-icons/io";
import { FaChild } from "react-icons/fa";
import { TbShoe } from "react-icons/tb";
import { MdOutlineCategory } from "react-icons/md";
import {
    Lock,
    LayoutDashboard,
    ShoppingCart,
    StretchHorizontal,
} from "lucide-react";
import {
    GiConverseShoe,
    GiRunningShoe,
    GiBallerinaShoes,
    GiSonicShoes,
} from "react-icons/gi";


import { Link } from "react-router-dom";

const AppSidebar = () => {
    const role = localStorage.getItem('role'); // Fetching role from localStorage
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isAdminOpen, setIsAdminOpen] = useState(false);

    const toggleCategory = () => {
        setIsCategoryOpen(!isCategoryOpen);
    };

    const toggleAdmin = () => {
        if (role === 'admin') {
            setIsAdminOpen(!isAdminOpen); // Only allow toggle if role is admin
        }
    };

    const items = [
        { title: "Men", url: "/products/category?category=men", icon: <IoMan /> },
        { title: "Women", url: "/products/category?category=women", icon: <IoIosWoman /> },
        { title: "Kid", url: "/products/category?category=kids", icon: <FaChild /> },
    ];

    const collapsibles = [
        {
            title: "Category",
            icon: <MdOutlineCategory />,
            options: [
                { name: "Casual", url: "/products/explore?explore=casual", icon: <TbShoe /> },
                { name: "Designer", url: "/products/explore?explore=designer", icon: <GiBallerinaShoes /> },
                { name: "Athletic", url: "/products/explore?explore=athletic", icon: <GiSonicShoes /> },
                { name: "Canvas", url: "/products/explore?explore=canvas", icon: <GiConverseShoe /> },
                { name: "High Top", url: "/products/explore?explore=hightop", icon: <GiRunningShoe /> },
            ],
            isOpen: isCategoryOpen,
            toggle: toggleCategory,
        },
    ];

    // Add Admin collapsible only for admin users
    if (role === 'admin') {
        collapsibles.push({
            title: "Admin",
            icon: <Lock />,
            options: [
                { name: "Order", url: "/admin/orders", icon: <ShoppingCart /> },
                { name: "Products", url: "/admin/products", icon: <StretchHorizontal /> },
            ],
            isOpen: isAdminOpen,
            toggle: toggleAdmin,
        });
    }

    return (
        <div>
            <Sheet>
                <SheetTrigger asChild className="fixed top-20 z-20">
                    <Button className="border-none border-outline" variant="outline">
                        <PanelRightClose />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[50vw] lg:w-[15vw]">
                    <SheetHeader>
                        <SheetTitle className="font-bold">C K N D R</SheetTitle>
                        <SheetDescription></SheetDescription>
                    </SheetHeader>
                    <div>
                        {/* Displaying items */}
                        {items.map((item) => (
                            <div
                                className="flex items-center gap-2 m-5 p-2 bg-gray-200 rounded-md font-bold"
                                key={item.title}
                            >
                                <Link to={item.url} className="flex items-center gap-2">
                                    {item.icon}
                                    <h1>{item.title}</h1>
                                </Link>
                            </div>
                        ))}

                        {/* Displaying collapsibles */}
                        {collapsibles.map((collapsible, index) => (
                            <div key={index} className="mt-4">
                                <button
                                    onClick={collapsible.toggle}
                                    className="flex items-center justify-around w-full p-2 bg-gray-200 rounded-md font-bold"
                                >
                                    {collapsible.icon}
                                    {collapsible.title}
                                    <span>{collapsible.isOpen ? '-' : '+'}</span>
                                </button>
                                {collapsible.isOpen && (
                                    <div className="pl-4 mt-2">
                                        {collapsible.options.map((option, idx) => (
                                            <Link to={option.url} key={idx}>
                                                <p className="mb-1 hover:underline flex gap-4 font-medium">
                                                    {option.icon}{option.name}</p>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default AppSidebar;