import { redirect } from "next/navigation";

const AdminDashboard = () => {
    return redirect("admin-dashboard/users")
};

export default AdminDashboard;