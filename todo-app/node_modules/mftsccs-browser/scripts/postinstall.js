const fs = require("fs");
const path = require("path");
const ncp = require("ncp").ncp;

try {
  // Check if we're in a development environment (i.e., npm link is used in the source package)
  const isLinkingInDevelopment = fs.existsSync(
    path.join(process.cwd(), "node_modules", "mftsccs-browser")
  );

  // If we're running this script in `your-package` (source) itself, skip the postinstall logic
  if (isLinkingInDevelopment) {
    console.log(
      "Detected local development with npm link. Skipping postinstall."
    );
    process.exit(0); // Exit early, we don't need to run the postinstall here
  }

  console.log("Running as a project dependency...");

  // Try to resolve the path to `mftsccs-browser` package in the consuming project
  let sourceDir;
  try {
    const mftsccsBrowserPath = require.resolve("mftsccs-browser");
    // sourceDir = path.join(path.dirname(mftsccsBrowserPath), 'dist');
    sourceDir = path.join(path.dirname(mftsccsBrowserPath), "");
  } catch (err) {
    console.error("Error: mftsccs-browser package not found.");
    console.log(
      "Ensure that your consuming project has installed mftsccs-browser as a dependency."
    );
    //   process.exit(1);  // Exit if mftsccs-browser is not found
    if (sourceDir == undefined) return;
  }

  // Target destination in the consuming project (public directory)
  const consumingProjectRoot = path.resolve(sourceDir, "../../../"); // Move two levels up from the package to the project root
  const destDir = path.join(consumingProjectRoot, "public");

  // Ensure the 'public' directory exists. If it doesn't, create it.
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  // Path to the specific file we want to copy
  const sourceFile = path.join(sourceDir, "serviceWorker.bundle.js");

  // Check if the source file exists
  if (!fs.existsSync(sourceFile)) {
    console.error(
      "Error: serviceWorker.bundle.js not found in source directory."
    );
    process.exit(1);
  }

  // Path to the destination file
  const destFile = path.join(destDir, "serviceWorker.bundle.js");

  // If the destination file exists, delete it
  if (fs.existsSync(destFile)) {
    fs.unlinkSync(destFile);
    console.log(`Existing file ${destFile} removed.`);
  }

  // Copy the specific bundled file to the public directory
  ncp(sourceFile, destFile, (err) => {
    if (err) {
      console.error("Error copying serviceWorker.bundle.js:", err);
      process.exit(1);
    }
    console.log("serviceWorker.bundle.js copied to public directory!");
  });
} catch (err) {
  console.log("Error", err);
}
