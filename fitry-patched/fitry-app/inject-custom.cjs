const fs = require('fs');
const path = require('path');

const customSnippets = {
  "Personal portfolio page": `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Portfolio</title>
  <style>
    /* Add basic reset and styles */
    body { font-family: sans-serif; margin: 0; }
    nav, header, section, footer { padding: 20px; }
  </style>
</head>
<body>
  <nav>
    <!-- Add 3 links here -->
  </nav>
  <header>
    <h1>Your Name</h1>
    <p>Your tagline goes here</p>
  </header>
  <section id="about">
    <!-- About me content -->
  </section>
  <section id="skills">
    <!-- List of skills -->
  </section>
  <footer>
    <!-- Email and contact info -->
  </footer>
</body>
</html>`,

  "Responsive landing page": `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Product Landing Page</title>
  <style>
    :root {
      --primary-color: #3498db;
      --bg-color: #f9f9f9;
    }
    /* Build a sticky nav and hero section */
    .features-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }
    @media (max-width: 768px) {
      .features-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <!-- Build your layout here -->
  <div class="features-grid">
    <div class="feature">Feature 1</div>
    <div class="feature">Feature 2</div>
    <div class="feature">Feature 3</div>
  </div>
</body>
</html>`,

  "Multi-page website with a design system": `/* tokens.css - Define your design system here */
:root {
  --color-primary: #2ecc71;
  --color-secondary: #27ae60;
  --font-main: 'Helvetica Neue', sans-serif;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 32px;
}

/* Reusable components */
.btn {
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--color-primary);
  border: none;
  border-radius: 4px;
}

/* 
  Remember to link this tokens.css file in your 3 HTML pages 
  (Home, About, Contact) using <link rel="stylesheet" href="tokens.css">
*/`,

  "Build a CLI quiz game": `const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const questions = [
  { q: "What is 2 + 2?", a: "4" },
  // add 4 more questions
];

let score = 0;
let currentQ = 0;

function askQuestion() {
  if (currentQ >= questions.length) {
    console.log(\`Game Over! Score: \${score}/\${questions.length}\`);
    rl.close();
    return;
  }
  
  rl.question(questions[currentQ].q + " ", (answer) => {
    // Check answer, update score, increment currentQ, call askQuestion()
    
  });
}

askQuestion();`,

  "Build a to-do list in the browser": `<!DOCTYPE html>
<html>
<head><title>Todo App</title></head>
<body>
  <input type="text" id="todoInput" placeholder="Add a task" />
  <button id="addBtn">Add</button>
  <ul id="todoList"></ul>

  <script>
    const input = document.getElementById('todoInput');
    const btn = document.getElementById('addBtn');
    const list = document.getElementById('todoList');

    // Load from localStorage on startup
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    btn.addEventListener('click', () => {
      // Add new todo, save to localStorage, render list
    });

    function render() {
      // Map over todos and create <li> elements
    }
  </script>
</body>
</html>`,

  "Build an async weather dashboard": `<!DOCTYPE html>
<html>
<head><title>Weather Dashboard</title></head>
<body>
  <input type="text" id="cityInput" placeholder="Enter city name" />
  <button id="searchBtn">Get Weather</button>
  <div id="weatherResult"></div>

  <script>
    const btn = document.getElementById('searchBtn');
    const result = document.getElementById('weatherResult');

    btn.addEventListener('click', async () => {
      const city = document.getElementById('cityInput').value;
      result.innerHTML = 'Loading...';
      
      try {
        // Fetch from a public API like OpenMeteo or similar
        // const response = await fetch(\`API_URL?q=\${city}\`);
        // const data = await response.json();
        
        // Update DOM with results
      } catch (error) {
        result.innerHTML = 'Error fetching weather.';
      }
    });
  </script>
</body>
</html>`,

  "Build a basic REST API": `const express = require('express');
const app = express();
app.use(express.json());

let items = []; // in-memory store

app.get('/api/items', (req, res) => {
  res.json(items);
});

app.post('/api/items', (req, res) => {
  // Add new item and return 201
});

app.listen(3000, () => console.log('Server running on port 3000'));`,

  "Build a JWT auth system": `const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

const SECRET = 'my_super_secret_key';

app.post('/login', (req, res) => {
  // Validate credentials, generate token
  // const token = jwt.sign({ userId: 1 }, SECRET);
});

function authenticateToken(req, res, next) {
  // Verify token from req.headers['authorization']
}

app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: "You have access!" });
});`,

  "Build a real-time chat with Socket.io": `// Server (Node.js)
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('User connected');
  
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

server.listen(3000, () => console.log('Chat running'));`,

  "URL Shortener CLI": `// Node.js CLI script
const readline = require('readline');

// Simple dictionary to act as our database
const urlDB = {};

function generateShortCode() {
  return Math.random().toString(36).substring(2, 8);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter a long URL to shorten: ', (longUrl) => {
  const code = generateShortCode();
  urlDB[code] = longUrl;
  console.log(\`Shortened URL: http://short.ly/\${code}\`);
  rl.close();
});`,

  "Simple HTTP Server": `const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!');
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(8080, () => {
  console.log('Server running at http://localhost:8080/');
});`,

  "Concurrent Task Runner": `package main

import (
    "fmt"
    "sync"
    "time"
)

func task(id int, wg *sync.WaitGroup) {
    defer wg.Done()
    fmt.Printf("Task %d starting\\n", id)
    time.Sleep(time.Second) // Simulate work
    fmt.Printf("Task %d done\\n", id)
}

func main() {
    var wg sync.WaitGroup
    
    for i := 1; i <= 3; i++ {
        wg.Add(1)
        go task(i, &wg)
    }
    
    wg.Wait()
    fmt.Println("All tasks completed.")
}`,

  "Build a profile card component": `import React from 'react';
import './ProfileCard.css';

// Accept name, bio, and avatar via props
export default function ProfileCard({ name, bio, avatarUrl }) {
  return (
    <div className="profile-card">
      <img src={avatarUrl} alt={\`\${name}'s avatar\`} className="avatar" />
      <h2>{name}</h2>
      <p>{bio}</p>
    </div>
  );
}`,

  "Build a multi-step form": `import React, { useState } from 'react';

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', email: '', role: '' });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  return (
    <div>
      {step === 1 && (
        <div>
          <h2>Step 1: Personal Details</h2>
          {/* Add input for name, then a Next button */}
        </div>
      )}
      {step === 2 && (
        <div>
          <h2>Step 2: Contact Info</h2>
          {/* Add input for email, then Back and Next buttons */}
        </div>
      )}
      {/* Add step 3 and final submission */}
    </div>
  );
}`,

  "Build a mini Reddit clone": `import React, { useReducer } from 'react';

const initialState = [
  { id: 1, title: 'First Post', votes: 0, comments: [] }
];

function reducer(state, action) {
  switch (action.type) {
    case 'UPVOTE':
      // map state and increase vote for action.id
      return state;
    case 'DOWNVOTE':
      // map state and decrease vote for action.id
      return state;
    default:
      return state;
  }
}

export default function RedditClone() {
  const [posts, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      {/* Map posts and render titles, vote count, and buttons */}
    </div>
  );
}`,

  "Library Management System": `-- Create tables
CREATE TABLE Authors (
    author_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE Books (
    book_id INT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    author_id INT,
    FOREIGN KEY (author_id) REFERENCES Authors(author_id)
);

-- Insert sample data
INSERT INTO Authors (author_id, name) VALUES (1, 'George Orwell');
INSERT INTO Books (book_id, title, author_id) VALUES (101, '1984', 1);

-- Write queries to test relationships
SELECT * FROM Books JOIN Authors ON Books.author_id = Authors.author_id;`,

  "E-Commerce Database": `-- Schema Design
CREATE TABLE Customers ( id INT PRIMARY KEY, name VARCHAR(100) );
CREATE TABLE Products ( id INT PRIMARY KEY, price DECIMAL(10,2) );
CREATE TABLE Orders ( 
    id INT PRIMARY KEY, 
    customer_id INT, 
    product_id INT,
    FOREIGN KEY (customer_id) REFERENCES Customers(id),
    FOREIGN KEY (product_id) REFERENCES Products(id)
);

-- Query to find which customer spent the most
-- TIP: Use SUM(Products.price), JOIN, GROUP BY customer_id, and ORDER BY DESC
`,

  "Database Performance Tuning": `-- Original Slow Query Example:
-- SELECT c.name, (SELECT SUM(amount) FROM Orders o WHERE o.customer_id = c.id) as total_spent FROM Customers c;

-- 1. Create Indexes
CREATE INDEX idx_customer_id ON Orders(customer_id);

-- 2. Rewrite using CTE (Common Table Expression) and JOIN
WITH CustomerTotals AS (
    SELECT customer_id, SUM(amount) as total_spent
    FROM Orders
    GROUP BY customer_id
)
SELECT c.name, ct.total_spent
FROM Customers c
JOIN CustomerTotals ct ON c.id = ct.customer_id;`,

  "Build a number guessing game": `import random

def main():
    target = random.randint(1, 100)
    attempts = 0
    
    print("Welcome to the Number Guessing Game!")
    
    while True:
        try:
            guess = int(input("Guess a number between 1 and 100: "))
            attempts += 1
            
            # Add if/elif/else logic here for higher/lower/correct
            
        except ValueError:
            print("Please enter a valid integer.")

if __name__ == "__main__":
    main()`,

  "Build a file organiser script": `import os
import shutil

def organize_files(folder_path):
    # Dictionary mapping folder names to extensions
    extensions = {
        "Images": [".jpg", ".jpeg", ".png", ".gif"],
        "Documents": [".pdf", ".docx", ".txt"]
    }
    
    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)
        
        # Skip directories
        if os.path.isdir(file_path):
            continue
            
        _, ext = os.path.splitext(filename)
        
        # Determine target folder and move file
        # HINT: Check if target directory exists, if not os.makedirs()

if __name__ == "__main__":
    organize_files("./my_messy_folder")`,

  "Build a web scraper with requests + BeautifulSoup": `import requests
from bs4 import BeautifulSoup
import csv

def scrape_quotes():
    url = "http://quotes.toscrape.com/"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    
    quotes_data = []
    
    # Extract quotes
    for quote in soup.find_all("div", class_="quote"):
        text = quote.find("span", class_="text").get_text()
        author = quote.find("small", class_="author").get_text()
        quotes_data.append([author, text])
        
    # Write to CSV
    with open("quotes.csv", "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["Author", "Quote"])
        writer.writerows(quotes_data)

if __name__ == "__main__":
    scrape_quotes()`,

  "Analyse a CSV sales dataset": `import pandas as pd

def analyze_sales():
    # 1. Load data
    df = pd.read_csv("sales_data.csv")
    
    # 2. Clean missing values
    df = df.dropna() # or fillna()
    
    # 3. Produce summary report
    # Group by category and calculate sum and mean
    summary = df.groupby("Category").agg({
        "Sales": ["sum", "mean"]
    })
    
    print("Sales Summary Report:")
    print(summary)

if __name__ == "__main__":
    analyze_sales()`,

  "Build a dashboard-ready dataset": `import pandas as pd

def prepare_dashboard_data():
    # Load datasets
    df_sales = pd.read_csv("sales.csv")
    df_customers = pd.read_csv("customers.csv")
    
    # Merge datasets on customer_id
    merged_df = pd.merge(df_sales, df_customers, on="customer_id", how="left")
    
    # Create pivot table
    pivot = merged_df.pivot_table(
        values="revenue", 
        index="region", 
        columns="product_category", 
        aggfunc="sum"
    )
    
    # Fill nulls and export
    pivot.fillna(0).to_csv("dashboard_ready.csv")

if __name__ == "__main__":
    prepare_dashboard_data()`,

  "End-to-end EDA report": `# Import libraries
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# 1. Load dataset
df = pd.read_csv("dataset.csv")

# 2. Basic info and descriptive stats
print(df.info())
print(df.describe())

# 3. Outlier detection and correlations
corr_matrix = df.corr()
sns.heatmap(corr_matrix, annot=True)
plt.show()

# Write narrative insights in markdown (if using Jupyter Notebook)
# "The correlation matrix reveals a strong positive correlation between X and Y..."`,

  "Predict house prices": `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

# Create dummy data
data = {
    'sqft': [1000, 1500, 2000, 2500],
    'rooms': [2, 3, 4, 4],
    'price': [200000, 300000, 400000, 500000]
}
df = pd.DataFrame(data)

X = df[['sqft', 'rooms']]
y = df['price']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

model = LinearRegression()
model.fit(X_train, y_train)

predictions = model.predict(X_test)
print("MSE:", mean_squared_error(y_test, predictions))`,

  "Iris Flower Classification": `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Load data
iris = load_iris()
X, y = iris.data, iris.target

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Initialize and train model
clf = RandomForestClassifier(n_estimators=100)
clf.fit(X_train, y_train)

# Predict and evaluate
preds = clf.predict(X_test)
print(f"Accuracy: {accuracy_score(y_test, preds):.2f}")`,

  "Credit Card Fraud Detection": `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report

# Load imbalanced dataset (assume 'Class' column represents fraud: 1=Fraud, 0=Legit)
# df = pd.read_csv("creditcard.csv")

# For handling imbalance, you could use class_weight='balanced'
model = LogisticRegression(class_weight='balanced')

# X_train, y_train = ...
# model.fit(X_train, y_train)

# preds = model.predict(X_test)
# Focus on Recall for fraud class
# print(classification_report(y_test, preds))`,

  "Student grade calculator": `#include <iostream>
#include <string>
using namespace std;

// Function prototype
char calculateGrade(int score);

int main() {
    string names[5];
    int scores[5];
    
    // Accept input
    for(int i = 0; i < 5; i++) {
        cout << "Enter name and score for student " << i+1 << ": ";
        cin >> names[i] >> scores[i];
    }
    
    // Process and print report
    cout << "\\n--- Grade Report ---\\n";
    for(int i = 0; i < 5; i++) {
        cout << names[i] << ": " << scores[i] << " - " << calculateGrade(scores[i]) << "\\n";
    }
    
    return 0;
}

char calculateGrade(int score) {
    if(score >= 90) return 'A';
    if(score >= 80) return 'B';
    if(score >= 70) return 'C';
    if(score >= 60) return 'D';
    return 'F';
}`,

  "Bank account management system": `#include <iostream>
#include <vector>
#include <string>
using namespace std;

struct Transaction {
    string type;
    double amount;
};

class BankAccount {
private:
    string ownerName;
    double balance;
    vector<Transaction> history;
    static int totalAccounts;

public:
    BankAccount(string name, double initialDeposit) {
        ownerName = name;
        balance = initialDeposit;
        history.push_back({"Deposit", initialDeposit});
        totalAccounts++;
    }

    void deposit(double amount) {
        // Implementation
    }

    bool withdraw(double amount) {
        // Implementation with check
        return true;
    }
    
    // Additional getters and history printing...
};

int BankAccount::totalAccounts = 0;

int main() {
    BankAccount myAccount("Alice", 1000);
    return 0;
}`,

  "Mini text-based RPG": `#include <iostream>
#include <vector>
#include <memory>
using namespace std;

class Enemy {
public:
    virtual void attack() = 0;
    virtual ~Enemy() = default;
};

class Goblin : public Enemy {
public:
    void attack() override { cout << "Goblin slashes for 10 damage!\\n"; }
};

class Dragon : public Enemy {
public:
    void attack() override { cout << "Dragon breathes fire for 50 damage!\\n"; }
};

class Player {
    int hp = 100;
    vector<string> inventory;
public:
    void useItem(int index) { /* Implementation */ }
};

int main() {
    unique_ptr<Enemy> enemy = make_unique<Goblin>();
    enemy->attack();
    
    return 0;
}`,

  "Security Audit Checklist": `# Security Audit Remediation Plan

## 1. Broken Access Control
**Vulnerability:** Users can access other users' data by changing ID in URL.
**Remediation:** Implement server-side authorization checks for every sensitive request.

## 2. Cryptographic Failures
**Vulnerability:** ...
**Remediation:** ...

## 3. Injection (SQLi)
**Vulnerability:** ...
**Remediation:** ...

[Continue for 5 vulnerabilities...]`,

  "Password Cracking Simulation": `# Note: This is for educational/simulation purposes only.

# 1. Start by examining the hash format in hashes.txt
cat hashes.txt

# 2. Run John the Ripper using the rockyou dictionary
john --wordlist=/usr/share/wordlists/rockyou.txt --format=Raw-MD5 hashes.txt

# 3. View cracked passwords
john --show --format=Raw-MD5 hashes.txt

# Report Analysis:
# "Out of 10 hashes, 6 were cracked instantly because they were common words..."`,

  "Capture The Flag (CTF)": `# CTF Write-up: [Machine Name]

## Reconnaissance
- Nmap scan results:
  - Port 22: SSH
  - Port 80: HTTP (Apache)

## Gaining Access (User Flag)
- Found a hidden directory using gobuster: /admin_portal
- Exploited a command injection vulnerability in a form...
- User flag: \`THM{user_flag_hash_here}\`

## Privilege Escalation (Root Flag)
- Checked sudo permissions with \`sudo -l\`
- Found binary running as root without password
- Exploited using GTFOBins payload...
- Root flag: \`THM{root_flag_hash_here}\``,

  "Basic Blog": `from django.db import models
from django.urls import path
from django.views.generic import ListView, DetailView

# models.py
class Author(models.Model):
    name = models.CharField(max_length=100)

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    author = models.ForeignKey(Author, on_delete=models.CASCADE)

# views.py
class PostListView(ListView):
    model = Post
    template_name = 'blog/post_list.html'

# urls.py
urlpatterns = [
    path('', PostListView.as_view(), name='post-list'),
]`,

  "Todo App": `from django.db import models
from django.shortcuts import render, redirect

# models.py
class Task(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    completed = models.BooleanField(default=False)

# views.py
def task_list(request):
    tasks = Task.objects.all()
    # Add form handling for POST requests to create a task
    return render(request, 'todo/task_list.html', {'tasks': tasks})

def complete_task(request, pk):
    task = Task.objects.get(pk=pk)
    task.completed = True
    task.save()
    return redirect('task-list')`,

  "Social Media API": `from rest_framework import serializers, viewsets
from django.contrib.auth.models import User
from .models import Post, Comment

# serializers.py
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'author', 'content', 'created_at', 'likes_count']

# views.py
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    
    # Require authentication
    # permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)`,

  "Calculator": `import java.util.Scanner;

public class Calculator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        while (true) {
            System.out.println("Enter first number (or type 'quit' to exit): ");
            String input = scanner.next();
            if (input.equalsIgnoreCase("quit")) break;
            
            double num1 = Double.parseDouble(input);
            String operator = scanner.next();
            double num2 = scanner.nextDouble();
            
            // Implement switch statement for +, -, *, /
            // Handle divide by zero!
        }
        scanner.close();
    }
}`,

  "Bank Account System": `import java.util.ArrayList;
import java.util.List;

abstract class Account {
    protected double balance;
    protected List<String> transactions = new ArrayList<>();
    
    public abstract boolean withdraw(double amount);
    
    public void deposit(double amount) {
        balance += amount;
        transactions.add("Deposited: " + amount);
    }
}

class CheckingAccount extends Account {
    private double overdraftLimit = 500.0;
    
    @Override
    public boolean withdraw(double amount) {
        if (balance + overdraftLimit >= amount) {
            balance -= amount;
            transactions.add("Withdrew: " + amount);
            return true;
        }
        return false;
    }
}

public class BankSystem {
    public static void main(String[] args) {
        Account myChecking = new CheckingAccount();
        myChecking.deposit(100);
        myChecking.withdraw(150);
    }
}`,

  "Multi-threaded Web Server": `import java.io.*;
import java.net.*;
import java.util.concurrent.*;

public class WebServer {
    public static void main(String[] args) throws IOException {
        ServerSocket serverSocket = new ServerSocket(8080);
        ExecutorService threadPool = Executors.newFixedThreadPool(10);
        
        System.out.println("Server listening on port 8080...");
        
        while (true) {
            Socket clientSocket = serverSocket.accept();
            threadPool.submit(new ClientHandler(clientSocket));
        }
    }
}

class ClientHandler implements Runnable {
    private Socket socket;
    public ClientHandler(Socket socket) { this.socket = socket; }
    
    @Override
    public void run() {
        // Read request, write HTTP response
        // e.g. "HTTP/1.1 200 OK\\r\\n\\r\\nHello World!"
    }
}`,

  "CLI Tool": `package main

import (
    "flag"
    "fmt"
    "os"
    "strings"
)

func main() {
    filePath := flag.String("file", "", "Path to the text file")
    flag.Parse()

    if *filePath == "" {
        fmt.Println("Please provide a file using -file")
        return
    }

    content, err := os.ReadFile(*filePath)
    if err != nil {
        fmt.Println("Error reading file:", err)
        return
    }

    text := string(content)
    lines := len(strings.Split(text, "\\n"))
    words := len(strings.Fields(text))
    chars := len(text)

    fmt.Printf("Lines:\\t%d\\nWords:\\t%d\\nChars:\\t%d\\n", lines, words, chars)
}`,

  "Concurrent Scraper": `package main

import (
    "fmt"
    "net/http"
    "sync"
    // "github.com/PuerkitoBio/goquery"
)

func fetchTitle(url string, wg *sync.WaitGroup) {
    defer wg.Done()
    
    // Make GET request
    resp, err := http.Get(url)
    if err != nil {
        fmt.Println("Error fetching", url)
        return
    }
    defer resp.Body.Close()
    
    // Parse HTML and find <title> using goquery
    fmt.Printf("Fetched %s\\n", url)
}

func main() {
    urls := []string{"https://golang.org", "https://google.com"}
    var wg sync.WaitGroup
    
    for _, url := range urls {
        wg.Add(1)
        go fetchTitle(url, &wg)
    }
    
    wg.Wait()
    fmt.Println("Scraping complete!")
}`,

  "Distributed Task Runner": `package main

import (
    "fmt"
    "time"
)

func worker(id int, jobs <-chan int, results chan<- int) {
    for j := range jobs {
        fmt.Printf("Worker %d processing job %d\\n", id, j)
        time.Sleep(time.Second) // Simulate work
        results <- j * 2
    }
}

func main() {
    jobs := make(chan int, 10)
    results := make(chan int, 10)

    // Start 3 workers
    for w := 1; w <= 3; w++ {
        go worker(w, jobs, results)
    }

    // Send 5 jobs
    for j := 1; j <= 5; j++ {
        jobs <- j
    }
    close(jobs)

    // Collect results
    for a := 1; a <= 5; a++ {
        <-results
    }
    fmt.Println("All tasks processed.")
}`,

  "Build a profile screen": `import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://via.placeholder.com/150' }} 
        style={styles.avatar} 
      />
      <Text style={styles.name}>Jane Doe</Text>
      <Text style={styles.bio}>React Native Developer. I love building mobile apps!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  avatar: {
    width: 100, height: 100, borderRadius: 50, marginBottom: 16
  },
  name: { fontSize: 24, fontWeight: 'bold' },
  bio: { fontSize: 16, color: '#666', textAlign: 'center', padding: 20 }
});`,

  "Build a scrollable news feed": `import React, { useState } from 'react';
import { FlatList, View, Text, StyleSheet, RefreshControl } from 'react-native';

const INITIAL_DATA = [
  { id: '1', title: 'React Native 0.73 Released' },
  { id: '2', title: 'Building Smooth Animations' }
];

export default function Feed() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate network request
    setTimeout(() => setRefreshing(false), 2000);
  };

  return (
    <FlatList
      data={INITIAL_DATA}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}><Text>{item.title}</Text></View>
      )}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    />
  );
}

const styles = StyleSheet.create({
  card: { padding: 20, margin: 10, backgroundColor: '#f0f0f0', borderRadius: 8 }
});`,

  "Build a multi-screen app with navigation": `import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function HomeScreen() {
  return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Home!</Text></View>;
}

function SettingsScreen() {
  return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Settings!</Text></View>;
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}`
};

