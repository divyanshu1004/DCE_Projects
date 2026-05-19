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

const map = {
  '#0A0A0A': '#F0EDE1',
  '#0a0a0a': '#F0EDE1',
  '#111111': '#E5E3D8',
  '#1A1A1A': '#FFFFFF',
  '#1a1a1a': '#FFFFFF',
  '#FFFFFF': '#1D592C',
  '#ffffff': '#1D592C',
  '#F2F2F2': '#0A0A0A',
  '#f2f2f2': '#0A0A0A',
  '#888888': '#4A4A4A',
  '#2A2A2A': '#D4D0C0',
  '#2a2a2a': '#D4D0C0',
};

const files = walk('src');
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;

  // Use a regex to match all hex codes, to avoid replacing something that was already replaced
  content = content.replace(/#(0A0A0A|0a0a0a|111111|1A1A1A|1a1a1a|FFFFFF|ffffff|F2F2F2|f2f2f2|888888|2A2A2A|2a2a2a)/g, (match) => {
    return map[match] || match;
  });

  // Also replace 'rgba(10,10,10,0.95)' to 'rgba(240, 237, 225, 0.95)'
  content = content.replace(/rgba\(10,10,10,/g, 'rgba(240, 237, 225,');

  if (content !== original) {
    fs.writeFileSync(f, content);
    console.log('Rebranded ' + f);
  }
});
