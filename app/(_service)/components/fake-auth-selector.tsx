
"use client";

import React from "react";
import { useRole } from "@/app/(_service)/contexts/role-provider";
import { ROLE_LABELS } from "@/app/(_service)/lib/utils";
import type { UserRole } from "@/app/config/menu-types";
import { toast } from "sonner";

export default function FakeAuthSelector() {
  const { role, setRole } = useRole();

  const switchRole = (nextRole: UserRole) => {
    setRole(nextRole);
    toast.info(`Your current role: ${ROLE_LABELS[nextRole]}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value as UserRole;
    switchRole(val);
  };

  return (
    <section className="my-6 p-5 rounded border border-gray-700 bg-gray-900 max-w-xl mx-auto">
      <h2 className="font-bold text-lg text-white mb-3"></h2>
      <form className="grid grid-cols-2 gap-3">
        {(Object.keys(ROLE_LABELS) as UserRole[]).map((val) => (
          <label key={val} className="flex items-center gap-2 text-gray-200 cursor-pointer">
            <input
              type="radio"
              name="role"
              value={val}
              checked={role === val}
              onChange={handleChange}
              className="form-radio accent-blue-600"
            />
            <span className="select-none text-base">{ROLE_LABELS[val]}</span>
          </label>
        ))}
      </form>
      <p className="mt-3 text-xs text-gray-500">
        You can only simulate one role at a time. All menu permissions will update immediately.
      </p>
    </section>
  );
}
