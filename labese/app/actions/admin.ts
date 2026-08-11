"use server";

import { put, del, list } from "@vercel/blob";
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
  await requireAuth();
  await db.saveSiteData(data);
  revalidateAllPublicPages();
  return { success: true };
}

// 4. Save Home Data
export async function saveHomeAction(data: Parameters<typeof db.saveHomeData>[0]) {
  try {
    await requireAuth();
    await db.saveHomeData(data);
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Save home data error:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to save data" 
    };
  }
}

// 5. Save About Data
export async function saveAboutAction(data: Parameters<typeof db.saveAboutData>[0]) {
  try {
    await requireAuth();
    await db.saveAboutData(data);
    revalidatePath("/about");
    return { success: true };
  } catch (error) {
    console.error("Save about data error:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to save data" 
    };
  }
}

// 6. Save Programmes Data
export async function saveProgrammesAction(data: Parameters<typeof db.saveProgrammesData>[0]) {
  await requireAuth();
  await db.saveProgrammesData(data);
  revalidatePath("/");
  revalidatePath("/programmes");
  return { success: true };
}

// 7. Save Initiatives Data
export async function saveInitiativesAction(data: Parameters<typeof db.saveInitiativesData>[0]) {
  await requireAuth();
  await db.saveInitiativesData(data);
  revalidatePath("/initiatives");
  revalidatePath("/impact"); // MMHEI metrics shown here too
  return { success: true };
}

// 8. Save Impact Data
export async function saveImpactAction(data: Parameters<typeof db.saveImpactData>[0]) {
  await requireAuth();
  await db.saveImpactData(data);
  revalidatePath("/");
  revalidatePath("/impact");
  return { success: true };
}

// 9. Save Advocacy Data
export async function saveAdvocacyAction(data: Parameters<typeof db.saveAdvocacyData>[0]) {
  await requireAuth();
  await db.saveAdvocacyData(data);
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/advocacy");
  return { success: true };
}

const BLOB_BASE_URL = "https://0xfyk5vg923diks2.public.blob.vercel-storage.com";

// Helper to read the image index
async function getImageIndex(): Promise<Array<{ id: string; name: string; url: string; size: number; mtime: number }>> {
  try {
    const response = await fetch(`${BLOB_BASE_URL}/data/image-index.json`, { cache: "no-store" });
    if (response.ok) return await response.json();
    return [];
  } catch {
    return [];
  }
}

// Helper to save the image index
async function saveImageIndex(images: Array<{ id: string; name: string; url: string; size: number; mtime: number }>) {
  await put("data/image-index.json", JSON.stringify(images, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

// 10. Image upload Action with metadata
export async function uploadImageAction(formData: FormData) {
  await requireAuth();
  const file = formData.get("file") as File;
  if (!file || file.size === 0) {
    return { success: false, error: "No file was selected.", image: null };
  }

  try {
    const imageId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const ext = file.name.split(".").pop() || "jpg";

    // Upload image to Blob
    const imageBlob = await put(`images/${imageId}.${ext}`, file, {
      access: "public",
      addRandomSuffix: false,
    });

    // Add to image index
    const newImage = {
      id: imageId,
      name: file.name,
      url: imageBlob.url,
      size: file.size,
      mtime: Date.now(),
    };

    const index = await getImageIndex();
    index.unshift(newImage); // newest first
    await saveImageIndex(index);

    revalidatePath("/admin/images");
    return {
      success: true,
      image: newImage,
      error: null,
    };
  } catch (e) {
    console.error("Image upload failed:", e);
    return { success: false, error: "An error occurred during file upload.", image: null };
  }
}

// 11. Delete image Action
export async function deleteImageAction(formData: FormData) {
  await requireAuth();
  const url = String(formData.get("url") ?? "");
  const imageId = String(formData.get("id") ?? "");

  try {
    // Delete image from Blob
    await del(url);

    // Remove from image index
    const index = await getImageIndex();
    const updated = index.filter((img) => img.id !== imageId);
    await saveImageIndex(updated);

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
    // Fetch the image index JSON directly (no list() = no Advanced Operations)
    const BLOB_BASE_URL = "https://0xfyk5vg923diks2.public.blob.vercel-storage.com";
    const response = await fetch(`${BLOB_BASE_URL}/data/image-index.json`, {
      cache: "no-store",
    });

    if (response.ok) {
      const images = await response.json();
      return images as Array<{
        id: string;
        name: string;
        url: string;
        size: number;
        mtime: number;
      }>;
    }

    return [];
  } catch (e) {
    console.error("Failed to load image index:", e);
    return [];
  }
}
