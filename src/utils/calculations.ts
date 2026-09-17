export interface CalculationResult<T> {
  isValid: boolean;
  error?: string;
  data?: T;
}

export interface PercentageOutput {
  percentage: number;
  formattedPercentage: string;
}

export function calculatePercentage(obtained: number, total: number): CalculationResult<PercentageOutput> {
  if (isNaN(obtained) || isNaN(total)) {
    return { isValid: false, error: 'Please enter valid numeric values.' };
  }
  if (total <= 0) {
    return { isValid: false, error: 'Total marks must be greater than zero.' };
  }
  if (obtained < 0) {
    return { isValid: false, error: 'Obtained marks cannot be negative.' };
  }
  if (obtained > total) {
    return { isValid: false, error: 'Obtained marks cannot be greater than total marks.' };
  }

  const pct = (obtained / total) * 100;
  return {
    isValid: true,
    data: {
      percentage: pct,
      formattedPercentage: `${pct.toFixed(2)}%`,
    },
  };
}

export interface CGPAOutput {
  cgpa: number;
  multiplier: number;
  percentage: number;
  formattedPercentage: string;
}

export function calculateCGPA(cgpa: number, multiplier: number = 9.5): CalculationResult<CGPAOutput> {
  if (isNaN(cgpa) || isNaN(multiplier)) {
    return { isValid: false, error: 'Please enter valid numerical values.' };
  }
  if (cgpa < 0 || cgpa > 10) {
    return { isValid: false, error: 'CGPA should typically be between 0.0 and 10.0.' };
  }
  if (multiplier <= 0) {
    return { isValid: false, error: 'Conversion multiplier must be greater than zero.' };
  }

  const pct = cgpa * multiplier;
  return {
    isValid: true,
    data: {
      cgpa,
      multiplier,
      percentage: pct,
      formattedPercentage: `${pct.toFixed(2)}%`,
    },
  };
}

export interface AttendanceOutput {
  attended: number;
  total: number;
  currentPercentage: number;
  formattedCurrentPercentage: string;
  targetPercentage: number;
  status: 'above' | 'exact' | 'below';
  classesCanMiss: number;
  classesRequired: number;
  message: string;
}

export function calculateAttendance(
  attended: number,
  total: number,
  targetPercentage: number
): CalculationResult<AttendanceOutput> {
  if (isNaN(attended) || isNaN(total) || isNaN(targetPercentage)) {
    return { isValid: false, error: 'Please enter valid numerical values.' };
  }
  if (total <= 0) {
    return { isValid: false, error: 'Total classes must be greater than zero.' };
  }
  if (attended < 0) {
    return { isValid: false, error: 'Classes attended cannot be negative.' };
  }
  if (attended > total) {
    return { isValid: false, error: 'Classes attended cannot exceed total classes held.' };
  }
  if (targetPercentage <= 0 || targetPercentage > 100) {
    return { isValid: false, error: 'Target attendance percentage must be between 1% and 100%.' };
  }

  const currentPct = (attended / total) * 100;
  const targetFraction = targetPercentage / 100;

  let classesCanMiss = 0;
  let classesRequired = 0;
  let status: 'above' | 'exact' | 'below' = 'exact';
  let message = '';

  if (Math.abs(currentPct - targetPercentage) < 0.01) {
    status = 'exact';
    message = `Your attendance is exactly at your target of ${targetPercentage}%.`;
  } else if (currentPct > targetPercentage) {
    status = 'above';
    // Max total classes T_new where (attended / T_new) >= targetFraction
    // T_new = attended / targetFraction
    const maxTotal = Math.floor(attended / targetFraction);
    classesCanMiss = Math.max(0, maxTotal - total);
    message = `You can safely miss the next ${classesCanMiss} class${classesCanMiss === 1 ? '' : 'es'} while keeping your attendance above ${targetPercentage}%.`;
  } else {
    status = 'below';
    // (attended + X) / (total + X) >= targetFraction
    // attended + X >= targetFraction * total + targetFraction * X
    // X * (1 - targetFraction) >= targetFraction * total - attended
    // X = ceil((targetFraction * total - attended) / (1 - targetFraction))
    if (targetFraction >= 1) {
      return { isValid: false, error: 'Target attendance of 100% is impossible to reach if any class has already been missed.' };
    }
    const numNeeded = Math.ceil((targetFraction * total - attended) / (1 - targetFraction));
    classesRequired = Math.max(0, numNeeded);
    message = `You need to attend the next ${classesRequired} consecutive class${classesRequired === 1 ? '' : 'es'} to reach your target of ${targetPercentage}%.`;
  }

  return {
    isValid: true,
    data: {
      attended,
      total,
      currentPercentage: currentPct,
      formattedCurrentPercentage: `${currentPct.toFixed(2)}%`,
      targetPercentage,
      status,
      classesCanMiss,
      classesRequired,
      message,
    },
  };
}

