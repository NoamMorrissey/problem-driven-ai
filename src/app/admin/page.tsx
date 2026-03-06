"use client";

import Link from "next/link";

const dashboardCards = [
  {
    title: "Total Pages",
    href: "/admin/content",
    color: "bg-blue-50 hover:bg-blue-100",
    textColor: "text-blue-900",
    borderColor: "border-blue-200",
    stat: "0",
  },
  {
    title: "Total Contacts",
    href: "/admin/crm",
    color: "bg-green-50 hover:bg-green-100",
    textColor: "text-green-900",
    borderColor: "border-green-200",
    stat: "0",
  },
  {
    title: "Workshops",
    href: "/admin/workshops",
    color: "bg-purple-50 hover:bg-purple-100",
    textColor: "text-purple-900",
    borderColor: "border-purple-200",
    stat: "0",
  },
  {
    title: "Events",
    href: "/admin/events",
    color: "bg-orange-50 hover:bg-orange-100",
    textColor: "text-orange-900",
    borderColor: "border-orange-200",
    stat: "0",
  },
];

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-8">Welcome to the admin panel</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardCards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className={`p-6 rounded-lg border-2 ${card.borderColor} ${card.color} transition-colors cursor-pointer block`}
          >
            <h3 className={`text-lg font-semibold ${card.textColor} mb-2`}>
              {card.title}
            </h3>
            <p className="text-3xl font-bold text-gray-900 mb-4">
              {card.stat}
            </p>
            <p className={`text-sm ${card.textColor}`}>
              View details →
            </p>
          </Link>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all text-left">
            <p className="font-semibold text-gray-900">Create New Page</p>
            <p className="text-sm text-gray-600 mt-1">Add content to your site</p>
          </button>
          <button className="p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all text-left">
            <p className="font-semibold text-gray-900">View Contacts</p>
            <p className="text-sm text-gray-600 mt-1">Manage your contacts</p>
          </button>
        </div>
      </section>
    </div>
  );
}
