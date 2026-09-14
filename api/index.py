import os
import json
import urllib.request
import urllib.error
from typing import Optional, Dict, Any, List
from fastapi import FastAPI, APIRouter, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

# Comprehensive Knowledge Base for MARGEXA Academic Advisory & Admissions
CHATHAMKULAM_KNOWLEDGE = """
MARGEXA ACADEMIC ADVISORY KNOWLEDGE BASE (KERALA HIGHER EDUCATION & CHATHAMKULAM GROUP OF INSTITUTIONS):

1. CHATHAMKULAM GROUP OF INSTITUTIONS (PALAKKAD, KERALA):
   - Location: Chathamkulam Knowledge City, Menonpara Road, Chandranagar / Palakkad - 678007, Kerala, India.
   - Official Website: https://chathamkulaminstitutions.org/
   - Central Support: support@margexa.com
   - Accreditations: Approved by AICTE (New Delhi), Affiliated with University of Calicut, Affiliated with APJ Abdul Kalam Technological University (KTU), and Recognized by Directorate of Technical Education (DTE), Govt. of Kerala.
   
   A. Chathamkulam Business School (CBS):
      - Program: Master of Business Administration (MBA) - 2 Years (4 Semesters) Full-time.
      - Dual Specializations:
        1. Logistics & Supply Chain Management (High demand in Kochi Port, Vallarpadam ICTT, Coimbatore, Middle East hubs).
        2. Finance Management (Banking, Corporate Valuation, Equity Research, FinTech).
        3. Marketing Management (Digital Marketing, Brand Management, FMCG Sales).
        4. Human Resource Management (Talent Acquisition, Strategic HR, Industrial Relations).
        5. Systems / IT Management (Business Analytics, ERP Systems).
      - Annual Tuition Fee: ₹1,20,000 to ₹1,45,000 per year (Before merit concessions).
      - Eligibility: Bachelor's degree in any discipline with minimum 50% aggregate marks (45% for SEBC/OBC/SC/ST) + valid score in KMAT Kerala, CMAT, or CAT.
      - Placement Statistics: 94%+ placement record. Average salary package: ₹4.8 - ₹6.2 LPA; Highest package: ₹8.5 LPA.
      - Recruiter Marquee: Federal Bank, TCS, HDFC Bank, Muthoot Finance, Reliance Retail, Flipkart Logistics, TVS Supply Chain, DHL Express, Ernst & Young, Cognizant.

   B. Chathamkulam College of Arts and Science:
      - Affiliation: University of Calicut.
      - Undergraduate & Postgraduate Programs:
        * BCA - Bachelor of Computer Applications (3 Years): ₹42,000/year. Python, Full-Stack Web Development, Data Structures, Cloud Computing.
        * B.Com with Computer Applications (3 Years): ₹34,000/year. Tally Prime, GST filing, E-Commerce, Corporate Accounting.
        * B.Com Finance (3 Years): ₹32,000/year. Financial markets, Indian banking law, auditing.
        * BBA - Bachelor of Business Administration (3 Years): ₹35,000/year. Corporate management, digital marketing, business analytics.
        * M.Com Finance (2 Years): ₹40,000/year. Advanced research methodology, security analysis, UGC NET/JRF coaching.

   C. Chathamkulam Polytechnic College:
      - Approved by: AICTE, New Delhi & Directorate of Technical Education (DTE), Govt. of Kerala.
      - Programs Offered (3-Year Engineering Diplomas):
        * Diploma in Computer Engineering: ₹38,000 - ₹45,000/year.
        * Diploma in Mechanical Engineering: ₹38,000 - ₹42,000/year.
        * Diploma in Civil Engineering: ₹36,000 - ₹40,000/year.
      - Eligibility: 10th Standard / SSLC / CBSE / ICSE pass with Mathematics & Science.
      - Lateral Entry (Direct to 2nd Year / 3rd Semester): Candidates who passed Plus Two (+2) Science with PCM OR 2-year ITI trade certificate.
      - Career & Higher Studies: Direct lateral entry admission into 2nd year (3rd semester) B.Tech in any Kerala engineering college through Kerala Lateral Entry Test (LET).

   D. Chathamkulam Merit Scholarships & Fee Waiver Policy:
      - Tier 1 (Super Merit - 90% and above in qualifying exam): 50% Tuition Fee Waiver across all years.
      - Tier 2 (High Merit - 80% to 89.9% in qualifying exam): 40% Tuition Fee Waiver.
      - Tier 3 (Merit Standing - 70% to 79.9% in qualifying exam): 25% Tuition Fee Waiver.
      - Single Girl Child / Rural Concession: ₹10,000 annual subsidy.
      - Sports & Cultural Quota: Concessions up to 30% for district/state level achievements.

2. DISTANCE EDUCATION VS REGULAR LEARNING:
   - Equivalence: Degrees from UGC-DEB approved institutions (Sree Narayanaguru Open University - SGOU, Calicut SDE, IGNOU) possess legal equivalence to regular degrees for all Kerala PSC exams, UPSC, SSC, Banking exams (IBPS/SBI).
"""