export interface GPAOutput {
  totalCredits: number;
  totalGradePoints: number;
  gpa: number;
  formattedGPA: string;
}

export function calculateGPA(
  subjects: { credits: number; gradePoint: number }[]
): CalculationResult<GPAOutput> {
  if (!subjects || subjects.length === 0) {
    return { isValid: false, error: 'Please add at least one subject.' };
  }

  let totalCredits = 0;
  let weightedPoints = 0;

  for (let i = 0; i < subjects.length; i++) {
    const s = subjects[i];
    if (isNaN(s.credits) || s.credits <= 0) {
      return { isValid: false, error: `Subject #${i + 1} has invalid credit hours. Must be greater than 0.` };
    }
    if (isNaN(s.gradePoint) || s.gradePoint < 0 || s.gradePoint > 10) {
      return { isValid: false, error: `Subject #${i + 1} grade point must be between 0 and 10.` };
    }
    totalCredits += s.credits;
    weightedPoints += s.credits * s.gradePoint;
  }

  if (totalCredits === 0) {
    return { isValid: false, error: 'Total credit hours cannot be zero.' };
  }

  const gpa = weightedPoints / totalCredits;
  return {
    isValid: true,
    data: {
      totalCredits,
      totalGradePoints: weightedPoints,
      gpa,
      formattedGPA: gpa.toFixed(2),
    },
  };
}

export interface AgeOutput {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  nextBirthdayDays: number;
  nextBirthdayMonths: number;
}

