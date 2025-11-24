// src/pages/AddCategory.jsx
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FiEdit, FiTrash2, FiCheck, FiX } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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

    const form = useForm({
        resolver: zodResolver(categorySchema),
        defaultValues: { name: "", description: "" },
    });

    // Fetch categories
    const fetchCategories = async () => {
        try {
            const res = await fetch("http://localhost:8080/show/categories");
            const data = await res.json();
            setCategories(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Add category
    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:8080/add/category", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            const newCategory = await res.json();
            setCategories((prev) => [...prev, newCategory]);
            form.reset();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Delete category
    const handleDelete = async (name) => {
        if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
        try {
            await fetch(`http://localhost:8080/delete/category/${name}`, { method: "DELETE" });
            setCategories(categories.filter((cat) => cat.name !== name));
        } catch (err) {
            console.error(err);
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
            const res = await fetch(`http://localhost:8080/update/category/${originalName}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: editName, description: editDescription }),
            });
            const updatedCategory = await res.json();
            const updatedCategories = [...categories];
            updatedCategories[editIndex] = updatedCategory;
            setCategories(updatedCategories);
            handleCancel();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white p-6 rounded-xl shadow-md"
                >
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Category</h2>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <Input
                            placeholder="Category Name"
                            {...form.register("name")}
                            className="w-full"
                        />
                        <Textarea
                            placeholder="Category Description"
                            {...form.register("description")}
                            className="w-full"
                        />
                        <Button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white w-full"
                            disabled={loading}
                        >
                            {loading ? "Adding..." : "Add Category"}
                        </Button>
                    </form>
                </motion.div>

                {/* Category Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white p-6 rounded-xl shadow-md overflow-x-auto"
                >
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Categories</h2>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Description</th>
                                <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {categories.map((cat, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-4 py-2">
                                        {editIndex === index ? (
                                            <Input
                                                value={editName}
                                                onChange={(e) => setEditName(e.target.value)}
                                                className="w-full"
                                            />
                                        ) : (
                                            cat.name
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        {editIndex === index ? (
                                            <Textarea
                                                value={editDescription}
                                                onChange={(e) => setEditDescription(e.target.value)}
                                                className="w-full"
                                            />
                                        ) : (
                                            cat.description
                                        )}
                                    </td>
                                    <td className="px-4 py-2 text-center flex justify-center space-x-2">
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
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>
            </div>
        </div>
    );
};

export default AddCategory;
