// utils/docker/scripts/build-images.mjs
import { execa } from "execa";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

/**
 * Recursively find the monorepo root by walking upward until a `pnpm-workspace.yaml` or `.git` folder is found.
 */
function findMonorepoRoot(startDir = process.cwd()) {
  let current = startDir;
  while (true) {
    if (
      fs.existsSync(path.join(current, "pnpm-workspace.yaml")) ||
      fs.existsSync(path.join(current, ".git"))
    ) {
      return current;
    }
    const parent = path.dirname(current);
    if (parent === current) {
      throw new Error("Monorepo root not found (no pnpm-workspace.yaml or .git)");
    }
    current = parent;
  }
}

/**
 * Executes a docker buildx bake command.
 * @param {string[]} files - Array of HCL file paths.
 * @param {string[]} [targets=['services']] - Build targets/groups.
 * @returns {Promise<void>}
 */
async function dockerImages(files, targets = ["services"]) {
  if (!files || files.length === 0) {
    throw new Error("Files list cannot be empty.");
  }

  // Determine monorepo root dynamically
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const MONOREPO_ROOT = findMonorepoRoot(__dirname);

  console.log(`🗂️  Monorepo root detected at: ${MONOREPO_ROOT}`);

  const args = ["buildx", "bake", `--allow=fs.read=${MONOREPO_ROOT}`];

  for (const file of files) {
    args.push("--file", file);
  }

  args.push(...targets);

  try {
    await execa("docker", args, { stdio: "inherit" });
    console.log("✅ Build completed successfully.");
  } catch (error) {
    console.error("\n--- BUILDKIT ERROR DETAILS ---");
    console.error(`Exit Code: ${error.exitCode ?? "undefined"}`);
    console.error(error.stderr || "No stderr captured, check stdout.");
    console.error("------------------------------");
    throw new Error(
      `Build failed (Exit ${error.exitCode}). See error details above.`,
      { cause: error }
    );
  }
}

// --- MAIN EXECUTION ---
try {
  const BAKE_FILES = [
    "./bakefiles/base.hcl",
    "./bakefiles/function.hcl",
    "./bakefiles/targets.hcl",
  ];

  const TARGETS = ["services"];

  await dockerImages(BAKE_FILES, TARGETS);
} catch (error) {
  console.error("❌ Overall build process failed:", error.message);
  process.exit(1);
}
