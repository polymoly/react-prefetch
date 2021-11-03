/**
 * AUTO_GENERATED Do not change this file directly, use config.ts file instead
 *
 * @version 5
 */

export interface Account {
  /** Format: double */
  id: number;
  name: string;
}

export interface User {
  email: string;
  /** Format: double */
  id: number;
  name: string;
  status?: "Happy" | "Sad";
}
