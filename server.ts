import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { MARGEXA_KNOWLEDGE_BASE, generateDomainExpertReply as generateRichDomainReply } from "./src/data/advisorKnowledge";

dotenv.config();

// Comprehensive Knowledge Base for MARGEXA Academic Advisory & Admissions
const CHATHAMKULAM_KNOWLEDGE = `
MARGEXA ACADEMIC ADVISORY KNOWLEDGE BASE (KERALA HIGHER EDUCATION & CHATHAMKULAM GROUP OF INSTITUTIONS):

1. CHATHAMKULAM GROUP OF INSTITUTIONS (PALAKKAD, KERALA):
   - Location: Chathamkulam Knowledge City, Menonpara Road, Chandranagar / Palakkad - 678007, Kerala, India.
   - Official Website: https://chathamkulaminstitutions.org/
   - Admissions Hotline: +91 94470 12389 / +91 491 254 7890 | Email: admissions@margexa.edu.in
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
      - Eligibility: Bachelor's degree in any discipline with minimum 50% aggregate marks (45% for SEBC/OBC/SC/ST) + valid score in KMAT Kerala, CMAT, or CAT, followed by Group Discussion and Personal Interview.
      - Placement Statistics: 94%+ placement record. Average salary package: ₹4.8 - ₹6.2 LPA; Highest package: ₹8.5 LPA.
      - Recruiter Marquee: Federal Bank, TCS, HDFC Bank, Muthoot Finance, Reliance Retail, Flipkart Logistics, TVS Supply Chain, DHL Express, Ernst & Young, Cognizant, Infopark tech startups.
      - Special Amenities: Bloomberg-inspired live finance lab, entrepreneurship incubation center, free laptop provision, international certification modules (Supply Chain / Financial Modeling), industrial visits to Kochi Port & Chennai logistics hubs.

   B. Chathamkulam College of Arts and Science:
      - Affiliation: University of Calicut.
      - Undergraduate & Postgraduate Programs:
        * BCA - Bachelor of Computer Applications (3 Years): ₹42,000/year. Core subjects include Python programming, Full-Stack Web Development, Data Structures, Cloud Computing, Database Management, and final semester live projects with placement assistance.
        * B.Com with Computer Applications (3 Years): ₹34,000/year. Integrates Tally Prime with GST filing, E-Commerce, Corporate Accounting, and Banking competitive exam preparation.
        * B.Com Finance (3 Years): ₹32,000/year. Financial markets, Indian banking law, auditing, and corporate accounting.
        * BBA - Bachelor of Business Administration (3 Years): ₹35,000/year. Focus on corporate management, digital marketing, business analytics, and case study methodology.
        * M.Com Finance (2 Years): ₹40,000/year. Advanced research methodology, security analysis, portfolio management, UGC NET/JRF coaching support.
      - Eligibility: Pass in Plus Two (+2) / Higher Secondary (DHSE / CBSE / ICSE / VHSE) in relevant streams with minimum passing percentage.

   C. Chathamkulam Polytechnic College:
      - Approved by: AICTE, New Delhi & Directorate of Technical Education (DTE), Govt. of Kerala.
      - Programs Offered (3-Year Engineering Diplomas):
        * Diploma in Computer Engineering: ₹38,000 - ₹45,000/year. Software development, computer hardware, computer networking, web design, and database systems.
        * Diploma in Mechanical Engineering: ₹38,000 - ₹42,000/year. Advanced CNC machining, automobile workshops, thermodynamics, CAD/CAM drafting, mechatronics.
        * Diploma in Civil Engineering: ₹36,000 - ₹40,000/year. Total station land surveying, AutoCAD, Revit Building Information Modeling (BIM), concrete technology, highway engineering.
      - Eligibility: 10th Standard / SSLC / CBSE / ICSE pass with Mathematics & Science.
      - Lateral Entry (Direct to 2nd Year / 3rd Semester): Candidates who passed Plus Two (+2) Science with Physics, Chemistry, and Mathematics (PCM) OR completed a 2-year ITI trade certificate.
      - Career & Higher Studies Pathways: Direct lateral entry admission into 2nd year (3rd semester) B.Tech in any Kerala engineering college through Kerala Lateral Entry Test (LET). Campus placements in L&T, MRF Tyres, Tata Motors, Wipro Infrastructure, Kanjikode Industrial belt firms.

   D. Chathamkulam Merit Scholarships & Fee Waiver Policy:
      - Tier 1 (Super Merit - 90% and above in qualifying exam): 50% Tuition Fee Waiver across all years.
      - Tier 2 (High Merit - 80% to 89.9% in qualifying exam): 40% Tuition Fee Waiver.
      - Tier 3 (Merit Standing - 70% to 79.9% in qualifying exam): 25% Tuition Fee Waiver.
      - Single Girl Child / Rural Palakkad Concession: ₹10,000 annual subsidy.
      - Sports & Cultural Quota: Special concessions up to 30% for district/state level sports and cultural achievements.
      - Post-Matric & E-Grantz: Comprehensive support for Kerala government SC/ST/OEC/SEBC educational grant processing.
      - How to Claim: Apply directly through the Scholarships tab on MARGEXA or present original marks cards at the Palakkad admission office (+91 94470 12389).

   E. Campus Facilities:
      - On-Campus Hostels: Separate secure hostels for boys and girls with 24/7 security, resident wardens, high-speed Wi-Fi, study halls, and clean Kerala cuisine (vegetarian and non-vegetarian options). Average hostel cost: ₹4,500 - ₹5,500/month including mess food.
      - College Transportation Fleet: Fleet of buses operating across Palakkad, Kanjikode, Ottapalam, Alathur, Mannarkkad, Chittur, Kozhinjampara, Walayar, and Kerala-Tamil Nadu border corridors.
      - Career Development Cell: Placement training starts from 1st year covering soft skills, communication, aptitude test training, mock technical interviews, and resume building.

2. KERALA HIGHER EDUCATION ADMISSIONS LANDSCAPE:
   - APJ Abdul Kalam Technological University (KTU): Regulates B.Tech, M.Tech, and MCA engineering colleges in Kerala. KEAM entrance exam is the gateway for B.Tech merit seats.
   - University of Calicut: Affiliates arts, science, and commerce colleges in Palakkad, Malappuram, Kozhikode, Thrissur, and Wayanad. Centralized Admission Process (CAP) runs for UG and PG.
   - Sree Narayanaguru Open University (SGOU, Kollam): Kerala's official State Open University established by the Government of Kerala for UGC-DEB recognized distance degrees (B.Com, BBA, BA, BCA, M.Com, MA).
   - School of Distance Education (SDE) - University of Calicut: Highly affordable distance degree provider (₹3,000 - ₹5,500/year). 100% recognized for Kerala PSC, UPSC, Banking, and Master's degree admissions.
   - Directorate of Technical Education (DTE Kerala): Conducts Centralized Allotment Process (CAP) for Government, Aided, and Self-Financing Polytechnic colleges.

3. DISTANCE EDUCATION VS REGULAR LEARNING:
   - Equivalence: Degrees obtained through UGC-DEB approved institutions (SGOU, Calicut SDE, IGNOU) possess legal equivalence to regular degrees for all Kerala PSC exams, Union Public Service Commission (UPSC), Staff Selection Commission (SSC), Banking exams (IBPS/SBI), and private sector jobs.
   - When to choose Distance: Working professionals, students preparing for civil services or CA/CMA, or students with severe financial or geographic constraints.
   - When to choose Regular: Students seeking technical hands-on degrees (B.Tech, Polytechnic Diploma, BCA, MBA) requiring laboratory equipment, corporate networking, campus placement drives, and peer learning.

4. INSTITUTIONAL REGISTRATION & CAREER GUIDANCE PARTNERSHIPS ON MARGEXA:
   - For Colleges: AICTE/UGC approved colleges and polytechnics can register to list quota seats, receive pre-screened student applications, and access MARGEXA's statewide network.
   - For Career Guidance Centers & Consultancies: Career guidance centers across Kerala can register as official MARGEXA Partners.
     * Certified Partner: ₹19,999/year. 25% revenue share on VIP student mentorship, dedicated co-branded dashboard, prioritized seat allotment desk.
     * Regional Master Franchise: ₹49,999/year. 40% revenue share, exclusive district rights, institutional liaison priority, quarterly revenue payouts.
`;