def generate_domain_expert_reply(query: str, student: Dict[str, Any]) -> str:
    q = query.lower().strip()
    name = student.get("name", "Student")
    score = student.get("percentage", 75)
    try:
        score = float(score)
    except (ValueError, TypeError):
        score = 75.0

    raw_budget = student.get("budget", 100000)
    try:
        budget_num = int(raw_budget)
        budget = f"₹{budget_num:,}"
    except (ValueError, TypeError):
        budget = "₹1,00,000"

    qual = student.get("qualification", "your qualification")
    preferred_mode = student.get("preferredMode", "Offline Regular")

    # 1. Scholarships & Chathamkulam Merit Fee Waivers
    if any(k in q for k in ["waiver", "scholarship", "concession", "chathamkulam merit", "qualify for chathamkulam", "fee reduction", "discount", "free seat"]):
        if score >= 90:
            tier_text = f"With your outstanding academic score of **{score}%**, you qualify for **Tier 1 (Super Merit): 50% Flat Tuition Fee Waiver** across all programs at Chathamkulam Group of Institutions!"
            effective_mba = "₹60,000/year (Saved ₹60,000/yr)"
            effective_poly = "₹19,000/year (Saved ₹19,000/yr)"
            effective_bcom = "₹16,000/year (Saved ₹16,000/yr)"
        elif score >= 80:
            tier_text = f"With your high academic score of **{score}%**, you qualify for **Tier 2 (High Merit): 40% Tuition Fee Waiver** at Chathamkulam Group of Institutions!"
            effective_mba = "₹72,000/year (Saved ₹48,000/yr)"
            effective_poly = "₹22,800/year (Saved ₹15,200/yr)"
            effective_bcom = "₹19,200/year (Saved ₹12,800/yr)"
        elif score >= 70:
            tier_text = f"With your score of **{score}%**, you qualify for **Tier 3 (Merit Standing): 25% Tuition Fee Waiver** at Chathamkulam Group of Institutions!"
            effective_mba = "₹90,000/year (Saved ₹30,000/yr)"
            effective_poly = "₹28,500/year (Saved ₹9,500/yr)"
            effective_bcom = "₹24,000/year (Saved ₹8,000/yr)"
        else:
            tier_text = f"With your score of **{score}%**, you qualify for the **Chathamkulam Need-cum-Merit Grant** and special category concessions."
            effective_mba = "₹1,05,000/year"
            effective_poly = "₹32,000/year"
            effective_bcom = "₹28,000/year"

        return f"""Hello {name}! Here is your personalized **Chathamkulam Merit Scholarship Evaluation**:

{tier_text}

### Your Discounted Tuition Fees at Chathamkulam Institutions (Palakkad):
* **Chathamkulam Business School (MBA):** Normal Fee ₹1,20,000/yr ➔ **Your Effective Fee: {effective_mba}**
* **Chathamkulam Polytechnic Diploma:** Normal Fee ₹38,000/yr ➔ **Your Effective Fee: {effective_poly}**
* **B.Com / BBA / BCA Degree:** Normal Fee ₹32,000 - ₹42,000/yr ➔ **Your Effective Fee: {effective_bcom}**

### Additional Concessions Available:
1. **Single Girl Child Grant:** Additional **₹10,000 annual subsidy** under the Chathamkulam Women's Education Initiative.
2. **Sports & Cultural Quota:** Up to **30% fee reduction** for district/state level certificate holders.
3. **Kerala E-Grantz & Post-Matric Support:** 100% tuition assistance processed for eligible reservation categories.

### How to Lock in Your Fee Waiver:
1. Navigate to the **Scholarships** tab in MARGEXA and click **"Apply for Scholarship"** under *Chathamkulam Institutional Merit Grant*.
2. Your provisional admission offer letter with the locked-in discounted fee will be generated instantly.
3. For direct assistance, email support@margexa.com."""

    # 2. Greetings
    if q in ["hi", "hello", "hey", "namaskaram"] or q.startswith("hi ") or q.startswith("hello "):
        return f"""Namaskaram **{name}**! Welcome to **MARGEXA AI Academic Advisory**.

I have analyzed your student profile:
* **Academic Score:** **{score}%** ({qual})
* **Annual Budget:** **{budget}/year**
* **Preferred Study Mode:** **{preferred_mode}**
* **Preferred Stream:** **{student.get("interest", "Management & Technology")}**

Here are 4 high-value topics I can immediately assist you with:
1. **Chathamkulam Business School (CBS) MBA:** Dual specializations (Logistics, Finance, Marketing, HR) & 94%+ placement record.
2. **Polytechnic Engineering Diplomas:** Computer, Mechanical & Civil Engineering with direct B.Tech lateral entry.
3. **Fee Concession & Scholarship:** You qualify for **up to 40% tuition fee reduction** at Chathamkulam Institutions!
4. **Distance vs. Regular Degrees:** Comparing Sree Narayanaguru Open University (SGOU) vs Regular campus degrees in Kerala.

What specific course, college, or admission doubt would you like to explore?"""

    # 3. MBA Inquiries
    if any(k in q for k in ["mba", "business school", "cbs", "logistics", "supply chain", "kmat"]):
        mba_fee = "₹72,000" if score >= 80 else "₹90,000"
        return f"""### Chathamkulam Business School (CBS) - MBA Comprehensive Guide

Chathamkulam Business School is an **AICTE-approved premier management institution** situated in Palakkad, affiliated with the **University of Calicut** and recognized by the Government of Kerala.

* **Program:** Master of Business Administration (MBA) - 2 Years Full-Time (4 Semesters).
* **Dual Specializations Available (Choose Any Two):**
  1. **Logistics & Supply Chain Management:** Tailored for Kerala & Gulf job markets (Cochin Port, Infopark logistics companies, Vallarpadam ICTT, Coimbatore freight hubs).
  2. **Financial Management:** Corporate valuation, investment banking, FinTech, and banking operations.
  3. **Marketing Management:** Digital marketing, consumer behavior, brand management, FMCG distribution.
  4. **Human Resource Management (HR):** Talent acquisition, labour welfare laws, corporate organizational psychology.
  5. **Systems / IT Management:** Business intelligence, ERP, and software project management.

* **Eligibility & Admission Process:**
  - Bachelor's degree in any discipline with minimum 50% marks (45% for SEBC/OBC/SC/ST).
  - Valid score in **KMAT Kerala**, **CMAT**, or **CAT**.

* **Fee Structure & Merit Scholarships:**
  - Standard Annual Tuition Fee: ₹1,20,000/year.
  - With your score of **{score}%**, you qualify for a **Merit Fee Waiver** bringing your fee down to **{mba_fee}/year**!

* **Placement & Recruiters:**
  - **94%+ Placement Rate** with average packages between ₹4.8 - ₹6.5 LPA.
  - Key Recruiters: Federal Bank, TCS, HDFC Bank, Muthoot Finance, Reliance Retail, Flipkart Logistics, DHL Express, Axis Bank, Ernst & Young.

Would you like to reserve a provisional MBA seat or send an inquiry to support@margexa.com?"""

    # 4. Polytechnic Diplomas & Lateral Entry
    if any(k in q for k in ["diploma", "polytechnic", "mechanical", "civil engineering", "computer engineering", "lateral entry", "let", "b.tech 2nd year"]):
        return f"""### Polytechnic Engineering Diplomas in Kerala & Chathamkulam Polytechnic College

Polytechnic Diplomas are 3-year technical programs recognized by **AICTE** and the **Directorate of Technical Education (DTE Kerala)**, providing direct entry into the engineering workforce or lateral admission into B.Tech.

* **Chathamkulam Polytechnic College (Palakkad):**
  1. **Diploma in Computer Engineering:** Software development, C/C++/Python, web development, networking. (₹38,000 - ₹45,000/year).
  2. **Diploma in Mechanical Engineering:** CNC machining, CAD/CAM drafting, automobile systems, thermodynamics. (₹38,000 - ₹42,000/year).
  3. **Diploma in Civil Engineering:** Total station surveying, AutoCAD/Revit BIM, structural testing. (₹36,000 - ₹40,000/year).

* **Pathway to B.Tech (Lateral Entry):**
  - **Direct Admission to 2nd Year (3rd Semester) B.Tech:** Polytechnic diploma graduates can take the **Kerala Lateral Entry Test (LET)** and secure direct admission into the 2nd year of B.Tech across all KTU-affiliated government and private engineering colleges in Kerala!
  - **Plus Two to Diploma Lateral Entry:** If you completed +2 Science with PCM, you can join directly into the 2nd year of the Polytechnic Diploma!

* **Your Estimated Fee with Merit Waiver ({score}% score):**
  - Your effective fee is reduced to approximately **₹22,800 - ₹28,500/year**!

You can apply for your preferred diploma branch right now through the **Colleges** tab!"""

    # 5. Default Fallback
    return f"""Thank you for your inquiry, **{name}**!

Here is an analysis based on your academic profile:
* **Academic Score:** **{score}%** in {qual}
* **Annual Budget:** **{budget}/year**
* **Target Delivery Mode:** **{preferred_mode}**

### Recommended Next Steps for Your Admission Journey:
1. **Chathamkulam Group of Institutions (Palakkad):**
   - **High Admission Probability (95%+):** Your score of {score}% puts you well above the cutoff for Chathamkulam Business School (MBA), Arts & Science (B.Com, BBA, BCA), and Polytechnic Engineering Diplomas.
   - **Locked-in Merit Concession:** You are eligible for up to **40% tuition fee reduction** under the Chathamkulam Institutional Merit Fellowship.
   - **Official Information:** You can explore the official campus at **chathamkulaminstitutions.org**.

2. **Direct Application:**
   - Use MARGEXA's **"One-Click Free Apply"** in the Colleges tab to receive your provisional admission offer letter with zero application fees.

3. **Support & Assistance:**
   - Email our central admissions team at **support@margexa.com** anytime for seat reservation questions!"""


