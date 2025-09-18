# Deployment Instructions

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `government-library-management`
3. Description: `Library Management System for Government Libraries of India`
4. Set to Public
5. Click "Create repository"

## Step 2: Push Code to GitHub

```bash
cd "d:\library management"
git init
git add .
git commit -m "Initial commit: Government Library Management System"
git branch -M main
git remote add origin https://github.com/diplom264/government-library-management.git
git push -u origin main
```

## Step 3: Deploy to Railway (Free Hosting)

1. Go to https://railway.app
2. Sign up with GitHub account (diplom264@gmail.com)
3. Click "New Project" → "Deploy from GitHub repo"
4. Select `government-library-management`
5. Railway will auto-deploy using the provided configurations

## Step 4: Deploy to Render (Alternative)

1. Go to https://render.com
2. Sign up with GitHub
3. Click "New" → "Web Service"
4. Connect GitHub repo
5. Use provided render.yaml configuration

## Step 5: Deploy to Heroku (Alternative)

1. Go to https://heroku.com
2. Create new app
3. Connect GitHub repo
4. Enable automatic deploys

Your app will be live at the provided URL!