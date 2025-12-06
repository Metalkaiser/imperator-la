"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../../components/context/authContext";
import { capitalizeName } from "@/app/utils/functions";
import { rolesMap } from "@/app/utils/utils";

// === Helpers del backend (tú los implementas luego) ===
// export async function uploadUserImage(file: File): Promise<string> {}
// export async function updateUserImage(imageUrl: string): Promise<void> {}

export default function UserComponent() {
  const { user, logout } = useAuth();

  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);

  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [pwLoading, setPwLoading] = useState(false);
  const [pwSuccess, setPwSuccess] = useState("");
  const [pwError, setPwError] = useState("");

  useEffect(() => {
    if (user?.image) setImageUrl(user.image);
  }, [user]);

  if (!user) {
    void logout();
    return null;
  }

  // === Selección del archivo ===
  const handleImageSelection = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    const file = fileList[0];
    setImageFile(file);

    // Crear preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  // === Cancelar selección ===
  const handleCancelImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  // === Subir imagen final ===
  const handleImageUpload = async () => {
    if (!imageFile) return;

    try {
      setImageLoading(true);
      Swal.fire({
        title: 'Subiendo imagen...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
        background: theme === 'dark' ? '#1e1e1e' : '#ffffff',
        color: theme === 'dark' ? '#ffffff' : '#000000',
      });

      // === 1. Subir archivo ===
      // const uploadedUrl = await uploadUserImage(imageFile);
      const uploadedUrl = "https://example.com/imagen_subida.jpg"; // placeholder

      // === 2. Actualizar en DB ===
      // await updateUserImage(uploadedUrl);

      setImageUrl(uploadedUrl);
      setImageFile(null);
      setImagePreview(null);
      Swal.close();

      //alert("Imagen actualizada.");
      Swal.fire({
        title: 'Imagen actualizada',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        background: theme === 'dark' ? '#1e1e1e' : '#ffffff',
        color: theme === 'dark' ? '#ffffff' : '#000000',
      });
    } catch (e) {
      console.error(e);
      Swal.close();
      //alert("Error subiendo la imagen.");
      Swal.fire({
        title: 'Error subiendo la imagen',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        background: theme === 'dark' ? '#1e1e1e' : '#ffffff',
        color: theme === 'dark' ? '#ffffff' : '#000000',
      });
    } finally {
      setImageLoading(false);
    }
  };

  // === Update password ===
  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError("");
    setPwSuccess("");

    if (!currentPw || !newPw) {
      setPwError("Todos los campos son obligatorios");
      return;
    }

    try {
      setPwLoading(true);
      // await updateUserPassword(currentPw, newPw);
      setPwSuccess("Contraseña actualizada.");
      setCurrentPw("");
      setNewPw("");
    } catch (e) {
      console.error(e);
      setPwError("Error actualizando contraseña.");
    } finally {
      setPwLoading(false);
    }
  };

  const theme = typeof window !== "undefined" && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  return (
    <section className="max-w-2xl mx-auto p-4 space-y-10">
      
      {/* === USER INFO === */}
      <article className="space-y-4">
        <h2 className="text-xl font-bold">Datos del usuario</h2>

        <div className="flex items-center space-x-4">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={user.name}
              width={70}
              height={70}
              className="rounded-full"
            />
          ) : (
            <div className="size-[70px] rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm text-center">
              <p>Sin imagen</p>
            </div>
          )}
          <div>
            <p><strong>Nombre:</strong> {capitalizeName(user.name)}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Rol:</strong> {rolesMap[user.role]}</p>
          </div>
        </div>
      </article>

      {/* === UPDATE IMAGE === */}
      <article className="space-y-4">
        <h2 className="text-xl font-bold">Cambiar foto de perfil</h2>

        <div className="flex flex-col space-y-4">

          {/* Input file */}
          <label className="border p-2 rounded text-center cursor-pointer">
            Cambiar imagen de perfil
            <input
              type="file"
              accept="image/webp"
              onChange={(e) => handleImageSelection(e.target.files)}
              className="hidden"
            />
          </label>

          {/* Preview */}
          {imagePreview && (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Vista previa:</p>
              <Image
                src={imagePreview}
                alt="preview"
                width={120}
                height={120}
                className="rounded-md border"
              />

              <div className="flex gap-3">
                {/*<button
                  onClick={handleImageUpload}
                  disabled={imageLoading}
                  className="bg-blue-600 text-white px-3 py-2 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {imageLoading ? "Subiendo..." : "Confirmar imagen"}
                </button>*/}
                <button
                  disabled
                  onClick={handleImageUpload}
                  className="bg-blue-600 text-white px-3 py-2 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {imageLoading ? "Subiendo..." : "No disponible"}
                </button>

                <button
                  onClick={handleCancelImage}
                  className="bg-red-600 text-white px-3 py-2 rounded cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      </article>

      {/* === UPDATE PASSWORD === */}
      <article className="space-y-4">
        <h2 className="text-xl font-bold">Cambiar contraseña</h2>

        <form onSubmit={handlePasswordUpdate} className="space-y-3">
          <input
            type="password"
            className="border p-2 rounded w-full"
            placeholder="Contraseña actual"
            value={currentPw}
            onChange={(e) => setCurrentPw(e.target.value)}
          />

          <input
            type="password"
            className="border p-2 rounded w-full"
            placeholder="Nueva contraseña"
            value={newPw}
            onChange={(e) => setNewPw(e.target.value)}
          />

          {pwError && <p className="text-red-500">{pwError}</p>}
          {pwSuccess && <p className="text-green-600">{pwSuccess}</p>}

          {/*<button
            type="submit"
            disabled={pwLoading}
            className="bg-green-600 text-white px-4 py-2 rounded w-full disabled:opacity-50"
          >
            {pwLoading ? "Guardando..." : "Actualizar contraseña"}
          </button>*/}
          <button
            type="button"
            disabled
            className="bg-green-600 text-white px-4 py-2 rounded w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pwLoading ? "Guardando..." : "No disponible"}
          </button>
        </form>
      </article>
    </section>
  );
}
