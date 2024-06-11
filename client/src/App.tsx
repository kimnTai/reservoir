import { RouterProvider } from "react-router-dom";

import { AppProvider } from "@/context/AppContext";
import router from "@/routes";

export default function App() {
  return (
    <AppProvider>
      <div className="flex items-center justify-center h-screen">
        <RouterProvider router={router} />
      </div>
    </AppProvider>
  );
}
