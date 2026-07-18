// Updated AddCategory.jsx using shadcn/ui Form + shadcn Table

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FiEdit, FiTrash2, FiCheck, FiX, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { showToast } from "@/helpers/showToast";

// Zod schema
const categorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
});

const AddCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: "", description: "" },
  });

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "http://localhost:8080/api/farmer/categories/show/categories",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      showToast("error", err.message || "Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add category
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "http://localhost:8080/api/farmer/categories/add/category",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      const newCategory = await res.json();
      setCategories((prev) => [...prev, newCategory]);
      showToast("success", "Category added successfully");
      form.reset();
    } catch (err) {
      showToast("error", "Failed to add Category");
    } finally {
      setLoading(false);
    }
  };

  // Delete category
  const handleDelete = async (name) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const token = localStorage.getItem("token");
      await fetch(
        `http://localhost:8080/api/farmer/categories/delete/category/${name}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCategories(categories.filter((cat) => cat.name !== name));
      showToast("success", "Category deleted");
    } catch (err) {
      showToast("error", err.message || "Failed to delete category");
    }
  };

  // Edit category
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditName(categories[index].name);
    setEditDescription(categories[index].description || "");
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditName("");
    setEditDescription("");
  };

  const handleUpdate = async (originalName) => {
    if (!editName) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:8080/api/farmer/categories/update/category/${originalName}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: editName, description: editDescription }),
        }
      );

      const updatedCategory = await res.json();
      const updated = [...categories];
      updated[editIndex] = updatedCategory;

      setCategories(updated);
      handleCancel();
      showToast("success", "Category updated successfully");
    } catch (err) {
      showToast("error", err.message || "Failed to update category");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Back Button */}
        <Button
          variant="outline"
          className="flex items-center gap-2 mb-4"
          onClick={() => navigate("/farmer-popup")}
        >
          <FiArrowLeft size={18} /> Back
        </Button>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Category</h2>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Category Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Category Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white w-full"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Category"}
              </Button>
            </form>
          </Form>
        </motion.div>

        {/* Category Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-6 rounded-xl shadow-md overflow-x-auto"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Categories</h2>

          <Table className="min-w-full divide-y divide-gray-200">
            <TableHeader className="bg-gray-100">
              <TableRow className="hover:bg-gray-50">
                <TableHead className="text-black">Name</TableHead>
                <TableHead className="text-black">Description</TableHead>
                <TableHead className="text-center text-black">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-200">
              {categories.map((cat, index) => (
                <TableRow key={index} className="hover:bg-gray-50">
                  <TableCell>
                    {editIndex === index ? (
                      <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                    ) : (
                      cat.name
                    )}
                  </TableCell>

                  <TableCell>
                    {editIndex === index ? (
                      <Textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                      />
                    ) : (
                      cat.description
                    )}
                  </TableCell>

                  <TableCell className="flex justify-center gap-2">
                    {editIndex === index ? (
                      <>
                        <Button
                          size="sm"
                          className="bg-green-500 hover:bg-green-600"
                          onClick={() => handleUpdate(cat.name)}
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
                          onClick={() => handleDelete(cat.name)}
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

export default AddCategory;
