const args = ['run', 'serve'];
const opts = { stdio: 'inherit', cwd: 'client', shell: true };
require('child_process').spawn('npm', args, opts);