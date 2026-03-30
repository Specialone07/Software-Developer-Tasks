export function saveTolocalStorage(output: any): void {
  if (output && output.data) {
    localStorage.setItem("profile", JSON.stringify(output.data));
  }
}

export async function getLocalStorageData(): Promise<any> {
  const raw = localStorage.getItem("profile");
  return raw ? JSON.parse(raw) : null;
}

export function getLocalUserId(): number {
  try {
    const raw = localStorage.getItem("profile");
    if (!raw) return 0;
    const profile = JSON.parse(raw);
    return Number(profile.userId ?? 0);
  } catch {
    return 0;
  }
}