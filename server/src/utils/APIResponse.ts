/**
 * APIResponse - Standardized API Response Wrapper
 *
 * This generic class ensures all API responses follow a consistent structure.
 * It wraps the actual response data with metadata like success status and messages.
 *
 * @template T - The type of data being returned in the response
 *
 * Properties:
 *   - success: Whether the API call succeeded (always true - use custom error class for failures)
 *   - data: The actual payload data returned from the API (can be any type)
 *   - message: Optional status/info message (e.g., "User created", "Data updated successfully")
 *
 * Usage:
 *   - Create successful responses: new APIResponse(userData, "User fetched successfully")
 *   - Works with any data type: APIResponse<User>, APIResponse<string[]>, etc.
 */
export class APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;

  constructor(data: T, message?: string) {
    this.success = true;
    this.data = data;
    this.message = message;
  }
}
