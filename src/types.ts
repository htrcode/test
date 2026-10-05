export type QualificationType =
  | '10th Standard'
  | '12th / Higher Secondary (Plus Two)'
  | 'Polytechnic Diploma'
  | 'Undergraduate Degree (UG)'
  | 'Postgraduate Degree (PG)';

export type StudyMode = 'Offline' | 'Distance' | 'Hybrid';

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  qualification: QualificationType;
  stream: string;
  percentage: number;
  yearOfPassing: number;
  budget: number; // Annual budget in INR
  preferredMode: StudyMode;
  interest: string;
  preferredDistrict: string;
  entranceExam: string;
  counselorRequested: boolean;
  avatar?: string;
  isRegistered: boolean;
  isVipMember?: boolean;
  vipPlanExpiry?: string;
}

export const MARGEXA_FEE_DEDUCTION = 10000;

export const getEffectiveFee = (standardAnnualFee: number): number => {
  return Math.max(0, standardAnnualFee - MARGEXA_FEE_DEDUCTION);
};

export interface Program {
  id: string;
  name: string;
  level: 'Diploma' | 'Undergraduate' | 'Postgraduate';
  discipline: string;
  duration: string;
  mode: StudyMode;
  annualFee: number;
  totalFee?: number;
  feeNote?: string;
  eligibility: string;
  minPercentage: number;
  seats: number;
  highlights: string[];
  careerProspects: string[];
}

export interface College {
  id: string;
  name: string;
  shortName: string;
  officialWebsite: string;
  established: number;
  location: {
    city: string;
    district: string;
    state: string;
  };
  type: 'Private Autonomous' | 'Government Aided' | 'Government' | 'Deemed University' | 'Self-Financing';
  accreditation: string;
  rating: number;
  reviewsCount: number;
  heroImage: string;
  logo: string;
  tagline: string;
  description: string;
  features: string[];
  programs: Program[];
  distanceEducationAvailable: boolean;
  scholarshipAvailable: boolean;
  chathamkulamFlag?: boolean;
  galleryImages?: string[];
  activePlan?: 'enterprise' | 'premium' | 'free';
  featuredPromotion?: {
    planTier: 'enterprise' | 'premium';
    planPrice?: string;
    badge: string;
    tagline: string;
    highlights: string[];
    priorityRank: number;
    specialPerks: string[];
  };
}

export interface CollegeRegistrationApplication {
  id: string;
  collegeName: string;
  shortName: string;
  type: 'Private Autonomous' | 'Government Aided' | 'Deemed University' | 'Self-Financing';
  universityAffiliation: string;
  accreditation: string;
  establishedYear: number;
  city: string;
  district: string;
  state: string;
  officialWebsite: string;
  representativeName: string;
  designation: string;
  email: string;
  phone: string;
  offeredLevels: ('Diploma' | 'Undergraduate' | 'Postgraduate' | 'Distance Education')[];
  estimatedIntake: number;
  meritScholarshipOffered: boolean;
  desiredPlan?: 'Free (₹0)' | 'College Premium (₹3,999/mo)' | 'College Enterprise (₹7,999/mo)';
  notes: string;
  status: 'Pending Review' | 'Inspection Scheduled' | 'Approved & Listed';
  submittedAt: string;
}

export interface CareerCenterPartner {
  id: string;
  centerName: string;
  directorName: string;
  email: string;
  phone: string;
  district: string;
  city: string;
  annualStudentVolume: '20-50 students' | '50-100 students' | '100-300 students' | '300+ students';
  partnershipTier:
    | 'Silver Counselor (₹9,999/mo • ₹5,000 commission)'
    | 'Silver Counselor (₹5,000 commission)'
    | 'Gold Certified (₹19,999/mo)'
    | 'Platinum Master Franchise (₹49,999/mo)'
    | 'Gold Certified (₹10,000/mo)'
    | 'Platinum Master Franchise (₹15,000/mo)'
    | 'Silver Counselor (Free)'
    | 'Gold Certified Center (₹19,999/yr)'
    | 'Platinum Master Franchise (₹49,999/yr)';
  servicesOffered: string[];
  partnerCode: string;
  status: 'Active Partner' | 'Under Review';
  registeredAt: string;
}

export interface MatchScoreBreakdown {
  academicFit: number; // out of 40
  budgetFit: number;   // out of 25
  modeFit: number;     // out of 20
  interestFit: number; // out of 15
}

export interface MatchResult {
  college: College;
  program: Program;
  overallScore: number; // 0 - 100
  breakdown: MatchScoreBreakdown;
  category: 'Guaranteed Match' | 'Strong Prospect' | 'Competitive Reach';
  matchReasons: string[];
  potentialScholarship: string;
  admissionProbability: 'High (95%+)' | 'Moderate (75-90%)' | 'Selective (<75%)';
}

