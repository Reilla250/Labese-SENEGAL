"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { isAuthenticated, setAdminSession, logout } from "@/lib/auth";
import * as db from "@/lib/db";

// Ensure auth check helper for Server Actions
async function requireAuth() {
  const auth = await isAuthenticated();
  if (!auth) {
    throw new Error("Unauthorized access");
  }
}

// Revalidate all public pages to refresh cache
function revalidateAllPublicPages() {
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/programmes");
  revalidatePath("/initiatives");
  revalidatePath("/impact");
  revalidatePath("/advocacy");
  revalidatePath("/privacy");
  revalidatePath("/safeguarding");
  revalidatePath("/disclaimer");
  revalidatePath("/contact");
  // Also sitemap and robots
  revalidatePath("/sitemap.xml");
  revalidatePath("/robots.txt");
}

export type LoginActionState = {
  status: "idle" | "success" | "error";
  message?: string;
};

function saveError(error: unknown, fallback = "Failed to save data") {
  const message = error instanceof Error ? error.message : fallback;
  return { success: false as const, error: message };
}

// 1. Admin Login
export async function loginAction(
  _prevState: LoginActionState,
  formData: FormData
): Promise<LoginActionState> {
  const emailInput = String(formData.get("email") ?? "").trim();
  const passwordInput = String(formData.get("password") ?? "");

  const emailEnv = process.env.ADMIN_EMAIL || "admin@labese.org";
  const passwordEnv = process.env.ADMIN_PASSWORD || "strongPasswordHere";

  if (emailInput === emailEnv && passwordInput === passwordEnv) {
    await setAdminSession();
    
    // Instead of redirecting here, return success
    // The client will handle redirect after cookies are set
    return { status: "success" };
  }

  return {
    status: "error",
    message: "Invalid email or password. Please try again.",
  };
}

// 2. Admin Logout
export async function logoutAction() {
  await logout();
  redirect("/admin/login");
}

// 3. Save Site Data
export async function saveSiteAction(data: Parameters<typeof db.saveSiteData>[0]) {
  try {
    await requireAuth();
    await db.saveSiteData(data);
    revalidateAllPublicPages();
    return { success: true as const };
  } catch (error) {
    console.error("Save site data error:", error);
    return saveError(error);
  }
}

// 4. Save Home Data
export async function saveHomeAction(data: Parameters<typeof db.saveHomeData>[0]) {
  try {
    await requireAuth();
    await db.saveHomeData(data);
    revalidatePath("/");
    return { success: true as const };
  } catch (error) {
    console.error("Save home data error:", error);
    return saveError(error);
  }
}

// 5. Save About Data
export async function saveAboutAction(data: Parameters<typeof db.saveAboutData>[0]) {
  try {
    await requireAuth();
    await db.saveAboutData(data);
    revalidatePath("/about");
    return { success: true as const };
  } catch (error) {
    console.error("Save about data error:", error);
    return saveError(error);
  }
}

// 6. Save Programmes Data
export async function saveProgrammesAction(data: Parameters<typeof db.saveProgrammesData>[0]) {
  try {
    await requireAuth();
    await db.saveProgrammesData(data);
    revalidatePath("/");
    revalidatePath("/programmes");
    return { success: true as const };
  } catch (error) {
    console.error("Save programmes data error:", error);
    return saveError(error);
  }
}

// 7. Save Initiatives Data
export async function saveInitiativesAction(data: Parameters<typeof db.saveInitiativesData>[0]) {
  try {
    await requireAuth();
    await db.saveInitiativesData(data);
    revalidatePath("/initiatives");
    revalidatePath("/impact"); // MMHEI metrics shown here too
    return { success: true as const };
  } catch (error) {
    console.error("Save initiatives data error:", error);
    return saveError(error);
  }
}

// 8. Save Impact Data
export async function saveImpactAction(data: Parameters<typeof db.saveImpactData>[0]) {
  try {
    await requireAuth();
    await db.saveImpactData(data);
    revalidatePath("/");
    revalidatePath("/impact");
    return { success: true as const };
  } catch (error) {
    console.error("Save impact data error:", error);
    return saveError(error);
  }
}

// 9. Save Advocacy Data
export async function saveAdvocacyAction(data: Parameters<typeof db.saveAdvocacyData>[0]) {
  try {
    await requireAuth();
    await db.saveAdvocacyData(data);
    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/advocacy");
    return { success: true as const };
  } catch (error) {
    console.error("Save advocacy data error:", error);
    return saveError(error);
  }
}

// 10. Image upload Action - stores fully in TiDB
export async function uploadImageAction(formData: FormData) {
  await requireAuth();
  const file = formData.get("file") as File;
  if (!file || file.size === 0) {
    return { success: false, error: "No file was selected.", image: null };
  }

  // Limit file size to 10MB
  if (file.size > 10 * 1024 * 1024) {
    return { success: false, error: "File too large. Maximum size is 10MB.", image: null };
  }

  try {
    const imageId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const mimeType = file.type || "image/jpeg";

    // Store image fully in TiDB
    const url = await db.saveImageToDb(imageId, file.name, mimeType, file.size, buffer);

    const newImage: db.ImageRecord = {
      id: imageId,
      name: file.name,
      url, // /api/images/{id}
      size: file.size,
      mtime: Date.now(),
    };

    // Update image index in TiDB
    const index = await db.getImageIndex();
    index.unshift(newImage);
    await db.saveImageIndex(index);

    revalidatePath("/admin/images");
    return { success: true, image: newImage, error: null };
  } catch (e) {
    console.error("Image upload failed:", e);
    const msg = e instanceof Error ? e.message : "Upload failed";
    return { success: false, error: msg, image: null };
  }
}

// 11. Delete image Action - deletes from TiDB
export async function deleteImageAction(formData: FormData) {
  await requireAuth();
  const imageId = String(formData.get("id") ?? "");

  try {
    // Delete image data from TiDB
    await db.deleteImageFromDb(imageId);

    // Remove from index
    const index = await db.getImageIndex();
    await db.saveImageIndex(index.filter((img) => img.id !== imageId));

    revalidatePath("/admin/images");
    return { success: true, error: null };
  } catch (e) {
    console.error("Failed to delete image:", e);
    return { success: false, error: "Could not delete image." };
  }
}

// 12. Get uploaded images list
export async function getUploadedImagesAction() {
  await requireAuth();
  try {
    return await db.getImageIndex();
  } catch (e) {
    console.error("Failed to load images:", e);
    return [];
  }
}
