import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { User, Heart } from 'lucide-react';
import { IoBagHandleOutline } from "react-icons/io5";
import { menuItems } from '../allFiles';
import { useDispatch,useSelector } from 'react-redux';
import { fetchCartProducts } from '@/store/slices/cartSlice';
import { SearchDialog } from '../allFiles';

const userId = localStorage.getItem('token');


const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const {cartCount,cartProducts}=useSelector(state=>state.cart)
  const [isOpen, setIsOpen] = useState(false);
  const handleSearchClick = () => {
    setIsOpen(true);
  };

 
  useEffect(() => {
    if (userId) {
      dispatch(fetchCartProducts(userId)); // Fetch cart products for the logged-in user
    }
  }, [dispatch, userId]);
  const handleUserIconClick = () => {
    if (token) {
      navigate('/user/profile');
    } else {
      navigate('/user/login');
    }
  };

  return (
    <div className="sticky top-0 z-50">
      <nav className="flex justify-between items-center text-lg bg-white h-20">
        <ul className="hidden lg:flex gap-5 justify-around w-[30%] font-medium">
          {menuItems.map((item, index) =>
            item.subItems ? (
              <li key={index}>
                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-none cursor-pointer">
                    {item.name}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Categories</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {item.subItems.map((subItem, subIndex) => (
                      <DropdownMenuItem
                        key={subIndex}
                        className="cursor-pointer"
                        onClick={() => navigate(subItem.path)}
                      >
                        {subItem.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            ) : (
              // Regular Menu Item
              <li
                key={index}
                className="cursor-pointer"
                onClick={() => navigate(item.path)}
              >
                {item.name}
              </li>
            )
          )}
        </ul>

        {/* Logo */}
        <div
          className="text-l sm:text-3xl font-bold cursor-pointer"
          onClick={() => navigate('/')}
        >
          C K N D R
        </div>

        {/* Right Icons */}
        <ul className="flex gap-10 justify-around relative">
          <li>
            <input
              onClick={handleSearchClick}
              onChange={handleSearchClick}
              className="rounded-full focus:outline-none h-9 bg-gray-300 p-2 w-[80px] sm:w-full"
              placeholder="Search"
              type="text"
            />
          </li>
          <li className="cursor-pointer" onClick={() => navigate(`/favourite/${userId}`)}>
            <Heart />
          </li>
          <li className="cursor-pointer relative text-2xl " onClick={() => navigate(`/cart/${userId}`)}>
            <IoBagHandleOutline />
            
            {cartCount > 0 && (
              <span className="absolute -top-3 -right-2   text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </li>
          <li className="cursor-pointer" onClick={handleUserIconClick}>
            <User />
          </li>
        </ul>
      </nav>
      <SearchDialog  isOpen={isOpen} setIsOpen={setIsOpen}/>
    </div>
  );
};

export default Navbar;