const filePath = path.join(__dirname, 'src/data/courses.js');
let content = fs.readFileSync(filePath, 'utf8');

for (const [title, snippet] of Object.entries(customSnippets)) {
  const titleRegex = new RegExp(`title:\\s*"${title.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')}"`);
  const match = content.match(titleRegex);
  if (!match) {
    console.log(`Could not find title: ${title}`);
    continue;
  }
  
  const titleIdx = match.index;
  const expectedIdx = content.indexOf('expectedOutput:', titleIdx);
  if (expectedIdx === -1) {
    console.log(`Could not find expectedOutput for title: ${title}`);
    continue;
  }
  
  const nextLessonsIdx = content.indexOf('lessons:', expectedIdx);
  if (nextLessonsIdx === -1) {
    console.log(`Could not find lessons block after title: ${title}`);
    continue;
  }
  
  const closingBraceIdx = content.lastIndexOf('}', nextLessonsIdx);
  if (closingBraceIdx === -1 || closingBraceIdx < expectedIdx) {
    console.log(`Could not find closing brace for miniProject: ${title}`);
    continue;
  }
  
  // Check if starterCode already exists between expectedOutput and closing brace
  const textBetween = content.slice(expectedIdx, closingBraceIdx);
  if (textBetween.includes('starterCode:')) {
    console.log(`starterCode already exists for: ${title}`);
    continue;
  }
  
  const snippetStr = JSON.stringify(snippet);
  const textBefore = content.slice(0, closingBraceIdx);
  const fixedTextBefore = textBefore.trimEnd().endsWith(',') ? textBefore : textBefore.trimEnd() + ',\n        ';
  
  content = fixedTextBefore + `  starterCode: ${snippetStr}\n        ` + content.slice(closingBraceIdx);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully injected bespoke code snippets!');
