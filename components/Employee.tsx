"use client";

import { useState, useMemo } from "react";
import { Plus, CalendarCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const role: "admin" | "supervisor" = "admin";

const jobRates: Record<"mistree" | "labour", number> = {
  mistree: 800,
  labour: 500,
};


function AddEmployeeForm({ onAdd }: any) {
  const [form, setForm] = useState({
    id: Date.now().toString(),
    name: "",
    contact: "",
    site: "",
    job: "mistree",
    salary: "",
  });

  return (
    <div className="space-y-4">
      <Input placeholder="Employee Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />

      <Input placeholder="Contact Number" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} />

      <Input placeholder="Site Name" value={form.site} onChange={(e) => setForm({ ...form, site: e.target.value })} />

      <Select value={form.job} onValueChange={(val) => setForm({ ...form, job: val })}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="mistree">Mistree</SelectItem>
          <SelectItem value="labour">Labour</SelectItem>
        </SelectContent>
      </Select>

      <Input type="number" placeholder="Per Day Salary (₹)" value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} />

      <Button
        onClick={() => {
          onAdd({ ...form, salary: Number(form.salary) || 0 });
          setForm({ id: Date.now().toString(), name: "", contact: "", site: "", job: "mistree", salary: "" });
        }}
      >
        Add Employee
      </Button>
    </div>
  );
}

