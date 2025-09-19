import React from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Form = ({ formData, setFormData, handleFileChange, handleInputChange }) => {
  return (
    <div className="grid gap-4 py-4 ml-1">
      {/* Image Input */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="image" className="text-right">
          Image
        </Label>
        <Input
          type="file"
          id="image"
          accept="image/*"
          className="col-span-3"
          onChange={handleFileChange}
        />
      </div>

      {/* Name Input */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Name
        </Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="col-span-3"
        />
      </div>

      {/* Description Input */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="description" className="text-right">
          Description
        </Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="col-span-3"
          placeholder="Description"
        />
      </div>

      {/* Category Dropdown */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="category" className="text-right">
          Category
        </Label>
        <Select
          onValueChange={(value) =>
            setFormData((prevData) => ({ ...prevData, category: value }))
          }
        >
          <SelectTrigger className="w-[180px]" id="category">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="designer">Designer</SelectItem>
              <SelectItem value="athletic">Athletic</SelectItem>
              <SelectItem value="canvas">Canvas</SelectItem>
              <SelectItem value="high-top">High Top</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Size Dropdown */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="size" className="text-right">
          Size
        </Label>
        <Select
          onValueChange={(value) =>
            setFormData((prevData) => ({ ...prevData, size: value }))
          }
        >
          <SelectTrigger className="w-[180px]" id="size">
            <SelectValue placeholder="Select a size" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Size</SelectLabel>
              <SelectItem value="6">6</SelectItem>
              <SelectItem value="7">7</SelectItem>
              <SelectItem value="8">8</SelectItem>
              <SelectItem value="9">9</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Gender Dropdown */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="gender" className="text-right">
          Gender
        </Label>
        <Select
          onValueChange={(value) =>
            setFormData((prevData) => ({ ...prevData, gender: value }))
          }
        >
          <SelectTrigger className="w-[180px]" id="gender">
            <SelectValue placeholder="Select a gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Gender</SelectLabel>
              <SelectItem value="men">Men</SelectItem>
              <SelectItem value="women">Women</SelectItem>
              <SelectItem value="kids">Kids</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Type Dropdown */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="type" className="text-right">
          Type
        </Label>
        <Select
          onValueChange={(value) =>
            setFormData((prevData) => ({ ...prevData, type: value }))
          }
        >
          <SelectTrigger className="w-[180px]" id="type">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Type</SelectLabel>
              <SelectItem value="trending">Trending</SelectItem>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="fresh">Fresh</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Price Input */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="price" className="text-right">
          Price
        </Label>
        <Input
          id="price"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          className="col-span-3"
        />
      </div>

      {/* Sale Price Input */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="salePrice" className="text-right">
          Sale Price
        </Label>
        <Input
          id="salePrice"
          name="salePrice"
          value={formData.salePrice}
          onChange={handleInputChange}
          className="col-span-3"
        />
      </div>

      {/* Total Stock Input */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="totalStock" className="text-right">
          Total Stock
        </Label>
        <Input
          id="totalStock"
          name="totalStock"
          value={formData.totalStock}
          onChange={handleInputChange}
          className="col-span-3"
        />
      </div>
    </div>
  );
};

export default Form;