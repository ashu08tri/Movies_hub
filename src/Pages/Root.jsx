import { Outlet } from "react-router-dom";
import MainNavigation from "../Components/MainNavigation";

function Root() {
  return (
    <main>
        <MainNavigation />
        <Outlet />
    </main>
  )
}

export default Root