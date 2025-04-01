import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck, Loader } from "lucide-react";
import { RolePrivilege } from "@/types/supabase-extensions";

const UserPrivileges = () => {
  const { currentUser } = useAuth();
  const [privileges, setPrivileges] = useState<RolePrivilege[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserPrivileges = async () => {
      if (!currentUser) return;
      
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('role_privileges')
          .select('*')
          .eq('role', currentUser.role)
          .eq('active', true);
          
        if (error) throw error;
        
        setPrivileges(data || []);
      } catch (error) {
        console.error("Error fetching privileges:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserPrivileges();
  }, [currentUser]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-4">
        <Loader className="animate-spin text-waypoint-blue mr-2" size={20} />
        <span>Loading privileges...</span>
      </div>
    );
  }

  if (privileges.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Role Privileges</CardTitle>
          <CardDescription>
            No privileges found for your account.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

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
          {privileges.map((privilege) => (
            <li
              key={privilege.id}
              className="flex items-start"
            >
              <BadgeCheck className="h-5 w-5 text-waypoint-blue mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <p className="font-medium text-waypoint-black">
                  {privilege.privilege_description}
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
