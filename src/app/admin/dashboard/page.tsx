import TestLogout from "@/app/testComponents/tempLogout";

export default function DashboardPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard de Administración</h1>
      <TestLogout />
      <p>Bienvenido al panel de administración. Aquí puedes gestionar el inventario y otras configuraciones.</p>
    </div>
  );
}