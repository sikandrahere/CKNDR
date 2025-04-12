import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { createProduct, fetchAllProducts, editProduct, deleteProduct } from "@/store/slices/productSlice";
import { Toaster, toast } from "sonner";
import { LoadingSkeleton, ProductScrollBar } from '@/components/allFiles';
import Form from '@/components/adminView/Form';
import { useSelector, useDispatch } from 'react-redux';
import { Plus } from "lucide-react";


import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetDescription // Import SheetDescription
} from "@/components/ui/sheet";

const initialState = {
  name: "",
  description: "",
  category: "",
  size: "",
  gender:"",
  type: "",
  price: "",
  salePrice: "",
  totalStock: "",
  image: null,
};

const AdminProducts = () => {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.product);
  

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({ ...prevData, image: e.target.files[0] }));
  };

  const submitHandler = async () => {
    if (!formData.name || !formData.description || !formData.category || !formData.size || !formData.gender || !formData.type || !formData.price || !formData.salePrice || !formData.totalStock || !formData.image) {
      toast.error("Please fill in all the required fields!");
      return;
    }  
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });
    currentEditedId !== null
      ? dispatch(
        editProduct({
          id: currentEditedId,
          data: formDataToSend,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          setFormData(initialState);
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          toast.success("Product updated successfully!");
        }
      })
      : dispatch(
        createProduct(
          formDataToSend,
        )
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          setOpenCreateProductsDialog(false);
          setFormData(initialState);
          toast.success("Product added successfully!");
        }
      });
  };

  const handleDelete = async (id) => {
    dispatch(deleteProduct(id)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        toast.success("Product deleted successfully!");
      }
    });
  };

 

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <div>
      <Toaster position="top-center" />
      <div className="flex justify-end mr-10 items-center">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          <Plus /> Add New Product
        </Button>
      </div>

      <div>
        {products && products.length > 0 ? (
          <div className="grid overflow-x-auto md:grid-cols-4">
            {isLoading ? (
              <LoadingSkeleton />
            ) : (
              <ProductScrollBar
                product={products}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setFormData={setFormData}
                setCurrentEditedId={setCurrentEditedId}
                handleDelete={handleDelete}
              />
            )}
          </div>
        ) : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialState);
        }}
      >
        {/* Set aria-describedby to improve accessibility */}
        <SheetContent aria-describedby="product-dialog-description">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
            <SheetDescription>
            </SheetDescription>
          </SheetHeader>

          <Form
            formData={formData}
            setFormData={setFormData}
            handleFileChange={handleFileChange}
            handleInputChange={handleInputChange}
            onSubmit={submitHandler}
          />
          <SheetFooter>
            <Button onClick={submitHandler}>
              {currentEditedId !== null ? "Save Changes" : "Add Product"}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminProducts;