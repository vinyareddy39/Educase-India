import AppRoutes from "./routes/approutes";
import { AuthProvider } from "./context/authcontext";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;