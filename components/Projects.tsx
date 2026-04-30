"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Moon, Sun, Pencil, Trash2, Plus, X } from "lucide-react";

// ✅ Types
type ProjectStatus = "PAID" | "PENDING";

type Project = {
  id: string;
  customer: string;
  product: string;
  amount: number;
  received: number;
  date: string;
  status: ProjectStatus;
};

type FormType = {
  customer: string;
  product: string;
  amount: string;
  received: string;
};

type ErrorType = Partial<Record<keyof FormType, string>>;

export default function ProjectsHistory() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "#PRO-7421",
      customer: "Swabhiman Ganguly",
      product: "2nd floor construction",
      amount: 499000,
      received: 499000,
      date: "Oct 26, 2025",
      status: "PAID",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const [form, setForm] = useState<FormType>({
    customer: "",
    product: "",
    amount: "",
    received: "",
  });

  const [errors, setErrors] = useState<ErrorType>({});
  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    dark ? root.classList.add("dark") : root.classList.remove("dark");
  }, [dark]);

  // ✅ FIXED
  const getStatus = (amount: number | string, received: number | string): ProjectStatus => {
    return Number(received) >= Number(amount) ? "PAID" : "PENDING";
  };

  const statusStyles: Record<ProjectStatus, string> = {
    PAID: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    PENDING:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  };

  const validate = (): boolean => {
    let err: ErrorType = {};

    if (!form.customer.trim()) err.customer = "Required";
    if (!form.product.trim()) err.product = "Required";
    if (!form.amount) err.amount = "Required";
    if (!form.received) err.received = "Required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    const newData: Project = {
      id: editId || `#PRO-${Math.floor(Math.random() * 10000)}`,
      customer: form.customer,
      product: form.product,
      amount: Number(form.amount),
      received: Number(form.received),
      date: new Date().toDateString(),
      status: getStatus(form.amount, form.received),
    };

    if (editId) {
      setProjects((prev) =>
        prev.map((p) => (p.id === editId ? newData : p))
      );
    } else {
      setProjects((prev) => [newData, ...prev]);
    }

    setShowForm(false);
    setEditId(null);
    setForm({ customer: "", product: "", amount: "", received: "" });
    setErrors({});
  };

  const handleEdit = (p: Project) => {
    setForm({
      customer: p.customer,
      product: p.product,
      amount: String(p.amount),
      received: String(p.received),
    });
    setEditId(p.id);
    setShowForm(true);
  };

  const filtered = useMemo(() => {
    return projects.filter((p) =>
      p.customer.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, projects]);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h2 className="text-xl md:text-2xl font-bold">Projects History</h2>

        <div className="flex gap-3 w-full md:w-auto">
          <button
            onClick={() => {
              setShowForm(true);
              setEditId(null);
            }}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
          >
            <Plus size={16} /> Add
          </button>

          <button
            onClick={() => setDark(!dark)}
            className="border p-2 rounded-xl"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl w-full max-w-md mx-8">
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold text-lg">
                {editId ? "Update Project" : "Add Project"}
              </h3>
              <button onClick={() => setShowForm(false)}>
                <X />
              </button>
            </div>

            <div className="space-y-3">
              {(Object.keys(form) as (keyof FormType)[]).map((field) => (
                <div key={field}>
                  <input
                    placeholder={field}
                    type={field === "amount" || field === "received" ? "number" : "text"}
                    className={`w-full border p-2 rounded-lg ${
                      errors[field] ? "border-red-500" : ""
                    }`}
                    value={form[field]}
                    onChange={(e) =>
                      setForm({ ...form, [field]: e.target.value })
                    }
                  />
                  {errors[field] && (
                    <p className="text-xs text-red-500">{errors[field]}</p>
                  )}
                </div>
              ))}

              <button
                onClick={handleSave}
                className="w-full bg-blue-600 text-white py-2 rounded-lg"
              >
                {editId ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-3 text-gray-400" size={16} />
        <input
          className="pl-9 border p-2 rounded-lg w-full"
          placeholder="Search customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table + Mobile same (no changes needed) */}
      {/* ...tumhara existing UI perfectly fine hai */}
    </div>
  );
}
