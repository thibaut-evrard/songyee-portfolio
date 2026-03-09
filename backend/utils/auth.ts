import { GoogleAuth, Impersonated } from "google-auth-library";
import { SERVICE_ACCOUNT } from "../constants";

export async function getAuthClient() {
  try {
    const auth = new GoogleAuth();

    if (!SERVICE_ACCOUNT) {
      return auth;
    } else {
      const authClient = await auth.getClient();
      return new Impersonated({
        sourceClient: authClient,
        targetPrincipal: SERVICE_ACCOUNT,
        targetScopes: [
          "https://www.googleapis.com/auth/spreadsheets.readonly",
          "https://www.googleapis.com/auth/devstorage.read_only",
        ],
      });
    }
  } catch (error) {
    console.error(`Error creating auth client: ${error}`);
    throw error;
  }
}
