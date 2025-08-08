"use client";

import React from "react";
import { useRole } from "@/app/(_service)/contexts/role-provider";
import { toast } from "sonner";
import { ALL_ROLES, UserRole } from "@/app/config/user-roles";

export default function FakeAuthSelector() {
  const { role, setRole } = useRole();

  const switchRole = (nextRole: UserRole) => {
    setRole(nextRole);
    // Используем саму роль для отображения, так как ALL_ROLES - это массив
    toast.info(`Your current role: ${nextRole}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value as UserRole;
    switchRole(val);
  };

  return (
    <section className="my-6 p-5 rounded border border-gray-700 bg-gray-900 max-w-xl mx-auto">
      <h2 className="font-bold text-lg text-white mb-3">Role Selector</h2>
      <form className="grid grid-cols-2 gap-3">
        {ALL_ROLES.map((roleValue) => (
          <label key={roleValue} className="flex items-center gap-2 text-gray-200 cursor-pointer">
            <input
              type="radio"
              name="role"
              value={roleValue}
              checked={role === roleValue}
              onChange={handleChange}
              className="form-radio accent-blue-600"
            />
            <span className="select-none text-base capitalize">{roleValue}</span>
          </label>
        ))}
      </form>
      <p className="mt-3 text-xs text-gray-500">
        You can only simulate one role at a time. All menu permissions will update immediately.
      </p>
    </section>
  );
}
