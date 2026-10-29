import { CurriculumDay, FaqItem, WorkflowStep } from '../types';

export const COURSE_INFO = {
  company: 'AronLabz Tech Pvt Ltd',
  companyTagline: 'Engineering Next-Generation Hardware & Embedded AI',
  title: 'ChatGPT Astra + AI Co-pilot in KiCad',
  subtitle: 'The Intensive Production PCB Design Masterclass',
  heroHeadline: 'BUILD YOUR OWN PRODUCTION PCB IN 6 DAYS',
  heroSubheadline: 'Stop memorizing disconnected CAD buttons. Master the complete end-to-end hardware engineering journey with KiCad 8 and ChatGPT Astra AI Co-pilot.',
  dates: '1 – 6 November',
  scheduleDetails: '1 – 6 November · 6 Live Interactive Sessions',
  time: '5:00 PM IST Daily',
  price: 399,
  originalPrice: 2499,
  discountPercentage: '84% OFF',
  seatsLeft: 14,
  currency: '₹',
  rating: '4.9/5',
  reviewsCount: '2,480+ engineers trained',
};

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: '01',
    title: 'Define Circuit Requirements',
    description: 'Map voltage rails, input/output interfaces, power budgeting, and logic architecture.',
    category: 'Design',
    aiRole: 'ChatGPT Astra synthesizes component alternatives and draft architectural block diagrams.'
  },
  {
    step: '02',
    title: 'Component Selection & Datasheet Analysis',
    description: 'Select production-grade ICs, passives, and connectors based on availability and thermals.',
    category: 'Design',
    aiRole: 'Extracts critical voltage thresholds, package footprints, and pinout tables in seconds.'
  },
  {
    step: '03',
    title: 'Precision Value Calculations',
    description: 'Calculate decoupling capacitors, pull-ups, current limiting, and trace impedance accurately.',
    category: 'Design',
    aiRole: 'Performs Ohm\'s law, RC filter cutoff, and power dissipation formulas with verification.'
  },
  {
    step: '04',
    title: 'Schematic Capture in KiCad',
    description: 'Build hierarchical schematics, power flags, netlabels, and ERC (Electrical Rules Check).',
    category: 'Design',
    aiRole: 'AI Co-pilot audits schematic nets for floating pins and polarity reversals.'
  },
  {
    step: '05',
    title: 'Footprint Assignment & Packaging',
    description: 'Match schematic symbols to exact IPC-standard SMD and THT footprints.',
    category: 'KiCad Layout',
    aiRole: 'Identifies pitch discrepancies and suggests verified KiCad 3D/footprint library models.'
  },
  {
    step: '06',
    title: 'Board Outline & Layer Stackup',
    description: 'Define mechanical clearances, mounting holes, edge rails, and 2-to-4 layer stackup rules.',
    category: 'KiCad Layout',
    aiRole: 'Calculates dielectric spacing and controlled impedance guidelines.'
  },
  {
    step: '07',
    title: 'Strategic Component Placement',
    description: 'Place MCU, power regulators, high-speed signals, and decoupling caps near pins logically.',
    category: 'KiCad Layout',
    aiRole: 'Advises on thermal dissipation zones and shortest loop inductance pathways.'
  },
  {
    step: '08',
    title: 'Precision Trace Routing',
    description: 'Route power polygons, 45-degree angle traces, return paths, and dedicated ground planes.',
    category: 'KiCad Layout',
    aiRole: 'Detects crosstalk risks, ground loop traps, and suggests optimal routing channels.'
  },
  {
    step: '09',
    title: 'Design Rule Check (DRC)',
    description: 'Execute deep DRC in KiCad to catch clearances, track violations, and unconnected nets.',
    category: 'KiCad Layout',
    aiRole: 'Translates cryptographic DRC warnings into immediate, actionable 1-click fixes.'
  },
  {
    step: '10',
    title: 'Bill of Materials (BOM) Generation',
    description: 'Export structured BOM with MPNs (Manufacturer Part Numbers), LCSC/DigiKey IDs.',
    category: 'Fabrication',
    aiRole: 'Formats standardized CSV/Excel BOMs with active stock lifecycle verification.'
  },
  {
    step: '11',
    title: 'Gerber & Drill File Export',
    description: 'Generate RS-274X Gerber layers (copper, soldermask, silkscreen) and NC drill files.',
    category: 'Fabrication',
    aiRole: 'Automated checklist verification ensuring no inverted drill or missing mask layers.'
  },
  {
    step: '12',
    title: 'Manufacturing & PCBA Assembly',
    description: 'Submit to fab houses (JLCPCB, PCBWay, Indian fabs), review quotation & inspect physical boards.',
    category: 'Fabrication',
    aiRole: 'Provides bring-up diagnostic flowcharts and first-power-on safety procedures.'
  }
];

