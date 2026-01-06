// src/shared/utils/largeMockData.js

// 1. Master Data
export const MOCK_MASTER_DATA = {
    academicYears: [
        { _id: 'ay1', year: '2024-25', isActive: true },
        { _id: 'ay2', year: '2023-24', isActive: true },
        { _id: 'ay3', year: '2022-23', isActive: false }
    ],
    schools: [
        { _id: 'sch1', name: 'School of Computer Science and Engineering', code: 'SCOPE', isActive: true },
        { _id: 'sch2', name: 'School of Electronics Engineering', code: 'SENSE', isActive: true },
        { _id: 'sch3', name: 'School of Information Technology', code: 'SITE', isActive: true }
    ],
    programs: [
        { _id: 'prog1', name: 'B.Tech Computer Science and Engineering', code: 'B.Tech CSE', school: 'SCOPE', isActive: true },
        { _id: 'prog2', name: 'B.Tech CSE with AI & ML', code: 'B.Tech CSE (AI&ML)', school: 'SCOPE', isActive: true },
        { _id: 'prog3', name: 'B.Tech Electronics and Communication Engineering', code: 'B.Tech ECE', school: 'SENSE', isActive: true },
        { _id: 'prog4', name: 'B.Tech Information Technology', code: 'B.Tech IT', school: 'SITE', isActive: true }
    ],
    get departments() { return this.programs; }
};

// 2. Faculty Generator
const generateFaculty = () => {
    const faculty = [];
    const roles = ['faculty', 'faculty', 'faculty', 'project_coordinator'];
    const schools = ['SCOPE', 'SENSE', 'SITE'];

    for (let i = 1; i <= 20; i++) {
        const school = schools[i % 3];
        faculty.push({
            _id: `fac${i}`,
            employeeId: `100${i.toString().padStart(2, '0')}`,
            name: `Dr. Faculty Member ${i}`,
            email: `faculty${i}@university.edu`,
            emailId: `faculty${i}@university.edu`,
            school: school,
            department: 'Department ' + school,
            role: 'faculty',
            specialization: ['AI', 'ML', 'IoT', 'Cloud', 'Data Science'][i % 5],
            phoneNumber: `98765432${i.toString().padStart(2, '0')}`,
            isActive: true,
            isProjectCoordinator: i % 5 === 0 // Every 5th faculty is a coordinator
        });
    }
    return faculty;
};

export const MOCK_FACULTY = generateFaculty();

// 3. Panels Generator
const generatePanels = () => {
    const panels = [];
    for (let i = 1; i <= 10; i++) {
        panels.push({
            _id: `pan${i}`,
            members: [MOCK_FACULTY[i % 20], MOCK_FACULTY[(i + 1) % 20], MOCK_FACULTY[(i + 2) % 20]],
            academicYear: '2024-25',
            school: 'SCOPE',
            department: 'B.Tech CSE',
            isActive: true,
            assignedProjects: Math.floor(Math.random() * 5) + 1,
            createdAt: new Date().toISOString()
        });
    }
    return panels;
};

export const MOCK_PANELS = generatePanels();

// 4. Projects Generator
const generateProjects = () => {
    const projects = [];
    const types = ['Capstone Project', 'Research Project', 'Industrial Project'];

    for (let i = 1; i <= 30; i++) {
        const guide = MOCK_FACULTY[i % 20];
        const panel = MOCK_PANELS[i % 10];
        const teamSize = (i % 3) + 2; // 2, 3, or 4

        // Create students for this project
        const projectStudents = [];
        for (let j = 1; j <= teamSize; j++) {
            projectStudents.push({
                _id: `stu_p${i}_${j}`,
                regNo: `21BCE${(i * 10 + j).toString().padStart(4, '0')}`,
                name: `Student ${i}-${j}`,
                emailId: `student${i}_${j}@university.edu`
            });
        }

        projects.push({
            _id: `proj${i}`,
            name: `Project Title ${i}: Amazing AI Solution`,
            description: `This is a detailed description for project ${i}. It aims to solve real world problems using advanced technology.`,
            type: types[i % 3],
            academicYear: '2024-25',
            school: 'SCOPE',
            department: 'B.Tech CSE',
            specialization: 'Artificial Intelligence',
            teamSize: teamSize,
            status: i % 10 === 0 ? 'completed' : 'active',
            bestProject: i % 15 === 0,
            guideFaculty: guide,
            guideId: guide._id,
            panel: panel,
            panelId: panel._id,
            students: projectStudents,
            createdAt: new Date().toISOString()
        });
    }
    return projects;
};

export const MOCK_PROJECTS = generateProjects();

