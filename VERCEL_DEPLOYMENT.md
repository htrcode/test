# Deploying MARGEXA to Vercel with Python Backend

This project is configured for seamless deployment on **Vercel** with a **Vite + React frontend** and a **Python (FastAPI) Serverless backend**.

---

## Architecture on Vercel

* **Frontend**: Built with Vite (`npm run build` → `/dist`), served with high performance on Vercel's global CDN.
* **Backend API**: Python FastAPI serverless function in `api/index.py`, automatically routed for all `/api/*` endpoints.
* **Routing**: Configured via `vercel.json` with SPA routing and API function rewrites.

---

## 🚀 Steps to Deploy

### Option 1: Deploy via GitHub (Recommended)
1. Push this repository to **GitHub** (or GitLab/Bitbucket).
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import your repository.
4. Vercel automatically detects the build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. In **Environment Variables**, optionally add:
   - `GEMINI_API_KEY`: Your Google Gemini API Key (if you wish to enable real-time Gemini AI responses; otherwise, the built-in domain expert counseling engine handles queries automatically).
6. Click **Deploy**.

---

### Option 2: Deploy via Vercel CLI
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. In the project root, run:
   ```bash
   vercel
   ```
3. Follow the CLI prompts to deploy.

---

## 📡 API Endpoints Provided by Python (`api/index.py`)

- `GET /api/health`: Health status & environment diagnostics.
- `POST /api/ai-counselor`: AI academic counseling & Chathamkulam fee calculator.
- `POST /api/evaluate-profile`: AI student profile assessment.

---

## 🛠️ Local Python Testing (Optional)
If you wish to run the Python backend independently:
```bash
pip install -r requirements.txt
python api/index.py
```
The FastAPI docs will be accessible at `http://localhost:8000/docs`.
