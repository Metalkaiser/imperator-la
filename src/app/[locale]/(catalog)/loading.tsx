/*import LoadingPage from "./components/LoadingPage";

export default function Loading() {
  return <LoadingPage />;
}*/
export default function Loading() {
  return (
    <div style={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center" }}>
      <p style={{ fontSize: "1.5rem" }}>Cargando catálogo...</p>
    </div>
  );
}