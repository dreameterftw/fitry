import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import './Insights.css';

/* ── Placeholder advice data ─────────────────────────────────
   Replace these with real advice from faculty and seniors
   when available. Each entry has:
     name     — advisor name
     role     — their current role / title
     years    — years of experience
     domain   — area of expertise
     short    — one-line pull-quote
     full     — extended story / advice (paragraphs separated by \n\n)
     tip      — one actionable takeaway
   ────────────────────────────────────────────────────────── */
const seniors = [
  // ── JavaScript (Heet Patel) ─────────────────────────
  {
    name: 'Heet Patel', role: 'BTech IT Second Year', years: 0, domain: 'JavaScript',
    short: '“Don’t skip arrays, objects, functions, and the DOM — they become the base for everything in React and Node.”',
    full: 'Many beginners rush to build fancy React apps or backends in Node.js without fully grasping vanilla JavaScript. They struggle because React is just JavaScript, and Node is just JavaScript. When you do not know how array methods like map and filter work, or how object reference and closures function, you get lost.\n\nTake your time with the basics. Practice creating elements dynamically, selecting elements using querySelector, and handling events manually. When you understand how the browser DOM works, modern frameworks will make infinite sense.',
    tip: 'Build a dynamic checklist app using only vanilla HTML, CSS, and JS (document.createElement) to master DOM manipulation.'
  },
  {
    name: 'Heet Patel', role: 'BTech IT Second Year', years: 0, domain: 'JavaScript',
    short: '“Tutorials help only until a point. Real growth starts when you build projects without copying.”',
    full: 'It is extremely easy to get stuck in "tutorial hell" — watching course after course, building beautiful apps by copying the instructor\'s code line-by-line, and feeling like a genius. But the moment you open an empty code editor to build something on your own, you freeze.\n\nReal growth starts when you struggle. It is when you have to think about how to structure your files, how to state-manage, and how to debug an error that no one else has solved. Stop copying, start coding on your own, and allow yourself to make mistakes.',
    tip: 'Pick a project from a tutorial you finished, close the video, and try to rebuild it entirely from scratch in a fresh folder.'
  },
  {
    name: 'Heet Patel', role: 'BTech IT Second Year', years: 0, domain: 'JavaScript',
    short: '“End-to-end projects teach more than isolated practice problems. Go slow and understand the ‘why’ behind things.”',
    full: 'Solving isolated exercises on coding platforms is useful for syntax, but it doesn\'t teach you how software is built in the real world. A real application has frontend, backend, routing, API integrations, data validation, and deployment.\n\nGo slow. Instead of rushing through 10 tutorials a week, pick one simple project idea and take it from a blank page all the way to a hosted, functional application. Focus on understanding why you chose a specific database, why you structured your API endpoints a certain way, and how components interact.',
    tip: 'Document your build process in a README.md file. Explaining your choices is the best way to solidify your understanding.'
  },

  // ── C++ (Heet Patel) ─────────────────────────
  {
    name: 'Heet Patel', role: 'BTech IT Second Year', years: 0, domain: 'C++',
    short: '“Learn concepts deeply before coding — dry runs save more time than debugging blindly.”',
    full: 'When you get a coding problem, the immediate urge is to start typing code. This is a trap. You end up writing disorganized loops, getting memory errors, and debugging blindly for hours without realizing the core logic was flawed from the start.\n\nAlways do a dry run on paper first. Take a pencil, write down your variables, and trace the values step-by-step through your loops. If you cannot trace it on paper with a small sample input, your code will not magically work on a compiler.',
    tip: 'Use a whiteboard or notebook to trace your algorithm with at least three different edge-case inputs before writing any C++ code.'
  },
  {
    name: 'Heet Patel', role: 'BTech IT Second Year', years: 0, domain: 'C++',
    short: '“Pointers, vectors, maps, references, and loops should become second nature.”',
    full: 'C++ is powerful because it gives you direct control over memory and structure, but that power comes with responsibility. Concepts like pointers and references are not just theoretical hurdles — they are the engine of high-performance C++ applications.\n\nSpend dedicated time practicing with standard templates (STL) like vectors and maps, and understanding memory allocation. When you understand exactly where a variable resides in memory and how reference passing works, you write dramatically more stable and performant code.',
    tip: 'Implement a simple custom vector class or linked list in C++ to thoroughly master pointers and manual memory management.'
  },
  {
    name: 'Heet Patel', role: 'BTech IT Second Year', years: 0, domain: 'C++',
    short: '“Competitive programming and terminal-based games improve logic faster than theory alone.”',
    full: 'Reading textbooks or watching theory lectures can only get you so far in C++. Your logic-building muscles need active resistance training. Two of the best ways to get this are competitive programming and building simple, interactive terminal-based games.\n\nWhen you build a text-based adventure, a terminal chess game, or solve algorithmic puzzles, you are forced to manage game state, parse user input, optimize search paths, and handle complex conditional logic. It makes coding deeply engaging and memorable.',
    tip: 'Build a simple grid-based Snake game or Tic-Tac-Toe that runs entirely in the Windows console/terminal.'
  },

  // ── Java (Heet Patel) ─────────────────────────
  {
    name: 'Heet Patel', role: 'BTech IT Second Year', years: 0, domain: 'Java',
    short: '“Strong OOP fundamentals matter more than jumping into frameworks too early.”',
    full: 'Java is built from the ground up to support Object-Oriented Programming (OOP). Many beginners rush into Spring Boot, Hibernate, or Android development without understanding what classes, objects, interfaces, inheritance, and polymorphism actually do.\n\nWithout strong OOP fundamentals, you will look at framework code and find it completely magical and confusing. Spend time learning how to design class hierarchies, how encapsulation prevents state corruption, and how interfaces enable modular and decoupled code.',
    tip: 'Design a simple payment processor simulation using interfaces (e.g., CreditCardPayment, PaypalPayment) to understand polymorphism.'
  },
  {
    name: 'Heet Patel', role: 'BTech IT Second Year', years: 0, domain: 'Java',
    short: '“A common beginner mistake is writing everything inside main() instead of using proper functions and constructors.”',
    full: 'When starting out in Java, it is easy to treat the main method like a giant script, dumping hundreds of lines of variable declarations, loops, and conditions all in one place. This defeats the entire purpose of an object-oriented language.\n\nLearn to break your code down. Create dedicated classes with proper constructors to initialize state, write focused methods that perform single tasks, and instantiate objects in main() to coordinate the work. Clean, organized code is much easier to test, debug, and reuse.',
    tip: 'Refactor an old script-like program. Move the logic into separate classes and use constructors to set initial values.'
  },
  {
    name: 'Heet Patel', role: 'BTech IT Second Year', years: 0, domain: 'Java',
    short: '“Projects like chat apps or library systems help connect Java concepts practically.”',
    full: 'Abstract concepts like multithreading, sockets, file I/O, and collections can feel dry and purely academic when you only read about them in a textbook. The best way to make them click is by assembling them into a practical project.\n\nWhen you build a console-based library system, you use lists, sets, and maps to organize books. When you build a multi-client chat application, you learn sockets, input/output streams, and thread concurrency. These real projects turn theory into valuable intuition.',
    tip: 'Create a simple server-client console chat application using Java\'s Socket and ServerSocket APIs.'
  },

  // ── Python (Dhanya) ─────────────────────────
  {
    name: 'Dhanya', role: 'MBATech AI Second Year', years: 0, domain: 'Python',
    short: '“Don’t just memorize syntax — understand data structures and when to use them.”',
    full: 'Python syntax is incredibly clean and readable, which makes it tempting to think you have mastered the language once you learn the basic keyword commands. However, the real engineering power lies in knowing how to organize your data.\n\nUnderstand the differences between lists, tuples, sets, and dictionaries. Know when a dictionary lookup (O(1)) is vastly superior to searching through a list (O(n)), and when a read-only tuple is safer than a mutable list. Choosing the right data structure from the start makes your code cleaner and faster.',
    tip: 'Write a simple comparison script to measure the time difference between looking up an item in a list vs a set with 1 million items.'
  },
  {
    name: 'Dhanya', role: 'MBATech AI Second Year', years: 0, domain: 'Python',
    short: '“Logic building matters more than remembering commands. Strong problem-solving makes learning easier later.”',
    full: 'You can always look up a specific Python library command or string format method in the documentation or via search. What you cannot search for is the logical sequence of steps required to solve a complex business problem.\n\nFocus on logic first. Break every problem down into plain English (pseudocode) before writing a single line of Python. When you possess a solid, step-by-step logic plan, translating it into Python code becomes the easiest part of the process.',
    tip: 'Write out your algorithm on paper in simple bullet points before writing a single line of code.'
  },
  {
    name: 'Dhanya', role: 'MBATech AI Second Year', years: 0, domain: 'Python',
    short: '“Lists, tuples, dictionaries, loops, and functions should feel natural before jumping into advanced Python.”',
    full: 'Advanced Python concepts like decorators, generators, list comprehensions, and classes are incredibly powerful, but trying to learn them before you are completely comfortable with standard collections and loops is a recipe for frustration.\n\nTake your time with the basics. Write nested loops, build complex dictionary structures, and practice passing arguments to functions until it feels like absolute second nature. A rock-solid baseline makes learning advanced Python a breeze.',
    tip: 'Spend a week writing small scripts that process nested list and dictionary data without using any external libraries.'
  },
  {
    name: 'Dhanya', role: 'MBATech AI Second Year', years: 0, domain: 'Python',
    short: '“The best way to improve Python logic is solving small problems consistently and debugging your own mistakes.”',
    full: 'Consistent daily practice beats massive weekend coding sessions every single time. Solving a single small logical puzzle every day keeps your mind sharp and builds lasting muscle memory.\n\nEqually important is learning to love the debugger. When your code fails, don\'t immediately throw it away or ask an AI tool for the solution. Read the traceback error line-by-line, print out variables, and find exactly where the state diverged from your expectations. Debugging is where true mastery is forged.',
    tip: 'Use Python\'s built-in breakpoint() or print statements to inspect local variables when your script behaves unexpectedly.'
  },
  {
    name: 'Dhanya', role: 'MBATech AI Second Year', years: 0, domain: 'Python',
    short: '“Rewriting your code in cleaner ways teaches more than copying perfect solutions.”',
    full: 'It is a common habit to write code that works, feel satisfied, and immediately move on to the next task. But you miss a massive learning opportunity this way. The magic happens during the refactoring phase.\n\nOnce your code works, review it. Ask yourself: Can I write this in fewer lines without losing readability? Can I replace this complex loop with a list comprehension? Is my variable naming clear? Can I break this huge block into smaller, elegant helper functions? Rewriting your own code to be cleaner trains your mind to write clean code from the start.',
    tip: 'Take a working python script you wrote last month and rewrite it to be 30% shorter, cleaner, and more readable.'
  },

  // ── Data Analysis (Dhanya) ─────────────────────────
  {
    name: 'Dhanya', role: 'MBATech AI Second Year', years: 0, domain: 'Data Analysis',
    short: '“Strong basics in Python, data structures, loops, functions, and CSV handling make Pandas much easier to learn.”',
    full: 'Beginners often jump directly into Pandas, dataframes, and visualization libraries like Seaborn, and immediately feel overwhelmed by the syntax. They struggle because they do not have a solid grasp of base Python data structures like lists of dictionaries, or how loops and functions operate.\n\nPandas is designed to work on top of standard Python concepts. If you understand how a dictionary maps keys to values, a Pandas dataframe will feel incredibly natural. Spend time learning standard Python data operations first, and Pandas will feel like a superpower instead of a burden.',
    tip: 'Write a script to open a CSV file and calculate the average of a column using only standard Python (csv module) before using Pandas.'
  },
  {
    name: 'Dhanya', role: 'MBATech AI Second Year', years: 0, domain: 'Data Analysis',
    short: '“Many beginners rush into libraries without understanding how data is actually structured.”',
    full: 'Data analysis is not just about writing syntax; it is about understanding data formats, structures, and types. Rushing to use complex libraries without knowing the difference between continuous, categorical, ordinal, or structured vs unstructured data leads to incorrect conclusions.\n\nTake the time to examine your raw data. Open your CSVs in a text editor or spreadsheet, look at how missing values are represented, look for duplicates, and understand the schema. When you know your data deeply, cleaning and analyzing it becomes straightforward.',
    tip: 'Spend the first 15 minutes of any analysis project inspecting the raw CSV metadata, column types, and null counts.'
  },
  {
    name: 'Dhanya', role: 'MBATech AI Second Year', years: 0, domain: 'Data Analysis',
    short: '“Learning basic statistics alongside Pandas helps you understand what your data is actually saying.”',
    full: 'Pandas can calculate means, medians, standard deviations, and correlations in a single line of code. But if you do not understand the underlying statistical concepts, those numbers are completely meaningless.\n\nData analysis requires statistical intuition. Learn what a normal distribution is, why outliers skew the mean but not the median, and why correlation does not equal causation. Building your statistical literacy alongside your coding skills will transform you from a basic tool-user into a true analyst.',
    tip: 'When you run df.describe(), make sure you can explain exactly what each statistical metric (mean, std, 25%, 50%, 75%) represents.'
  },
  {
    name: 'Dhanya', role: 'MBATech AI Second Year', years: 0, domain: 'Data Analysis',
    short: '“Real datasets from Kaggle teach data analysis better than isolated tutorial examples.”',
    full: 'Tutorial datasets are curated to be perfect: no missing values, no duplicates, no formatting errors, and clear linear relationships. They make learning easy, but they do not prepare you for real-world data analysis, where 80% of your time is spent cleaning messy data.\n\nGet out of the clean sandbox. Download messy, raw datasets from Kaggle, government portals, or public APIs. Deal with missing values, misaligned dates, mixed capitalizations, and outlier data. Solving these real-world frustrations is how you build genuine analytical resilience.',
    tip: 'Find a Kaggle dataset that matches your hobbies (e.g. movies, sports, finance) and perform a complete exploratory analysis.'
  },
  {
    name: 'Dhanya', role: 'MBATech AI Second Year', years: 0, domain: 'Data Analysis',
    short: '“Practicing through project-based tutorials and datasets helps concepts stick much faster.”',
    full: 'Endlessly reading about Pandas functions or memorizing methods won\'t make you an analyst. The only way to build muscle memory is through active application on project-based tasks.\n\nInstead of reading page after page of dry documentation, set a goal to answer three concrete questions about a dataset. For example, "Which month had the highest sales growth?" or "Is there a correlation between product price and customer rating?" Figuring out how to manipulate the dataframe to answer these specific questions is incredibly effective for learning.',
    tip: 'Frame three clear questions about a public dataset and write a Pandas script to answer them, printing the results cleanly.'
  },

  // ── General Advice (Dhanya) ─────────────────────────
  {
    name: 'Dhanya', role: 'MBATech AI Second Year', years: 0, domain: 'General Advice',
    short: '“Balancing academics and coding is something I’m still figuring out — consistency matters more than perfection.”',
    full: 'Trying to manage intense college coursework, exams, labs, and at the same time learn a new coding language can feel incredibly overwhelming. There is a constant feeling that you are not doing enough of either.\n\nGive yourself some grace. Consistency is infinitely more powerful than perfection. You do not need to code for 4 hours every single day. Writing code for just 30 minutes, or solving a single problem consistently, builds massive momentum over a semester. Small, daily efforts add up to extraordinary progress.',
    tip: 'Block out a dedicated 30 minutes in your daily calendar specifically for coding practice, separate from college assignments.'
  },
  {
    name: 'Dhanya', role: 'MBATech AI Second Year', years: 0, domain: 'General Advice',
    short: '“Focusing only on academics can leave very little time for practical learning.”',
    full: 'In college, it is easy to get caught up in the cycle of studying purely for exams, memorizing theory definitions, and aiming for perfect grades. While academics are important, relying on them alone will leave you unprepared for the practical realities of the tech industry.\n\nTech companies do not care if you can memorize a definition; they care if you can build software that works. Make sure to carve out room in your schedule for practical, hands-on coding, side projects, and experimentation. Balancing theory with building is the key.',
    tip: 'Dedicate at least one weekend afternoon to building a fun, practical project that has nothing to do with your class curriculum.'
  },
  {
    name: 'Dhanya', role: 'MBATech AI Second Year', years: 0, domain: 'General Advice',
    short: '“Relying too much on AI tools slowed my growth as a beginner.”',
    full: 'AI code assistants are incredible, but they are a double-edged sword for beginners. When you run into a bug and immediately copy-paste your code to let an AI fix it, your brain skips the entire learning process. You don\'t understand what was wrong, why the fix worked, or how to avoid it next time.\n\nStruggle with the problem first. Read the error message, trace the execution flow, write print statements, and try to solve it on your own for at least 30 minutes. If you do use AI, use it to explain the bug, not to just write the code for you.',
    tip: 'Turn off AI completion extensions (like Copilot) for your first month of learning a new language to build raw coding muscle.'
  },
  {
    name: 'Dhanya', role: 'MBATech AI Second Year', years: 0, domain: 'General Advice',
    short: '“Doing small but effective tasks on your own helps more than endlessly watching tutorials.”',
    full: 'Watching a 10-hour tutorial is easy and comfortable. It makes you feel like you are learning, but it is passive consumption. The real test is when you have to write code on your own without a guide.\n\nShift your ratio from consumption to creation. For every 1 hour you spend watching a tutorial, spend at least 2 hours writing code, building small tasks, or tweaking the code to see what happens. The hands-on struggles are where the concepts actually stick.',
    tip: 'Immediately after watching a coding tutorial, close the video and try to rewrite the code from memory, customizing one feature.'
  },
  {
    name: 'Dhanya', role: 'MBATech AI Second Year', years: 0, domain: 'General Advice',
    short: '“Platforms like Kaggle and HackerRank help build confidence through actual problem-solving.”',
    full: 'When you are starting out, self-doubt is your biggest enemy. You constantly ask yourself: "Am I good enough? Will I ever understand this?" The best way to build confidence is through objective, small victories.\n\nInteractive problem-solving platforms give you instant feedback. When you solve a simple logic puzzle on HackerRank or run a basic analysis on Kaggle, and see those green checkmarks, it triggers a powerful sense of achievement. These small, steady wins build the confidence you need to take on larger challenges.',
    tip: 'Create an account on HackerRank or Kaggle and set a goal to solve just 3 simple beginner challenges every single week.'
  },
  {
    name: 'Dhanya', role: 'MBATech AI Second Year', years: 0, domain: 'General Advice',
    short: '“Sometimes overlearning becomes a problem — spending too much time on tutorials instead of building.”',
    full: 'There is a concept called "Analysis Paralysis" where you feel you need to know absolutely everything about a language before you can start building projects. You buy 5 different courses, read 3 books, and spend months in preparation.\n\nThis is a trap. Software engineering is a highly practical skill. You do not need to know 100% of a language to build something useful; you only need about 20%. Start building with whatever small amount you know, and learn the rest dynamically as you need it.',
    tip: 'As soon as you learn variables, loops, and conditions, stop the tutorials and build a simple command-line text adventure game.'
  },
  {
    name: 'Dhanya', role: 'MBATech AI Second Year', years: 0, domain: 'General Advice',
    short: '“You’re probably ready for the next topic when you can apply the current one without constantly following along.”',
    full: 'How do you know when you have truly mastered a topic and are ready to move forward? The benchmark is simple: when you can apply the concept to a new, unfamiliar problem without having to copy-paste or watch a guide.\n\nIf you can write a loop to filter a list, or declare an object to model a real-world concept on your own — even if you make minor syntax errors and need to look up documentation — you are ready. Do not strive for perfection; strive for independent implementation.',
    tip: 'Test your readiness by picking a simple exercise from a book and solving it without looking at any reference code.'
  },
  // ── New Advices ─────────────────────────
  { 
    name: 'Kartik Jain', role: 'Tech Supercore', years: 0, domain: 'React', 
    short: '“Before learning React, ES6+ concepts like arrow functions, destructuring, async/await, and array methods should feel natural.”',
    full: 'React is heavily reliant on modern JavaScript features. When you write a React component, you will constantly map over arrays to render lists, destructure props, and use arrow functions for event handlers. If you are struggling with these JavaScript concepts, React will feel incredibly frustrating and confusing.\n\nTake a step back and solidify your understanding of ES6+. Build a few small vanilla JavaScript projects using these features first. The smoother your JavaScript skills are, the faster you will grasp React.',
    tip: 'Spend a weekend exclusively reviewing ES6+ syntax on MDN before diving into your first React tutorial.'
  },
  { 
    name: 'Kartik Jain', role: 'Tech Supercore', years: 0, domain: 'Django', 
    short: '“Strong Python OOP fundamentals make learning Django significantly easier.”',
    full: 'Django is a powerful web framework, but under the hood, it is just Python classes and objects interacting with each other. When you understand Object-Oriented Programming (OOP) in Python, concepts like class-based views, models, and serializers start to make perfect sense.\n\nInstead of just memorizing Django syntax, focus on understanding inheritance, mixins, and how the `super()` function works in Python. This foundational knowledge allows you to debug issues much faster and write cleaner, more maintainable code.',
    tip: 'Build a simple command-line Python application using classes and inheritance before starting with Django models.'
  },
  { 
    name: 'Kartik Jain', role: 'Tech Supercore', years: 0, domain: 'Django', 
    short: '“Database migrations can break projects quickly if you don’t understand what’s happening underneath.”',
    full: 'Migrations are Django\'s way of translating your Python models into database tables. While the `makemigrations` and `migrate` commands seem magical, they can lead to severe data loss or broken schemas if used carelessly.\n\nAlways review the migration files generated by Django before applying them. Understand the difference between adding a nullable field, setting a default value, and dealing with complex relationships like foreign keys. Knowing SQL helps immensely when troubleshooting migration errors.',
    tip: 'Always run `python manage.py sqlmigrate <app> <migration>` to inspect the raw SQL before running the actual migration.'
  },
  { 
    name: 'Kartik Jain', role: 'Tech Supercore', years: 0, domain: 'SQL & Database', 
    short: '“Primary keys, foreign keys, normalization, and joins are concepts beginners should deeply understand early.”',
    full: 'Writing a basic `SELECT` statement is easy, but real-world databases require you to structure data efficiently across multiple tables. If you don\'t understand how to normalize your data or link tables correctly using primary and foreign keys, your database will quickly become a mess of duplicated and inconsistent information.\n\nInvest time in learning how `INNER JOIN`, `LEFT JOIN`, and indexing work. These concepts are the backbone of relational databases and are critical for building scalable applications.',
    tip: 'Design a simple schema on paper for a library system with books, authors, and users before writing any SQL.'
  },
  { 
    name: 'Kartik Jain', role: 'Tech Supercore', years: 0, domain: 'SQL & Database', 
    short: '“Designing schemas for apps like Uber or Airbnb teaches database thinking much better than memorizing queries.”',
    full: 'It\'s tempting to just practice SQL syntax on simple datasets, but the real challenge is figuring out how to model complex, real-world systems. An app like Uber involves riders, drivers, rides, payments, and locations—how do you connect all these entities?\n\nBy practicing schema design for popular apps, you force yourself to think about relationships, scalability, and data integrity. This systems-level thinking is what separates junior developers from senior engineers.',
    tip: 'Take your favorite mobile app and try to sketch out its complete database schema on a whiteboard.'
  },
  { 
    name: 'Kartik Jain', role: 'Tech Supercore', years: 0, domain: 'Cybersecurity', 
    short: '“Cybersecurity is not ‘movie-style hacking’ — most real work involves defence, patching, and compliance.”',
    full: 'Many people enter cybersecurity expecting to be a hacker portrayed in movies, typing rapidly in a green terminal to break into mainframes. The reality is that the vast majority of cybersecurity jobs involve securing systems, managing compliance frameworks, and ensuring patches are applied.\n\nLearn to appreciate the defensive side of security (Blue Team). Skills like configuring firewalls, reading logs, understanding IAM policies, and writing secure code are incredibly valuable and in high demand.',
    tip: 'Set up a basic cloud server and practice securing it: configure a firewall, disable root login, and set up SSH keys.'
  },
  { 
    name: 'Parth Gupta', role: 'Technicals Head', years: 0, domain: 'React', 
    short: '“Many developers start using React for every project, even when simple HTML or backend-rendered applications would work better.”',
    full: 'React is a fantastic tool for building complex, interactive user interfaces. However, it is overkill for simple blogs, landing pages, or static sites. Using React when it\'s not needed adds unnecessary complexity, increases bundle size, and hurts SEO if not handled properly.\n\nLearn to evaluate the requirements of your project before choosing your tech stack. Sometimes, a simple HTML/CSS page or a backend-rendered template using Django or Node.js is the most elegant and efficient solution.',
    tip: 'Ask yourself: "Does this project require complex state management and frequent UI updates?" If not, reconsider using React.'
  },
  { 
    name: 'Parth Gupta', role: 'Technicals Head', years: 0, domain: 'React', 
    short: '“Overusing useEffect can create unnecessary renders and slower applications.”',
    full: 'The `useEffect` hook is essential in React, but beginners often use it for everything—including deriving state or syncing props. This can lead to infinite loops, confusing data flows, and sluggish performance.\n\nBefore adding a `useEffect`, consider if the logic can be handled directly during the render phase or within an event handler. Keeping your effects focused strictly on side operations like API calls or subscriptions will make your components much cleaner and faster.',
    tip: 'Read the official React documentation on "You Might Not Need an Effect" to learn patterns for avoiding unnecessary effects.'
  },
  { 
    name: 'Parth Gupta', role: 'Technicals Head', years: 0, domain: 'SQL & Database', 
    short: '“Database design matters just as much as writing queries.”',
    full: 'You can write the most optimized SQL queries in the world, but if your database schema is poorly designed, your application will still suffer. A bad design leads to redundant data, complicated queries, and slow performance as your dataset grows.\n\nFocus on understanding normalization (up to the Third Normal Form) and how to logically separate your entities. A well-thought-out database design makes writing queries simpler and ensures long-term stability.',
    tip: 'Always normalize your database schema to at least 3NF before you start inserting data.'
  },
  { 
    name: 'Parth Gupta', role: 'Technicals Head', years: 0, domain: 'SQL & Database', 
    short: '“Trying multiple query approaches for the same problem helps you understand performance tradeoffs much better.”',
    full: 'In SQL, there are often several ways to retrieve the same result. For example, you might use a `JOIN`, a subquery, or a Common Table Expression (CTE). While they might all return the correct data, they execute very differently under the hood.\n\nMake it a habit to write multiple versions of a query and compare their execution plans. Understanding why a specific approach is faster or slower will deepen your knowledge of database engines and query optimization.',
    tip: 'Use the `EXPLAIN` or `EXPLAIN ANALYZE` command to compare the execution plans of a subquery vs. a JOIN.'
  },
  { 
    name: 'Parth Gupta', role: 'Technicals Head', years: 0, domain: 'C++', 
    short: '“Understanding pointers deeply gives you a much stronger understanding of memory and computer architecture.”',
    full: 'Pointers are often considered the most difficult part of learning C++, but they are also the most rewarding. When you understand pointers, you aren\'t just learning syntax—you are learning how your computer\'s memory actually works.\n\nDon\'t shy away from manual memory management. Practice dynamically allocating arrays, building linked lists, and passing references. Once you grasp how memory addresses function, you will write much more efficient code in C++ and any other language you learn.',
    tip: 'Implement a basic Linked List class from scratch using raw pointers to solidify your understanding of memory allocation.'
  },
  { 
    name: 'Parth Gupta', role: 'Technicals Head', years: 0, domain: 'C++', 
    short: '“OOP concepts like encapsulation and abstraction are important for writing clean, production-level code.”',
    full: 'C++ provides powerful object-oriented features that allow you to structure massive codebases efficiently. Encapsulation ensures that your class\'s internal state is protected from unintended interference, while abstraction hides complex implementation details behind a clean interface.\n\nIn professional environments, writing code that works is not enough; your code must be readable, maintainable, and safe. Mastering OOP principles ensures that your C++ components can be easily reused and tested by your team.',
    tip: 'Always make your class member variables private and expose only necessary functionality through public getter and setter methods.'
  },
  { 
    name: 'Aaniya Sachdeva', role: 'IT', years: 0, domain: 'Java', 
    short: '“Java makes much more sense once you deeply understand OOP concepts like polymorphism, encapsulation, abstraction, and inheritance.”',
    full: 'Java is an inherently object-oriented language. If you try to write Java code like a procedural script, you will find it verbose and clunky. The true elegance of Java shines when you leverage its OOP capabilities.\n\nTake the time to deeply understand how interfaces work, how polymorphism allows for flexible code, and when to use abstract classes. These concepts are the foundation of almost every major Java framework, including Spring Boot and Android.',
    tip: 'Build a small program that uses an Interface (like `Vehicle`) and multiple implementing classes (like `Car` and `Bike`) to practice polymorphism.'
  },
  { 
    name: 'Aaniya Sachdeva', role: 'IT', years: 0, domain: 'Java', 
    short: '“Collections like Lists, Maps, Sets, Queues, and Stacks are important — but knowing when to use each matters even more.”',
    full: 'The Java Collections Framework is incredibly comprehensive. However, beginners often default to using an `ArrayList` for everything. Knowing the performance characteristics and use cases for different data structures is crucial.\n\nFor example, a `HashSet` provides O(1) lookups, making it perfect for checking uniqueness, while a `LinkedList` is better for frequent insertions and deletions. Choosing the right collection can drastically improve the performance of your application.',
    tip: 'Review the time complexities (Big O notation) for insertion, deletion, and lookup for `ArrayList`, `LinkedList`, `HashSet`, and `HashMap`.'
  },
  { 
    name: 'Aaniya Sachdeva', role: 'IT', years: 0, domain: 'Java', 
    short: '“Exception handling should never be ignored. Empty catch blocks create bigger problems later.”',
    full: 'It\'s tempting to wrap code in a `try-catch` block and leave the `catch` empty just to make the compiler happy. This is known as "swallowing" an exception, and it is a terrible practice that hides bugs and makes debugging impossible.\n\nAlways handle exceptions properly. At the very least, log the error message and the stack trace. In robust applications, you should also consider how the program can gracefully recover or alert the user when an unexpected error occurs.',
    tip: 'Never leave a catch block empty. Always add `e.printStackTrace();` or use a logging framework like SLF4J to record the error.'
  },
  { 
    name: 'Aaniya Sachdeva', role: 'IT', years: 0, domain: 'Java', 
    short: '“Making every variable or method public creates bad coding habits and makes projects harder to maintain.”',
    full: 'When everything in your class is public, any other part of the program can change its state unpredictably. This violates the principle of encapsulation and leads to tight coupling, making your codebase fragile and difficult to modify.\n\nAdopt the habit of making variables and methods as restrictive as possible. Start with `private`, and only increase visibility to `protected` or `public` if absolutely necessary. This protects your class\'s internal logic and creates a clean API.',
    tip: 'Use your IDE to automatically generate getters and setters, keeping the actual member variables strictly `private`.'
  },
  { 
    name: 'Aaniya Sachdeva', role: 'IT', years: 0, domain: 'Java', 
    short: '“Projects like banking systems or to-do apps naturally teach OOP concepts and data handling.”',
    full: 'Reading about objects and classes only goes so far. To truly internalize Java\'s OOP features, you need to model real-world systems. A banking application, for example, naturally requires classes like `Account`, `Customer`, and `Transaction`.\n\nBy building these projects, you learn how objects should interact, how to manage state securely, and how to structure your packages. It bridges the gap between theoretical knowledge and practical software engineering.',
    tip: 'Build a console-based Banking System where users can create accounts, deposit money, and transfer funds between accounts.'
  },
  { 
    name: 'Aaniya Sachdeva', role: 'IT', years: 0, domain: 'Java', 
    short: '“Building multithreaded projects teaches concurrency in the most practical way possible.”',
    full: 'Concurrency in Java is a complex topic, filled with potential pitfalls like deadlocks and race conditions. While tutorials can explain the `Thread` class or the `Runnable` interface, you won\'t truly grasp these concepts until you encounter a synchronization bug in your own code.\n\nStart small by creating a simple program with two threads modifying the same variable, and observe the unpredictable results. Then, learn how to use the `synchronized` keyword and the `java.util.concurrent` package to fix it.',
    tip: 'Write a program simulating a ticket booking system where multiple threads try to book the same limited number of tickets simultaneously.'
  }
];

