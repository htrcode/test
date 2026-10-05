import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  StudentProfile,
  Application,
  Scholarship,
  PriorityCounselingBooking,
  CampusVisitBooking,
  AdmissionPlusBooking,
  College,
  Program
} from '../types';
import { SCHOLARSHIPS_DATA } from '../data/scholarshipsData';

interface AuthContextType {
  student: StudentProfile;
  isLoggedIn: boolean;
  applications: Application[];
  scholarships: Scholarship[];
  counselingBookings: PriorityCounselingBooking[];
  campusVisitBookings: CampusVisitBooking[];
  admissionPlusBookings: AdmissionPlusBooking[];
  login: (email: string, pass: string) => boolean;
  signUp: (email: string, pass: string, name: string) => boolean;
  logout: () => void;
  updateProfile: (updated: Partial<StudentProfile>) => void;
  applyToProgram: (college: College, program: Program) => { success: boolean; message: string };
  withdrawApplication: (appId: string) => void;
  applyForScholarship: (scholarshipId: string) => void;
  bookPriorityCounseling: (booking: Omit<PriorityCounselingBooking, 'id' | 'bookedAt' | 'status'>) => void;
  bookCampusVisit: (booking: Omit<CampusVisitBooking, 'id' | 'bookedAt' | 'status' | 'guideAssigned' | 'guideContact'>) => CampusVisitBooking;
  bookAdmissionPlus: (booking: Omit<AdmissionPlusBooking, 'id' | 'bookedAt' | 'status' | 'assignedAdvisor' | 'roadmapSent' | 'remainingCalls' | 'totalCalls' | 'callDurationMinutes' | 'totalMinutes' | 'amount'>) => AdmissionPlusBooking;
  selectedApplicationForLetter: Application | null;
  setSelectedApplicationForLetter: (app: Application | null) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;
}

const DEFAULT_PROFILE: StudentProfile = {
  id: 'std_rahul_101',
  name: 'Rahul K. Menon',
  email: 'rahul.menon@gmail.com',
  phone: '+91 98471 89210',
  qualification: '12th / Higher Secondary (Plus Two)',
  stream: 'Commerce with Computer Applications',
  percentage: 84,
  yearOfPassing: 2026,
  budget: 120000,
  preferredMode: 'Offline',
  interest: 'Management & Business',
  preferredDistrict: 'Palakkad',
  entranceExam: 'KMAT / Board Merit',
  counselorRequested: true,
  isRegistered: true,
};

