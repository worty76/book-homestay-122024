import Cookies from "js-cookie";

// For a real implementation, this would use proper authentication,
// but for this demo we'll just use a cookie to track the user

/**
 * Get the current user ID from cookies
 * If no user ID exists, create one and store it
 */
export function getCurrentUserId(): string {
  let userId = Cookies.get("user_id");

  if (!userId) {
    // Generate a simple user ID and store it in cookies
    userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    Cookies.set("user_id", userId, { expires: 30 }); // expires in 30 days
  }

  return userId;
}

/**
 * Check if the user is logged in
 * In a real implementation, this would verify the authentication token
 */
export function isLoggedIn(): boolean {
  return !!Cookies.get("user_id");
}
