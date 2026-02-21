"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getAuthService } from "@/config/auth/authServiceInstance";
import { updateMyProfileImageAction } from "@/app/actions/users";
import { useAuth } from "../../components/context/authContext";
import { capitalizeName } from "@/app/utils/functions";
import { rolesMap } from "@/app/utils/utils";
import { useRouter } from "next/navigation";

const ALLOWED_IMAGE_MIMES = ["image/webp", "image/jpeg", "image/png"];
const MAX_IMAGE_BYTES = 512_000;

export default function UserComponent() {
  const { user, authStatus, refreshSession } = useAuth();
  const router = useRouter();

  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState("");

  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwLoading, setPwLoading] = useState(false);
  const [pwSuccess, setPwSuccess] = useState("");
  const [pwError, setPwError] = useState("");

  useEffect(() => {
    if (user?.image) setImageUrl(user.image);
  }, [user]);

  useEffect(() => {
    if (authStatus === "unauthenticated") {
      router.replace("/admin/login");
    }
  }, [authStatus, router]);

  useEffect(() => {
    if (!imageFile) {
      setImagePreview(null);
      return;
    }

    const url = URL.createObjectURL(imageFile);
    setImagePreview(url);

    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  if (user === null) {
    return (
      <section className="max-w-2xl mx-auto p-4">
        <p className="text-sm text-gray-500">Cargando datos del usuario...</p>
      </section>
    );
  }
  if (authStatus === "loading") {
    return (
      <section className="max-w-2xl mx-auto p-4">
        <p className="text-sm text-gray-500">Verificando sesión...</p>
      </section>
    );
  }

  if (authStatus === "unauthenticated") {
    return (
      <section className="max-w-2xl mx-auto p-4">
        <p className="text-sm text-gray-500">Redirigiendo al login...</p>
      </section>
    );
  }

  const validateImage = (file: File): string | null => {
    if (!ALLOWED_IMAGE_MIMES.includes(file.type)) {
      return `Formato no permitido. Usa: ${ALLOWED_IMAGE_MIMES.join(", ")}`;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      return `La imagen debe pesar máximo ${MAX_IMAGE_BYTES / 1024} KB`;
    }
    return null;
  };

  const handleImageSelection = (fileList: FileList | null) => {
    setImageError("");
    if (!fileList || fileList.length === 0) return;

    const file = fileList[0];
    const validationError = validateImage(file);
    if (validationError) {
      setImageFile(null);
      setImagePreview(null);
      setImageError(validationError);
      return;
    }

    setImageFile(file);
  };

  const handleCancelImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setImageError("");
  };

  const handleImageUpload = async () => {
    if (!imageFile) return;

    const validationError = validateImage(imageFile);
    if (validationError) {
      setImageError(validationError);
      return;
    }

    setImageError("");
    setImageLoading(true);

    Swal.fire({
      title: "Subiendo imagen...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const formData = new FormData();
      formData.set("image", imageFile);

      const result = await updateMyProfileImageAction(formData);
      Swal.close();

      if (!result.success || !result.imageUrl) {
        const message = result.error ?? "No se pudo actualizar la imagen";
        setImageError(message);
        await Swal.fire("Error", message, "error");
        return;
      }

      setImageUrl(result.imageUrl);
      setImageFile(null);
      setImagePreview(null);
      await refreshSession();

      await Swal.fire("Imagen actualizada", "Tu foto de perfil se actualizó correctamente.", "success");
    } catch (error: any) {
      console.error(error);
      Swal.close();
      const message = error?.message ?? "Error subiendo la imagen";
      setImageError(message);
      await Swal.fire("Error", message, "error");
    } finally {
      setImageLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: FormEvent) => {
    e.preventDefault();
    setPwError("");
    setPwSuccess("");

    if (!currentPw || !newPw || !confirmPw) {
      setPwError("Todos los campos son obligatorios");
      return;
    }

    if (newPw.length < 8) {
      setPwError("La nueva contraseña debe tener al menos 8 caracteres");
      return;
    }

    if (currentPw === newPw) {
      setPwError("La nueva contraseña debe ser distinta a la actual");
      return;
    }

    if (newPw !== confirmPw) {
      setPwError("La confirmación no coincide con la nueva contraseña");
      return;
    }

    try {
      setPwLoading(true);
      const authService = await getAuthService();

      const policyResult = authService.validateNewPassword?.(newPw);
      if (policyResult && !policyResult.ok) {
        setPwError(policyResult.message ?? "Nueva contraseña inválida");
        return;
      }

      const result = await authService.changePassword(currentPw, newPw);

      if (!result.success) {
        setPwError(result.message || "Error actualizando contraseña");
        await Swal.fire("Error", result.message || "Error actualizando contraseña", "error");
        return;
      }

      setPwSuccess(result.message || "Contraseña actualizada");
      setCurrentPw("");
      setNewPw("");
      setConfirmPw("");

      await Swal.fire("Contraseña actualizada", result.message || "Cambio aplicado correctamente.", "success");
    } catch (error: any) {
      console.error(error);
      const message = error?.message ?? "Error actualizando contraseña";
      setPwError(message);
      await Swal.fire("Error", message, "error");
    } finally {
      setPwLoading(false);
    }
  };

  return (
    <section className="max-w-2xl mx-auto p-4 space-y-10">
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

      <article className="space-y-4">
        <h2 className="text-xl font-bold">Cambiar foto de perfil</h2>

        <div className="flex flex-col space-y-4">
          <label className="border p-2 rounded text-center cursor-pointer">
            Seleccionar imagen
            <input
              type="file"
              accept="image/webp,image/jpeg,image/png"
              onChange={(e) => handleImageSelection(e.target.files)}
              className="hidden"
              disabled={imageLoading}
            />
          </label>

          {imageError && <p className="text-red-500 text-sm">{imageError}</p>}

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
                <button
                  onClick={handleImageUpload}
                  disabled={imageLoading || !imageFile}
                  className="bg-blue-600 text-white px-3 py-2 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {imageLoading ? "Subiendo..." : "Confirmar imagen"}
                </button>

                <button
                  onClick={handleCancelImage}
                  disabled={imageLoading}
                  className="bg-red-600 text-white px-3 py-2 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      </article>

      <article className="space-y-4">
        <h2 className="text-xl font-bold">Cambiar contraseña</h2>

        <form onSubmit={handlePasswordUpdate} className="space-y-3">
          <input
            type="password"
            className="border p-2 rounded w-full"
            placeholder="Contraseña actual"
            value={currentPw}
            onChange={(e) => setCurrentPw(e.target.value)}
            disabled={pwLoading}
          />

          <input
            type="password"
            className="border p-2 rounded w-full"
            placeholder="Nueva contraseña"
            value={newPw}
            onChange={(e) => setNewPw(e.target.value)}
            disabled={pwLoading}
          />

          <input
            type="password"
            className="border p-2 rounded w-full"
            placeholder="Confirmar nueva contraseña"
            value={confirmPw}
            onChange={(e) => setConfirmPw(e.target.value)}
            disabled={pwLoading}
          />

          {pwError && <p className="text-red-500">{pwError}</p>}
          {pwSuccess && <p className="text-green-600">{pwSuccess}</p>}

          <button
            type="submit"
            disabled={pwLoading}
            className="bg-green-600 text-white px-4 py-2 rounded w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pwLoading ? "Guardando..." : "Actualizar contraseña"}
          </button>
        </form>
      </article>
    </section>
  );
}
