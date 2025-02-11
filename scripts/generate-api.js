import { execSync } from "child_process";
import path from "path";
import { API_BASE_URL } from "lib/constants/urls"

async function generateApi() {
  const outputPath = path.resolve("src/lib/api-types.ts");

  try {
    console.log(`Fetching OpenAPI schema from: ${API_BASE_URL}/api/openapi.json`);
    execSync(
      `npx openapi-typescript ${API_BASE_URL}/api/openapi.json -o ${outputPath}`,
      {
        stdio: "inherit",
      }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Failed to generate API types:", errorMessage);
    process.exit(1);
  }
}

generateApi();
