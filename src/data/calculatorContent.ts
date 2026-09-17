import { CalculatorContent } from '../types';

export const CALCULATOR_CONTENT: Record<string, CalculatorContent> = {
  percentage: {
    id: 'percentage',
    name: 'Percentage Calculator',
    metaTitle: 'Free Percentage Calculator — Marks & Grades | StudyTools Hub',
    metaDescription: 'Calculate exam percentages, marks fraction ratios, and grade scores instantly with our free online percentage calculator. Includes formulas & examples.',
    canonicalPath: '/calculators/percentage-calculator',
    keywords: ['percentage calculator', 'marks percentage', 'calculate percentage', 'exam score percentage', 'student grade calculator'],
    overview: 'The Percentage Calculator helps students, teachers, and professionals convert obtained marks out of total marks into an exact percentage score. Percentage represents a number or ratio expressed as a fraction of 100, widely used in academic reporting and test score evaluations.',
    formula: 'Percentage (%) = (Marks Obtained / Total Marks) × 100',
    formulaDescription: 'To compute percentage, divide the score obtained by the total maximum possible score, then multiply the resulting decimal quotient by 100.',
    workedExample: {
      title: 'Calculating Score Percentage for 425 out of 500 Marks',
      problem: 'A student scores 425 marks out of a total of 500 marks in an academic semester. What is their final percentage score?',
      steps: [
        { label: 'Step 1: Identify Obtained and Total Marks', detail: 'Obtained Marks = 425, Total Marks = 500' },
        { label: 'Step 2: Divide Obtained Marks by Total Marks', detail: '425 / 500 = 0.85' },
        { label: 'Step 3: Multiply Quotient by 100', detail: '0.85 × 100 = 85.00%' },
      ],
      result: 'The student scored 85.00% overall.',
    },
    faqs: [
      {
        question: 'What is a percentage in student grading?',
        answer: 'A percentage represents your total earned score relative to 100 base units. It standardizes evaluations across different exam point scales.',
      },
      {
        question: 'Can obtained marks be greater than total marks?',
        answer: 'Under standard grading rules, obtained marks cannot exceed total marks. If extra credit is awarded, percentages can exceed 100%, but our standard validator flags values above total as potential entry errors.',
      },
      {
        question: 'How do I convert a percentage back to obtained marks?',
        answer: 'Multiply your percentage by the total maximum marks and divide by 100: Obtained = (Percentage × Total Marks) / 100.',
      },
    ],
    relatedCalculatorIds: ['cgpa', 'gpa', 'attendance', 'discount'],
  },

  cgpa: {
    id: 'cgpa',
    name: 'CGPA Calculator',
    metaTitle: 'CGPA to Percentage Calculator & Converter | StudyTools Hub',
    metaDescription: 'Convert Cumulative Grade Point Average (CGPA) to percentage. Learn institutional conversion rules and configurable grade scale multipliers.',
    canonicalPath: '/calculators/cgpa-calculator',
    keywords: ['cgpa to percentage', 'cgpa calculator', 'calculate cgpa', 'cgpa converter', 'university grade conversion'],
    overview: 'Cumulative Grade Point Average (CGPA) measures overall academic performance across all completed semesters in a university or school program. Converting CGPA into a percentage score is frequently required for job applications, scholarship eligibility, and postgraduate admissions.',
    formula: 'Percentage (%) = CGPA × Multiplier (Default: 9.5)',
    formulaDescription: 'Conversion rules vary significantly across academic boards and universities. For example, CBSE and several Indian technical universities use a 9.5 multiplier, whereas other global institutions use a direct 10.0 multiplier or custom conversion tables.',
    workedExample: {
      title: 'Converting a 8.4 CGPA to Percentage using 9.5 Multiplier',
      problem: 'Convert a CGPA of 8.4 on a 10-point scale using the standard 9.5 conversion multiplier.',
      steps: [
        { label: 'Step 1: Note CGPA and Multiplier', detail: 'CGPA = 8.4, Multiplier = 9.5' },
        { label: 'Step 2: Multiply CGPA by Multiplier', detail: '8.4 × 9.5 = 79.80' },
      ],
      result: 'The equivalent percentage is 79.80%.',
    },
    faqs: [
      {
        question: 'Is there a single universal formula for CGPA to percentage?',
        answer: 'No. Every institution establishes its official grading handbook rules. Always verify whether your university prescribes 9.5, 10, or a non-linear formula before official submission.',
      },
      {
        question: 'Why does CBSE use a 9.5 multiplier?',
        answer: 'CBSE derived 9.5 by comparing historical performance distributions between 10-point CGPA bands and equivalent percentage score averages.',
      },
      {
        question: 'Can I change the multiplier in this calculator?',
        answer: 'Yes! Our tool lets you adjust the conversion multiplier to match your specific university or board guidelines.',
      },
    ],
    relatedCalculatorIds: ['gpa', 'percentage', 'attendance'],
  },

  attendance: {
    id: 'attendance',
    name: 'Attendance Calculator',
    metaTitle: 'Attendance Calculator — Bunk Classes Safely | StudyTools Hub',
    metaDescription: 'Calculate your current attendance percentage, classes you can skip while staying above target, or required classes to reach your threshold.',
    canonicalPath: '/calculators/attendance-calculator',
    keywords: ['attendance calculator', 'bunk calculator', 'class attendance percentage', 'minimum attendance target', 'student tools'],
    overview: 'Managing class attendance is essential for maintaining eligibility for exams and university courses. This attendance tool tells you your exact current percentage, how many classes you can skip while remaining above your target threshold, or how many consecutive classes you must attend if you fall short.',
    formula: 'Current % = (Classes Attended / Total Classes) × 100',
    formulaDescription: 'To maintain a target percentage (T%), the maximum total classes held must satisfy: Attended / Total_New ≥ T/100.',
    workedExample: {
      title: 'Determining Bunkable Classes for 45 out of 50 Classes at 75% Target',
      problem: 'You attended 45 out of 50 total classes. Your university requires a minimum 75% attendance. How many upcoming classes can you skip?',
      steps: [
        { label: 'Step 1: Calculate Current Attendance', detail: '(45 / 50) × 100 = 90.00%' },
        { label: 'Step 2: Find Maximum Total Classes for 75%', detail: 'Floor(45 / 0.75) = Floor(60) = 60 classes' },
        { label: 'Step 3: Calculate Safe Bunk Count', detail: '60 - 50 = 10 classes can be missed.' },
      ],
      result: 'You can safely miss the next 10 classes while maintaining at least 75.00% attendance.',
    },
    faqs: [
      {
        question: 'What happens if my current attendance is below target?',
        answer: 'The calculator determines the exact number of consecutive upcoming classes you must attend without missing any to raise your percentage back to target.',
      },
      {
        question: 'Is 100% attendance target achievable if I miss a class?',
        answer: 'If any class has already been missed, achieving a 100% cumulative attendance becomes mathematically impossible.',
      },
    ],
    relatedCalculatorIds: ['percentage', 'cgpa', 'gpa', 'age'],
  },

  gpa: {
    id: 'gpa',
    name: 'GPA Calculator',
    metaTitle: 'GPA Calculator — Calculate Weighted Semester Grade Point Average',
    metaDescription: 'Calculate semester or cumulative weighted GPA easily. Add course credits and grade points for instant, accurate academic results.',
    canonicalPath: '/calculators/gpa-calculator',
    keywords: ['gpa calculator', 'weighted gpa', 'semester gpa calculator', 'grade point average', 'college gpa tool'],
    overview: 'Grade Point Average (GPA) is the standard metric used by high schools and universities to quantify overall academic performance in a semester or degree program. Courses are weighted by credit hours to accurately reflect academic workload.',
    formula: 'GPA = ∑ (Grade Points × Course Credits) / ∑ (Course Credits)',
    formulaDescription: 'Multiply each course grade point by its credit value, sum all quality points together, and divide by total registered credit hours.',
    workedExample: {
      title: 'Calculating GPA for 3 Semester Courses',
      problem: 'Course 1 (4 credits, 4.0 grade point), Course 2 (3 credits, 3.0 grade point), Course 3 (3 credits, 3.7 grade point).',
      steps: [
        { label: 'Step 1: Calculate Quality Points', detail: '(4 × 4.0) + (3 × 3.0) + (3 × 3.7) = 16 + 9 + 11.1 = 36.1' },
        { label: 'Step 2: Calculate Total Credits', detail: '4 + 3 + 3 = 10 credits' },
        { label: 'Step 3: Divide Quality Points by Credits', detail: '36.1 / 10 = 3.61' },
      ],
      result: 'The semester GPA is 3.61.',
    },
    faqs: [
      {
        question: 'What is the difference between GPA and CGPA?',
        answer: 'GPA typically refers to performance in a single term or semester, while CGPA (Cumulative GPA) reflects performance across your entire academic program.',
      },
      {
        question: 'Does course credit weighting matter?',
        answer: 'Yes! A 4-credit lab or core course impacts your overall GPA more heavily than a 1-credit seminar.',
      },
    ],
    relatedCalculatorIds: ['cgpa', 'percentage', 'attendance'],
  },

  age: {
    id: 'age',
    name: 'Age Calculator',
    metaTitle: 'Age Calculator — Exact Age in Years, Months, Days & Days Countdown',
    metaDescription: 'Calculate your exact age in years, months, and days based on date of birth. Includes leap year handling and next birthday countdown.',
    canonicalPath: '/calculators/age-calculator',
    keywords: ['age calculator', 'calculate exact age', 'how old am i', 'birthday countdown', 'age in days'],
    overview: 'The Age Calculator determines exact age in years, months, days, total elapsed days, and provides a countdown to your next birthday relative to today or any target evaluation date.',
    formula: 'Age = Target Date − Date of Birth (Account for month lengths & leap years)',
    formulaDescription: 'Date subtraction adjusts for unequal calendar month lengths (28 to 31 days) and leap years (February 29th).',
    workedExample: {
      title: 'Calculating Age from March 15, 2000 to September 16, 2026',
      problem: 'Determine the exact age of a person born on March 15, 2000 as of September 16, 2026.',
      steps: [
        { label: 'Step 1: Year Difference', detail: '2026 − 2000 = 26 years' },
        { label: 'Step 2: Month Difference', detail: 'September (9) − March (3) = 6 months' },
        { label: 'Step 3: Day Difference', detail: '16 − 15 = 1 day' },
      ],
      result: 'The exact age is 26 years, 6 months, and 1 day.',
    },
    faqs: [
      {
        question: 'How are leap years handled in this calculator?',
        answer: 'Our algorithm accounts for 366-day leap years when evaluating date differences and total day counts.',
      },
      {
        question: 'Can I calculate age as of a future date?',
        answer: 'Yes! You can specify any target date to determine your age at a specific milestone in the future or past.',
      },
    ],
    relatedCalculatorIds: ['bmi', 'percentage', 'unit-converter'],
  },

  emi: {
    id: 'emi',
    name: 'EMI Calculator',
    metaTitle: 'EMI Calculator — Equated Monthly Installment Loan Calculator',
    metaDescription: 'Calculate monthly loan EMI, total interest, and loan repayment schedules. Works for home, student, personal, and car loans.',
    canonicalPath: '/calculators/emi-calculator',
    keywords: ['emi calculator', 'loan emi', 'monthly installment calculator', 'student loan emi', 'interest rate calculator'],
    overview: 'An Equated Monthly Installment (EMI) is a fixed payment made by a borrower to a lender at a specified date each calendar month. EMI consists of both principal and interest components.',
    formula: 'EMI = [P × R × (1+R)^N] / [(1+R)^N − 1]',
    formulaDescription: 'Where P = Principal Loan Amount, R = Monthly Interest Rate (Annual Rate / 12 / 100), and N = Loan Tenure in Months.',
    workedExample: {
      title: 'Calculating EMI for $10,000 Loan at 8% p.a. for 2 Years',
      problem: 'Principal = $10,000, Annual Interest Rate = 8%, Tenure = 2 Years (24 Months).',
      steps: [
        { label: 'Step 1: Monthly Interest Rate R', detail: '8 / 12 / 100 = 0.006667' },
        { label: 'Step 2: Apply Compound Factor', detail: '(1 + 0.006667)^24 = 1.172888' },
        { label: 'Step 3: Solve EMI Formula', detail: 'EMI = [10000 × 0.006667 × 1.172888] / [1.172888 − 1] = $452.27' },
      ],
      result: 'Monthly EMI is $452.27. Total Interest = $854.54, Total Payment = $10,854.54.',
    },
    faqs: [
      {
        question: 'Are EMI calculations exact financial quotes?',
        answer: 'Results are financial estimates. Actual bank loans may involve processing fees, taxes, or floating rate adjustments.',
      },
      {
        question: 'How does loan tenure affect EMI?',
        answer: 'A longer tenure reduces your monthly EMI amount but increases the total cumulative interest paid over the life of the loan.',
      },
    ],
    relatedCalculatorIds: ['discount', 'profit-loss', 'percentage'],
  },

  discount: {
    id: 'discount',
    name: 'Discount Calculator',
    metaTitle: 'Discount Calculator — Calculate Sale Price & Savings Percentage',
    metaDescription: 'Find final price after discount and calculate total money saved. Fast, easy, free shopping discount calculator.',
    canonicalPath: '/calculators/discount-calculator',
    keywords: ['discount calculator', 'sale price calculator', 'percentage off calculator', 'savings calculator', 'shopping deal calculator'],
    overview: 'The Discount Calculator computes final sale prices and total monetary savings when a percentage discount is applied to an original item price.',
    formula: 'Discount Amount = Original Price × (Discount % / 100)\nFinal Price = Original Price − Discount Amount',
    formulaDescription: 'Multiply the item sticker price by the discount decimal fraction, then subtract savings from the original price.',
    workedExample: {
      title: 'Calculating 25% Off on a $120 Product',
      problem: 'Original Price = $120, Discount = 25%. What is the final price?',
      steps: [
        { label: 'Step 1: Calculate Discount Amount', detail: '$120 × (25 / 100) = $30.00' },
        { label: 'Step 2: Calculate Final Price', detail: '$120 − $30 = $90.00' },
      ],
      result: 'You save $30.00 and pay $90.00.',
    },
    faqs: [
      {
        question: 'How do I calculate double discounts (e.g. 20% + 10%)?',
        answer: 'Sequential discounts apply step-by-step: take 20% off the original price first, then apply 10% off the reduced price, not a flat 30%.',
      },
    ],
    relatedCalculatorIds: ['percentage', 'profit-loss', 'emi'],
  },

  bmi: {
    id: 'bmi',
    name: 'BMI Calculator',
    metaTitle: 'BMI Calculator — Body Mass Index Screening Tool | StudyTools Hub',
    metaDescription: 'Calculate Body Mass Index (BMI) using height and weight. View WHO adult BMI categories and informational wellness guidelines.',
    canonicalPath: '/calculators/bmi-calculator',
    keywords: ['bmi calculator', 'body mass index', 'calculate bmi', 'bmi category', 'health tools'],
    overview: 'Body Mass Index (BMI) is a universal screening metric used to classify adult body weight relative to height into standard ranges: Underweight, Normal Weight, Overweight, and Obesity.',
    formula: 'BMI = Weight (kg) / [Height (m)]²',
    formulaDescription: 'Divide body weight in kilograms by height in meters squared. For imperial units (lbs/inches), multiply quotient by 703.',
    workedExample: {
      title: 'Calculating BMI for 70 kg weight and 175 cm height',
      problem: 'Height = 175 cm (1.75 m), Weight = 70 kg.',
      steps: [
        { label: 'Step 1: Square Height in Meters', detail: '1.75 × 1.75 = 3.0625 m²' },
        { label: 'Step 2: Divide Weight by Squared Height', detail: '70 / 3.0625 = 22.86' },
      ],
      result: 'BMI is 22.9, falling in the Normal Weight classification (18.5 – 24.9).',
    },
    faqs: [
      {
        question: 'Is BMI a diagnostic tool for health or disease?',
        answer: 'No. BMI is a population screening measure. It does not measure body fat percentage directly nor account for muscle mass or bone density. Always consult healthcare professionals for medical advice.',
      },
    ],
    relatedCalculatorIds: ['age', 'percentage', 'unit-converter'],
  },

  'unit-converter': {
    id: 'unit-converter',
    name: 'Unit Converter',
    metaTitle: 'Unit Converter — Length, Weight, Temperature & Time Converter',
    metaDescription: 'Free online unit converter for metric and imperial measurements. Convert length, weight, temperature, and time units instantly.',
    canonicalPath: '/calculators/unit-converter',
    keywords: ['unit converter', 'metric converter', 'length conversion', 'weight converter', 'celsius to fahrenheit'],
    overview: 'The Unit Converter provides instant conversion between metric and imperial systems across length, weight, temperature, and time units.',
    formula: 'Target Unit Value = (Source Value × Source Base Ratio) / Target Base Ratio',
    formulaDescription: 'Units are standardized against SI base reference units (meters, grams, seconds, kelvin) for exact conversion accuracy.',
    workedExample: {
      title: 'Converting 5 Kilometers to Miles',
      problem: 'Convert 5 km to miles (1 km ≈ 0.621371 miles).',
      steps: [
        { label: 'Step 1: Convert to Base Unit Meters', detail: '5 km × 1,000 = 5,000 meters' },
        { label: 'Step 2: Convert Meters to Target Miles', detail: '5,000 / 1609.344 = 3.10685 miles' },
      ],
      result: '5 km equals approximately 3.11 miles.',
    },
    faqs: [
      {
        question: 'How does temperature conversion differ from length or weight?',
        answer: 'Temperature scales (Celsius, Fahrenheit, Kelvin) include zero-point offsets in addition to scaling multipliers, requiring specific algebraic formulas rather than direct ratios.',
      },
    ],
    relatedCalculatorIds: ['percentage', 'bmi', 'age'],
  },

  'profit-loss': {
    id: 'profit-loss',
    name: 'Profit & Loss Calculator',
    metaTitle: 'Profit & Loss Calculator — Calculate Profit Margin & Loss Percentage',
    metaDescription: 'Calculate net profit or loss amount and margin percentage from cost price and selling price. Essential business & math calculator.',
    canonicalPath: '/calculators/profit-loss-calculator',
    keywords: ['profit loss calculator', 'profit margin calculator', 'cost price selling price', 'business margin calculator'],
    overview: 'The Profit & Loss Calculator evaluates financial returns on sales transactions, calculating absolute monetary gain/loss and percentage margin relative to cost price.',
    formula: 'Profit/Loss Amount = Selling Price − Cost Price\nPercentage (%) = (Amount / Cost Price) × 100',
    formulaDescription: 'If Selling Price > Cost Price, transaction yields a Profit. If Selling Price < Cost Price, transaction results in a Loss.',
    workedExample: {
      title: 'Calculating Profit on $80 Cost Price and $100 Selling Price',
      problem: 'Cost Price = $80, Selling Price = $100.',
      steps: [
        { label: 'Step 1: Calculate Profit Amount', detail: '$100 − $80 = $20.00 Profit' },
        { label: 'Step 2: Calculate Profit Percentage', detail: '($20 / $80) × 100 = 25.00%' },
      ],
      result: 'Net Profit is $20.00 (25.00% profit margin).',
    },
    faqs: [
      {
        question: 'What is the difference between profit margin and profit percentage?',
        answer: 'Profit percentage is calculated relative to Cost Price, whereas Gross Profit Margin is calculated relative to Selling Price.',
      },
    ],
    relatedCalculatorIds: ['discount', 'percentage', 'emi'],
  },
};