export const CURRICULUM_DAYS: CurriculumDay[] = [
  {
    day: 1,
    date: 'Sun, 1 Nov',
    time: '5:00 PM IST',
    title: 'PCB Fundamentals + Circuit & Component Engineering',
    shortDesc: 'Transition from breadboard theory to commercial PCB engineering mindset.',
    badge: 'Foundations & Architecture',
    kicadModule: 'Eeschema & Component Libraries',
    handsOnDeliverable: 'Full custom schematic with power regulation and microcontroller sub-circuits',
    aiPromptExample: '"ChatGPT Astra: Analyze this 3.3V LDO circuit for thermal dissipation with a 12V input at 500mA load."',
    topics: [
      'Commercial PCB architecture and real-world product workflows',
      'Understanding active, passive & discrete IC components',
      'Selecting parts from datasheets (voltage drop, derating, operating limits)',
      'Crucial circuit calculations: pull-ups, LED limits, bypass caps',
      'Setting up KiCad 8 project environment and symbols library',
      'Power rail architecture and decoupling principles'
    ]
  },
  {
    day: 2,
    date: 'Mon, 2 Nov',
    time: '5:00 PM IST',
    title: 'Schematic Capture, Net Management & ERC in KiCad 8',
    shortDesc: 'Master hierarchical schematic design, netlabels, and Electrical Rules Check.',
    badge: 'Schematics & ERC',
    kicadModule: 'Eeschema Editor',
    handsOnDeliverable: 'Complete verified multi-sheet schematic with zero ERC violations',
    aiPromptExample: '"ChatGPT Astra: Audit this microcontroller netlist for unpulled reset lines and floating ADC inputs."',
    topics: [
      'Drawing clean hierarchical schematics with modular sheets',
      'Power flags, ground symbols, and global vs local netlabels',
      'Configuring and executing KiCad Electrical Rules Check (ERC)',
      'Identifying floating pins, conflicting output drivers, and net ambiguities',
      'Using ChatGPT Astra to audit pin multiplexing and external bus pull-ups',
      'Generating netlists and preparing for PCB synchronization'
    ]
  },
  {
    day: 3,
    date: 'Tue, 3 Nov',
    time: '5:00 PM IST',
    title: 'IPC Footprint Assignment & Component Placement Strategy',
    shortDesc: 'Translate abstract electronic diagrams into physical board geometry and footprints.',
    badge: 'Geometry & Footprints',
    kicadModule: 'Footprint Assignment Tool & PCBnew',
    handsOnDeliverable: 'Physical board outline with correctly assigned IPC footprints and optimized floorplan',
    aiPromptExample: '"KiCad AI Copilot: Recommend standard 0805 vs 0603 footprints for hand assembly vs pick-and-place."',
    topics: [
      'PCB layer definitions: Top/Bottom Copper, Solder Mask, Silkscreen, Edge Cuts',
      'Surface Mount (SMD) vs Through-Hole (THT) design trade-offs',
      'Footprint assignment: Matching schematic symbols to real-world packages',
      'Designing custom board outlines, mounting holes, and enclosure dimensions',
      'Strategic component placement: Power flow, noise decoupling, and connector ergonomics',
      'Thermal relief rules and keepout zones for antennas/oscillators'
    ]
  },
  {
    day: 4,
    date: 'Wed, 4 Nov',
    time: '5:00 PM IST',
    title: 'Precision Routing, Ground Planes & Trace Impedance Math',
    shortDesc: 'Master trace geometry, impedance, return paths, and zero-violation Design Rule Checks.',
    badge: 'Routing & Signal Integrity',
    kicadModule: 'Interactive Router & PCB Editor',
    handsOnDeliverable: '100% routed 2-layer PCB with dedicated copper pours and return paths',
    aiPromptExample: '"ChatGPT Astra: Check my trace width calculation for 2A continuous current on 1oz copper."',
    topics: [
      'Trace width vs current carrying capacity (IPC-2152 standards)',
      'Signal routing heuristics: 45-degree angles, length matching, stubs',
      'Power delivery networks & continuous ground plane copper pours',
      'Via stitching, thermal reliefs, and anti-pads',
      'High-speed trace considerations and return current loop minimization',
      'Interactive push-and-shove routing in KiCad 8'
    ]
  },
  {
    day: 5,
    date: 'Thu, 5 Nov',
    time: '5:00 PM IST',
    title: 'Design Rule Check (DRC), DFM Rules & CAM File Generation',
    shortDesc: 'Prepare production-ready CAM outputs and documentation that any fab house can build.',
    badge: 'DFM & CAM Outputs',
    kicadModule: 'Plotter, Gerber Viewer & BOM Exporter',
    handsOnDeliverable: 'Production Gerber ZIP archive, NC drill files, and formatted Bill of Materials (BOM)',
    aiPromptExample: '"KiCad AI Copilot: Validate Gerber RS-274X layers against standard 6mil trace/6mil space fab limits."',
    topics: [
      'Design for Manufacturing (DFM) and Design for Assembly (DFA) rules',
      'Professional silkscreen legends, component polarities, and company branding',
      'Generating Bill of Materials (BOM) with manufacturer part numbers (MPN)',
      'Plotting Gerber files: Top/Bottom Copper, Soldermask, Paste, Silkscreen',
      'Generating Excellon drill and blind/buried via files',
      'Auditing exported Gerbers with KiCad GerbView before submission'
    ]
  },
  {
    day: 6,
    date: 'Fri, 6 Nov',
    time: '5:00 PM IST',
    title: 'Manufacturing, SMT Assembly, Vendor Quoting & Bring-Up Lab',
    shortDesc: 'Navigate vendor procurement, quotes, PCBA, testing, and troubleshooting physical boards.',
    badge: 'Production & Bring-Up',
    kicadModule: 'Full Bring-Up Lab Case Study',
    handsOnDeliverable: 'Full bring-up checklist, fabrication order ready for vendor submission, and project portfolio',
    aiPromptExample: '"ChatGPT Astra: Provide a step-by-step bench smoke-test and bring-up procedure for this custom board."',
    topics: [
      'End-to-end review: Circuit idea → KiCad layout → Fab output',
      'Selecting PCB manufacturers (Local Indian vendors vs JLCPCB/PCBWay)',
      'Understanding vendor quotes: FR4 materials, copper weight, surface finishes (HASL vs ENIG)',
      'Bare PCB fabrication vs Automated SMT Assembly (PCBA)',
      'Bench bring-up workflow: Visual inspection, cold continuity checks, first power-on',
      'Troubleshooting board flaws, solder bridges, and rev-B engineering change orders'
    ]
  }
];