export default function EmployeeManagement() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAttendance, setOpenAttendance] = useState(false);

  const [selectedEmpData, setSelectedEmpData] = useState<any>(null);

  const [search, setSearch] = useState("");
  const [siteFilter, setSiteFilter] = useState("ALL");

  const [attendance, setAttendance] = useState<Record<string, Record<string, boolean>>>({});

  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split("T")[0]);

  const [bulkAttendance, setBulkAttendance] = useState<Record<string, boolean>>({});

  const [employees, setEmployees] = useState([
    { id: "1", name: "Ramesh Kumar", contact: "9876543210", site: "Site A", job: "mistree", salary: 800 },
    { id: "2", name: "Suresh Yadav", contact: "9123456780", site: "Site B", job: "labour", salary: 500 },
  ]);

  // ✅ Dynamic Sites List
  const sites = useMemo(() => {
    const unique = new Set(employees.map((e) => e.site));
    return ["ALL", ...Array.from(unique)];
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    return employees.filter(
      (e) =>
        e.name.toLowerCase().includes(search.toLowerCase()) &&
        (siteFilter === "ALL" || e.site === siteFilter)
    );
  }, [search, siteFilter, employees]);

  // ✅ Delete Handler
  const handleDelete = (id: string) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-lg font-semibold">Employee Records</h2>

        <div className="flex items-center gap-3">
          <Input placeholder="Search employee" className="w-48" value={search} onChange={(e) => setSearch(e.target.value)} />

          {/* ✅ Dynamic Site Filter */}
          <Select value={siteFilter} onValueChange={setSiteFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Sites" />
            </SelectTrigger>
            <SelectContent>
              {sites.map((site) => (
                <SelectItem key={site} value={site}>
                  {site}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />

          {role === "admin" && (
            <>
              <Button
                onClick={() => {
                  const initial: Record<string, boolean> = {};
                  employees.forEach((emp) => {
                    initial[emp.id] = attendance[emp.id]?.[selectedDate] ?? false;
                  });
                  setBulkAttendance(initial);
                  setOpenAttendance(true);
                }}
                className="gap-2"
              >
                <CalendarCheck size={16} /> Add Attendance
              </Button>

              <Button onClick={() => setOpenAdd(true)} className="gap-2">
                <Plus size={16} /> Add Employee
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-zinc-800">
            <tr>
              <th className="p-3">Emp ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Site</th>
              <th className="p-3">Job</th>
              <th className="p-3 text-center">Attendance</th>
              <th className="p-3 text-center">Salary</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.map((emp) => {
              const status = attendance[emp.id]?.[selectedDate];
              const perDay = emp.salary ?? jobRates[emp.job as "mistree" | "labour"];

              const salary = status ? perDay : 0;

              return (
                <tr key={emp.id} className="border-b">
                  <td className="p-3">{emp.id}</td>
                  <td className="p-3">{emp.name}</td>
                  <td className="p-3">{emp.contact}</td>
                  <td className="p-3">{emp.site}</td>
                  <td className="p-3 capitalize">{emp.job}</td>
                  <td className="p-3 text-center font-semibold">
                    {status === undefined ? "-" : status ? "P" : "A"}
                  </td>
                  <td className="p-3 text-center font-semibold">₹ {salary}</td>
                  <td className="p-3 text-right">
                    {role === "admin" && (
                      <div className="flex justify-end gap-3">
                        <button
                          className="text-blue-600 text-xs"
                          onClick={() => {
                            setSelectedEmpData(emp);
                            setOpenEdit(true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(emp.id)}
                          className="text-red-600 text-xs"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add Employee Modal */}
      <Dialog open={openAdd} onOpenChange={setOpenAdd}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Employee</DialogTitle>
          </DialogHeader>
              
          <AddEmployeeForm
            onAdd={(emp:any) => {
              setEmployees((prev) => [...prev, emp]);
              setOpenAdd(false);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
          </DialogHeader>

          {selectedEmpData && (
            <div className="space-y-4">
              <Input value={selectedEmpData.name} onChange={(e) => setSelectedEmpData({ ...selectedEmpData, name: e.target.value })} />

              <Input value={selectedEmpData.contact} onChange={(e) => setSelectedEmpData({ ...selectedEmpData, contact: e.target.value })} />

              <Input value={selectedEmpData.site} onChange={(e) => setSelectedEmpData({ ...selectedEmpData, site: e.target.value })} />

              <Select value={selectedEmpData.job} onValueChange={(val) => setSelectedEmpData({ ...selectedEmpData, job: val })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mistree">Mistree</SelectItem>
                  <SelectItem value="labour">Labour</SelectItem>
                </SelectContent>
              </Select>

              <Input type="number" value={selectedEmpData.salary} onChange={(e) => setSelectedEmpData({ ...selectedEmpData, salary: Number(e.target.value) })} />
            </div>
          )}

          <DialogFooter>
            <Button
              onClick={() => {
                setEmployees((prev) => prev.map((emp) => (emp.id === selectedEmpData.id ? selectedEmpData : emp)));
                setOpenEdit(false);
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Attendance Modal */}
      <Dialog open={openAttendance} onOpenChange={setOpenAttendance}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Mark Attendance (Multiple)</DialogTitle>
          </DialogHeader>

          <div className="max-h-[400px] overflow-y-auto border rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="p-3">Employee</th>
                  <th className="p-3">Site</th>
                  <th className="p-3 text-center">P</th>
                  <th className="p-3 text-center">A</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.id}>
                    <td className="p-3">{emp.name}</td>
                    <td className="p-3">{emp.site}</td>
                    <td className="p-3 text-center">
                      <input
                        type="radio"
                        name={`att-${emp.id}`}
                        checked={bulkAttendance[emp.id] === true}
                        onChange={() => setBulkAttendance({ ...bulkAttendance, [emp.id]: true })}
                      />
                    </td>
                    <td className="p-3 text-center">
                      <input
                        type="radio"
                        name={`att-${emp.id}`}
                        checked={bulkAttendance[emp.id] === false}
                        onChange={() => setBulkAttendance({ ...bulkAttendance, [emp.id]: false })}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <DialogFooter>
            <Button
              onClick={() => {
                const updated = { ...attendance };
                Object.entries(bulkAttendance).forEach(([id, val]) => {
                  if (!updated[id]) updated[id] = {};
                  updated[id][selectedDate] = val;
                });
                setAttendance(updated);
                setOpenAttendance(false);
              }}
            >
              Save All
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