// Helper: Smart Rule-Based Counselor Generator with deep domain knowledge
function generateDomainExpertReply(query: string, student: any): string {
  const q = query.toLowerCase().trim();
  const name = student?.name || "Student";
  const score = student?.percentage || 75;
  const budget = student?.budget ? `₹${Number(student.budget).toLocaleString('en-IN')}` : "₹1,00,000";
  const qual = student?.qualification || "your qualification";
  const preferredMode = student?.preferredMode || "Offline Regular";

  // 1. Scholarships & Chathamkulam Merit Fee Waivers
  if (
    q.includes("waiver") ||
    q.includes("scholarship") ||
    q.includes("concession") ||
    q.includes("chathamkulam merit") ||
    q.includes("qualify for chathamkulam") ||
    q.includes("fee reduction") ||
    q.includes("discount") ||
    q.includes("free seat")
  ) {
    let tierText = "";
    let effectiveMba = "";
    let effectivePoly = "";
    let effectiveBcom = "";

    if (score >= 90) {
      tierText = `With your outstanding academic score of **${score}%**, you qualify for **Tier 1 (Super Merit): 50% Flat Tuition Fee Waiver** across all programs at Chathamkulam Group of Institutions!`;
      effectiveMba = "₹60,000/year (Saved ₹60,000/yr)";
      effectivePoly = "₹19,000/year (Saved ₹19,000/yr)";
      effectiveBcom = "₹16,000/year (Saved ₹16,000/yr)";
    } else if (score >= 80) {
      tierText = `With your high academic score of **${score}%**, you qualify for **Tier 2 (High Merit): 40% Tuition Fee Waiver** at Chathamkulam Group of Institutions!`;
      effectiveMba = "₹72,000/year (Saved ₹48,000/yr)";
      effectivePoly = "₹22,800/year (Saved ₹15,200/yr)";
      effectiveBcom = "₹19,200/year (Saved ₹12,800/yr)";
    } else if (score >= 70) {
      tierText = `With your score of **${score}%**, you qualify for **Tier 3 (Merit Standing): 25% Tuition Fee Waiver** at Chathamkulam Group of Institutions!`;
      effectiveMba = "₹90,000/year (Saved ₹30,000/yr)";
      effectivePoly = "₹28,500/year (Saved ₹9,500/yr)";
      effectiveBcom = "₹24,000/year (Saved ₹8,000/yr)";
    } else {
      tierText = `With your score of **${score}%**, you qualify for the **Chathamkulam Need-cum-Merit Grant** and special category concessions.`;
      effectiveMba = "₹1,05,000/year";
      effectivePoly = "₹32,000/year";
      effectiveBcom = "₹28,000/year";
    }

    return `Hello ${name}! Here is your personalized **Chathamkulam Merit Scholarship Evaluation**:

${tierText}

### Your Discounted Tuition Fees at Chathamkulam Institutions (Palakkad):
* **Chathamkulam Business School (MBA):** Normal Fee ₹1,20,000/yr ➔ **Your Effective Fee: ${effectiveMba}**
* **Chathamkulam Polytechnic Diploma:** Normal Fee ₹38,000/yr ➔ **Your Effective Fee: ${effectivePoly}**
* **B.Com / BBA / BCA Degree:** Normal Fee ₹32,000 - ₹42,000/yr ➔ **Your Effective Fee: ${effectiveBcom}**

### Additional Concessions Available:
1. **Single Girl Child Grant:** Additional **₹10,000 annual subsidy** under the Chathamkulam Women's Education Initiative.
2. **Sports & Cultural Quota:** Up to **30% fee reduction** for district/state level certificate holders.
3. **Kerala E-Grantz & Post-Matric Support:** 100% tuition assistance processed for eligible reservation categories.

### How to Lock in Your Fee Waiver:
1. Navigate to the **Scholarships** tab in MARGEXA and click **"Apply for Scholarship"** under *Chathamkulam Institutional Merit Grant*.
2. Your provisional admission offer letter with the locked-in discounted fee will be generated.
3. For immediate assistance, contact the Palakkad Admission Desk at **+91 94470 12389**.`;
  }

  // 2. Greetings
  if (q === "hi" || q === "hello" || q === "hey" || q.startsWith("hi ") || q.startsWith("hello ") || q === "namaskaram") {
    return `Namaskaram **${name}**! Welcome to **MARGEXA AI Academic Advisory**.

I have analyzed your student profile:
* **Academic Score:** **${score}%** (${qual})
* **Annual Budget:** **${budget}/year**
* **Preferred Study Mode:** **${preferredMode}**
* **Preferred Stream:** **${student?.interest || "Management & Technology"}**

Here are 4 high-value topics I can immediately assist you with:
1. **Chathamkulam Business School (CBS) MBA:** Dual specializations (Logistics, Finance, Marketing, HR) & 94%+ placement record.
2. **Polytechnic Engineering Diplomas:** Computer, Mechanical & Civil Engineering with direct B.Tech lateral entry.
3. **Fee Concession & Scholarship:** You qualify for **up to 40% tuition fee reduction** at Chathamkulam Institutions!
4. **Distance vs. Regular Degrees:** Comparing Sree Narayanaguru Open University (SGOU) vs Regular campus degrees in Kerala.

What specific course, college, or admission doubt would you like to explore?`;
  }

  // 3. Chathamkulam Business School & MBA Inquiries
  if (q.includes("mba") || q.includes("business school") || q.includes("cbs") || q.includes("logistics") || q.includes("supply chain") || q.includes("kmat")) {
    return `### Chathamkulam Business School (CBS) - MBA Comprehensive Guide

Chathamkulam Business School is an **AICTE-approved premier management institution** situated in Palakkad, affiliated with the **University of Calicut** and recognized by the Government of Kerala.

* **Program:** Master of Business Administration (MBA) - 2 Years Full-Time (4 Semesters).
* **Dual Specializations Available (Choose Any Two):**
  1. **Logistics & Supply Chain Management:** Tailored for Kerala & Gulf job markets (Cochin Port, Infopark logistics companies, Vallarpadam ICTT, Coimbatore freight hubs).
  2. **Financial Management:** Corporate valuation, investment banking, FinTech, and banking operations.
  3. **Marketing Management:** Digital marketing, consumer behavior, brand management, FMCG distribution.
  4. **Human Resource Management (HR):** Talent acquisition, labour welfare laws, corporate organizational psychology.
  5. **Systems / IT Management:** Business intelligence, ERP, and software project management.

* **Eligibility & Admission Process:**
  - Bachelor's degree in any discipline (Arts, Science, Commerce, Engineering) with minimum 50% marks (45% for SEBC/OBC/SC/ST).
  - Valid score in **KMAT Kerala**, **CMAT**, or **CAT**.
  - Shortlisted candidates undergo a Group Discussion (GD) and Personal Interview (PI) at the Palakkad campus.

* **Fee Structure & Merit Scholarships:**
  - Standard Annual Tuition Fee: ₹1,20,000/year.
  - With your score of **${score}%**, you qualify for a **Merit Fee Waiver** bringing your fee down to **₹${score >= 80 ? '72,000' : '90,000'}/year**!

* **Placement & Recruiters:**
  - **94%+ Placement Rate** with average packages between ₹4.8 - ₹6.5 LPA.
  - Key Recruiters: Federal Bank, TCS, HDFC Bank, Muthoot Finance, Reliance Retail, Flipkart Logistics, DHL Express, Axis Bank, Ernst & Young.
  - Amenities include Bloomberg-standard finance simulations, free student laptop, and paid summer internships in Kochi and Chennai.

Would you like to reserve a provisional MBA seat or speak directly with the CBS MBA Dean at **+91 94470 12389**?`;
  }

  // 4. Polytechnic Diplomas & Lateral Entry to B.Tech
  if (
    q.includes("diploma") ||
    q.includes("polytechnic") ||
    q.includes("mechanical") ||
    q.includes("civil engineering") ||
    q.includes("computer engineering") ||
    q.includes("lateral entry") ||
    q.includes("let") ||
    q.includes("b.tech 2nd year")
  ) {
    return `### Polytechnic Engineering Diplomas in Kerala & Chathamkulam Polytechnic College

Polytechnic Diplomas are 3-year technical programs recognized by **AICTE** and the **Directorate of Technical Education (DTE Kerala)**, providing direct entry into the engineering workforce or lateral admission into B.Tech.

* **Chathamkulam Polytechnic College (Palakkad):**
  1. **Diploma in Computer Engineering:**
     - Curriculum: Software development, C/C++/Python, web development, networking, and microprocessors.
     - Career: Junior Software Developer, Network Technician, Cloud Support Executive.
     - Annual Fee: ₹38,000 - ₹45,000/year.
  2. **Diploma in Mechanical Engineering:**
     - Curriculum: CNC machining, CAD/CAM drafting, automobile systems, thermodynamics, industrial maintenance.
     - Career: Junior Engineer in Kanjikode industrial area, MRF, L&T, Tata Motors, and Gulf HVAC/fabrication sectors.
     - Annual Fee: ₹38,000 - ₹42,000/year.
  3. **Diploma in Civil Engineering:**
     - Curriculum: Total station surveying, AutoCAD/Revit BIM, RCC construction, structural testing.
     - Career: Site Supervisor, Draftsman, Assistant Engineer in Kerala PWD / KSEB / private construction.
     - Annual Fee: ₹36,000 - ₹40,000/year.

* **Pathway to B.Tech (Lateral Entry):**
  - **Direct Admission to 2nd Year (3rd Semester) B.Tech:** Polytechnic diploma graduates can take the **Kerala Lateral Entry Test (LET)** and secure direct admission into the 2nd year of B.Tech across all KTU-affiliated government and private engineering colleges in Kerala!
  - **Plus Two to Diploma Lateral Entry:** If you already completed +2 Science with Physics, Chemistry, and Mathematics (PCM), you can join directly into the 2nd year (3rd semester) of the Polytechnic Diploma!

* **Your Estimated Fee with Merit Waiver (${score}% score):**
  - Your effective fee is reduced to approximately **₹22,800 - ₹28,500/year**!

You can apply for your preferred diploma branch right now through the **Colleges** tab!`;
  }

  // 5. BCA vs B.Tech / Computer Science Career Guidance
  if (q.includes("bca") || q.includes("b.tech") || q.includes("cs") || q.includes("it job") || q.includes("software") || q.includes("computer science")) {
    return `### BCA vs. B.Tech Computer Science: Which is Better for You?

Both degrees lead to successful careers in software engineering, cloud computing, and IT services in Infopark Kochi, Technopark Trivandrum, and Bangalore. Here is how they compare:

* **BCA (Bachelor of Computer Applications):**
  - **Duration:** 3 Years (or 4-Year Honours under FYUGP).
  - **Focus:** Practical software application, full-stack web development, Python, mobile apps, and database systems.
  - **Eligibility:** 10+2 in any stream (having Mathematics or Computer Science is preferred).
  - **Cost:** Highly affordable (₹35,000 - ₹45,000/year at Chathamkulam College of Arts & Science).
  - **Pathway:** BCA ➔ MCA (2 Years) OR direct entry into IT companies as Associate Software Engineer.

* **B.Tech Computer Science & Engineering:**
  - **Duration:** 4 Years.
  - **Focus:** Computer architecture, hardware engineering, operating system internals, compiler design, and theoretical algorithms.
  - **Eligibility:** +2 Science with minimum 50% in Physics, Chemistry, and Mathematics + KEAM entrance rank.
  - **Cost:** ₹35,000/yr (Govt Aided like TKMCE) to ₹1,50,000 - ₹2,40,000/yr (Self-financing/Deemed like Amrita).

* **Recommendation for ${name}:**
  - If your budget is **${budget}/year** and you want an affordable, practical entry into IT without KEAM stress, **BCA at Chathamkulam College of Arts and Science** is an exceptional choice. You save 1 full year compared to B.Tech and can start earning by age 21!`;
  }

  // 6. Commerce & Management: B.Com vs BBA
  if (q.includes("b.com") || q.includes("bba") || q.includes("commerce") || q.includes("banking") || q.includes("tally") || q.includes("gst") || q.includes("m.com")) {
    return `### B.Com vs. BBA at Chathamkulam College of Arts & Science (Palakkad)

Both programs are affiliated with the **University of Calicut** and designed to prepare students for banking, corporate finance, and business administration:

* **B.Com (Computer Applications & Finance):**
  - **Duration:** 3 Years (6 Semesters).
  - **Annual Tuition:** ₹32,000 - ₹34,000/year (Eligible for your merit concession).
  - **Key Modules:** Tally Prime with real-time GST filing, E-Commerce, Corporate Accounting, Company Law, Banking Regulations.
  - **Ideal For:** Students aiming for Bank PO/Clerk exams (SBI, Federal Bank), Junior Accountant, CA/CMA foundation, or Financial Analyst positions.

* **BBA (Bachelor of Business Administration):**
  - **Duration:** 3 Years (6 Semesters).
  - **Annual Tuition:** ₹35,000/year.
  - **Key Modules:** Entrepreneurship development, digital marketing, human resource management, corporate strategy, business analytics.
  - **Ideal For:** Students who want to pursue an MBA at Chathamkulam Business School, launch a business, or work in marketing and operations management.

* **M.Com Finance (Postgraduate):**
  - **Duration:** 2 Years | Annual Tuition: ₹40,000/year.
  - Includes UGC NET / JRF preparatory modules for lectureship.

Hostel accommodation and college bus routes across Palakkad district are fully available for all Commerce students.`;
  }

  // 7. Distance Education vs Regular Offline Classes in Kerala
  if (
    q.includes("distance") ||
    q.includes("online") ||
    q.includes("sgou") ||
    q.includes("sde") ||
    q.includes("sree narayanaguru") ||
    q.includes("calicut distance") ||
    q.includes("ignou") ||
    q.includes("psc") ||
    q.includes("regular vs distance")
  ) {
    return `### Distance Education vs. Regular Offline Degree in Kerala: Complete Clarity

* **Is a Distance Degree Valid for Kerala PSC and Government Jobs?**
  - **YES, 100% VALID.** The Kerala Public Service Commission (PSC), Union Public Service Commission (UPSC), Staff Selection Commission (SSC), and Indian Banks accept any degree approved by the **UGC (University Grants Commission) and DEB (Distance Education Bureau)**.
  - Degrees from **Sree Narayanaguru Open University (SGOU, Kollam)** and **School of Distance Education (SDE) - University of Calicut** carry full legal equivalence to regular degrees in Kerala.

* **Key Differences to Consider:**
  1. **Cost:** Distance learning is exceptionally low-cost (₹3,000 - ₹6,000 per year at Calicut SDE / SGOU) versus ₹30,000 - ₹60,000/yr for regular offline colleges.
  2. **Attendance:** Distance education has no mandatory daily attendance; study material is provided by post and student portals, with weekend contact seminars.
  3. **Campus Placements:** Regular colleges (such as Chathamkulam Institutions or Rajagiri) host dedicated on-campus recruitment drives where companies come to interview students directly. Distance universities do not host physical campus recruitment drives.
  4. **Hands-on Technical Courses:** Technical degrees like **B.Tech, Polytechnic Diplomas, and Nursing CANNOT be studied via distance mode** per AICTE and statutory council mandates.

* **Summary Recommendation for ${name}:**
  - If you need to work while studying or are preparing for competitive exams full-time, choose **Calicut University SDE or SGOU**.
  - If you want placement assistance, laboratory projects, and faculty interaction, choose **Chathamkulam Group of Institutions**!`;
  }

  // 8. Hostels, Mess Food, and Bus Transport at Chathamkulam
  if (
    q.includes("hostel") ||
    q.includes("food") ||
    q.includes("mess") ||
    q.includes("bus") ||
    q.includes("transport") ||
    q.includes("accommodation") ||
    q.includes("room") ||
    q.includes("palakkad")
  ) {
    return `### Chathamkulam Campus Hostels & Transportation Facilities (Palakkad)

Chathamkulam Group of Institutions provides comprehensive residential and transit infrastructure at its Palakkad campus:

* **Hostel Accommodation:**
  - **Separate Hostels:** Dedicated secure campus blocks for male and female students.
  - **Room Amenities:** Well-ventilated 2-sharing and 3-sharing rooms with study tables, wardrobes, 24/7 high-speed Wi-Fi, and continuous backup power.
  - **Safety & Security:** 24/7 CCTV surveillance, biometric attendance, and resident faculty wardens.
  - **Hygienic Mess:** Wholesome, balanced South Indian & Kerala meals (both vegetarian and non-vegetarian options prepared under strict food-safety guidelines).
  - **Monthly Cost:** Approximately **₹4,500 - ₹5,500 per month** covering both accommodation and mess food.

* **College Bus Network:**
  - Dedicated college bus fleet connecting major towns across Palakkad and surrounding districts:
    * Route 1: Palakkad Town - Stadium Bus Stand - Chandranagar - Campus
    * Route 2: Ottapalam - Pathiripala - Parli - Campus
    * Route 3: Alathur - Kuzhalmannam - Kazhchaparambu - Campus
    * Route 4: Mannarkkad - Kongad - Olavakkode - Campus
    * Route 5: Chittur - Kozhinjampara - Menonpara - Campus
    * Route 6: Walayar - Kanjikode Industrial Area - Campus

Day scholars can easily commute from anywhere in Palakkad district with subsidized semester bus passes!`;
  }

  // 9. Institutional Registration for Colleges & Polytechnics
  if (
    q.includes("register college") ||
    q.includes("college registration") ||
    q.includes("list college") ||
    q.includes("institutional") ||
    q.includes("add college")
  ) {
    return `### Institutional Registration on MARGEXA for Colleges & Polytechnics

Are you an administrator or principal representing a higher education institution in Kerala?

* **Why Register on MARGEXA:**
  1. **Direct Student Allotments:** Receive pre-qualified student applications tailored to your eligibility cutoffs, seat capacities, and fee categories.
  2. **Verified Listing Badge:** Highlight your AICTE, NAAC, NBA, and University affiliations to build student trust.
  3. **Quota Management:** Manage General Merit, Management Quota, and Community Quota admissions from a central dashboard.
  4. **Statewide Outreach:** Connect with thousands of SSLC, +2, and degree candidates seeking seats across Kerala.

* **How to Register Your Institution:**
  - Click the **"Register Your College"** button in the top navigation bar or the green action banner in the **Colleges** tab.
  - Complete the online registration form (Institution Name, AICTE/UGC Affiliation Number, Principal Contact, Available Streams, and Quota Details).
  - The MARGEXA Institutional Desk will verify your credentials and activate your verified portal within 24 hours.
  - For immediate institutional partnerships, contact our Director of Admissions at **+91 94470 12389**.`;
  }

  // 10. Career Guidance Centers & Consultancy Partnerships
  if (
    q.includes("career guidance") ||
    q.includes("consultancy") ||
    q.includes("partner") ||
    q.includes("franchise") ||
    q.includes("commission") ||
    q.includes("revenue share") ||
    q.includes("agency")
  ) {
    return `### MARGEXA Career Guidance Center & Consultancy Partnership Network

MARGEXA partners with certified career guidance centers, overseas education agencies, and regional consultancies across Kerala to deliver premium admissions counseling and boost partner earnings.

* **Partnership Tiers:**
  1. **Certified Partner (₹19,999/year):**
     - **25% Revenue Share** on all premium VIP Mentorship packages booked through your partner code.
     - Co-branded student dashboard and dedicated partner referral link.
     - Direct institutional quota access for Chathamkulam Institutions (Palakkad) and partner colleges.
     - Marketing toolkit, admission brochures, and digital banners.
  2. **Regional Master Franchise (₹49,999/year):**
     - **40% Revenue Share** on all counseling packages and premium services.
     - Exclusive territorial rights for your taluk/district.
     - Direct hotline to college registrars and guaranteed seat reservations.
     - Dedicated account manager and bi-weekly revenue settlements.

* **How Guidance Centers Join:**
  - Visit the **Guidance Partners** tab in the main navigation.
  - Use the interactive revenue calculator to see how guiding just 25 students generates **₹80,000+ in partner commissions**.
  - Submit your partnership application or call our Liaison Desk at **+91 94470 12389**.`;
  }

  // 11. Low Marks / Average Percentage / Backlog Inquiries
  if (
    q.includes("low mark") ||
    q.includes("low percentage") ||
    q.includes("failed") ||
    q.includes("supplementary") ||
    q.includes("backlog") ||
    q.includes("minimum mark") ||
    q.includes("45%") ||
    q.includes("50%") ||
    q.includes("poor score")
  ) {
    return `### Academic Guidance for Average Scores & Direct Quotas in Kerala

If your marks are between 45% - 60%, **do not worry!** Higher education in Kerala has multiple excellent pathways:

1. **Polytechnic Engineering Diplomas (Chathamkulam Polytechnic):**
   - Eligibility is a simple pass in 10th standard / SSLC with Science and Mathematics (40-45%).
   - Once you complete the diploma with good marks, you can enter directly into the 2nd year of B.Tech via the Kerala Lateral Entry Test (LET), completely bypassing competitive entrance stress!

2. **Management & Institutional Quotas:**
   - Colleges such as Chathamkulam Group of Institutions reserve institutional quota seats for students with passing marks (45-50%).
   - You can secure a verified seat in **B.Com, BBA, BCA, or MBA** without high entrance exam percentiles.

3. **Need-cum-Merit Concessions:**
   - Even with 50-60%, Chathamkulam offers community and economic support concessions to reduce your fee burden.

4. **Distance & Open Degrees (SGOU / Calicut SDE):**
   - Open admissions with minimal cutoff criteria. You receive a fully recognized UGC-DEB degree valid for all government and private jobs.

Speak with our counselors at **+91 94470 12389** for direct allotment assistance!`;
  }

  // 12. Admission Procedures, Dates & Documents Required for 2026-27
  if (
    q.includes("document") ||
    q.includes("admission procedure") ||
    q.includes("how to apply") ||
    q.includes("date") ||
    q.includes("deadline") ||
    q.includes("last date") ||
    q.includes("step")
  ) {
    return `### Kerala Higher Education Admissions 2026-27: Step-by-Step Guide

* **Mandatory Documents Required:**
  1. 10th Standard / SSLC Mark List & Passing Certificate.
  2. Plus Two (+2) / Higher Secondary Mark List & Certificate.
  3. Transfer Certificate (TC) and Conduct Certificate from your last attended institution.
  4. Entrance Scorecard (KMAT / CMAT / CAT for MBA; KEAM for B.Tech; or LET for Lateral Entry).
  5. Migration Certificate (For CBSE, ICSE, or outside-Kerala students).
  6. Caste / Income / Community Certificate (For E-Grantz and reservation benefits).
  7. Passport-size photographs (4 copies).

* **How to Secure Admission via MARGEXA:**
  - **Step 1:** Go to the **Colleges** tab or **AI Matchmaker** on MARGEXA.
  - **Step 2:** Choose your program (e.g. Chathamkulam MBA, BCA, B.Com, or Polytechnic Diploma).
  - **Step 3:** Click **"One-Click Free Apply"**. Your application is instantly transmitted to the college admission desk.
  - **Step 4:** Visit the **Scholarships** tab to lock in your up to 40% Chathamkulam Merit Fee Concession.
  - **Step 5:** Download your provisional offer letter directly from the **Applications** dashboard and finalize your seat!`;
  }

  // 13. High-placement, Low-budget Courses (Matching student's budget)
  if (q.includes("budget") || q.includes("affordable") || q.includes("cheap") || q.includes("low cost") || q.includes("fees")) {
    return `### Best Degree & Diploma Programs Under Your Budget (${budget}/year)

With your annual budget of **${budget}/year**, here are the highest-ROI programs in Kerala:

1. **Chathamkulam Polytechnic Diploma (Palakkad):**
   - **Annual Tuition:** ₹38,000/yr (drops to **~₹22,800/yr** with your ${score}% score).
   - **Why it fits:** 100% within your budget. Graduates secure immediate junior engineering jobs in Kanjikode, Coimbatore, and Chennai or lateral B.Tech entry.

2. **Chathamkulam College of Arts & Science (B.Com / BBA / BCA):**
   - **Annual Tuition:** ₹32,000 - ₹42,000/yr (drops to **~₹19,000 - ₹25,000/yr** after your merit waiver).
   - **Why it fits:** Outstanding value for a University of Calicut regular degree with full computer labs and placement cell.

3. **Government Polytechnic College, Palakkad:**
   - **Annual Tuition:** Under ₹5,000/year (Govt Merit quota).

4. **School of Distance Education - Calicut University (Distance B.Com/BBA):**
   - **Annual Tuition:** ₹4,200 - ₹4,800/year. 100% flexible study while working.

You can apply to any of these options directly from your MARGEXA dashboard!`;
  }

  // 14. Comprehensive Fallback: Contextual, Rich, and Structured
  return `Thank you for your inquiry, **${name}**!

Here is an analysis based on your academic profile:
* **Academic Score:** **${score}%** in ${qual}
* **Annual Budget:** **${budget}/year**
* **Target Delivery Mode:** **${preferredMode}**

### Recommended Next Steps for Your Admission Journey:
1. **Chathamkulam Group of Institutions (Palakkad):**
   - **High Admission Probability (95%+):** Your score of ${score}% puts you well above the cutoff for Chathamkulam Business School (MBA), Arts & Science (B.Com, BBA, BCA), and Polytechnic Engineering Diplomas.
   - **Locked-in Merit Concession:** You are eligible for up to **40% tuition fee reduction** under the Chathamkulam Institutional Merit Fellowship.
   - **Official Information:** You can explore the official campus at **chathamkulaminstitutions.org**.

2. **Direct Application:**
   - Use MARGEXA's **"One-Click Free Apply"** in the Colleges tab to receive your provisional admission offer letter with zero application fees.

3. **Human Counseling Helpline:**
   - Call our Palakkad Liaison Desk at **+91 94470 12389** for immediate seat reservation or campus tour appointments.

Feel free to ask me anything specific about MBA specializations, diploma branches, hostel mess, bus routes, or fee payment installments!`;
}