export const AUDIENCE_LIST = [
  {
    role: 'ECE, EEE, E&I & Mechatronics Students',
    description: 'Transform classroom theoretical circuits into tangible hardware products that supercharge your portfolio.'
  },
  {
    role: 'Embedded Systems & Firmware Developers',
    description: 'Stop relying solely on generic dev kits. Design custom carrier boards tailored exactly for your firmware.'
  },
  {
    role: 'Arduino, ESP32 & Raspberry Pi Makers',
    description: 'Graduate from jumbled breadboards and loose jumper wires to sleek, reliable custom PCBs.'
  },
  {
    role: 'IoT, Robotics & Automation Engineers',
    description: 'Consolidate multiple sensors, motor drivers, and microcontrollers into a single unified compact board.'
  },
  {
    role: 'Hardware Startup Founders & Prototype Builders',
    description: 'Understand DFM and BOM costing to iterate hardware prototypes 10x faster without expensive outsourcing.'
  },
  {
    role: 'Freshers & Working Hardware Professionals',
    description: 'Upskill with modern AI-augmented workflows in KiCad 8 to accelerate your hardware engineering career.'
  }
];

export const COMPARISON_POINTS = [
  {
    feature: 'Learning Curve',
    traditional: 'Months of clicking arbitrary toolbar buttons without product context',
    aronlabz: '6 days of direct, project-driven engineering workflow with KiCad 8'
  },
  {
    feature: 'AI Co-pilot Integration',
    traditional: 'Manual datasheet scouring, manual impedance math, blind guesswork',
    aronlabz: 'ChatGPT Astra AI Co-pilot for fast datasheet extraction, calculation audit & DRC decoding'
  },
  {
    feature: 'Workflow Scope',
    traditional: 'Stops at toy schematics on a screen',
    aronlabz: 'Covers full cycle: Idea → Schematic → Layout → DRC → BOM → Gerber → Real PCBA Bring-up'
  },
  {
    feature: 'Instructor Credibility',
    traditional: 'Generic academic instructors with no commercial hardware releases',
    aronlabz: 'AronLabz Tech Pvt Ltd senior hardware engineers building real-world embedded products'
  },
  {
    feature: 'Post-Masterclass Assets',
    traditional: 'No recordings or confusing static PDFs',
    aronlabz: 'Lifetime access to all 6 session recordings + AronLabz Verified Completion Certificate'
  }
];

