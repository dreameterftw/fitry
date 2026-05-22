/*
 * Single source of truth for course content.
 *
 * Structure per course:
 *   - meta: title, domain, color, slogan, docs, jobs
 *   - youtube: 1 main + extras[]
 *   - levels[]: beginner / intermediate / advanced
 *     Each level has: id, label, xpReward, miniProject { title, brief, expectedOutput }
 *     Each level.lessons[]: id, title, estimatedMinutes, xpReward, setup?, content,
 *       mcq { question, options[], correctIndex, explanation },
 *       challenge, starterCode, expectedOutput, hints[]
 *
 * A computed `lessons` array is built per-course (flat across all levels)
 * so that CourseView can keep reading course.lessons[idx] until it is
 * migrated to the levels-aware layout in Phase 2.
 */

const courseData = {
  /* ───────────────────────── 1. HTML & CSS ───────────────────────── */
  1: {
    title: "HTML & CSS Fundamentals",
    domain: "Web Development",
    lang: "HTML/CSS",
    time: "8h",
    difficulty: "Beginner",
    color: "#a8ff6b",
    slogan: "Every website you have ever used started with these two files.",
    docs: { label: "MDN Web Docs", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
    jobs: {
      roles: ["Frontend Developer", "UI Engineer", "Freelance Web Developer"],
      salary: "₹4 – 18 LPA",
    },
    youtube: {
      main: { title: "HTML & CSS — Full Course", channel: "Kevin Powell", url: "https://www.youtube.com/watch?v=G3e-cpL7ofc" },
      extras: [
        { title: "HTML Crash Course For Absolute Beginners", channel: "Traversy Media", url: "https://www.youtube.com/watch?v=UB1O30fR-EE" },
        { title: "CSS Crash Course For Absolute Beginners", channel: "Traversy Media", url: "https://www.youtube.com/watch?v=yfoY53QXEnI" },
      ],
    },

    levels: [
      // ─────────────────────────── BEGINNER ───────────────────────────
      {
        id: "beginner",
        label: "Beginner",
        xpReward: 50,
        miniProject: {
          title: "Personal portfolio page",
          brief: "Build a complete personal portfolio page using only HTML and CSS. It must have: a nav bar with your name and 3 links, a hero section with your name and a short tagline, an about section, a skills list, and a footer with your email. No frameworks, no JavaScript.",
          expectedOutput: "A fully styled, multi-section portfolio page that looks professional and loads in the browser.",
          starterCode: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>My Portfolio</title>\n  <style>\n    /* Add basic reset and styles */\n    body { font-family: sans-serif; margin: 0; }\n    nav, header, section, footer { padding: 20px; }\n  </style>\n</head>\n<body>\n  <nav>\n    <!-- Add 3 links here -->\n  </nav>\n  <header>\n    <h1>Your Name</h1>\n    <p>Your tagline goes here</p>\n  </header>\n  <section id=\"about\">\n    <!-- About me content -->\n  </section>\n  <section id=\"skills\">\n    <!-- List of skills -->\n  </section>\n  <footer>\n    <!-- Email and contact info -->\n  </footer>\n</body>\n</html>"
        },
        lessons: [
          {
            id: "beginner_0",
            title: "What is HTML?",
            estimatedMinutes: 20,
            xpReward: 20,
            setup: {
              windows: [
                "Download VS Code from https://code.visualstudio.com and run the installer.",
                "Accept all defaults during installation.",
                "Create a folder on your Desktop called fitry-html.",
                "Open VS Code → File → Open Folder → select fitry-html.",
                "Create a new file called index.html.",
                "To preview: right-click the file in VS Code → Open with Live Server (install the Live Server extension first from the Extensions tab).",
              ],
              mac: [
                "Download VS Code from https://code.visualstudio.com and drag it to Applications.",
                "Open Terminal and run: mkdir ~/fitry-html && cd ~/fitry-html",
                "Run: code . to open the folder in VS Code.",
                "Create a new file called index.html.",
                "Install the Live Server extension in VS Code, then click Go Live at the bottom right.",
              ],
            },
            content:
              "HTML (HyperText Markup Language) is the skeleton of every web page. It tells the browser what content to display and how to structure it.\n\n" +
              "Every HTML page follows this structure:\n\n" +
              "<!DOCTYPE html>\n<html>\n  <head>\n    <title>Page Title</title>\n  </head>\n  <body>\n    <h1>Hello World</h1>\n    <p>This is a paragraph.</p>\n  </body>\n</html>\n\n" +
              "Key tags to know:\n" +
              "- <h1> to <h6>: headings, largest to smallest\n" +
              "- <p>: paragraph\n" +
              "- <a href='url'>: link\n" +
              "- <img src='url' alt='description'>: image\n" +
              "- <div>: a generic container block\n" +
              "- <span>: a generic inline container",
            mcq: {
              question: "Which tag creates the largest heading in HTML?",
              options: ["<h6>", "<heading>", "<h1>", "<title>"],
              correctIndex: 2,
              explanation: "<h1> is the largest heading. Headings go from <h1> (largest) to <h6> (smallest).",
            },
            challenge: "Build an HTML page that has: a heading with your name, a paragraph describing what you want to build, and a link to your favourite website.",
            starterCode:
              "<!DOCTYPE html>\n<html>\n  <head>\n    <title>About Me</title>\n  </head>\n  <body>\n    <!-- TODO: add an <h1> with your name -->\n\n    <!-- TODO: add a <p> describing what you want to build -->\n\n    <!-- TODO: add an <a href='...'> to your favourite site -->\n  </body>\n</html>",
            expectedOutput: "A page showing your name as a heading, a paragraph below it, and a clickable link.",
            hints: [
              "Use <h1>Your Name</h1> for the heading.",
              "<p>Some text here</p> wraps a paragraph.",
              "<a href='https://example.com'>Click here</a> creates a clickable link.",
            ],
          },
          {
            id: "beginner_1",
            title: "CSS Basics",
            estimatedMinutes: 25,
            xpReward: 20,
            content:
              "CSS (Cascading Style Sheets) controls how HTML looks — colors, fonts, spacing, and layout.\n\n" +
              "The best practice is to link an external CSS file:\n\n" +
              "<link rel='stylesheet' href='styles.css'>\n\n" +
              "Basic CSS syntax:\n\n" +
              "selector {\n  property: value;\n}\n\n" +
              "Examples:\n" +
              "h1 {\n  color: #a8ff6b;\n  font-size: 32px;\n}\n\n" +
              "body {\n  background-color: #080c09;\n  font-family: sans-serif;\n  margin: 0;\n  padding: 0;\n}\n\n" +
              "The three ways to select elements:\n" +
              "- Tag: h1 { } — targets all <h1> tags\n" +
              "- Class: .card { } — targets all elements with class='card'\n" +
              "- ID: #hero { } — targets the element with id='hero'",
            mcq: {
              question: "Which CSS selector targets an element with class='card'?",
              options: ["#card { }", ".card { }", "card { }", "*card { }"],
              correctIndex: 1,
              explanation: "A dot (.) before the name targets a class. A hash (#) targets an ID. No prefix targets a tag.",
            },
            challenge: "Style your page from lesson 1: change the heading color, set a dark background on the body, and change the paragraph font size to 18px.",
            starterCode:
              "/* styles.css */\n\nbody {\n  /* TODO: set background-color */\n}\n\nh1 {\n  /* TODO: set color */\n}\n\np {\n  /* TODO: set font-size to 18px */\n}",
            expectedOutput: "A dark background, a colored heading, and a larger paragraph font size.",
            hints: [
              "background-color: #080c09; goes on the body selector.",
              "color: #a8ff6b; changes text color.",
              "font-size: 18px; sets the size.",
            ],
          },
          {
            id: "beginner_2",
            title: "The Box Model",
            estimatedMinutes: 25,
            xpReward: 20,
            content:
              "Every HTML element is a box. The box model describes the space around content:\n\n" +
              "Content → Padding → Border → Margin\n\n" +
              ".card {\n  padding: 16px;      /* space inside the border */\n  border: 1px solid #ccc;  /* the visible border */\n  margin: 24px;      /* space outside the border */\n  width: 300px;      /* width of the content area */\n}\n\n" +
              "Important: by default, width does not include padding or border. Fix this for the whole page:\n\n" +
              "* {\n  box-sizing: border-box;\n}\n\n" +
              "Now width: 300px means the whole box including padding and border is 300px.",
            mcq: {
              question: "What does padding do in the CSS box model?",
              options: [
                "Adds space outside the border",
                "Adds space between the content and the border",
                "Sets the width of the border",
                "Controls the element's position",
              ],
              correctIndex: 1,
              explanation: "Padding is the space between the content and the border. Margin is the space outside the border.",
            },
            challenge: "Create a styled card element with padding, a border, and a margin. Add box-sizing: border-box to the * selector.",
            starterCode:
              "/* styles.css */\n* {\n  /* TODO: add box-sizing */\n}\n\n.card {\n  /* TODO: add padding, border, margin, and a width */\n}\n\n<!-- index.html body -->\n<div class='card'>\n  <h2>My Card</h2>\n  <p>This is a card component.</p>\n</div>",
            expectedOutput: "A visible card box with spacing inside and outside, with a border around it.",
            hints: [
              "box-sizing: border-box; on * makes sizing predictable.",
              "padding: 20px; adds 20px of space inside on all sides.",
              "border: 1px solid #ccc; adds a thin grey border.",
              "margin: 24px auto; centers the card horizontally.",
            ],
          },
          {
            id: "beginner_3",
            title: "Flexbox Layout",
            estimatedMinutes: 30,
            xpReward: 20,
            content:
              "Flexbox is the modern way to lay elements in a row or column.\n\n" +
              "Turn any element into a flex container:\n\n" +
              ".container {\n  display: flex;\n  gap: 16px;                    /* space between children */\n  justify-content: space-between; /* horizontal alignment */\n  align-items: center;           /* vertical alignment */\n}\n\n" +
              "justify-content values:\n" +
              "- flex-start: pack to the left\n" +
              "- flex-end: pack to the right\n" +
              "- center: center all items\n" +
              "- space-between: first and last at edges, rest evenly spaced\n\n" +
              "align-items values:\n" +
              "- flex-start: top\n" +
              "- center: vertically centered\n" +
              "- flex-end: bottom\n" +
              "- stretch: fill the height",
            mcq: {
              question: "Which property controls horizontal alignment of flex children?",
              options: ["align-items", "flex-direction", "justify-content", "flex-wrap"],
              correctIndex: 2,
              explanation: "justify-content controls the main axis (horizontal in a row). align-items controls the cross axis (vertical in a row).",
            },
            challenge: "Build a navbar with a logo on the left and three navigation links on the right, using flexbox.",
            starterCode:
              "<nav class='navbar'>\n  <div class='logo'>Fitry</div>\n  <div class='links'>\n    <a href='#'>Home</a>\n    <a href='#'>Courses</a>\n    <a href='#'>Profile</a>\n  </div>\n</nav>\n\n<style>\n.navbar {\n  /* TODO: make this a flex row, space items apart */\n  padding: 16px 24px;\n  background: #080c09;\n}\n.links {\n  /* TODO: make links sit in a row with gap */\n}\n.links a {\n  color: #a8ff6b;\n  text-decoration: none;\n}\n</style>",
            expectedOutput: "A horizontal navbar with logo pinned to the left and three links grouped on the right.",
            hints: [
              "display: flex on .navbar lays its children in a row.",
              "justify-content: space-between pushes children to opposite edges.",
              "display: flex and gap: 24px on .links spaces the links out.",
            ],
          },
          {
            id: "beginner_4",
            title: "Semantic HTML",
            estimatedMinutes: 20,
            xpReward: 20,
            content:
              "Semantic HTML means using the right tag for the right content — not just <div> for everything.\n\n" +
              "Why it matters:\n" +
              "- Screen readers use semantic tags to help visually impaired users navigate\n" +
              "- Search engines rank semantic pages better\n" +
              "- Your code is easier for other developers to read\n\n" +
              "Key semantic tags:\n" +
              "<header>  — top of page or section\n" +
              "<nav>     — navigation links\n" +
              "<main>    — main page content (only one per page)\n" +
              "<section> — a thematic grouping of content\n" +
              "<article> — self-contained content (blog post, card)\n" +
              "<aside>   — sidebar or supplementary content\n" +
              "<footer>  — bottom of page or section\n\n" +
              "Bad: <div id='header'><div class='nav'>...</div></div>\n" +
              "Good: <header><nav>...</nav></header>",
            mcq: {
              question: "Which semantic tag should wrap the main navigation links of a page?",
              options: ["<div>", "<section>", "<nav>", "<aside>"],
              correctIndex: 2,
              explanation: "<nav> is specifically for navigation link groups. It signals to screen readers and search engines that these are navigation links.",
            },
            challenge: "Rewrite a div-heavy page structure using proper semantic HTML tags.",
            starterCode:
              "<!-- Rewrite this using semantic tags -->\n<div id='header'>\n  <div class='nav'>\n    <a href='#'>Home</a>\n    <a href='#'>About</a>\n  </div>\n</div>\n\n<div id='main'>\n  <div class='post'>\n    <h2>My First Post</h2>\n    <p>This is a blog post.</p>\n  </div>\n  <div class='sidebar'>\n    <p>About the author</p>\n  </div>\n</div>\n\n<div id='footer'>\n  <p>© 2026 Fitry</p>\n</div>",
            expectedOutput: "The same content structure rewritten with header, nav, main, article, aside, and footer tags.",
            hints: [
              "Replace div#header with <header>.",
              "Replace div.nav with <nav> inside the header.",
              "Replace div.post with <article> — it is self-contained content.",
              "Replace div.sidebar with <aside>.",
              "Replace div#footer with <footer>.",
            ],
          },
        ],
      },

      // ─────────────────────────── INTERMEDIATE ───────────────────────────
      {
        id: "intermediate",
        label: "Intermediate",
        xpReward: 75,
        miniProject: {
          title: "Responsive landing page",
          brief: "Build a fully responsive landing page for a fictional product. Must include: a sticky nav, a hero section, a 3-column features grid that collapses to 1 column on mobile, a testimonials section, and a footer. Use CSS custom properties for your color palette.",
          expectedOutput: "A polished, responsive landing page that looks good on both mobile and desktop.",
          starterCode: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Product Landing Page</title>\n  <style>\n    :root {\n      --primary-color: #3498db;\n      --bg-color: #f9f9f9;\n    }\n    /* Build a sticky nav and hero section */\n    .features-grid {\n      display: grid;\n      grid-template-columns: repeat(3, 1fr);\n      gap: 16px;\n    }\n    @media (max-width: 768px) {\n      .features-grid {\n        grid-template-columns: 1fr;\n      }\n    }\n  </style>\n</head>\n<body>\n  <!-- Build your layout here -->\n  <div class=\"features-grid\">\n    <div class=\"feature\">Feature 1</div>\n    <div class=\"feature\">Feature 2</div>\n    <div class=\"feature\">Feature 3</div>\n  </div>\n</body>\n</html>"
        },
        lessons: [
          {
            id: "intermediate_0",
            title: "Responsive design & media queries",
            estimatedMinutes: 30,
            xpReward: 20,
            content:
              "Responsive design means your page looks good on all screen sizes — phone, tablet, desktop.\n\n" +
              "Media queries let you apply CSS only when certain conditions are true:\n\n" +
              "@media (max-width: 768px) {\n  .grid {\n    grid-template-columns: 1fr; /* one column on mobile */\n  }\n}\n\n" +
              "Mobile-first approach — write styles for mobile by default, then override for larger screens:\n\n" +
              ".grid {\n  display: grid;\n  grid-template-columns: 1fr; /* mobile: 1 column */\n}\n\n" +
              "@media (min-width: 768px) {\n  .grid {\n    grid-template-columns: 1fr 1fr 1fr; /* desktop: 3 columns */\n  }\n}\n\n" +
              "Common breakpoints:\n" +
              "- Mobile: up to 480px\n" +
              "- Tablet: 481px – 768px\n" +
              "- Desktop: 769px and above",
            mcq: {
              question: "Which approach writes mobile styles first and overrides for larger screens?",
              options: ["Desktop-first", "Fluid-first", "Mobile-first", "Breakpoint-first"],
              correctIndex: 2,
              explanation: "Mobile-first means you write base styles for small screens, then use min-width media queries to enhance for larger screens. It is the recommended modern approach.",
            },
            challenge: "Take a 3-column card grid and make it collapse to a single column on screens narrower than 600px.",
            starterCode:
              "<div class='grid'>\n  <div class='card'>Card 1</div>\n  <div class='card'>Card 2</div>\n  <div class='card'>Card 3</div>\n</div>\n\n<style>\n.grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 16px;\n  padding: 24px;\n}\n.card {\n  background: #1a2a1a;\n  border: 1px solid #a8ff6b33;\n  border-radius: 8px;\n  padding: 20px;\n  color: #e8f4e8;\n}\n/* TODO: add a media query that collapses to 1 column below 600px */\n</style>",
            expectedOutput: "Three cards side by side on desktop, stacked vertically on narrow screens.",
            hints: [
              "@media (max-width: 600px) { } wraps your mobile override.",
              "Inside the query, set grid-template-columns: 1fr on .grid.",
              "Resize the browser window to test.",
            ],
          },
          {
            id: "intermediate_1",
            title: "CSS custom properties",
            estimatedMinutes: 25,
            xpReward: 20,
            content:
              "CSS custom properties (variables) let you define values once and reuse them everywhere. When you change the variable, every element using it updates automatically.\n\n" +
              "Define variables on :root so they are global:\n\n" +
              ":root {\n  --color-primary: #a8ff6b;\n  --color-bg: #080c09;\n  --color-text: #e8f4e8;\n  --spacing-md: 16px;\n  --radius: 8px;\n}\n\n" +
              "Use them with var():\n\n" +
              ".button {\n  background: var(--color-primary);\n  padding: var(--spacing-md);\n  border-radius: var(--radius);\n}\n\n" +
              "You can override variables inside a specific selector too:\n\n" +
              ".dark-section {\n  --color-text: #080c09;\n}",
            mcq: {
              question: "Where should you define CSS custom properties to make them available globally?",
              options: ["body { }", "html { }", ":root { }", "* { }"],
              correctIndex: 2,
              explanation: ":root refers to the top-level element of the document and has the highest specificity among element selectors, making variables defined there globally available.",
            },
            challenge: "Refactor an existing stylesheet to use CSS custom properties for all colors, spacing values, and border radii.",
            starterCode:
              "/* Before — hardcoded values everywhere */\n.navbar { background: #080c09; padding: 16px 24px; }\n.button { background: #a8ff6b; color: #080c09; padding: 12px 24px; border-radius: 8px; }\n.card { background: #111d11; border: 1px solid #a8ff6b33; border-radius: 8px; padding: 24px; color: #e8f4e8; }\n\n/* TODO: add :root with custom properties */\n/* TODO: rewrite .navbar, .button, and .card to use var() */",
            expectedOutput: "The same visual result but using --color-bg, --color-primary, --spacing-md, --radius variables throughout.",
            hints: [
              "Define :root { --color-bg: #080c09; } at the top.",
              "Replace #080c09 with var(--color-bg) wherever it appears.",
              "Create --spacing-md: 16px and use it for padding values.",
            ],
          },
          {
            id: "intermediate_2",
            title: "CSS Grid",
            estimatedMinutes: 35,
            xpReward: 20,
            content:
              "CSS Grid is for two-dimensional layouts — rows and columns at the same time. Use it when you need to control both axes.\n\n" +
              ".layout {\n  display: grid;\n  grid-template-columns: 250px 1fr;  /* sidebar + main */\n  grid-template-rows: auto 1fr auto; /* header + content + footer */\n  gap: 24px;\n  min-height: 100vh;\n}\n\n" +
              "Spanning multiple columns or rows:\n\n" +
              ".header {\n  grid-column: 1 / -1; /* span all columns */\n}\n\n" +
              "The fr unit means 'fraction of available space':\n" +
              "grid-template-columns: 1fr 2fr 1fr;\n" +
              "/* col 1: 25%, col 2: 50%, col 3: 25% */\n\n" +
              "repeat() shorthand:\n" +
              "grid-template-columns: repeat(3, 1fr); /* 3 equal columns */",
            mcq: {
              question: "What does grid-column: 1 / -1 do?",
              options: [
                "Places the element in the first column only",
                "Makes the element span from the first to the last column line",
                "Sets the column gap to 1px",
                "Removes the element from the grid",
              ],
              correctIndex: 1,
              explanation: "1 / -1 means start at line 1 and end at the last line (-1), making the element span all columns.",
            },
            challenge: "Build a classic page layout with a full-width header, a sidebar on the left, main content on the right, and a full-width footer — all using CSS Grid.",
            starterCode:
              "<div class='layout'>\n  <header class='header'>Header</header>\n  <aside class='sidebar'>Sidebar</aside>\n  <main class='content'>Main Content</main>\n  <footer class='footer'>Footer</footer>\n</div>\n\n<style>\n.layout {\n  /* TODO: set up grid with 2 columns and 3 rows */\n}\n.header {\n  /* TODO: span all columns */\n}\n.footer {\n  /* TODO: span all columns */\n}\n/* Add background colors to see the layout */\n</style>",
            expectedOutput: "A clear two-column layout with a full-width header and footer.",
            hints: [
              "grid-template-columns: 200px 1fr creates a fixed sidebar and flexible main.",
              "grid-template-rows: auto 1fr auto makes the middle row fill the space.",
              "grid-column: 1 / -1 on header and footer spans all columns.",
            ],
          },
          {
            id: "intermediate_3",
            title: "Transitions & animations",
            estimatedMinutes: 30,
            xpReward: 20,
            content:
              "CSS transitions make property changes smooth instead of instant.\n\n" +
              ".button {\n  background: #a8ff6b;\n  transition: background 0.2s ease, transform 0.1s ease;\n}\n\n" +
              ".button:hover {\n  background: #80cc50;\n  transform: translateY(-2px);\n}\n\n" +
              "CSS animations use @keyframes for more complex motion:\n\n" +
              "@keyframes fadeIn {\n  from { opacity: 0; transform: translateY(20px); }\n  to   { opacity: 1; transform: translateY(0); }\n}\n\n" +
              ".hero {\n  animation: fadeIn 0.5s ease forwards;\n}\n\n" +
              "animation shorthand: name duration timing fill-mode\n" +
              "animation: fadeIn 0.5s ease forwards;",
            mcq: {
              question: "Which property makes CSS property changes animate smoothly on hover?",
              options: ["animation", "transform", "transition", "keyframes"],
              correctIndex: 2,
              explanation: "transition smoothly animates from one property value to another. animation with @keyframes is for more complex multi-step animations.",
            },
            challenge: "Add a hover effect to a button (lift + color change) and a fade-in animation to a hero section.",
            starterCode:
              "<section class='hero'>\n  <h1>Welcome to Fitry</h1>\n  <button class='btn'>Get Started</button>\n</section>\n\n<style>\n.hero {\n  padding: 80px 24px;\n  text-align: center;\n  /* TODO: add fadeIn animation */\n}\n.btn {\n  background: #a8ff6b;\n  color: #080c09;\n  border: none;\n  padding: 12px 28px;\n  border-radius: 8px;\n  font-size: 16px;\n  cursor: pointer;\n  /* TODO: add transition */\n}\n.btn:hover {\n  /* TODO: lift and darken */\n}\n/* TODO: define @keyframes fadeIn */\n</style>",
            expectedOutput: "The hero section fades in on load. The button lifts and changes color on hover.",
            hints: [
              "Define @keyframes fadeIn with from { opacity: 0; transform: translateY(20px); }",
              "animation: fadeIn 0.6s ease forwards; applies it.",
              "transition: all 0.2s ease; on the button covers all properties.",
              "transform: translateY(-3px); on hover creates the lift.",
            ],
          },
          {
            id: "intermediate_4",
            title: "Accessibility basics",
            estimatedMinutes: 25,
            xpReward: 20,
            content:
              "Accessibility (a11y) means making your website usable by everyone, including people using screen readers, keyboard navigation, or who have visual impairments.\n\n" +
              "Key practices:\n\n" +
              "1. Always use alt text on images:\n" +
              "<img src='photo.jpg' alt='A developer writing code'>\n\n" +
              "2. Use semantic HTML (you already know this)\n\n" +
              "3. Ensure sufficient color contrast — text to background ratio should be at least 4.5:1\n\n" +
              "4. Make sure focus states are visible:\n" +
              ".button:focus {\n  outline: 2px solid #a8ff6b;\n  outline-offset: 2px;\n}\n\n" +
              "5. Use aria-label on icon-only buttons:\n" +
              "<button aria-label='Close menu'><svg>...</svg></button>\n\n" +
              "6. Use role and aria attributes when HTML alone is not enough:\n" +
              "<div role='alert'>Form submitted successfully</div>",
            mcq: {
              question: "What is the minimum color contrast ratio for normal body text to be accessible?",
              options: ["2:1", "3:1", "4.5:1", "7:1"],
              correctIndex: 2,
              explanation: "WCAG AA standard requires a 4.5:1 contrast ratio for normal text. Large text (18px+ or bold 14px+) only requires 3:1.",
            },
            challenge: "Fix an inaccessible webpage by adding alt text, visible focus states, aria-labels, and improving a low-contrast color.",
            starterCode:
              "<nav>\n  <button>☰</button>  <!-- icon only, no label -->\n</nav>\n\n<img src='hero.jpg'>  <!-- missing alt -->\n\n<p style='color: #aaa; background: #999;'>Low contrast text</p>\n\n<a href='/about'>About us</a>  <!-- loses focus outline due to: -->\n<style>\n  a:focus { outline: none; }  /* BAD — removes focus indicator */\n  /* TODO: fix all accessibility issues above */\n</style>",
            expectedOutput: "All elements are accessible: icon button has aria-label, image has alt text, text has sufficient contrast, and focus states are visible.",
            hints: [
              "Add aria-label='Open menu' to the hamburger button.",
              "Add alt='Hero image of a developer' to the img tag.",
              "Change text to #e8f4e8 on a dark background for sufficient contrast.",
              "Replace outline: none with outline: 2px solid #a8ff6b; outline-offset: 2px;",
            ],
          },
        ],
      },

      // ─────────────────────────── ADVANCED ───────────────────────────
      {
        id: "advanced",
        label: "Advanced",
        xpReward: 100,
        miniProject: {
          title: "Multi-page website with a design system",
          brief: "Build a 3-page website (Home, About, Contact) that shares a consistent design system. The design system must include: CSS custom properties for all tokens, reusable component classes (button variants, card variants, badge), a typography scale, and a consistent spacing system. The site must be fully responsive and accessible.",
          expectedOutput: "Three linked pages that feel visually consistent, with a documented design system in a separate tokens.css file.",
          starterCode: "/* tokens.css - Define your design system here */\n:root {\n  --color-primary: #2ecc71;\n  --color-secondary: #27ae60;\n  --font-main: 'Helvetica Neue', sans-serif;\n  --spacing-sm: 8px;\n  --spacing-md: 16px;\n  --spacing-lg: 32px;\n}\n\n/* Reusable components */\n.btn {\n  padding: var(--spacing-sm) var(--spacing-md);\n  background-color: var(--color-primary);\n  border: none;\n  border-radius: 4px;\n}\n\n/* \n  Remember to link this tokens.css file in your 3 HTML pages \n  (Home, About, Contact) using <link rel=\"stylesheet\" href=\"tokens.css\">\n*/"
        },
        lessons: [
          {
            id: "advanced_0",
            title: "CSS architecture — BEM",
            estimatedMinutes: 30,
            xpReward: 20,
            content:
              "BEM (Block Element Modifier) is a CSS naming convention that keeps styles predictable and avoids conflicts at scale.\n\n" +
              "Block: a standalone component — .card\n" +
              "Element: a part of the block — .card__title, .card__body\n" +
              "Modifier: a variant of the block or element — .card--featured, .card__title--large\n\n" +
              "Example:\n\n" +
              "<div class='card card--featured'>\n  <h2 class='card__title'>Title</h2>\n  <p class='card__body'>Body text</p>\n  <a class='card__link'>Read more</a>\n</div>\n\n" +
              ".card { border: 1px solid #ccc; padding: 24px; border-radius: 8px; }\n" +
              ".card--featured { border-color: #a8ff6b; background: #0d1a0d; }\n" +
              ".card__title { font-size: 20px; font-weight: 600; margin-bottom: 8px; }\n" +
              ".card__body { color: #8aaa8a; line-height: 1.6; }",
            mcq: {
              question: "In BEM, how would you name a 'disabled' variant of a button block?",
              options: [".button.disabled", ".button-disabled", ".button--disabled", ".button__disabled"],
              correctIndex: 2,
              explanation: "Double hyphens (--) denote a modifier in BEM. Double underscores (__) denote an element. A disabled state is a modifier since it changes the block's appearance.",
            },
            challenge: "Refactor a messy CSS file for a card component into clean BEM naming.",
            starterCode:
              "<!-- Messy HTML -->\n<div class='card special'>\n  <h2 class='card-title big'>Featured Post</h2>\n  <p class='card-text'>Some description here.</p>\n  <button class='card-btn primary'>Read More</button>\n</div>\n\n/* TODO: rewrite using BEM — .card, .card--special,\n   .card__title, .card__title--large,\n   .card__body, .card__action, .card__action--primary */",
            expectedOutput: "The same card styled with proper BEM class names and no conflicting selectors.",
            hints: [
              "The block is .card — the wrapper.",
              "Elements inside use .card__title, .card__body, .card__action.",
              "The 'special' and 'primary' variants become modifiers: .card--special, .card__action--primary.",
            ],
          },
          {
            id: "advanced_1",
            title: "Performance — critical CSS & loading",
            estimatedMinutes: 35,
            xpReward: 20,
            content:
              "Page performance affects user experience and SEO. Here are the key techniques:\n\n" +
              "1. Critical CSS — inline the styles needed for above-the-fold content in <head>, load the rest asynchronously:\n\n" +
              "<style>/* critical styles here */</style>\n" +
              "<link rel='preload' href='styles.css' as='style' onload=\"this.rel='stylesheet'\">\n\n" +
              "2. Avoid render-blocking resources — put <script> tags at the bottom of <body> or use defer:\n\n" +
              "<script src='app.js' defer></script>\n\n" +
              "3. Optimise images:\n" +
              "- Use modern formats: WebP instead of PNG/JPEG\n" +
              "- Always set width and height attributes to prevent layout shift\n" +
              "- Lazy-load below-the-fold images: <img loading='lazy'>\n\n" +
              "4. Use system fonts to avoid flash of unstyled text:\n" +
              "font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;",
            mcq: {
              question: "Which attribute makes a script load without blocking HTML parsing?",
              options: ["async only", "defer only", "Both async and defer, but differently", "preload"],
              correctIndex: 2,
              explanation: "Both async and defer prevent blocking, but differ: defer executes after parsing in order, async executes as soon as downloaded in any order. Use defer for scripts that depend on the DOM.",
            },
            challenge: "Optimise a slow HTML page by inlining critical CSS, deferring scripts, lazy-loading images, and adding proper image dimensions.",
            starterCode:
              "<!DOCTYPE html>\n<html>\n<head>\n  <!-- BAD: render-blocking stylesheet -->\n  <link rel='stylesheet' href='styles.css'>\n  <!-- BAD: render-blocking script -->\n  <script src='app.js'></script>\n</head>\n<body>\n  <h1>Welcome</h1>\n  <!-- BAD: no dimensions, no lazy loading -->\n  <img src='hero.jpg' alt='Hero'>\n  <img src='below-fold.jpg' alt='Below fold image'>\n</body>\n</html>\n\n<!-- TODO: fix all performance issues above -->",
            expectedOutput: "Critical styles inlined, script deferred, images have dimensions, below-fold image is lazy-loaded.",
            hints: [
              "Move critical h1 styles into a <style> tag in <head>.",
              "Add defer to the <script> tag.",
              "Add width='1200' height='600' to the hero image.",
              "Add loading='lazy' to the below-fold image.",
            ],
          },
          {
            id: "advanced_2",
            title: "CSS-in-JS vs vanilla CSS",
            estimatedMinutes: 30,
            xpReward: 20,
            content:
              "As projects grow, teams debate how to manage CSS. Here are the main approaches:\n\n" +
              "Vanilla CSS / CSS Modules:\n" +
              "- Styles in .css files, imported into components\n" +
              "- CSS Modules auto-scope class names to avoid collisions\n" +
              "- Best for: performance-critical apps, static sites\n\n" +
              "CSS-in-JS (styled-components, Emotion):\n" +
              "- Styles written in JS template literals\n" +
              "- Automatic scoping, dynamic styles based on props\n" +
              "- Runtime cost — styles generated in the browser\n" +
              "- Best for: component libraries, design systems\n\n" +
              "Utility-first (Tailwind CSS):\n" +
              "- Predefined utility classes applied directly in HTML\n" +
              "- No custom CSS files, very fast to build\n" +
              "- Best for: product teams that want speed\n\n" +
              "Fitry uses vanilla CSS with custom properties — the most transferable skill.",
            mcq: {
              question: "What is the main drawback of CSS-in-JS libraries at runtime?",
              options: [
                "They cannot use media queries",
                "They generate styles in the browser, adding runtime overhead",
                "They do not support dark mode",
                "They require a build step",
              ],
              correctIndex: 1,
              explanation: "CSS-in-JS generates and injects styles at runtime in JavaScript, which adds CPU and memory overhead compared to static CSS files parsed natively by the browser.",
            },
            challenge: "Convert a styled-components snippet to an equivalent vanilla CSS + CSS Modules approach.",
            starterCode:
              "// styled-components version:\nimport styled from 'styled-components';\n\nconst Button = styled.button`\n  background: ${props => props.primary ? '#a8ff6b' : 'transparent'};\n  color: ${props => props.primary ? '#080c09' : '#a8ff6b'};\n  border: 1px solid #a8ff6b;\n  padding: 10px 20px;\n  border-radius: 6px;\n  cursor: pointer;\n`;\n\n// TODO: rewrite this as:\n// 1. A Button.module.css file with .btn and .btn--primary classes\n// 2. A Button component that imports the CSS module",
            expectedOutput: "A Button.module.css file and a Button.jsx that applies classes conditionally based on a primary prop.",
            hints: [
              "Create .btn { } for base styles and .btn--primary { } for the primary variant.",
              "import styles from './Button.module.css' in the component.",
              "Apply className={`${styles.btn} ${primary ? styles['btn--primary'] : ''}`}",
            ],
          },
          {
            id: "advanced_3",
            title: "Component design systems",
            estimatedMinutes: 40,
            xpReward: 20,
            content:
              "A design system is a set of reusable components and tokens that keep a product visually consistent.\n\n" +
              "Tokens: the raw values — colors, spacing, typography, radii.\n" +
              "Components: reusable UI built with those tokens — Button, Card, Badge, Input.\n\n" +
              "A tokens file:\n\n" +
              "/* tokens.css */\n:root {\n  --color-primary: #a8ff6b;\n  --color-bg: #080c09;\n  --color-surface: #111d11;\n  --color-text: #e8f4e8;\n  --color-text-muted: #6b8a6b;\n  --radius-sm: 4px;\n  --radius-md: 8px;\n  --radius-lg: 12px;\n  --space-xs: 4px;\n  --space-sm: 8px;\n  --space-md: 16px;\n  --space-lg: 24px;\n  --space-xl: 40px;\n  --font-size-sm: 12px;\n  --font-size-md: 14px;\n  --font-size-lg: 18px;\n  --font-size-xl: 32px;\n}\n\n" +
              "Components import tokens.css and use var() — never hardcoded values.",
            mcq: {
              question: "What is the purpose of design tokens in a design system?",
              options: [
                "To authenticate users in the app",
                "To store raw values like colors and spacing that components reference",
                "To generate random UI variations",
                "To replace CSS with JavaScript",
              ],
              correctIndex: 1,
              explanation: "Design tokens are named values (colors, spacing, typography) that are the single source of truth. Changing a token updates every component that uses it.",
            },
            challenge: "Build a mini design system with a tokens.css file and three components — Button (2 variants), Badge (3 variants), and Card — all using only token variables.",
            starterCode:
              "/* tokens.css — TODO: define at least 8 tokens */\n:root {\n}\n\n/* components.css — TODO: build Button, Badge, Card using only var() */\n.btn { }\n.btn--primary { }\n.btn--ghost { }\n\n.badge { }\n.badge--success { }\n.badge--warning { }\n.badge--danger { }\n\n.card { }\n\n<!-- index.html — show all components -->\n<button class='btn btn--primary'>Primary</button>\n<button class='btn btn--ghost'>Ghost</button>\n<span class='badge badge--success'>Passed</span>\n<span class='badge badge--warning'>Pending</span>\n<span class='badge badge--danger'>Failed</span>\n<div class='card'><h3>Card Title</h3><p>Card body.</p></div>",
            expectedOutput: "All components rendered correctly using only custom property variables — no hardcoded color or spacing values anywhere.",
            hints: [
              "Define --color-success, --color-warning, --color-danger in tokens.css.",
              "Each .badge variant only changes background and color using token vars.",
              "The .card uses --color-surface, --radius-lg, --space-lg, --color-text.",
            ],
          },
          {
            id: "advanced_4",
            title: "Cross-browser compatibility & debugging",
            estimatedMinutes: 30,
            xpReward: 20,
            content:
              "Not all browsers support every CSS feature at the same time. Here is how to handle it professionally.\n\n" +
              "1. Check support on caniuse.com before using new features.\n\n" +
              "2. Use @supports to apply CSS only when supported:\n\n" +
              "@supports (display: grid) {\n  .layout { display: grid; }\n}\n\n" +
              "3. Provide fallbacks for older browsers:\n\n" +
              ".container {\n  display: flex;  /* fallback */\n  display: grid;  /* modern browsers use this */\n}\n\n" +
              "4. Use autoprefixer in your build tool to auto-add vendor prefixes.\n\n" +
              "5. Debugging tools:\n" +
              "- Chrome DevTools → Elements panel → Computed tab shows what CSS is actually applied\n" +
              "- Firefox DevTools has a Grid inspector and Flexbox inspector\n" +
              "- Force element states in DevTools: right-click element → Force State → :hover",
            mcq: {
              question: "What does the @supports rule do in CSS?",
              options: [
                "Checks if an external stylesheet loaded correctly",
                "Applies styles only when the browser supports a specific CSS feature",
                "Adds vendor prefixes automatically",
                "Validates CSS syntax before rendering",
              ],
              correctIndex: 1,
              explanation: "@supports is a feature query — it applies the enclosed CSS only when the browser supports the tested property and value.",
            },
            challenge: "Write CSS that uses CSS Grid with a flexbox fallback, and use @supports to apply a modern gap property only when supported.",
            starterCode:
              ".layout {\n  /* TODO: add flexbox as fallback */\n}\n\n/* TODO: use @supports to apply grid only when available */\n\n/* TODO: use @supports to apply gap only when gap is supported in flex */",
            expectedOutput: "Flexbox layout in unsupporting browsers, CSS Grid in modern ones, with a gap fallback using margin.",
            hints: [
              "Start with display: flex and flex-wrap: wrap as the base.",
              "@supports (display: grid) { .layout { display: grid; } }",
              "@supports (gap: 1px) { .layout { gap: 24px; } } — otherwise use margin on children.",
            ],
          },
        ],
      },
    ],
  },

  /* ───────────────────────── 2. JavaScript ───────────────────────── */
  2: {
    title: "JavaScript Fundamentals",
    domain: "Web Development",
    lang: "JavaScript",
    time: "10h",
    difficulty: "Beginner",
    color: "#f7df1e",
    slogan: "JavaScript is what makes the web actually do things.",
    docs: { label: "MDN JavaScript Docs", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    jobs: {
      roles: ["Frontend Developer", "Full-Stack Developer", "JavaScript Engineer"],
      salary: "₹5 – 22 LPA",
    },
    youtube: {
      main: { title: "JavaScript Full Course for Beginners", channel: "freeCodeCamp", url: "https://www.youtube.com/watch?v=PkZNo7MFNFg" },
      extras: [
        { title: "JavaScript Crash Course For Beginners", channel: "Traversy Media", url: "https://www.youtube.com/watch?v=hdI2bqOjy3c" },
        { title: "JavaScript DOM Manipulation – Full Course", channel: "freeCodeCamp", url: "https://www.youtube.com/watch?v=5fb2aPlgoys" },
      ],
    },

    levels: [
      // ─────────────────────────── BEGINNER ───────────────────────────
      {
        id: "beginner",
        label: "Beginner",
        xpReward: 50,
        miniProject: {
          title: "Build a CLI quiz game",
          brief: "Create a terminal-based quiz game that asks 5 questions, tracks the score, and prints a result at the end.",
          expectedOutput: "A working quiz in the terminal that scores correctly.",
          starterCode: "const readline = require('readline');\nconst rl = readline.createInterface({\n  input: process.stdin,\n  output: process.stdout\n});\n\nconst questions = [\n  { q: \"What is 2 + 2?\", a: \"4\" },\n  // add 4 more questions\n];\n\nlet score = 0;\nlet currentQ = 0;\n\nfunction askQuestion() {\n  if (currentQ >= questions.length) {\n    console.log(`Game Over! Score: ${score}/${questions.length}`);\n    rl.close();\n    return;\n  }\n  \n  rl.question(questions[currentQ].q + \" \", (answer) => {\n    // Check answer, update score, increment currentQ, call askQuestion()\n    \n  });\n}\n\naskQuestion();"
        },
        lessons: [
          {
            id: "js_beginner_0",
            title: "Hello JavaScript",
            estimatedMinutes: 20,
            xpReward: 20,
            setup: {
              windows: [
                "Open your fitry-html folder in VS Code.",
                "Create a new file called app.js.",
                "In index.html, add <script src='app.js'></script> before the closing </body> tag.",
                "In app.js, type: console.log('Hello from JS!');",
                "Open index.html with Live Server and check the Console in DevTools (F12).",
              ],
              mac: [
                "Open your fitry-html folder in VS Code.",
                "Create a new file called app.js.",
                "In index.html, add <script src='app.js'></script> before the closing </body> tag.",
                "In app.js, type: console.log('Hello from JS!');",
                "Open index.html with Live Server and check the Console in DevTools (Cmd+Option+I).",
              ],
            },
            content: `JavaScript was created in just 10 days by Brendan Eich in 1995. Originally intended to make static web pages interactive, it has grown into one of the most powerful and widely used languages in the world. JavaScript runs directly in your browser without needing compilation, thanks to highly optimized engines like Google's V8. In modern web development, JavaScript is the engine that drives dynamic content, user interactions, and complex web applications. It allows developers to manipulate the Document Object Model (DOM), handle user events, and communicate with web servers asynchronously. Understanding its roots and capabilities is the first step to mastering web development.`,
            mcq: {
              question: "Which keyword should you use for a variable that will never be reassigned?",
              options: ["let", "var", "const", "fixed"],
              correctIndex: 2,
              explanation: "const (short for constant) prevents the variable from being reassigned after its initial value is set.",
            },
            challenge: "Create three variables: one for your name, one for your age, and one for whether you like coding. Log them all to the console.",
            starterCode:
              "// TODO: create a const for your name\n\n// TODO: create a let for your age\n\n// TODO: create a boolean for liking coding\n\n// TODO: log all three using console.log()",
            expectedOutput: "Your name, age, and true/false printed in the browser console.",
            hints: [
              "const myName = 'Your Name';",
              "let myAge = 25;",
              "console.log(myName, myAge, likesCoding);",
            ],
          },
          {
            id: "js_beginner_1",
            title: "Data Types & Operators",
            estimatedMinutes: 25,
            xpReward: 20,
            content: `JavaScript is a dynamically typed language, meaning you don't have to explicitly declare variable types. It has several primitive data types: String (text), Number (integers and floats), Boolean (true/false), Undefined (declared but unassigned variables), Null (intentional absence of value), Symbol, and BigInt. Operators allow us to manipulate these types. Arithmetic operators (+, -, *, /) perform math, while comparison operators (==, ===, !=, !==) compare values. It is highly recommended to always use strict equality (===) as it checks for both value and type, preventing unexpected type coercion bugs that occur with loose equality (==). Understanding data types is crucial for preventing runtime errors and ensuring data integrity.`,
            mcq: {
              question: "What is the result of 10 % 3 in JavaScript?",
              options: ["3.33", "3", "1", "0"],
              correctIndex: 2,
              explanation: "% is the modulo operator, which returns the remainder of a division. 10 divided by 3 is 3 with a remainder of 1.",
            },
            challenge: "Calculate the area of a rectangle. Create 'width' and 'height' variables, then create an 'area' variable that multiplies them. Log a message saying 'The area is: X'.",
            starterCode:
              "const width = 10;\nconst height = 5;\n\n// TODO: calculate area\n\n// TODO: log message using a template literal (backticks)",
            expectedOutput: "'The area is: 50' printed in the console.",
            hints: [
              "const area = width * height;",
              "Use backticks: `The area is: ${area}`",
            ],
          },
          {
            id: "js_beginner_2",
            title: "Control Flow (If/Else)",
            estimatedMinutes: 25,
            xpReward: 20,
            content: `Control flow determines the order in which statements are executed in a program. In JavaScript, \`if/else\` statements allow your code to make decisions based on conditions. The condition must evaluate to a truthy or falsy value. Falsy values include \`false\`, \`0\`, \`""\`, \`null\`, \`undefined\`, and \`NaN\`—everything else is truthy. By chaining \`else if\` statements, you can handle multiple scenarios. Additionally, \`switch\` statements can be used for checking a single variable against many potential values. Proper use of control structures allows your applications to respond dynamically to user input, changing data, and application state, forming the backbone of programmatic logic.`,
            mcq: {
              question: "Which operator checks if two values are equal in both value AND type?",
              options: ["=", "==", "===", "!=="],
              correctIndex: 2,
              explanation: "=== is the strict equality operator. it returns true only if both side are the same type and same value.",
            },
            challenge: "Write a program that checks if a number is even or odd. Log 'Even' if it is even, and 'Odd' otherwise.",
            starterCode:
              "const num = 7;\n\n// TODO: use if/else and the % operator to check if num is even\n// Hint: a number is even if num % 2 === 0",
            expectedOutput: "'Odd' (since 7 is odd).",
            hints: [
              "if (num % 2 === 0) { ... }",
              "Use console.log() inside the blocks.",
            ],
          },
          {
            id: "js_beginner_3",
            title: "Functions Basics",
            estimatedMinutes: 30,
            xpReward: 20,
            content: `Functions are reusable blocks of code designed to perform a specific task. They are the building blocks of any scalable JavaScript application. A function is defined with the \`function\` keyword, followed by a name, parentheses for parameters, and curly braces for the code block. Parameters act as placeholders for the arguments you pass in when calling the function. Functions can also \`return\` a value back to the caller. JavaScript treats functions as first-class citizens, meaning they can be assigned to variables, passed as arguments to other functions, or returned from other functions. This concept enables powerful functional programming paradigms and callback-based architectures.`,
            mcq: {
              question: "What keyword is used to send a value back out of a function?",
              options: ["send", "output", "return", "exit"],
              correctIndex: 2,
              explanation: "The return keyword stops function execution and specifies the value to be returned to the function caller.",
            },
            challenge: "Write a function called 'multiply' that takes two numbers and returns their product. Call it and log the result.",
            starterCode:
              "// TODO: define the multiply function\n\n// TODO: call it with 5 and 4\n\n// TODO: log the result",
            expectedOutput: "20",
            hints: [
              "function multiply(a, b) { return a * b; }",
              "const result = multiply(5, 4);",
            ],
          },
          {
            id: "js_beginner_4",
            title: "Arrays",
            estimatedMinutes: 25,
            xpReward: 20,
            content: `An Array is a special type of object used for storing multiple values in a single variable. They are ordered collections, meaning each element has a numerical index starting from zero. Arrays in JavaScript are highly flexible—they can grow or shrink dynamically and can hold mixed data types simultaneously. You can access elements using bracket notation (\`arr[0]\`). Arrays come with a vast prototype containing built-in methods for manipulation, such as \`push()\` to add to the end, \`pop()\` to remove from the end, \`shift()\` to remove from the beginning, and \`unshift()\` to add to the beginning. Mastering arrays is essential for managing lists of data.`,
            mcq: {
              question: "What is the index of the first element in a JavaScript array?",
              options: ["-1", "0", "1", "any"],
              correctIndex: 1,
              explanation: "In JavaScript (and most programming languages), arrays are zero-indexed, meaning the first element is at index 0.",
            },
            challenge: "Create an array of your 3 favourite movies. Add a 4th movie to the list using .push(), then log the second movie in the list.",
            starterCode:
              "// TODO: create the array\n\n// TODO: add a 4th movie\n\n// TODO: log the second movie (index 1)",
            expectedOutput: "The name of your second movie.",
            hints: [
              "const movies = ['...', '...', '...'];",
              "movies.push('New Movie');",
              "console.log(movies[1]);",
            ],
          },
        ],
      },

      // ─────────────────────────── INTERMEDIATE ───────────────────────────
      {
        id: "intermediate",
        label: "Intermediate",
        xpReward: 75,
        miniProject: {
          title: "Build a to-do list in the browser",
          brief: "Build a browser-based to-do app with add, complete, and delete. Data persists in localStorage.",
          expectedOutput: "A functioning to-do app that survives page refresh.",
          starterCode: "<!DOCTYPE html>\n<html>\n<head><title>Todo App</title></head>\n<body>\n  <input type=\"text\" id=\"todoInput\" placeholder=\"Add a task\" />\n  <button id=\"addBtn\">Add</button>\n  <ul id=\"todoList\"></ul>\n\n  <script>\n    const input = document.getElementById('todoInput');\n    const btn = document.getElementById('addBtn');\n    const list = document.getElementById('todoList');\n\n    // Load from localStorage on startup\n    let todos = JSON.parse(localStorage.getItem('todos')) || [];\n\n    btn.addEventListener('click', () => {\n      // Add new todo, save to localStorage, render list\n    });\n\n    function render() {\n      // Map over todos and create <li> elements\n    }\n  </script>\n</body>\n</html>"
        },
        lessons: [
          {
            id: "js_intermediate_0",
            title: "Objects",
            estimatedMinutes: 30,
            xpReward: 20,
            content: `Objects are the most fundamental data structure in JavaScript, used to store keyed collections of various data and more complex entities. An object is a collection of key-value pairs, where the key is a string (or Symbol) and the value can be anything, including other objects or functions (which are then called methods). You can access properties using dot notation (\`obj.key\`) or bracket notation (\`obj['key']\`). Objects are passed by reference, not by value, meaning if you assign an object to a new variable, both variables point to the same location in memory. Understanding object mutation and structure is critical for managing application state.`,
            mcq: {
              question: "How do you access the 'age' property of an object named 'person'?",
              options: ["person.age", "person['age']", "Both A and B", "person->age"],
              correctIndex: 2,
              explanation: "Both dot notation (person.age) and bracket notation (person['age']) are valid ways to access object properties.",
            },
            challenge: "Create a 'car' object with properties for make, model, and year. Add a method called 'drive' that logs 'Vroom!'.",
            starterCode:
              "const car = {\n  // TODO: add make, model, year\n\n  // TODO: add drive method\n};\n\n// TODO: call car.drive()",
            expectedOutput: "'Vroom!' in the console.",
            hints: [
              "drive: function() { ... } or drive() { ... }",
              "make: 'Tesla', model: 'Model 3', year: 2024",
            ],
          },
          {
            id: "js_intermediate_1",
            title: "DOM Selection",
            estimatedMinutes: 30,
            xpReward: 20,
            content: `The Document Object Model (DOM) is an object-oriented representation of the web page, allowing JavaScript to read and manipulate the structure, style, and content of the document. To interact with the DOM, you first need to select the HTML elements. Modern JavaScript uses \`document.querySelector()\` to find the first element matching a CSS selector, and \`document.querySelectorAll()\` to find all matching elements. Older methods like \`getElementById\` and \`getElementsByClassName\` are also common. Once selected, these elements become JavaScript objects, exposing properties like \`.textContent\`, \`.innerHTML\`, and \`.style\`, allowing you to dynamically update the page without needing a refresh.`,
            mcq: {
              question: "Which method selects the first element that matches a CSS selector?",
              options: ["getElementById", "querySelector", "querySelectorAll", "getElementsByClassName"],
              correctIndex: 1,
              explanation: "querySelector uses CSS selector syntax and returns the very first element it finds that matches.",
            },
            challenge: "In your HTML, add an <h1> with an id of 'main-title'. In JS, select it and change its text to 'JS is Awesome!'.",
            starterCode:
              "<!-- HTML -->\n<h1 id='main-title'>Hello</h1>\n\n<!-- JS -->\n// TODO: select the h1 by ID\n\n// TODO: change its textContent",
            expectedOutput: "The heading on the page changes from 'Hello' to 'JS is Awesome!'.",
            hints: [
              "const el = document.getElementById('main-title');",
              "el.textContent = '...';",
            ],
          },
          {
            id: "js_intermediate_2",
            title: "Event Listeners",
            estimatedMinutes: 35,
            xpReward: 20,
            content: `Events are actions or occurrences that happen in the system you are programming, which the system tells you about so you can respond to them. Examples include a user clicking a button, hovering over an element, or submitting a form. In JavaScript, we use \`addEventListener()\` to attach an event handler to a specific element. This function takes two main arguments: the event type (like 'click' or 'submit') and a callback function to execute when the event occurs. The callback function automatically receives an Event object, containing crucial details like the target element (\`e.target\`) and methods to prevent default behavior (\`e.preventDefault()\`).`,
            mcq: {
              question: "What is the first argument passed to addEventListener?",
              options: ["The function to run", "The event type (e.g. 'click')", "The element ID", "The event object"],
              correctIndex: 1,
              explanation: "The first argument is a string representing the event type you want to listen for.",
            },
            challenge: "Create a button and a counter text (0). Every time the button is clicked, increment the counter and update the text.",
            starterCode:
              "<!-- HTML -->\n<button id='add-btn'>Add 1</button>\n<p id='counter'>0</p>\n\n<!-- JS -->\nlet count = 0;\n// TODO: select both elements\n\n// TODO: add click listener to button\n\n// TODO: increment count and update counter text",
            expectedOutput: "The number on the page increases every time you click the button.",
            hints: [
              "count++;",
              "counterEl.textContent = count;",
            ],
          },
          {
            id: "js_intermediate_3",
            title: "Array Methods (Map & Filter)",
            estimatedMinutes: 30,
            xpReward: 20,
            content: `JavaScript provides powerful declarative array methods that allow you to manipulate data without writing explicit loops. \`Array.prototype.map()\` creates a new array populated with the results of calling a provided function on every element in the calling array. It is perfect for transforming data. \`Array.prototype.filter()\` creates a shallow copy of a portion of a given array, filtered down to just the elements from the given array that pass the test implemented by the provided function. These methods do not mutate the original array, aligning perfectly with immutable functional programming concepts heavily used in modern frameworks like React.`,
            mcq: {
              question: "Which array method creates a NEW array with elements that pass a test?",
              options: ["map", "forEach", "filter", "push"],
              correctIndex: 2,
              explanation: "filter() takes a function that returns true or false, and returns a new array containing only the items that returned true.",
            },
            challenge: "You have an array of scores: [45, 80, 32, 90, 55]. Use .filter() to create a new array called 'passing' with scores 50 or higher.",
            starterCode:
              "const scores = [45, 80, 32, 90, 55];\n\n// TODO: use .filter() to find passing scores\n\n// TODO: log the passing array",
            expectedOutput: "[80, 90, 55]",
            hints: [
              "const passing = scores.filter(s => s >= 50);",
            ],
          },
          {
            id: "js_intermediate_4",
            title: "Local Storage",
            estimatedMinutes: 25,
            xpReward: 20,
            content: `The Web Storage API provides mechanisms by which browsers can store key/value pairs, in a much more intuitive fashion than using cookies. \`localStorage\` persists data even when the browser is closed and reopened. The keys and values must be strings. To store complex data structures like arrays or objects, you must use \`JSON.stringify()\` before saving, and \`JSON.parse()\` when retrieving the data. Common methods include \`setItem(key, value)\`, \`getItem(key)\`, \`removeItem(key)\`, and \`clear()\`. Local storage is ideal for saving user preferences, theme settings, or maintaining authentication state tokens across sessions without requiring a database query.`,
            mcq: {
              question: "What happens to LocalStorage data when you close the browser tab?",
              options: ["It is deleted", "It stays until manually cleared", "It expires in 24 hours", "It is sent to the server"],
              correctIndex: 1,
              explanation: "LocalStorage is persistent — it stays in the browser until you or your code explicitly removes it.",
            },
            challenge: "Save your name to localStorage. Then, write a line that retrieves it and logs 'Welcome back, [Name]'.",
            starterCode:
              "// TODO: save your name\n\n// TODO: retrieve it\n\n// TODO: log welcome message",
            expectedOutput: "'Welcome back, [Your Name]' in the console.",
            hints: [
              "localStorage.setItem('name', '...');",
              "const saved = localStorage.getItem('name');",
            ],
          },
        ],
      },

      // ─────────────────────────── ADVANCED ───────────────────────────
      {
        id: "advanced",
        label: "Advanced",
        xpReward: 100,
        miniProject: {
          title: "Build an async weather dashboard",
          brief: "Fetch weather data from a public API and display current conditions for any city. Handle loading and error states.",
          expectedOutput: "A weather app that fetches live data and handles edge cases.",
          starterCode: "<!DOCTYPE html>\n<html>\n<head><title>Weather Dashboard</title></head>\n<body>\n  <input type=\"text\" id=\"cityInput\" placeholder=\"Enter city name\" />\n  <button id=\"searchBtn\">Get Weather</button>\n  <div id=\"weatherResult\"></div>\n\n  <script>\n    const btn = document.getElementById('searchBtn');\n    const result = document.getElementById('weatherResult');\n\n    btn.addEventListener('click', async () => {\n      const city = document.getElementById('cityInput').value;\n      result.innerHTML = 'Loading...';\n      \n      try {\n        // Fetch from a public API like OpenMeteo or similar\n        // const response = await fetch(`API_URL?q=${city}`);\n        // const data = await response.json();\n        \n        // Update DOM with results\n      } catch (error) {\n        result.innerHTML = 'Error fetching weather.';\n      }\n    });\n  </script>\n</body>\n</html>"
        },
        lessons: [
          {
            id: "js_advanced_0",
            title: "ES6+ Destructuring & Spread",
            estimatedMinutes: 30,
            xpReward: 20,
            content: `Introduced in ES6, Destructuring and the Spread operator are syntactic sugar that makes JavaScript significantly more concise and readable. Destructuring assignment allows you to unpack values from arrays, or properties from objects, into distinct variables. For example, \`const { name, age } = user\` extracts the properties directly. The Spread operator (\`...\`) allows an iterable (like an array or object) to be expanded in places where zero or more arguments or elements are expected. It is widely used for creating shallow copies of arrays, merging objects, and passing array elements as individual arguments to functions. These features are ubiquitous in modern JS development.`,
            mcq: {
              question: "What does the spread operator (...) do when used on an array?",
              options: ["Deletes the array", "Expands the array into individual elements", "Sums all numbers in the array", "Reverses the array"],
              correctIndex: 1,
              explanation: "The spread operator 'spreads' the elements of an iterable (like an array) into a new context, like another array or function arguments.",
            },
            challenge: "You have an object `settings = { theme: 'dark', notifications: true }`. Destructure 'theme' from it, then create a new object `newSettings` that changes the theme to 'light' using the spread operator.",
            starterCode:
              "const settings = { theme: 'dark', notifications: true };\n\n// TODO: destructure 'theme'\n\n// TODO: create newSettings with theme: 'light'\n\n// TODO: log both",
            expectedOutput: "The theme variable is 'dark', newSettings has theme 'light'.",
            hints: [
              "const { theme } = settings;",
              "const newSettings = { ...settings, theme: 'light' };",
            ],
          },
          {
            id: "js_advanced_1",
            title: "Promises & Async/Await",
            estimatedMinutes: 40,
            xpReward: 20,
            content: `JavaScript is single-threaded, meaning long-running operations like network requests would freeze the entire browser if executed synchronously. Promises were introduced to handle asynchronous operations. A Promise represents the eventual completion (or failure) of an asynchronous operation and its resulting value. It has three states: pending, fulfilled, or rejected. \`async/await\` is syntactic sugar built on top of Promises, making asynchronous code look and behave a little more like synchronous code. By marking a function as \`async\`, you can use the \`await\` keyword inside it to pause execution until a Promise resolves, making complex asynchronous workflows much easier to read and debug.`,
            mcq: {
              question: "What keyword is required to use 'await' inside a function?",
              options: ["wait", "async", "promise", "defer"],
              correctIndex: 1,
              explanation: "You can only use the 'await' keyword inside a function that has been marked with the 'async' keyword.",
            },
            challenge: "Create a function called `waitAndLog` that is `async`. Use a Promise and `setTimeout` to wait for 2 seconds, then log 'Hello after 2s!'.",
            starterCode:
              "const delay = (ms) => new Promise(res => setTimeout(res, ms));\n\n// TODO: create async function waitAndLog\n\n// TODO: await delay(2000)\n\n// TODO: log message",
            expectedOutput: "A 2-second delay followed by the log message.",
            hints: [
              "async function waitAndLog() { ... }",
              "await delay(2000);",
            ],
          },
          {
            id: "js_advanced_2",
            title: "Fetch API",
            estimatedMinutes: 40,
            xpReward: 20,
            content: `The Fetch API provides a modern, global \`fetch()\` method that provides an easy, logical way to fetch resources asynchronously across the network. It completely replaces the older \`XMLHttpRequest\` (XHR) object. \`fetch()\` takes a URL and returns a Promise that resolves to the Response object representing the response to the request. However, this Promise only rejects on network failure, not on HTTP errors (like 404 or 500). To properly extract the data, you must call methods like \`.json()\` or \`.text()\` on the Response object, which also return Promises. Fetch makes building RESTful applications straightforward and native to the browser.`,
            mcq: {
              question: "What is the purpose of response.json() in a fetch call?",
              options: [
                "To check if the request was successful",
                "To parse the response body as JSON (JavaScript object)",
                "To send data to the server",
                "To close the connection",
              ],
              correctIndex: 1,
              explanation: "Fetch returns a Response object stream. .json() reads that stream to completion and parses the text as a JavaScript object.",
            },
            challenge: "Fetch a random user from `https://jsonplaceholder.typicode.com/users/1` and log their email address.",
            starterCode:
              "async function getUser() {\n  // TODO: fetch the URL\n\n  // TODO: parse JSON\n\n  // TODO: log data.email\n}\n\ngetUser();",
            expectedOutput: "'Sincere@april.biz' (the email for user 1).",
            hints: [
              "const res = await fetch('...');",
              "const user = await res.json();",
            ],
          },
          {
            id: "js_advanced_3",
            title: "Error Handling (Try/Catch)",
            estimatedMinutes: 30,
            xpReward: 20,
            content: `Robust applications must gracefully handle unexpected situations. The \`try...catch\` statement marks a block of statements to try and specifies a response should an exception be thrown. When an error occurs in the \`try\` block, execution immediately jumps to the \`catch\` block, passing an Error object containing the name, message, and stack trace of the exception. A \`finally\` block can be added to execute code regardless of whether an error occurred, useful for cleaning up resources or hiding loading spinners. Proper error handling ensures that a single failure doesn't crash your entire application and allows you to provide user-friendly feedback.`,
            mcq: {
              question: "Which block in try/catch/finally runs REGARDLESS of whether an error occurred?",
              options: ["try", "catch", "finally", "error"],
              correctIndex: 2,
              explanation: "The finally block always executes after try and catch, whether or not an exception was thrown or caught.",
            },
            challenge: "Wrap a fetch call in a try/catch block. If the fetch fails, log 'Failed to fetch data'.",
            starterCode:
              "async function safeFetch() {\n  try {\n    // TODO: fetch a non-existent URL\n  } catch (err) {\n    // TODO: log error message\n  }\n}\n\nsafeFetch();",
            expectedOutput: "An error message in the console instead of a red crash error.",
            hints: [
              "fetch('https://this-does-not-exist.com')",
            ],
          },
          {
            id: "js_advanced_4",
            title: "Performance & The Event Loop",
            estimatedMinutes: 35,
            xpReward: 20,
            content: `Understanding the Event Loop is the key to mastering advanced JavaScript performance. Since JS is single-threaded, it uses an asynchronous non-blocking I/O model. When async tasks (like \`setTimeout\` or DOM events) are called, they are handed off to the browser's Web APIs. Once complete, their callbacks are placed in the Task Queue. The Event Loop constantly checks if the Call Stack is empty; if it is, it pushes the first callback from the queue onto the stack. Microtasks (like resolved Promises) have a higher priority queue and are executed before the next standard task. Understanding this flow helps developers avoid blocking the main thread, ensuring smooth 60fps animations and responsive UI.`,
            mcq: {
              question: "Which of these has higher priority in the Event Loop?",
              options: ["setTimeout callback", "Promise.then callback (Microtask)", "A button click event", "All have equal priority"],
              correctIndex: 1,
              explanation: "Microtasks (like Promises) are processed immediately after the current task finishes and before the browser moves on to the next task in the Task Queue (like setTimeout).",
            },
            challenge: "Write a script that logs 'Start', then uses a Promise to log 'Promise', then uses setTimeout to log 'Timeout', and finally logs 'End'. See the order yourself!",
            starterCode:
              "console.log('Start');\n\n// TODO: add a setTimeout (0ms) logging 'Timeout'\n\n// TODO: add a Promise.resolve().then logging 'Promise'\n\nconsole.log('End');",
            expectedOutput: "Start -> End -> Promise -> Timeout (Note: End comes before Promise/Timeout because they are async!)",
            hints: [
              "Promise.resolve().then(() => console.log('Promise'));",
              "setTimeout(() => console.log('Timeout'), 0);",
            ],
          },
        ],
      },
    ],
  },

  /* ─────────────────────────── GO ─────────────────────────── */
  12: {
    title: "Go for Backend",
    domain: "Cloud & Systems",
    lang: "Go",
    time: "12h",
    difficulty: "Intermediate",
    color: "#00add8",
    slogan: "Simplicity, efficiency, and concurrency. The language of the cloud.",
    docs: { label: "Go Documentation", url: "https://go.dev/doc/" },
    jobs: {
      roles: ["Cloud Engineer", "Backend Developer", "Systems Programmer"],
      salary: "₹10 – 35 LPA",
    },
    youtube: {
      main: { title: "Go Programming Course — Full Tutorial", channel: "freeCodeCamp", url: "https://www.youtube.com/watch?v=YS4e4q9oBaU" },
      extras: [
        { title: "Go Tutorial for Beginners", channel: "Tech with Tim", url: "https://www.youtube.com/watch?v=un6ZyFkqFKo" },
      ],
    },
    levels: [
      {
        id: "beginner", label: "Beginner", xpReward: 50,
        miniProject: {
          title: "URL Shortener CLI",
          brief: "Build a command-line tool that takes a long URL and returns a (mock) shortened version.",
          expectedOutput: "A CLI app that processes strings and prints output to the console.",
          starterCode: "// Node.js CLI script\nconst readline = require('readline');\n\n// Simple dictionary to act as our database\nconst urlDB = {};\n\nfunction generateShortCode() {\n  return Math.random().toString(36).substring(2, 8);\n}\n\nconst rl = readline.createInterface({\n  input: process.stdin,\n  output: process.stdout\n});\n\nrl.question('Enter a long URL to shorten: ', (longUrl) => {\n  const code = generateShortCode();\n  urlDB[code] = longUrl;\n  console.log(`Shortened URL: http://short.ly/${code}`);\n  rl.close();\n});"
        },
        lessons: [
          {
            id: "go_beginner_0",
            title: "Introduction to Go",
            estimatedMinutes: 10,
            xpReward: 20,
            content: "Go (Golang) is an open-source programming language created by Google. It is statically typed, compiled, and designed for simplicity and performance.",
            mcq: {
              question: "Who created the Go programming language?",
              options: ["Facebook", "Microsoft", "Google", "Apple"],
              correctIndex: 2,
              explanation: "Go was developed by Robert Griesemer, Rob Pike, and Ken Thompson at Google."
            },
            challenge: "What command is used to run a Go file without compiling it to a separate binary?",
            starterCode: "const command = 'go ___ main.go';",
            expectedOutput: "run",
            hints: ["It's a common three-letter word."]
          },
          {
            id: "go_beginner_1",
            title: "Packages and Main Method",
            estimatedMinutes: 15,
            xpReward: 20,
            content: "Every Go file starts with a package declaration. The 'main' package and the 'main' function are the entry point of the application.\n\npackage main\n\nimport 'fmt'\n\nfunc main() {\n    fmt.Println('Hello Go!')\n}",
            mcq: {
              question: "Which package is used for standard input/output in Go?",
              options: ["io", "fmt", "main", "std"],
              correctIndex: 1,
              explanation: "The 'fmt' (format) package implements formatted I/O."
            },
            challenge: "What keyword is used to import other packages in Go?",
            starterCode: "const keyword = '';",
            expectedOutput: "import",
            hints: ["It's the same as in Java and JavaScript."]
          },
          {
            id: "go_beginner_2",
            title: "Variables and Constants",
            estimatedMinutes: 15,
            xpReward: 20,
            content: "Go has several ways to declare variables. The most common in functions is the short declaration operator (:=).\n\nvar name string = 'Fitry'\nage := 25\nconst pi = 3.14",
            mcq: {
              question: "What is the 'short declaration operator' in Go?",
              options: ["=", "==", ":=", "::"],
              correctIndex: 2,
              explanation: ":= is used to declare and initialize a variable in one step, with type inference."
            },
            challenge: "What keyword is used to declare a constant in Go?",
            starterCode: "const keyword = '';",
            expectedOutput: "const",
            hints: ["It's right there in the lesson title."]
          },
          {
            id: "go_beginner_3",
            title: "Data Types",
            estimatedMinutes: 20,
            xpReward: 20,
            content: "Basic types include: bool, string, int, float64. Go also has complex types like arrays, slices, and maps.\n\nint8, int16, int32, int64 are different sizes of integers.",
            mcq: {
              question: "What is the zero value of an integer in Go?",
              options: ["nil", "0", "-1", "undefined"],
              correctIndex: 1,
              explanation: "In Go, variables are always initialized to their 'zero value' if not explicitly set."
            },
            challenge: "What is the zero value of a boolean in Go?",
            starterCode: "const zeroValue = '';",
            expectedOutput: "false",
            hints: ["It's the default logical 'off' state."]
          },
          {
            id: "go_beginner_4",
            title: "Functions and Multiple Returns",
            estimatedMinutes: 20,
            xpReward: 20,
            content: "Functions in Go can return multiple values. This is commonly used for returning a result and an error.\n\nfunc divide(a, b int) (int, error) { ... }",
            mcq: {
              question: "How do you declare a function in Go?",
              options: ["function name()", "def name()", "func name()", "void name()"],
              correctIndex: 2,
              explanation: "The 'func' keyword is used for function declarations."
            },
            challenge: "What keyword is used to return a value from a function?",
            starterCode: "const keyword = '';",
            expectedOutput: "return",
            hints: ["Standard across most languages."]
          }
        ]
      },
      {
        id: "intermediate", label: "Intermediate", xpReward: 75,
        miniProject: {
          title: "Simple HTTP Server",
          brief: "Build a server that responds with 'Hello, World!' when you visit the root URL.",
          expectedOutput: "A Go program that listens on a port and serves requests using the 'net/http' package.",
          starterCode: "const http = require('http');\n\nconst server = http.createServer((req, res) => {\n  if (req.url === '/') {\n    res.statusCode = 200;\n    res.setHeader('Content-Type', 'text/plain');\n    res.end('Hello, World!');\n  } else {\n    res.statusCode = 404;\n    res.end('Not Found');\n  }\n});\n\nserver.listen(8080, () => {\n  console.log('Server running at http://localhost:8080/');\n});"
        },
        lessons: [
          {
            id: "go_intermediate_0",
            title: "Structs and Methods",
            estimatedMinutes: 30,
            xpReward: 25,
            content: "Go doesn't have classes. Instead, it uses structs to group data and methods to define behavior.\n\ntype User struct {\n    Name string\n    Age  int\n}\n\nfunc (u User) Greet() { ... }",
            mcq: {
              question: "What is a 'struct' in Go?",
              options: ["A type of loop", "A collection of fields", "A way to import packages", "A compiled binary"],
              correctIndex: 1,
              explanation: "Structs are used to create custom types by grouping different data fields."
            },
            challenge: "What keyword is used to define a new type like a struct?",
            starterCode: "const keyword = '';",
            expectedOutput: "type",
            hints: ["type Person ___ { ... }"]
          },
          {
            id: "go_intermediate_1",
            title: "Interfaces",
            estimatedMinutes: 35,
            xpReward: 25,
            content: "Interfaces in Go are satisfied implicitly. If a type has all the methods defined in an interface, it implements that interface.",
            mcq: {
              question: "Do you need an 'implements' keyword in Go?",
              options: ["Yes", "No", "Only for exported interfaces", "Only for built-in interfaces"],
              correctIndex: 1,
              explanation: "Go uses structural typing; interfaces are implemented automatically if the methods match."
            },
            challenge: "True or False: An empty interface 'interface{}' can hold any value.",
            starterCode: "const answer = true; // or false",
            expectedOutput: "true",
            hints: ["It has zero methods, so every type satisfies it."]
          },
          {
            id: "go_intermediate_2",
            title: "Pointers",
            estimatedMinutes: 30,
            xpReward: 25,
            content: "Pointers allow you to share a memory address. This is useful for modifying a variable inside a function.\n\nfunc updateName(name *string) { *name = 'New Name' }",
            mcq: {
              question: "What symbol is used to get the memory address of a variable?",
              options: ["*", "&", "@", "$"],
              correctIndex: 1,
              explanation: "The ampersand (&) operator generates a pointer to its operand."
            },
            challenge: "What symbol is used to 'dereference' a pointer to get its value?",
            starterCode: "const symbol = '';",
            expectedOutput: "*",
            hints: ["The asterisk."]
          },
          {
            id: "go_intermediate_3",
            title: "Error Handling",
            estimatedMinutes: 25,
            xpReward: 25,
            content: "Go does not have try-catch. Instead, functions return an error object that you must check explicitly.\n\nif err != nil {\n    return err\n}",
            mcq: {
              question: "What is the standard way to handle an error in Go?",
              options: ["throw err", "try { ... } catch { ... }", "Check if err is not nil", "Ignore it"],
              correctIndex: 2,
              explanation: "Go encourages explicit error checking after function calls."
            },
            challenge: "What is the 'zero value' of the error type?",
            starterCode: "const zeroValue = '';",
            expectedOutput: "nil",
            hints: ["It's like 'null' in other languages."]
          },
          {
            id: "go_intermediate_4",
            title: "Slices and Maps",
            estimatedMinutes: 35,
            xpReward: 25,
            content: "Slices are dynamic views into arrays. Maps are key-value collections (dictionaries).\n\nslice := []int{1, 2, 3}\nmyMap := make(map[string]int)",
            mcq: {
              question: "What is the built-in function to add an item to a slice?",
              options: ["push", "add", "append", "extend"],
              correctIndex: 2,
              explanation: "append() adds one or more elements to a slice and returns the updated slice."
            },
            challenge: "What function is used to initialize a map?",
            starterCode: "const func = '';",
            expectedOutput: "make",
            hints: ["It's also used for slices and channels."]
          }
        ]
      },
      {
        id: "advanced", label: "Advanced", xpReward: 100,
        miniProject: {
          title: "Concurrent Task Runner",
          brief: "Create a program that runs multiple tasks in parallel and waits for them to finish using WaitGroups.",
          expectedOutput: "A program that executes simulated work across multiple goroutines efficiently.",
          starterCode: "package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n    \"time\"\n)\n\nfunc task(id int, wg *sync.WaitGroup) {\n    defer wg.Done()\n    fmt.Printf(\"Task %d starting\\n\", id)\n    time.Sleep(time.Second) // Simulate work\n    fmt.Printf(\"Task %d done\\n\", id)\n}\n\nfunc main() {\n    var wg sync.WaitGroup\n    \n    for i := 1; i <= 3; i++ {\n        wg.Add(1)\n        go task(i, &wg)\n    }\n    \n    wg.Wait()\n    fmt.Println(\"All tasks completed.\")\n}"
        },
        lessons: [
          {
            id: "go_advanced_0",
            title: "Goroutines",
            estimatedMinutes: 40,
            xpReward: 30,
            content: "Goroutines are lightweight threads managed by the Go runtime. You can start one by simply adding the 'go' keyword before a function call.\n\ngo doWork()",
            mcq: {
              question: "Why are Goroutines better than standard OS threads?",
              options: ["They are written in Python", "They are much lighter and you can run thousands of them", "They never crash", "They are faster at math"],
              correctIndex: 1,
              explanation: "Goroutines have small stack sizes and are multiplexed onto fewer OS threads."
            },
            challenge: "What keyword starts a goroutine?",
            starterCode: "const keyword = '';",
            expectedOutput: "go",
            hints: ["It's the name of the language."]
          },
          {
            id: "go_advanced_1",
            title: "Channels",
            estimatedMinutes: 45,
            xpReward: 30,
            content: "Channels are the pipes that connect concurrent goroutines. You can send values into channels from one goroutine and receive them in another.\n\nch := make(chan int)\nch <- 5 // send\nval := <-ch // receive",
            mcq: {
              question: "What is the main philosophy of concurrency in Go?",
              options: ["Share memory to communicate", "Don't communicate, share memory", "Don't communicate by sharing memory; share memory by communicating", "Only use one thread"],
              correctIndex: 2,
              explanation: "Go promotes using channels to pass data instead of locking shared variables."
            },
            challenge: "What is the operator for sending data into a channel?",
            starterCode: "const operator = '';",
            expectedOutput: "<-",
            hints: ["An arrow pointing towards the channel variable."]
          },
          {
            id: "go_advanced_2",
            title: "Select Statement",
            estimatedMinutes: 35,
            xpReward: 30,
            content: "The select statement lets a goroutine wait on multiple communication operations. It's like a switch statement for channels.\n\nselect {\ncase msg1 := <-ch1:\n    fmt.Println(msg1)\ncase ch2 <- 5:\n    fmt.Println('sent')\n}",
            mcq: {
              question: "What happens if multiple cases in a select statement are ready?",
              options: ["The first one runs", "They all run", "One is chosen at random", "The program crashes"],
              correctIndex: 2,
              explanation: "If multiple cases are ready, Go picks one pseudo-randomly to ensure fairness."
            },
            challenge: "What keyword is used for a fallback case in select if no channels are ready?",
            starterCode: "const keyword = '';",
            expectedOutput: "default",
            hints: ["Same as in a switch statement."]
          },
          {
            id: "go_advanced_3",
            title: "WaitGroups",
            estimatedMinutes: 30,
            xpReward: 30,
            content: "WaitGroups are used to wait for a collection of goroutines to finish executing.\n\nvar wg sync.WaitGroup\nwg.Add(1)\ngo func() { defer wg.Done(); ... }()\nwg.Wait()",
            mcq: {
              question: "Which method is called to signal that a goroutine has finished its work?",
              options: ["Finished()", "Done()", "Stop()", "Complete()"],
              correctIndex: 1,
              explanation: "wg.Done() decrements the WaitGroup counter by one."
            },
            challenge: "Which package provides the WaitGroup type?",
            starterCode: "const pkg = '';",
            expectedOutput: "sync",
            hints: ["Short for 'synchronization'."]
          },
          {
            id: "go_advanced_4",
            title: "Context Package",
            estimatedMinutes: 45,
            xpReward: 30,
            content: "The context package is used for cancellation, deadlines, and passing request-scoped values across API boundaries.\n\nctx, cancel := context.WithTimeout(context.Background(), time.Second)",
            mcq: {
              question: "What is a primary use case for Context?",
              options: ["Managing database connections", "Cancelling long-running operations when a user disconnects", "Speeding up the CPU", "Styling terminal output"],
              correctIndex: 1,
              explanation: "Context allows you to propagate cancellation signals through your call stack."
            },
            challenge: "What method do you call to stop a context and its children?",
            starterCode: "const method = '';",
            expectedOutput: "cancel",
            hints: ["It's usually returned as the second value from context.With..."]
          }
        ]
      }
    ],
  },

  /* ───────────────────────── 3. React ───────────────────────── */
  3: {
    title: "React.js Mastery",
    domain: "Web Development",
    lang: "React",
    time: "12h",
    difficulty: "Intermediate",
    color: "#61dafb",
    slogan: "The library powering Facebook, Airbnb, Netflix — and the next thing you build.",
    docs: { label: "React Official Docs", url: "https://react.dev" },
    jobs: {
      roles: ["Frontend Engineer", "React Developer", "Full-Stack JavaScript Engineer"],
      salary: "₹8 – 35 LPA",
    },
    youtube: {
      main: { title: "Learn React for free", channel: "Scrimba", url: "https://scrimba.com/learn/learnreact" },
      extras: [
        { title: "React Hooks — The Complete Guide", channel: "Jack Herrington", url: "https://www.youtube.com/watch?v=LOH1l-MP_9k" },
        { title: "React JS Crash Course", channel: "Traversy Media", url: "https://www.youtube.com/watch?v=w7ejDZ8SWv8" },
      ],
    },
    levels: [
      {
        id: "beginner", label: "Beginner", xpReward: 50,
        miniProject: {
          title: "Build a profile card component",
          brief: "Create a reusable <ProfileCard /> component that accepts name, bio, and avatar via props and renders a styled card.",
          expectedOutput: "A clean, styled profile card rendered in the browser.",
          starterCode: "import React from 'react';\nimport './ProfileCard.css';\n\n// Accept name, bio, and avatar via props\nexport default function ProfileCard({ name, bio, avatarUrl }) {\n  return (\n    <div className=\"profile-card\">\n      <img src={avatarUrl} alt={`${name}'s avatar`} className=\"avatar\" />\n      <h2>{name}</h2>\n      <p>{bio}</p>\n    </div>\n  );\n}"
        },
        lessons: [
          {
            id: "react_beginner_0",
            title: "What is React?",
            estimatedMinutes: 20,
            xpReward: 20,
            setup: {
              windows: [
                "Install Node.js from nodejs.org",
                "Open terminal and run: npx create-react-app my-app",
                "cd my-app",
                "npm start",
              ],
              mac: [
                "Install Node.js via Homebrew or nodejs.org",
                "Open terminal and run: npx create-react-app my-app",
                "cd my-app",
                "npm start",
              ],
            },
            content:
              "React is a JavaScript library for building user interfaces. It's built around 'Components' — small, reusable pieces of code that return HTML.\n\n" +
              "Think of a component like a LEGO brick. You build a whole website by snapping these bricks together.\n\n" +
              "A basic component looks like this:\n" +
              "function Welcome() {\n  return <h1>Hello, Fitry!</h1>;\n}\n\n" +
              "Components must start with a CAPITAL letter.",
            mcq: {
              question: "What is the primary building block of a React application?",
              options: ["Modules", "Components", "Templates", "Prototypes"],
              correctIndex: 1,
              explanation: "Everything in React is a component. A component is a self-contained piece of UI.",
            },
            challenge: "Write a React function component named 'Greeting' that returns an <h2> saying 'Welcome to React!'.",
            starterCode:
              "// TODO: create Greeting component\n\n// TODO: export default Greeting",
            expectedOutput: "A heading that says 'Welcome to React!'.",
            hints: [
              "function Greeting() { return ... }",
              "Make sure the name starts with a capital G.",
            ],
          },
          {
            id: "react_beginner_1",
            title: "JSX: JavaScript XML",
            estimatedMinutes: 25,
            xpReward: 20,
            content:
              "JSX allows you to write HTML-like code inside your JavaScript. It's not actually HTML, but React turns it into real DOM elements.\n\n" +
              "Key Rules:\n" +
              "1. You must return a single root element (wrap multiple tags in a <div> or a Fragment <>...</>).\n" +
              "2. Use 'className' instead of 'class'.\n" +
              "3. Use curly braces {} to embed JavaScript logic.\n\n" +
              "const name = 'Alex';\n" +
              "const element = <h1>Hello, {name}</h1>;",
            mcq: {
              question: "How do you embed a JavaScript variable inside JSX?",
              options: ["(variable)", "{variable}", "[variable]", "<variable>"],
              correctIndex: 1,
              explanation: "Curly braces {} are used to evaluate any JavaScript expression inside JSX.",
            },
            challenge: "Create a component that renders a <div> containing a variable `courseName = 'React'` inside an <h1>.",
            starterCode:
              "function App() {\n  const courseName = 'React';\n  return (\n    // TODO: add div and h1 with variable\n  );\n}",
            expectedOutput: "An <h1> displaying 'React'.",
            hints: [
              "<h1>{courseName}</h1>",
            ],
          },
          {
            id: "react_beginner_2",
            title: "Props: Passing Data",
            estimatedMinutes: 30,
            xpReward: 20,
            content:
              "Props (short for properties) are how you pass data from a parent component to a child component. They are read-only.\n\n" +
              "Parent:\n" +
              "<UserCard name='Fitry' level={5} />\n\n" +
              "Child:\n" +
              "function UserCard(props) {\n  return <p>User: {props.name} (Lvl {props.level})</p>;\n}\n\n" +
              "Or use destructuring:\n" +
              "function UserCard({ name, level }) { ... }",
            mcq: {
              question: "Are props mutable (can they be changed by the child component)?",
              options: ["Yes", "No", "Only if they are strings", "Only if they are objects"],
              correctIndex: 1,
              explanation: "Props are immutable. A component should never modify its own props; it should receive them and render them.",
            },
            challenge: "Modify the 'Avatar' component to accept a prop called 'username' and display it inside a <span>.",
            starterCode:
              "function Avatar(props) {\n  return (\n    // TODO: display props.username\n  );\n}",
            expectedOutput: "The component renders the username passed to it.",
            hints: [
              "<span>{props.username}</span>",
            ],
          },
          {
            id: "react_beginner_3",
            title: "State: useState Hook",
            estimatedMinutes: 40,
            xpReward: 20,
            content:
              "State is how a component 'remembers' things. Unlike props, state can change.\n\n" +
              "import { useState } from 'react';\n\n" +
              "function Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <button onClick={() => setCount(count + 1)}>\n      Count: {count}\n    </button>\n  );\n}\n\n" +
              "useState returns two things: the current value, and a function to update it.",
            mcq: {
              question: "What does useState(10) return?",
              options: [
                "Just the number 10",
                "An array with the value 10 and a setter function",
                "An object with a value property",
                "A function that returns 10",
              ],
              correctIndex: 1,
              explanation: "useState returns a pair: the current state value and a function that lets you update it.",
            },
            challenge: "Create a 'Toggle' component. Use state to track a boolean 'isOn'. When a button is clicked, flip the boolean. Show 'ON' or 'OFF' based on the state.",
            starterCode:
              "import { useState } from 'react';\n\nfunction Toggle() {\n  // TODO: add state\n\n  return (\n    // TODO: add button with onClick and label\n  );\n}",
            expectedOutput: "A button that toggles between 'ON' and 'OFF' text.",
            hints: [
              "const [isOn, setIsOn] = useState(false);",
              "setIsOn(!isOn);",
            ],
          },
          {
            id: "react_beginner_4",
            title: "Handling Events",
            estimatedMinutes: 30,
            xpReward: 20,
            content:
              "React events are named using camelCase, like 'onClick' instead of 'onclick'.\n\n" +
              "function MyButton() {\n  function handleClick(e) {\n    e.preventDefault();\n    alert('Clicked!');\n  }\n\n  return <button onClick={handleClick}>Click Me</button>;\n}\n\n" +
              "You pass a function as the event handler, not a string.",
            mcq: {
              question: "How do you pass a click handler to a button in React?",
              options: [
                "onClick='handleClick()'",
                "onclick={handleClick}",
                "onClick={handleClick}",
                "click={handleClick}",
              ],
              correctIndex: 2,
              explanation: "In React, we use camelCase (onClick) and pass the function reference directly {handleClick}.",
            },
            challenge: "Create a text input. Use an 'onChange' listener to update a state variable called 'text' and display the text live below the input.",
            starterCode:
              "import { useState } from 'react';\n\nfunction InputApp() {\n  const [text, setText] = useState('');\n\n  return (\n    <div>\n      {/* TODO: add input */}\n      <p>Live: {text}</p>\n    </div>\n  );\n}",
            expectedOutput: "As you type in the input, the text below updates instantly.",
            hints: [
              "<input onChange={(e) => setText(e.target.value)} />",
            ],
          },
        ],
      },
      {
        id: "intermediate", label: "Intermediate", xpReward: 75,
        miniProject: {
          title: "Build a multi-step form",
          brief: "Build a form wizard with 3 steps, each collecting different data. Navigate between steps without losing state.",
          expectedOutput: "A working multi-step form with forward/back navigation.",
          starterCode: "import React, { useState } from 'react';\n\nexport default function MultiStepForm() {\n  const [step, setStep] = useState(1);\n  const [formData, setFormData] = useState({ name: '', email: '', role: '' });\n\n  const nextStep = () => setStep(s => s + 1);\n  const prevStep = () => setStep(s => s - 1);\n\n  return (\n    <div>\n      {step === 1 && (\n        <div>\n          <h2>Step 1: Personal Details</h2>\n          {/* Add input for name, then a Next button */}\n        </div>\n      )}\n      {step === 2 && (\n        <div>\n          <h2>Step 2: Contact Info</h2>\n          {/* Add input for email, then Back and Next buttons */}\n        </div>\n      )}\n      {/* Add step 3 and final submission */}\n    </div>\n  );\n}"
        },
        lessons: [
          {
            id: "react_intermediate_0",
            title: "Conditional Rendering",
            estimatedMinutes: 25,
            xpReward: 25,
            content:
              "In React, you can conditionally render UI using JavaScript logic like `if` statements, ternary operators `? :`, or the logical `&&` operator.\n\n" +
              "Ternary:\n" +
              "<div>{isLoggedIn ? <LogoutButton /> : <LoginButton />}</div>\n\n" +
              "Short-circuit (&&):\n" +
              "<div>{hasNotifications && <Badge count={5} />}</div>\n\n" +
              "If the condition is false, React will ignore it and render nothing.",
            mcq: {
              question: "Which operator is best for rendering something only if a condition is true, and nothing otherwise?",
              options: ["? :", "&&", "||", "=="],
              correctIndex: 1,
              explanation: "The logical AND (&&) operator is perfect for 'if this, then that' rendering.",
            },
            challenge: "Create a 'Welcome' component that accepts a 'name' prop. If 'name' exists, show 'Hello, [name]'. If not, show 'Hello, Guest'. Use a ternary operator.",
            starterCode:
              "function Welcome({ name }) {\n  return (\n    // TODO: add conditional logic\n  );\n}",
            expectedOutput: "The component correctly greets either the name or 'Guest'.",
            hints: [
              "{name ? `Hello, ${name}` : 'Hello, Guest'}",
            ],
          },
          {
            id: "react_intermediate_1",
            title: "Lists and Keys",
            estimatedMinutes: 30,
            xpReward: 25,
            content:
              "You can render lists of components using `.map()`. Every item in a list needs a unique `key` prop.\n\n" +
              "const users = ['Alice', 'Bob', 'Charlie'];\n" +
              "const listItems = users.map((user) => (\n  <li key={user}>{user}</li>\n));\n\n" +
              "Keys help React identify which items have changed, been added, or been removed. They should be unique IDs, not just array indexes (if possible).",
            mcq: {
              question: "Why do we need 'keys' in React lists?",
              options: [
                "To style the list",
                "To help React track item changes efficiently",
                "To sort the list",
                "To make the list searchable",
              ],
              correctIndex: 1,
              explanation: "Keys provide a stable identity for items in a list, allowing React to optimize re-renders.",
            },
            challenge: "Given an array of strings `tasks = ['Clean', 'Code', 'Sleep']`, render them as an unordered list (<ul>) where each item is a <li> with a key.",
            starterCode:
              "function TodoList() {\n  const tasks = ['Clean', 'Code', 'Sleep'];\n  return (\n    <ul>\n      {/* TODO: map tasks to li */}\n    </ul>\n  );\n}",
            expectedOutput: "A list of 3 items rendered on the screen.",
            hints: [
              "{tasks.map(t => <li key={t}>{t}</li>)}",
            ],
          },
          {
            id: "react_intermediate_2",
            title: "Forms and Controlled Components",
            estimatedMinutes: 35,
            xpReward: 25,
            content:
              "In a 'controlled component', React state is the 'single source of truth' for the input value.\n\n" +
              "function NameForm() {\n  const [value, setValue] = useState('');\n\n  return (\n    <input \n      type='text' \n      value={value} \n      onChange={(e) => setValue(e.target.value)} \n    />\n  );\n}\n\n" +
              "By setting `value={value}`, you ensure the input always displays exactly what is in your state.",
            mcq: {
              question: "What makes a component a 'controlled component'?",
              options: [
                "It uses CSS for control",
                "Its value is driven by React state",
                "It has a submit button",
                "It is a class component",
              ],
              correctIndex: 1,
              explanation: "Controlled components have their value managed by React state, not the DOM itself.",
            },
            challenge: "Build a small form with an input and a 'Clear' button. The button should reset the input's state to an empty string.",
            starterCode:
              "import { useState } from 'react';\n\nfunction SimpleForm() {\n  const [val, setVal] = useState('');\n\n  return (\n    <div>\n      <input value={val} onChange={e => setVal(e.target.value)} />\n      {/* TODO: add button to clear val */}\n    </div>\n  );\n}",
            expectedOutput: "The input clears when the button is clicked.",
            hints: [
              "<button onClick={() => setVal('')}>Clear</button>",
            ],
          },
          {
            id: "react_intermediate_3",
            title: "Side Effects: useEffect",
            estimatedMinutes: 45,
            xpReward: 25,
            content:
              "The `useEffect` hook lets you perform side effects (like data fetching, manual DOM changes, or timers) in function components.\n\n" +
              "useEffect(() => {\n  console.log('Component mounted');\n}, []); // Empty array = run once on mount\n\n" +
              "useEffect(() => {\n  document.title = `Count: ${count}`;\n}, [count]); // Runs whenever 'count' changes",
            mcq: {
              question: "When does an effect run if the dependency array is empty ([])?",
              options: [
                "Every render",
                "Never",
                "Only on the first render (mount)",
                "Only on unmount",
              ],
              correctIndex: 2,
              explanation: "An empty dependency array tells React the effect doesn't depend on any values, so it only runs once.",
            },
            challenge: "Use useEffect to start a timer (`setInterval`) when the component mounts. Update a `seconds` state every 1000ms. Don't forget to return a cleanup function (`clearInterval`)!",
            starterCode:
              "import { useState, useEffect } from 'react';\n\nfunction Timer() {\n  const [seconds, setSeconds] = useState(0);\n\n  useEffect(() => {\n    // TODO: start interval\n    // TODO: return cleanup\n  }, []);\n\n  return <div>Time: {seconds}s</div>;\n}",
            expectedOutput: "The timer increments by 1 every second.",
            hints: [
              "const id = setInterval(() => setSeconds(s => s + 1), 1000);",
              "return () => clearInterval(id);",
            ],
          },
          {
            id: "react_intermediate_4",
            title: "Lifting State Up",
            estimatedMinutes: 35,
            xpReward: 25,
            content:
              "Sometimes, two components need to share the same state. In React, we 'lift' that state to their closest common ancestor.\n\n" +
              "Ancestor holds the state and passes it down to both children as props. If a child needs to change the state, the ancestor passes down a handler function too.",
            mcq: {
              question: "Where should state be kept if two sibling components need to access it?",
              options: [
                "In the first sibling",
                "In the second sibling",
                "In their common parent component",
                "In a global variable",
              ],
              correctIndex: 2,
              explanation: "Lifting state to the common parent allows it to be the 'source of truth' for both children.",
            },
            challenge: "Create a 'Parent' that holds a 'message' state. Create a 'Child' that receives 'message' as a prop and displays it. The 'Parent' should also have an input that updates 'message'.",
            starterCode:
              "function Child({ message }) {\n  return <p>{message}</p>;\n}\n\nfunction Parent() {\n  // TODO: add state and input\n  return (\n    <div>\n      {/* TODO: render Child and pass prop */}\n    </div>\n  );\n}",
            expectedOutput: "Typing in the parent's input updates the text displayed in the child.",
            hints: [
              "<Child message={msg} />",
            ],
          },
        ],
      },
      {
        id: "advanced", label: "Advanced", xpReward: 100,
        miniProject: {
          title: "Build a mini Reddit clone",
          brief: "Build a post feed with upvote/downvote, comment threads, and sorting. Use useReducer for state management.",
          expectedOutput: "A functional Reddit-style feed with interactive voting.",
          starterCode: "import React, { useReducer } from 'react';\n\nconst initialState = [\n  { id: 1, title: 'First Post', votes: 0, comments: [] }\n];\n\nfunction reducer(state, action) {\n  switch (action.type) {\n    case 'UPVOTE':\n      // map state and increase vote for action.id\n      return state;\n    case 'DOWNVOTE':\n      // map state and decrease vote for action.id\n      return state;\n    default:\n      return state;\n  }\n}\n\nexport default function RedditClone() {\n  const [posts, dispatch] = useReducer(reducer, initialState);\n\n  return (\n    <div>\n      {/* Map posts and render titles, vote count, and buttons */}\n    </div>\n  );\n}"
        },
        lessons: [
          {
            id: "react_advanced_0",
            title: "Context API",
            estimatedMinutes: 40,
            xpReward: 30,
            content:
              "Context provides a way to pass data through the component tree without having to pass props down manually at every level ('prop drilling').\n\n" +
              "1. Create: `const ThemeContext = createContext('light');`\n" +
              "2. Provide: `<ThemeContext.Provider value='dark'>...</ThemeContext.Provider>`\n" +
              "3. Consume: `const theme = useContext(ThemeContext);`",
            mcq: {
              question: "What problem does Context API primarily solve?",
              options: ["Performance", "Prop Drilling", "Data Validation", "Routing"],
              correctIndex: 1,
              explanation: "Context is designed to share data that can be considered 'global' for a tree of React components.",
            },
            challenge: "Create a UserContext. Wrap the app in a Provider with a value of { name: 'Fitry' }. Consume it in a 'Profile' component and show the name.",
            starterCode:
              "import { createContext, useContext } from 'react';\n\nconst UserContext = createContext();\n\nfunction Profile() {\n  // TODO: consume context\n  return <div>User: {user.name}</div>;\n}\n\nfunction App() {\n  return (\n    // TODO: add provider\n    <Profile />\n  );\n}",
            expectedOutput: "The Profile component displays 'Fitry'.",
            hints: [
              "const user = useContext(UserContext);",
              "<UserContext.Provider value={{ name: 'Fitry' }}>",
            ],
          },
          {
            id: "react_advanced_1",
            title: "Custom Hooks",
            estimatedMinutes: 35,
            xpReward: 30,
            content:
              "Custom hooks let you extract component logic into reusable functions. They must start with the word 'use'.\n\n" +
              "function useWindowSize() {\n  const [size, setSize] = useState(window.innerWidth);\n  useEffect(() => {\n    const handleResize = () => setSize(window.innerWidth);\n    window.addEventListener('resize', handleResize);\n    return () => window.removeEventListener('resize', handleResize);\n  }, []);\n  return size;\n}",
            mcq: {
              question: "What is the naming convention for custom hooks?",
              options: ["getSomething", "useSomething", "handleSomething", "componentSomething"],
              correctIndex: 1,
              explanation: "Custom hooks must start with 'use' so that React can verify the rules of hooks.",
            },
            challenge: "Create a custom hook `useToggle(initialValue)` that returns a boolean `value` and a `toggle` function.",
            starterCode:
              "import { useState } from 'react';\n\nfunction useToggle(initialValue) {\n  // TODO: implement logic\n}\n\n// Usage in component\nfunction App() {\n  const [isOn, toggle] = useToggle(false);\n  return <button onClick={toggle}>{isOn ? 'ON' : 'OFF'}</button>;\n}",
            expectedOutput: "The hook correctly manages the toggle state.",
            hints: [
              "const [v, setV] = useState(initialValue);",
              "const toggle = () => setV(!v);",
              "return [v, toggle];",
            ],
          },
          {
            id: "react_advanced_2",
            title: "Performance: useMemo & useCallback",
            estimatedMinutes: 45,
            xpReward: 30,
            content:
              "React re-renders components when their state or props change. To optimize:\n" +
              "1. `useMemo`: Memoizes a calculated value so it's not re-computed every render.\n" +
              "2. `useCallback`: Memoizes a function instance so it's not re-created every render.\n\n" +
              "const memoizedValue = useMemo(() => computeExpensively(a, b), [a, b]);\n" +
              "const memoizedFn = useCallback(() => handleClick(id), [id]);",
            mcq: {
              question: "When should you use useMemo?",
              options: [
                "For every variable in your component",
                "Only for expensive calculations that don't need to run every render",
                "To replace useState",
                "To make the app look better",
              ],
              correctIndex: 1,
              explanation: "useMemo is an optimization tool. Overusing it can actually slow down your app due to memory overhead.",
            },
            challenge: "Wrap a function `notify` in `useCallback` so it only changes when the `id` prop changes.",
            starterCode:
              "import { useCallback } from 'react';\n\nfunction Item({ id }) {\n  const notify = () => console.log('Item:', id);\n  // TODO: wrap notify in useCallback\n\n  return <button onClick={notify}>Notify</button>;\n}",
            expectedOutput: "The notify function reference is stable between renders unless id changes.",
            hints: [
              "useCallback(() => { ... }, [id])",
            ],
          },
          {
            id: "react_advanced_3",
            title: "React Router",
            estimatedMinutes: 40,
            xpReward: 30,
            content:
              "React Router is the standard library for routing in React. It allows you to navigate between different 'pages' without refreshing the browser.\n\n" +
              "<Routes>\n  <Route path='/' element={<Home />} />\n  <Route path='/about' element={<About />} />\n</Routes>\n\n" +
              "Use `<Link to='/about'>` instead of `<a>` to keep the navigation within React.",
            mcq: {
              question: "What component is used for navigation links in React Router?",
              options: ["<a>", "<Navigate>", "<Link>", "<Route>"],
              correctIndex: 2,
              explanation: "<Link> prevents a full page reload and updates the URL via the History API.",
            },
            challenge: "Define a route that matches the path '/profile/:username' and renders a 'Profile' component.",
            starterCode:
              "// Assuming standard React Router setup\n<Routes>\n  {/* TODO: add the profile route */}\n</Routes>",
            expectedOutput: "The route is correctly defined with a URL parameter.",
            hints: [
              "<Route path='/profile/:username' element={<Profile />} />",
            ],
          },
          {
            id: "react_advanced_4",
            title: "Data Fetching & Error States",
            estimatedMinutes: 50,
            xpReward: 30,
            content:
              "Fetching data requires handling three lifecycle phases: Loading, Success, and Error. By using `useState` to track these states and `useEffect` to trigger the fetch, you can provide a robust user experience.\n\n" +
              "The logic typically involves setting `loading` to `true`, executing the request, and updating the state accordingly in `.then()` or `.catch()` blocks.",
            mcq: {
              question: "Where is the best place to initiate a fetch request when a component mounts?",
              options: ["In the render body", "In useState", "In useEffect", "In the constructor"],
              correctIndex: 2,
              explanation: "useEffect is the standard place for side effects like data fetching on mount.",
            },
            challenge: "Implement a component that fetches from 'https://api.example.com/data'. Show 'Loading...' while fetching, and 'Error!' if it fails.",
            starterCode:
              "function DataFetcher() {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(false);\n  const [error, setError] = useState(false);\n\n  // TODO: implement useEffect fetch logic\n\n  if (loading) return <div>Loading...</div>;\n  if (error) return <div>Error!</div>;\n  return <div>Data: {JSON.stringify(data)}</div>;\n}",
            expectedOutput: "The component correctly handles all three network states.",
            hints: [
              "fetch(...).then(...).catch(() => setError(true))",
            ],
          },
        ],
      },
    ],
  },
  10: {
    title: "Master SQL & Databases",
    domain: "Data & Backend",
    lang: "SQL",
    time: "12h",
    difficulty: "Beginner",
    color: "#ffab40",
    slogan: "Every app has a database. Learn to talk to it fluently.",
    docs: { label: "PostgreSQL Docs", url: "https://www.postgresql.org/docs/" },
    jobs: {
      roles: ["Database Administrator", "Backend Developer", "Data Analyst"],
      salary: "₹5 – 22 LPA",
    },
    youtube: {
      main: { title: "SQL Tutorial — Full Database Course for Beginners", channel: "freeCodeCamp", url: "https://www.youtube.com/watch?v=HXV3zeQKqGY" },
      extras: [
        { title: "MySQL Tutorial for Beginners", channel: "Programming with Mosh", url: "https://www.youtube.com/watch?v=7S_tz1z_5bA" },
      ],
    },
    levels: [
      {
        id: "beginner", label: "Beginner", xpReward: 50,
        miniProject: {
          title: "Library Management System",
          brief: "Create a database schema for a library, including tables for books and authors. Establish relationships and insert sample data.",
          expectedOutput: "A robust set of SQL queries to create tables, define primary/foreign keys, and insert initial records.",
          starterCode: "-- Create tables\nCREATE TABLE Authors (\n    author_id INT PRIMARY KEY,\n    name VARCHAR(100) NOT NULL\n);\n\nCREATE TABLE Books (\n    book_id INT PRIMARY KEY,\n    title VARCHAR(200) NOT NULL,\n    author_id INT,\n    FOREIGN KEY (author_id) REFERENCES Authors(author_id)\n);\n\n-- Insert sample data\nINSERT INTO Authors (author_id, name) VALUES (1, 'George Orwell');\nINSERT INTO Books (book_id, title, author_id) VALUES (101, '1984', 1);\n\n-- Write queries to test relationships\nSELECT * FROM Books JOIN Authors ON Books.author_id = Authors.author_id;"
        },
        lessons: [
          {
            id: "sql_beginner_0",
            title: "What is SQL?",
            estimatedMinutes: 15,
            xpReward: 20,
            setup: {
              windows: [
                "Install PostgreSQL from https://www.postgresql.org/download/windows/",
                "During installation, set a password for the 'postgres' user and remember it.",
                "Open 'pgAdmin 4' from your Start menu.",
                "Right-click 'Servers' -> Register -> Server to connect to your local database.",
                "Create a new database named 'fitry_test' to start practicing.",
              ],
              mac: [
                "Install Postgres.app from https://postgresapp.com/",
                "Open the app and click 'Initialize' to create a new server.",
                "Open Terminal and run: psql -U postgres",
                "Create a test database: CREATE DATABASE fitry_test;",
              ],
            },
            content:
              "SQL (Structured Query Language) is the standard language for interacting with Relational Database Management Systems (RDBMS). Unlike general-purpose languages like Python, SQL is *declarative*: you describe what data you want (e.g., 'Get all active users'), and the database engine determines how to fetch it. \n\n" +
              "SQL allows you to perform CRUD operations:\n" +
              "- Create: `INSERT` data into tables.\n" +
              "- Read: `SELECT` data from tables.\n" +
              "- Update: `UPDATE` existing records.\n" +
              "- Delete: `DELETE` unwanted records.\n\n" +
              "It is the backbone of almost every modern web and mobile application.",
            mcq: {
              question: "What does it mean that SQL is a 'declarative' language?",
              options: [
                "You must write the exact algorithm to find data",
                "You describe the desired result rather than the step-by-step process",
                "It can only be used for declaring variables",
                "It requires a compiler like C++",
              ],
              correctIndex: 1,
              explanation: "In SQL, you specify the outcome (the data you want), and the DBMS optimizes the retrieval process.",
            },
            challenge: "What is the keyword used to retrieve data from a database?",
            starterCode: "const keyword = '';",
            expectedOutput: "SELECT",
            hints: ["It is the most frequently used command in SQL."],
          },
          {
            id: "sql_beginner_1",
            title: "Relational Database Structure",
            estimatedMinutes: 20,
            xpReward: 20,
            content:
              "A Relational Database organizes data into Tables which consist of rows and columns. This structure ensures data integrity and reduces redundancy.\n\n" +
              "1. Table: A collection of related data (e.g., a `Users` table).\n" +
              "2. Row (Record): A single unique entry in a table (e.g., a specific user's details).\n" +
              "3. Column (Field): An attribute shared by all records (e.g., `Email` or `JoinedDate`).\n" +
              "4. Primary Key: A unique ID for every row (like a Roll Number or UserID). It ensures no two rows are identical.\n" +
              "5. Schema: The blueprint of the database structure.",
            mcq: {
              question: "What is the purpose of a Primary Key?",
              options: [
                "To sort the data alphabetically",
                "To uniquely identify every record in a table",
                "To store the user's password",
                "To link to an external website",
              ],
              correctIndex: 1,
              explanation: "A Primary Key must be unique and non-null for every row in a table.",
            },
            challenge: "In a 'Books' table, what would be the best column to use as a Primary Key?",
            starterCode: "const column = '';",
            expectedOutput: "ISBN",
            hints: ["It stands for International Standard Book Number and is unique for every book."],
          },
          {
            id: "sql_beginner_2",
            title: "The SELECT Statement",
            estimatedMinutes: 20,
            xpReward: 20,
            content:
              "The `SELECT` statement is the heart of SQL. It allows you to pull specific columns or all data from a table.\n\n" +
              "Basic Syntax:\n" +
              "```sql\n" +
              "SELECT column1, column2 FROM table_name;\n" +
              "```\n\n" +
              "To select everything, use the wildcard `*`:\n" +
              "```sql\n" +
              "SELECT * FROM Users;\n" +
              "```\n\n" +
              "Pro tip: In production, avoid `SELECT *` to save memory and improve performance; only fetch what you need.",
            mcq: {
              question: "Which SQL command is used to extract data from a database?",
              options: ["GET", "OPEN", "SELECT", "EXTRACT"],
              correctIndex: 2,
              explanation: "SELECT is the standard command for data retrieval.",
            },
            challenge: "Write a query to select only the 'Username' and 'Email' from a table named 'Profiles'.",
            starterCode: "// TODO: write SQL",
            expectedOutput: "SELECT Username, Email FROM Profiles;",
            hints: ["Use a comma to separate multiple column names."],
          },
          {
            id: "sql_beginner_3",
            title: "Filtering with WHERE",
            estimatedMinutes: 25,
            xpReward: 20,
            content:
              "The `WHERE` clause is used to filter records based on specific conditions. It is essential for narrowing down results.\n\n" +
              "```sql\n" +
              "SELECT * FROM Products WHERE Price > 100;\n" +
              "```\n\n" +
              "Operators you can use:\n" +
              "- `=`, `<>`, `>`, `<`\n" +
              "- `AND`, `OR`, `NOT` for multiple conditions.\n" +
              "- `BETWEEN` for range filtering.\n" +
              "- `IN` to match values in a list.",
            mcq: {
              question: "How do you select users from the 'Users' table whose 'Country' is 'India'?",
              options: [
                "SELECT * FROM Users WHERE Country = 'India'",
                "SELECT * FROM Users IF Country == 'India'",
                "SELECT India FROM Users",
                "FILTER Users WHERE Country is India",
              ],
              correctIndex: 0,
              explanation: "The WHERE clause uses the = operator for equality checks in SQL.",
            },
            challenge: "Write a query to find all 'Employees' where the 'Department' is 'Sales' AND 'Salary' is greater than 50000.",
            starterCode: "// TODO: write SQL",
            expectedOutput: "SELECT * FROM Employees WHERE Department = 'Sales' AND Salary > 50000;",
            hints: ["Don't forget to use the AND operator."],
          },
          {
            id: "sql_beginner_4",
            title: "Sorting and Limiting",
            estimatedMinutes: 20,
            xpReward: 20,
            content:
              "Sorting and limiting make your data readable and manageable.\n\n" +
              "1. ORDER BY: Sorts results. Default is ascending (`ASC`), use `DESC` for descending.\n" +
              "```sql\n" +
              "SELECT * FROM Users ORDER BY JoinDate DESC;\n" +
              "```\n\n" +
              "2. LIMIT / TOP: Restricts the number of rows returned (useful for pagination).\n" +
              "```sql\n" +
              "SELECT * FROM Posts LIMIT 5; -- Gets only the 5 most recent posts\n" +
              "```",
            mcq: {
              question: "What is the default sorting order for ORDER BY?",
              options: ["Descending (DESC)", "Random", "Ascending (ASC)", "Alphabetical only"],
              correctIndex: 2,
              explanation: "If you don't specify, SQL sorts data in Ascending (low to high) order.",
            },
            challenge: "Write a query to get the top 3 most expensive products from the 'Inventory' table.",
            starterCode: "// TODO: write SQL",
            expectedOutput: "SELECT * FROM Inventory ORDER BY Price DESC LIMIT 3;",
            hints: ["Sort by Price in DESC order and use LIMIT 3."],
          },
        ],
      },
      {
        id: "intermediate", label: "Intermediate", xpReward: 75,
        miniProject: {
          title: "E-Commerce Database",
          brief: "Design a database with three related tables: `Products`, `Orders`, and `Customers`. Write queries to find which customer spent the most.",
          expectedOutput: "A multi-table schema and advanced JOIN queries.",
          starterCode: "-- Schema Design\nCREATE TABLE Customers ( id INT PRIMARY KEY, name VARCHAR(100) );\nCREATE TABLE Products ( id INT PRIMARY KEY, price DECIMAL(10,2) );\nCREATE TABLE Orders ( \n    id INT PRIMARY KEY, \n    customer_id INT, \n    product_id INT,\n    FOREIGN KEY (customer_id) REFERENCES Customers(id),\n    FOREIGN KEY (product_id) REFERENCES Products(id)\n);\n\n-- Query to find which customer spent the most\n-- TIP: Use SUM(Products.price), JOIN, GROUP BY customer_id, and ORDER BY DESC\n"
        },
        lessons: [
          {
            id: "sql_intermediate_0",
            title: "Joins: Connecting Tables",
            estimatedMinutes: 40,
            xpReward: 25,
            content:
              "In a relational database, data is spread across multiple tables. JOINs allow you to combine them based on a related column (usually a Foreign Key).\n\n" +
              "- INNER JOIN: Returns records that have matching values in both tables.\n" +
              "- LEFT JOIN: Returns all records from the left table, and matching records from the right.\n" +
              "- RIGHT JOIN: Reverse of Left Join.\n" +
              "- FULL JOIN: Returns all records when there is a match in either table.",
            mcq: {
              question: "Which JOIN only returns rows where there is a match in BOTH tables?",
              options: ["LEFT JOIN", "INNER JOIN", "FULL OUTER JOIN", "CROSS JOIN"],
              correctIndex: 1,
              explanation: "INNER JOIN is the most common join, filtering out any rows that don't have a pair in the other table.",
            },
            challenge: "Join the 'Orders' table with the 'Customers' table on the 'CustomerID' column.",
            starterCode: "SELECT * FROM Orders ___ Customers ON Orders.CustomerID = Customers.CustomerID;",
            expectedOutput: "INNER JOIN",
            hints: ["Use the standard join type."],
          },
          {
            id: "sql_intermediate_1",
            title: "Aggregations (SUM, AVG, COUNT)",
            estimatedMinutes: 30,
            xpReward: 25,
            content:
              "Aggregate functions perform a calculation on a set of values and return a single value. They are often used with `GROUP BY`.\n\n" +
              "- `COUNT()`: Returns the number of rows.\n" +
              "- `SUM()`: Returns the total sum of a numeric column.\n" +
              "- `AVG()`: Returns the average value.\n" +
              "- `MAX()` / `MIN()`: Returns the highest/lowest values.",
            mcq: {
              question: "Which function would you use to find the average salary of employees?",
              options: ["TOTAL()", "AVG()", "MEAN()", "SUM()"],
              correctIndex: 1,
              explanation: "AVG() calculates the arithmetic mean of a numeric column.",
            },
            challenge: "Write a query to count the total number of orders in the 'Orders' table.",
            starterCode: "SELECT ___(*) FROM Orders;",
            expectedOutput: "COUNT",
            hints: ["The function starts with C."],
          },
          {
            id: "sql_intermediate_2",
            title: "Grouping Data (GROUP BY)",
            estimatedMinutes: 35,
            xpReward: 25,
            content:
              "The `GROUP BY` statement groups rows that have the same values into summary rows, like 'find the number of customers in each country'.\n\n" +
              "```sql\n" +
              "SELECT Country, COUNT(*) FROM Customers GROUP BY Country;\n" +
              "```\n\n" +
              "Important: To filter groups (not rows), use the `HAVING` clause instead of `WHERE`.",
            mcq: {
              question: "Which clause is used to filter the results of a GROUP BY?",
              options: ["WHERE", "FILTER", "HAVING", "LIMIT"],
              correctIndex: 2,
              explanation: "WHERE filters rows before grouping; HAVING filters the groups after they are created.",
            },
            challenge: "Group 'Sales' by 'Region' and only show regions where total sales are greater than 1000.",
            starterCode: "SELECT Region, SUM(Amount) FROM Sales GROUP BY Region ___ SUM(Amount) > 1000;",
            expectedOutput: "HAVING",
            hints: ["Use the keyword that works with aggregate results."],
          },
          {
            id: "sql_intermediate_3",
            title: "Subqueries",
            estimatedMinutes: 40,
            xpReward: 25,
            content:
              "A subquery is a query nested inside another query. It's used when you need to perform a calculation before the main query can run.\n\n" +
              "```sql\n" +
              "SELECT Name FROM Employees WHERE Salary > (SELECT AVG(Salary) FROM Employees);\n" +
              "```\n\n" +
              "The inner query runs first, finds the average, and then the outer query finds employees above that average.",
            mcq: {
              question: "In a nested query, which part executes first?",
              options: ["The outer query", "The inner query", "Both execute simultaneously", "Depends on the database"],
              correctIndex: 1,
              explanation: "The inner query (the subquery) executes first and passes its result to the outer query.",
            },
            challenge: "Find the names of products whose price is higher than the price of 'Product_ID' 101.",
            starterCode: "SELECT Name FROM Products WHERE Price > (SELECT Price FROM Products WHERE Product_ID = ___);",
            expectedOutput: "101",
            hints: ["Fill in the ID from the instruction."],
          },
          {
            id: "sql_intermediate_4",
            title: "Data Modification (Update/Delete)",
            estimatedMinutes: 25,
            xpReward: 25,
            content:
              "Modifying data requires caution. Always use a `WHERE` clause, or you might update/delete every row in your table!\n\n" +
              "```sql\n" +
              "UPDATE Users SET Email = 'new@email.com' WHERE UserID = 5;\n" +
              "DELETE FROM Users WHERE LastLogin < '2023-01-01';\n" +
              "```",
            mcq: {
              question: "What happens if you run 'DELETE FROM Users' without a WHERE clause?",
              options: [
                "It deletes only the first user",
                "It deletes all users in the table",
                "It returns an error",
                "It prompts you for confirmation",
              ],
              correctIndex: 1,
              explanation: "Without a WHERE filter, the action is applied to the entire table.",
            },
            challenge: "Write the command to update the 'Status' to 'Inactive' for the user with ID 42.",
            starterCode: "___ Users SET Status = 'Inactive' WHERE ID = 42;",
            expectedOutput: "UPDATE",
            hints: ["Matches the 'U' in CRUD."],
          },
        ],
      },
      {
        id: "advanced", label: "Advanced", xpReward: 100,
        miniProject: {
          title: "Database Performance Tuning",
          brief: "Analyze a slow-running query. Implement indexing and rewrite the query using a Common Table Expression (CTE) for better readability and speed.",
          expectedOutput: "An optimized query plan showing reduced execution time.",
          starterCode: "-- Original Slow Query Example:\n-- SELECT c.name, (SELECT SUM(amount) FROM Orders o WHERE o.customer_id = c.id) as total_spent FROM Customers c;\n\n-- 1. Create Indexes\nCREATE INDEX idx_customer_id ON Orders(customer_id);\n\n-- 2. Rewrite using CTE (Common Table Expression) and JOIN\nWITH CustomerTotals AS (\n    SELECT customer_id, SUM(amount) as total_spent\n    FROM Orders\n    GROUP BY customer_id\n)\nSELECT c.name, ct.total_spent\nFROM Customers c\nJOIN CustomerTotals ct ON c.id = ct.customer_id;"
        },
        lessons: [
          {
            id: "sql_advanced_0",
            title: "Database Normalization",
            estimatedMinutes: 50,
            xpReward: 30,
            content:
              "Normalization is the process of structuring a database to reduce data redundancy and improve data integrity. It usually involves breaking a large table into smaller, related tables.\n\n" +
              "- 1NF: Atomic values (no lists in a cell).\n" +
              "- 2NF: Remove partial dependencies (every column depends on the whole PK).\n" +
              "- 3NF: Remove transitive dependencies (non-key columns shouldn't depend on other non-key columns).",
            mcq: {
              question: "What is the primary goal of Database Normalization?",
              options: [
                "To make the database run faster",
                "To reduce data redundancy and improve integrity",
                "To encrypt the data",
                "To create more backups",
              ],
              correctIndex: 1,
              explanation: "Normalization ensures that data is stored logically and only once.",
            },
            challenge: "Which Normal Form requires that all values in a column are atomic (no arrays/lists)?",
            starterCode: "const nf = '';",
            expectedOutput: "1NF",
            hints: ["It is the first step of normalization."],
          },
          {
            id: "sql_advanced_1",
            title: "Indexes & Performance",
            estimatedMinutes: 45,
            xpReward: 30,
            content:
              "Indexes are special lookup tables that the database search engine can use to speed up data retrieval. Think of it like the index at the back of a book.\n\n" +
              "While indexes make `SELECT` much faster, they make `INSERT`, `UPDATE`, and `DELETE` slightly slower because the index must also be updated. Use them strategically on columns frequently used in `WHERE` clauses.",
            mcq: {
              question: "What is the trade-off of creating many indexes?",
              options: [
                "It makes the database take up less space",
                "It speeds up data retrieval but slows down data modification",
                "It makes the database less secure",
                "It has no drawbacks",
              ],
              correctIndex: 1,
              explanation: "Every index requires storage and must be updated whenever data changes, impacting write speed.",
            },
            challenge: "Create an index named 'idx_email' on the 'Email' column of the 'Users' table.",
            starterCode: "CREATE ___ idx_email ON Users(Email);",
            expectedOutput: "INDEX",
            hints: ["The keyword is the same as the topic."],
          },
          {
            id: "sql_advanced_2",
            title: "ACID Transactions",
            estimatedMinutes: 40,
            xpReward: 30,
            content:
              "A transaction is a unit of work that is either performed entirely or not at all. ACID is a set of properties that guarantee reliable processing:\n\n" +
              "- Atomicity: 'All or nothing'.\n" +
              "- Consistency: Moves DB from one valid state to another.\n" +
              "- Isolation: Concurrent transactions don't interfere.\n" +
              "- Durability: Once committed, changes are permanent even in a crash.",
            mcq: {
              question: "In ACID, what does 'Atomicity' guarantee?",
              options: [
                "The data is stored in atoms",
                "The transaction is either completely finished or completely rolled back",
                "The database is always fast",
                "Only one user can use the database",
              ],
              correctIndex: 1,
              explanation: "Atomicity ensures that partial updates are never saved.",
            },
            challenge: "What command do you use to save all changes made in a transaction permanently?",
            starterCode: "const cmd = '';",
            expectedOutput: "COMMIT",
            hints: ["The opposite is ROLLBACK."],
          },
          {
            id: "sql_advanced_3",
            title: "Window Functions",
            estimatedMinutes: 55,
            xpReward: 30,
            content:
              "Window functions perform calculations across a set of table rows that are somehow related to the current row. Unlike aggregate functions, they don't group rows into a single output row.\n\n" +
              "```sql\n" +
              "SELECT Name, Salary, AVG(Salary) OVER(PARTITION BY Dept) FROM Employees;\n" +
              "```\n\n" +
              "This allows you to see individual data alongside group averages in the same row.",
            mcq: {
              question: "Which keyword is essential for defining a Window Function?",
              options: ["GROUP BY", "OVER", "HAVING", "WINDOW"],
              correctIndex: 1,
              explanation: "The OVER clause defines the 'window' of rows the function operates on.",
            },
            challenge: "What clause inside OVER() is used to divide rows into groups for the calculation?",
            starterCode: "AVG(Salary) OVER(___ BY Department)",
            expectedOutput: "PARTITION",
            hints: ["It's similar to 'splitting' into parts."],
          },
          {
            id: "sql_advanced_4",
            title: "Views and Stored Procedures",
            estimatedMinutes: 45,
            xpReward: 30,
            content:
              "1. Views: Virtual tables based on the result of an SQL statement. They simplify complex queries.\n" +
              "2. Stored Procedures: Prepared SQL code that you can save and reuse. They can take parameters and contain complex logic.\n\n" +
              "These tools help in abstraction and security, allowing users to interact with data without seeing the complex underlying queries.",
            mcq: {
              question: "What is a 'View' in SQL?",
              options: [
                "A physical copy of the table",
                "A virtual table based on a query result",
                "A tool for designing UI",
                "A type of database user",
              ],
              correctIndex: 1,
              explanation: "Views do not store data themselves; they are dynamic results of saved queries.",
            },
            challenge: "Write the command to create a view named 'ActiveUsers'.",
            starterCode: "CREATE ___ ActiveUsers AS SELECT * FROM Users WHERE Status = 'Active';",
            expectedOutput: "VIEW",
            hints: ["It's the name of the concept."],
          },
        ],
      },
    ],
  },

  /* ───────────────────────── 4. Python ───────────────────────── */
  4: {
    title: "Python for Everyone",
    domain: "Data Science & Automation",
    lang: "Python",
    time: "9h",
    difficulty: "Beginner",
    color: "#4ade80",
    slogan: "The language NASA, Netflix and Instagram all chose. Now it is your turn.",
    docs: { label: "Python Official Docs", url: "https://docs.python.org/3/" },
    jobs: {
      roles: ["Python Developer", "Data Engineer", "Backend Engineer", "Automation Engineer"],
      salary: "₹6 – 28 LPA",
    },
    youtube: {
      main: { title: "Python Tutorial for Beginners (Full Series)", channel: "Corey Schafer", url: "https://www.youtube.com/playlist?list=PL-osiE80TeTt2d9bfVyTiXJA-UTHn6WwU" },
      extras: [
        { title: "Learn Python — Full Course for Beginners", channel: "freeCodeCamp", url: "https://www.youtube.com/watch?v=rfscVS0vtbw" },
        { title: "Python in 100 Seconds", channel: "Fireship", url: "https://www.youtube.com/watch?v=x7X9w_GIm1s" },
      ],
    },
    levels: [
      {
        id: "beginner", label: "Beginner", xpReward: 50,
        miniProject: {
          title: "Build a number guessing game",
          brief: "Create a CLI game that picks a random number 1–100 and gives the user hints (higher/lower) until they guess it.",
          expectedOutput: "A playable game in the terminal with hint feedback and attempt count.",
          starterCode: "import random\n\ndef main():\n    target = random.randint(1, 100)\n    attempts = 0\n    \n    print(\"Welcome to the Number Guessing Game!\")\n    \n    while True:\n        try:\n            guess = int(input(\"Guess a number between 1 and 100: \"))\n            attempts += 1\n            \n            # Add if/elif/else logic here for higher/lower/correct\n            \n        except ValueError:\n            print(\"Please enter a valid integer.\")\n\nif __name__ == \"__main__\":\n    main()"
        },
        lessons: [
          {
            id: "python_beginner_0",
            title: "Intro to Python",
            estimatedMinutes: 15,
            xpReward: 20,
            setup: {
              windows: [
                "Download Python from python.org",
                "Check 'Add Python to PATH' during install",
                "Open CMD and type: python --version",
              ],
              mac: [
                "Python 3 is often pre-installed",
                "Run: python3 --version",
                "If missing, install via Homebrew: brew install python",
              ],
            },
            content:
              "Python is a high-level, readable language. It's used for everything from web servers to AI.\n\n" +
              "The most important thing to know about Python is that INDENTATION matters. Unlike other languages that use {} or ; Python uses spaces to define code blocks.\n\n" +
              "print('Hello, Fitry!')",
            mcq: {
              question: "How does Python define code blocks (like the body of a loop)?",
              options: ["Curly braces {}", "Semicolons ;", "Indentation (whitespace)", "Parentheses ()"],
              correctIndex: 2,
              explanation: "Python uses whitespace indentation to determine the grouping of statements.",
            },
            challenge: "Write a Python script that prints the message 'Learning Python' to the console.",
            starterCode: "# TODO: print the message",
            expectedOutput: "Learning Python",
            hints: ["Use the print() function."],
          },
          {
            id: "python_beginner_1",
            title: "Variables & Types",
            estimatedMinutes: 20,
            xpReward: 20,
            content:
              "In Python, you don't need to declare types. You just assign values.\n\n" +
              "name = 'Fitry' (String)\n" +
              "age = 25 (Integer)\n" +
              "pi = 3.14 (Float)\n" +
              "is_cool = True (Boolean)\n\n" +
              "Use `type(variable)` to check what type a variable is.",
            mcq: {
              question: "Which of these is a correct boolean value in Python?",
              options: ["true", "True", "TRUE", "1"],
              correctIndex: 1,
              explanation: "Python booleans are capitalized: True and False.",
            },
            challenge: "Create a variable `price` with value 99.99 and another `quantity` with value 5. Multiply them and print the result.",
            starterCode: "price = 99.99\nquantity = 5\n# TODO: multiply and print",
            expectedOutput: "499.95",
            hints: ["Use the * operator for multiplication."],
          },
          {
            id: "python_beginner_2",
            title: "Strings & F-Strings",
            estimatedMinutes: 25,
            xpReward: 20,
            content:
              "Strings can be enclosed in single (') or double (\") quotes.\n\n" +
              "F-strings (Formatted strings) are the best way to inject variables into strings:\n" +
              "name = 'Alex'\n" +
              "print(f'Hello, {name}!')\n\n" +
              "You can also use methods like `.upper()`, `.lower()`, and `.strip()`.",
            mcq: {
              question: "How do you start an f-string in Python?",
              options: ["str('...')", "f'...' ", "format('...')", "$'...'"],
              correctIndex: 1,
              explanation: "Adding an 'f' before the quotes allows you to use {curly_braces} for variable interpolation.",
            },
            challenge: "Given `user = 'Fitry'`, print the message 'WELCOME, FITRY' using an f-string and the `.upper()` method.",
            starterCode: "user = 'Fitry'\n# TODO: print message in uppercase",
            expectedOutput: "WELCOME, FITRY",
            hints: ["print(f'WELCOME, {user.upper()}')"],
          },
          {
            id: "python_beginner_3",
            title: "Lists & Dictionaries",
            estimatedMinutes: 35,
            xpReward: 20,
            content:
              "Lists are ordered collections: `fruits = ['apple', 'banana']`.\n" +
              "Access by index: `fruits[0]` (0-based).\n\n" +
              "Dictionaries are Key-Value pairs: `user = {'name': 'Fitry', 'lvl': 5}`.\n" +
              "Access by key: `user['name']`.",
            mcq: {
              question: "How do you add an item to the end of a list?",
              options: [".add()", ".push()", ".append()", ".insert()"],
              correctIndex: 2,
              explanation: "The .append() method adds a single element to the end of a list.",
            },
            challenge: "Create a dictionary named 'car' with keys 'brand' (Toyota) and 'year' (2022). Print only the brand.",
            starterCode: "# TODO: create dict\n# TODO: print brand",
            expectedOutput: "Toyota",
            hints: ["car = {'brand': 'Toyota', ...}"],
          },
          {
            id: "python_beginner_4",
            title: "Logic & Loops",
            estimatedMinutes: 30,
            xpReward: 20,
            content:
              "If/Else logic:\n" +
              "if score > 50:\n  print('Pass')\nelse:\n  print('Fail')\n\n" +
              "For Loops (iterating over a list):\n" +
              "for x in [1, 2, 3]:\n  print(x)\n\n" +
              "Range function:\n" +
              "for i in range(5): # 0, 1, 2, 3, 4",
            mcq: {
              question: "What is the keyword for 'else if' in Python?",
              options: ["else if", "elseif", "elif", "elsif"],
              correctIndex: 2,
              explanation: "Python uses 'elif' as a shorthand for 'else if'.",
            },
            challenge: "Write a loop that prints the numbers from 1 to 5 (inclusive).",
            starterCode: "# TODO: write loop",
            expectedOutput: "1\n2\n3\n4\n5",
            hints: ["Use range(1, 6)"],
          },
        ],
      },
      {
        id: "intermediate", label: "Intermediate", xpReward: 75,
        miniProject: {
          title: "Build a file organiser script",
          brief: "Write a Python script that scans a folder and sorts files into subdirectories by extension (.pdf, .jpg, etc.).",
          expectedOutput: "Running the script moves files into categorised subfolders.",
          starterCode: "import os\nimport shutil\n\ndef organize_files(folder_path):\n    # Dictionary mapping folder names to extensions\n    extensions = {\n        \"Images\": [\".jpg\", \".jpeg\", \".png\", \".gif\"],\n        \"Documents\": [\".pdf\", \".docx\", \".txt\"]\n    }\n    \n    for filename in os.listdir(folder_path):\n        file_path = os.path.join(folder_path, filename)\n        \n        # Skip directories\n        if os.path.isdir(file_path):\n            continue\n            \n        _, ext = os.path.splitext(filename)\n        \n        # Determine target folder and move file\n        # HINT: Check if target directory exists, if not os.makedirs()\n\nif __name__ == \"__main__\":\n    organize_files(\"./my_messy_folder\")"
        },
        lessons: [
          {
            id: "python_intermediate_0",
            title: "Functions & Scoping",
            estimatedMinutes: 25,
            xpReward: 25,
            content:
              "Functions are defined with the `def` keyword.\n\n" +
              "def greet(name):\n  return f'Hello, {name}'\n\n" +
              "Variables defined inside a function are 'Local' to that function. Variables defined outside are 'Global'.\n" +
              "Python also has `*args` for variable-length arguments and `kwargs` for keyword arguments.",
            mcq: {
              question: "What keyword is used to define a function in Python?",
              options: ["function", "func", "def", "define"],
              correctIndex: 2,
              explanation: "The 'def' keyword (short for define) is used to create a new function.",
            },
            challenge: "Write a function `square(n)` that returns the square of a number. Then call it with 5 and print the result.",
            starterCode: "# TODO: define square function\n# TODO: print square(5)",
            expectedOutput: "25",
            hints: ["return n * n"],
          },
          {
            id: "python_intermediate_1",
            title: "List Comprehensions",
            estimatedMinutes: 20,
            xpReward: 25,
            content:
              "List comprehensions provide a concise way to create lists.\n\n" +
              "numbers = [1, 2, 3, 4]\n" +
              "squares = [x*x for x in numbers]\n\n" +
              "You can even add conditions:\n" +
              "evens = [x for x in numbers if x % 2 == 0]",
            mcq: {
              question: "What is the output of [x.upper() for x in ['a', 'b']]?",
              options: ["['a', 'b']", "['A', 'B']", "['AA', 'BB']", "Error"],
              correctIndex: 1,
              explanation: "The expression x.upper() is applied to each element in the list.",
            },
            challenge: "Given a list `names = ['fitry', 'alex', 'sam']`, use a list comprehension to create a new list with all names capitalized.",
            starterCode: "names = ['fitry', 'alex', 'sam']\n# TODO: use list comprehension",
            expectedOutput: "['Fitry', 'Alex', 'Sam']",
            hints: ["Use n.capitalize() or n.title()"],
          },
          {
            id: "python_intermediate_2",
            title: "Error Handling: try/except",
            estimatedMinutes: 30,
            xpReward: 25,
            content:
              "To prevent your program from crashing when an error occurs, use a `try/except` block.\n\n" +
              "try:\n  x = 10 / 0\nexcept ZeroDivisionError:\n  print('You cannot divide by zero!')\nfinally:\n  print('Execution complete.')",
            mcq: {
              question: "Which block always runs, regardless of whether an error occurred or not?",
              options: ["try", "except", "else", "finally"],
              correctIndex: 3,
              explanation: "The 'finally' block is used for cleanup actions and runs no matter what.",
            },
            challenge: "Write a script that tries to convert a string `s = 'hello'` to an integer using `int(s)`. Catch the `ValueError` and print 'Invalid Number'.",
            starterCode: "s = 'hello'\n# TODO: try/except block",
            expectedOutput: "Invalid Number",
            hints: ["except ValueError:"],
          },
          {
            id: "python_intermediate_3",
            title: "Working with Files",
            estimatedMinutes: 35,
            xpReward: 25,
            content:
              "The best way to open a file is using the `with` statement, which ensures the file is closed automatically.\n\n" +
              "with open('test.txt', 'w') as f:\n  f.write('Hello World')\n\n" +
              "To read:\n" +
              "with open('test.txt', 'r') as f:\n  content = f.read()",
            mcq: {
              question: "What does the 'w' mode stand for in open(file, 'w')?",
              options: ["Wait", "Write", "Wrap", "Window"],
              correctIndex: 1,
              explanation: "'w' opens a file for writing (and overwrites existing content). 'r' is for reading, and 'a' is for appending.",
            },
            challenge: "Open a file named 'notes.txt' in write mode and write the string 'Fitry is the best' to it.",
            starterCode: "# TODO: write to file",
            expectedOutput: "The file 'notes.txt' contains the text.",
            hints: ["with open('notes.txt', 'w') as f:"],
          },
          {
            id: "python_intermediate_4",
            title: "Modules & Packages",
            estimatedMinutes: 25,
            xpReward: 25,
            content:
              "You can use code from other files or libraries using `import`.\n\n" +
              "import math\n" +
              "print(math.sqrt(16))\n\n" +
              "Or import specific functions:\n" +
              "from os import path\n" +
              "print(path.exists('test.txt'))",
            mcq: {
              question: "How do you install a new package from the Python Package Index (PyPI)?",
              options: ["python install package", "pip install package", "get package", "npm install package"],
              correctIndex: 1,
              explanation: "pip is the package installer for Python.",
            },
            challenge: "Import the `random` module and use `random.randint(1, 10)` to print a random number between 1 and 10.",
            starterCode: "# TODO: import and print random int",
            expectedOutput: "A number between 1 and 10.",
            hints: ["import random"],
          },
        ],
      },
      {
        id: "advanced", label: "Advanced", xpReward: 100,
        miniProject: {
          title: "Build a web scraper with requests + BeautifulSoup",
          brief: "Scrape a public site (e.g. quotes.toscrape.com), extract structured data, and save it to a CSV file.",
          expectedOutput: "A CSV file with scraped data and a clean terminal log.",
        },
        lessons: [
          {
            id: "python_advanced_0",
            title: "Classes & OOP",
            estimatedMinutes: 45,
            xpReward: 30,
            content:
              "Object-Oriented Programming (OOP) allows you to group data and behavior into objects.\n\n" +
              "class Dog:\n" +
              "  def __init__(self, name):\n" +
              "    self.name = name\n" +
              "  def bark(self):\n" +
              "    return f'{self.name} says Woof!'\n\n" +
              "my_dog = Dog('Rex')\n" +
              "print(my_dog.bark())",
            mcq: {
              question: "What is the purpose of the `__init__` method in a Python class?",
              options: [
                "To initialize the object's attributes",
                "To delete the object",
                "To print the object",
                "To define a global variable",
              ],
              correctIndex: 0,
              explanation: "The `__init__` method is the constructor that runs when a new instance of the class is created.",
            },
            challenge: "Create a `Circle` class with an `__init__` method that sets a `radius`. Add a method `get_area()` that returns 3.14 * radius * radius.",
            starterCode: "class Circle:\n  # TODO: implement class",
            expectedOutput: "The class correctly calculates the area based on radius.",
            hints: ["Use self.radius"],
          },
          {
            id: "python_advanced_1",
            title: "Decorators",
            estimatedMinutes: 35,
            xpReward: 30,
            content:
              "Decorators allow you to 'wrap' another function to extend its behavior without permanently modifying it.\n\n" +
              "def my_decorator(func):\n" +
              "  def wrapper():\n" +
              "    print('Before function')\n" +
              "    func()\n" +
              "    print('After function')\n" +
              "  return wrapper\n\n" +
              "@my_decorator\n" +
              "def say_hello():\n" +
              "  print('Hello!')",
            mcq: {
              question: "What symbol is used to apply a decorator to a function?",
              options: ["@", "#", "$", "&"],
              correctIndex: 0,
              explanation: "The @ symbol followed by the decorator name is placed above the function definition.",
            },
            challenge: "Write a decorator `bold_decorator` that wraps a function returning a string and adds '<b>' to the start and '</b>' to the end.",
            starterCode: "# TODO: write bold_decorator",
            expectedOutput: "The decorated function returns a bolded string.",
            hints: ["The wrapper should return f'<b>{func()}</b>'"],
          },
          {
            id: "python_advanced_2",
            title: "Generators & Yield",
            estimatedMinutes: 30,
            xpReward: 30,
            content:
              "Generators allow you to declare a function that behaves like an iterator. They use the `yield` keyword.\n" +
              "They are memory-efficient because they generate values on the fly instead of storing them in a list.\n\n" +
              "def count_up_to(n):\n  i = 1\n  while i <= n:\n    yield i\n    i += 1",
            mcq: {
              question: "What is the main benefit of using a generator over a list?",
              options: ["Faster access", "Memory efficiency", "Easier to sort", "Better syntax"],
              correctIndex: 1,
              explanation: "Generators yield items one at a time, making them much more memory-efficient for large datasets.",
            },
            challenge: "Create a generator `even_numbers(n)` that yields even numbers from 0 up to n.",
            starterCode: "def even_numbers(n):\n  # TODO: implement generator",
            expectedOutput: "The generator yields 0, 2, 4, etc.",
            hints: ["Use if i % 2 == 0: yield i"],
          },
          {
            id: "python_advanced_3",
            title: "Context Managers",
            estimatedMinutes: 35,
            xpReward: 30,
            content:
              "Context managers handle the setup and teardown of resources. You've already used them with `with open()`. You can create your own using classes or the `@contextmanager` decorator.\n\n" +
              "from contextlib import contextmanager\n" +
              "@contextmanager\n" +
              "def temp_file():\n  # setup code\n  yield file\n  # teardown code",
            mcq: {
              question: "Which keyword is used to invoke a context manager?",
              options: ["use", "with", "open", "context"],
              correctIndex: 1,
              explanation: "The 'with' statement is used to wrap the execution of a block with methods defined by a context manager.",
            },
            challenge: "Write a simple context manager class `Timer` that prints 'Started' on enter and 'Finished' on exit.",
            starterCode: "class Timer:\n  # TODO: implement __enter__ and __exit__",
            expectedOutput: "Using the class with 'with Timer():' prints both messages.",
            hints: ["Define __enter__(self) and __exit__(self, exc_type, exc_val, exc_tb)"],
          },
          {
            id: "python_advanced_4",
            title: "Concurrency: Threads vs Processes",
            estimatedMinutes: 45,
            xpReward: 30,
            content:
              "Python has two main ways to run code concurrently:\n" +
              "1. Threading: Good for I/O-bound tasks (waiting for network/disk).\n" +
              "2. Multiprocessing: Good for CPU-bound tasks (math, image processing) because it bypasses the GIL (Global Interpreter Lock).",
            mcq: {
              question: "Which one should you use for heavy mathematical calculations?",
              options: ["Threading", "Multiprocessing", "Asyncio", "Loops"],
              correctIndex: 1,
              explanation: "Multiprocessing allows you to use multiple CPU cores, which is necessary for CPU-intensive work in Python.",
            },
            challenge: "Identify if a 'web crawler' is I/O-bound or CPU-bound.",
            starterCode: "# TODO: set variable task_type to 'IO' or 'CPU'",
            expectedOutput: "'IO'",
            hints: ["Crawlers spend most of their time waiting for the network."],
          },
        ],
      },
    ],
  },

  /* ───────────────────────── 5. Pandas ───────────────────────── */
  5: {
    title: "Data Analysis with Pandas",
    domain: "Data Science",
    lang: "Pandas",
    time: "11h",
    difficulty: "Intermediate",
    color: "#ffab40",
    slogan: "Spreadsheets cannot hold a candle to this. Welcome to real data work.",
    docs: { label: "Pandas Documentation", url: "https://pandas.pydata.org/docs/" },
    jobs: {
      roles: ["Data Analyst", "Business Analyst", "Data Scientist (Junior)"],
      salary: "₹5 – 22 LPA",
    },
    youtube: {
      main: { title: "Complete Python Pandas Data Science Tutorial", channel: "Keith Galli", url: "https://www.youtube.com/watch?v=vmEHCJofslg" },
      extras: [
        { title: "Data Analysis with Python — Full Course", channel: "freeCodeCamp", url: "https://www.youtube.com/watch?v=r-uOLxNrNk8" },
        { title: "Pandas in 100 Seconds", channel: "Fireship", url: "https://www.youtube.com/watch?v=_Eb0utIRdkw" },
      ],
    },
    levels: [
      {
        id: "beginner", label: "Beginner", xpReward: 50,
        miniProject: {
          title: "Analyse a CSV sales dataset",
          brief: "Load a CSV, clean missing values, and produce a summary report with totals and averages per category.",
          expectedOutput: "Printed summary statistics and a cleaned DataFrame.",
          starterCode: "import pandas as pd\n\ndef analyze_sales():\n    # 1. Load data\n    df = pd.read_csv(\"sales_data.csv\")\n    \n    # 2. Clean missing values\n    df = df.dropna() # or fillna()\n    \n    # 3. Produce summary report\n    # Group by category and calculate sum and mean\n    summary = df.groupby(\"Category\").agg({\n        \"Sales\": [\"sum\", \"mean\"]\n    })\n    \n    print(\"Sales Summary Report:\")\n    print(summary)\n\nif __name__ == \"__main__\":\n    analyze_sales()"
        },
        lessons: [
          {
            id: "pandas_beginner_0",
            title: "Intro to Pandas",
            estimatedMinutes: 20,
            xpReward: 20,
            setup: {
              windows: [
                "Install Python (3.10+) from https://www.python.org/downloads/",
                "Open PowerShell and run: pip install pandas",
                "Verify installation: python -c \"import pandas; print(pandas.__version__)\"",
                "Download a sample CSV file or use the ones provided in challenges.",
              ],
              mac: [
                "Install Python via Homebrew: brew install python",
                "Open Terminal and run: pip3 install pandas",
                "Verify installation: python3 -c \"import pandas; print(pandas.__version__)\"",
              ],
            },
            content: "Pandas is the most popular library for data manipulation in Python. It introduces two main data structures: Series (1D) and DataFrames (2D).\n\nimport pandas as pd\n\ndf = pd.DataFrame({'Name': ['Alice', 'Bob'], 'Age': [25, 30]})",
            mcq: {
              question: "What is a DataFrame in Pandas?",
              options: ["A single column of data", "A 2D table-like structure with rows and columns", "A list of dictionaries", "A way to plot charts"],
              correctIndex: 1,
              explanation: "A DataFrame is a 2-dimensional labeled data structure with columns of potentially different types."
            },
            challenge: "Create a simple DataFrame with one column 'Score' and values [80, 90, 100].",
            starterCode: "import pandas as pd\n# TODO: create df",
            expectedOutput: "A DataFrame with a 'Score' column.",
            hints: ["Use pd.DataFrame({'Score': [80, 90, 100]})"]
          },
          {
            id: "pandas_beginner_1",
            title: "Loading & Viewing Data",
            estimatedMinutes: 20,
            xpReward: 20,
            content: "You can load data from various sources. The most common is CSV.\n\ndf = pd.read_csv('data.csv')\n\nUse df.head() to see the first 5 rows and df.info() to see column types.",
            mcq: {
              question: "Which method is used to see the first few rows of a DataFrame?",
              options: [".show()", ".display()", ".head()", ".first()"],
              correctIndex: 2,
              explanation: ".head() shows the first 5 rows by default."
            },
            challenge: "Write the command to load a file named 'students.csv' into a variable 'df'.",
            starterCode: "import pandas as pd\n# TODO: load csv",
            expectedOutput: "df = pd.read_csv('students.csv')",
            hints: ["Use pd.read_csv()"]
          },
          {
            id: "pandas_beginner_2",
            title: "Column Operations",
            estimatedMinutes: 25,
            xpReward: 20,
            content: "You can create new columns based on existing ones or rename them.\n\ndf['New_Col'] = df['Old_Col'] * 2\ndf.rename(columns={'Old': 'New'}, inplace=True)",
            mcq: {
              question: "How do you add a new column 'Total' to a DataFrame?",
              options: ["df.add('Total')", "df['Total'] = ...", "df.new_column('Total')", "df.insert('Total')"],
              correctIndex: 1,
              explanation: "Direct assignment df['column_name'] = value is the standard way to add a column."
            },
            challenge: "Add a column 'Bonus' that is 10% of the 'Salary' column in DataFrame 'df'.",
            starterCode: "# TODO: add Bonus column",
            expectedOutput: "df['Bonus'] = df['Salary'] * 0.1",
            hints: ["df['Bonus'] = df['Salary'] * 0.1"]
          },
          {
            id: "pandas_beginner_3",
            title: "Summary Statistics",
            estimatedMinutes: 20,
            xpReward: 20,
            content: "Quickly get insights using aggregation functions.\n\ndf['Salary'].mean()\ndf['Salary'].sum()\ndf['Salary'].max()\ndf.describe() # Statistical summary",
            mcq: {
              question: "Which method gives a comprehensive statistical summary of numerical columns?",
              options: [".summary()", ".stats()", ".describe()", ".info()"],
              correctIndex: 2,
              explanation: ".describe() returns count, mean, std, min, max, and quartiles."
            },
            challenge: "Print the maximum value of the 'Age' column in DataFrame 'df'.",
            starterCode: "# TODO: print max age",
            expectedOutput: "print(df['Age'].max())",
            hints: ["Use .max()"]
          },
          {
            id: "pandas_beginner_4",
            title: "Sorting Data",
            estimatedMinutes: 20,
            xpReward: 20,
            content: "Organize your data by sorting values.\n\ndf.sort_values(by='Age', ascending=False)",
            mcq: {
              question: "How do you sort a DataFrame by 'Price' in descending order?",
              options: ["df.sort('Price')", "df.sort_values('Price')", "df.sort_values('Price', ascending=False)", "df.order_by('Price')"],
              correctIndex: 2,
              explanation: "ascending=False sorts in descending order."
            },
            challenge: "Sort the DataFrame 'df' by the 'Score' column in ascending order.",
            starterCode: "# TODO: sort df",
            expectedOutput: "df.sort_values(by='Score')",
            hints: ["By default, ascending is True."]
          }
        ],
      },
      {
        id: "intermediate", label: "Intermediate", xpReward: 75,
        miniProject: {
          title: "Build a dashboard-ready dataset",
          brief: "Merge two CSV files, create pivot tables, and export a final dataset ready for visualisation.",
          expectedOutput: "A merged, pivoted CSV file with no nulls.",
          starterCode: "import pandas as pd\n\ndef prepare_dashboard_data():\n    # Load datasets\n    df_sales = pd.read_csv(\"sales.csv\")\n    df_customers = pd.read_csv(\"customers.csv\")\n    \n    # Merge datasets on customer_id\n    merged_df = pd.merge(df_sales, df_customers, on=\"customer_id\", how=\"left\")\n    \n    # Create pivot table\n    pivot = merged_df.pivot_table(\n        values=\"revenue\", \n        index=\"region\", \n        columns=\"product_category\", \n        aggfunc=\"sum\"\n    )\n    \n    # Fill nulls and export\n    pivot.fillna(0).to_csv(\"dashboard_ready.csv\")\n\nif __name__ == \"__main__\":\n    prepare_dashboard_data()"
        },
        lessons: [
          {
            id: "pandas_intermediate_0",
            title: "Filtering & Selection",
            estimatedMinutes: 25,
            xpReward: 25,
            content: "Selecting specific data is key. Use .loc for label-based and .iloc for integer-based selection.\n\ndf[df['Age'] > 25] # Filter rows\ndf.loc[0, 'Name'] # Access first row, Name column",
            mcq: {
              question: "What is the difference between .loc and .iloc?",
              options: [".loc is for labels; .iloc is for integer positions", ".loc is for integers; .iloc is for labels", "There is no difference", "loc is faster"],
              correctIndex: 0,
              explanation: ".loc uses column/index names, while .iloc uses numeric indices."
            },
            challenge: "Filter a DataFrame 'df' to show only rows where the 'Salary' column is greater than 50000.",
            starterCode: "# TODO: filter df",
            expectedOutput: "df[df['Salary'] > 50000]",
            hints: ["Use boolean indexing: df[condition]"]
          },
          {
            id: "pandas_intermediate_1",
            title: "Handling Missing Data",
            estimatedMinutes: 25,
            xpReward: 25,
            content: "Real data is messy. You must handle null values.\n\ndf.isnull().sum() # Count nulls\ndf.dropna() # Remove nulls\ndf.fillna(0) # Replace nulls with 0",
            mcq: {
              question: "Which method replaces all NaN values with a specific value?",
              options: [".replace()", ".fill()", ".fillna()", ".fixna()"],
              correctIndex: 2,
              explanation: ".fillna() is specifically for filling missing values."
            },
            challenge: "Fill all missing values in the 'Age' column with the average age.",
            starterCode: "# TODO: fillna with mean",
            expectedOutput: "df['Age'].fillna(df['Age'].mean(), inplace=True)",
            hints: ["df['Age'].fillna(...)"]
          },
          {
            id: "pandas_intermediate_2",
            title: "Merging DataFrames",
            estimatedMinutes: 30,
            xpReward: 25,
            content: "Combine multiple datasets using join logic similar to SQL.\n\npd.merge(df1, df2, on='id', how='inner')\npd.concat([df1, df2]) # Stack vertically",
            mcq: {
              question: "Which function stacks DataFrames on top of each other?",
              options: ["pd.stack()", "pd.merge()", "pd.concat()", "pd.join()"],
              correctIndex: 2,
              explanation: "pd.concat() joins DataFrames along an axis (rows or columns)."
            },
            challenge: "Merge 'orders' and 'customers' on the 'customer_id' column.",
            starterCode: "# TODO: merge DataFrames",
            expectedOutput: "pd.merge(orders, customers, on='customer_id')",
            hints: ["pd.merge(left, right, on='key')"]
          },
          {
            id: "pandas_intermediate_3",
            title: "Pivot Tables",
            estimatedMinutes: 30,
            xpReward: 25,
            content: "Summarize data like a spreadsheet Pro.\n\ndf.pivot_table(index='Category', values='Sales', aggfunc='sum')",
            mcq: {
              question: "What does the 'index' parameter in pivot_table define?",
              options: ["The columns of the pivot table", "The rows of the pivot table", "The values to aggregate", "The function to use"],
              correctIndex: 1,
              explanation: "The 'index' parameter groups data by the specified column as rows."
            },
            challenge: "Create a pivot table showing total 'Profit' for each 'Region'.",
            starterCode: "# TODO: create pivot table",
            expectedOutput: "df.pivot_table(index='Region', values='Profit', aggfunc='sum')",
            hints: ["aggfunc='sum' is the key."]
          },
          {
            id: "pandas_intermediate_4",
            title: "Apply & Lambda",
            estimatedMinutes: 30,
            xpReward: 25,
            content: "Run custom functions on entire columns.\n\ndf['Name'].apply(lambda x: x.upper())\ndf['Status'] = df['Score'].apply(lambda s: 'Pass' if s > 50 else 'Fail')",
            mcq: {
              question: "What is a lambda function in this context?",
              options: ["A recursive function", "A small anonymous function", "A way to delete data", "A plotting tool"],
              correctIndex: 1,
              explanation: "Lambda functions are one-line anonymous functions used for quick transformations."
            },
            challenge: "Create a column 'Is_Adult' that is True if 'Age' >= 18, else False using .apply().",
            starterCode: "# TODO: apply lambda",
            expectedOutput: "df['Is_Adult'] = df['Age'].apply(lambda x: x >= 18)",
            hints: ["lambda x: x >= 18"]
          }
        ],
      },
      {
        id: "advanced", label: "Advanced", xpReward: 100,
        miniProject: {
          title: "End-to-end EDA report",
          brief: "Perform exploratory data analysis on a real-world dataset: distributions, correlations, outlier detection, and a written summary.",
          expectedOutput: "A Jupyter notebook with charts, stats, and narrative insights.",
          starterCode: "# Import libraries\nimport pandas as pd\nimport matplotlib.pyplot as plt\nimport seaborn as sns\n\n# 1. Load dataset\ndf = pd.read_csv(\"dataset.csv\")\n\n# 2. Basic info and descriptive stats\nprint(df.info())\nprint(df.describe())\n\n# 3. Outlier detection and correlations\ncorr_matrix = df.corr()\nsns.heatmap(corr_matrix, annot=True)\nplt.show()\n\n# Write narrative insights in markdown (if using Jupyter Notebook)\n# \"The correlation matrix reveals a strong positive correlation between X and Y...\""
        },
        lessons: [
          {
            id: "pandas_advanced_0",
            title: "GroupBy & Aggregation",
            estimatedMinutes: 30,
            xpReward: 30,
            content: "GroupBy allows you to split the data into groups and apply functions like mean, sum, or count.\n\ndf.groupby('Category')['Sales'].sum()",
            mcq: {
              question: "What does the .groupby() method do?",
              options: ["Groups rows that have the same values into summary rows", "Deletes duplicate rows", "Sorts the data", "Joins two tables"],
              correctIndex: 0,
              explanation: "It involves a split-apply-combine process to aggregate data."
            },
            challenge: "Find the average 'Age' for each 'Department' in a DataFrame 'df'.",
            starterCode: "# TODO: groupby and mean",
            expectedOutput: "df.groupby('Department')['Age'].mean()",
            hints: ["Chain .groupby() with ['Age'].mean()"]
          },
          {
            id: "pandas_advanced_1",
            title: "Time Series Analysis",
            estimatedMinutes: 40,
            xpReward: 30,
            content: "Pandas excels at handling dates and times.\n\ndf['Date'] = pd.to_datetime(df['Date'])\ndf.set_index('Date', inplace=True)\ndf.resample('M').mean() # Monthly average",
            mcq: {
              question: "How do you convert a string column to actual datetime objects?",
              options: ["pd.as_date()", "pd.to_datetime()", "df.format_date()", "pd.convert()"],
              correctIndex: 1,
              explanation: "pd.to_datetime() is the standard conversion function."
            },
            challenge: "Resample a daily sales DataFrame 'df' to show weekly totals.",
            starterCode: "# TODO: resample weekly",
            expectedOutput: "df.resample('W').sum()",
            hints: ["'W' stands for Weekly."]
          },
          {
            id: "pandas_advanced_2",
            title: "MultiIndexing",
            estimatedMinutes: 40,
            xpReward: 30,
            content: "Working with higher-dimensional data in a 2D structure.\n\ndf.set_index(['Region', 'City'], inplace=True)\ndf.loc['North'] # Access all cities in North",
            mcq: {
              question: "What is a MultiIndex?",
              options: ["Multiple columns", "A hierarchical index with multiple levels", "A list of indices", "An index that cannot be changed"],
              correctIndex: 1,
              explanation: "It allows you to store and manipulate data with an arbitrary number of dimensions."
            },
            challenge: "Set both 'Year' and 'Month' as indices for DataFrame 'df'.",
            starterCode: "# TODO: set multiindex",
            expectedOutput: "df.set_index(['Year', 'Month'], inplace=True)",
            hints: ["Pass a list of column names to .set_index()."]
          },
          {
            id: "pandas_advanced_3",
            title: "Vectorized String Ops",
            estimatedMinutes: 30,
            xpReward: 30,
            content: "Perform string operations on entire columns efficiently.\n\ndf['Email'].str.contains('@')\ndf['Name'].str.split(' ', expand=True)",
            mcq: {
              question: "How do you access string methods for a Pandas Series?",
              options: [".string", ".text", ".str", ".char"],
              correctIndex: 2,
              explanation: "The .str accessor gives you access to a wide range of string methods."
            },
            challenge: "Extract the first 3 characters of the 'ID' column.",
            starterCode: "# TODO: slice string column",
            expectedOutput: "df['ID'].str[:3]",
            hints: ["Use .str and slicing."]
          },
          {
            id: "pandas_advanced_4",
            title: "Performance Optimization",
            estimatedMinutes: 45,
            xpReward: 30,
            content: "Handling large datasets efficiently.\n\ndf.memory_usage(deep=True)\ndf['Category'] = df['Category'].astype('category') # Saves memory",
            mcq: {
              question: "Which data type is more memory-efficient for low-cardinality string columns?",
              options: ["object", "string", "category", "int"],
              correctIndex: 2,
              explanation: "Converting strings to the 'category' type can drastically reduce memory usage."
            },
            challenge: "Convert the 'Department' column to a 'category' type.",
            starterCode: "# TODO: convert to category",
            expectedOutput: "df['Department'] = df['Department'].astype('category')",
            hints: ["Use .astype('category')"]
          }
        ],
      },
    ],
  },


  /* ───────────────────────── 6. Machine Learning ───────────────────────── */
  6: {
    title: "Machine Learning Foundations",
    domain: "Artificial Intelligence",
    lang: "Python",
    time: "15h",
    difficulty: "Intermediate",
    color: "#f39c12",
    slogan: "Behind every recommendation, every translation, every self-driving car — sits this.",
    docs: { label: "scikit-learn Documentation", url: "https://scikit-learn.org/stable/" },
    jobs: {
      roles: ["ML Engineer", "Data Scientist", "AI Research Associate"],
      salary: "₹10 – 45 LPA",
    },
    youtube: {
      main: { title: "Machine Learning for Everybody — Full Course", channel: "freeCodeCamp", url: "https://www.youtube.com/watch?v=i_LwzRVP7bg" },
      extras: [
        { title: "But what is a Neural Network?", channel: "3Blue1Brown", url: "https://www.youtube.com/watch?v=aircAruvnKk" },
      ],
    },
    levels: [
      {
        id: "beginner", label: "Beginner", xpReward: 50,
        miniProject: {
          title: "Predict house prices",
          brief: "Build a simple linear regression model to predict house prices based on square footage and number of rooms.",
          expectedOutput: "A model that can accurately predict a price for a given input.",
          starterCode: "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.metrics import mean_squared_error\n\n# Create dummy data\ndata = {\n    'sqft': [1000, 1500, 2000, 2500],\n    'rooms': [2, 3, 4, 4],\n    'price': [200000, 300000, 400000, 500000]\n}\ndf = pd.DataFrame(data)\n\nX = df[['sqft', 'rooms']]\ny = df['price']\n\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\n\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\n\npredictions = model.predict(X_test)\nprint(\"MSE:\", mean_squared_error(y_test, predictions))"
        },
        lessons: [
          {
            id: "ml_beginner_0",
            title: "What is Machine Learning?",
            estimatedMinutes: 15,
            xpReward: 20,
            setup: {
              windows: [
                "Install Python from python.org.",
                "Install the Scikit-Learn library: pip install scikit-learn pandas matplotlib",
                "Open your favorite IDE (VS Code recommended) and create a .py file.",
                "Run a simple script to verify: python -c \"import sklearn; print('Ready!')\"",
              ],
              mac: [
                "Install Python via Homebrew: brew install python",
                "Install libraries: pip3 install scikit-learn pandas matplotlib",
                "Verify installation: python3 -c \"import sklearn; print('Ready!')\"",
              ],
            },
            content: "Machine Learning is the field of AI that gives computers the ability to learn without being explicitly programmed. Instead of writing rules (if/else), you feed the computer data and it finds the patterns.",
            mcq: {
              question: "What is the core difference between traditional programming and machine learning?",
              options: ["ML is faster", "Traditional programming uses data; ML doesn't", "ML learns patterns from data; traditional programming uses explicit rules", "There is no difference"],
              correctIndex: 2,
              explanation: "In traditional programming, you provide the rules. In ML, the machine figures out the rules based on data."
            },
            challenge: "What is the name for the 'patterns' that a machine learning model learns?",
            starterCode: "const answer = '';",
            expectedOutput: "Features",
            hints: ["They are the variables used to make predictions."]
          },
          {
            id: "ml_beginner_1",
            title: "Supervised vs Unsupervised Learning",
            estimatedMinutes: 20,
            xpReward: 20,
            content: "Supervised Learning: The model learns from labeled data (input + correct answer).\nUnsupervised Learning: The model finds hidden structures in unlabeled data.",
            mcq: {
              question: "If you want to predict if an email is 'Spam' or 'Not Spam', which type of learning should you use?",
              options: ["Supervised", "Unsupervised", "Reinforcement", "Deep Learning"],
              correctIndex: 0,
              explanation: "Email classification uses labels (Spam/Not Spam), so it is Supervised Learning."
            },
            challenge: "What is the name for the type of ML that uses reward-based learning?",
            starterCode: "const answer = '';",
            expectedOutput: "Reinforcement Learning",
            hints: ["It's common in robotics and gaming."]
          },
          {
            id: "ml_beginner_2",
            title: "Data Preprocessing",
            estimatedMinutes: 25,
            xpReward: 20,
            content: "Data is never perfect. Preprocessing involves cleaning, handling missing values, and scaling features so the model can learn better.\n\nfrom sklearn.preprocessing import StandardScaler\nscaler = StandardScaler()\nX_scaled = scaler.fit_transform(X)",
            mcq: {
              question: "Why do we scale features in Machine Learning?",
              options: ["To make the data smaller", "To ensure all features contribute equally to the model", "To delete outliers", "To make the model faster"],
              correctIndex: 1,
              explanation: "Scaling prevents features with large magnitudes from dominating those with smaller ones."
            },
            challenge: "What is the process of converting text categories (like 'Red', 'Blue') into numbers?",
            starterCode: "const process = '';",
            expectedOutput: "Encoding",
            hints: ["Specifically, One-Hot Encoding or Label Encoding."]
          },
          {
            id: "ml_beginner_3",
            title: "Train-Test Split",
            estimatedMinutes: 20,
            xpReward: 20,
            content: "To evaluate how well your model works, you must test it on data it hasn't seen before. We split the data into a training set and a testing set.\n\nfrom sklearn.model_selection import train_test_split\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)",
            mcq: {
              question: "What is the standard percentage of data usually kept for testing?",
              options: ["50%", "80%", "20%", "0%"],
              correctIndex: 2,
              explanation: "A 20-30% test size is most common."
            },
            challenge: "What happens if you test your model on the same data it was trained on?",
            starterCode: "const result = '';",
            expectedOutput: "Overfitting",
            hints: ["The model might just memorize the answers instead of learning patterns."]
          },
          {
            id: "ml_beginner_4",
            title: "Evaluation Metrics",
            estimatedMinutes: 25,
            xpReward: 20,
            content: "How do we know if a model is good? We use metrics.\n\n- Accuracy: Total correct / Total predictions\n- Precision: True Positives / (True Positives + False Positives)\n- Recall: True Positives / (True Positives + False Negatives)",
            mcq: {
              question: "Which metric is most important when missing a positive case is very dangerous (e.g. cancer detection)?",
              options: ["Accuracy", "Precision", "Recall", "F1-Score"],
              correctIndex: 2,
              explanation: "Recall measures how many actual positives the model captured."
            },
            challenge: "Calculate the accuracy: 80 correct predictions out of 100.",
            starterCode: "const accuracy = 0;",
            expectedOutput: "0.8",
            hints: ["80 / 100"]
          }
        ]
      },
      {
        id: "intermediate", label: "Intermediate", xpReward: 75,
        miniProject: {
          title: "Iris Flower Classification",
          brief: "Use the classic Iris dataset to build a model that classifies flower species based on measurements.",
          expectedOutput: "A classification model with high accuracy on test data.",
          starterCode: "from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import accuracy_score\n\n# Load data\niris = load_iris()\nX, y = iris.data, iris.target\n\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)\n\n# Initialize and train model\nclf = RandomForestClassifier(n_estimators=100)\nclf.fit(X_train, y_train)\n\n# Predict and evaluate\npreds = clf.predict(X_test)\nprint(f\"Accuracy: {accuracy_score(y_test, preds):.2f}\")"
        },
        lessons: [
          {
            id: "ml_intermediate_0",
            title: "Linear Regression",
            estimatedMinutes: 30,
            xpReward: 25,
            content: "Linear Regression predicts a continuous value by fitting a straight line through the data points.\n\ny = mx + b",
            mcq: {
              question: "Which of these is a regression problem?",
              options: ["Predicting stock prices", "Classifying cat images", "Grouping similar customers", "Detecting fraud"],
              correctIndex: 0,
              explanation: "Stock prices are continuous values, making it a regression task."
            },
            challenge: "What is the name of the error function often minimized in Linear Regression?",
            starterCode: "const answer = 'Mean ___ Error';",
            expectedOutput: "Mean Squared Error",
            hints: ["MSE stands for..."]
          },
          {
            id: "ml_intermediate_1",
            title: "Logistic Regression",
            estimatedMinutes: 30,
            xpReward: 25,
            content: "Despite the name, Logistic Regression is used for classification. It uses a sigmoid function to output a probability between 0 and 1.\n\nfrom sklearn.linear_model import LogisticRegression",
            mcq: {
              question: "What is the output of a Logistic Regression model before it's converted to a class?",
              options: ["A category", "A probability", "A whole number", "An image"],
              correctIndex: 1,
              explanation: "It outputs the probability of a data point belonging to a certain class."
            },
            challenge: "What is the name of the 'S' shaped curve used in Logistic Regression?",
            starterCode: "const curve = '';",
            expectedOutput: "Sigmoid",
            hints: ["It squashes values between 0 and 1."]
          },
          {
            id: "ml_intermediate_2",
            title: "Decision Trees",
            estimatedMinutes: 35,
            xpReward: 25,
            content: "Decision Trees split data into branches based on feature values. They are very easy to interpret.\n\nfrom sklearn.tree import DecisionTreeClassifier",
            mcq: {
              question: "What is a major downside of very deep decision trees?",
              options: ["They are too slow", "They tend to overfit", "They cannot handle numbers", "They are too simple"],
              correctIndex: 1,
              explanation: "A deep tree can become too specific to the training data (overfitting)."
            },
            challenge: "What is the name for the 'leaf' nodes in a decision tree?",
            starterCode: "const nodeType = '';",
            expectedOutput: "Terminals",
            hints: ["They represent the final output or decision."]
          },
          {
            id: "ml_intermediate_3",
            title: "Random Forests",
            estimatedMinutes: 40,
            xpReward: 25,
            content: "A Random Forest is an ensemble of many decision trees. It uses 'bagging' to reduce overfitting and improve accuracy.\n\nfrom sklearn.ensemble import RandomForestClassifier",
            mcq: {
              question: "What is an 'Ensemble' method?",
              options: ["A single complex model", "A way to visualize data", "A combination of multiple models working together", "A data cleaning technique"],
              correctIndex: 2,
              explanation: "Ensemble methods combine multiple 'weak' learners to create a 'strong' learner."
            },
            challenge: "Does Random Forest usually perform better or worse than a single Decision Tree?",
            starterCode: "const answer = '';",
            expectedOutput: "Better",
            hints: ["Think about the 'wisdom of the crowd'."]
          },
          {
            id: "ml_intermediate_4",
            title: "K-Nearest Neighbors (KNN)",
            estimatedMinutes: 30,
            xpReward: 25,
            content: "KNN classifies a point based on the labels of its closest neighbors in the feature space.\n\nfrom sklearn.neighbors import KNeighborsClassifier",
            mcq: {
              question: "What does the 'K' in KNN stand for?",
              options: ["Kernel", "The number of neighbors to consider", "The distance metric", "Kinetic"],
              correctIndex: 1,
              explanation: "K is the number of nearest data points the algorithm looks at to make a decision."
            },
            challenge: "Is KNN a 'lazy learner' or an 'eager learner'?",
            starterCode: "const learnerType = '';",
            expectedOutput: "Lazy Learner",
            hints: ["It doesn't 'learn' a model; it just stores the data and waits for a query."]
          }
        ]
      },
      {
        id: "advanced", label: "Advanced", xpReward: 100,
        miniProject: {
          title: "Credit Card Fraud Detection",
          brief: "Build a model to detect fraudulent transactions in an imbalanced dataset.",
          expectedOutput: "A model optimized for recall to catch as many frauds as possible.",
          starterCode: "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import classification_report\n\n# Load imbalanced dataset (assume 'Class' column represents fraud: 1=Fraud, 0=Legit)\n# df = pd.read_csv(\"creditcard.csv\")\n\n# For handling imbalance, you could use class_weight='balanced'\nmodel = LogisticRegression(class_weight='balanced')\n\n# X_train, y_train = ...\n# model.fit(X_train, y_train)\n\n# preds = model.predict(X_test)\n# Focus on Recall for fraud class\n# print(classification_report(y_test, preds))"
        },
        lessons: [
          {
            id: "ml_advanced_0",
            title: "Introduction to Neural Networks",
            estimatedMinutes: 40,
            xpReward: 30,
            content: "Neural Networks are inspired by the human brain. They consist of layers of interconnected nodes (neurons).\n\nAn Artificial Neural Network (ANN) typically has an Input Layer, Hidden Layers, and an Output Layer.",
            mcq: {
              question: "What is the function that determines if a neuron should fire or not?",
              options: ["Loss function", "Activation function", "Gradient function", "Bias function"],
              correctIndex: 1,
              explanation: "Activation functions like ReLU or Sigmoid introduce non-linearity into the model."
            },
            challenge: "What is the name of the process used to train neural networks by adjusting weights?",
            starterCode: "const process = '';",
            expectedOutput: "Backpropagation",
            hints: ["It involves using derivatives to update weights."]
          },
          {
            id: "ml_advanced_1",
            title: "Support Vector Machines (SVM)",
            estimatedMinutes: 45,
            xpReward: 30,
            content: "SVM finds the optimal hyperplane that separates classes with the maximum margin.\n\nfrom sklearn.svm import SVC",
            mcq: {
              question: "What is the 'kernel trick' in SVM?",
              options: ["A way to speed up training", "A way to map data into a higher-dimensional space to make it linearly separable", "A way to delete outliers", "A way to compress the model"],
              correctIndex: 1,
              explanation: "Kernels allow SVM to handle non-linearly separable data by projecting it into higher dimensions."
            },
            challenge: "What are the data points closest to the hyperplane called?",
            starterCode: "const points = '';",
            expectedOutput: "Support Vectors",
            hints: ["The entire algorithm is named after them."]
          },
          {
            id: "ml_advanced_2",
            title: "Principal Component Analysis (PCA)",
            estimatedMinutes: 40,
            xpReward: 30,
            content: "PCA is a dimensionality reduction technique. It identifies the most important features (principal components) that explain the most variance.\n\nfrom sklearn.decomposition import PCA",
            mcq: {
              question: "Is PCA supervised or unsupervised?",
              options: ["Supervised", "Unsupervised", "Semi-supervised", "Reinforcement"],
              correctIndex: 1,
              explanation: "PCA doesn't use labels; it only looks at the structure of the input data."
            },
            challenge: "What is the main purpose of dimensionality reduction?",
            starterCode: "const purpose = '';",
            expectedOutput: "Simplify data",
            hints: ["It reduces the number of features while keeping the most important information."]
          },
          {
            id: "ml_advanced_3",
            title: "K-Means Clustering",
            estimatedMinutes: 35,
            xpReward: 30,
            content: "K-Means is an unsupervised algorithm that groups data points into K clusters based on similarity.\n\nfrom sklearn.cluster import KMeans",
            mcq: {
              question: "How does K-Means decide which cluster a point belongs to?",
              options: ["Based on labels", "Based on distance to the cluster centroid", "Randomly", "Based on the number of features"],
              correctIndex: 1,
              explanation: "Points are assigned to the cluster with the nearest mean (centroid)."
            },
            challenge: "What is the common method used to find the optimal 'K' value?",
            starterCode: "const method = '';",
            expectedOutput: "Elbow Method",
            hints: ["You look for a 'bend' in the plot of inertia vs K."]
          },
          {
            id: "ml_advanced_4",
            title: "Gradient Boosting",
            estimatedMinutes: 50,
            xpReward: 30,
            content: "Gradient Boosting builds models sequentially, each correcting the errors of the previous one. Popular implementations include XGBoost, LightGBM, and CatBoost.",
            mcq: {
              question: "What is the main difference between Bagging (Random Forest) and Boosting?",
              options: ["Bagging is sequential; Boosting is parallel", "Bagging is parallel; Boosting is sequential", "No difference", "Bagging uses trees; Boosting doesn't"],
              correctIndex: 1,
              explanation: "Boosting builds models one after another to fix mistakes, while Bagging builds them independently in parallel."
            },
            challenge: "Which of these is NOT a popular gradient boosting library?",
            starterCode: "const answer = ''; // XGBoost, LightGBM, or React",
            expectedOutput: "React",
            hints: ["One of these is a frontend library."]
          }
        ]
      }
    ],
  },

  7: {
    title: "C++ Fundamentals",
    domain: "Systems & Competitive Programming",
    lang: "C++",
    time: "14h",
    difficulty: "Advanced",
    color: "#ffab40",
    slogan: "The language that powers games, operating systems, and everything fast.",
    docs: { label: "cppreference.com", url: "https://en.cppreference.com/w/" },
    jobs: {
      roles: ["Software Engineer", "Game Developer", "Systems Programmer", "Competitive Programmer"],
      salary: "₹6 – 30 LPA",
    },
    youtube: {
      main: { title: "C++ Full Course for Beginners", channel: "freeCodeCamp", url: "https://www.youtube.com/watch?v=8jLOx1hD3_o" },
      extras: [
        { title: "C++ Tutorial for Beginners – Full Course", channel: "Bro Code", url: "https://www.youtube.com/watch?v=-TkoO8Z07hI" },
        { title: "C++ STL Full Course", channel: "Luv", url: "https://www.youtube.com/watch?v=RRVYpIET_RU" },
      ],
    },

    levels: [
      // ─────────────────────────── BEGINNER ───────────────────────────
      {
        id: "beginner",
        label: "Beginner",
        xpReward: 50,
        miniProject: {
          title: "Student grade calculator",
          brief:
            "Build a console program that: accepts names and scores for 5 students, calculates each student's letter grade (A/B/C/D/F), prints a formatted report table, and shows the class average, highest score, and lowest score. Use arrays, loops, and functions — no STL containers yet.",
          expectedOutput:
            "A formatted console table showing each student's name, score, and grade, followed by class statistics.",
          starterCode: "#include <iostream>\n#include <string>\nusing namespace std;\n\n// Function prototype\nchar calculateGrade(int score);\n\nint main() {\n    string names[5];\n    int scores[5];\n    \n    // Accept input\n    for(int i = 0; i < 5; i++) {\n        cout << \"Enter name and score for student \" << i+1 << \": \";\n        cin >> names[i] >> scores[i];\n    }\n    \n    // Process and print report\n    cout << \"\\n--- Grade Report ---\\n\";\n    for(int i = 0; i < 5; i++) {\n        cout << names[i] << \": \" << scores[i] << \" - \" << calculateGrade(scores[i]) << \"\\n\";\n    }\n    \n    return 0;\n}\n\nchar calculateGrade(int score) {\n    if(score >= 90) return 'A';\n    if(score >= 80) return 'B';\n    if(score >= 70) return 'C';\n    if(score >= 60) return 'D';\n    return 'F';\n}"
        },
        lessons: [
          {
            id: "beginner_0",
            title: "Your First C++ Program",
            estimatedMinutes: 20,
            xpReward: 20,
            setup: {
              windows: [
                "Download and install Visual Studio Community from https://visualstudio.microsoft.com — select 'Desktop development with C++' workload.",
                "OR install VS Code + MinGW: download MinGW from https://www.mingw-w64.org and add it to PATH.",
                "In VS Code install the 'C/C++' extension by Microsoft.",
                "Create a folder called fitry-cpp on your Desktop.",
                "Create a file called main.cpp inside it.",
                "To compile and run: open a terminal in that folder and type: g++ main.cpp -o main && .\\main",
              ],
              mac: [
                "Open Terminal and run: xcode-select --install to install the clang compiler.",
                "Download VS Code from https://code.visualstudio.com and install the 'C/C++' extension.",
                "Create a folder: mkdir ~/fitry-cpp && cd ~/fitry-cpp",
                "Create main.cpp: code main.cpp",
                "Compile and run: g++ main.cpp -o main && ./main",
              ],
            },
            content:
              "C++ is a compiled language — you write code, a compiler turns it into a machine-executable binary, then you run it.\n\n" +
              "Every C++ program starts here:\n\n" +
              "#include <iostream>\n" +
              "using namespace std;\n\n" +
              "int main() {\n" +
              "    cout << \"Hello, World!\" << endl;\n" +
              "    return 0;\n" +
              "}\n\n" +
              "Breaking it down:\n" +
              "- #include <iostream>    — imports the input/output library\n" +
              "- using namespace std;  — lets you write cout instead of std::cout\n" +
              "- int main()            — the entry point; every program starts here\n" +
              "- cout << \"text\"        — prints text to the console\n" +
              "- endl                  — ends the line (like pressing Enter)\n" +
              "- return 0;             — tells the OS the program finished successfully\n\n" +
              "Taking input from the user:\n" +
              "string name;\n" +
              "cout << \"Enter your name: \";\n" +
              "cin >> name;\n" +
              "cout << \"Hello, \" << name << endl;",
            mcq: {
              question: "What is the purpose of #include <iostream> in a C++ program?",
              options: [
                "It defines the main() function",
                "It imports the standard input/output library so you can use cout and cin",
                "It sets the namespace to std",
                "It compiles the program automatically",
              ],
              correctIndex: 1,
              explanation:
                "#include <iostream> includes the input/output stream library, which provides cout (console output) and cin (console input). Without it, the compiler does not know what cout means.",
            },
            challenge:
              "Write a program that asks for the user's name and favourite number, then prints a message like: 'Hello, Aryan! Your favourite number doubled is 42.'",
            starterCode:
              "#include <iostream>\n" +
              "using namespace std;\n\n" +
              "int main() {\n" +
              "    // TODO: declare a string variable for the name\n\n" +
              "    // TODO: declare an int variable for the favourite number\n\n" +
              "    // TODO: prompt the user and read both values with cin\n\n" +
              "    // TODO: print the message with the name and doubled number\n\n" +
              "    return 0;\n" +
              "}",
            expectedOutput: "Hello, Aryan! Your favourite number doubled is 42.",
            hints: [
              "string name; declares a string variable.",
              "int num; declares an integer.",
              "cin >> name >> num; reads both on one line.",
              "cout << \"Hello, \" << name << \"! Your favourite number doubled is \" << num * 2 << endl;",
            ],
          },
          {
            id: "beginner_1",
            title: "Variables, Data Types & Operators",
            estimatedMinutes: 25,
            xpReward: 20,
            content:
              "C++ is statically typed — every variable must have a declared type before use.\n\n" +
              "Core types:\n" +
              "int     age = 21;           // whole numbers\n" +
              "double  gpa = 3.75;         // decimal numbers (prefer over float)\n" +
              "char    grade = 'A';        // single character — use single quotes\n" +
              "string  name = \"Aryan\";     // text — use double quotes\n" +
              "bool    isPassed = true;    // true or false\n\n" +
              "Constants — values that never change:\n" +
              "const double PI = 3.14159;\n\n" +
              "Arithmetic operators:\n" +
              "+  -  *  /  %\n" +
              "// Integer division truncates: 7 / 2 = 3 (not 3.5)\n" +
              "// Cast to get a decimal: (double)7 / 2 = 3.5\n\n" +
              "Comparison operators (return bool):\n" +
              "==  !=  <  >  <=  >=\n\n" +
              "Logical operators:\n" +
              "&&  (AND)    ||  (OR)    !  (NOT)\n\n" +
              "Increment / decrement:\n" +
              "count++;   // count = count + 1\n" +
              "count--;   // count = count - 1",
            mcq: {
              question: "What is the result of 9 / 2 in C++ when both values are integers?",
              options: ["4.5", "4", "5", "Compiler error"],
              correctIndex: 1,
              explanation:
                "Integer division in C++ truncates the decimal part. 9 / 2 = 4, not 4.5. To get 4.5 you must cast at least one operand: (double)9 / 2 or 9.0 / 2.",
            },
            challenge:
              "Write a program that reads a temperature in Celsius and converts it to Fahrenheit and Kelvin. Formula: F = (C * 9/5) + 32, K = C + 273.15. Print both results to 2 decimal places.",
            starterCode:
              "#include <iostream>\n" +
              "#include <iomanip>   // for setprecision\n" +
              "using namespace std;\n\n" +
              "int main() {\n" +
              "    double celsius;\n" +
              "    cout << \"Enter temperature in Celsius: \";\n" +
              "    cin >> celsius;\n\n" +
              "    // TODO: calculate fahrenheit and kelvin\n\n" +
              "    // TODO: print both to 2 decimal places\n" +
              "    // Use: cout << fixed << setprecision(2) << value\n\n" +
              "    return 0;\n" +
              "}",
            expectedOutput:
              "For input 100: Fahrenheit: 212.00, Kelvin: 373.15",
            hints: [
              "double fahrenheit = (celsius * 9.0 / 5.0) + 32; — use 9.0 to avoid integer division.",
              "double kelvin = celsius + 273.15;",
              "cout << fixed << setprecision(2) << fahrenheit << endl; controls decimal places.",
            ],
          },
          {
            id: "beginner_2",
            title: "Conditionals & Loops",
            estimatedMinutes: 30,
            xpReward: 20,
            content:
              "Conditionals control which code runs:\n\n" +
              "if (score >= 90) {\n" +
              "    cout << \"Grade: A\" << endl;\n" +
              "} else if (score >= 75) {\n" +
              "    cout << \"Grade: B\" << endl;\n" +
              "} else {\n" +
              "    cout << \"Grade: C\" << endl;\n" +
              "}\n\n" +
              "Switch — cleaner for discrete values:\n" +
              "switch (day) {\n" +
              "    case 1: cout << \"Monday\"; break;\n" +
              "    case 2: cout << \"Tuesday\"; break;\n" +
              "    default: cout << \"Other\"; break;\n" +
              "}\n\n" +
              "Three loop types:\n\n" +
              "// for — when you know the count\n" +
              "for (int i = 0; i < 5; i++) {\n" +
              "    cout << i << \" \";\n" +
              "}\n\n" +
              "// while — when you don't know the count\n" +
              "int n = 1;\n" +
              "while (n <= 100) {\n" +
              "    n *= 2;\n" +
              "}\n\n" +
              "// do-while — runs at least once\n" +
              "int choice;\n" +
              "do {\n" +
              "    cout << \"Enter 1-3: \";\n" +
              "    cin >> choice;\n" +
              "} while (choice < 1 || choice > 3);\n\n" +
              "Loop control:\n" +
              "break;    — exit the loop immediately\n" +
              "continue; — skip to the next iteration",
            mcq: {
              question: "What happens if you forget the break statement in a switch case?",
              options: [
                "The program crashes with an error",
                "The compiler throws a warning and stops",
                "Execution falls through and runs the next case too",
                "The switch exits automatically after the first match",
              ],
              correctIndex: 2,
              explanation:
                "Without break, C++ switch 'falls through' — it continues executing code in the next case(s) until it hits a break or the end of the switch. This is a common bug for beginners.",
            },
            challenge:
              "Write a program that prints all prime numbers between 2 and 50. A number is prime if it has no divisors other than 1 and itself. Use nested loops.",
            starterCode:
              "#include <iostream>\n" +
              "using namespace std;\n\n" +
              "int main() {\n" +
              "    cout << \"Prime numbers between 2 and 50:\" << endl;\n\n" +
              "    for (int num = 2; num <= 50; num++) {\n" +
              "        bool isPrime = true;\n\n" +
              "        // TODO: loop from 2 to num-1\n" +
              "        // if num is divisible by any i, set isPrime = false and break\n\n" +
              "        // TODO: if isPrime is still true, print num\n" +
              "    }\n\n" +
              "    return 0;\n" +
              "}",
            expectedOutput: "2 3 5 7 11 13 17 19 23 29 31 37 41 43 47",
            hints: [
              "for (int i = 2; i < num; i++) — inner loop checks all divisors.",
              "if (num % i == 0) { isPrime = false; break; } — divisible means not prime.",
              "if (isPrime) cout << num << \" \"; — print after the inner loop.",
            ],
          },
          {
            id: "beginner_3",
            title: "Functions",
            estimatedMinutes: 30,
            xpReward: 20,
            content:
              "Functions let you reuse code. In C++, you must declare the return type and parameter types.\n\n" +
              "// Syntax: returnType functionName(paramType param, ...) { }\n\n" +
              "int add(int a, int b) {\n" +
              "    return a + b;\n" +
              "}\n\n" +
              "void greet(string name) {   // void = returns nothing\n" +
              "    cout << \"Hello, \" << name << endl;\n" +
              "}\n\n" +
              "// Call them:\n" +
              "int result = add(3, 7);   // result = 10\n" +
              "greet(\"Aryan\");            // prints Hello, Aryan\n\n" +
              "Function prototypes — declare before main, define after:\n\n" +
              "// Prototype at the top\n" +
              "int multiply(int a, int b);\n\n" +
              "int main() {\n" +
              "    cout << multiply(4, 5) << endl;\n" +
              "    return 0;\n" +
              "}\n\n" +
              "// Definition below\n" +
              "int multiply(int a, int b) {\n" +
              "    return a * b;\n" +
              "}\n\n" +
              "Default parameters:\n" +
              "void printLine(char ch = '-', int len = 30) {\n" +
              "    for (int i = 0; i < len; i++) cout << ch;\n" +
              "    cout << endl;\n" +
              "}\n" +
              "printLine();          // prints 30 dashes\n" +
              "printLine('=', 20);   // prints 20 equals signs",
            mcq: {
              question: "What does void mean as a function return type in C++?",
              options: [
                "The function returns 0 by default",
                "The function returns an empty string",
                "The function does not return any value",
                "The function can return any type",
              ],
              correctIndex: 2,
              explanation:
                "void means the function performs an action but does not return a value to the caller. You cannot assign the result of a void function to a variable.",
            },
            challenge:
              "Write four functions: factorial(n) returns n!, isPrime(n) returns true/false, power(base, exp) returns base^exp without using pow(), and printSeparator(char, int) prints a line of repeated characters. Call all four in main.",
            starterCode:
              "#include <iostream>\n" +
              "using namespace std;\n\n" +
              "// TODO: declare prototypes for all four functions\n\n" +
              "int main() {\n" +
              "    cout << \"5! = \" << factorial(5) << endl;          // 120\n" +
              "    cout << \"7 prime? \" << isPrime(7) << endl;        // 1 (true)\n" +
              "    cout << \"2^10 = \" << power(2, 10) << endl;        // 1024\n" +
              "    printSeparator('=', 20);                          // ====================\n" +
              "    return 0;\n" +
              "}\n\n" +
              "// TODO: define factorial(int n) — use a loop\n\n" +
              "// TODO: define isPrime(int n) — return bool\n\n" +
              "// TODO: define power(int base, int exp) — use a loop\n\n" +
              "// TODO: define printSeparator(char ch, int len) — void",
            expectedOutput: "5! = 120\n7 prime? 1\n2^10 = 1024\n====================",
            hints: [
              "factorial: int result = 1; for (int i = 2; i <= n; i++) result *= i; return result;",
              "isPrime: loop from 2 to n-1, return false if any i divides n evenly.",
              "power: int result = 1; for (int i = 0; i < exp; i++) result *= base;",
              "printSeparator: for loop printing ch, then cout << endl;",
            ],
          },
          {
            id: "beginner_4",
            title: "Arrays & Strings",
            estimatedMinutes: 30,
            xpReward: 20,
            content:
              "Arrays store multiple values of the same type in contiguous memory.\n\n" +
              "// Declare and initialise:\n" +
              "int scores[5] = {85, 92, 78, 95, 60};\n" +
              "string names[3] = {\"Aryan\", \"Priya\", \"Rahul\"};\n\n" +
              "// Access by index (0-based):\n" +
              "cout << scores[0];   // 85\n" +
              "cout << names[2];    // Rahul\n\n" +
              "// Loop through:\n" +
              "for (int i = 0; i < 5; i++) {\n" +
              "    cout << scores[i] << \" \";\n" +
              "}\n\n" +
              "// Range-based for loop (C++11):\n" +
              "for (int score : scores) {\n" +
              "    cout << score << \" \";\n" +
              "}\n\n" +
              "Strings in C++:\n" +
              "#include <string>\n\n" +
              "string s = \"Hello\";\n" +
              "s.length();          // 5\n" +
              "s + \" World\";        // concatenation\n" +
              "s[0];                // 'H'\n" +
              "s.substr(1, 3);      // \"ell\" (start, length)\n" +
              "s.find(\"ll\");        // 2 (index)\n" +
              "s.toupper() — not built in; use transform() or loop with toupper(c)\n\n" +
              "Reading a full line (with spaces):\n" +
              "string line;\n" +
              "getline(cin, line);",
            mcq: {
              question: "What is the index of the last element in an array declared as int arr[6]?",
              options: ["6", "5", "4", "-1"],
              correctIndex: 1,
              explanation:
                "Arrays are zero-indexed. An array of size 6 has valid indices 0 through 5. Accessing arr[6] is undefined behaviour — a common source of crashes.",
            },
            challenge:
              "Write a program that reads 5 integers into an array, then prints: the array in reverse, the sum, the average, the maximum, and the minimum — all using separate functions.",
            starterCode:
              "#include <iostream>\n" +
              "using namespace std;\n\n" +
              "const int SIZE = 5;\n\n" +
              "// TODO: declare prototypes\n" +
              "void printReverse(int arr[], int size);\n" +
              "int  getSum(int arr[], int size);\n" +
              "int  getMax(int arr[], int size);\n" +
              "int  getMin(int arr[], int size);\n\n" +
              "int main() {\n" +
              "    int nums[SIZE];\n" +
              "    cout << \"Enter 5 integers: \";\n" +
              "    for (int i = 0; i < SIZE; i++) cin >> nums[i];\n\n" +
              "    cout << \"Reversed: \";  printReverse(nums, SIZE);\n" +
              "    cout << \"Sum: \"      << getSum(nums, SIZE) << endl;\n" +
              "    cout << \"Average: \"  << (double)getSum(nums, SIZE) / SIZE << endl;\n" +
              "    cout << \"Max: \"      << getMax(nums, SIZE) << endl;\n" +
              "    cout << \"Min: \"      << getMin(nums, SIZE) << endl;\n" +
              "    return 0;\n" +
              "}\n\n" +
              "// TODO: define all four functions below",
            expectedOutput:
              "For input 3 1 4 1 5: Reversed: 5 1 4 1 3, Sum: 14, Average: 2.8, Max: 5, Min: 1",
            hints: [
              "printReverse: loop from size-1 down to 0.",
              "getSum: accumulate with a for loop, return total.",
              "getMax: set max = arr[0], loop and update if arr[i] > max.",
              "getMin: same pattern but check arr[i] < min.",
            ],
          },
        ],
      },

      // ─────────────────────────── INTERMEDIATE ───────────────────────────
      {
        id: "intermediate",
        label: "Intermediate",
        xpReward: 75,
        miniProject: {
          title: "Bank account management system",
          brief:
            "Build a console-based bank app using classes. It must support: creating accounts with name and initial deposit, depositing money, withdrawing (with insufficient-funds check), checking balance, and printing a full transaction history. Use a class with private members, a vector of transaction structs, and at least one static member for total accounts created.",
          expectedOutput:
            "A menu-driven console app where users can create an account, deposit, withdraw, and view transaction history.",
          starterCode: "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nstruct Transaction {\n    string type;\n    double amount;\n};\n\nclass BankAccount {\nprivate:\n    string ownerName;\n    double balance;\n    vector<Transaction> history;\n    static int totalAccounts;\n\npublic:\n    BankAccount(string name, double initialDeposit) {\n        ownerName = name;\n        balance = initialDeposit;\n        history.push_back({\"Deposit\", initialDeposit});\n        totalAccounts++;\n    }\n\n    void deposit(double amount) {\n        // Implementation\n    }\n\n    bool withdraw(double amount) {\n        // Implementation with check\n        return true;\n    }\n    \n    // Additional getters and history printing...\n};\n\nint BankAccount::totalAccounts = 0;\n\nint main() {\n    BankAccount myAccount(\"Alice\", 1000);\n    return 0;\n}"
        },
        lessons: [
          {
            id: "intermediate_0",
            title: "Pointers & References",
            estimatedMinutes: 35,
            xpReward: 20,
            content:
              "A pointer stores the memory address of another variable. A reference is an alias for an existing variable.\n\n" +
              "Pointers:\n" +
              "int x = 10;\n" +
              "int* ptr = &x;     // ptr holds the address of x\n" +
              "cout << ptr;       // prints the address (e.g. 0x7fff...)\n" +
              "cout << *ptr;      // dereference: prints 10\n" +
              "*ptr = 20;         // changes x to 20 through the pointer\n\n" +
              "References (simpler, safer than pointers for most use cases):\n" +
              "int y = 5;\n" +
              "int& ref = y;      // ref is another name for y\n" +
              "ref = 99;          // y is now 99\n\n" +
              "Pass by reference vs pass by value:\n\n" +
              "// By value — a copy is made, original unchanged:\n" +
              "void doubleVal(int n) { n *= 2; }\n\n" +
              "// By reference — modifies the original:\n" +
              "void doubleRef(int& n) { n *= 2; }\n\n" +
              "// By pointer — also modifies the original:\n" +
              "void doublePtr(int* n) { *n *= 2; }\n\n" +
              "int a = 5;\n" +
              "doubleRef(a);   // a is now 10\n\n" +
              "Nullptr — the safe null pointer (use instead of NULL):\n" +
              "int* p = nullptr;",
            mcq: {
              question: "What does the dereference operator (*) do when applied to a pointer?",
              options: [
                "Returns the memory address stored in the pointer",
                "Deletes the pointer from memory",
                "Accesses the value stored at the address the pointer points to",
                "Creates a copy of the pointer",
              ],
              correctIndex: 2,
              explanation:
                "The * operator on a pointer dereferences it — it goes to the address the pointer holds and accesses the value there. The & operator gets the address of a variable.",
            },
            challenge:
              "Write a swap(a, b) function that actually swaps two integers using references. Then write a swapPtr(a, b) version using pointers. Verify both work in main.",
            starterCode:
              "#include <iostream>\n" +
              "using namespace std;\n\n" +
              "// TODO: write swap using references\n" +
              "void swapRef(int& a, int& b) {\n" +
              "    // TODO: swap a and b using a temp variable\n" +
              "}\n\n" +
              "// TODO: write swap using pointers\n" +
              "void swapPtr(int* a, int* b) {\n" +
              "    // TODO: dereference and swap\n" +
              "}\n\n" +
              "int main() {\n" +
              "    int x = 10, y = 20;\n\n" +
              "    cout << \"Before: x=\" << x << \", y=\" << y << endl;\n" +
              "    swapRef(x, y);\n" +
              "    cout << \"After swapRef: x=\" << x << \", y=\" << y << endl;\n\n" +
              "    swapPtr(&x, &y);\n" +
              "    cout << \"After swapPtr: x=\" << x << \", y=\" << y << endl;\n\n" +
              "    return 0;\n" +
              "}",
            expectedOutput:
              "Before: x=10, y=20\nAfter swapRef: x=20, y=10\nAfter swapPtr: x=10, y=20",
            hints: [
              "int temp = a; a = b; b = temp; — the classic three-step swap.",
              "swapRef takes int& a, int& b — no & needed when calling: swapRef(x, y).",
              "swapPtr takes int* a — dereference inside: int temp = *a; *a = *b; *b = temp;",
              "Pass addresses when calling swapPtr: swapPtr(&x, &y);",
            ],
          },
          {
            id: "intermediate_1",
            title: "Classes & Objects",
            estimatedMinutes: 40,
            xpReward: 20,
            content:
              "A class is a blueprint for creating objects. It bundles data (members) and behaviour (methods).\n\n" +
              "class Student {\n" +
              "private:\n" +
              "    string name;    // only accessible inside the class\n" +
              "    int score;\n\n" +
              "public:\n" +
              "    // Constructor — runs when object is created\n" +
              "    Student(string n, int s) {\n" +
              "        name = n;\n" +
              "        score = s;\n" +
              "    }\n\n" +
              "    // Getter methods\n" +
              "    string getName() { return name; }\n" +
              "    int getScore() { return score; }\n\n" +
              "    // Method\n" +
              "    string getGrade() {\n" +
              "        if (score >= 90) return \"A\";\n" +
              "        if (score >= 75) return \"B\";\n" +
              "        return \"C\";\n" +
              "    }\n\n" +
              "    // Destructor — runs when object is destroyed\n" +
              "    ~Student() {\n" +
              "        cout << name << \" removed\" << endl;\n" +
              "    }\n" +
              "};\n\n" +
              "// Creating objects:\n" +
              "Student s1(\"Aryan\", 88);\n" +
              "cout << s1.getName() << \": \" << s1.getGrade() << endl;",
            mcq: {
              question: "What is the purpose of the private access specifier in a C++ class?",
              options: [
                "It makes the class faster to compile",
                "It prevents other parts of the program from directly accessing those members",
                "It marks members that cannot be modified after construction",
                "It hides the class from the linker",
              ],
              correctIndex: 1,
              explanation:
                "private members can only be accessed from within the class itself. This is encapsulation — hiding internal data and exposing only what is needed through public methods. It prevents accidental misuse.",
            },
            challenge:
              "Build a Rectangle class with private width and height, a constructor, getArea(), getPerimeter(), isSquare() methods, and a static member totalRectangles that counts how many Rectangle objects have been created.",
            starterCode:
              "#include <iostream>\n" +
              "using namespace std;\n\n" +
              "class Rectangle {\n" +
              "private:\n" +
              "    double width;\n" +
              "    double height;\n" +
              "    // TODO: add a static int totalRectangles\n\n" +
              "public:\n" +
              "    // TODO: constructor(double w, double h) — also increment totalRectangles\n\n" +
              "    // TODO: getArea() returns width * height\n\n" +
              "    // TODO: getPerimeter() returns 2 * (width + height)\n\n" +
              "    // TODO: isSquare() returns true if width == height\n\n" +
              "    // TODO: static getCount() returns totalRectangles\n" +
              "};\n\n" +
              "// TODO: initialise the static member outside the class:\n" +
              "// int Rectangle::totalRectangles = 0;\n\n" +
              "int main() {\n" +
              "    Rectangle r1(4.0, 6.0);\n" +
              "    Rectangle r2(5.0, 5.0);\n\n" +
              "    cout << \"r1 area: \" << r1.getArea() << endl;          // 24\n" +
              "    cout << \"r1 perimeter: \" << r1.getPerimeter() << endl; // 20\n" +
              "    cout << \"r1 square? \" << r1.isSquare() << endl;        // 0\n" +
              "    cout << \"r2 square? \" << r2.isSquare() << endl;        // 1\n" +
              "    cout << \"Total: \" << Rectangle::getCount() << endl;    // 2\n" +
              "    return 0;\n" +
              "}",
            expectedOutput:
              "r1 area: 24\nr1 perimeter: 20\nr1 square? 0\nr2 square? 1\nTotal: 2",
            hints: [
              "static int totalRectangles; inside class, then int Rectangle::totalRectangles = 0; outside.",
              "In the constructor body: totalRectangles++;",
              "static int getCount() { return totalRectangles; } — static methods accessed via ClassName::method().",
              "isSquare: return width == height;",
            ],
          },
          {
            id: "intermediate_2",
            title: "Inheritance & Polymorphism",
            estimatedMinutes: 40,
            xpReward: 20,
            content:
              "Inheritance lets a class reuse and extend another class.\n\n" +
              "class Animal {\n" +
              "protected:\n" +
              "    string name;\n" +
              "public:\n" +
              "    Animal(string n) : name(n) {}\n\n" +
              "    virtual string speak() {      // virtual = can be overridden\n" +
              "        return name + \" makes a sound\";\n" +
              "    }\n\n" +
              "    virtual ~Animal() {}          // virtual destructor — always add this\n" +
              "};\n\n" +
              "class Dog : public Animal {\n" +
              "public:\n" +
              "    Dog(string n) : Animal(n) {}  // pass to parent constructor\n\n" +
              "    string speak() override {     // override keyword catches typos\n" +
              "        return name + \" says Woof!\";\n" +
              "    }\n" +
              "};\n\n" +
              "// Polymorphism — one interface, many behaviours:\n" +
              "Animal* animals[2];\n" +
              "animals[0] = new Dog(\"Rex\");\n" +
              "animals[1] = new Animal(\"Ghost\");\n\n" +
              "for (int i = 0; i < 2; i++) {\n" +
              "    cout << animals[i]->speak() << endl;  // calls the right version!\n" +
              "    delete animals[i];\n" +
              "}\n\n" +
              "Pure virtual functions — force subclasses to implement:\n" +
              "virtual double area() = 0;   // makes the class abstract",
            mcq: {
              question: "Why should you declare a destructor as virtual in a base class?",
              options: [
                "To make the class abstract",
                "To ensure the derived class destructor is called when deleting via a base pointer",
                "To prevent the object from being destroyed",
                "To speed up memory deallocation",
              ],
              correctIndex: 1,
              explanation:
                "Without a virtual destructor, deleting a derived object through a base class pointer only calls the base destructor — the derived destructor is skipped, causing memory leaks. virtual ensures the correct destructor chain runs.",
            },
            challenge:
              "Build an abstract Shape base class with a pure virtual area() method. Create Circle, Rectangle, and Triangle subclasses. Store all three in an array of Shape pointers and print each shape's area using polymorphism.",
            starterCode:
              "#include <iostream>\n" +
              "#include <cmath>\n" +
              "using namespace std;\n\n" +
              "// TODO: define abstract Shape class\n" +
              "// - pure virtual double area() = 0\n" +
              "// - pure virtual string name() = 0\n" +
              "// - virtual ~Shape() {}\n\n" +
              "// TODO: define Circle : public Shape\n" +
              "// - constructor(double radius)\n" +
              "// - area() = M_PI * r * r\n" +
              "// - name() = \"Circle\"\n\n" +
              "// TODO: define Rectangle : public Shape\n" +
              "// - constructor(double w, double h)\n" +
              "// - area() = w * h\n" +
              "// - name() = \"Rectangle\"\n\n" +
              "// TODO: define Triangle : public Shape\n" +
              "// - constructor(double b, double h)\n" +
              "// - area() = 0.5 * b * h\n" +
              "// - name() = \"Triangle\"\n\n" +
              "int main() {\n" +
              "    Shape* shapes[3];\n" +
              "    shapes[0] = new Circle(5);\n" +
              "    shapes[1] = new Rectangle(4, 6);\n" +
              "    shapes[2] = new Triangle(3, 8);\n\n" +
              "    for (int i = 0; i < 3; i++) {\n" +
              "        cout << shapes[i]->name() << \" area: \" << shapes[i]->area() << endl;\n" +
              "        delete shapes[i];\n" +
              "    }\n" +
              "    return 0;\n" +
              "}",
            expectedOutput:
              "Circle area: 78.5398\nRectangle area: 24\nTriangle area: 12",
            hints: [
              "class Circle : public Shape { private: double r; public: Circle(double radius) : r(radius) {} ... };",
              "double area() override { return M_PI * r * r; }",
              "A pure virtual function makes Shape abstract — you can't create a Shape object directly.",
              "Always delete dynamically allocated objects to prevent memory leaks.",
            ],
          },
          {
            id: "intermediate_3",
            title: "STL — Vectors & Maps",
            estimatedMinutes: 35,
            xpReward: 20,
            content:
              "The Standard Template Library (STL) gives you ready-made, optimised data structures.\n\n" +
              "vector — a dynamic array that grows automatically:\n\n" +
              "#include <vector>\n\n" +
              "vector<int> scores;\n" +
              "scores.push_back(85);\n" +
              "scores.push_back(92);\n" +
              "scores.size();         // 2\n" +
              "scores[0];             // 85\n" +
              "scores.pop_back();     // removes last\n\n" +
              "for (int s : scores) cout << s << \" \";\n\n" +
              "map — key-value store, keys automatically sorted:\n\n" +
              "#include <map>\n\n" +
              "map<string, int> wordCount;\n" +
              "wordCount[\"hello\"]++;\n" +
              "wordCount[\"world\"]++;\n" +
              "wordCount[\"hello\"]++;   // hello = 2\n\n" +
              "// Check if key exists:\n" +
              "if (wordCount.count(\"hello\")) { ... }\n\n" +
              "// Iterate:\n" +
              "for (auto& [key, val] : wordCount) {\n" +
              "    cout << key << \": \" << val << endl;\n" +
              "}\n\n" +
              "unordered_map — faster lookup (O(1) average), no sorting:\n" +
              "#include <unordered_map>\n" +
              "unordered_map<string, int> freq;",
            mcq: {
              question: "What is the time complexity of looking up a key in a std::map vs std::unordered_map?",
              options: [
                "O(1) for both",
                "O(log n) for map, O(1) average for unordered_map",
                "O(n) for map, O(log n) for unordered_map",
                "O(log n) for both",
              ],
              correctIndex: 1,
              explanation:
                "std::map is implemented as a red-black tree — lookup is O(log n). std::unordered_map uses a hash table — lookup is O(1) on average. Use map when you need sorted keys; unordered_map when you need speed.",
            },
            challenge:
              "Write a program that reads a sentence from the user, counts the frequency of each word using an unordered_map, then prints the words sorted by frequency (highest first) using a vector of pairs.",
            starterCode:
              "#include <iostream>\n" +
              "#include <string>\n" +
              "#include <unordered_map>\n" +
              "#include <vector>\n" +
              "#include <algorithm>\n" +
              "#include <sstream>\n" +
              "using namespace std;\n\n" +
              "int main() {\n" +
              "    string sentence;\n" +
              "    cout << \"Enter a sentence: \";\n" +
              "    getline(cin, sentence);\n\n" +
              "    unordered_map<string, int> freq;\n\n" +
              "    // TODO: split sentence into words using istringstream\n" +
              "    // and count frequency of each word in freq\n\n" +
              "    // TODO: copy map to vector<pair<string,int>>\n" +
              "    // sort descending by count\n\n" +
              "    // TODO: print each word and its count\n\n" +
              "    return 0;\n" +
              "}",
            expectedOutput:
              "For 'the cat sat on the mat the cat': the: 3, cat: 2, sat: 1, on: 1, mat: 1",
            hints: [
              "istringstream ss(sentence); string word; while (ss >> word) freq[word]++;",
              "vector<pair<string,int>> v(freq.begin(), freq.end());",
              "sort(v.begin(), v.end(), [](auto& a, auto& b){ return a.second > b.second; });",
              "for (auto& [word, count] : v) cout << word << \": \" << count << endl;",
            ],
          },
          {
            id: "intermediate_4",
            title: "File I/O",
            estimatedMinutes: 30,
            xpReward: 20,
            content:
              "C++ can read from and write to files using fstream.\n\n" +
              "#include <fstream>\n\n" +
              "Writing to a file:\n" +
              "ofstream outFile(\"scores.txt\");\n" +
              "if (outFile.is_open()) {\n" +
              "    outFile << \"Aryan 88\" << endl;\n" +
              "    outFile << \"Priya 95\" << endl;\n" +
              "    outFile.close();\n" +
              "}\n\n" +
              "Reading from a file — line by line:\n" +
              "ifstream inFile(\"scores.txt\");\n" +
              "string line;\n" +
              "while (getline(inFile, line)) {\n" +
              "    cout << line << endl;\n" +
              "}\n" +
              "inFile.close();\n\n" +
              "Append mode (don't overwrite):\n" +
              "ofstream log(\"log.txt\", ios::app);\n" +
              "log << \"New entry\" << endl;\n\n" +
              "Always check if the file opened:\n" +
              "if (!inFile) {\n" +
              "    cerr << \"Error: could not open file\" << endl;\n" +
              "    return 1;\n" +
              "}",
            mcq: {
              question: "Which flag do you pass to ofstream to append to an existing file instead of overwriting it?",
              options: ["ios::in", "ios::trunc", "ios::app", "ios::out"],
              correctIndex: 2,
              explanation:
                "ios::app (append mode) moves the write position to the end of the file so new content is added after existing content. Without this flag, ofstream truncates the file to zero length on open.",
            },
            challenge:
              "Write a program that: saves a list of 5 student records (name, score) to students.txt, then reads the file back and prints each student with their letter grade. The write and read should be separate functions.",
            starterCode:
              "#include <iostream>\n" +
              "#include <fstream>\n" +
              "#include <string>\n" +
              "using namespace std;\n\n" +
              "string getGrade(int score) {\n" +
              "    if (score >= 90) return \"A\";\n" +
              "    if (score >= 75) return \"B\";\n" +
              "    if (score >= 60) return \"C\";\n" +
              "    if (score >= 50) return \"D\";\n" +
              "    return \"F\";\n" +
              "}\n\n" +
              "// TODO: void saveStudents(string filename)\n" +
              "// Hard-code 5 students and write them to the file\n" +
              "// Format per line: Name Score  (e.g. \"Aryan 88\")\n\n" +
              "// TODO: void loadAndPrint(string filename)\n" +
              "// Read each line, parse name and score, print with grade\n\n" +
              "int main() {\n" +
              "    saveStudents(\"students.txt\");\n" +
              "    loadAndPrint(\"students.txt\");\n" +
              "    return 0;\n" +
              "}",
            expectedOutput:
              "Aryan: 88 — B\nPriya: 95 — A\nRahul: 72 — C\nSneha: 55 — D\nDev: 40 — F",
            hints: [
              "ofstream out(filename); out << \"Aryan 88\" << endl; ... out.close();",
              "ifstream in(filename); string name; int score; while (in >> name >> score) { ... }",
              "cout << name << \": \" << score << \" — \" << getGrade(score) << endl;",
            ],
          },
        ],
      },

      // ─────────────────────────── ADVANCED ───────────────────────────
      {
        id: "advanced",
        label: "Advanced",
        xpReward: 100,
        miniProject: {
          title: "Mini text-based RPG",
          brief:
            "Build a console-based RPG using OOP and STL. It must have: a Player class with hp, attack, level, and inventory (vector), an Enemy hierarchy (at least 2 enemy types using inheritance and polymorphism), a combat system where turns alternate, items that can be picked up and used, and the game state saved and loaded from a file. Use smart pointers (unique_ptr) instead of raw new/delete.",
          expectedOutput:
            "A playable console RPG with combat, inventory, multiple enemy types, and save/load functionality.",
          starterCode: "#include <iostream>\n#include <vector>\n#include <memory>\nusing namespace std;\n\nclass Enemy {\npublic:\n    virtual void attack() = 0;\n    virtual ~Enemy() = default;\n};\n\nclass Goblin : public Enemy {\npublic:\n    void attack() override { cout << \"Goblin slashes for 10 damage!\\n\"; }\n};\n\nclass Dragon : public Enemy {\npublic:\n    void attack() override { cout << \"Dragon breathes fire for 50 damage!\\n\"; }\n};\n\nclass Player {\n    int hp = 100;\n    vector<string> inventory;\npublic:\n    void useItem(int index) { /* Implementation */ }\n};\n\nint main() {\n    unique_ptr<Enemy> enemy = make_unique<Goblin>();\n    enemy->attack();\n    \n    return 0;\n}"
        },
        lessons: [
          {
            id: "advanced_0",
            title: "Templates",
            estimatedMinutes: 35,
            xpReward: 20,
            content:
              "Templates let you write code that works with any data type — the foundation of the STL.\n\n" +
              "Function template:\n\n" +
              "template <typename T>\n" +
              "T maxOf(T a, T b) {\n" +
              "    return (a > b) ? a : b;\n" +
              "}\n\n" +
              "// Works for any comparable type:\n" +
              "cout << maxOf(3, 7);          // 7 (int)\n" +
              "cout << maxOf(3.14, 2.71);    // 3.14 (double)\n" +
              "cout << maxOf('a', 'z');      // z (char)\n\n" +
              "Class template:\n\n" +
              "template <typename T>\n" +
              "class Stack {\n" +
              "private:\n" +
              "    vector<T> data;\n" +
              "public:\n" +
              "    void push(T val) { data.push_back(val); }\n" +
              "    T pop() {\n" +
              "        T top = data.back();\n" +
              "        data.pop_back();\n" +
              "        return top;\n" +
              "    }\n" +
              "    bool empty() { return data.empty(); }\n" +
              "    T peek() { return data.back(); }\n" +
              "};\n\n" +
              "Stack<int> intStack;\n" +
              "Stack<string> strStack;\n\n" +
              "Multiple type parameters:\n" +
              "template <typename K, typename V>\n" +
              "class Pair {\n" +
              "public:\n" +
              "    K first;\n" +
              "    V second;\n" +
              "    Pair(K f, V s) : first(f), second(s) {}\n" +
              "};",
            mcq: {
              question: "What is the main advantage of using templates over writing separate functions for each type?",
              options: [
                "Templates run faster than type-specific functions",
                "Templates let you write one implementation that works for any type, avoiding code duplication",
                "Templates skip type-checking at compile time",
                "Templates automatically convert between types",
              ],
              correctIndex: 1,
              explanation:
                "Templates achieve generic programming — one implementation that the compiler instantiates for each type used. This eliminates code duplication while retaining full type safety. The compiler generates type-specific code at compile time.",
            },
            challenge:
              "Implement a generic Stack<T> class template with push, pop, peek, isEmpty, and size methods. Then implement a generic swap<T> function template. Test both with int, double, and string.",
            starterCode:
              "#include <iostream>\n" +
              "#include <vector>\n" +
              "#include <string>\n" +
              "using namespace std;\n\n" +
              "// TODO: implement Stack<T> class template\n" +
              "// Members: push(T), pop() returns T, peek() returns T,\n" +
              "//          isEmpty() returns bool, size() returns int\n\n" +
              "// TODO: implement swap<T> function template\n\n" +
              "int main() {\n" +
              "    Stack<int> s;\n" +
              "    s.push(1); s.push(2); s.push(3);\n" +
              "    cout << s.pop() << endl;   // 3\n" +
              "    cout << s.peek() << endl;  // 2\n" +
              "    cout << s.size() << endl;  // 2\n\n" +
              "    Stack<string> ss;\n" +
              "    ss.push(\"hello\"); ss.push(\"world\");\n" +
              "    cout << ss.pop() << endl;  // world\n\n" +
              "    int a = 10, b = 20;\n" +
              "    swapT(a, b);\n" +
              "    cout << a << \" \" << b << endl;  // 20 10\n\n" +
              "    string x = \"foo\", y = \"bar\";\n" +
              "    swapT(x, y);\n" +
              "    cout << x << \" \" << y << endl;  // bar foo\n\n" +
              "    return 0;\n" +
              "}",
            expectedOutput: "3\n2\n2\nworld\n20 10\nbar foo",
            hints: [
              "template <typename T> class Stack { private: vector<T> data; ... };",
              "T pop() { T val = data.back(); data.pop_back(); return val; }",
              "template <typename T> void swapT(T& a, T& b) { T tmp = a; a = b; b = tmp; }",
              "The compiler generates separate Stack<int> and Stack<string> versions automatically.",
            ],
          },
          {
            id: "advanced_1",
            title: "Smart Pointers & Memory Management",
            estimatedMinutes: 35,
            xpReward: 20,
            content:
              "Raw pointers are error-prone — you can forget to delete, delete twice, or access after delete. Smart pointers fix this automatically.\n\n" +
              "#include <memory>\n\n" +
              "unique_ptr — single owner, auto-deleted when it goes out of scope:\n\n" +
              "unique_ptr<int> p = make_unique<int>(42);\n" +
              "cout << *p << endl;   // 42\n" +
              "// No need to delete — happens automatically\n\n" +
              "// Cannot copy, only move:\n" +
              "unique_ptr<int> p2 = move(p);   // p is now null\n\n" +
              "shared_ptr — multiple owners, deleted when last owner is gone:\n\n" +
              "shared_ptr<string> s1 = make_shared<string>(\"hello\");\n" +
              "shared_ptr<string> s2 = s1;   // both own the string\n" +
              "cout << s1.use_count() << endl;  // 2\n\n" +
              "weak_ptr — observes a shared_ptr without owning (breaks cycles):\n\n" +
              "weak_ptr<string> w = s1;\n" +
              "if (auto locked = w.lock()) {\n" +
              "    cout << *locked << endl;\n" +
              "}\n\n" +
              "Rule of thumb:\n" +
              "- Use unique_ptr by default\n" +
              "- Use shared_ptr only when shared ownership is genuinely needed\n" +
              "- Avoid raw new/delete in modern C++",
            mcq: {
              question: "When is the object managed by a unique_ptr automatically destroyed?",
              options: [
                "When you call delete on the unique_ptr",
                "When the unique_ptr goes out of scope or is reassigned",
                "When the program exits",
                "Only when you explicitly call reset()",
              ],
              correctIndex: 1,
              explanation:
                "unique_ptr uses RAII (Resource Acquisition Is Initialisation) — the destructor automatically deletes the managed object when the unique_ptr goes out of scope, is reset, or is assigned a new value. This prevents memory leaks without manual delete.",
            },
            challenge:
              "Refactor a class that uses raw new/delete to use unique_ptr and shared_ptr instead. The class manages a dynamically allocated array of scores.",
            starterCode:
              "#include <iostream>\n" +
              "#include <memory>\n" +
              "#include <vector>\n" +
              "using namespace std;\n\n" +
              "// BEFORE — raw pointer version (do not change this):\n" +
              "class OldScoreBoard {\n" +
              "    int* scores;\n" +
              "    int size;\n" +
              "public:\n" +
              "    OldScoreBoard(int n) : size(n) { scores = new int[n]{}; }\n" +
              "    ~OldScoreBoard() { delete[] scores; }\n" +
              "    void set(int i, int v) { scores[i] = v; }\n" +
              "    int get(int i) { return scores[i]; }\n" +
              "};\n\n" +
              "// TODO: create SmartScoreBoard using vector<int> (no raw pointers)\n" +
              "// Same interface: constructor(int n), set(i, v), get(i)\n\n" +
              "// TODO: in main, create a shared_ptr<SmartScoreBoard>\n" +
              "// share ownership with a second shared_ptr\n" +
              "// print use_count before and after one goes out of scope\n\n" +
              "int main() {\n" +
              "    // TODO: test SmartScoreBoard via shared_ptr\n" +
              "    return 0;\n" +
              "}",
            expectedOutput:
              "Scores set and retrieved correctly. use_count drops from 2 to 1 when second pointer leaves scope.",
            hints: [
              "Use vector<int> scores(n, 0); in SmartScoreBoard instead of new int[n].",
              "auto board = make_shared<SmartScoreBoard>(5);",
              "{ auto board2 = board; cout << board.use_count(); } // use_count = 2 here",
              "After board2's block ends, use_count drops back to 1 automatically.",
            ],
          },
          {
            id: "advanced_2",
            title: "STL Algorithms & Lambda Expressions",
            estimatedMinutes: 35,
            xpReward: 20,
            content:
              "#include <algorithm> gives you powerful ready-made algorithms.\n\n" +
              "#include <algorithm>\n\n" +
              "vector<int> v = {5, 2, 8, 1, 9, 3};\n\n" +
              "// Sort:\n" +
              "sort(v.begin(), v.end());                         // ascending\n" +
              "sort(v.begin(), v.end(), greater<int>());         // descending\n\n" +
              "// Find:\n" +
              "auto it = find(v.begin(), v.end(), 8);\n" +
              "if (it != v.end()) cout << \"Found at index \" << distance(v.begin(), it);\n\n" +
              "// Count, min, max:\n" +
              "count(v.begin(), v.end(), 5);   // how many 5s\n" +
              "*max_element(v.begin(), v.end());\n" +
              "*min_element(v.begin(), v.end());\n\n" +
              "Lambda expressions — anonymous functions:\n\n" +
              "// [capture](params) -> returnType { body }\n" +
              "auto square = [](int x) { return x * x; };\n" +
              "cout << square(4);  // 16\n\n" +
              "// Sort by absolute value:\n" +
              "sort(v.begin(), v.end(), [](int a, int b) {\n" +
              "    return abs(a) < abs(b);\n" +
              "});\n\n" +
              "// Capture local variable:\n" +
              "int threshold = 5;\n" +
              "auto bigEnough = [threshold](int x) { return x >= threshold; };\n\n" +
              "// Remove elements not matching a condition:\n" +
              "v.erase(remove_if(v.begin(), v.end(), [](int x){ return x % 2 == 0; }), v.end());\n" +
              "// removes all even numbers",
            mcq: {
              question: "What does the erase-remove idiom do in C++?",
              options: [
                "Erases the entire vector",
                "Removes elements matching a condition and shrinks the vector",
                "Removes duplicates only",
                "Reorders elements without removing them",
              ],
              correctIndex: 1,
              explanation:
                "remove_if shifts non-matching elements to the front and returns an iterator to the new end. erase then actually deletes the leftover elements at the back. Together they physically remove matching elements and shrink the vector.",
            },
            challenge:
              "Given a vector of Student structs {name, score, age}, use STL algorithms and lambdas to: sort by score descending, filter to only passing students (score >= 60), find the top scorer, and print the average score of all students.",
            starterCode:
              "#include <iostream>\n" +
              "#include <vector>\n" +
              "#include <algorithm>\n" +
              "#include <numeric>\n" +
              "#include <string>\n" +
              "using namespace std;\n\n" +
              "struct Student {\n" +
              "    string name;\n" +
              "    int score;\n" +
              "    int age;\n" +
              "};\n\n" +
              "int main() {\n" +
              "    vector<Student> students = {\n" +
              "        {\"Aryan\", 88, 21}, {\"Priya\", 55, 20}, {\"Rahul\", 72, 22},\n" +
              "        {\"Sneha\", 40, 19}, {\"Dev\", 95, 23}, {\"Asha\", 61, 20}\n" +
              "    };\n\n" +
              "    // TODO: sort by score descending using a lambda\n\n" +
              "    // TODO: print all students after sorting\n\n" +
              "    // TODO: use erase-remove_if to keep only passing students (score >= 60)\n\n" +
              "    // TODO: find the top scorer (max_element with lambda)\n\n" +
              "    // TODO: calculate and print the average score using accumulate\n\n" +
              "    return 0;\n" +
              "}",
            expectedOutput:
              "Sorted list, passing students only, top scorer name and score, average score.",
            hints: [
              "sort(s.begin(), s.end(), [](auto& a, auto& b){ return a.score > b.score; });",
              "erase(remove_if(s.begin(), s.end(), [](auto& st){ return st.score < 60; }), s.end());",
              "auto top = max_element(s.begin(), s.end(), [](auto& a, auto& b){ return a.score < b.score; });",
              "double avg = accumulate(s.begin(), s.end(), 0.0, [](double sum, auto& st){ return sum + st.score; }) / s.size();",
            ],
          },
          {
            id: "advanced_3",
            title: "Exception Handling",
            estimatedMinutes: 30,
            xpReward: 20,
            content:
              "Exceptions handle runtime errors in a structured way — separate the error-detection code from the error-handling code.\n\n" +
              "try {\n" +
              "    // risky code\n" +
              "    throw runtime_error(\"Something went wrong\");\n" +
              "} catch (const runtime_error& e) {\n" +
              "    cerr << \"Runtime error: \" << e.what() << endl;\n" +
              "} catch (const exception& e) {\n" +
              "    cerr << \"General error: \" << e.what() << endl;\n" +
              "} catch (...) {\n" +
              "    cerr << \"Unknown error\" << endl;\n" +
              "}\n\n" +
              "Standard exception types:\n" +
              "runtime_error  — errors detected at runtime\n" +
              "logic_error    — programmer mistakes (invalid_argument, out_of_range)\n" +
              "bad_alloc      — memory allocation failed\n" +
              "out_of_range   — e.g. vector::at() with invalid index\n\n" +
              "Custom exceptions:\n\n" +
              "class InsufficientFundsException : public runtime_error {\n" +
              "    double amount;\n" +
              "public:\n" +
              "    InsufficientFundsException(double a)\n" +
              "        : runtime_error(\"Insufficient funds\"), amount(a) {}\n" +
              "    double getAmount() { return amount; }\n" +
              "};\n\n" +
              "// Throw it:\n" +
              "throw InsufficientFundsException(500.0);",
            mcq: {
              question: "In what order should you order catch blocks when catching multiple exception types?",
              options: [
                "Most general first, most specific last",
                "Alphabetical order by exception name",
                "Most specific first, most general last",
                "Order does not matter — all blocks are checked",
              ],
              correctIndex: 2,
              explanation:
                "Catch blocks are checked top-to-bottom and only the first match runs. If you put catch(exception&) first, it will catch everything including your specific types, making the specific blocks unreachable. Always put the most specific exceptions first.",
            },
            challenge:
              "Build a safe division calculator that throws invalid_argument for division by zero, and a safeAt(vector, index) function that throws out_of_range with a helpful message. Handle both in main with appropriate catch blocks.",
            starterCode:
              "#include <iostream>\n" +
              "#include <vector>\n" +
              "#include <stdexcept>\n" +
              "#include <string>\n" +
              "using namespace std;\n\n" +
              "// TODO: double safeDivide(double a, double b)\n" +
              "// throw invalid_argument(\"Division by zero\") if b == 0\n\n" +
              "// TODO: int safeAt(const vector<int>& v, int index)\n" +
              "// throw out_of_range with message \"Index X out of range (size Y)\"\n\n" +
              "int main() {\n" +
              "    vector<int> nums = {10, 20, 30};\n\n" +
              "    // Test 1: valid division\n" +
              "    // Test 2: division by zero — catch and print error\n" +
              "    // Test 3: valid index access\n" +
              "    // Test 4: invalid index — catch and print error\n\n" +
              "    // TODO: wrap all four tests in appropriate try/catch blocks\n\n" +
              "    return 0;\n" +
              "}",
            expectedOutput:
              "10 / 2 = 5\nError: Division by zero\nnums[1] = 20\nError: Index 5 out of range (size 3)",
            hints: [
              "if (b == 0) throw invalid_argument(\"Division by zero\");",
              "if (index < 0 || index >= (int)v.size()) throw out_of_range(\"Index \" + to_string(index) + \" out of range (size \" + to_string(v.size()) + \")\");",
              "catch (const invalid_argument& e) before catch (const exception& e).",
              "e.what() returns the error message string.",
            ],
          },
          {
            id: "advanced_4",
            title: "Concurrency — threads & mutexes",
            estimatedMinutes: 40,
            xpReward: 20,
            content:
              "C++11 added native threading support. Threads let multiple tasks run in parallel.\n\n" +
              "#include <thread>\n" +
              "#include <mutex>\n\n" +
              "void printNumbers(int start, int end) {\n" +
              "    for (int i = start; i <= end; i++) {\n" +
              "        cout << i << \" \";\n" +
              "    }\n" +
              "}\n\n" +
              "int main() {\n" +
              "    thread t1(printNumbers, 1, 5);\n" +
              "    thread t2(printNumbers, 6, 10);\n" +
              "    t1.join();   // wait for t1 to finish\n" +
              "    t2.join();   // wait for t2 to finish\n" +
              "}\n\n" +
              "Race condition — when two threads access shared data simultaneously:\n\n" +
              "int counter = 0;\n" +
              "mutex mtx;\n\n" +
              "void increment() {\n" +
              "    for (int i = 0; i < 1000; i++) {\n" +
              "        lock_guard<mutex> lock(mtx);  // auto-unlocks on scope exit\n" +
              "        counter++;  // now thread-safe\n" +
              "    }\n" +
              "}\n\n" +
              "Compile with: g++ -std=c++17 main.cpp -o main -lpthread\n\n" +
              "async / future — simpler for returning values from threads:\n\n" +
              "#include <future>\n" +
              "auto result = async(launch::async, []{ return heavyComputation(); });\n" +
              "int value = result.get();   // blocks until done",
            mcq: {
              question: "What problem does a mutex solve in multi-threaded C++ programs?",
              options: [
                "It makes threads run faster by parallelising memory access",
                "It prevents race conditions by ensuring only one thread accesses shared data at a time",
                "It automatically distributes work equally across threads",
                "It prevents deadlocks by detecting circular waits",
              ],
              correctIndex: 1,
              explanation:
                "A mutex (mutual exclusion) is a lock that only one thread can hold at a time. When a thread locks a mutex before accessing shared data, other threads must wait. This prevents race conditions where simultaneous access causes unpredictable results.",
            },
            challenge:
              "Write a program that launches 4 threads, each adding 10,000 to a shared counter. Show the incorrect result without a mutex, then fix it with a lock_guard<mutex> and show the correct result (40,000).",
            starterCode:
              "#include <iostream>\n" +
              "#include <thread>\n" +
              "#include <mutex>\n" +
              "#include <vector>\n" +
              "using namespace std;\n\n" +
              "int unsafeCounter = 0;\n" +
              "int safeCounter = 0;\n" +
              "mutex mtx;\n\n" +
              "// TODO: void unsafeIncrement() — adds 10000 to unsafeCounter with no lock\n\n" +
              "// TODO: void safeIncrement() — adds 10000 to safeCounter with lock_guard\n\n" +
              "void runThreads(void(*fn)()) {\n" +
              "    vector<thread> threads;\n" +
              "    for (int i = 0; i < 4; i++) threads.emplace_back(fn);\n" +
              "    for (auto& t : threads) t.join();\n" +
              "}\n\n" +
              "int main() {\n" +
              "    runThreads(unsafeIncrement);\n" +
              "    cout << \"Unsafe counter: \" << unsafeCounter << \" (expected 40000)\" << endl;\n\n" +
              "    runThreads(safeIncrement);\n" +
              "    cout << \"Safe counter: \" << safeCounter << \" (expected 40000)\" << endl;\n\n" +
              "    return 0;\n" +
              "}",
            expectedOutput:
              "Unsafe counter: [some wrong value] (expected 40000)\nSafe counter: 40000 (expected 40000)",
            hints: [
              "for (int i = 0; i < 10000; i++) unsafeCounter++; — no lock, shows the race condition.",
              "for (int i = 0; i < 10000; i++) { lock_guard<mutex> lock(mtx); safeCounter++; }",
              "lock_guard automatically unlocks when it goes out of scope — no manual unlock needed.",
              "Compile with -lpthread on Linux/Mac: g++ -std=c++17 main.cpp -o main -lpthread",
            ],
          },
        ],
      },
    ],
  },

  /* ───────────────────────── 8. Cybersecurity ───────────────────────── */
  8: {
    title: "Cybersecurity Basics",
    domain: "Security",
    lang: "Python/Linux",
    time: "10h",
    difficulty: "Beginner",
    color: "#e74c3c",
    slogan: "The best defenders think like attackers. You are about to start thinking like one.",
    docs: { label: "OWASP Top 10", url: "https://owasp.org/www-project-top-ten/" },
    jobs: {
      roles: ["Security Analyst", "Penetration Tester", "SOC Analyst"],
      salary: "₹6 – 30 LPA",
    },
    youtube: {
      main: { title: "Free Ethical Hacking Course", channel: "NetworkChuck", url: "https://www.youtube.com/watch?v=3FNYvj2U0HM" },
      extras: [
        { title: "CTF Walkthroughs", channel: "John Hammond", url: "https://www.youtube.com/playlist?list=PL1H1sBF1VAKWjdwGpb4U6tPF0CcIvaIcG" },
        { title: "Cybersecurity in 100 Seconds", channel: "Fireship", url: "https://www.youtube.com/watch?v=inWWhr5tnEA" },
      ],
    },
    levels: [
      {
        id: "beginner", label: "Beginner", xpReward: 50,
        miniProject: {
          title: "Security Audit Checklist",
          brief: "Identify 5 common vulnerabilities from the OWASP Top 10 and write a remediation plan for a fictional website.",
          expectedOutput: "A professional security audit document.",
          starterCode: "# Security Audit Remediation Plan\n\n## 1. Broken Access Control\n**Vulnerability:** Users can access other users' data by changing ID in URL.\n**Remediation:** Implement server-side authorization checks for every sensitive request.\n\n## 2. Cryptographic Failures\n**Vulnerability:** ...\n**Remediation:** ...\n\n## 3. Injection (SQLi)\n**Vulnerability:** ...\n**Remediation:** ...\n\n[Continue for 5 vulnerabilities...]"
        },
        lessons: [
          {
            id: "cyber_beginner_0",
            title: "What is Cybersecurity?",
            estimatedMinutes: 20,
            xpReward: 15,
            setup: {
              windows: [
                "Install VirtualBox from https://www.virtualbox.org/",
                "Download the Kali Linux VirtualBox image from https://www.kali.org/get-kali/#kali-virtual-machines",
                "Import the image into VirtualBox and start the VM.",
                "Login with default credentials: username 'kali', password 'kali'.",
                "Open the terminal in Kali Linux and run 'sudo nmap --version' to check tools.",
              ],
              mac: [
                "Install Homebrew if you haven't: /bin/bash -c \"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\"",
                "Run: brew install nmap wireshark",
                "Download Kali Linux for Apple Silicon if using M1/M2/M3 chips from https://www.kali.org/",
                "Use UTM or VMware Fusion to run the Kali VM.",
              ],
            },
            content: `Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. These cyberattacks are usually aimed at accessing, changing, or destroying sensitive information; extorting money from users; or interrupting normal business processes. At its core, cybersecurity relies on the CIA Triad: Confidentiality (keeping data secret), Integrity (ensuring data is accurate and untampered), and Availability (ensuring systems are accessible when needed). As the world becomes increasingly reliant on technology, from smart homes to critical national infrastructure, cybersecurity has evolved from a specialized IT discipline into a fundamental pillar of modern society. A strong security posture involves layered defenses, blending technology, processes, and continuous human education.`,
            mcq: {
              question: "What does the 'Integrity' pillar of the CIA triad ensure?",
              options: [
                "That the system is always online",
                "That only the CEO can see the data",
                "That data has not been modified by unauthorized parties",
                "That the server is physically locked",
              ],
              correctIndex: 2,
              explanation: "Integrity ensures the accuracy and reliability of data throughout its lifecycle.",
            },
            challenge: "What acronym describes the three core pillars of cybersecurity?",
            starterCode: "const acronym = '';",
            expectedOutput: "CIA",
            hints: ["Confidentiality, Integrity, Availability."],
          },
          {
            id: "cyber_beginner_1",
            title: "Social Engineering & Phishing",
            estimatedMinutes: 25,
            xpReward: 10,
            content: `While movies often portray hacking as furious typing to breach a firewall, the reality is that the weakest link in any security system is usually human psychology. Social engineering is the art of manipulating people into giving up confidential information. The most common form is Phishing, where attackers send fraudulent emails that appear to come from a reputable source, aiming to steal credentials or install malware. Vishing (voice phishing) and Smishing (SMS phishing) are similar variations. Defending against social engineering requires robust security awareness training. Technologies like spam filters and multi-factor authentication (MFA) act as secondary safety nets, but recognizing psychological triggers—like urgency or authority—is the primary defense.`,
            mcq: {
              question: "Which type of social engineering targets a specific, high-value individual?",
              options: ["Spam", "Whaling", "Baiting", "Pretexting"],
              correctIndex: 1,
              explanation: "Whaling is a form of spear phishing aimed at senior executives.",
            },
            challenge: "What is the term for phishing conducted via SMS?",
            starterCode: "const term = '';",
            expectedOutput: "Smishing",
            hints: ["SMS + Phishing."],
          },
          {
            id: "cyber_beginner_2",
            title: "Malware & Ransomware",
            estimatedMinutes: 30,
            xpReward: 10,
            content: `Malware, short for malicious software, is an umbrella term for any code written with the intent to harm data, devices, or people. This includes viruses (which infect other files), worms (which self-replicate across networks), and Trojans (which disguise themselves as legitimate software). Ransomware is a particularly devastating type of malware that encrypts a victim's files, rendering them completely inaccessible until a cryptocurrency ransom is paid to the attacker. Modern ransomware often includes double extortion, where attackers also threaten to leak the stolen data publicly. The best defenses against malware are robust endpoint protection (antivirus/EDR), regular disconnected data backups, and keeping systems fully patched against known vulnerabilities.`,
            mcq: {
              question: "How does a 'Worm' differ from a 'Virus'?",
              options: [
                "A worm is harmless, a virus is not",
                "A worm can spread itself without human intervention",
                "A virus only affects Apple computers",
                "There is no difference",
              ],
              correctIndex: 1,
              explanation: "Worms are autonomous and use network vulnerabilities to spread without users doing anything.",
            },
            challenge: "What do you call malware that holds your files 'hostage' until you pay?",
            starterCode: "const name = '';",
            expectedOutput: "Ransomware",
            hints: ["Think of a 'ransom' note."],
          },
          {
            id: "cyber_beginner_3",
            title: "Password Security & Hashing",
            estimatedMinutes: 20,
            xpReward: 10,
            content: `Passwords remain the primary method for authentication, but they are incredibly fragile. Users often choose weak passwords or reuse them across multiple sites. When a database is breached, exposed plain-text passwords are disastrous. Therefore, systems must never store passwords in plain text. Instead, they use cryptographic Hashing—a one-way mathematical function that converts a password into a fixed-length string of characters. Even if the database is stolen, the hashes cannot be reversed. To prevent 'rainbow table' attacks (pre-computed hash lists), a unique, random string called a 'Salt' is added to each password before hashing. Additionally, enforcing long passphrases and utilizing Password Managers are critical personal security habits.`,
            mcq: {
              question: "Why should passwords be 'salted' before being hashed?",
              options: [
                "To make them taste better",
                "To ensure that two identical passwords produce different hashes",
                "To encrypt the password so it can be decrypted later",
                "To make the password shorter",
              ],
              correctIndex: 1,
              explanation: "Salting ensures that even if two users have the same password, their hashes in the database will be different, thwarting mass cracking attacks.",
            },
            challenge: "What is the most common acronym for adding a second layer of security to your login?",
            starterCode: "const acronym = '';",
            expectedOutput: "MFA",
            hints: ["Multi-Factor Authentication."],
          },
          {
            id: "cyber_beginner_4",
            title: "Networking & Firewalls",
            estimatedMinutes: 35,
            xpReward: 10,
            content: `Computer networks are the roads over which data travels. Understanding networking is foundational to cybersecurity because attacks traverse these networks. IP addresses identify devices, while Ports identify specific applications running on those devices (e.g., port 80 for HTTP, 443 for HTTPS). A Firewall acts as the security guard at the border of a network. It inspects incoming and outgoing traffic based on predetermined security rules, deciding whether to allow or block specific packets. Firewalls can be hardware appliances or software programs. While traditional firewalls filter based on IPs and ports, modern Next-Generation Firewalls (NGFW) can perform deep packet inspection to identify malicious application-level behavior.`,
            mcq: {
              question: "What is the purpose of a Firewall?",
              options: [
                "To increase internet speed",
                "To block or allow traffic based on security rules",
                "To store website passwords",
                "To replace the need for an antivirus",
              ],
              correctIndex: 1,
              explanation: "Firewalls act as a barrier between a trusted network and an untrusted one (like the internet).",
            },
            challenge: "What is the standard port number for secure web traffic (HTTPS)?",
            starterCode: "const port = 0;",
            expectedOutput: "443",
            hints: ["Unsecure web is 80, secure web is..."],
          },
        ],
      },
      {
        id: "intermediate", label: "Intermediate", xpReward: 75,
        miniProject: {
          title: "Password Cracking Simulation",
          brief: "Use a tool like 'John the Ripper' to attempt to crack a list of weak MD5 hashes using a common wordlist (dictionary attack).",
          expectedOutput: "A report on which passwords were weak enough to be cracked.",
          starterCode: "# Note: This is for educational/simulation purposes only.\n\n# 1. Start by examining the hash format in hashes.txt\ncat hashes.txt\n\n# 2. Run John the Ripper using the rockyou dictionary\njohn --wordlist=/usr/share/wordlists/rockyou.txt --format=Raw-MD5 hashes.txt\n\n# 3. View cracked passwords\njohn --show --format=Raw-MD5 hashes.txt\n\n# Report Analysis:\n# \"Out of 10 hashes, 6 were cracked instantly because they were common words...\""
        },
        lessons: [
          {
            id: "cyber_intermediate_0",
            title: "The OWASP Top 10",
            estimatedMinutes: 35,
            xpReward: 20,
            content: `The Open Worldwide Application Security Project (OWASP) Top 10 is a globally recognized awareness document outlining the most critical security risks to web applications. It is the gold standard for secure coding. The list frequently includes vulnerabilities like Broken Access Control (users accessing data they shouldn't), Cryptographic Failures (exposing sensitive data due to weak encryption), and Injection attacks (such as SQL Injection, where untrusted user input alters database queries). Understanding the OWASP Top 10 is essential for any developer or security professional, as it highlights that most breaches occur due to well-known, preventable software flaws rather than highly sophisticated zero-day exploits.`,
            mcq: {
              question: "What is 'SQL Injection'?",
              options: [
                "Updating a database with new information",
                "Injecting malicious SQL commands into a form to manipulate a database",
                "Deleting a database accidentally",
                "Making a database run faster",
              ],
              correctIndex: 1,
              explanation: "SQLi occurs when user input is incorrectly treated as code, allowing attackers to 'break out' of the intended query.",
            },
            challenge: "What does XSS stand for?",
            starterCode: "const term = '';",
            expectedOutput: "Cross-Site Scripting",
            hints: ["Think about 'crossing' sites with a 'script'."],
          },
          {
            id: "cyber_intermediate_1",
            title: "Network Recon (Nmap)",
            estimatedMinutes: 45,
            xpReward: 20,
            content: `Reconnaissance is the first phase of any cyberattack or penetration test. Before an attacker can exploit a system, they must map the target to discover active devices, open ports, and running services. Nmap (Network Mapper) is the industry-standard, open-source tool for this task. It sends specifically crafted packets to a target and analyzes the responses. Nmap can perform simple ping sweeps to find live hosts, TCP connect scans to find open ports, and even advanced OS fingerprinting and version detection to identify the exact software running on a server. Knowing what services are exposed to the internet is the first step in shrinking your attack surface.`,
            mcq: {
              question: "What is 'Port Scanning'?",
              options: [
                "Connecting a computer to a monitor",
                "Systematically checking which ports are open on a target system",
                "Improving internet connection speed",
                "Downloading files from a server",
              ],
              correctIndex: 1,
              explanation: "Port scanning helps identify the 'attack surface' of a target.",
            },
            challenge: "Which famous CLI tool is used for network discovery and security auditing?",
            starterCode: "const tool = '';",
            expectedOutput: "Nmap",
            hints: ["Short for Network Mapper."],
          },
          {
            id: "cyber_intermediate_2",
            title: "Cryptography: Symmetric vs Asymmetric",
            estimatedMinutes: 40,
            xpReward: 20,
            content: `Cryptography is the mathematical science of protecting information. It falls into two main categories: Symmetric and Asymmetric. Symmetric encryption uses a single, shared key to both encrypt and decrypt the data (e.g., AES). It is incredibly fast and efficient for encrypting large amounts of data, but securely sharing the key is a major challenge. Asymmetric encryption (Public Key Cryptography, like RSA) solves this by using a mathematically linked key pair: a Public Key (shared with everyone) to encrypt, and a Private Key (kept secret) to decrypt. While asymmetric encryption solves the key distribution problem, it is much slower. Modern systems, like TLS for HTTPS, use both: asymmetric to securely exchange a symmetric session key, and symmetric for the actual data transfer.`,
            mcq: {
              question: "In Asymmetric encryption, which key do you share with the world?",
              options: ["Private Key", "Master Key", "Public Key", "Shared Secret"],
              correctIndex: 2,
              explanation: "Anyone can use your Public Key to encrypt a message for you, but only your Private Key can open it.",
            },
            challenge: "What is the common encryption standard used by the US government and for modern web traffic?",
            starterCode: "const standard = '';",
            expectedOutput: "AES",
            hints: ["Advanced Encryption Standard."],
          },
          {
            id: "cyber_intermediate_3",
            title: "Vuln Research & CVEs",
            estimatedMinutes: 30,
            xpReward: 20,
            content: `A vulnerability is a weakness in software, hardware, or processes that an attacker can exploit. When a new vulnerability is discovered, it is assigned a Common Vulnerabilities and Exposures (CVE) identifier—a standardized name that allows security tools and professionals to share information universally (e.g., CVE-2021-44228, known as Log4Shell). The National Vulnerability Database (NVD) tracks these CVEs and assigns them a Common Vulnerability Scoring System (CVSS) score from 0 to 10 based on their severity. Security teams constantly monitor CVE feeds to determine if their organization uses affected software, allowing them to prioritize emergency patching based on the calculated risk.`,
            mcq: {
              question: "What does a CVE ID represent?",
              options: [
                "A type of virus",
                "A unique identifier for a publicly known security vulnerability",
                "A certificate for ethical hackers",
                "A brand of firewall",
              ],
              correctIndex: 1,
              explanation: "CVEs allow security pros to track and discuss specific bugs across the industry.",
            },
            challenge: "What is the term for a vulnerability that is exploited before the developer has a chance to fix it?",
            starterCode: "const term = '';",
            expectedOutput: "Zero-day",
            hints: ["The developer has had 'zero days' to fix it."],
          },
          {
            id: "cyber_intermediate_4",
            title: "Incident Response",
            estimatedMinutes: 35,
            xpReward: 20,
            content: `Despite the best defenses, breaches happen. Incident Response (IR) is the structured methodology for handling a security breach or cyberattack. The goal is to manage the situation in a way that limits damage and reduces recovery time and costs. The standard IR lifecycle involves six phases: Preparation (having a plan), Identification (detecting the breach), Containment (stopping the bleeding), Eradication (removing the threat), Recovery (restoring systems to normal operation), and Lessons Learned (preventing recurrence). Effective incident response relies heavily on robust logging (SIEM) to understand exactly what the attacker did, allowing the organization to close the gaps and recover securely.`,
            mcq: {
              question: "What is the 'Containment' phase of incident response?",
              options: [
                "Deleting the whole database",
                "Limiting the damage and preventing further spread of the attack",
                "Calling the police",
                "Buying new servers",
              ],
              correctIndex: 1,
              explanation: "Containment is 'stopping the bleed' before you start cleaning up.",
            },
            challenge: "What is the first phase of the incident response lifecycle?",
            starterCode: "const phase = '';",
            expectedOutput: "Preparation",
            hints: ["Getting ready before the fight."],
          },
        ],
      },
      {
        id: "advanced", label: "Advanced", xpReward: 100,
        miniProject: {
          title: "Capture The Flag (CTF)",
          brief: "Complete a 'Box' on TryHackMe or HackTheBox. You must gain user access and root access to find two 'flags'.",
          expectedOutput: "A write-up of the attack path and the two flags found.",
        },
        lessons: [
          {
            id: "cyber_advanced_0",
            title: "Buffer Overflows",
            estimatedMinutes: 60,
            xpReward: 30,
            content: `A Buffer Overflow is a classic, critical software vulnerability, most common in low-level languages like C and C++ that require manual memory management. It occurs when a program attempts to write more data into a fixed-length block of memory (a buffer) than it is allocated to hold. Because the bounds of the buffer are not checked, the excess data overflows into adjacent memory spaces. This can corrupt data, crash the program, or, worst of all, allow an attacker to overwrite the application's execution path (the instruction pointer) and execute arbitrary malicious code. Modern operating systems implement defenses like ASLR (Address Space Layout Randomization) and DEP (Data Execution Prevention) to mitigate these attacks.`,
            mcq: {
              question: "What is 'Shellcode'?",
              options: [
                "A type of antivirus",
                "A small piece of code used as a payload in memory exploitation",
                "The code that builds a web page",
                "A script for automating backups",
              ],
              correctIndex: 1,
              explanation: "Shellcode is designed to give the attacker a 'shell' (command line) on the target system.",
            },
            challenge: "In which low-level language are buffer overflows most commonly found due to lack of memory safety?",
            starterCode: "const lang = '';",
            expectedOutput: "C",
            hints: ["A single letter language."],
          },
          {
            id: "cyber_advanced_1",
            title: "Web App Penetration Testing",
            estimatedMinutes: 60,
            xpReward: 30,
            content: `Web Application Penetration Testing is the authorized, simulated cyberattack on a web application to find security vulnerabilities. Unlike automated vulnerability scanning, pen testing involves human intelligence mimicking the tactics of a real-world attacker. Testers map the application's attack surface, manipulate input fields to test for injection flaws, analyze authentication mechanisms for bypass opportunities, and attempt to escalate privileges. Tools like Burp Suite or OWASP ZAP act as interception proxies, allowing the tester to pause, inspect, and modify HTTP requests in transit between the browser and the server. The output is an actionable report detailing the vulnerabilities and how developers can remediate them.`,
            mcq: {
              question: "What is SSRF?",
              options: [
                "A social engineering attack",
                "Tricking a server into accessing internal resources on behalf of the attacker",
                "A way to speed up a server",
                "A database management system",
              ],
              correctIndex: 1,
              explanation: "SSRF exploits the trust between a server and its internal network.",
            },
            challenge: "What does IDOR stand for?",
            starterCode: "const term = '';",
            expectedOutput: "Insecure Direct Object Reference",
            hints: ["Think 'Insecure', 'Direct', 'Object', 'Reference'."],
          },
          {
            id: "cyber_advanced_2",
            title: "Active Directory Security",
            estimatedMinutes: 50,
            xpReward: 30,
            content: `Microsoft Active Directory (AD) is the identity and access management backbone of 90% of global enterprises. Because it holds the 'keys to the kingdom'—credentials and permissions for every user and computer in the organization—it is the primary target for attackers once they gain an initial foothold. If an attacker compromises an AD environment, they can deploy ransomware organization-wide. AD security involves complex challenges like preventing Kerberoasting, securing Service Principal Names (SPNs), managing overly permissive Group Policy Objects (GPOs), and preventing lateral movement using tools like BloodHound. Defending AD requires continuous auditing of permissions and adopting a Zero Trust, least-privilege architecture.`,
            mcq: {
              question: "What is 'Lateral Movement'?",
              options: [
                "Moving a server to a different room",
                "Moving from one compromised system to another within the same network",
                "Upgrading a user's password",
                "Connecting to a VPN",
              ],
              correctIndex: 1,
              explanation: "Lateral movement is how attackers explore a network once they gain an initial foothold.",
            },
            challenge: "What is the highest level of administrative privilege in a Windows Domain?",
            starterCode: "const role = '';",
            expectedOutput: "Domain Admin",
            hints: ["Admin of the whole 'Domain'."],
          },
          {
            id: "cyber_advanced_3",
            title: "Cloud Security (AWS/Azure)",
            estimatedMinutes: 50,
            xpReward: 30,
            content: `The shift from on-premises servers to cloud platforms like AWS, Azure, and GCP has fundamentally changed security. The cloud operates on a Shared Responsibility Model: the provider secures the underlying infrastructure (the 'security OF the cloud'), but the customer is responsible for configuring and securing everything they build on top of it (the 'security IN the cloud'). The vast majority of cloud breaches are not caused by hackers breaking the cloud provider, but by customers misconfiguring their environments—such as leaving an Amazon S3 bucket publicly readable. Cloud security focuses heavily on Identity and Access Management (IAM), infrastructure-as-code security, and utilizing cloud-native posture management tools.`,
            mcq: {
              question: "What is the leading cause of data breaches in the cloud?",
              options: ["Advanced zero-day exploits", "User misconfiguration", "Cloud provider error", "Power outages"],
              correctIndex: 1,
              explanation: "Gartner predicts that through 2025, 99% of cloud security failures will be the customer's fault due to misconfiguration.",
            },
            challenge: "What is the AWS service used to manage permissions and users?",
            starterCode: "const service = '';",
            expectedOutput: "IAM",
            hints: ["Identity and Access Management."],
          },
          {
            id: "cyber_advanced_4",
            title: "The Security Career Path",
            estimatedMinutes: 40,
            xpReward: 30,
            content: `Cybersecurity is not a single job; it is a massive field with highly specialized domains. The classic division is between the 'Red Team' (Offensive Security, like Penetration Testers and Exploit Developers who simulate attacks) and the 'Blue Team' (Defensive Security, like Security Operations Center (SOC) Analysts, Incident Responders, and Threat Hunters who detect and stop attacks). There are also vast opportunities in Governance, Risk, and Compliance (GRC), focusing on policies and audits, as well as Security Engineering and Application Security (AppSec), which focuses on building secure software. Successful security professionals possess an insatiable curiosity, a deep understanding of how systems work, and a commitment to lifelong learning.`,
            mcq: {
              question: "Which team is responsible for 'Defensive' security?",
              options: ["Red Team", "Green Team", "Blue Team", "Yellow Team"],
              correctIndex: 2,
              explanation: "Blue Teams protect the organization's assets and respond to incidents.",
            },
            challenge: "Which prestigious hands-on certification is known for its 24-hour hacking exam?",
            starterCode: "const cert = '';",
            expectedOutput: "OSCP",
            hints: ["Offensive Security Certified Professional."],
          },
        ],
      },
    ],
  },

  /* ───────────────────────── 9. Django ───────────────────────── */
  9: {
    title: "Django Web Framework",
    domain: "Backend Development",
    lang: "Python/Django",
    time: "12h",
    difficulty: "Intermediate",
    color: "#69ff94",
    slogan: "The web framework for perfectionists with deadlines.",
    docs: { label: "Django Docs", url: "https://docs.djangoproject.com/" },
    jobs: { roles: ["Backend Developer", "Django Engineer"], salary: "₹6 – 25 LPA" },
    youtube: { main: { title: "Django Full Course", channel: "freeCodeCamp", url: "https://www.youtube.com/watch?v=F5mRW0q-FTc" } },
    levels: [
      {
        id: "beginner", label: "Beginner", xpReward: 50,
        miniProject: {
          title: "Basic Blog", brief: "Create a blog with posts and authors.", expectedOutput: "A functional blog.",
          starterCode: "from django.db import models\nfrom django.urls import path\nfrom django.views.generic import ListView, DetailView\n\n# models.py\nclass Author(models.Model):\n    name = models.CharField(max_length=100)\n\nclass Post(models.Model):\n    title = models.CharField(max_length=200)\n    content = models.TextField()\n    author = models.ForeignKey(Author, on_delete=models.CASCADE)\n\n# views.py\nclass PostListView(ListView):\n    model = Post\n    template_name = 'blog/post_list.html'\n\n# urls.py\nurlpatterns = [\n    path('', PostListView.as_view(), name='post-list'),\n]"
        },
        lessons: [
          {
            id: "django_beginner_0",
            title: "Intro to Django",
            estimatedMinutes: 20,
            xpReward: 20,
            setup: {
              windows: [
                "Install Python (3.10+) from https://www.python.org/downloads/",
                "Open PowerShell and run: pip install django",
                "Verify installation: django-admin --version",
                "Create a project: django-admin startproject mysite",
                "Run the server: python manage.py runserver",
              ],
              mac: [
                "Python is usually installed. Check with: python3 --version",
                "Run: pip3 install django",
                "Verify installation: django-admin --version",
                "Create a project: django-admin startproject mysite",
                "Run the server: python3 manage.py runserver",
              ],
            },
            content:
              "Django is a high-level, open-source Python web framework designed to help developers build secure, scalable, and maintainable web applications extremely quickly. It follows the 'batteries-included' philosophy, meaning it comes with almost everything you need right out of the box (Authentication, Admin Panel, ORM, etc.).\n\n" +
              "Django is built around the MVT (Model-View-Template) architecture pattern:\n\n" +
              "- Model: The data structure of your application. It acts as the layer between your database and Python code using Django's Object-Relational Mapper (ORM).\n" +
              "- View: The logic layer. It receives web requests, processes the business logic (often querying the Model), and returns a response (usually rendering a Template).\n" +
              "- Template: The presentation layer. It is the user-facing HTML file combined with Django Template Language (DTL) to dynamically render data.",
            mcq: {
              question: "What does MVT stand for in Django?",
              options: ["Model View Template", "Mode View Type", "Model Version Template", "Main View Template"],
              correctIndex: 0,
              explanation: "MVT is Django's version of MVC (Model-View-Controller)."
            },
            challenge: "What is the command to create a new Django project named 'mysite'?",
            starterCode: "const command = '';",
            expectedOutput: "django-admin startproject mysite",
            hints: ["Use django-admin"]
          },
          {
            id: "django_beginner_1",
            title: "Django Admin & Users",
            estimatedMinutes: 25,
            xpReward: 10,
            content:
              "One of Django's most famous and powerful features is its built-in Admin Interface. It automatically generates a fully functional, secure web portal for managing your database records based directly on your models.\n\n" +
              "How to register models in the Admin Panel (`admin.py`):\n" +
              "```python\n" +
              "from django.contrib import admin\n" +
              "from .models import Post\n\n" +
              "admin.site.register(Post)\n" +
              "```\n\n" +
              "To access the admin panel at `/admin`, you must first create a 'superuser' account using the command line:\n" +
              "```bash\n" +
              "python manage.py createsuperuser\n" +
              "```\n" +
              "You will be prompted to enter a username, email, and secure password, which you can then use to log in.",
            mcq: {
              question: "How do you create a user who can log in to the Django admin?",
              options: ["python manage.py createsuperuser", "python manage.py adduser", "In settings.py", "In models.py"],
              correctIndex: 0,
              explanation: "The createsuperuser command is the standard way to initialize an admin user."
            },
            challenge: "Which command starts the Django development server?",
            starterCode: "python manage.py ___",
            expectedOutput: "runserver",
            hints: ["It's a single word."]
          },
          {
            id: "django_beginner_2",
            title: "URL Routing",
            estimatedMinutes: 25,
            xpReward: 10,
            content:
              "Django uses a routing system called URLconf (URL configuration) to map browser URL paths to their corresponding View functions or classes.\n\n" +
              "This routing is defined in `urls.py` files using the `path()` function within a list named `urlpatterns`.\n\n" +
              "Example `urls.py` structure:\n" +
              "```python\n" +
              "from django.urls import path\n" +
              "from . import views\n\n" +
              "urlpatterns = [\n" +
              "    # Maps the root URL (e.g., http://127.0.0.1:8000/) to views.home\n" +
              "    path('', views.home, name='home'),\n" +
              "    \n" +
              "    # Maps http://127.0.0.1:8000/blog/ to views.blog_list\n" +
              "    path('blog/', views.blog_list, name='blog_list'),\n" +
              "]\n" +
              "```\n\n" +
              "Key arguments of `path()`:\n" +
              "1. Route: A string representing the URL pattern (empty string `''` represents the root URL).\n" +
              "2. View: The view function or class to execute when the URL is matched.\n" +
              "3. Name: A unique name for the URL, which allows you to link to this page dynamically in templates.",
            mcq: {
              question: "Which function is used to include other URLconfs?",
              options: ["path()", "re_path()", "include()", "url()"],
              correctIndex: 2,
              explanation: "include() allows you to reference other URLconfs, making your project modular."
            },
            challenge: "Write the path for a 'home' view at the root URL.",
            starterCode: "path('___', views.home, name='home')",
            expectedOutput: "",
            hints: ["An empty string represents the root URL."]
          },
          {
            id: "django_beginner_3",
            title: "Templates & Context",
            estimatedMinutes: 30,
            xpReward: 10,
            content:
              "Templates are the 'T' in Django's MVT architecture. They are standard HTML files enriched with the Django Template Language (DTL), which allows you to dynamically display data, run loops, and perform conditions.\n\n" +
              "DTL Syntax Basics:\n" +
              "- Variables: Double curly braces `{{ variable }}` are used to output dynamic data sent from a view.\n" +
              "  ```html\n" +
              "  <h1>Welcome back, {{ username }}!</h1>\n" +
              "  ```\n" +
              "- Tags: Curly braces with percent signs `{% tag %}` are used for logic, loops, URL generation, or template inheritance.\n" +
              "  ```html\n" +
              "  <ul>\n" +
              "    {% for post in posts %}\n" +
              "      <li>{{ post.title }}</li>\n" +
              "    {% empty %}\n" +
              "      <li>No posts available.</li>\n" +
              "    {% endfor %}\n" +
              "  </ul>\n" +
              "  ```",
            mcq: {
              question: "How do you pass data from a view to a template?",
              options: ["Using a dictionary called context", "Using global variables", "Directly in the URL", "Templates don't receive data"],
              correctIndex: 0,
              explanation: "The context dictionary maps variable names in the template to Python objects."
            },
            challenge: "What is the tag used for loops in Django templates?",
            starterCode: "{% ___ item in items %}",
            expectedOutput: "for",
            hints: ["It's the same keyword as in Python."]
          },
          {
            id: "django_beginner_4",
            title: "Views & Responses",
            estimatedMinutes: 30,
            xpReward: 10,
            content:
              "A View in Django is a function or class that accepts an HTTP request from a web browser, executes the necessary backend logic, and returns an HTTP response (usually HTML content, a redirect, or a JSON payload).\n\n" +
              "Every view function receives an `HttpRequest` object as its very first parameter (conventionally named `request`).\n\n" +
              "Example of a Function-Based View (FBV):\n" +
              "```python\n" +
              "from django.shortcuts import render\n" +
              "from .models import Post\n\n" +
              "def blog_list(request):\n" +
              "    # 1. Fetch data from the database\n" +
              "    posts = Post.objects.all()\n" +
              "    \n" +
              "    # 2. Build the context dictionary to pass data\n" +
              "    context = {'posts': posts}\n" +
              "    \n" +
              "    # 3. Load the template, populate it with context, and return the response\n" +
              "    return render(request, 'blog/list.html', context)\n" +
              "```",
            mcq: {
              question: "Which function is a shortcut to load a template, fill a context, and return an HttpResponse?",
              options: ["load()", "render()", "show()", "display()"],
              correctIndex: 1,
              explanation: "render() is the most common way to return a template-based response."
            },
            challenge: "What is the first argument every Django view function must take?",
            starterCode: "def my_view(___):",
            expectedOutput: "request",
            hints: ["It represents the incoming HTTP request."]
          }
        ]

      },
      {
        id: "intermediate", label: "Intermediate", xpReward: 75,
        miniProject: {
          title: "Todo App", brief: "Build a todo app with CRUD functionality.", expectedOutput: "A working Todo app.",
          starterCode: "from django.db import models\nfrom django.shortcuts import render, redirect\n\n# models.py\nclass Task(models.Model):\n    title = models.CharField(max_length=200)\n    description = models.TextField(blank=True)\n    completed = models.BooleanField(default=False)\n\n# views.py\ndef task_list(request):\n    tasks = Task.objects.all()\n    # Add form handling for POST requests to create a task\n    return render(request, 'todo/task_list.html', {'tasks': tasks})\n\ndef complete_task(request, pk):\n    task = Task.objects.get(pk=pk)\n    task.completed = True\n    task.save()\n    return redirect('task-list')"
        },
        lessons: [
          {
            id: "django_intermediate_0",
            title: "Django Models",
            estimatedMinutes: 30,
            xpReward: 25,
            content: "Models define the structure of your database. Each model is a Python class that subclasses `django.db.models.Model`. \n\n```python\nclass Post(models.Model):\n    title = models.CharField(max_length=200)\n    content = models.TextField()\n    created_at = models.DateTimeField(auto_now_add=True)\n```",
            mcq: {
              question: "How do you apply changes to your database schema after modifying models.py?",
              options: ["Restart the server", "Delete the database", "Run makemigrations and migrate", "Manual SQL updates"],
              correctIndex: 2,
              explanation: "Migrations are Django's way of propagating changes you make to your models into your database schema."
            },
            challenge: "Which command generates the SQL for your migrations?",
            starterCode: "python manage.py ___",
            expectedOutput: "makemigrations",
            hints: ["It's the first step before 'migrate'."]
          },
          {
            id: "django_intermediate_1",
            title: "Model Relationships",
            estimatedMinutes: 35,
            xpReward: 20,
            content: "Django supports ForeignKey (many-to-one), ManyToManyField, and OneToOneField relationships.\n\n```python\nclass Comment(models.Model):\n    post = models.ForeignKey(Post, on_delete=models.CASCADE)\n    text = models.TextField()\n```",
            mcq: {
              question: "Which field type would you use for 'A Book has one Author, but an Author can have many Books'?",
              options: ["ManyToManyField", "OneToOneField", "ForeignKey", "BooleanField"],
              correctIndex: 2,
              explanation: "ForeignKey defines a many-to-one relationship."
            },
            challenge: "What argument is required for a ForeignKey to handle deletion behavior?",
            starterCode: "models.ForeignKey('Author', ___=models.CASCADE)",
            expectedOutput: "on_delete",
            hints: ["It defines the deletion behavior."]
          },
          {
            id: "django_intermediate_2",
            title: "Auth & Permissions",
            estimatedMinutes: 40,
            xpReward: 20,
            content: "Django handles user accounts, groups, permissions, and cookie-based sessions out of the box. You can use the `@login_required` decorator to protect your views.\n\n```python\nfrom django.contrib.auth.decorators import login_required\n\n@login_required\ndef profile(request):\n    return render(request, 'profile.html')\n```",
            mcq: {
              question: "Which decorator is used to restrict access to a view to logged-in users only?",
              options: ["@admin_only", "@login_required", "@is_authenticated", "@secure"],
              correctIndex: 1,
              explanation: "login_required is the standard decorator for protecting views."
            },
            challenge: "Where do you check if a user is logged in within a template?",
            starterCode: "{% if user.___ %}",
            expectedOutput: "is_authenticated",
            hints: ["It's a boolean attribute on the user object."]
          },
          {
            id: "django_intermediate_3",
            title: "Class Based Views (CBV)",
            estimatedMinutes: 45,
            xpReward: 20,
            content: "CBVs allow you to structure your views as objects, encouraging code reuse through inheritance. They provide 'generic' views for common tasks like listing or viewing details.\n\n```python\nfrom django.views.generic import ListView\n\nclass PostListView(ListView):\n    model = Post\n    template_name = 'post_list.html'\n```",
            mcq: {
              question: "What is a benefit of CBVs over Function-Based Views (FBVs)?",
              options: ["They are faster", "They are easier for beginners", "They reduce boilerplate for common tasks", "They don't require URL routing"],
              correctIndex: 2,
              explanation: "Generic CBVs handle common patterns with very little code."
            },
            challenge: "Which CBV would you use to display a single object's data?",
            starterCode: "class MyView(___):",
            expectedOutput: "DetailView",
            hints: ["It's for viewing the 'details' of an object."]
          },
          {
            id: "django_intermediate_4",
            title: "Middleware & Signals",
            estimatedMinutes: 40,
            xpReward: 20,
            content: "Middleware hooks into Django’s request/response processing. Signals notify receivers of actions like saving a model.",
            mcq: {
              question: "What is Middleware used for?",
              options: ["Database connection", "Processing requests globally", "Defining templates", "Creating API endpoints"],
              correctIndex: 1,
              explanation: "Middleware can handle authentication, sessions, and security headers globally."
            },
            challenge: "What signal is sent after a model's save() method is called?",
            starterCode: "const signalName = '___';",
            expectedOutput: "post_save",
            hints: ["It happens 'after' the save."]
          }
        ]

      },
      {
        id: "advanced", label: "Advanced", xpReward: 100,
        miniProject: {
          title: "Social Media API", brief: "Build a REST API for a social media platform using DRF.", expectedOutput: "A set of API endpoints.",
          starterCode: "from rest_framework import serializers, viewsets\nfrom django.contrib.auth.models import User\nfrom .models import Post, Comment\n\n# serializers.py\nclass PostSerializer(serializers.ModelSerializer):\n    class Meta:\n        model = Post\n        fields = ['id', 'author', 'content', 'created_at', 'likes_count']\n\n# views.py\nclass PostViewSet(viewsets.ModelViewSet):\n    queryset = Post.objects.all()\n    serializer_class = PostSerializer\n    \n    # Require authentication\n    # permission_classes = [IsAuthenticated]\n    \n    def perform_create(self, serializer):\n        serializer.save(author=self.request.user)"
        },
        lessons: [
          {
            id: "django_advanced_0",
            title: "Django Rest Framework (DRF)",
            estimatedMinutes: 45,
            xpReward: 30,
            content: "DRF is a powerful toolkit for building Web APIs. It provides serializers, views, and authentication out of the box.\n\n```python\nclass PostSerializer(serializers.ModelSerializer):\n    class Meta:\n        model = Post\n        fields = ['id', 'title', 'content']\n```",
            mcq: {
              question: "What is the role of a Serializer in DRF?",
              options: ["To format HTML", "To convert complex data into JSON", "To handle URL routing", "To manage the database"],
              correctIndex: 1,
              explanation: "Serializers allow complex data such as querysets to be converted to native Python datatypes that can then be rendered into JSON."
            },
            challenge: "What is the name of the class used to define a serializer for a model?",
            starterCode: "class MySerializer(serializers.___):",
            expectedOutput: "ModelSerializer",
            hints: ["It's similar to ModelForm."]
          },
          {
            id: "django_advanced_1",
            title: "API Views & ViewSets",
            estimatedMinutes: 45,
            xpReward: 30,
            content: "ViewSets combine logic for related views into a single class. For example, a `ModelViewSet` automatically provides `.list()`, `.create()`, `.retrieve()`, `.update()`, and `.destroy()` actions when used with a Router.\n\n```python\nclass PostViewSet(viewsets.ModelViewSet):\n    queryset = Post.objects.all()\n    serializer_class = PostSerializer\n```",
            mcq: {
              question: "Which class provides the most complete 'out-of-the-box' API logic for a model?",
              options: ["APIView", "GenericAPIView", "ModelViewSet", "ListView"],
              correctIndex: 2,
              explanation: "ModelViewSet handles all standard CRUD operations automatically when paired with a router."
            },
            challenge: "Which class would you inherit from for a simple, custom API view?",
            starterCode: "class MyView(___):",
            expectedOutput: "APIView",
            hints: ["The most basic class-based view in DRF."]
          },
          {
            id: "django_advanced_2",
            title: "JWT Authentication",
            estimatedMinutes: 50,
            xpReward: 30,
            content: "JSON Web Token (JWT) is a stateless authentication mechanism. Unlike sessions, the server doesn't store anything; the client sends a cryptographically signed token with every request.\n\nTo use it in DRF, you configure the authentication classes in `settings.py`:\n\n```python\nREST_FRAMEWORK = {\n    'DEFAULT_AUTHENTICATION_CLASSES': [\n        'rest_framework_simplejwt.authentication.JWTAuthentication',\n    ]\n}\n```",
            mcq: {
              question: "What is a key advantage of JWT for APIs?",
              options: ["Faster passwords", "Stateless and works with decoupled frontends", "Encrypts database", "Replaces SSL"],
              correctIndex: 1,
              explanation: "Statelessness makes JWT highly scalable and ideal for modern app architectures."
            },
            challenge: "Which header is typically used to send a JWT token in an API request?",
            starterCode: "Authorization: ___ <token>",
            expectedOutput: "Bearer",
            hints: ["It's the most common token type."]
          },
          {
            id: "django_advanced_3",
            title: "Testing & Mocking",
            estimatedMinutes: 40,
            xpReward: 30,
            content: "Django's test framework is based on Python's `unittest` module. It uses a clean database for each test run to ensure isolation.\n\n```python\nfrom django.test import TestCase\nfrom .models import Post\n\nclass PostModelTest(TestCase):\n    def test_post_creation(self):\n        post = Post.objects.create(title=\"Hello\")\n        self.assertEqual(post.title, \"Hello\")\n```",
            mcq: {
              question: "Which command runs the tests in a Django project?",
              options: ["python manage.py runtests", "python manage.py test", "pytest", "python manage.py check"],
              correctIndex: 1,
              explanation: "The 'test' command discovers and runs all tests in the project."
            },
            challenge: "What method do you use to simulate a GET request in a test?",
            starterCode: "response = self.client.___('/api/data/')",
            expectedOutput: "get",
            hints: ["Matches the HTTP method name."]
          },
          {
            id: "django_advanced_4",
            title: "Performance & Caching",
            estimatedMinutes: 50,
            xpReward: 30,
            content: "Caching allows you to store the result of expensive calculations or database queries. Django supports multiple backends like Redis or Memcached.\n\nExample of view-level caching:\n```python\nfrom django.views.decorators.cache import cache_page\n\n@cache_page(60 * 15)\ndef my_expensive_view(request):\n    # This view is cached for 15 minutes\n    ...\n```",
            mcq: {
              question: "Where is the most common place to configure the cache backend in Django?",
              options: ["models.py", "urls.py", "settings.py", "views.py"],
              correctIndex: 2,
              explanation: "The CACHES setting in settings.py defines the backend details."
            },
            challenge: "What is the decorator used to cache a view?",
            starterCode: "@___(60 * 15)",
            expectedOutput: "cache_page",
            hints: ["It's imported from django.views.decorators.cache."]
          }
        ]

      }
    ]
  },

  /* ───────────────────────── 11. Java ───────────────────────── */
  11: {
    title: "Java Programming",
    domain: "Software Development",
    lang: "Java",
    time: "14h",
    difficulty: "Beginner",
    color: "#b07219",
    slogan: "Write once, run anywhere. The backbone of enterprise software.",
    docs: { label: "Oracle Java Docs", url: "https://docs.oracle.com/en/java/" },
    jobs: { roles: ["Java Developer", "Android Developer"], salary: "₹6 – 28 LPA" },
    youtube: { main: { title: "Java Full Course", channel: "Bro Code", url: "https://www.youtube.com/watch?v=A74TOX803D0" } },
    levels: [
      {
        id: "beginner", label: "Beginner", xpReward: 50,
        miniProject: {
          title: "Calculator", brief: "Build a console-based calculator.", expectedOutput: "A JAR file or source code.",
          starterCode: "import java.util.Scanner;\n\npublic class Calculator {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        \n        while (true) {\n            System.out.println(\"Enter first number (or type 'quit' to exit): \");\n            String input = scanner.next();\n            if (input.equalsIgnoreCase(\"quit\")) break;\n            \n            double num1 = Double.parseDouble(input);\n            String operator = scanner.next();\n            double num2 = scanner.nextDouble();\n            \n            // Implement switch statement for +, -, *, /\n            // Handle divide by zero!\n        }\n        scanner.close();\n    }\n}"
        },
        lessons: [
          {
            id: "java_beginner_0",
            title: "Intro to Java",
            estimatedMinutes: 20,
            xpReward: 20,
            setup: {
              windows: [
                "Download the JDK (Java Development Kit) from https://www.oracle.com/java/technologies/downloads/",
                "Run the installer and follow the prompts.",
                "Open PowerShell and type: java -version",
                "If it works, you are ready to write your first .java file!",
              ],
              mac: [
                "Install OpenJDK via Homebrew: brew install openjdk",
                "Add Java to your path (follow the instructions provided by Homebrew at the end).",
                "Verify: java -version",
              ],
            },
            content: `Java is a high-level, class-based, object-oriented programming language designed to have as few implementation dependencies as possible. Released by Sun Microsystems in 1995, its famous mantra is 'Write Once, Run Anywhere' (WORA). This is achieved because Java code is compiled into an intermediate form called 'bytecode', rather than machine-specific instructions. This bytecode is then executed by the Java Virtual Machine (JVM), which is specific to the underlying operating system. Java's strong typing, robust memory management (via Garbage Collection), and vast standard library make it the go-to language for enterprise applications, Android development, and large-scale backend systems.`,
            mcq: {
              question: "What is the entry point of a Java program?",
              options: ["start()", "init()", "main()", "run()"],
              correctIndex: 2,
              explanation: "The public static void main(String[] args) method is where execution starts."
            },
            challenge: "Write the code to print 'Hello' to the console.",
            starterCode: "System.___(\"Hello\");",
            expectedOutput: "out.println",
            hints: ["System.out.println()"]
          },
          {
            id: "java_beginner_1",
            title: "Variables & Types",
            estimatedMinutes: 25,
            xpReward: 10,
            content: `Java is a strongly, statically typed language. This means you must declare the type of a variable before you can use it, and that type cannot change over the variable's lifetime. Java has two main categories of data types: Primitive types and Reference types. There are 8 primitive types: byte, short, int, long, float, double, boolean, and char. These hold raw values directly in memory (the stack). Reference types, such as Objects, Arrays, and Strings, store a memory address (reference) pointing to where the actual data resides (the heap). Understanding this memory distinction is crucial for understanding how data is manipulated and passed to methods in Java.`,
            mcq: {
              question: "Which of these is NOT a primitive type in Java?",
              options: ["int", "boolean", "String", "char"],
              correctIndex: 2,
              explanation: "String is a class (Object), not a primitive type."
            },
            challenge: "How do you declare an integer named 'count' with value 5?",
            starterCode: "___ count = 5;",
            expectedOutput: "int",
            hints: ["Three letters for integer."]
          },
          {
            id: "java_beginner_2",
            title: "Control Flow",
            estimatedMinutes: 30,
            xpReward: 10,
            content: `Control flow dictates the execution path of your Java program. Without it, a program would simply execute instructions linearly from top to bottom. Java uses \`if-else\` blocks for conditional execution based on boolean expressions. For handling multiple distinct cases, the \`switch\` statement evaluates a variable against multiple \`case\` values. For repetitive tasks, Java provides loops: the \`while\` loop (executes as long as a condition is true), the \`do-while\` loop (executes at least once before checking the condition), and the \`for\` loop (ideal for iterating a specific number of times). The Enhanced \`for-each\` loop is specifically designed to iterate cleanly through arrays and collections.`,
            mcq: {
              question: "How do you iterate through an array in Java?",
              options: ["for loop", "foreach loop", "while loop", "All of these"],
              correctIndex: 3,
              explanation: "All these looping constructs are available in Java."
            },
            challenge: "What keyword allows you to exit a loop immediately?",
            starterCode: "const kw = '___';",
            expectedOutput: "break",
            hints: ["Same as in JS and Python."]
          },
          {
            id: "java_beginner_3",
            title: "Arrays",
            estimatedMinutes: 25,
            xpReward: 10,
            content: `An Array in Java is a container object that holds a fixed number of values of a single type. The length of an array is established when the array is created; after creation, its length is fixed and cannot be changed. This rigid size requirement makes traditional arrays highly efficient for memory access but less flexible than dynamic collections. You access an array element by referring to its numerical index, starting at 0. Arrays are incredibly useful for grouping related primitive values or object references together, and they are foundational to understanding sorting, searching algorithms, and matrix operations in computer science.`,
            mcq: {
              question: "How do you get the size of an array named 'arr'?",
              options: ["arr.size()", "arr.length", "arr.count()", "size(arr)"],
              correctIndex: 1,
              explanation: "length is an attribute of Java arrays."
            },
            challenge: "Declare an array of integers named 'numbers'.",
            starterCode: "___[] numbers;",
            expectedOutput: "int",
            hints: ["The type is integer."]
          },
          {
            id: "java_beginner_4",
            title: "Methods",
            estimatedMinutes: 30,
            xpReward: 10,
            content: `Methods are blocks of code defined within a class that perform a specific operation. They are Java's equivalent to functions in other languages. Methods allow you to break down complex logic into small, reusable, and testable pieces. A method signature includes its access modifier (e.g., \`public\`), its return type (or \`void\` if it returns nothing), its name, and a list of parameters. When a method is called, arguments are passed to these parameters. Understanding method scope, overloading (having multiple methods with the same name but different parameter lists), and return values is essential for building structured, procedural logic within your classes.`,
            mcq: {
              question: "What keyword is used if a method doesn't return a value?",
              options: ["none", "empty", "null", "void"],
              correctIndex: 3,
              explanation: "void indicates the method has no return value."
            },
            challenge: "What keyword is used to return a value from a method?",
            starterCode: "___ score;",
            expectedOutput: "return",
            hints: ["Six letters."]
          }
        ]

      },
      {
        id: "intermediate", label: "Intermediate", xpReward: 75,
        miniProject: {
          title: "Bank Account System", brief: "Implement a system with classes for accounts, transactions, and customers.", expectedOutput: "An OOP-based banking system.",
          starterCode: "import java.util.ArrayList;\nimport java.util.List;\n\nabstract class Account {\n    protected double balance;\n    protected List<String> transactions = new ArrayList<>();\n    \n    public abstract boolean withdraw(double amount);\n    \n    public void deposit(double amount) {\n        balance += amount;\n        transactions.add(\"Deposited: \" + amount);\n    }\n}\n\nclass CheckingAccount extends Account {\n    private double overdraftLimit = 500.0;\n    \n    @Override\n    public boolean withdraw(double amount) {\n        if (balance + overdraftLimit >= amount) {\n            balance -= amount;\n            transactions.add(\"Withdrew: \" + amount);\n            return true;\n        }\n        return false;\n    }\n}\n\npublic class BankSystem {\n    public static void main(String[] args) {\n        Account myChecking = new CheckingAccount();\n        myChecking.deposit(100);\n        myChecking.withdraw(150);\n    }\n}"
        },
        lessons: [
          {
            id: "java_intermediate_0",
            title: "OOP Principles",
            estimatedMinutes: 35,
            xpReward: 25,
            content: `Object-Oriented Programming (OOP) is a paradigm centered around objects rather than functions. Java is fundamentally OOP. The four pillars of OOP are:

1. **Encapsulation**: Hiding the internal state of an object and requiring all interaction to be performed through an object's methods, typically getters and setters. This protects data integrity.
2. **Abstraction**: Hiding complex implementation details and showing only the essential features of the object. This reduces complexity.
3. **Inheritance**: Creating new classes based on existing ones to promote code reuse.
4. **Polymorphism**: The ability of different object types to be treated as instances of the same class through a common interface.

Mastering these pillars allows you to design scalable, maintainable, and modular software architectures. Instead of thinking of programs as a sequence of instructions, OOP lets you model real-world entities. For example, a \`BankAccount\` class encapsulates the \`balance\` variable so it cannot be maliciously modified directly, only through a \`deposit()\` or \`withdraw()\` method.`,
            mcq: {
              question: "Which principle is about hiding the internal state?",
              options: ["Inheritance", "Polymorphism", "Encapsulation", "Abstraction"],
              correctIndex: 2,
              explanation: "Encapsulation protects data by making it private."
            },
            challenge: "What keyword is used to inherit from a class in Java?",
            starterCode: "class Child ___ Parent { }",
            expectedOutput: "extends",
            hints: ["It starts with 'e'."]
          },
          {
            id: "java_intermediate_1",
            title: "Inheritance",
            estimatedMinutes: 40,
            xpReward: 20,
            content: `Inheritance is the mechanism in Java by which one class is allowed to inherit the features (fields and methods) of another class. The class that inherits is the Subclass (or Child class), and the class being inherited from is the Superclass (or Parent class). We use the \`extends\` keyword to achieve this.

Inheritance promotes code reusability—if multiple classes share common logic, that logic can be centralized in a parent class.

\`\`\`java
class Animal {
    void eat() { System.out.println("Eating..."); }
}

class Dog extends Animal {
    void bark() { System.out.println("Barking..."); }
}
\`\`\`

However, Java only supports single inheritance for classes (a class can only extend one superclass) to prevent the 'Diamond Problem' of ambiguity. Understanding the \`super\` keyword (used to call parent constructors or methods) and method overriding (redefining a parent method in the child class) is key to utilizing inheritance effectively.`,
            mcq: {
              question: "Does Java support multiple inheritance of classes?",
              options: ["Yes", "No", "Only for abstract classes", "Only in Java 21+"],
              correctIndex: 1,
              explanation: "Java does not support multiple inheritance with classes to avoid ambiguity."
            },
            challenge: "What keyword refers to the immediate parent class?",
            starterCode: "___();",
            expectedOutput: "super",
            hints: ["Five letters."]
          },
          {
            id: "java_intermediate_2",
            title: "Interfaces",
            estimatedMinutes: 40,
            xpReward: 20,
            content: `An Interface in Java is an abstract type used to specify a behavior that classes must implement. It is a strict contract. If a class implements an interface, it must provide concrete implementations for all of the abstract methods declared in that interface. We use the \`implements\` keyword for this.

While Java restricts classes to single inheritance, a class can implement multiple interfaces. This is a powerful tool for achieving loose coupling and Polymorphism.

\`\`\`java
interface Movable {
    void move();
}

class Car implements Movable {
    public void move() { System.out.println("Driving"); }
}
\`\`\`

With Java 8, interfaces were upgraded to support \`default\` and \`static\` methods, meaning interfaces can now provide some implementation details. This makes evolving APIs much easier without breaking existing implementations.`,
            mcq: {
              question: "What keyword does a class use to implement an interface?",
              options: ["uses", "implements", "extends", "inherits"],
              correctIndex: 1,
              explanation: "Classes 'implement' interfaces."
            },
            challenge: "Complete the line.",
            starterCode: "class MyClass ___ MyInterface { }",
            expectedOutput: "implements",
            hints: ["Longer than 'extends'."]
          },
          {
            id: "java_intermediate_3",
            title: "Exceptions",
            estimatedMinutes: 35,
            xpReward: 20,
            content: `An Exception is an unwanted or unexpected event occurring during the execution of a program that disrupts the normal flow of instructions. Java has a robust Exception Handling framework.

Exceptions are divided into:
- **Checked Exceptions**: The compiler forces you to handle these using \`try-catch\` blocks or declare them with the \`throws\` keyword (e.g., \`IOException\`).
- **Unchecked Exceptions**: Runtime exceptions that indicate programming errors (e.g., \`NullPointerException\`, \`ArrayIndexOutOfBoundsException\`).

Proper exception handling prevents applications from crashing abruptly. The \`finally\` block is executed regardless of whether an exception was thrown, making it critical for closing resources like database connections or file streams.

\`\`\`java
try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Cannot divide by zero!");
} finally {
    System.out.println("Cleanup code here.");
}
\`\`\``,
            mcq: {
              question: "Which block always executes, regardless of whether an exception occurred?",
              options: ["catch", "try", "finally", "throw"],
              correctIndex: 2,
              explanation: "finally blocks are used for cleanup and always run."
            },
            challenge: "What keyword is used to manually throw an exception?",
            starterCode: "___ new Exception();",
            expectedOutput: "throw",
            hints: ["Five letters."]
          },
          {
            id: "java_intermediate_4",
            title: "Collections Framework",
            estimatedMinutes: 45,
            xpReward: 20,
            content: `The Java Collections Framework provides a standardized architecture for storing and manipulating groups of objects. It frees developers from writing custom data structures.

Key interfaces include:
- **List**: An ordered collection that allows duplicates (\`ArrayList\`, \`LinkedList\`).
- **Set**: A collection that cannot contain duplicate elements (\`HashSet\`, \`TreeSet\`).
- **Map**: An object that maps unique keys to values (\`HashMap\`, \`TreeMap\`).

Understanding the performance characteristics (Big O notation) of these collections is critical for writing efficient Java code.

\`\`\`java
List<String> names = new ArrayList<>();
names.add("Alice");
names.add("Bob");

Map<String, Integer> ages = new HashMap<>();
ages.put("Alice", 25);
\`\`\`

For example, \`ArrayList\` is incredibly fast for reading elements because it is backed by an array, but slow for inserting in the middle. \`LinkedList\` is the opposite.`,
            mcq: {
              question: "Which collection allows storing key-value pairs?",
              options: ["ArrayList", "HashSet", "HashMap", "LinkedList"],
              correctIndex: 2,
              explanation: "HashMap maps keys to values."
            },
            challenge: "What is the dynamic version of an array in Java?",
            starterCode: "___<String> list = new ___<>();",
            expectedOutput: "ArrayList",
            hints: ["Nine letters."]
          }
        ]

      },
      {
        id: "advanced", label: "Advanced", xpReward: 100,
        miniProject: {
          title: "Multi-threaded Web Server", brief: "Build a simple web server that handles multiple requests simultaneously.", expectedOutput: "A functional multi-threaded server.",
          starterCode: "import java.io.*;\nimport java.net.*;\nimport java.util.concurrent.*;\n\npublic class WebServer {\n    public static void main(String[] args) throws IOException {\n        ServerSocket serverSocket = new ServerSocket(8080);\n        ExecutorService threadPool = Executors.newFixedThreadPool(10);\n        \n        System.out.println(\"Server listening on port 8080...\");\n        \n        while (true) {\n            Socket clientSocket = serverSocket.accept();\n            threadPool.submit(new ClientHandler(clientSocket));\n        }\n    }\n}\n\nclass ClientHandler implements Runnable {\n    private Socket socket;\n    public ClientHandler(Socket socket) { this.socket = socket; }\n    \n    @Override\n    public void run() {\n        // Read request, write HTTP response\n        // e.g. \"HTTP/1.1 200 OK\\r\\n\\r\\nHello World!\"\n    }\n}"
        },
        lessons: [
          {
            id: "java_advanced_0",
            title: "Streams API",
            estimatedMinutes: 40,
            xpReward: 30,
            content: `Introduced in Java 8, the Streams API represents a monumental shift in how Java developers process collections of objects. A Stream is a sequence of elements supporting sequential and parallel aggregate operations. It brings functional programming paradigms to Java.

Instead of writing verbose \`for\` loops to filter, map, or reduce data, you can build a declarative pipeline of stream operations.

\`\`\`java
List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David");
List<String> result = names.stream()
    .filter(name -> name.startsWith("C"))
    .map(String::toUpperCase)
    .collect(Collectors.toList());
\`\`\`

Streams are 'lazy', meaning intermediate operations (like \`.filter()\`) are not executed until a terminal operation (like \`.collect()\` or \`.forEach()\`) is invoked. Furthermore, by simply changing \`.stream()\` to \`.parallelStream()\`, you can instantly leverage multi-core processors for massive datasets.`,
            mcq: {
              question: "Which of these is a terminal operation in a Stream?",
              options: ["map()", "filter()", "collect()", "sorted()"],
              correctIndex: 2,
              explanation: "Terminal operations like collect close the stream."
            },
            challenge: "What is the name of the interface used to define a function with no name (lambda)?",
            starterCode: "const type = '___ Interface';",
            expectedOutput: "Functional",
            hints: ["An interface with exactly one abstract method."]
          },
          {
            id: "java_advanced_1",
            title: "Generics",
            estimatedMinutes: 45,
            xpReward: 30,
            content: `Generics were introduced to add stability to your code by making more of your bugs detectable at compile time. They enable you to parameterize types.

Before Generics, you could put any object into an \`ArrayList\`, which required risky casting when retrieving it and could easily result in a \`ClassCastException\` at runtime.

\`\`\`java
// Without Generics
List list = new ArrayList();
list.add("Hello");
String s = (String) list.get(0);

// With Generics
List<String> list = new ArrayList<>();
list.add("Hello");
String s = list.get(0); // No casting required!
\`\`\`

Generics are extensively used in building the Collections framework and are essential for writing robust, type-safe APIs. You can also define your own generic classes (e.g., \`class Box<T> { private T content; }\`).`,
            mcq: {
              question: "What is a main benefit of Generics?",
              options: ["Performance", "Type safety at compile time", "Shorter code", "Memory efficiency"],
              correctIndex: 1,
              explanation: "Generics prevent ClassCastExceptions by checking types at compile time."
            },
            challenge: "What character is used to represent a generic type parameter?",
            starterCode: "List<___> list;",
            expectedOutput: "T",
            hints: ["A single capital letter, often 'T'."]
          },
          {
            id: "java_advanced_2",
            title: "Lambda Expressions",
            estimatedMinutes: 40,
            xpReward: 30,
            content: `Also introduced in Java 8, Lambda Expressions are a concise way to represent anonymous functions—methods without a name. They are used primarily to implement functional interfaces (interfaces with exactly one abstract method, like \`Runnable\` or \`Comparator\`).

The syntax \`(parameters) -> expression\` significantly reduces the boilerplate code previously required by anonymous inner classes.

\`\`\`java
// Before Java 8
Thread t = new Thread(new Runnable() {
    public void run() {
        System.out.println("Running...");
    }
});

// With Lambda
Thread t = new Thread(() -> System.out.println("Running..."));
\`\`\`

Lambdas are the enablers for the Streams API, allowing you to pass behavior as a parameter. Understanding Lambdas is essential for writing modern, readable, and functional-style Java code.`,
            mcq: {
              question: "What is the syntax for a lambda in Java?",
              options: ["() -> { }", "() => { }", "function() { }", "lambda()"],
              correctIndex: 0,
              explanation: "Java uses the arrow operator (->) for lambdas."
            },
            challenge: "Complete the lambda: (n) ___ System.out.println(n)",
            starterCode: "list.forEach(n ___ System.out.println(n));",
            expectedOutput: "->",
            hints: ["A hyphen and a greater than sign."]
          },
          {
            id: "java_advanced_3",
            title: "Multithreading",
            estimatedMinutes: 50,
            xpReward: 30,
            content: `Multithreading is a core feature of Java that allows concurrent execution of two or more parts of a program for maximum utilization of the CPU. A thread is an independent path of execution.

Java provides the \`Thread\` class and the \`Runnable\` interface to create threads. Advanced multithreading involves the \`java.util.concurrent\` package, which provides high-level concurrency utilities:
- **ExecutorService**: Thread pools to manage worker threads.
- **ConcurrentHashMap**: Thread-safe collections.
- **CountDownLatch**: Synchronization aids.

Concurrency is notoriously difficult due to race conditions and deadlocks, requiring careful use of the \`synchronized\` keyword, Locks, and atomic variables to ensure thread safety when sharing mutable state.`,
            mcq: {
              question: "Which interface should you implement to create a task that can be run by a Thread?",
              options: ["Task", "Runnable", "Process", "Execution"],
              correctIndex: 1,
              explanation: "Runnable is the standard functional interface for threads."
            },
            challenge: "Which method starts a thread's execution?",
            starterCode: "myThread.___();",
            expectedOutput: "start",
            hints: ["Five letters."]
          },
          {
            id: "java_advanced_4",
            title: "JDBC Basics",
            estimatedMinutes: 45,
            xpReward: 30,
            content: `Java Database Connectivity (JDBC) is the Java API that manages connecting to a database, issuing queries and commands, and handling result sets obtained from the database. It is the fundamental technology bridging the JVM and relational databases like PostgreSQL, MySQL, or Oracle.

A typical JDBC workflow involves:
1. Establishing a \`Connection\` via a \`DriverManager\`.
2. Creating a \`PreparedStatement\`.
3. Executing the SQL.
4. Iterating through a \`ResultSet\`.

\`\`\`java
String query = "SELECT * FROM users WHERE age > ?";
try (Connection conn = DriverManager.getConnection(url, user, pass);
     PreparedStatement pstmt = conn.prepareStatement(query)) {
    pstmt.setInt(1, 18);
    ResultSet rs = pstmt.executeQuery();
    while (rs.next()) {
        System.out.println(rs.getString("name"));
    }
}
\`\`\`

\`PreparedStatement\` is heavily emphasized because it compiles the SQL query beforehand, preventing catastrophic SQL Injection attacks. While ORMs like Hibernate abstract this, understanding JDBC is vital.`,
            mcq: {
              question: "Which object is used to execute a static SQL statement and return the results it produces?",
              options: ["Connection", "Statement", "Result", "Driver"],
              correctIndex: 1,
              explanation: "Statement objects are used to execute queries."
            },
            challenge: "What method on a Statement object executes a SELECT query?",
            starterCode: "stmt.___Query(\"SELECT...\");",
            expectedOutput: "execute",
            hints: ["Seven letters."]
          }
        ]

      }
    ]
  },

  /* ───────────────────────── 12. Go ───────────────────────── */
  12: {
    title: "Go (Golang)",
    domain: "Backend & Systems",
    lang: "Go",
    time: "10h",
    difficulty: "Intermediate",
    color: "#00add8",
    slogan: "Simple, reliable, and efficient software at scale.",
    docs: { label: "Go Docs", url: "https://go.dev/doc/" },
    jobs: { roles: ["Backend Engineer", "Cloud Engineer"], salary: "₹8 – 35 LPA" },
    youtube: { main: { title: "Go Full Course", channel: "freeCodeCamp", url: "https://www.youtube.com/watch?v=YS4e4q9oBaU" } },
    levels: [
      {
        id: "beginner", label: "Beginner", xpReward: 50,
        miniProject: {
          title: "CLI Tool", brief: "Build a simple CLI tool.", expectedOutput: "A Go binary.",
          starterCode: "package main\n\nimport (\n    \"flag\"\n    \"fmt\"\n    \"os\"\n    \"strings\"\n)\n\nfunc main() {\n    filePath := flag.String(\"file\", \"\", \"Path to the text file\")\n    flag.Parse()\n\n    if *filePath == \"\" {\n        fmt.Println(\"Please provide a file using -file\")\n        return\n    }\n\n    content, err := os.ReadFile(*filePath)\n    if err != nil {\n        fmt.Println(\"Error reading file:\", err)\n        return\n    }\n\n    text := string(content)\n    lines := len(strings.Split(text, \"\\n\"))\n    words := len(strings.Fields(text))\n    chars := len(text)\n\n    fmt.Printf(\"Lines:\\t%d\\nWords:\\t%d\\nChars:\\t%d\\n\", lines, words, chars)\n}"
        },
        lessons: [
          {
            id: "go_beginner_0",
            title: "Go Basics",
            estimatedMinutes: 15,
            xpReward: 20,
            setup: {
              windows: [
                "Download the Go installer from https://go.dev/dl/",
                "Run the .msi file and follow the instructions.",
                "Open CMD and type: go version",
                "Create a file named 'hello.go' and run it with: go run hello.go",
              ],
              mac: [
                "Install Go via Homebrew: brew install go",
                "Or download the macOS package from https://go.dev/dl/",
                "Verify: go version",
              ],
            },
            content:
              "Go (also known as Golang) is an open-source, statically typed, compiled programming language developed at Google by Robert Griesemer, Rob Pike, and Ken Thompson in 2009. It combines the performance and safety of C++ with the simplicity of Python.\n\n" +
              "Here is a minimal Go program:\n\n" +
              "```go\n" +
              "package main\n\n" +
              "import \"fmt\"\n\n" +
              "func main() {\n" +
              "    fmt.Println(\"Hello, World!\")\n" +
              "}\n" +
              "```\n\n" +
              "Key Rules to Remember:\n" +
              "- Packages: Every Go file belongs to a package. Execution starts in the `main` package.\n" +
              "- Imports: Use the `import` statement to include other packages (like `fmt` for formatting input/output).\n" +
              "- Short variable declaration (`:=`): Inside functions, you can declare and initialize variables without explicitly writing the type, e.g., `x := 10`.",
            mcq: {
              question: "How do you declare a variable with type inference in Go?",
              options: ["var x = 10", "x := 10", "int x = 10", "let x = 10"],
              correctIndex: 1,
              explanation: "The short variable declaration operator (:=) infers the type."
            },
            challenge: "What keyword is used to declare a package in a Go file?",
            starterCode: "___ main",
            expectedOutput: "package",
            hints: ["Every Go file must start with this."]
          },
          {
            id: "go_beginner_1",
            title: "Control Flow",
            estimatedMinutes: 20,
            xpReward: 20,
            content:
              "Go keeps things extremely clean and simple by providing only a few control flow mechanisms, but they are incredibly powerful.\n\n" +
              "1. Conditional Statements (`if`):\n" +
              "Parentheses are not used around conditions in Go, but curly braces `{}` are mandatory.\n" +
              "```go\n" +
              "score := 85\n" +
              "if score >= 90 {\n" +
              "    fmt.Println(\"A Grade\")\n" +
              "} else if score >= 80 {\n" +
              "    fmt.Println(\"B Grade\")\n" +
              "} else {\n" +
              "    fmt.Println(\"C Grade\")\n" +
              "}\n" +
              "```\n\n" +
              "2. The Only Loop: `for`:\n" +
              "Go has no `while` or `do-while` loops. The `for` loop is used for all looping needs.\n" +
              "- Standard 3-component loop:\n" +
              "```go\n" +
              "for i := 0; i < 5; i++ {\n" +
              "    fmt.Println(i)\n" +
              "}\n" +
              "```\n" +
              "- Mimicking a `while` loop (only condition is specified):\n" +
              "```go\n" +
              "count := 0\n" +
              "for count < 3 {\n" +
              "    fmt.Println(count)\n" +
              "    count++\n" +
              "}\n" +
              "```",
            mcq: {
              question: "How many looping keywords does Go have?",
              options: ["1 (for)", "2 (for, while)", "3 (for, while, do)", "0"],
              correctIndex: 0,
              explanation: "Go only has 'for', which can be used to mimic while loops."
            },
            challenge: "Write a for loop condition that runs while i is less than 10.",
            starterCode: "for i := 0; ___ ; i++ { }",
            expectedOutput: "i < 10",
            hints: ["Standard comparison operator."]
          },
          {
            id: "go_beginner_2",
            title: "Functions",
            estimatedMinutes: 25,
            xpReward: 20,
            content:
              "Functions are the core building blocks of Go programs. Go functions are versatile and have some unique characteristics.\n\n" +
              "Function Declaration Syntax:\n" +
              "```go\n" +
              "func add(x int, y int) int {\n" +
              "    return x + y\n" +
              "}\n" +
              "```\n" +
              "*(Notice that the parameter types and the return type are written AFTER the names!)*\n\n" +
              "Key features in Go:\n" +
              "1. Multiple Return Values: A function can return more than one result. This is commonly used in Go to return a value and an error.\n" +
              "```go\n" +
              "func divide(a, b float64) (float64, error) {\n" +
              "    if b == 0 {\n" +
              "        return 0, fmt.Errorf(\"division by zero\")\n" +
              "    }\n" +
              "    return a / b, nil\n" +
              "}\n" +
              "```\n" +
              "2. Named Returns: You can name the return values in the function signature, which behave as local variables initialized to zero-values.",
            mcq: {
              question: "How do you define a function in Go?",
              options: ["def myFunc()", "function myFunc()", "func myFunc()", "void myFunc()"],
              correctIndex: 2,
              explanation: "The 'func' keyword is used to define functions."
            },
            challenge: "What keyword is used to return values from a function?",
            starterCode: "func add(a, b int) int { ___ a + b }",
            expectedOutput: "return",
            hints: ["Standard return keyword."]
          },
          {
            id: "go_beginner_3",
            title: "Arrays & Slices",
            estimatedMinutes: 25,
            xpReward: 20,
            content:
              "Go has both fixed-size Arrays and dynamic Slices. In practice, slices are used almost everywhere due to their flexibility.\n\n" +
              "1. Arrays (Fixed Size):\n" +
              "Once declared, their size cannot be changed.\n" +
              "```go\n" +
              "var arr [5]int // An array of 5 integers, initialized to 0\n" +
              "arr[0] = 100\n" +
              "primes := [3]int{2, 3, 5} // Declared and initialized\n" +
              "```\n\n" +
              "2. Slices (Dynamic size):\n" +
              "Slices are wrappers around arrays. They can grow dynamically.\n" +
              "```go\n" +
              "// Creating a slice\n" +
              "names := []string{\"Alice\", \"Bob\"}\n\n" +
              "// Adding elements using the built-in append function\n" +
              "names = append(names, \"Charlie\")\n" +
              "fmt.Println(names) // [Alice Bob Charlie]\n" +
              "```\n\n" +
              "- Use `len(slice)` to get the length of a slice or array.\n" +
              "- Slices are 0-indexed.",
            mcq: {
              question: "What function adds elements to a slice?",
              options: ["push()", "add()", "append()", "extend()"],
              correctIndex: 2,
              explanation: "The built-in 'append' function is used for slices."
            },
            challenge: "Complete the slice declaration.",
            starterCode: "s := []int{1, 2, 3}; s = ___(s, 4);",
            expectedOutput: "append",
            hints: ["Starts with 'a'."]
          },
          {
            id: "go_beginner_4",
            title: "Structs & Maps",
            estimatedMinutes: 30,
            xpReward: 20,
            content:
              "Go does not have classes. Instead, it uses Structs to create custom data types by grouping fields together.\n\n" +
              "1. Structs (Custom Types):\n" +
              "```go\n" +
              "type User struct {\n" +
              "    Username string\n" +
              "    Age      int\n" +
              "    Active   bool\n" +
              "}\n\n" +
              "// Initializing a struct\n" +
              "u1 := User{Username: \"golang_dev\", Age: 25, Active: true}\n" +
              "fmt.Println(u1.Username) // Access fields using dot notation\n" +
              "```\n\n" +
              "2. Maps (Key-Value Stores):\n" +
              "Maps associate keys with values. They are declared as `map[keyType]valueType`.\n" +
              "```go\n" +
              "// Initialize a map using make()\n" +
              "salaries := make(map[string]int)\n" +
              "salaries[\"Alice\"] = 70000\n" +
              "salaries[\"Bob\"] = 85000\n\n" +
              "// Delete an entry\n" +
              "delete(salaries, \"Alice\")\n" +
              "```",
            mcq: {
              question: "How do you access a field 'Name' in a struct 'p'?",
              options: ["p->Name", "p.Name", "p['Name']", "p::Name"],
              correctIndex: 1,
              explanation: "Go uses dot notation to access struct fields."
            },
            challenge: "What built-in function initializes a map?",
            starterCode: "m := ___(map[string]int)",
            expectedOutput: "make",
            hints: ["Four letters, used for slices and maps."]
          }
        ]
      },
      {
        id: "intermediate", label: "Intermediate", xpReward: 75,
        miniProject: {
          title: "Concurrent Scraper", brief: "Build a web scraper that uses goroutines to fetch pages in parallel.", expectedOutput: "A fast, concurrent scraper.",
          starterCode: "package main\n\nimport (\n    \"fmt\"\n    \"net/http\"\n    \"sync\"\n    // \"github.com/PuerkitoBio/goquery\"\n)\n\nfunc fetchTitle(url string, wg *sync.WaitGroup) {\n    defer wg.Done()\n    \n    // Make GET request\n    resp, err := http.Get(url)\n    if err != nil {\n        fmt.Println(\"Error fetching\", url)\n        return\n    }\n    defer resp.Body.Close()\n    \n    // Parse HTML and find <title> using goquery\n    fmt.Printf(\"Fetched %s\\n\", url)\n}\n\nfunc main() {\n    urls := []string{\"https://golang.org\", \"https://google.com\"}\n    var wg sync.WaitGroup\n    \n    for _, url := range urls {\n        wg.Add(1)\n        go fetchTitle(url, &wg)\n    }\n    \n    wg.Wait()\n    fmt.Println(\"Scraping complete!\")\n}"
        },
        lessons: [
          {
            id: "go_intermediate_0",
            title: "Pointers",
            estimatedMinutes: 35,
            xpReward: 25,
            content: "Pointers hold the memory address of a value. '&' generates a pointer, '*' dereferences it.",
            mcq: {
              question: "What does the & operator do?",
              options: ["Dereferences", "Multiplies", "Gets the address", "Declares a slice"],
              correctIndex: 2,
              explanation: "& is the address-of operator."
            },
            challenge: "What symbol is used to declare a pointer to an int?",
            starterCode: "var p ___int",
            expectedOutput: "*",
            hints: ["The asterisk symbol."]
          },
          {
            id: "go_intermediate_1",
            title: "Methods",
            estimatedMinutes: 35,
            xpReward: 25,
            content: "Go doesn't have classes, but you can define methods on types using a 'receiver'.",
            mcq: {
              question: "Where is the receiver defined in a method?",
              options: ["After the name", "Before the name", "Inside the function body", "In the return type"],
              correctIndex: 1,
              explanation: "Receivers are defined in parentheses before the function name."
            },
            challenge: "Complete the receiver definition for struct 'User'.",
            starterCode: "func (u ___) GetName() string { }",
            expectedOutput: "User",
            hints: ["The name of the struct."]
          },
          {
            id: "go_intermediate_2",
            title: "Interfaces",
            estimatedMinutes: 40,
            xpReward: 25,
            content: "Interfaces define behavior. A type implements an interface implicitly if it implements all its methods.",
            mcq: {
              question: "Do you need to explicitly declare that a struct implements an interface?",
              options: ["Yes, using 'implements'", "No, it's implicit", "Only for public interfaces", "Only for empty interfaces"],
              correctIndex: 1,
              explanation: "Go interfaces are satisfied implicitly (duck typing)."
            },
            challenge: "What is an interface with no methods called?",
            starterCode: "var i ___ {}",
            expectedOutput: "interface",
            hints: ["The 'empty interface' keyword."]
          },
          {
            id: "go_intermediate_3",
            title: "Goroutines",
            estimatedMinutes: 35,
            xpReward: 25,
            content: "Goroutines are lightweight threads managed by the Go runtime. Start one with the 'go' keyword.",
            mcq: {
              question: "Which keyword launches a concurrent function?",
              options: ["async", "thread", "go", "routine"],
              correctIndex: 2,
              explanation: "The 'go' keyword starts a goroutine."
            },
            challenge: "Complete the line to run doWork concurrently.",
            starterCode: "___ doWork()",
            expectedOutput: "go",
            hints: ["Two letters."]
          },
          {
            id: "go_intermediate_4",
            title: "Channels",
            estimatedMinutes: 45,
            xpReward: 25,
            content: "Channels are the pipes that connect concurrent goroutines. You can send values into channels from one goroutine and receive those values into another.",
            mcq: {
              question: "How do you create a channel for integers?",
              options: ["make(chan int)", "new(channel int)", "chan.NewInt()", "make(int chan)"],
              correctIndex: 0,
              explanation: "Channels are created using make and the chan keyword."
            },
            challenge: "What is the arrow symbol to send data into a channel 'ch'?",
            starterCode: "ch ___ 42",
            expectedOutput: "<-",
            hints: ["A less-than sign and a hyphen."]
          }
        ]
      },
      {
        id: "advanced", label: "Advanced", xpReward: 100,
        miniProject: {
          title: "Distributed Task Runner", brief: "Use goroutines and channels to build a system that processes tasks in parallel with a worker pool.", expectedOutput: "A high-performance task processor.",
          starterCode: "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc worker(id int, jobs <-chan int, results chan<- int) {\n    for j := range jobs {\n        fmt.Printf(\"Worker %d processing job %d\\n\", id, j)\n        time.Sleep(time.Second) // Simulate work\n        results <- j * 2\n    }\n}\n\nfunc main() {\n    jobs := make(chan int, 10)\n    results := make(chan int, 10)\n\n    // Start 3 workers\n    for w := 1; w <= 3; w++ {\n        go worker(w, jobs, results)\n    }\n\n    // Send 5 jobs\n    for j := 1; j <= 5; j++ {\n        jobs <- j\n    }\n    close(jobs)\n\n    // Collect results\n    for a := 1; a <= 5; a++ {\n        <-results\n    }\n    fmt.Println(\"All tasks processed.\")\n}"
        },
        lessons: [
          {
            id: "go_advanced_0",
            title: "WaitGroups",
            estimatedMinutes: 45,
            xpReward: 30,
            content: "Use 'sync.WaitGroup' to wait for multiple goroutines to finish.",
            mcq: {
              question: "Which method is called to signal that a goroutine is done?",
              options: ["Finish()", "Done()", "Complete()", "End()"],
              correctIndex: 1,
              explanation: "wg.Done() decrements the WaitGroup counter."
            },
            challenge: "Which method increments the WaitGroup counter?",
            starterCode: "wg.___ (1)",
            expectedOutput: "Add",
            hints: ["Three letters, starts with 'A'."]
          },
          {
            id: "go_advanced_1",
            title: "Select Statement",
            estimatedMinutes: 40,
            xpReward: 30,
            content: "The 'select' statement lets a goroutine wait on multiple communication operations.",
            mcq: {
              question: "If multiple cases in a select are ready, what happens?",
              options: ["The first one executes", "The last one executes", "A random one is chosen", "The program crashes"],
              correctIndex: 2,
              explanation: "Go selects one pseudo-randomly if multiple are ready."
            },
            challenge: "What is the keyword for the fallback case in select?",
            starterCode: "select { case <-ch: ... ___: ... }",
            expectedOutput: "default",
            hints: ["Standard switch-like keyword."]
          },
          {
            id: "go_advanced_2",
            title: "JSON & HTTP",
            estimatedMinutes: 50,
            xpReward: 30,
            content: "Go's 'net/http' package makes it easy to create web servers. Use 'encoding/json' for JSON data.",
            mcq: {
              question: "Which function starts an HTTP server?",
              options: ["http.Start()", "http.ListenAndServe()", "http.Serve()", "http.Run()"],
              correctIndex: 1,
              explanation: "ListenAndServe is the standard way to start a server."
            },
            challenge: "What method on a JSON encoder writes data?",
            starterCode: "json.NewEncoder(w).___(data)",
            expectedOutput: "Encode",
            hints: ["Six letters, starts with 'E'."]
          },
          {
            id: "go_advanced_3",
            title: "Testing",
            estimatedMinutes: 40,
            xpReward: 30,
            content: "Go has built-in support for testing with the 'testing' package and 'go test' command.",
            mcq: {
              question: "Test functions must start with which word?",
              options: ["Check", "Verify", "Test", "Validate"],
              correctIndex: 2,
              explanation: "Test functions must start with 'Test', e.g., TestSum."
            },
            challenge: "What is the type of the argument passed to a test function?",
            starterCode: "func TestSum(t *testing.___) { }",
            expectedOutput: "T",
            hints: ["A single capital letter."]
          },
          {
            id: "go_advanced_4",
            title: "Go Modules",
            estimatedMinutes: 45,
            xpReward: 30,
            content: "Go Modules are the official dependency management system. Initialize with 'go mod init'.",
            mcq: {
              question: "Which file contains the module's dependencies and versions?",
              options: ["dependencies.txt", "go.mod", "package.json", "mod.yaml"],
              correctIndex: 1,
              explanation: "go.mod is the source of truth for dependencies."
            },
            challenge: "What command cleans up unused dependencies?",
            starterCode: "go mod ___",
            expectedOutput: "tidy",
            hints: ["Four letters, means neat."]
          }
        ]
      }
    ]

  },

  /* ───────────────────────── 13. React Native ───────────────────────── */
  13: {
    title: "React Native Mobile Apps",
    domain: "Mobile Development",
    lang: "React Native",
    time: "13h",
    difficulty: "Intermediate",
    color: "#61dafb",
    slogan: "One codebase. Both app stores. The real shortcut to shipping mobile.",
    docs: { label: "Expo Documentation", url: "https://docs.expo.dev/" },
    jobs: {
      roles: ["Mobile Developer", "React Native Engineer", "Cross-Platform App Dev"],
      salary: "₹7 – 28 LPA",
    },
    youtube: {
      main: { title: "Expo Official Tutorial", channel: "Expo", url: "https://docs.expo.dev/tutorial/introduction/" },
      extras: [
        { title: "React Native Animations", channel: "William Candillon", url: "https://www.youtube.com/c/wcandillon" },
        { title: "React Native Tutorial for Beginners", channel: "Programming with Mosh", url: "https://www.youtube.com/watch?v=0-S5a0eXPoc" },
      ],
    },
    levels: [
      {
        id: "beginner", label: "Beginner", xpReward: 50,
        miniProject: {
          title: "Build a profile screen",
          brief: "Create an Expo app with a centered profile screen showing your name, bio, and a styled avatar placeholder.",
          expectedOutput: "A clean profile screen visible in Expo Go.",
          starterCode: "import React from 'react';\nimport { StyleSheet, Text, View, Image } from 'react-native';\n\nexport default function App() {\n  return (\n    <View style={styles.container}>\n      <Image \n        source={{ uri: 'https://via.placeholder.com/150' }} \n        style={styles.avatar} \n      />\n      <Text style={styles.name}>Jane Doe</Text>\n      <Text style={styles.bio}>React Native Developer. I love building mobile apps!</Text>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    alignItems: 'center',\n    justifyContent: 'center',\n    backgroundColor: '#fff',\n  },\n  avatar: {\n    width: 100, height: 100, borderRadius: 50, marginBottom: 16\n  },\n  name: { fontSize: 24, fontWeight: 'bold' },\n  bio: { fontSize: 16, color: '#666', textAlign: 'center', padding: 20 }\n});"
        },
        lessons: [
          {
            id: "rn_beginner_0",
            title: "What is React Native?",
            estimatedMinutes: 20,
            xpReward: 20,
            setup: {
              windows: [
                "Install Node.js (LTS) from https://nodejs.org/",
                "Open PowerShell and run: npx create-expo-app my-app",
                "Navigate to the folder: cd my-app",
                "Start the server: npx expo start",
                "Install 'Expo Go' on your Android/iPhone from the app store to preview.",
              ],
              mac: [
                "Install Node.js via Homebrew: brew install node",
                "Open Terminal and run: npx create-expo-app my-app",
                "Navigate to the folder: cd my-app",
                "Start the server: npx expo start",
                "Open 'Expo Go' on your iPhone/Android and scan the QR code to see your app.",
              ],
            },
            content:
              "React Native is a framework created by Facebook that lets you build real, native mobile applications using JavaScript and React.\n\n" +
              "In traditional mobile development, you have to write Swift for iOS and Kotlin for Android. If you want to change a button color, you have to do it twice.\n\n" +
              "React Native changes this. You write one JavaScript codebase, and React Native translates your React components into the actual native UI elements of the phone.\n" +
              "Unlike 'WebView' apps (like Cordova or Ionic) which just show a website inside an app shell, React Native renders a true `UIView` on iOS and `android.view` on Android. This means the app feels fast, smooth, and authentic.",
            mcq: {
              question: "How does React Native render its user interface?",
              options: [
                "It loads a mobile-friendly website inside a browser View.",
                "It uses HTML and CSS directly on the device.",
                "It translates React components into true native UI elements like UIView.",
                "It compiles JavaScript into Swift or Kotlin before running.",
              ],
              correctIndex: 2,
              explanation: "React Native bridges your JavaScript logic to the device's native rendering engine, meaning a `<View>` in JS becomes an actual native View on the phone.",
            },
            challenge: "Write a short comment explaining why a company might choose React Native over building separate iOS and Android apps.",
            starterCode:
              "// TODO: Write a comment explaining the main benefit of React Native.\n\nconst framework = 'React Native';",
            expectedOutput: "A comment explaining cross-platform efficiency.",
            hints: [
              "Think about the phrase 'Write once, run anywhere'.",
              "Consider the cost of hiring two different engineering teams.",
            ],
          },
          {
            id: "rn_beginner_1",
            title: "Setting up Expo",
            estimatedMinutes: 25,
            xpReward: 20,
            content:
              "Setting up React Native from scratch requires downloading Android Studio (for Android) and Xcode (for iOS), which are massive programs that take hours to configure.\n\n" +
              "Expo solves this. Expo is a framework and platform built around React Native that gives you a fast, zero-config setup.\n\n" +
              "When you run `npx create-expo-app`, you get a ready-to-code project. To see your app, you simply run `npx expo start`. This generates a QR code in your terminal.\n\n" +
              "You then open the 'Expo Go' app on your real phone, scan the QR code, and your app instantly appears. When you save a file on your computer, your phone updates immediately over Wi-Fi (Hot Reloading).",
            mcq: {
              question: "What is the primary benefit of using Expo for React Native?",
              options: [
                "It makes the app run 10x faster.",
                "It allows you to test on a physical device immediately without installing Xcode or Android Studio.",
                "It automatically converts your app into a website.",
                "It forces you to write code in TypeScript.",
              ],
              correctIndex: 1,
              explanation: "Expo provides the 'Expo Go' sandbox app, letting you bypass complex native SDK setups and immediately run your code on a real device.",
            },
            challenge: "Write the command you would run in your terminal to create a new Expo project named 'FitryApp', and the command to start the server.",
            starterCode:
              "// Command to create the app:\nconst createCommand = '';\n\n// Command to start the server:\nconst startCommand = '';",
            expectedOutput: "createCommand = 'npx create-expo-app FitryApp', startCommand = 'npx expo start'",
            hints: [
              "Use 'npx create-expo-app' followed by the project name.",
              "Use 'npx expo start' to boot up the Metro bundler.",
            ],
          },
          {
            id: "rn_beginner_2",
            title: "Core Components",
            estimatedMinutes: 30,
            xpReward: 20,
            content: `In web development with React, you use DOM elements like \`<div>\`, \`<span>\`, and \`<img>\`. React Native does not use the DOM; instead, it provides Core Components that map directly to native UI widgets. The most fundamental component is \`<View>\`, which acts like a \`<div>\`, serving as a container for layout. For displaying text, you must use the \`<Text>\` component—you cannot place text directly inside a \`<View>\`. Other essentials include \`<Image>\` for graphics, \`<ScrollView>\` for scrolling content, and \`<TextInput>\` for forms. Understanding the mapping from web concepts to these core native components is the first hurdle in transitioning from React web to React Native.`,
            mcq: {
              question: "What happens if you write `<div>Hello World</div>` in a React Native app?",
              options: [
                "It renders a normal text block.",
                "It causes a syntax error because HTML tags do not exist in React Native.",
                "It works perfectly fine if you import HTML.",
                "It creates a hidden element on the screen.",
              ],
              correctIndex: 1,
              explanation: "React Native does not use HTML. You must use Core Components like `<View>` and `<Text>` instead.",
            },
            challenge: "Create a simple screen component that renders a wrapper View, and inside it, a Text component that says 'React Native is awesome!'.",
            starterCode:
              "import React from 'react';\n// TODO: Import View and Text from react-native\n\nexport default function App() {\n  // TODO: Return a View containing a Text component\n  return null;\n}",
            expectedOutput: "A functional component returning `<View><Text>React Native is awesome!</Text></View>`",
            hints: [
              "import { View, Text } from 'react-native';",
              "Make sure to return the JSX inside parentheses.",
            ],
          },
          {
            id: "rn_beginner_3",
            title: "Styling & Flexbox",
            estimatedMinutes: 35,
            xpReward: 20,
            content:
              "In React Native, there are no CSS files and no classNames. Instead, we style components using JavaScript objects.\n\n" +
              "We use `StyleSheet.create()` to define our styles:\n\n" +
              "const styles = StyleSheet.create({\n" +
              "  container: {\n" +
              "    backgroundColor: '#080c09',\n" +
              "    padding: 20,\n" +
              "  },\n" +
              "  title: {\n" +
              "    color: '#a8ff6b',\n" +
              "    fontSize: 24,\n" +
              "    fontWeight: 'bold',\n" +
              "  }\n" +
              "});\n\n" +
              "Notice the syntax: camelCase properties (`backgroundColor` instead of `background-color`) and no units for numbers (`padding: 20` means 20 independent pixels).\n\n" +
              "Flexbox is the default layout engine. However, unlike the web where `flexDirection` defaults to `row`, in React Native `flexDirection` defaults to `column` because mobile phone screens are vertical.",
            mcq: {
              question: "What is a major difference between CSS Flexbox on the web and Flexbox in React Native?",
              options: [
                "React Native does not support justify-content.",
                "The default flexDirection in React Native is column, not row.",
                "Flexbox in React Native only works on iOS.",
                "You must specify dimensions in percentages in React Native.",
              ],
              correctIndex: 1,
              explanation: "Because mobile screens are tall and narrow, React Native designers chose `column` as the default `flexDirection` to stack items vertically.",
            },
            challenge: "Style the given component so that the container takes up the full screen (flex: 1), centers content vertically and horizontally, and gives the text a green color.",
            starterCode:
              "import React from 'react';\nimport { View, Text, StyleSheet } from 'react-native';\n\nexport default function App() {\n  return (\n    <View style={styles.container}>\n      <Text style={styles.text}>Centered Content</Text>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: {\n    // TODO: Add flex: 1, justify content, and align items\n  },\n  text: {\n    // TODO: Add color and font size\n  }\n});",
            expectedOutput: "A StyleSheet with flex: 1, justifyContent: 'center', alignItems: 'center' on the container, and styles on the text.",
            hints: [
              "justifyContent: 'center'",
              "alignItems: 'center'",
              "color: 'green'",
            ],
          },
          {
            id: "rn_beginner_4",
            title: "Handling Input",
            estimatedMinutes: 30,
            xpReward: 20,
            content:
              "To make your app interactive, you need to handle user touches and keyboard input.\n\n" +
              "`<TextInput>` replaces the web's `<input>`. Instead of reading the event target, it provides an `onChangeText` prop that gives you the exact string the user typed.\n\n" +
              "For buttons, React Native provides a basic `<Button>`, but it is extremely hard to style. Instead, developers use `<TouchableOpacity>`. It acts like a `<View>` but responds to touches and slightly dims its opacity when pressed, giving great tactile feedback.\n\n" +
              "Example:\n" +
              "const [name, setName] = useState('');\n\n" +
              "return (\n" +
              "  <View>\n" +
              "    <TextInput \n" +
              "      placeholder='Enter name'\n" +
              "      value={name}\n" +
              "      onChangeText={setName} \n" +
              "    />\n" +
              "    <TouchableOpacity onPress={() => alert('Hello ' + name)}>\n" +
              "      <Text>Submit</Text>\n" +
              "    </TouchableOpacity>\n" +
              "  </View>\n" +
              ");",
            mcq: {
              question: "Why do most developers use `<TouchableOpacity>` instead of `<Button>` for custom styling in React Native?",
              options: [
                "Because `<Button>` does not support the onPress event.",
                "Because `<TouchableOpacity>` provides a customizable container that dims on press, whereas `<Button>` has strict platform-specific styling constraints.",
                "Because `<TouchableOpacity>` is the only way to submit a form.",
                "Because `<Button>` is deprecated and will be removed.",
              ],
              correctIndex: 1,
              explanation: "The built-in `<Button>` component renders a default iOS or Android button that cannot have custom padding, borders, or background colors easily. `<TouchableOpacity>` lets you build entirely custom buttons.",
            },
            challenge: "Create a simple form with a state variable called 'email'. Add a TextInput that updates this state, and a TouchableOpacity that acts as a submit button.",
            starterCode:
              "import React, { useState } from 'react';\nimport { View, Text, TextInput, TouchableOpacity } from 'react-native';\n\nexport default function LoginForm() {\n  // TODO: Create an 'email' state variable using useState\n\n  return (\n    <View>\n      {/* TODO: Add a TextInput bound to 'email' */}\n      \n      {/* TODO: Add a TouchableOpacity with an onPress handler */}\n    </View>\n  );\n}",
            expectedOutput: "A functional component with a TextInput using onChangeText={setEmail} and a TouchableOpacity using onPress.",
            hints: [
              "const [email, setEmail] = useState('');",
              "<TextInput value={email} onChangeText={setEmail} />",
              "<TouchableOpacity onPress={() => console.log(email)}><Text>Submit</Text></TouchableOpacity>",
            ],
          },
        ],
      },
      {
        id: "intermediate", label: "Intermediate", xpReward: 75,
        miniProject: {
          title: "Build a scrollable news feed",
          brief: "Build a news feed using FlatList with pull-to-refresh, placeholder images, and styled cards.",
          expectedOutput: "A scrollable, refreshable feed of at least 10 items.",
          starterCode: "import React, { useState } from 'react';\nimport { FlatList, View, Text, StyleSheet, RefreshControl } from 'react-native';\n\nconst INITIAL_DATA = [\n  { id: '1', title: 'React Native 0.73 Released' },\n  { id: '2', title: 'Building Smooth Animations' }\n];\n\nexport default function Feed() {\n  const [refreshing, setRefreshing] = useState(false);\n\n  const onRefresh = () => {\n    setRefreshing(true);\n    // Simulate network request\n    setTimeout(() => setRefreshing(false), 2000);\n  };\n\n  return (\n    <FlatList\n      data={INITIAL_DATA}\n      keyExtractor={item => item.id}\n      renderItem={({ item }) => (\n        <View style={styles.card}><Text>{item.title}</Text></View>\n      )}\n      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}\n    />\n  );\n}\n\nconst styles = StyleSheet.create({\n  card: { padding: 20, margin: 10, backgroundColor: '#f0f0f0', borderRadius: 8 }\n});"
        },
        lessons: [
          {
            id: "rn_intermediate_0",
            title: "Lists & FlatList",
            estimatedMinutes: 40,
            xpReward: 20,
            content:
              "Rendering long lists using `ScrollView` is bad for performance. `FlatList` only renders items that are currently visible on the screen, making it extremely efficient for thousands of items.",
            mcq: {
              question: "Which prop is used to pass the array of data to a `FlatList`?",
              options: ["items", "data", "source", "list"],
              correctIndex: 1,
              explanation: "The `data` prop takes an array of items to render.",
            },
            challenge: "What is the name of the prop used to define how each item in the list should look?",
            starterCode: "const propName = '';",
            expectedOutput: "renderItem",
            hints: ["It's a function that returns a JSX component."],
          },
          {
            id: "rn_intermediate_1",
            title: "Stack Navigation",
            estimatedMinutes: 45,
            xpReward: 20,
            content:
              "React Navigation is the standard library for routing. A 'Stack' Navigator allows you to push new screens on top of others, providing a back button automatically.",
            mcq: {
              question: "How do you move to a screen named 'Details' using the navigation prop?",
              options: [
                "navigation.push('Details')",
                "navigation.navigate('Details')",
                "Both are valid",
                "Neither is valid",
              ],
              correctIndex: 2,
              explanation: "Navigate moves to the screen; Push adds a new instance to the stack.",
            },
            challenge: "What hook do you use to access the navigation object inside a component?",
            starterCode: "const nav = ___();",
            expectedOutput: "useNavigation",
            hints: ["It's provided by @react-navigation/native."],
          },
          {
            id: "rn_intermediate_2",
            title: "Tab Navigation",
            estimatedMinutes: 30,
            xpReward: 20,
            content:
              "Bottom Tab Navigation is common for main app sections (Home, Search, Profile). You use `@react-navigation/bottom-tabs` to create this interface.",
            mcq: {
              question: "Where do tabs usually appear in a mobile app?",
              options: ["At the top", "At the bottom", "In a side menu", "Floating"],
              correctIndex: 1,
              explanation: "Bottom tabs are the standard for reachable mobile navigation.",
            },
            challenge: "What is the name of the wrapper component that contains all the Screen definitions in a Tab navigator?",
            starterCode: "const wrapper = '';",
            expectedOutput: "Tab.Navigator",
            hints: ["It follows the pattern Navigator.____"],
          },
          {
            id: "rn_intermediate_3",
            title: "Working with APIs",
            estimatedMinutes: 40,
            xpReward: 20,
            content:
              "You can use the standard `fetch` API in React Native just like in the web. Results are typically stored in a `useState` hook and displayed in a `FlatList`.",
            mcq: {
              question: "Does React Native support the `axios` library?",
              options: ["Yes", "No", "Only on Android", "Only with Expo"],
              correctIndex: 0,
              explanation: "Axios works perfectly in React Native and is often preferred for complex requests.",
            },
            challenge: "Which lifecycle hook should you use to trigger an API call when a screen loads?",
            starterCode: "___(() => { fetchData(); }, []);",
            expectedOutput: "useEffect",
            hints: ["The most common hook for side effects."],
          },
          {
            id: "rn_intermediate_4",
            title: "Async Storage",
            estimatedMinutes: 35,
            xpReward: 20,
            content:
              "React Native doesn't have `localStorage`. Instead, we use `@react-native-async-storage/async-storage` for simple, unencrypted key-value persistence.",
            mcq: {
              question: "Is Async Storage synchronous or asynchronous?",
              options: ["Synchronous", "Asynchronous", "Both", "Depends on OS"],
              correctIndex: 1,
              explanation: "As the name suggests, all operations (get, set) return a Promise.",
            },
            challenge: "Write the command to save the value 'true' to the key 'isLoggedIn'.",
            starterCode: "await AsyncStorage.___('isLoggedIn', 'true');",
            expectedOutput: "setItem",
            hints: ["Matches the localStorage API name."],
          },
        ],
      },
      {
        id: "advanced", label: "Advanced", xpReward: 100,
        miniProject: {
          title: "Build a multi-screen app with navigation",
          brief: "Build a 3-tab app using React Navigation: Home, Search, and Profile. Each tab should have its own stack.",
          expectedOutput: "A tabbed app with stack navigation inside each tab.",
          starterCode: "import * as React from 'react';\nimport { Text, View } from 'react-native';\nimport { NavigationContainer } from '@react-navigation/native';\nimport { createBottomTabNavigator } from '@react-navigation/bottom-tabs';\n\nfunction HomeScreen() {\n  return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Home!</Text></View>;\n}\n\nfunction SettingsScreen() {\n  return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Settings!</Text></View>;\n}\n\nconst Tab = createBottomTabNavigator();\n\nexport default function App() {\n  return (\n    <NavigationContainer>\n      <Tab.Navigator>\n        <Tab.Screen name=\"Home\" component={HomeScreen} />\n        <Tab.Screen name=\"Settings\" component={SettingsScreen} />\n      </Tab.Navigator>\n    </NavigationContainer>\n  );\n}"
        },
        lessons: [
          {
            id: "rn_advanced_0",
            title: "Native Modules",
            estimatedMinutes: 50,
            xpReward: 30,
            content:
              "Sometimes JS isn't enough. Native Modules allow you to write Swift/Kotlin code and call it from JavaScript. The modern way to do this is using the JSI (JavaScript Interface), which allows direct communication without the old JSON 'Bridge'.",
            mcq: {
              question: "What is the name of the new high-performance architecture for React Native?",
              options: ["Fabric", "Turbo", "Engine", "Drive"],
              correctIndex: 0,
              explanation: "Fabric is the new rendering system that works with the new architecture.",
            },
            challenge: "What is the term for writing platform-specific code in a React Native app?",
            starterCode: "const term = '';",
            expectedOutput: "Native Modules",
            hints: ["They 'bridge' the gap between JS and Native."],
          },
          {
            id: "rn_advanced_1",
            title: "Animations with Reanimated",
            estimatedMinutes: 60,
            xpReward: 30,
            content:
              "The built-in `Animated` API runs on the JS thread, which can cause lag. `react-native-reanimated` runs animations on the UI thread, ensuring smooth 60fps performance even when the JS thread is busy.",
            mcq: {
              question: "Why is Reanimated faster than the standard Animated API?",
              options: [
                "It uses a faster version of JavaScript",
                "It runs animations on the UI thread",
                "It doesn't use the GPU",
                "It is written in Assembly",
              ],
              correctIndex: 1,
              explanation: "By running on the native UI thread, it avoids 'bridge' bottlenecks.",
            },
            challenge: "Which hook do you use to create a value that can be animated in Reanimated?",
            starterCode: "const opacity = ___();",
            expectedOutput: "useSharedValue",
            hints: ["It's like useState but for animations."],
          },
          {
            id: "rn_advanced_2",
            title: "Push Notifications",
            estimatedMinutes: 45,
            xpReward: 30,
            content:
              "Push Notifications are critical for user retention. Expo provides a unified API (`expo-notifications`) that handles both local notifications and remote push notifications via FCM (Android) and APNs (iOS).",
            mcq: {
              question: "What unique identifier do you need to send a push notification to a specific device?",
              options: ["IP Address", "MAC Address", "Push Token", "User Email"],
              correctIndex: 2,
              explanation: "A Push Token is generated by the OS and used to target the notification.",
            },
            challenge: "What is the name of the Expo service that simplifies sending notifications to both iOS and Android?",
            starterCode: "const service = 'Expo ___ Service';",
            expectedOutput: "Push",
            hints: ["EPS stands for..."],
          },
          {
            id: "rn_advanced_3",
            title: "Deployment (App Store & Play Store)",
            estimatedMinutes: 40,
            xpReward: 30,
            content:
              "Deploying requires creating a production build. Expo makes this easy with EAS (Expo Application Services). You run `eas build` to generate `.ipa` (iOS) or `.aab` (Android) files in the cloud.",
            mcq: {
              question: "What is the file format for Android app submissions?",
              options: [".apk", ".exe", ".aab", ".app"],
              correctIndex: 2,
              explanation: "Android App Bundle (.aab) is now the required format for the Play Store.",
            },
            challenge: "What command-line tool is used for Expo cloud builds?",
            starterCode: "const tool = '';",
            expectedOutput: "EAS CLI",
            hints: ["Expo Application Services."],
          },
          {
            id: "rn_advanced_4",
            title: "Performance Optimization",
            estimatedMinutes: 45,
            xpReward: 30,
            content:
              "Performance tips:\n" +
              "- Hermes: Use the high-performance JS engine optimized for React Native.\n" +
              "- Memoization: Use `useMemo` and `useCallback` to prevent unnecessary re-renders.\n" +
              "- Image Optimization: Use small, compressed images and caching.",
            mcq: {
              question: "What is Hermes in the context of React Native?",
              options: ["A styling library", "A high-performance JS engine", "A deployment tool", "An icon set"],
              correctIndex: 1,
              explanation: "Hermes is a small, lightweight JS engine optimized for mobile apps.",
            },
            challenge: "Which tool can you use to profile memory and CPU usage in a React Native app?",
            starterCode: "const tool = 'React Native ___';",
            expectedOutput: "Debugger",
            hints: ["It's part of the standard devtools."],
          },
        ],
      },
    ],
  },
};

/* ─────────────────────────────────────────────
   Backward-compat: flatten levels[].lessons[]
   into a top-level course.lessons[] so existing
   CourseView keeps working until it is migrated.
   ───────────────────────────────────────────── */
Object.values(courseData).forEach(course => {
  const flat = [];
  (course.levels || []).forEach(level => {
    (level.lessons || []).forEach(lesson => {
      flat.push({ ...lesson, _level: level.id });
    });
  });
  // Only override if there isn't already a lessons key
  if (!course.lessons) {
    course.lessons = flat;
  }
});

// Generate a flat array for the catalog/dashboard
export const allCourses = Object.entries(courseData).map(([id, data]) => ({
  id: parseInt(id),
  title: data.title,
  domain: data.domain,
  lang: data.lang || 'N/A',
  time: data.time || 'TBD',
  lessons: (data.lessons || []).length,
  difficulty: data.difficulty || 'Beginner',
  color: data.color,
  why: data.slogan,
  tag: data.domain.split(' ')[0].toLowerCase() // Simple tag for dashboard
}));

export default courseData;
