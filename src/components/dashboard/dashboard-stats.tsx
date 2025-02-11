"use client";

import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

export function DashboardStats() {
  const { data: stats } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      // Replace with actual API call
      return {
        totalUsers: 1234,
        activeUsers: 789,
        revenue: "$12,345",
      };
    },
  });

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="p-6">
        <h3 className="text-sm font-medium">Total Users</h3>
        <p className="text-2xl font-bold">{stats?.totalUsers}</p>
      </Card>
      <Card className="p-6">
        <h3 className="text-sm font-medium">Active Users</h3>
        <p className="text-2xl font-bold">{stats?.activeUsers}</p>
      </Card>
      <Card className="p-6">
        <h3 className="text-sm font-medium">Revenue</h3>
        <p className="text-2xl font-bold">{stats?.revenue}</p>
      </Card>
    </div>
  );
} 