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

  // Add serif font to large text (fontSize 24 or more)
  content = content.replace(/(fontSize:\s*(2[4-9]|[3-9]\d|\d{3})[^}]*fontWeight:\s*)[789]00/g, "$1 400, fontFamily: 'DM Serif Display'");
  content = content.replace(/(fontWeight:\s*)[789]00([^}]*fontSize:\s*(2[4-9]|[3-9]\d|\d{3}))/g, "$1 400, fontFamily: 'DM Serif Display'$2");
  
  if (content !== original) {
    fs.writeFileSync(f, content);
    console.log('Added Serif headings in ' + f);
  }
});
