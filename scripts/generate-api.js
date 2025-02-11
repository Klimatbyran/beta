import { execSync } from "child_process";

async function generateApi() {
  const nodeEnv = process.env.NODE_ENV || "development";
  const baseURL =
    nodeEnv === "production"
      ? "https://api.klimatkollen.se/api"
      : "http://localhost:3000/api";

  const outputPath = "./src/lib/api-types.ts"; // ✅ Replaces path.resolve()

  try {
    console.log(`Fetching OpenAPI schema from: ${baseURL}/openapi.json`);
    execSync(`npx openapi-typescript ${baseURL}/openapi.json -o ${outputPath}`, {
      stdio: "inherit",
    });
  } catch (error) {
    console.error("Failed to generate API types:", error instanceof Error ? error.message : "Unknown error occurred");
    process.exit(1);
  }
}

generateApi();