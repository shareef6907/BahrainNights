require('dotenv').config({ path: '.env.local' });

console.log('Checking environment variables for database connection...');
console.log('');

// List all env vars that might contain database connection
Object.keys(process.env).forEach(key => {
  const lowerKey = key.toLowerCase();
  if (lowerKey.includes('db') || lowerKey.includes('postgres') || lowerKey.includes('database') || lowerKey.includes('supabase')) {
    const value = process.env[key];
    if (value && value.length > 50) {
      console.log(key + ':', value.substring(0, 50) + '...');
    } else {
      console.log(key + ':', value || 'NOT SET');
    }
  }
});
