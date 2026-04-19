
// "use client";

// import { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// export default function AddEmployee({ open, setOpen, setEmployees }) {
//   const [newEmployee, setNewEmployee] = useState({
//     name: "",
//     contact: "",
//     site: "",
//     job: "labour",
//   });

//   const resetForm = () => {
//     setNewEmployee({ name: "", contact: "", site: "", job: "labour" });
//   };

//   const handleAddEmployee = () => {
//     if (!newEmployee.name || !newEmployee.contact || !newEmployee.site) {
//       alert("Please fill all fields");
//       return;
//     }

//     if (newEmployee.contact.length !== 10) {
//       alert("Enter valid 10 digit number");
//       return;
//     }

//     const newEmp = {
//       ...newEmployee,
//       id: Date.now().toString(),
//     };

//     setEmployees((prev) => [...prev, newEmp]);
//     resetForm();
//     setOpen(false);
//   };

//   return (
//     <Dialog
//       open={open}
//       onOpenChange={(val) => {
//         setOpen(val);
//         if (!val) resetForm();
//       }}
//     >
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Add Employee</DialogTitle>
//         </DialogHeader>
//         </DialogContent>
//         </Dialog>
//   )
// }

