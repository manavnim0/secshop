import {execa} from  'execa';

async function dockerImages(files,command, targets = []) {
    if (!files || files.length === 0 || !command || command.length === 0) {
        throw new Error('Files and command array must be provided.');
    }
    let args = [...command.slice(1)]; 
  
    for (const file of files) {
        args.push('--file', file);
        console.log(file)
    }
    args.push(...targets); 
    const executable = command[0];
    const fullCmd = `${executable} ${args.join(' ')}`;

    console.log(`Executing: ${fullCmd}`);
    try {
        const { stdout, stderr } = await execa(executable, args);
        
        console.log('✅ Command completed.');
        return stdout;
    } catch (error) {
        throw new Error(`Command failed with exit code ${error.exitCode}.`, { cause: error });
    }
}

(async()=> {
    const BAKE_FILES = [
        '../bakefiles/base.hcl', 
        '../bakefiles/function.hcl',
        '../bakefiles/targets.hcl'
    ];
    const BASE_COMMAND = ['docker', 'buildx', 'bake'];
    const TARGETS = ['default'];

    try{
        const output = await dockerImages(
          BAKE_FILES,
          BASE_COMMAND,
         TARGETS
    );

    }catch(err){
        console.error(`\n🛑 Fatal Error in Main: ${err.message}`)
    }
    
})();