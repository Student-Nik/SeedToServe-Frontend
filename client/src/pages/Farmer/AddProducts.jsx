import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FiEdit, FiTrash2, FiCheck, FiX, FiArrowLeft, FiPackage, FiImage } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { showToast } from "@/helpers/showToast";

//  SHADCN FORM
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

//  SHADCN SELECT
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { getToken } from "@/utils/auth";

// ------------------ ZOD SCHEMA ------------------ //

const categorySchema = z.object({
  categoryId: z.string().min(1, "Please select category"),
  categoryName: z.string().min(1, "Category is required"),
  name: z.string().min(2, "Product name must be at least 2 characters"),
  description: z.string().optional(),
  price: z.coerce.number().min(1),
  stock: z.coerce.number().min(0),
  image: z.any().optional(),
});

// ------------------ MAIN COMPONENT ------------------ //

const AddProduct = () => {
  const [products, setProducts] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [editIndex, setEditIndex] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPrice, setEditPrice] = useState(0);
  const [editStock, setEditStock] = useState(0);

  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      categoryId: "",
      categoryName: "",
      name: "",
      description: "",
      price: "",
      stock: "",
      image: null,
    },
  });

  // ------------------ FETCH CATEGORY ------------------ //

  const fetchCategoriesList = async () => {
    try {
      const token = getToken();
      const res = await fetch(
        "http://localhost:8080/api/farmer/categories/show/categories",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const data = await res.json();
      setCategoriesList(data);
      console.log(data);
    } catch {
      showToast("error", "Failed to fetch categories");
    }
  };

  // ------------------ FETCH PRODUCTS ------------------ //

  const fetchProducts = async () => {
    try {
      const token = getToken();
      const res = await fetch(
        "http://localhost:8080/api/farmer/products/show/products",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const data = await res.json();
      console.log("products:", data);
      setProducts(data);
    } catch {
      showToast("error", "Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategoriesList();
  }, []);

  // ------------------ ADD PRODUCT ------------------ //
  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const token = getToken();

      const formData = new FormData();

      const product = {
        categoryName: data.categoryName,
        categoryId: data.categoryId,
        name: data.name,
        description: data.description || "",
        price: data.price,
        stock: data.stock,
      };

      formData.append(
        "productDto",
        new Blob([JSON.stringify(product)], {
          type: "application/json",
        }),
      );

      // Upload image
      if (data.image) {
        formData.append("imageFile", data.image);
      }

      // Debug
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const res = await fetch(
        "http://localhost:8080/api/farmer/products/add/product",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      if (!res.ok) {
        throw new Error(await res.text());
      }

      const newProduct = await res.json();

      setProducts((prev) => [...prev, newProduct]);

      form.reset({
        categoryId: "",
        categoryName: "",
        name: "",
        description: "",
        price: "",
        stock: "",
        image: null,
      });
      console.log(newProduct);
      showToast("success", "Product added successfully");
    } catch (err) {
      console.error(err);
      showToast("error", "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  // ------------------ DELETE PRODUCT ------------------ //

  const handleDelete = async (name) => {
    if (!confirm(`Delete product "${name}" ?`)) return;

    try {
      const token = getToken();

      await fetch(
        `http://localhost:8080/api/farmer/products/delete/product/${name}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setProducts(products.filter((p) => p.name !== name));
      showToast("success", "Product deleted");
    } catch {
      showToast("error", "Failed to delete product");
    }
  };

  // ------------------ EDIT PRODUCT ------------------ //

  const handleEdit = (index) => {
    const p = products[index];
    setEditIndex(index);
    setEditName(p.name);
    setEditDescription(p.description || "");
    setEditPrice(p.price);
    setEditStock(p.stock);
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditName("");
    setEditDescription("");
    setEditPrice("");
    setEditStock("");
  };

  const handleUpdate = async (originalName) => {
    try {
      const token = getToken();

      const res = await fetch(
        `http://localhost:8080/api/farmer/products/update/product/${originalName}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: editName,
            description: editDescription,
            price: editPrice,
            stock: editStock,
          }),
        },
      );

      const updatedProduct = await res.json();
      const updatedList = [...products];
      updatedList[editIndex] = updatedProduct;

      setProducts(updatedList);
      handleCancel();

      showToast("success", "Product updated");
    } catch {
      showToast("error", "Failed to update product");
    }
  };

  // ------------------ UI ------------------ //

  const fieldClass =
    "h-12 rounded-xl border-neutral-300 bg-neutral-50 px-4 text-[15px] placeholder:text-neutral-400 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[#E24A3B] focus-visible:ring-offset-0 focus-visible:border-[#E24A3B] transition-colors";

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        <Button
          variant="outline"
          className="flex items-center gap-2 border-neutral-300 text-[#1C1C1C] hover:bg-neutral-100 hover:text-[#1C1C1C]"
          onClick={() => navigate("/farmer-popup")}
        >
          <FiArrowLeft size={18} /> Back
        </Button>

        {/* ADD PRODUCT FORM */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden"
        >
          <div className="flex items-center gap-3 px-6 sm:px-8 py-6 border-b border-neutral-100 bg-neutral-50/60">
            <div className="w-11 h-11 rounded-xl bg-[#E24A3B] flex items-center justify-center shrink-0 shadow-sm shadow-[#E24A3B]/30">
              <FiPackage className="text-white" size={20} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1C]">Add New Product</h2>
              <p className="text-sm text-neutral-500">List a product under one of your categories</p>
            </div>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-5 px-6 sm:px-8 py-6"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                {/* CATEGORY SELECT (shadcn) */}
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#1C1C1C] font-semibold text-sm">Category</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);

                            const selectedCategory = categoriesList.find(
                              (cat) => String(cat.id) === value,
                            );
                            form.setValue(
                              "categoryName",
                              selectedCategory?.name || "",
                            );
                          }}
                          value={field.value}
                        >
                          <SelectTrigger className={fieldClass}>
                            <SelectValue placeholder="-- Select Category --" />
                          </SelectTrigger>

                          <SelectContent>
                            {categoriesList.map((cat) => (
                              <SelectItem key={cat.id} value={String(cat.id)}>
                                {cat.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* NAME */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#1C1C1C] font-semibold text-sm">Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Organic Tomatoes" className={fieldClass} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* DESCRIPTION */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#1C1C1C] font-semibold text-sm">
                      Description <span className="text-neutral-400 font-normal">(optional)</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="A short description buyers will see on the product page"
                        className="min-h-[96px] rounded-xl border-neutral-300 bg-neutral-50 px-4 py-3 text-[15px] placeholder:text-neutral-400 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[#E24A3B] focus-visible:ring-offset-0 focus-visible:border-[#E24A3B] transition-colors resize-none"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="grid sm:grid-cols-2 gap-5">
                {/* PRICE */}
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#1C1C1C] font-semibold text-sm">Price (₹)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0.00" className={fieldClass} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* STOCK */}
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#1C1C1C] font-semibold text-sm">Stock / Quantity</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0" className={fieldClass} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* IMAGE */}
              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-[#1C1C1C] font-semibold text-sm">Product Image</FormLabel>
                    <FormControl>
                      <label
                        htmlFor="product-image-input"
                        className="flex items-center gap-3 h-12 rounded-xl border border-dashed border-neutral-300 bg-neutral-50 px-4 text-[15px] text-neutral-400 cursor-pointer hover:border-[#E24A3B] hover:text-[#E24A3B] transition-colors"
                      >
                        <FiImage size={18} />
                        <span>Click to upload an image</span>
                        <Input
                          id="product-image-input"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            form.setValue("image", e.target.files[0])
                          }
                        />
                      </label>
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* SUBMIT BUTTON */}
              <div className="flex justify-end pt-1">
                <Button
                  type="submit"
                  className="bg-[#E24A3B] hover:bg-[#c93e30] text-white w-full sm:w-auto px-10 h-11 rounded-xl font-medium shadow-md shadow-[#E24A3B]/20"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Product"}
                </Button>
              </div>
            </form>
          </Form>
        </motion.div>

        {/* PRODUCTS TABLE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-6 rounded-xl shadow-md overflow-x-auto"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Products</h2>

          <Table className="min-w-[900px]">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead>Category</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Image</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {products.map((product, index) => (
                <TableRow key={index} className="hover:bg-gray-50">
                  <TableCell>{product.categoryName}</TableCell>

                  <TableCell>
                    {editIndex === index ? (
                      <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                    ) : (
                      product.name
                    )}
                  </TableCell>

                  <TableCell>
                    {editIndex === index ? (
                      <Textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                      />
                    ) : (
                      product.description
                    )}
                  </TableCell>

                  <TableCell>
                    {editIndex === index ? (
                      <Input
                        type="number"
                        value={editPrice}
                        onChange={(e) => setEditPrice(e.target.value)}
                      />
                    ) : (
                      `₹ ${product.price}`
                    )}
                  </TableCell>

                  <TableCell>
                    {editIndex === index ? (
                      <Input
                        type="number"
                        value={editStock}
                        onChange={(e) => setEditStock(e.target.value)}
                      />
                    ) : (
                      product.stock
                    )}
                  </TableCell>

                  <TableCell>
                    <img
                      src={product.imageBase64}
                      alt={product.name}
                      className="h-16 w-16 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="text-center flex justify-center space-x-2">
                    {editIndex === index ? (
                      <>
                        <Button
                          size="sm"
                          className="bg-green-500 hover:bg-green-600"
                          onClick={() => handleUpdate(product.name)}
                        >
                          <FiCheck />
                        </Button>
                        <Button
                          size="sm"
                          className="bg-red-500 hover:bg-red-600"
                          onClick={handleCancel}
                        >
                          <FiX />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          className="bg-yellow-400 hover:bg-yellow-500"
                          onClick={() => handleEdit(index)}
                        >
                          <FiEdit />
                        </Button>
                        <Button
                          size="sm"
                          className="bg-red-500 hover:bg-red-600"
                          onClick={() => handleDelete(product.name)}
                        >
                          <FiTrash2 />
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      </div>
    </div>
  );
};

export default AddProduct;