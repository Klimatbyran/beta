import { execSync } from "child_process";
import path from "path";

async function generateApi() {
  const nodeEnv = process.env.NODE_ENV || "development";
  const baseURL =
    nodeEnv === "production"
      ? "https://api.klimatkollen.se/api"
      : "http://localhost:3000/api";

  const outputPath = path.resolve("src/lib/api-types.ts");

  try {
    console.log(`Fetching OpenAPI schema from: ${baseURL}/openapi.json`);
    execSync(
      `npx openapi-typescript ${baseURL}/openapi.json -o ${outputPath}`,
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
