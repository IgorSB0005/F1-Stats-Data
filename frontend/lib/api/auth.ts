import type { AuthToken, AuthUser } from "@/types/auth";

type RegisterPayload = {
  username: string;
  password: string;
  favorite_team?: string | null;
};

type UpdatePayload = {
  password?: string | null;
  favorite_team?: string | null;
};

function getAuthApiBase() {
  const baseUrl =
    typeof window === "undefined"
      ? process.env.AUTH_SERVICE_URL || process.env.NEXT_PUBLIC_AUTH_SERVICE_URL
      : process.env.NEXT_PUBLIC_AUTH_SERVICE_URL || process.env.AUTH_SERVICE_URL;

  if (!baseUrl) {
    throw new Error("AUTH service URL is not configured");
  }

  return baseUrl;
}

async function handleResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : null;

  if (!response.ok) {
    const message = data?.detail || "Request failed";
    throw new Error(message);
  }

  return data as T;
}

export async function registerUser(payload: RegisterPayload): Promise<AuthUser> {
  const response = await fetch(`${getAuthApiBase()}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleResponse<AuthUser>(response);
}

export async function loginUser(username: string, password: string): Promise<AuthToken> {
  const response = await fetch(`${getAuthApiBase()}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  return handleResponse<AuthToken>(response);
}

export async function getCurrentUser(token: string): Promise<AuthUser> {
  const response = await fetch(`${getAuthApiBase()}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse<AuthUser>(response);
}

export async function updateProfile(
  token: string,
  payload: UpdatePayload
): Promise<AuthUser> {
  const response = await fetch(`${getAuthApiBase()}/update-profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  return handleResponse<AuthUser>(response);
}

export async function deleteAccount(token: string): Promise<void> {
  const response = await fetch(`${getAuthApiBase()}/account`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  await handleResponse(response);
}
