const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export interface User {
  user_id: string;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface CreateUserRequest {
  email: string;
  full_name: string;
  password: string;
  role?: string;
}

export interface UpdateUserRequest {
  email?: string;
  full_name?: string;
  role?: string;
}

/**
 * Create a new user
 */
export async function createUser(userData: CreateUserRequest): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to create user");
  }

  return response.json();
}

/**
 * Get all users
 */
export async function getUsers(): Promise<User[]> {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}

/**
 * Get a specific user by ID
 */
export async function getUserById(userId: string): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return response.json();
}

/**
 * Update a user
 */
export async function updateUser(
  userId: string,
  userData: UpdateUserRequest
): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to update user");
  }

  return response.json();
}

/**
 * Delete a user
 */
export async function deleteUser(userId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to delete user");
  }
}
