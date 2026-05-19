const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.jsx') || file.endsWith('.js')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('src');
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;
  
  // Fix background: '#FFFFFF', color: '#fff'
  content = content.replace(/(background:\s*[^,]*'#FFFFFF'[^}]*color:\s*[^,]*?)'#fff'/gs, "$1'#0A0A0A'");
  content = content.replace(/(background:\s*[^,]*'#FFFFFF'[^}]*color:\s*[^,]*?)'#fff'/gs, "$1'#0A0A0A'");
  
  // Fix color: '#fff', background: '#FFFFFF'
  content = content.replace(/(color:\s*[^,]*?)'#fff'([^}]*background:\s*[^,]*'#FFFFFF')/gs, "$1'#0A0A0A'$2");

  // Fix specific Zap icon
  content = content.replace(/<Zap size=\{18\} color="#fff" fill="#fff" \/>/g, '<Zap size={18} color="#0A0A0A" fill="#0A0A0A" />');
  
  // Fix ShoppingCart count bubble in Navbar (where it's hardcoded inline)
  content = content.replace(/background:\s*'#FFFFFF',\s*color:\s*'#fff'/g, "background: '#FFFFFF', color: '#0A0A0A'");
  
  // Hardcoded Zap on home page
  content = content.replace(/<Zap size=\{12\} color="#FFFFFF" fill="#FFFFFF" \/>/g, '<Zap size={12} color="#0A0A0A" fill="#0A0A0A" />');

  // Hardcoded buttons in Home page where class or style needs dark text
  content = content.replace(/(background:\s*'#FFFFFF',\s*color:\s*)'#fff'/g, "$1'#0A0A0A'");

  // Buy Now in ProductDetail
  content = content.replace(/(color:\s*product\?\.available\s*\?\s*)'#fff'/g, "$1'#0A0A0A'");
  content = content.replace(/(fill=\{product\?\.available\s*\?\s*)'#fff'/g, "$1'#0A0A0A'");

  if (content !== original) {
    fs.writeFileSync(f, content);
    console.log('Fixed contrast in ' + f);
  }
});