def call_gemini_api(prompt: str, system_instruction: str) -> Optional[str]:
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        return None

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}"
    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "systemInstruction": {"parts": [{"text": system_instruction}]},
        "generationConfig": {"temperature": 0.4, "maxOutputTokens": 1024},
    }

    try:
        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "application/json", "User-Agent": "margexa-vercel-python"},
            method="POST",
        )
        with urllib.request.urlopen(req, timeout=12) as response:
            result = json.loads(response.read().decode("utf-8"))
            candidates = result.get("candidates", [])
            if candidates:
                parts = candidates[0].get("content", {}).get("parts", [])
                if parts and "text" in parts[0]:
                    return parts[0]["text"]
    except Exception as e:
        print(f"Gemini API error (falling back to expert engine): {e}")

    return None


# Models
class CounselorRequest(BaseModel):
    message: Optional[str] = None
    query: Optional[str] = None
    prompt: Optional[str] = None
    profile: Optional[Dict[str, Any]] = None
    studentProfile: Optional[Dict[str, Any]] = None
    currentCollegeContext: Optional[Any] = None


class ProfileEvaluationRequest(BaseModel):
    profile: Optional[Dict[str, Any]] = None
    studentProfile: Optional[Dict[str, Any]] = None


# Router setup to match both `/api/*` and `/*` identically
router = APIRouter()


