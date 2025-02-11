"use client";

import { useQuery } from "@tanstack/react-query";

export function RecentActivity() {
  const { data: activities = [] } = useQuery({
    queryKey: ["recent-activities"],
    queryFn: async () => {
      // Replace with actual API call
      return [
        { id: 1, description: "User signed up", time: "2 minutes ago" },
        { id: 2, description: "New order placed", time: "5 minutes ago" },
      ];
    },
  });

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex justify-between text-sm">
          <span>{activity.description}</span>
          <span className="text-muted-foreground">{activity.time}</span>
        </div>
      ))}
    </div>
  );
} 