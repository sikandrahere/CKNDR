import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllProducts } from '@/store/slices/productSlice';
import { useNavigate } from 'react-router-dom';

const SearchDialog = ({ isOpen, setIsOpen }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
    
        if (term.trim() === "") {
            setFilteredProducts([]);
            return;
        }
    
        const results = products.filter(product =>
            product.name.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredProducts(results);
    };

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[425px] max-h-[500px] bg-white rounded-md shadow-lg">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-gray-900">Search Products</DialogTitle>
                        <DialogDescription className="text-sm text-gray-600">
                            Enter a product name to search.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="search" className="text-right text-gray-700 font-medium">
                                Search
                            </Label>
                            <Input
                                id="search"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="col-span-3 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        {filteredProducts.length > 0 && (
                            <ScrollArea className="w-full rounded-md relative z-[10] border border-gray-300 overflow-y-auto max-h-[300px]">
                                <div className="flex w-max space-x-4 p-4">
                                    {filteredProducts.map((product) => (
                                        <figure
                                            key={product._id}
                                            className="shrink-0 bg-gray-50 p-3 rounded hover:shadow-md cursor-pointer"
                                            onClick={() => navigate(`/product/id?id=${product._id}`)}
                                        >
                                            <div className="overflow-hidden rounded-md">
                                                <img
                                                    src={product.image}
                                                    alt="Product Image"
                                                    className="aspect-[3/4] h-[200px] w-[150px] object-cover"
                                                    loading="lazy"
                                                />
                                            </div>
                                            <div>
                                                <h1 className="mt-2 text-base font-bold text-gray-900 truncate">{product.name}</h1>
                                                <h3 className="mt-1 text-sm text-gray-600">{product.category}</h3>
                                            </div>
                                        </figure>
                                    ))}
                                </div>
                                <ScrollBar orientation="horizontal" className="relative z-[15] bg-gray-200 h-2 rounded-full" />
                            </ScrollArea>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SearchDialog;