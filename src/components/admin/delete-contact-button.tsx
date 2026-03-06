"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface DeleteContactButtonProps {
  contactId: string;
}

export default function DeleteContactButton({
  contactId,
}: DeleteContactButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/contacts/${contactId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete contact");
      }

      router.push("/admin/crm");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setIsDeleting(false);
    }
  };

  if (showConfirm) {
    return (
      <div className="flex gap-2">
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors text-sm font-medium"
        >
          {isDeleting ? "Deleting..." : "Confirm Delete"}
        </button>
        <button
          onClick={() => {
            setShowConfirm(false);
            setError(null);
          }}
          disabled={isDeleting}
          className="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition-colors text-sm font-medium"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        onClick={() => setShowConfirm(true)}
        className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium border border-red-200"
      >
        Delete Contact
      </button>
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
}
