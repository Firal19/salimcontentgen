// Simple test script to verify the build works
const { execSync } = require('child_process');

console.log('🔧 Testing build configuration...');

try {
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  console.log('🏗️ Building application...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('✅ Build completed successfully!');
  console.log('🚀 Ready for deployment to Netlify');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}