// Initialize Google GenAI lazily or with safety check
let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      app: "MARGEXA Education Consultancy",
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
      timestamp: new Date().toISOString(),
    });
  });

  // AI Counselor Endpoint
  app.post("/api/ai-counselor", async (req, res) => {
    try {
      const userMessage = (req.body.message || req.body.query || req.body.prompt || "").trim();
      const profile = req.body.profile || req.body.studentProfile || {};
      const currentCollegeContext = req.body.currentCollegeContext || req.body.context;

      if (!userMessage) {
        return res.json({
          reply: "Hello! Please ask any question about college admissions, cutoffs, Chathamkulam Institutions, or Kerala degree & diploma programs.",
          source: "default",
        });
      }

      const ai = getAiClient();

      if (!ai) {
        // Use our deeply trained domain-expert knowledge engine
        const reply = generateRichDomainReply(userMessage, profile);
        return res.json({ reply, source: "margexa-expert-engine" });
      }

      const systemInstruction = `You are the Senior Academic Dean and Chief Admission Counselor for MARGEXA (Premier Educational Consultancy & College Admission Platform in Kerala, India).
Your goal is to provide accurate, authoritative, thorough, and highly encouraging admission counseling to students seeking higher education in Kerala.

EXTENSIVE KNOWLEDGE BASE:
${MARGEXA_KNOWLEDGE_BASE}

STUDENT PROFILE CONTEXT:
- Name: ${profile?.name || 'Candidate'}
- Past Qualification: ${profile?.qualification || '12th / Plus Two'} (${profile?.percentage || 75}%)
- Stream: ${profile?.stream || 'General'}
- Annual Budget: ₹${profile?.budget ? Number(profile.budget).toLocaleString('en-IN') : '1,00,000'}/year
- Preferred Mode: ${profile?.preferredMode || profile?.mode || 'Offline / Regular'}
- Interest Area: ${profile?.interest || 'General Higher Education'}
- Preferred Location: ${profile?.preferredDistrict || profile?.location || 'Palakkad / Kerala'}
${currentCollegeContext ? `Contextual College/Course: ${JSON.stringify(currentCollegeContext)}` : ''}

COUNSELING DIRECTIVES:
1. Always directly and thoroughly address the student's question with specific Kerala and Chathamkulam facts, figures, fees, and rules.
2. If the student asks about Student VIP Mentorship or Priority VIP Counseling:
   - Emphasize that it is a SINGLE MONTHLY PLAN of ₹349/month (students do NOT have to pay every time they consult).
   - It covers BOTH guaranteed 20-minute priority callback / video consultation AND 1-on-1 private strategy sessions with senior deans (Prof. K. Sreedharan, Er. Ananya Nair, Adv. Mathew Thomas).
   - All bookings during the active month are 100% free with zero per-session fees.
3. If the student asks about Chathamkulam Institutions or merit scholarships/fee waivers, explicitly state the tier structure:
   - Tier 1 (90%+): 50% tuition fee waiver
   - Tier 2 (80-89%): 40% tuition fee waiver
   - Tier 3 (70-79%): 25% tuition fee waiver
   - Single Girl Child: ₹10,000 annual subsidy
   - Calculate their specific discounted fee based on their score (${profile?.percentage || 75}%) and budget (₹${profile?.budget ? Number(profile.budget).toLocaleString('en-IN') : '1,00,000'}/yr).
4. If they ask about Chathamkulam Business School (CBS) MBA, detail the dual specializations (Logistics & Supply Chain, Finance, Marketing, HR, Systems), Calicut University affiliation, KMAT cutoff (~72/720), and placement statistics (94%+, avg 4.8 - 6.2 LPA, recruiters like Federal Bank, TCS, HDFC, Flipkart, DHL, EY).
5. If they ask about Polytechnic Diplomas, detail Computer, Mechanical, and Civil branches at Chathamkulam Polytechnic, explain lateral entry to 2nd year for +2 PCM/ITI, and progression to B.Tech 2nd year through Kerala LET (bypassing KEAM).
6. If they ask about Distance vs Regular Education, explain that degrees from UGC-DEB recognized universities (Sree Narayanaguru Open University - SGOU, Calicut SDE, IGNOU) are 100% legally valid for Kerala PSC, UPSC, KAS, and government exams, and contrast the cost/flexibility with regular campus placements.
7. If they ask about Hostels & Transportation, detail Chathamkulam's separate secure hostels with Kerala mess (₹4,500 - ₹5,500/month) and 6 bus routes connecting Palakkad, Ottapalam, Alathur, Mannarkkad, Chittur, and Walayar.
8. If they ask about Guidance Centers & Consultancies, explain the partnership tiers (Silver: Free/₹5k commission, Gold: ₹19,999/mo/₹10k commission, Platinum: ₹49,999/mo/₹15k commission).
9. Format your response cleanly with clear markdown headings (###), bullet points, and bold text. Avoid generic or repetitive answers.`;

      const geminiPromise = ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: [
          { text: `Student Question: ${userMessage}` },
        ],
        config: {
          systemInstruction: {
            parts: [{ text: systemInstruction }],
          },
        },
      });

      // Increased timeout to 14,000ms to allow Gemini full generation time
      const timeoutPromise = new Promise<any>((_, reject) =>
        setTimeout(() => reject(new Error("Gemini API call timed out, falling back to expert engine")), 14000)
      );

      const response = await Promise.race([geminiPromise, timeoutPromise]);
      const reply = response?.text || generateRichDomainReply(userMessage, profile);
      res.json({ reply, source: "gemini" });
    } catch (error: any) {
      console.error("AI Counselor note:", error?.message || error);
      const userMessage = (req.body.message || req.body.query || "").trim();
      const profile = req.body.profile || req.body.studentProfile || {};
      const fallbackReply = generateRichDomainReply(userMessage, profile);
      res.json({
        reply: fallbackReply,
        source: "margexa-expert-engine-fallback",
      });
    }
  });

  // AI Profile Evaluation Endpoint
  app.post("/api/evaluate-profile", async (req, res) => {
    try {
      const profile = req.body.profile || req.body.studentProfile || {};
      const ai = getAiClient();

      if (!ai) {
        const score = profile?.percentage || 75;
        const tier = score >= 85 ? "Super Merit" : score >= 75 ? "High Merit" : "Standard Merit";
        return res.json({
          evaluation: {
            summary: `Evaluated as a ${tier} candidate for Kerala degree and diploma admissions. Your score of ${score}% puts you in an advantageous position for direct institutional allotments and merit fee concessions at Chathamkulam Institutions and affiliated colleges.`,
            recommendedStream: profile?.interest || "Management & Technology",
            keyStrengths: [
              `Competitive score of ${score}% in ${profile?.stream || 'past qualification'}`,
              `Annual budget of ₹${(profile?.budget || 100000).toLocaleString('en-IN')} matches aided and premier private colleges`,
              `Flexible alignment with ${profile?.preferredMode || 'Offline Regular'} learning`,
            ],
            safetyInstitutions: [
              "Chathamkulam Group of Institutions (Palakkad) - Guaranteed Merit Seat",
              "Govt Polytechnic College, Palakkad",
              "Farook College, Kozhikode",
            ],
            reachInstitutions: [
              "Rajagiri College of Social Sciences, Kochi",
              "SCMS Cochin School of Business",
            ],
            scholarshipAdvice: `Eligible for Chathamkulam Institutional Merit Grant (${score >= 80 ? '40%' : '25%'} fee reduction) and Kerala Post-Matric welfare aid.`,
          },
        });
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: `Evaluate this student's academic profile for higher education admissions in Kerala, with specific reference to Chathamkulam Group of Institutions (Palakkad):
Profile:
- Name: ${profile.name}
- Qualification: ${profile.qualification}
- Percentage: ${profile.percentage}%
- Budget: ₹${profile.budget}/year
- Mode: ${profile.preferredMode || profile.mode}
- Field of Interest: ${profile.interest}

Return a JSON object with:
- summary: string (2-3 sentences evaluating competitiveness)
- recommendedStream: string
- keyStrengths: array of strings
- safetyInstitutions: array of strings (must include Chathamkulam Institutions)
- reachInstitutions: array of strings
- scholarshipAdvice: string`,
        config: {
          responseMimeType: "application/json",
        },
      });

      let parsedData;
      try {
        parsedData = JSON.parse(response.text || "{}");
      } catch (e) {
        parsedData = { summary: response.text };
      }

      res.json({ evaluation: parsedData });
    } catch (error: any) {
      res.status(500).json({ error: "Failed to evaluate profile", message: error?.message });
    }
  });

  // Vite middleware in dev, static files in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`MARGEXA Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