@router.get("/health")
def health_check():
    return {
        "status": "ok",
        "runtime": "python-fastapi",
        "platform": "vercel",
        "app": "MARGEXA Education Consultancy",
        "hasGeminiKey": bool(os.environ.get("GEMINI_API_KEY")),
    }


@router.post("/ai-counselor")
def ai_counselor(body: CounselorRequest):
    user_message = (body.message or body.query or body.prompt or "").strip()
    profile = body.profile or body.studentProfile or {}

    if not user_message:
        return {
            "reply": "Hello! Please ask any question about college admissions, cutoffs, Chathamkulam Institutions, or Kerala degree & diploma programs.",
            "source": "default",
        }

    gemini_key = os.environ.get("GEMINI_API_KEY")
    if gemini_key:
        system_instruction = f"""You are the Senior Academic Dean and Chief Admission Counselor for MARGEXA (Premier Educational Consultancy & College Admission Platform in Kerala, India).
Provide accurate, encouraging admission counseling for Kerala colleges with reference to Chathamkulam Group of Institutions (Palakkad).
Support Email: support@margexa.com

KNOWLEDGE BASE:
{CHATHAMKULAM_KNOWLEDGE}

STUDENT PROFILE:
- Name: {profile.get('name', 'Candidate')}
- Score: {profile.get('percentage', 75)}%
- Budget: ₹{profile.get('budget', '1,00,000')}/year
- Mode: {profile.get('preferredMode', 'Offline Regular')}
- Stream: {profile.get('interest', 'General')}"""

        reply = call_gemini_api(f"Student Question: {user_message}", system_instruction)
        if reply:
            return {"reply": reply, "source": "gemini-python"}

    fallback_reply = generate_domain_expert_reply(user_message, profile)
    return {"reply": fallback_reply, "source": "margexa-python-expert-engine"}


