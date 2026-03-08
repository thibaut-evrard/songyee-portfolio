import { GoogleAuth, Impersonated } from "google-auth-library";

export async function getAuthClient() {
  const auth = new GoogleAuth();
  const projectNumer = process.env.PROJECT_NUMBER;
  if (projectNumer === undefined) {
    return auth;
  } else {
    const authClient = await auth.getClient();
    return new Impersonated({
      sourceClient: authClient,
      targetPrincipal: `${projectNumer}-compute@developer.gserviceaccount.com`,
      targetScopes: [
        "https://www.googleapis.com/auth/spreadsheets.readonly",
        "https://www.googleapis.com/auth/devstorage.read_only",
      ],
    });
  }
}
