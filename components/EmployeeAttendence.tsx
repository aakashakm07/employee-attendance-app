"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// ✅ Safe defaults added to avoid undefined errors
export default function EmployeeAttendance({
  employees = [],
  attendance = {},
}: any) {
  const [search, setSearch] = useState("");
  const [siteFilter, setSiteFilter] = useState("ALL");
  const [paidMap, setPaidMap] = useState<Record<string, number>>({});

  // ✅ Always safe array
  const safeEmployees = Array.isArray(employees) ? employees : [];

  const sites = useMemo(() => {
    const unique = new Set(safeEmployees.map((e: any) => e?.site || ""));
    return ["ALL", ...Array.from(unique).filter(Boolean)];
  }, [safeEmployees]);

  const data = useMemo(() => {
    return safeEmployees.map((emp: any) => {
      const records = attendance?.[emp?.id] || {};
      let present = 0;
      let absent = 0;

      Object.values(records).forEach((val: any) => {
        if (val === true) present++;
        else if (val === false) absent++;
      });

      const perDay = Number(emp?.salary) || 0;
      const totalSalary = present * perDay;
      const paid = paidMap[emp?.id] || 0;
      const dues = totalSalary - paid > 0 ? totalSalary - paid : 0;

      return {
        ...emp,
        present,
        absent,
        totalSalary,
        paid,
        dues,
      };
    });
  }, [safeEmployees, attendance, paidMap]);

  const filtered = useMemo(() => {
    return data.filter((e: any) => {
      const name = e?.name?.toLowerCase() || "";
      return (
        name.includes(search.toLowerCase()) &&
        (siteFilter === "ALL" || e.site === siteFilter)
      );
    });
  }, [data, search, siteFilter]);

  const exportPDF = () => {
    const doc = new jsPDF();

    const tableData = filtered.map((e: any) => [
      e.name,
      e.site,
      e.job,
      e.present,
      e.absent,
      e.totalSalary,
      e.paid,
      e.dues,
    ]);

    autoTable(doc, {
      head: [["Name", "Site", "Role", "Present", "Absent", "Salary", "Paid", "Dues"]],
      body: tableData,
    });

    doc.save("employee-attendance.pdf");
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-lg font-semibold">Employee Attendance Summary</h2>

        <div className="flex gap-3">
          <Input
            placeholder="Search employee"
            className="w-48"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

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

          <Button onClick={exportPDF}>Export PDF</Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-zinc-800">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Site</th>
              <th className="p-3">Role</th>
              <th className="p-3 text-center">Present</th>
              <th className="p-3 text-center">Absent</th>
              <th className="p-3 text-center">Salary</th>
              <th className="p-3 text-center">Paid</th>
              <th className="p-3 text-center">Dues</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center p-4 text-gray-500">
                  No records found
                </td>
              </tr>
            ) : (
              filtered.map((emp: any) => (
                <tr key={emp.id} className="border-b">
                  <td className="p-3">{emp.name}</td>
                  <td className="p-3">{emp.site}</td>
                  <td className="p-3 capitalize">{emp.job}</td>
                  <td className="p-3 text-center">{emp.present}</td>
                  <td className="p-3 text-center">{emp.absent}</td>
                  <td className="p-3 text-center">₹ {emp.totalSalary}</td>
                  <td className="p-3 text-center">
                    <Input
                      type="number"
                      value={emp.paid}
                      onChange={(e) =>
                        setPaidMap({
                          ...paidMap,
                          [emp.id]: Number(e.target.value),
                        })
                      }
                      className="w-24 mx-auto"
                    />
                  </td>
                  <td className="p-3 text-center font-semibold text-red-500">
                    ₹ {emp.dues}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
