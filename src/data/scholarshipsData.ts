import { Scholarship } from '../types';

export const SCHOLARSHIPS_DATA: Scholarship[] = [
  {
    id: 'chathamkulam-merit-grant',
    title: 'Chathamkulam Institutional Merit Excellence Grant',
    provider: 'Chathamkulam Group of Institutions, Palakkad',
    amount: 'Up to 50% Tuition Fee Waiver (₹20,000 - ₹75,000)',
    deadline: 'October 30, 2026',
    eligibilityMarks: 75,
    maxIncomeLimit: 800000,
    description:
      'Chathamkulam Trust awards generous fee concessions to meritorious students enrolling in MBA, B.Com, BBA, BCA, and Polytechnic Engineering Diploma programs at Chathamkulam campus in Palakkad.',
    category: 'Institutional',
    collegesCovered: ['Chathamkulam Group of Institutions'],
    applicationStatus: 'Not Applied',
  },
  {
    id: 'kerala-post-matric',
    title: 'Kerala State Post-Matric Scholarship Scheme',
    provider: 'Department of Minority Welfare & Backward Classes, Govt of Kerala',
    amount: 'Full Maintenance Allowance + Tuition Reimbursement (₹10,000 - ₹35,000/yr)',
    deadline: 'November 15, 2026',
    eligibilityMarks: 50,
    maxIncomeLimit: 250000,
    description:
      'Government of Kerala scholarship for post-matric higher education students pursuing Degree, PG, or Polytechnic Diploma in recognized colleges within Kerala.',
    category: 'Government',
    collegesCovered: ['All Kerala Colleges', 'Chathamkulam Group of Institutions', 'Government Polytechnic College'],
    applicationStatus: 'Not Applied',
  },
  {
    id: 'apj-abdul-kalam-tech',
    title: 'Dr. A.P.J. Abdul Kalam Technical Education Fellowship',
    provider: 'Kerala Higher Education Council',
    amount: '₹40,000 per academic year',
    deadline: 'December 10, 2026',
    eligibilityMarks: 80,
    maxIncomeLimit: 600000,
    description:
      'Dedicated fellowship for students pursuing technical diplomas or undergraduate degrees in Computer Science, Mechanical, or Civil Engineering with demonstrable merit.',
    category: 'Merit-Based',
    collegesCovered: ['Chathamkulam Group of Institutions', 'TKM College of Engineering', 'Rajagiri Institutions'],
    applicationStatus: 'Not Applied',
  },
  {
    id: 'single-girl-child-grant',
    title: 'Kerala Pragati Scholarship for Girl Students',
    provider: 'AICTE & State Technical Cell',
    amount: '₹50,000 per annum + Laptop allowance',
    deadline: 'November 30, 2026',
    eligibilityMarks: 60,
    maxIncomeLimit: 800000,
    description:
      'Financial assistance to empower girl students admitted to technical diploma and degree programs in AICTE-approved institutions across Kerala.',
    category: 'Need-Based',
    collegesCovered: ['Chathamkulam Group of Institutions', 'Rajagiri Institutions', 'SCMS Cochin'],
    applicationStatus: 'Not Applied',
  },
  {
    id: 'e-grantz-fee-concession',
    title: 'Kerala E-Grantz 3.0 Portal Educational Concession',
    provider: 'Scheduled Castes & Backward Classes Development Dept',
    amount: '100% Tuition Fee Waiver & Monthly Pocket Money',
    deadline: 'Open Throughout Academic Year',
    eligibilityMarks: 40,
    maxIncomeLimit: 300000,
    description:
      'Direct Benefit Transfer (DBT) portal covering complete college and exam fees for eligible community students in both government-aided and private self-financing colleges.',
    category: 'Government',
    collegesCovered: ['All Affiliated Kerala Colleges', 'Chathamkulam Group of Institutions', 'Farook College'],
    applicationStatus: 'Not Applied',
  },
];
