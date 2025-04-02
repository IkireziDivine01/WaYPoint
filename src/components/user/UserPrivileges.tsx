
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck } from "lucide-react";

const UserPrivileges = () => {
  const { currentUser } = useAuth();

  // Define static privileges based on roles
  const rolePrivileges = {
    student: [
      "Take career assessments",
      "View personalized recommendations",
      "Access learning resources",
      "Track progress over time"
    ],
    educator: [
      "Create assessment templates",
      "View student results",
      "Access teaching resources",
      "Track student progress",
      "Provide personalized guidance"
    ],
    administrator: [
      "Manage user accounts",
      "Configure system settings",
      "View analytics and reports",
      "Create and edit assessments",
      "Manage educational content"
    ]
  };

  // If no user or role, show a message
  if (!currentUser) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Role Privileges</CardTitle>
          <CardDescription>
            Please sign in to view your privileges.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // Get privileges based on user's role
  const privileges = currentUser.role ? rolePrivileges[currentUser.role] : [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Role Privileges</CardTitle>
        <CardDescription>
          What you can do in Waypoint Career based on your {currentUser?.role} role
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {privileges.map((privilege, index) => (
            <li
              key={index}
              className="flex items-start"
            >
              <BadgeCheck className="h-5 w-5 text-waypoint-blue mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <p className="font-medium text-waypoint-black">
                  {privilege}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default UserPrivileges;