export function calculateAge(dobStr: string, asOfStr: string): CalculationResult<AgeOutput> {
  if (!dobStr || !asOfStr) {
    return { isValid: false, error: 'Please select both Date of Birth and Target Date.' };
  }

  const dobParts = dobStr.split('-').map(Number);
  const asOfParts = asOfStr.split('-').map(Number);

  if (dobParts.length !== 3 || asOfParts.length !== 3) {
    return { isValid: false, error: 'Invalid date format.' };
  }

  const dob = new Date(dobParts[0], dobParts[1] - 1, dobParts[2]);
  const asOf = new Date(asOfParts[0], asOfParts[1] - 1, asOfParts[2]);

  if (isNaN(dob.getTime()) || isNaN(asOf.getTime())) {
    return { isValid: false, error: 'Invalid date selection.' };
  }

  if (dob > asOf) {
    return { isValid: false, error: 'Date of birth cannot be in the future relative to the target date.' };
  }

  let years = asOf.getFullYear() - dob.getFullYear();
  let months = asOf.getMonth() - dob.getMonth();
  let days = asOf.getDate() - dob.getDate();

  if (days < 0) {
    months -= 1;
    // Get total days in previous month of target date
    const prevMonthLastDay = new Date(asOf.getFullYear(), asOf.getMonth(), 0).getDate();
    days += prevMonthLastDay;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const diffTime = Math.abs(asOf.getTime() - dob.getTime());
  const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // Next birthday calculation relative to asOf date
  let nextBirthday = new Date(asOf.getFullYear(), dob.getMonth(), dob.getDate());
  if (nextBirthday < asOf) {
    nextBirthday.setFullYear(asOf.getFullYear() + 1);
  }

  const nextBdayTimeDiff = nextBirthday.getTime() - asOf.getTime();
  const nextBirthdayDays = Math.ceil(nextBdayTimeDiff / (1000 * 60 * 60 * 24));
  const nextBirthdayMonths = Math.floor(nextBirthdayDays / 30.4375);

  return {
    isValid: true,
    data: {
      years,
      months,
      days,
      totalDays,
      nextBirthdayDays,
      nextBirthdayMonths,
    },
  };
}

export interface EMIOutput {
  monthlyEMI: number;
  totalPayment: number;
  totalInterest: number;
  formattedEMI: string;
  formattedTotalPayment: string;
  formattedTotalInterest: string;
}

export function calculateEMI(
  principal: number,
  annualRate: number,
  tenure: number,
  tenureType: 'years' | 'months'
): CalculationResult<EMIOutput> {
  if (isNaN(principal) || isNaN(annualRate) || isNaN(tenure)) {
    return { isValid: false, error: 'Please enter valid numerical inputs.' };
  }
  if (principal <= 0) {
    return { isValid: false, error: 'Loan principal amount must be greater than zero.' };
  }
  if (annualRate < 0) {
    return { isValid: false, error: 'Interest rate cannot be negative.' };
  }
  if (tenure <= 0) {
    return { isValid: false, error: 'Tenure must be greater than zero.' };
  }

  const months = tenureType === 'years' ? tenure * 12 : tenure;
  if (months > 480) {
    return { isValid: false, error: 'Maximum supported tenure is 40 years (480 months).' };
  }

  const monthlyRate = annualRate / 12 / 100;
  let emi = 0;

  if (monthlyRate === 0) {
    emi = principal / months;
  } else {
    // EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
    const factor = Math.pow(1 + monthlyRate, months);
    emi = (principal * monthlyRate * factor) / (factor - 1);
  }

  const totalPayment = emi * months;
  const totalInterest = totalPayment - principal;

  return {
    isValid: true,
    data: {
      monthlyEMI: emi,
      totalPayment,
      totalInterest,
      formattedEMI: `$${emi.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      formattedTotalPayment: `$${totalPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      formattedTotalInterest: `$${totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    },
  };
}

export interface DiscountOutput {
  originalPrice: number;
  discountPct: number;
  discountAmount: number;
  finalPrice: number;
  formattedDiscountAmount: string;
  formattedFinalPrice: string;
}

export function calculateDiscount(originalPrice: number, discountPct: number): CalculationResult<DiscountOutput> {
  if (isNaN(originalPrice) || isNaN(discountPct)) {
    return { isValid: false, error: 'Please enter valid numerical amounts.' };
  }
  if (originalPrice < 0) {
    return { isValid: false, error: 'Original price cannot be negative.' };
  }
  if (discountPct < 0 || discountPct > 100) {
    return { isValid: false, error: 'Discount percentage must be between 0% and 100%.' };
  }

  const discountAmount = (originalPrice * discountPct) / 100;
  const finalPrice = originalPrice - discountAmount;

  return {
    isValid: true,
    data: {
      originalPrice,
      discountPct,
      discountAmount,
      finalPrice,
      formattedDiscountAmount: `$${discountAmount.toFixed(2)}`,
      formattedFinalPrice: `$${finalPrice.toFixed(2)}`,
    },
  };
}

export interface BMIOutput {
  bmi: number;
  formattedBMI: string;
  category: string;
  categoryColor: string;
}

export function calculateBMI(
  heightValue: number,
  weightValue: number,
  heightUnit: 'cm' | 'm',
  weightUnit: 'kg' | 'lbs'
): CalculationResult<BMIOutput> {
  if (isNaN(heightValue) || isNaN(weightValue)) {
    return { isValid: false, error: 'Please enter valid numeric height and weight.' };
  }
  if (heightValue <= 0) {
    return { isValid: false, error: 'Height must be greater than zero.' };
  }
  if (weightValue <= 0) {
    return { isValid: false, error: 'Weight must be greater than zero.' };
  }

  let heightInMeters = heightValue;
  if (heightUnit === 'cm') {
    heightInMeters = heightValue / 100;
  }

  let weightInKg = weightValue;
  if (weightUnit === 'lbs') {
    weightInKg = weightValue * 0.45359237;
  }

  const bmi = weightInKg / (heightInMeters * heightInMeters);

  let category = 'Normal Weight';
  let categoryColor = 'text-emerald-600 dark:text-emerald-400';

  if (bmi < 18.5) {
    category = 'Underweight';
    categoryColor = 'text-amber-600 dark:text-amber-400';
  } else if (bmi >= 18.5 && bmi < 25) {
    category = 'Normal Weight';
    categoryColor = 'text-emerald-600 dark:text-emerald-400';
  } else if (bmi >= 25 && bmi < 30) {
    category = 'Overweight';
    categoryColor = 'text-amber-600 dark:text-amber-400';
  } else {
    category = 'Obesity';
    categoryColor = 'text-rose-600 dark:text-rose-400';
  }

  return {
    isValid: true,
    data: {
      bmi,
      formattedBMI: bmi.toFixed(1),
      category,
      categoryColor,
    },
  };
}

export interface UnitCategoryMap {
  [key: string]: { [unit: string]: number }; // Base factors relative to standard unit
}

export const UNIT_CONVERSIONS: UnitCategoryMap = {
  length: {
    mm: 0.001,
    cm: 0.01,
    m: 1,
    km: 1000,
    inch: 0.0254,
    feet: 0.3048,
    yard: 0.9144,
    mile: 1609.344,
  },
  weight: {
    mg: 0.001,
    g: 1,
    kg: 1000,
    ounce: 28.349523125,
    pound: 453.59237,
  },
  time: {
    seconds: 1,
    minutes: 60,
    hours: 3600,
    days: 86400,
  },
};

export function convertUnit(
  value: number,
  category: 'length' | 'weight' | 'temperature' | 'time',
  fromUnit: string,
  toUnit: string
): CalculationResult<number> {
  if (isNaN(value)) {
    return { isValid: false, error: 'Please enter a valid numeric value.' };
  }

  if (fromUnit === toUnit) {
    return { isValid: true, data: value };
  }

  if (category === 'temperature') {
    let kelvin = 0;
    if (fromUnit === 'Celsius') kelvin = value + 273.15;
    else if (fromUnit === 'Fahrenheit') kelvin = (value - 32) * (5 / 9) + 273.15;
    else if (fromUnit === 'Kelvin') kelvin = value;

    let result = 0;
    if (toUnit === 'Celsius') result = kelvin - 273.15;
    else if (toUnit === 'Fahrenheit') result = (kelvin - 273.15) * (9 / 5) + 32;
    else if (toUnit === 'Kelvin') result = kelvin;

    return { isValid: true, data: result };
  }

  const categoryUnits = UNIT_CONVERSIONS[category];
  if (!categoryUnits || !categoryUnits[fromUnit] || !categoryUnits[toUnit]) {
    return { isValid: false, error: 'Unsupported unit specified.' };
  }

  const baseValue = value * categoryUnits[fromUnit];
  const converted = baseValue / categoryUnits[toUnit];

  return { isValid: true, data: converted };
}

export interface ProfitLossOutput {
  isProfit: boolean;
  isNeutral: boolean;
  amount: number;
  percentage: number;
  formattedAmount: string;
  formattedPercentage: string;
}

export function calculateProfitLoss(costPrice: number, sellingPrice: number): CalculationResult<ProfitLossOutput> {
  if (isNaN(costPrice) || isNaN(sellingPrice)) {
    return { isValid: false, error: 'Please enter valid numerical amounts.' };
  }
  if (costPrice < 0 || sellingPrice < 0) {
    return { isValid: false, error: 'Cost price and Selling price cannot be negative.' };
  }
  if (costPrice === 0) {
    return { isValid: false, error: 'Cost price cannot be zero when calculating percentage margin.' };
  }

  const diff = sellingPrice - costPrice;
  const isProfit = diff > 0;
  const isNeutral = diff === 0;
  const amount = Math.abs(diff);
  const percentage = (amount / costPrice) * 100;

  return {
    isValid: true,
    data: {
      isProfit,
      isNeutral,
      amount,
      percentage,
      formattedAmount: `$${amount.toFixed(2)}`,
      formattedPercentage: `${percentage.toFixed(2)}%`,
    },
  };
}
