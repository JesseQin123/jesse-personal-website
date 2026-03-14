export interface StudentConfig {
  slug: string;
  name: string;
  nameCn: string;
  title: string;
  courseId: string;
  passwordHash: string;
}

export const students: StudentConfig[] = [
  {
    slug: "fiona",
    name: "Fiona Zheng",
    nameCn: "郑斐",
    title: "Tech PM at Big 4 (Canada)",
    courseId: "ai-bootcamp-fiona",
    // Password: "Fiona2026"
    passwordHash: "3d736982ea533b18e9df5c30664e2d8e9922a9ce9d3bd72e7338739b5e3be981",
  },
];

export function getStudentBySlug(slug: string): StudentConfig | undefined {
  return students.find((s) => s.slug === slug);
}

export async function verifyPassword(
  input: string,
  expectedHash: string
): Promise<boolean> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex === expectedHash;
}
