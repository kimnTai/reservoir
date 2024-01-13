import { RouterProvider } from "react-router-dom";

import { AppProvider } from "@/context/AppContext";
import router from "@/routes";

export default function App() {
  return (
    <AppProvider>
      <div className="flex items-center h-screen">
        <div className="container">
          <RouterProvider router={router} />
        </div>
      </div>
    </AppProvider>
  );
}