export const FAQS: FaqItem[] = [
  {
    category: 'Schedule',
    question: 'When does the masterclass take place?',
    answer: 'The masterclass runs live from Sunday 1 November to Friday 6 November 2026. Live sessions are held each day at 5:00 PM IST. Enrolments close on Sunday 1 November at 5:00 PM IST.'
  },
  {
    category: 'Schedule',
    question: 'What if I miss a live session?',
    answer: 'No problem at all! Full HD recordings of all 6 sessions are included for all enrolled participants. You can re-watch any step—footprint assignment, routing, DRC debugging, or Gerber export—at your own pace with lifetime reference access.'
  },
  {
    category: 'Prerequisites',
    question: 'Do I need prior PCB design experience?',
    answer: 'No prior PCB design experience is required. We start right from the foundational building blocks on Day 1 and systematically advance through schematic capture, footprint mapping, board layout, routing, DRC, and fabrication preparation.'
  },
  {
    category: 'Prerequisites',
    question: 'How much electronics background do I need?',
    answer: 'Basic familiarity with basic electronic components (resistors, capacitors, microcontrollers like Arduino/ESP32) is helpful. Day 1 provides a thorough refresher on electronic components and circuit calculations.'
  },
  {
    category: 'Tools & Software',
    question: 'Which software tools will we use?',
    answer: 'We will use KiCad (version 8), the world’s leading open-source electronic design automation (EDA) suite, paired with ChatGPT Astra as our AI engineering co-pilot.'
  },
  {
    category: 'Tools & Software',
    question: 'Is ChatGPT Astra the PCB layout tool itself?',
    answer: 'No. KiCad is the professional PCB design software where the schematic, traces, and fabrication files are created. ChatGPT Astra acts as an AI Co-pilot—helping you analyze datasheets, verify pinouts, calculate trace widths, explain DRC violations, and accelerate tedious engineering decisions.'
  },
  {
    category: 'Certification',
    question: 'Will I receive an official certificate?',
    answer: 'Yes! Upon completing the 6-day program, you will receive an official, verifiable Certificate of Completion issued by AronLabz Tech Pvt Ltd, featuring your unique credential ID to showcase on LinkedIn and your resume.'
  },
  {
    category: 'Career',
    question: 'Can I use what I learn to manufacture real physical boards?',
    answer: 'Absolutely. By Day 5 and Day 6, you will generate industry-standard Gerber files, NC drill files, and formatted Bill of Materials (BOM) that are 100% compliant with commercial PCB fabrication houses like JLCPCB, PCBWay, and Indian fab facilities.'
  },
  {
    category: 'Career',
    question: 'How do I pay and get immediate access?',
    answer: 'Click any "Enroll Now" or "Reserve Seat" button. The enrollment fee is just ₹399 (one-time), processed securely via Razorpay (supporting UPI, Google Pay, PhonePe, Paytm, Credit/Debit Cards, and NetBanking). You will receive instant confirmation and instructions to join the private masterclass community and live stream link.'
  }
];
