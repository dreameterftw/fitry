const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/courses.js');
let content = fs.readFileSync(filePath, 'utf8');

// We will split the file by 'courseData = {' or just iterate through the courses.
// Actually, an easier way is to match each course block and then replace miniProjects inside it.

const courseRegex = /id:\s*"[^"]*",\s*title:\s*"([^"]+)"/g;

let updatedContent = content;

// A helper to determine starter code based on course title
function getStarterCode(courseTitle, projectTitle) {
  const title = courseTitle.toLowerCase();
  if (title.includes('html') || title.includes('css')) {
    return `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>${projectTitle}</title>\n  <style>\n    /* Your CSS here */\n  </style>\n</head>\n<body>\n  <!-- Your HTML here -->\n\n</body>\n</html>`;
  }
  if (title.includes('react') || title.includes('native')) {
    return `import React from 'react';\n\nexport default function App() {\n  return (\n    <div>\n      {/* Start building here */}\n      <h1>${projectTitle}</h1>\n    </div>\n  );\n}`;
  }
  if (title.includes('javascript') || title.includes('node') || title.includes('express')) {
    return `// ${projectTitle}\n\nfunction main() {\n  // Start your code here\n  console.log("Hello, World!");\n}\n\nmain();`;
  }
  if (title.includes('python') || title.includes('django')) {
    return `# ${projectTitle}\n\ndef main():\n    # Start your code here\n    print("Hello, World!")\n\nif __name__ == "__main__":\n    main()`;
  }
  if (title.includes('java ') || title === 'java') {
    return `// ${projectTitle}\n\npublic class Main {\n    public static void main(String[] args) {\n        // Start your code here\n        System.out.println("Hello, World!");\n    }\n}`;
  }
  if (title.includes('go ') || title.includes('golang')) {
    return `// ${projectTitle}\npackage main\n\nimport "fmt"\n\nfunc main() {\n    // Start your code here\n    fmt.Println("Hello, World!")\n}`;
  }
  if (title.includes('sql') || title.includes('database')) {
    return `-- ${projectTitle}\n\n-- Write your SQL queries below\nSELECT * FROM dummy_table;`;
  }
  if (title.includes('cybersecurity')) {
    return `# ${projectTitle}\n\n# Document your process, commands, or scripts below\n`;
  }
  if (title.includes('machine learning') || title.includes('ai')) {
    return `# ${projectTitle}\n\nimport numpy as np\nimport pandas as pd\n\ndef main():\n    # Start your code here\n    pass\n\nif __name__ == "__main__":\n    main()`;
  }
  return `// ${projectTitle}\n\n// Start building your project here...`;
}

// State to track current course
let currentCourseTitle = "Unknown";
let lines = content.split('\n');
let insideMiniProject = false;
let currentProjectTitle = "Mini Project";

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  
  // Update current course title
  const titleMatch = line.match(/title:\s*"([^"]+)"/);
  // Only update if it's a root level title (usually 4 spaces indent)
  if (titleMatch && line.startsWith('    title:')) {
    currentCourseTitle = titleMatch[1];
  }
  
  // Track mini project
  if (line.includes('miniProject: {')) {
    insideMiniProject = true;
  }
  
  if (insideMiniProject) {
    const projTitleMatch = line.match(/title:\s*"([^"]+)"/);
    if (projTitleMatch) {
      currentProjectTitle = projTitleMatch[1];
    }
    
    // Check if we reach the end of miniProject
    if (line.match(/^\s*\},/)) {
      // Reached end of mini project
      insideMiniProject = false;
      // We should insert starterCode right before this line
      // But let's check if it already has starterCode
      let hasStarterCode = false;
      for (let j = i - 5; j < i; j++) {
        if (lines[j] && lines[j].includes('starterCode:')) {
          hasStarterCode = true;
          break;
        }
      }
      
      if (!hasStarterCode) {
        const snippet = getStarterCode(currentCourseTitle, currentProjectTitle);
        // properly escape string
        const escapedSnippet = snippet.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
        // Match indentation of the closing brace plus 2 spaces
        const matchIndent = line.match(/^(\s*)\}/);
        const indent = matchIndent ? matchIndent[1] + '  ' : '          ';
        lines.splice(i, 0, `${indent}starterCode: "${escapedSnippet}",`);
        i++; // skip the inserted line
      }
    }
  }
}

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log('Successfully added starterCode to all miniProjects!');
