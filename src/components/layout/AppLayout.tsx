import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import TopBar from "./TopBar";

const AppLayout = () => {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex-1 ml-[260px]">
        <TopBar />
        <main className="p-6" role="main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
