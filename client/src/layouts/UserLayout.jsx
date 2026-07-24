import UserFooter from "@/components/UserFooter";
import UserTopbar from "@/components/UserTopbar";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <UserTopbar />
      <main className="w-full">
        <div>
          <Outlet />
        </div>
        <UserFooter />
      </main>
    </div>
  );
};

export default UserLayout;