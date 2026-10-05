import { CollegeSubscriptionPlan, CollegeEnquiryLead } from '../types';

export const COLLEGE_PLANS: CollegeSubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    billingPeriod: 'forever',
    badge: 'Standard Listing',
    description: 'For every listed college in Kerala & South India looking for standard visibility.',
    features: [
      'Basic college profile.',
      'Basic course and fee information.',
      'Standard college search listing.',
      'Basic student enquiry form.',
      'College contact information.',
      'Basic admission announcements.',
    ],
  },
  {
    id: 'premium',
    name: 'College Premium',
    price: 3999,
    billingPeriod: '/month',
    badge: 'Recommended starting plan',
    description: 'Everything in Free, plus essential tools to manage leads and run admission campaigns.',
    subFeaturesHeader: 'Everything in Free, plus:',
    features: [
      'Enhanced college profile.',
      'Photo gallery and prospectus.',
      'College analytics dashboard.',
      'Student enquiry management.',
      'Admission campaign manager.',
      'Monthly performance reports.',
      'Course-specific enquiry forms.',
      'Priority enquiry notifications.',
      'Limited featured placements.',
    ],
  },
  {
    id: 'enterprise',
    name: 'College Enterprise',
    price: 7999,
    billingPeriod: '/month',
    badge: 'Maximum Admission Reach',
    description: 'Full-spectrum institutional admission CRM with multi-staff accounts and automated tracking.',
    subFeaturesHeader: 'Everything in College Premium, plus:',
    features: [
      'Advanced analytics.',
      'Multiple admission staff accounts.',
      'Lead assignment and follow-up tracking.',
      'Automated enquiry reminders.',
      'Priority campaign placement.',
      'Online counselling appointment scheduling.',
      'Custom admission landing pages.',
      'Advanced course demand insights.',
      'Quarterly performance review.',
    ],
  },
];

export interface FeatureComparisonCategory {
  category: string;
  items: {
    feature: string;
    free: string | boolean;
    premium: string | boolean;
    enterprise: string | boolean;
    tooltip?: string;
  }[];
}

export const COLLEGE_FEATURE_MATRIX: FeatureComparisonCategory[] = [
  {
    category: 'Listing & Profile Branding',
    items: [
      {
        feature: 'College Profile',
        free: 'Basic Profile',
        premium: 'Enhanced Profile',
        enterprise: 'Custom Rich Profile + Landing Page',
        tooltip: 'Enhanced profiles include 4K campus imagery, virtual tour links, and student review widgets.',
      },
      {
        feature: 'Course & Fee Information',
        free: 'Basic Directory',
        premium: 'Detailed + Syllabus Breakdown',
        enterprise: 'Comprehensive + Scholarship Rules',
      },
      {
        feature: 'Photo Gallery & Prospectus Download',
        free: false,
        premium: true,
        enterprise: true,
        tooltip: 'Allows direct PDF brochure downloads and verified campus infrastructure galleries.',
      },
      {
        feature: 'Placement & Directory Visibility',
        free: 'Standard Search',
        premium: 'Limited Featured Placements',
        enterprise: 'Priority Campaign Placement #1',
        tooltip: 'Enterprise colleges receive top spotlight positions on Matchmaker and Directory searches.',
      },
      {
        feature: 'Custom Admission Landing Pages',
        free: false,
        premium: false,
        enterprise: true,
        tooltip: 'Dedicated co-branded URL optimized for Google & Meta student acquisition campaigns.',
      },
    ],
  },
  {
    category: 'Student Enquiries & Lead Management',
    items: [
      {
        feature: 'Student Enquiry Form',
        free: 'Basic Generic Form',
        premium: 'Course-Specific Enquiry Forms',
        enterprise: 'Smart Dynamic Multi-Step Forms',
      },
      {
        feature: 'Priority Enquiry Notifications',
        free: false,
        premium: 'Instant Email & In-App',
        enterprise: 'Instant WhatsApp, SMS & Email',
        tooltip: 'Instant push notifications to admissions dean as soon as an eligible student applies.',
      },
      {
        feature: 'Student Enquiry Management CRM',
        free: false,
        premium: true,
        enterprise: true,
        tooltip: 'Full tracking portal to update student status, notes, call records, and follow-ups.',
      },
      {
        feature: 'Multiple Admission Staff Accounts',
        free: '1 Admin',
        premium: '2 Team Members',
        enterprise: 'Unlimited Staff Accounts',
        tooltip: 'Enables counselor-specific logins with granular role permissions.',
      },
      {
        feature: 'Lead Assignment & Follow-Up Tracking',
        free: false,
        premium: false,
        enterprise: true,
        tooltip: 'Round-robin or custom auto-distribution of enquiries among admission officers.',
      },
      {
        feature: 'Automated Enquiry Reminders',
        free: false,
        premium: false,
        enterprise: true,
        tooltip: 'Auto follow-up WhatsApp/SMS reminders to students about deadlines and document submission.',
      },
      {
        feature: 'Online Counselling Scheduling',
        free: false,
        premium: false,
        enterprise: true,
        tooltip: 'Integrated video/telephonic booking calendar synced with Google Calendar.',
      },
    ],
  },
  {
    category: 'Analytics & Strategic Insights',
    items: [
      {
        feature: 'Analytics Dashboard',
        free: false,
        premium: 'Standard College Analytics',
        enterprise: 'Advanced Predictive Analytics',
      },
      {
        feature: 'Monthly Performance Reports',
        free: false,
        premium: true,
        enterprise: true,
      },
      {
        feature: 'Advanced Course Demand Insights',
        free: false,
        premium: false,
        enterprise: true,
        tooltip: 'Aggregated analytics revealing top search queries, district-wise interest, and competitors.',
      },
      {
        feature: 'Quarterly Strategic Performance Review',
        free: false,
        premium: false,
        enterprise: true,
        tooltip: 'Dedicated quarterly video consultation with MARGEXA Head of Higher Education Growth.',
      },
    ],
  },
];

