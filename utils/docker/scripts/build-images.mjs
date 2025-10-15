// build-images-minimal.mjs

import { execa } from 'execa';

/**
 * Executes a docker buildx bake command.
 * @param {string[]} files - Array of HCL file paths.
 * @param {string[]} [targets=['services']] - Build targets/groups.
 * @returns {Promise<string>} - Command's stdout.
 */
async function dockerImages(files, targets = ['services']) {
    if (!files || files.length === 0) {
        throw new Error('Files list cannot be empty.');
    }
    
    // Base command and arguments
    const executable = 'docker';
    let args = ['buildx', 'bake'];
    
     // 1. ADD THE ALLOW FLAG (Using the path suggested by the error)
    const MONOREPO_ROOT = '/home/manav/project/secshop';
    args.push(`--allow=fs.read=${MONOREPO_ROOT}`); 
    // Add --file flags
    for (const file of files) {
        args.push('--file', file);
    }
    
    // Add targets (e.g., 'default' or 'services')
    args.push(...targets); 

    try {
        // Execute the command
        const { stdout } = await execa(executable, args);
        console.log('✅ Build completed.');
        return stdout;
    } catch (error) {
        // Minimal error handling: log exit code and re-throw
        throw new Error(`Build failed (Exit ${error.exitCode}). See stderr for details.`, { cause: error });
    }
}

// --- MAIN EXECUTION ---
try {
    const BAKE_FILES = [
        './bakefiles/base.hcl', 
        './bakefiles/function.hcl',
        './bakefiles/targets.hcl'
    ];
    
    const TARGETS = ['services']; // Use 'services' explicitly

    const output = await dockerImages(BAKE_FILES, TARGETS);

    // Only log output if successful
    // console.log(output.trim()); 
    
    } catch (error) {
        // --- ADD THESE LOGS FOR DIAGNOSIS ---
        console.error(`\n--- BUILDKIT ERROR DETAILS ---`);
        console.error(`Exit Code: ${error.exitCode}`);
        // Log the actual text output from BuildKit
        if (error.stderr) {
            console.error(error.stderr); 
        } else {
            console.error("No stderr captured, check stdout/exit code.");
        }
        console.error(`------------------------------`);
        // ------------------------------------
        
        throw new Error(`Build failed (Exit ${error.exitCode}). See error details above.`, { cause: error });
    }