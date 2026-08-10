"use server";

import fs from "fs/promises";
import path from "path";
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

  let emailEnv = process.env.ADMIN_EMAIL || "admin@labese.org";
  let passwordEnv = process.env.ADMIN_PASSWORD || "strongPasswordHere";

  // Clean shell export prefix if necessary
  if (emailEnv.startsWith("export ")) emailEnv = emailEnv.substring(7);
  if (passwordEnv.startsWith("export ")) passwordEnv = passwordEnv.substring(7);

  if (emailInput === emailEnv && passwordInput === passwordEnv) {
    await setAdminSession();
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
  await requireAuth();
  await db.saveHomeData(data);
  revalidatePath("/");
  return { success: true };
}

// 5. Save About Data
export async function saveAboutAction(data: Parameters<typeof db.saveAboutData>[0]) {
  await requireAuth();
  await db.saveAboutData(data);
  revalidatePath("/about");
  return { success: true };
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

// 10. Image upload Action
export async function uploadImageAction(formData: FormData) {
  await requireAuth();
  const file = formData.get("file") as File;
  if (!file || file.size === 0) {
    return { success: false, error: "No file was selected.", image: null };
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    // Sanitize filename to prevent directory traversal or invalid characters
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const nameWithTimestamp = `${Date.now()}-${cleanFileName}`;
    const filePath = path.join(uploadDir, nameWithTimestamp);

    await fs.writeFile(filePath, buffer);
    revalidatePath("/admin/images");
    return {
      success: true,
      image: { name: nameWithTimestamp, url: `/uploads/${nameWithTimestamp}`, size: file.size },
      error: null,
    };
  } catch (e) {
    console.error("Image upload failed:", e);
    return { success: false, error: "An error occurred during file writing.", image: null };
  }
}

// 11. Delete image Action
export async function deleteImageAction(formData: FormData) {
  await requireAuth();
  const filename = String(formData.get("filename") ?? "");
  try {
    const filePath = path.join(process.cwd(), "public", "uploads", path.basename(filename));
    await fs.unlink(filePath);
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
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  try {
    const files = await fs.readdir(uploadDir);
    // Sort files to return newer uploads first
    const list = await Promise.all(
      files.map(async (name) => {
        const filePath = path.join(uploadDir, name);
        const stats = await fs.stat(filePath);
        return {
          name,
          url: `/uploads/${name}`,
          size: stats.size,
          mtime: stats.mtimeMs,
        };
      })
    );
    return list.sort((a, b) => b.mtime - a.mtime);
  } catch (e) {
    return [];
  }
}