export const SAMPLE_COLLEGE_LEADS: CollegeEnquiryLead[] = [
  {
    id: 'LEAD-101',
    studentName: 'Akhil K. Nair',
    phone: '+91 94471 28901',
    email: 'akhil.nair@gmail.com',
    district: 'Palakkad',
    courseInterest: 'MBA in Marketing Management',
    scorePercentage: 84.5,
    budgetAnnual: 140000,
    status: 'New',
    receivedAt: '12 mins ago',
    assignedStaff: 'Smt. Priya R. (Senior Counselor)',
    notes: 'KMAT score 82. Interested in corporate agency placement and hostel amenities.',
  },
  {
    id: 'LEAD-102',
    studentName: 'Ananya S. Pillai',
    phone: '+91 98460 34120',
    email: 'ananya.pillai@outlook.com',
    district: 'Ernakulam',
    courseInterest: 'MBA in Data Analysis & Business Intelligence',
    scorePercentage: 89.2,
    budgetAnnual: 150000,
    status: 'Counseling Scheduled',
    receivedAt: '2 hours ago',
    assignedStaff: 'Dr. Vivek Menon',
    notes: 'Online counseling call scheduled for Tomorrow, 3:30 PM via Google Meet.',
  },
  {
    id: 'LEAD-103',
    studentName: 'Mohammed Fahim',
    phone: '+91 97455 81923',
    email: 'fahim.mhd@yahoo.com',
    district: 'Malappuram',
    courseInterest: 'MBA in Logistics & Supply Chain Management',
    scorePercentage: 78.4,
    budgetAnnual: 145000,
    status: 'Contacted',
    receivedAt: 'Yesterday',
    assignedStaff: 'Smt. Priya R.',
    notes: 'Called and shared prospectus + fee schedule with ₹10,000 MARGEXA deduction applied.',
  },
  {
    id: 'LEAD-104',
    studentName: 'Devika Krishnan',
    phone: '+91 94950 11984',
    email: 'devika.k@gmail.com',
    district: 'Thrissur',
    courseInterest: 'MBA in Financial Management',
    scorePercentage: 92.0,
    budgetAnnual: 135000,
    status: 'Admission Confirmed',
    receivedAt: '3 days ago',
    assignedStaff: 'Dr. Vivek Menon',
    notes: 'Offer letter accepted. Provisional fee token paid. Campus visit scheduled.',
  },
  {
    id: 'LEAD-105',
    studentName: 'Rohit Balachandran',
    phone: '+91 94002 98765',
    email: 'rohit.bala@gmail.com',
    district: 'Kozhikode',
    courseInterest: 'MBA in Human Resources Management',
    scorePercentage: 76.5,
    budgetAnnual: 135000,
    status: 'New',
    receivedAt: 'Just now',
    assignedStaff: 'Unassigned',
    notes: 'Downloaded college brochure via MARGEXA search card.',
  },
];
