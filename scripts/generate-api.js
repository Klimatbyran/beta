import { execSync } from "child_process";
import fetch from "node-fetch";

async function getApiUrl() {
  try {
    const localUrl = "http://localhost:3000/api/openapi.json";
    await fetch(localUrl, { method: "HEAD" });
    return localUrl;
  } catch {
    return "https://api.klimatkollen.se/api/openapi.json";
  }
}

async function generateApi() {
  const apiUrl = await getApiUrl();

  try {
    console.log(`Fetching OpenAPI schema from: ${apiUrl}`);
    execSync(`npx openapi-typescript ${apiUrl} -o src/lib/api-types.ts`, {
      stdio: "inherit",
    });
  } catch (error) {
    console.error("Failed to generate API types:", error.message);
    process.exit(1);
  }
}

generateApi();
