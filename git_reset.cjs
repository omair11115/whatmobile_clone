const { execSync } = require('child_process');
try {
  console.log('Fetching latest from origin...');
  execSync('git fetch origin main', { stdio: 'inherit' });
  console.log('Resetting to origin/main...');
  execSync('git reset --hard origin/main', { stdio: 'inherit' });
  console.log('Cleaning up untracked files...');
  execSync('git clean -fd', { stdio: 'inherit' });
  console.log('Successfully reset repository.');
} catch (e) {
  console.error('Error during git reset:', e.message);
}