@router.post("/evaluate-profile")
def evaluate_profile(body: ProfileEvaluationRequest):
    profile = body.profile or body.studentProfile or {}
    score = profile.get("percentage", 75)
    try:
        score = float(score)
    except (ValueError, TypeError):
        score = 75.0

    tier = "Super Merit" if score >= 85 else "High Merit" if score >= 75 else "Standard Merit"
    budget_val = profile.get("budget", 100000)
    try:
        budget_str = f"{int(budget_val):,}"
    except (ValueError, TypeError):
        budget_str = "1,00,000"

    evaluation = {
        "summary": f"Evaluated as a {tier} candidate for Kerala higher education admissions. Your score of {score}% qualifies you for direct institutional allotment and significant merit fee concessions at Chathamkulam Group of Institutions and partner colleges.",
        "recommendedStream": profile.get("interest", "Management & Technology"),
        "keyStrengths": [
            f"Competitive score of {score}% in past qualification",
            f"Annual budget of ₹{budget_str} matches aided and premier private colleges",
            f"Flexible alignment with {profile.get('preferredMode', 'Offline Regular')} learning",
        ],
        "safetyInstitutions": [
            "Chathamkulam Group of Institutions (Palakkad) - Guaranteed Merit Seat",
            "Govt Polytechnic College, Palakkad",
            "Farook College, Kozhikode",
        ],
        "reachInstitutions": [
            "Rajagiri College of Social Sciences, Kochi",
            "SCMS Cochin School of Business",
        ],
        "scholarshipAdvice": f"Eligible for Chathamkulam Institutional Merit Grant ({'40%' if score >= 80 else '25%'} fee reduction) and Kerala Post-Matric welfare aid.",
    }

    return {"evaluation": evaluation}


# App definition
app = FastAPI(title="MARGEXA Python API", redirect_slashes=False)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount both at root and under `/api` prefix for seamless Vercel serverless rewrites
app.include_router(router)
app.include_router(router, prefix="/api")


@app.get("/")
def root():
    return {
        "message": "MARGEXA Python API on Vercel is active",
        "docs": "/docs",
        "health": "/api/health",
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
