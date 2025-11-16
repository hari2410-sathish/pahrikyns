// src/utils/auth.js

// Demo admin credentials
const ADMIN_EMAIL = "admin@pahrikyns.com";
const ADMIN_PASS = "Admin@123";

// Key used in localStorage
const TOKEN_KEY = "pahrikyns:adminToken";

/**
 * Attempt admin login
 */
export function adminLogin(email, password) {
  if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
    const token = "demo-admin-token";
    localStorage.setItem(TOKEN_KEY, token);

    return {
      success: true,
      token,
      message: "Login successful",
    };
  }

  return {
    success: false,
    message: "Invalid admin credentials",
  };
}

/**
 * Logout admin user
 */
export function adminLogout() {
  localStorage.removeItem(TOKEN_KEY);
}

/**
 * Check if admin is logged in
 */
export function isAdminLoggedIn() {
  return Boolean(localStorage.getItem(TOKEN_KEY));
}

/**
 * Retrieve saved token
 */
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
