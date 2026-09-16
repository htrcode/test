import { College, Program, StudentProfile, MatchResult } from '../types';

export function calculateMatch(student: StudentProfile, college: College, program: Program): MatchResult {
  // 1. Academic Fit (40 points)
  let academicFit = 0;
  const matchReasons: string[] = [];
  const minMarks = program.minPercentage || 45;
  const studentMarks = student.percentage || 60;

  if (studentMarks >= minMarks) {
    academicFit = 25;
    const surplus = studentMarks - minMarks;
    const bonus = Math.min(15, Math.round((surplus / 35) * 15));
    academicFit += bonus;
    if (surplus >= 20) {
      matchReasons.push(`High Academic Merit: Your ${studentMarks}% significantly exceeds the ${minMarks}% cutoff (+${surplus}% margin).`);
    } else {
      matchReasons.push(`Eligible: Your academic score meets the program requirement of ${minMarks}%.`);
    }
  } else {
    academicFit = Math.max(5, Math.round((studentMarks / minMarks) * 20));
    matchReasons.push(`Reach Program: Standard cutoff is ${minMarks}%, review via management/special counseling quota.`);
  }

  // 2. Budget Fit (25 points)
  let budgetFit = 0;
  const studentBudget = student.budget || 100000;
  const courseFee = program.annualFee || 50000;

  if (courseFee <= studentBudget) {
    budgetFit = 25;
    const savings = studentBudget - courseFee;
    if (savings > 25000) {
      matchReasons.push(`Excellent Budget Fit: Course fee (₹${courseFee.toLocaleString('en-IN')}/yr) is well below your ₹${studentBudget.toLocaleString('en-IN')} budget.`);
    } else {
      matchReasons.push(`Within Budget: Annual fee of ₹${courseFee.toLocaleString('en-IN')} fits comfortably.`);
    }
  } else {
    const gap = courseFee - studentBudget;
    const ratio = gap / studentBudget;
    budgetFit = Math.max(8, Math.round(25 - ratio * 15));
    if (college.scholarshipAvailable && studentMarks >= 70) {
      budgetFit = Math.min(25, budgetFit + 8);
      matchReasons.push(`Scholarship Potential: Can reduce annual fee through ${college.shortName} merit grant.`);
    } else {
      matchReasons.push(`Above standard budget by ₹${gap.toLocaleString('en-IN')}/yr (Installment & loan options available).`);
    }
  }

  // 3. Study Mode Fit (20 points)
  let modeFit = 0;
  if (student.preferredMode === program.mode) {
    modeFit = 20;
    matchReasons.push(`Exact Study Mode: Offered in your preferred ${program.mode} format.`);
  } else if (student.preferredMode === 'Hybrid' || program.mode === 'Hybrid') {
    modeFit = 16;
    matchReasons.push(`Flexible Delivery: Blended online and on-campus schedule.`);
  } else {
    modeFit = 10;
    matchReasons.push(`Format Variation: Campus is ${program.mode}, while preference was ${student.preferredMode}.`);
  }

  // 4. Discipline & Location Fit (15 points)
  let interestFit = 0;
  const targetInterest = (student.interest || '').toLowerCase();
  const programDiscipline = (program.discipline || '').toLowerCase();
  const programName = (program.name || '').toLowerCase();

  const isDisciplineMatch =
    targetInterest.includes('all') ||
    targetInterest.includes('general') ||
    programDiscipline.includes(targetInterest) ||
    targetInterest.includes(programDiscipline) ||
    (targetInterest.includes('polytechnic') && program.level === 'Diploma') ||
    (targetInterest.includes('management') && programDiscipline.includes('management')) ||
    (targetInterest.includes('tech') && (programDiscipline.includes('computer') || programDiscipline.includes('engineering')));

  if (isDisciplineMatch) {
    interestFit += 10;
    matchReasons.push(`Domain Alignment: Directly matches your target career in ${program.discipline}.`);
  } else {
    interestFit += 5;
  }

  const isLocationMatch =
    !student.preferredDistrict ||
    student.preferredDistrict === 'All Kerala' ||
    college.location.district.toLowerCase() === student.preferredDistrict.toLowerCase();

  if (isLocationMatch) {
    interestFit += 5;
    matchReasons.push(`Campus in ${college.location.district}, Kerala.`);
  } else {
    interestFit += 2;
  }

  const overallScore = Math.min(100, Math.max(35, academicFit + budgetFit + modeFit + interestFit));

  let category: MatchResult['category'] = 'Competitive Reach';
  let admissionProbability: MatchResult['admissionProbability'] = 'Selective (<75%)';

  if (overallScore >= 88) {
    category = 'Guaranteed Match';
    admissionProbability = 'High (95%+)';
  } else if (overallScore >= 74) {
    category = 'Strong Prospect';
    admissionProbability = 'Moderate (75-90%)';
  }

  let potentialScholarship = 'General Merit Consideration';
  if (college.type === 'Government' || college.type === 'Government Aided') {
    potentialScholarship = 'Kerala Post-Matric / E-Grantz 3.0 Scheme';
  } else if (studentMarks >= 80) {
    potentialScholarship = 'KSHEC Higher Education Merit Fellowship';
  } else if (studentMarks >= 60) {
    potentialScholarship = 'Central Sector / AICTE Pragati Scheme';
  }

  return {
    college,
    program,
    overallScore,
    breakdown: {
      academicFit,
      budgetFit,
      modeFit,
      interestFit,
    },
    category,
    matchReasons: matchReasons.slice(0, 4),
    potentialScholarship,
    admissionProbability,
  };
}

export function rankMatchesForStudent(student: StudentProfile, colleges: College[]): MatchResult[] {
  const matches: MatchResult[] = [];

  for (const college of colleges) {
    for (const program of college.programs) {
      const result = calculateMatch(student, college, program);
      matches.push(result);
    }
  }

  // Sort descending by overall score, with Chathamkulam and top matches prioritized
  return matches.sort((a, b) => {
    if (b.overallScore !== a.overallScore) {
      return b.overallScore - a.overallScore;
    }
    // Boost featured institutions with same score
    if (b.college.chathamkulamFlag && !a.college.chathamkulamFlag) return 1;
    if (a.college.chathamkulamFlag && !b.college.chathamkulamFlag) return -1;
    return b.college.rating - a.college.rating;
  });
}
