import UserManagement from "@/components/dashboard/UserManagement";
import { userService } from "@/service/user.service";

export default async function UsersPage() {
  
  const response = await userService.getAllUsers();
  

  let users = [];
  
  if (response?.data?.data && Array.isArray(response.data.data)) {
    users = response.data.data;
  } else if (response?.data && Array.isArray(response.data)) {
    users = response.data;
  } else if (Array.isArray(response)) {
    users = response;
  }
  
 

 
  const user = await userService.getUser();

  const currentUserEmail = user?.email;
  const currentUserRole = user?.role;

  return (
    <div className="w-full h-full bg-slate-50/30">
      <UserManagement 
        initialUsers={users}
        currentUserEmail={currentUserEmail}
        currentUserRole={currentUserRole}
      />
    </div>
  );
}