export interface ApplicationTimelineItem {
  stage: string;
  timestamp: string;
  done: boolean;
  current?: boolean;
  notes?: string;
}

export interface Application {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  collegeId: string;
  collegeName: string;
  collegeLogo?: string;
  programId: string;
  programName: string;
  programLevel: string;
  appliedDate: string;
  standardFee?: number;
  margexaDeduction?: number;
  effectiveFee?: number;
  status:
    | 'Submitted'
    | 'Document Verification'
    | 'Counseling Scheduled'
    | 'Offer Letter Issued'
    | 'Admission Confirmed';
  timeline: ApplicationTimelineItem[];
  counselorAssigned: string;
  counselorContact: string;
  applicationFeeStatus: 'Free via MARGEXA' | 'Fee Waived';
  provisionalOfferDate?: string;
  documents: {
    name: string;
    status: 'Verified' | 'Pending Review' | 'Uploaded';
  }[];
}

export interface Scholarship {
  id: string;
  title: string;
  provider: string;
  amount: string;
  deadline: string;
  eligibilityMarks: number;
  maxIncomeLimit: number; // in INR / annum
  description: string;
  category: 'Merit-Based' | 'Government' | 'Institutional' | 'Need-Based';
  collegesCovered: string[];
  applicationStatus?: 'Not Applied' | 'Draft' | 'Submitted' | 'Approved';
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  affiliation: string;
  experience: string;
  avatar: string;
  expertise: string[];
  rating: number;
  sessionsCount: number;
  availableSlots: string[];
  bio: string;
}

export interface CampusVisitBooking {
  id: string;
  studentName: string;
  studentEmail: string;
  phone: string;
  collegeName: string;
  packageTier:
    | 'MARGEXA Admission Plus (₹499)'
    | 'MARGEXA Student Visit (₹999)'
    | 'MARGEXA Travel Plus (₹1,499)'
    | 'MARGEXA VIP Family Experience (₹1,999)'
    | 'Standard Visit Pass (₹999)'
    | 'VIP Family Comprehensive (₹1,999)';
  amount: number;
  visitDate: string;
  timeSlot: string;
  attendeesCount: number;
  foodPreference: 'Vegetarian' | 'Non-Vegetarian' | 'Any';
  notes?: string;
  status: 'Confirmed' | 'Guide Assigned' | 'Completed';
  bookedAt: string;
  guideAssigned?: string;
  guideContact?: string;
}

export interface AdmissionPlusBooking {
  id: string;
  studentName: string;
  studentEmail: string;
  phone: string;
  whatsappNumber: string;
  targetCourse: string;
  preferredTiming: string;
  totalCalls: number;
  remainingCalls: number;
  callDurationMinutes: number;
  totalMinutes: number;
  amount: number;
  status: 'Active' | 'In Progress' | 'Completed';
  bookedAt: string;
  assignedAdvisor: string;
  roadmapSent: boolean;
  notes?: string;
}


export interface PriorityCounselingBooking {
  id: string;
  studentName: string;
  studentEmail: string;
  phone: string;
  preferredMode: 'Phone Call' | 'Video Meet' | 'In-Person (Palakkad/Kochi)';
  priority: 'Standard VIP (Within 2 hrs)' | 'Immediate Express (Within 20 mins)';
  targetCollege: string;
  notes: string;
  status: 'Scheduled' | 'In Progress' | 'Completed';
  bookedAt: string;
}

export type CollegePlanTier = 'free' | 'premium' | 'enterprise';

export interface CollegeSubscriptionPlan {
  id: CollegePlanTier;
  name: string;
  price: number;
  billingPeriod: string;
  badge?: string;
  description: string;
  features: string[];
  subFeaturesHeader?: string;
}

export interface CollegeSubscriptionBooking {
  id: string;
  collegeId: string;
  collegeName: string;
  contactPerson: string;
  designation: string;
  email: string;
  phone: string;
  plan: CollegePlanTier;
  billingCycle: 'monthly' | 'annual';
  amount: number;
  status: 'Active' | 'Pending Verification' | 'Trial Active';
  subscribedAt: string;
  validUntil: string;
  leadQuota?: string;
  assignedManager?: string;
}

export interface CollegeEnquiryLead {
  id: string;
  studentName: string;
  phone: string;
  email: string;
  district: string;
  courseInterest: string;
  scorePercentage: number;
  budgetAnnual: number;
  status: 'New' | 'Contacted' | 'Counseling Scheduled' | 'Admission Confirmed' | 'Archived';
  receivedAt: string;
  assignedStaff?: string;
  notes?: string;
}

