import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/authcontext";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;