const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'app_ck_2026_01',
    studentId: 'std_rahul_101',
    studentName: 'Rahul K. Menon',
    studentEmail: 'rahul.menon@gmail.com',
    collegeId: 'chathamkulam-institutions',
    collegeName: 'Chathamkulam Group of Institutions',
    collegeLogo: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=200&q=80',
    programId: 'cbs-mba-logistics',
    programName: 'MBA in Logistics & Supply Chain Management',
    programLevel: 'Postgraduate',
    appliedDate: '12 Sep 2026',
    standardFee: 145000,
    margexaDeduction: 10000,
    effectiveFee: 135000,
    status: 'Offer Letter Issued',
    timeline: [
      { stage: 'Application Submitted via MARGEXA', timestamp: '12 Sep 2026, 10:30 AM', done: true },
      { stage: 'Academic Eligibility Verified', timestamp: '13 Sep 2026, 02:15 PM', done: true, notes: 'Degree score verified against Calicut University MBA criteria' },
      { stage: 'Counseling & Document Scrutiny', timestamp: '13 Sep 2026, 04:45 PM', done: true, notes: 'Priority interview waived due to merit standing' },
      { stage: 'Provisional Admission Offer Letter Issued', timestamp: '14 Sep 2026, 09:10 AM', done: true, current: true, notes: 'Chathamkulam Institutional Grant of ₹25,000 allocated' },
      { stage: 'Fee Payment & Final Enrolment', timestamp: 'Pending Verification', done: false, notes: 'Seat held until 28 Sep 2026' },
    ],
    counselorAssigned: 'Prof. K. Sreedharan (Senior Academic Consultant)',
    counselorContact: '+91 94470 12389 / counseling@margexa.edu',
    applicationFeeStatus: 'Free via MARGEXA',
    provisionalOfferDate: '14 Sep 2026',
    documents: [
      { name: 'Undergraduate Degree Certificate / Marksheet', status: 'Verified' },
      { name: 'KMAT / CMAT Entrance Score Card', status: 'Verified' },
      { name: 'Transfer & Conduct Certificate', status: 'Pending Review' },
    ],
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [student, setStudent] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem('margexa_student_profile');
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('margexa_is_logged_in');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const [applications, setApplications] = useState<Application[]>(() => {
    try {
      const saved = localStorage.getItem('margexa_applications');
      return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
    } catch {
      return INITIAL_APPLICATIONS;
    }
  });

  const [scholarships, setScholarships] = useState<Scholarship[]>(() => {
    try {
      const saved = localStorage.getItem('margexa_scholarships');
      return saved ? JSON.parse(saved) : SCHOLARSHIPS_DATA;
    } catch {
      return SCHOLARSHIPS_DATA;
    }
  });

  const [counselingBookings, setCounselingBookings] = useState<PriorityCounselingBooking[]>(() => {
    try {
      const saved = localStorage.getItem('margexa_counseling_bookings');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [campusVisitBookings, setCampusVisitBookings] = useState<CampusVisitBooking[]>(() => {
    try {
      const saved = localStorage.getItem('margexa_campus_visits');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback to initial
    }
    return [
      {
        id: 'MGX-VISIT-7729',
        studentName: 'Rahul K. Menon',
        studentEmail: 'rahul.menon@gmail.com',
        phone: '+91 98471 89210',
        collegeName: 'Chathamkulam Group of Institutions, Palakkad',
        packageTier: 'MARGEXA VIP Family Experience (₹1,999)',
        amount: 1999,
        visitDate: '28 Sep 2026',
        timeSlot: 'Morning (09:30 AM - 01:00 PM)',
        attendeesCount: 3,
        foodPreference: 'Vegetarian',
        notes: 'Campus walkthrough with Dean meeting for MBA Logistics & BBA honors seat quota.',
        status: 'Guide Assigned',
        bookedAt: '14 Sep 2026, 11:20 AM',
        guideAssigned: 'Prof. K. Sreedharan (Senior Academic Escort)',
        guideContact: '+91 94470 12389',
      },
    ];
  });

  const [selectedApplicationForLetter, setSelectedApplicationForLetter] = useState<Application | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('margexa_campus_visits', JSON.stringify(campusVisitBookings));
    } catch (e) {
      console.error(e);
    }
  }, [campusVisitBookings]);

  const [admissionPlusBookings, setAdmissionPlusBookings] = useState<AdmissionPlusBooking[]>(() => {
    try {
      const saved = localStorage.getItem('margexa_admission_plus');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: 'ADM-PLUS-2819',
        studentName: 'Rahul K. Menon',
        studentEmail: 'rahul.menon@gmail.com',
        phone: '+91 98471 89210',
        whatsappNumber: '+91 98471 89210',
        targetCourse: 'MBA (Marketing / Logistics / Data Analysis) - Chathamkulam Business School',
        preferredTiming: 'Evening (05:00 PM - 07:00 PM)',
        totalCalls: 5,
        remainingCalls: 5,
        callDurationMinutes: 20,
        totalMinutes: 100,
        amount: 499,
        status: 'Active',
        bookedAt: 'Today',
        assignedAdvisor: 'Dr. Ananya Varma (Senior Admission Strategist)',
        roadmapSent: true,
        notes: 'Needs guidance on KMAT/Board merit seat quotas and fee structure breakdown',
      },
    ];
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('margexa_admission_plus', JSON.stringify(admissionPlusBookings));
    } catch (e) {
      console.error(e);
    }
  }, [admissionPlusBookings]);


  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('margexa_student_profile', JSON.stringify(student));
    } catch (e) {
      console.error(e);
    }
  }, [student]);

  useEffect(() => {
    try {
      localStorage.setItem('margexa_is_logged_in', JSON.stringify(isLoggedIn));
    } catch (e) {
      console.error(e);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    try {
      localStorage.setItem('margexa_applications', JSON.stringify(applications));
    } catch (e) {
      console.error(e);
    }
  }, [applications]);

  useEffect(() => {
    try {
      localStorage.setItem('margexa_scholarships', JSON.stringify(scholarships));
    } catch (e) {
      console.error(e);
    }
  }, [scholarships]);

  useEffect(() => {
    try {
      localStorage.setItem('margexa_counseling_bookings', JSON.stringify(counselingBookings));
    } catch (e) {
      console.error(e);
    }
  }, [counselingBookings]);

  const login = (email: string, _pass: string) => {
    setIsLoggedIn(true);
    setStudent((prev) => ({
      ...prev,
      email: email || prev.email,
      isRegistered: true,
    }));
    return true;
  };

  const signUp = (email: string, _pass: string, name: string) => {
    setIsLoggedIn(true);
    setStudent({
      id: 'std_' + Date.now(),
      name: name || 'Student',
      email: email,
      phone: '+91 98460 00000',
      qualification: '12th / Higher Secondary (Plus Two)',
      stream: 'General Stream',
      percentage: 75,
      yearOfPassing: 2026,
      budget: 80000,
      preferredMode: 'Offline',
      interest: 'Management & Business',
      preferredDistrict: 'Palakkad',
      entranceExam: 'None',
      counselorRequested: false,
      isRegistered: true,
    });
    return true;
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const updateProfile = (updated: Partial<StudentProfile>) => {
    setStudent((prev) => ({
      ...prev,
      ...updated,
    }));
  };

  const applyToProgram = (college: College, program: Program) => {
    // Check if already applied
    const existing = applications.find(
      (a) => a.collegeId === college.id && a.programId === program.id
    );

    if (existing) {
      return {
        success: false,
        message: `You have already applied for ${program.name} at ${college.shortName}. Tracking ID: ${existing.id}`,
      };
    }

    const todayStr = new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date());

    const newApp: Application = {
      id: `APP-MGX-${Math.floor(100000 + Math.random() * 900000)}`,
      studentId: student.id,
      studentName: student.name,
      studentEmail: student.email,
      collegeId: college.id,
      collegeName: college.name,
      collegeLogo: college.logo,
      programId: program.id,
      programName: program.name,
      programLevel: program.level,
      appliedDate: todayStr,
      standardFee: program.annualFee,
      margexaDeduction: 10000,
      effectiveFee: Math.max(0, program.annualFee - 10000),
      status: 'Submitted',
      timeline: [
        {
          stage: 'Application Transmitted to College Admission Desk',
          timestamp: `${todayStr}, Just now`,
          done: true,
          current: true,
          notes: `Verified credentials submitted to ${college.shortName} admission portal`,
        },
        {
          stage: 'Eligibility Scrutiny & Document Verification',
          timestamp: 'Scheduled within 24-48 hours',
          done: false,
          notes: 'Admission officer checking percentage & qualification',
        },
        {
          stage: 'Counseling & Seat Allocation',
          timestamp: 'Pending verification',
          done: false,
        },
        {
          stage: 'Provisional Offer Letter Issued',
          timestamp: 'Pending interview',
          done: false,
        },
        {
          stage: 'Admission Confirmed',
          timestamp: 'Pending fee deposit',
          done: false,
        },
      ],
      counselorAssigned: college.chathamkulamFlag
        ? 'Prof. K. Sreedharan (Chathamkulam Chief Advisor)'
        : 'Senior Academic Counselor (Kerala Admissions)',
      counselorContact: '+91 94470 12389 / admissions@margexa.edu',
      applicationFeeStatus: 'Free via MARGEXA',
      documents: [
        { name: `${student.qualification} Certificate / Marksheet`, status: 'Uploaded' },
        { name: 'Transfer Certificate (TC)', status: 'Pending Review' },
        { name: 'Identity Proof (Aadhaar / Passport)', status: 'Verified' },
      ],
    };

    setApplications((prev) => [newApp, ...prev]);
    return {
      success: true,
      message: `Congratulations ${student.name}! Your free application for ${program.name} at ${college.shortName} has been submitted successfully. Tracking ID: ${newApp.id}`,
    };
  };

  const withdrawApplication = (appId: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== appId));
  };

  const applyForScholarship = (scholarshipId: string) => {
    setScholarships((prev) =>
      prev.map((s) =>
        s.id === scholarshipId ? { ...s, applicationStatus: 'Submitted' } : s
      )
    );
  };

  const bookPriorityCounseling = (
    bookingData: Omit<PriorityCounselingBooking, 'id' | 'bookedAt' | 'status'>
  ) => {
    const newBooking: PriorityCounselingBooking = {
      id: `CNS-${Date.now().toString().slice(-6)}`,
      ...bookingData,
      status: 'Scheduled',
      bookedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
    };
    setCounselingBookings((prev) => [newBooking, ...prev]);
  };

  const bookCampusVisit = (
    bookingData: Omit<CampusVisitBooking, 'id' | 'bookedAt' | 'status' | 'guideAssigned' | 'guideContact'>
  ): CampusVisitBooking => {
    const newVisit: CampusVisitBooking = {
      id: `MGX-VISIT-${Math.floor(1000 + Math.random() * 9000)}`,
      ...bookingData,
      status: 'Guide Assigned',
      bookedAt: new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date()),
      guideAssigned: 'Prof. K. Sreedharan (Senior Academic Escort)',
      guideContact: '+91 94470 12389',
    };
    setCampusVisitBookings((prev) => [newVisit, ...prev]);
    return newVisit;
  };

  const bookAdmissionPlus = (
    bookingData: Omit<AdmissionPlusBooking, 'id' | 'bookedAt' | 'status' | 'assignedAdvisor' | 'roadmapSent' | 'remainingCalls' | 'totalCalls' | 'callDurationMinutes' | 'totalMinutes' | 'amount'>
  ): AdmissionPlusBooking => {
    const newSubscription: AdmissionPlusBooking = {
      id: `ADM-PLUS-${Math.floor(1000 + Math.random() * 9000)}`,
      ...bookingData,
      totalCalls: 5,
      remainingCalls: 5,
      callDurationMinutes: 20,
      totalMinutes: 100,
      amount: 499,
      status: 'Active',
      bookedAt: new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date()),
      assignedAdvisor: 'Dr. Ananya Varma (Senior Admission Strategist)',
      roadmapSent: true,
    };
    setAdmissionPlusBookings((prev) => [newSubscription, ...prev]);
    return newSubscription;
  };

  return (
    <AuthContext.Provider
      value={{
        student,
        isLoggedIn,
        applications,
        scholarships,
        counselingBookings,
        campusVisitBookings,
        admissionPlusBookings,
        login,
        signUp,
        logout,
        updateProfile,
        applyToProgram,
        withdrawApplication,
        applyForScholarship,
        bookPriorityCounseling,
        bookCampusVisit,
        bookAdmissionPlus,
        selectedApplicationForLetter,
        setSelectedApplicationForLetter,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isProfileModalOpen,
        setIsProfileModalOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );

};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