const domains = ['All', 'JavaScript', 'React', 'C++', 'Java', 'Python', 'Django', 'Data Analysis', 'SQL & Database', 'Cybersecurity', 'General Advice'];

export default function Insights() {
  const [activeDomain, setActiveDomain] = useState('All');
  const [expanded, setExpanded] = useState(null);
  const navigate = useNavigate();

  const filtered = seniors.filter(s => activeDomain === 'All' || s.domain === activeDomain);

  return (
    <div className="insights-page">
      <Navbar />
      <div className="insights-bg-glow" />

      <div className="insights-content">
        {/* Back to Profile */}
        <button className="insights-back fade-up" onClick={() => navigate('/profile')}>
          <ArrowLeft size={18} />
          <span>Back to Profile</span>
        </button>

        <div className="insights-header fade-up">
          <p className="prompt-label" style={{ marginBottom: 12 }}>from.those.ahead</p>
          <h1 className="insights-title">What seniors wish they knew earlier.</h1>
          <p className="insights-sub">Advice from people who started exactly where you are.</p>
        </div>

        <div className="insights-filters fade-up-1">
          {domains.map(d => (
            <button
              key={d}
              className={`filter-btn ${activeDomain === d ? 'active' : ''}`}
              onClick={() => setActiveDomain(d)}
            >{d}</button>
          ))}
        </div>

        <div className="insights-grid fade-up-2">
          {filtered.map((s, i) => (
            <div key={i} className={`insight-card ${expanded === i ? 'expanded' : ''}`}>
              <div className="ic-header">
                <div className="ic-info">
                  <span className="ic-name">{s.name}</span>
                  <span className="ic-role">{s.role}{s.years > 0 ? ` · ${s.years} yrs` : ''}</span>
                </div>
                <span className="ic-domain">{s.domain}</span>
              </div>

              <div className="ic-divider" />
              <p className="ic-quote">{s.short}</p>

              {expanded === i && s.full && (
                <div className="ic-full">
                  {s.full.split('\\n\\n').map((para, j) => (
                    <p key={j}>{para}</p>
                  ))}
                  {s.tip && (
                    <div className="ic-tip">
                      <span className="tip-label">&gt; their tip:</span>
                      <span className="tip-text">{s.tip}</span>
                    </div>
                  )}
                </div>
              )}

              {s.full && (
                <button
                  className="ic-toggle"
                  onClick={() => setExpanded(expanded === i ? null : i)}
                >
                  {expanded === i ? 'Read less ↑' : 'Read full story →'}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