// 5. Students (Derived from Projects + Extras)
export const MOCK_STUDENTS = [
    ...MOCK_PROJECTS.flatMap(p => p.students.map(s => ({
        _id: s._id,
        regNo: s.regNo,
        name: s.name,
        email: s.emailId,
        emailId: s.emailId,
        school: p.school,
        department: p.department,
        academicYear: p.academicYear,
        PAT: true,
        isActive: true,
        projectId: p._id,
        projectName: p.name,
        projectType: p.type,
        guide: p.guideFaculty.name,
        guideId: p.guideFaculty._id,
        panelId: p.panel?._id,
        teamSize: p.teamSize,
        approvals: { ppt: { approved: true, approvedAt: '2024-09-01' } }
    }))),
    // Add 10 unassigned students
    ...Array.from({ length: 10 }, (_, i) => ({
        _id: `stu_new_${i}`,
        regNo: `21BCE900${i}`,
        name: `Unassigned Student ${i}`,
        email: `newstudent${i}@university.edu`,
        emailId: `newstudent${i}@university.edu`,
        school: 'SCOPE',
        department: 'B.Tech CSE',
        academicYear: '2024-25',
        PAT: false,
        isActive: true,
        projectId: null,
        approvals: { ppt: { approved: false, locked: false } }
    }))
];

// 6. Requests
export const MOCK_REQUESTS = Array.from({ length: 15 }, (_, i) => ({
    _id: `req${i}`,
    type: i % 2 === 0 ? 'Guide Change' : 'Project Extension',
    student: { name: `Student Requester ${i}`, regNo: `21BCE800${i}` },
    currentGuide: { name: `Dr. Guide ${i}` },
    requestedGuide: { name: `Dr. Guide ${i + 1}` },
    reason: 'Alignment issues with research domain.',
    status: i % 3 === 0 ? 'approved' : (i % 3 === 1 ? 'rejected' : 'pending'),
    createdAt: new Date(Date.now() - i * 86400000).toISOString()
}));

// 7. Broadcasts
export const MOCK_BROADCASTS = [
    {
        _id: 'broad1',
        message: 'Important: Review 1 Schedule Released! Check your emails.',
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 7 * 86400000).toISOString(), // +7 days
        targetSchools: ['SCOPE', 'SENSE'],
        targetDepartments: [],
        isActive: true
    },
    {
        _id: 'broad2',
        message: 'Project Proposal Deadline Extended to Oct 25th.',
        createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
        expiresAt: new Date(Date.now() + 5 * 86400000).toISOString(),
        targetSchools: [],
        targetDepartments: [],
        isActive: true
    },
    {
        _id: 'broad3',
        message: 'Welcome to the Capstone Project Management System.',
        createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
        expiresAt: new Date(Date.now() - 10 * 86400000).toISOString(),
        targetSchools: [],
        targetDepartments: [],
        isActive: false
    }
];

// 8. Reports
export const MOCK_REPORTS = {
    overview: {
        totalStudents: MOCK_STUDENTS.length,
        totalFaculty: MOCK_FACULTY.length,
        totalProjects: MOCK_PROJECTS.length,
        projectsAllocated: MOCK_PROJECTS.length,
        activeReviews: 5
    },
    projects: {
        distribution: [
            { type: 'Capstone', count: MOCK_PROJECTS.filter(p => p.type.includes('Capstone')).length },
            { type: 'Research', count: MOCK_PROJECTS.filter(p => p.type.includes('Research')).length },
            { type: 'Industrial', count: MOCK_PROJECTS.filter(p => p.type.includes('Industrial')).length }
        ],
        status: [
            { status: 'On Track', count: Math.floor(MOCK_PROJECTS.length * 0.7) },
            { status: 'Delayed', count: Math.floor(MOCK_PROJECTS.length * 0.2) },
            { status: 'Critical', count: Math.floor(MOCK_PROJECTS.length * 0.1) }
        ]
    },
    marks: {
        average: 82.5,
        highest: 99,
        lowest: 55,
        distribution: [
            { range: '90-100', count: 12 },
            { range: '80-89', count: 25 },
            { range: '70-79', count: 15 },
            { range: '<70', count: 5 }
        ]
    },
    facultyWorkload: MOCK_FACULTY.slice(0, 5).map(f => ({
        name: f.name,
        projects: Math.floor(Math.random() * 8),
        panels: Math.floor(Math.random() * 5)
    })),
    studentPerformance: {
        passPercentage: 96,
        averageGPA: 8.7,
        topPerformers: [
            { name: 'Student 1-1', gpa: 9.9 },
            { name: 'Student 4-1', gpa: 9.85 },
            { name: 'Student 7-1', gpa: 9.8 }
        ]
    }
};

// 9. Configs and Schemas
export const MOCK_DEPT_CONFIG = {
    academicYear: '2024-25',
    school: 'SCOPE',
    department: 'B.Tech CSE',
    minTeamSize: 2,
    maxTeamSize: 4,
    projectType: 'Capstone Project',
    featureLocks: {
        studentRegistration: false,
        facultyRegistration: false,
        projectAllocation: false,
        panelAllocation: true,
        marksEntry: true
    }
};

export const MOCK_MARKING_SCHEMA = {
    academicYear: '2024-25',
    school: 'SCOPE',
    department: 'B.Tech CSE',
    reviews: [
        { reviewName: 'Review 1', weightage: 20, type: 'guide' },
        { reviewName: 'Review 2', weightage: 30, type: 'panel' },
        { reviewName: 'Final Review', weightage: 50, type: 'panel' }
    ]
};
