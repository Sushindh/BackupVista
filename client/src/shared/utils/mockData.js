// src/shared/utils/mockData.js

export const MOCK_USERS = {
  faculty: {
    id: 'F001',
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh@university.edu',
    role: 'faculty'
  },
  admin: {
    id: 'A001',
    name: 'Admin User',
    email: 'admin@university.edu',
    role: 'admin'
  },
  coordinator: {
    id: 'PC001',
    name: 'Dr. Priya Sharma',
    email: 'priya.sharma@university.edu',
    role: 'project_coordinator',
    school: 'SCOPE',
    programme: 'B.Tech CSE',
    department: 'CSE',
    isPrimary: true
  }
};

// Helper to generate teams
const generateTeams = (count, startId, reviewId) => {
  return Array.from({ length: count }, (_, i) => ({
    team_id: `T${startId + i}`,
    team_name: `Team ${String.fromCharCode(65 + (i % 26))}${i + 1}`, // Team A1, B2, ..., AA27
    marks_entered: i % 3 === 0, // Some marked, some not
    students: [
      { student_id: `S${startId + i}_1`, student_name: `Student ${startId + i}-1`, roll_no: `21BCE${(startId + i).toString().padStart(4, '0')}` },
      { student_id: `S${startId + i}_2`, student_name: `Student ${startId + i}-2`, roll_no: `21BCE${(startId + i + 100).toString().padStart(4, '0')}` }
    ]
  }));
};

// Rubric definitions (reused to keep realistic structure)
const rubricsGuide = [
  {
    rubric_id: 'R1-C1', component_name: 'Problem Statement', max_marks: 5, sub_components: [],
    levels: [{ score: 5, label: 'Excellent', description: 'Defined.' }]
  },
  {
    rubric_id: 'R1-C2', component_name: 'Literature Review', max_marks: 5, sub_components: [],
    levels: [{ score: 5, label: 'Excellent', description: 'Comprehensive.' }]
  },
  {
    rubric_id: 'R1-C3', component_name: 'Methodology', max_marks: 5, sub_components: [],
    levels: [{ score: 5, label: 'Excellent', description: 'Clear.' }]
  },
  {
    rubric_id: 'R1-C4', component_name: 'Results', max_marks: 5, sub_components: [],
    levels: [{ score: 5, label: 'Excellent', description: 'Good results.' }]
  }
];

const rubricsPanel = [
  {
    rubric_id: 'R3-C1', component_name: 'Design & Architecture', max_marks: 10, sub_components: [],
    levels: [{ score: 10, label: 'Excellent', description: 'Great design.' }]
  },
  {
    rubric_id: 'R3-C2', component_name: 'Implementation', max_marks: 10, sub_components: [],
    levels: [{ score: 10, label: 'Excellent', description: 'Working code.' }]
  },
  {
    rubric_id: 'R3-C3', component_name: 'Presentation', max_marks: 5, sub_components: [],
    levels: [{ score: 5, label: 'Excellent', description: 'Good slides.' }]
  },
  {
    rubric_id: 'R3-C4', component_name: 'Q&A', max_marks: 5, sub_components: [],
    levels: [{ score: 5, label: 'Excellent', description: 'Answered well.' }]
  }
];

export const MOCK_REVIEWS = [
  {
    review_id: 'R1',
    review_name: 'Project Proposal Review',
    start_date: '2025-12-01',
    end_date: '2025-12-20',
    review_type: 'guide',
    rubric_structure: rubricsGuide,
    teams: generateTeams(15, 100, 'R1')
  },
  {
    review_id: 'R2',
    review_name: 'Mid-Term Progress Review',
    start_date: '2025-12-05',
    end_date: '2025-12-25',// Active
    review_type: 'guide',
    rubric_structure: rubricsGuide,
    teams: generateTeams(20, 200, 'R2')
  },
  {
    review_id: 'R3',
    review_name: 'Design Review',
    start_date: '2025-11-10',
    end_date: '2025-11-28', // Past
    review_type: 'panel',
    rubric_structure: rubricsPanel,
    teams: generateTeams(12, 300, 'R3')
  },
  {
    review_id: 'R4',
    review_name: 'Final Review',
    start_date: '2026-04-01',
    end_date: '2026-04-15', // Future
    review_type: 'panel',
    rubric_structure: rubricsPanel,
    teams: generateTeams(10, 400, 'R4')
  }
];
