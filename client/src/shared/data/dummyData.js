// Comprehensive dummy data for demonstration
// Default login credentials are included at the bottom of this file

// =============================================
// DEMO USERS (Login Credentials)
// =============================================
export const DEMO_USERS = {
    admin: {
        _id: "admin001",
        name: "Dr. Super Admin",
        emailId: "admin@vista.com",
        password: "admin123",
        employeeId: "ADM001",
        phoneNumber: "9999999999",
        role: "admin",
        school: "SCOPE",
        department: "CSE",
        specialization: "Administration",
        isActive: true,
        isProjectCoordinator: false,
    },
    coordinator: {
        _id: "coord001",
        name: "Dr. PC Sharma",
        emailId: "coordinator@vista.com",
        password: "coord123",
        employeeId: "F001",
        phoneNumber: "9000000001",
        role: "faculty",
        school: "SCOPE",
        department: "CSE",
        program: "B.Tech",
        specialization: "AI/ML",
        isActive: true,
        isProjectCoordinator: true,
        coordinatorDetails: {
            isPrimary: true,
            academicYear: "2025-2026",
            permissions: {
                canEdit: { enabled: true },
                canView: { enabled: true },
                canCreateFaculty: { enabled: true },
                canEditFaculty: { enabled: true },
                canCreatePanels: { enabled: true },
                canEditPanels: { enabled: true },
                canAssignPanels: { enabled: true },
                canUploadStudents: { enabled: true },
                canModifyStudents: { enabled: true },
                canCreateProjects: { enabled: true },
                canEditProjects: { enabled: true },
                canAssignGuides: { enabled: true },
                canReassignGuides: { enabled: true },
                canManageRequests: { enabled: true },
            },
        },
    },
    faculty: {
        _id: "fac001",
        name: "Dr. A. Kumar",
        emailId: "faculty@vista.com",
        password: "faculty123",
        employeeId: "F002",
        phoneNumber: "9000000002",
        role: "faculty",
        school: "SCOPE",
        department: "CSE",
        specialization: "AI/ML",
        isActive: true,
        isProjectCoordinator: false,
    },
    locked_coordinator: {
        _id: "coord002",
        name: "Dr. L. Locked",
        emailId: "locked_coordinator@vista.com",
        password: "locked123",
        employeeId: "F099",
        phoneNumber: "9000000099",
        role: "faculty",
        school: "SCOPE",
        department: "CSE",
        program: "B.Tech",
        specialization: "Cybersecurity",
        isActive: true,
        isProjectCoordinator: true,
        coordinatorDetails: {
            isPrimary: true,
            academicYear: "2025-2026",
            permissions: {
                canEdit: { enabled: false, deadline: new Date("2024-01-01") }, // Expired
                canView: { enabled: true },
                canCreateFaculty: { enabled: false },
                canEditFaculty: { enabled: false },
                canCreatePanels: { enabled: false },
                canEditPanels: { enabled: false },
                canAssignPanels: { enabled: false },
                canUploadStudents: { enabled: false },
                canModifyStudents: { enabled: false },
                canCreateProjects: { enabled: false },
                canEditProjects: { enabled: false },
                canAssignGuides: { enabled: false },
                canReassignGuides: { enabled: false },
                canManageRequests: { enabled: true }, // Keep this enabled so they can request access
            },
        },
    },
};

// =============================================
// FACULTY DATA
// =============================================
export const DUMMY_FACULTY = [
    { _id: "fac001", name: "Dr. A. Kumar", emailId: "akumar1@vista.com", employeeId: "F001", phoneNumber: "9000000001", role: "faculty", school: "SCOPE", department: "CSE", specialization: "AI/ML", isActive: true, isProjectCoordinator: true },
    { _id: "fac002", name: "Dr. R. Mehta", emailId: "rmehta2@vista.com", employeeId: "F002", phoneNumber: "9000000002", role: "faculty", school: "SCOPE", department: "CSE", specialization: "AI/ML", isActive: true },
    { _id: "fac003", name: "Dr. S. Iyer", emailId: "siyer3@vista.com", employeeId: "F003", phoneNumber: "9000000003", role: "faculty", school: "SCOPE", department: "CSE", specialization: "Data Science", isActive: true },
    { _id: "fac004", name: "Dr. P. Verma", emailId: "pverma4@vista.com", employeeId: "F004", phoneNumber: "9000000004", role: "faculty", school: "SCOPE", department: "CSE", specialization: "Cybersecurity", isActive: true },
    { _id: "fac005", name: "Dr. N. Rao", emailId: "nrao5@vista.com", employeeId: "F005", phoneNumber: "9000000005", role: "faculty", school: "SCOPE", department: "CSE", specialization: "Cloud Computing", isActive: true },
    { _id: "fac006", name: "Prof. K. Sharma", emailId: "ksharma6@vista.com", employeeId: "F006", phoneNumber: "9000000006", role: "faculty", school: "SCOPE", department: "CSE", specialization: "Software Engineering", isActive: true },
    { _id: "fac007", name: "Dr. M. Banerjee", emailId: "mbanerjee7@vista.com", employeeId: "F007", phoneNumber: "9000000007", role: "faculty", school: "SCOPE", department: "CSE", specialization: "IoT", isActive: true },
    { _id: "fac008", name: "Prof. V. Nair", emailId: "vnair8@vista.com", employeeId: "F008", phoneNumber: "9000000008", role: "faculty", school: "SCOPE", department: "CSE", specialization: "Blockchain", isActive: true },
    { _id: "fac009", name: "Dr. T. Das", emailId: "tdas9@vista.com", employeeId: "F009", phoneNumber: "9000000009", role: "faculty", school: "SITE", department: "IT", specialization: "Web Development", isActive: true },
    { _id: "fac010", name: "Prof. H. Patel", emailId: "hpatel10@vista.com", employeeId: "F010", phoneNumber: "9000000010", role: "faculty", school: "SENSE", department: "ECE", specialization: "VLSI", isActive: true },
];

// =============================================
// STUDENTS DATA
// =============================================
export const DUMMY_STUDENTS = [
    { _id: "stu001", regNo: "21BCE2000", name: "Aarav Kumar", emailId: "aarav2000@vista.com", school: "SCOPE", program: "B.Tech", department: "CSE", academicYear: "2025-2026", isActive: true },
    { _id: "stu002", regNo: "21BCE2001", name: "Vivaan Sharma", emailId: "vivaan2001@vista.com", school: "SCOPE", program: "B.Tech", department: "CSE", academicYear: "2025-2026", isActive: true },
    { _id: "stu003", regNo: "21BCE2002", name: "Aditya Singh", emailId: "aditya2002@vista.com", school: "SCOPE", program: "B.Tech", department: "CSE", academicYear: "2025-2026", isActive: true },
    { _id: "stu004", regNo: "21BCE2003", name: "Priya Patel", emailId: "priya2003@vista.com", school: "SCOPE", program: "B.Tech", department: "CSE", academicYear: "2025-2026", isActive: true },
    { _id: "stu005", regNo: "21BCE2004", name: "Arjun Gupta", emailId: "arjun2004@vista.com", school: "SCOPE", program: "B.Tech", department: "CSE", academicYear: "2025-2026", isActive: true },
    { _id: "stu006", regNo: "21BCE2005", name: "Sneha Reddy", emailId: "sneha2005@vista.com", school: "SCOPE", program: "B.Tech", department: "CSE", academicYear: "2025-2026", isActive: true },
    { _id: "stu007", regNo: "21BCE2006", name: "Rohan Nair", emailId: "rohan2006@vista.com", school: "SCOPE", program: "B.Tech", department: "CSE", academicYear: "2025-2026", isActive: true },
    { _id: "stu008", regNo: "21BCE2007", name: "Ananya Iyer", emailId: "ananya2007@vista.com", school: "SCOPE", program: "B.Tech", department: "CSE", academicYear: "2025-2026", isActive: true },
    { _id: "stu009", regNo: "21BCE2008", name: "Karthik Joshi", emailId: "karthik2008@vista.com", school: "SCOPE", program: "B.Tech", department: "CSE", academicYear: "2025-2026", isActive: true },
    { _id: "stu010", regNo: "21BCE2009", name: "Meera Shah", emailId: "meera2009@vista.com", school: "SCOPE", program: "B.Tech", department: "CSE", academicYear: "2025-2026", isActive: true },
    { _id: "stu011", regNo: "21BCE2010", name: "Rahul Verma", emailId: "rahul2010@vista.com", school: "SCOPE", program: "B.Tech", department: "CSE", academicYear: "2025-2026", isActive: true },
    { _id: "stu012", regNo: "21BCE2011", name: "Kavya Menon", emailId: "kavya2011@vista.com", school: "SCOPE", program: "B.Tech", department: "CSE", academicYear: "2025-2026", isActive: true },
];

// =============================================
// PROJECTS DATA
// =============================================
export const DUMMY_PROJECTS = [
    {
        _id: "proj001",
        name: "AI-Based Traffic Management System",
        students: ["stu001", "stu002"],
        studentDetails: [
            { _id: "stu001", regNo: "21BCE2000", name: "Aarav Kumar" },
            { _id: "stu002", regNo: "21BCE2001", name: "Vivaan Sharma" },
        ],
        guideFaculty: "fac001",
        guideDetails: { _id: "fac001", name: "Dr. A. Kumar", employeeId: "F001" },
        panel: "panel001",
        academicYear: "2025-2026",
        school: "SCOPE",
        program: "B.Tech",
        specialization: "AI/ML",
        type: "software",
        status: "active",
        teamSize: 2,
        bestProject: false,
    },
    {
        _id: "proj002",
        name: "Disease Prediction using Machine Learning",
        students: ["stu003", "stu004"],
        studentDetails: [
            { _id: "stu003", regNo: "21BCE2002", name: "Aditya Singh" },
            { _id: "stu004", regNo: "21BCE2003", name: "Priya Patel" },
        ],
        guideFaculty: "fac002",
        guideDetails: { _id: "fac002", name: "Dr. R. Mehta", employeeId: "F002" },
        panel: "panel001",
        academicYear: "2025-2026",
        school: "SCOPE",
        program: "B.Tech",
        specialization: "AI/ML",
        type: "software",
        status: "active",
        teamSize: 2,
        bestProject: true,
    },
    {
        _id: "proj003",
        name: "Blockchain-Based Supply Chain",
        students: ["stu005", "stu006"],
        studentDetails: [
            { _id: "stu005", regNo: "21BCE2004", name: "Arjun Gupta" },
            { _id: "stu006", regNo: "21BCE2005", name: "Sneha Reddy" },
        ],
        guideFaculty: "fac008",
        guideDetails: { _id: "fac008", name: "Prof. V. Nair", employeeId: "F008" },
        panel: "panel002",
        academicYear: "2025-2026",
        school: "SCOPE",
        program: "B.Tech",
        specialization: "Blockchain",
        type: "software",
        status: "active",
        teamSize: 2,
        bestProject: false,
    },
    {
        _id: "proj004",
        name: "IoT Smart Home Automation",
        students: ["stu007", "stu008"],
        studentDetails: [
            { _id: "stu007", regNo: "21BCE2006", name: "Rohan Nair" },
            { _id: "stu008", regNo: "21BCE2007", name: "Ananya Iyer" },
        ],
        guideFaculty: "fac007",
        guideDetails: { _id: "fac007", name: "Dr. M. Banerjee", employeeId: "F007" },
        panel: "panel002",
        academicYear: "2025-2026",
        school: "SCOPE",
        program: "B.Tech",
        specialization: "IoT",
        type: "hardware",
        status: "active",
        teamSize: 2,
        bestProject: false,
    },
    {
        _id: "proj005",
        name: "Cybersecurity Threat Detection",
        students: ["stu009", "stu010"],
        studentDetails: [
            { _id: "stu009", regNo: "21BCE2008", name: "Karthik Joshi" },
            { _id: "stu010", regNo: "21BCE2009", name: "Meera Shah" },
        ],
        guideFaculty: "fac004",
        guideDetails: { _id: "fac004", name: "Dr. P. Verma", employeeId: "F004" },
        panel: "panel003",
        academicYear: "2025-2026",
        school: "SCOPE",
        program: "B.Tech",
        specialization: "Cybersecurity",
        type: "software",
        status: "active",
        teamSize: 2,
        bestProject: false,
    },
    {
        _id: "proj006",
        name: "Cloud-Based E-Commerce Platform",
        students: ["stu011", "stu012"],
        studentDetails: [
            { _id: "stu011", regNo: "21BCE2010", name: "Rahul Verma" },
            { _id: "stu012", regNo: "21BCE2011", name: "Kavya Menon" },
        ],
        guideFaculty: "fac005",
        guideDetails: { _id: "fac005", name: "Dr. N. Rao", employeeId: "F005" },
        panel: "panel003",
        academicYear: "2025-2026",
        school: "SCOPE",
        program: "B.Tech",
        specialization: "Cloud Computing",
        type: "software",
        status: "active",
        teamSize: 2,
        bestProject: false,
    },
];

// =============================================
// PANELS DATA
// =============================================
export const DUMMY_PANELS = [
    {
        _id: "panel001",
        panelName: "SCOPE-CSE-Panel-1",
        facultyEmployeeIds: ["F001", "F002", "F003"],
        members: [
            { faculty: "fac001", facultyEmployeeId: "F001", name: "Dr. A. Kumar" },
            { faculty: "fac002", facultyEmployeeId: "F002", name: "Dr. R. Mehta" },
            { faculty: "fac003", facultyEmployeeId: "F003", name: "Dr. S. Iyer" },
        ],
        venue: "Room 101, SCOPE Building",
        academicYear: "2025-2026",
        semester: "Fall",
        school: "SCOPE",
        program: "B.Tech",
        specializations: ["AI/ML", "Data Science"],
        type: "regular",
        panelType: "regular",
        maxProjects: 15,
        assignedProjectsCount: 2,
        isActive: true,
    },
    {
        _id: "panel002",
        panelName: "SCOPE-CSE-Panel-2",
        facultyEmployeeIds: ["F007", "F008", "F006"],
        members: [
            { faculty: "fac007", facultyEmployeeId: "F007", name: "Dr. M. Banerjee" },
            { faculty: "fac008", facultyEmployeeId: "F008", name: "Prof. V. Nair" },
            { faculty: "fac006", facultyEmployeeId: "F006", name: "Prof. K. Sharma" },
        ],
        venue: "Room 102, SCOPE Building",
        academicYear: "2025-2026",
        semester: "Fall",
        school: "SCOPE",
        program: "B.Tech",
        specializations: ["IoT", "Blockchain", "Software Engineering"],
        type: "regular",
        panelType: "regular",
        maxProjects: 12,
        assignedProjectsCount: 2,
        isActive: true,
    },
    {
        _id: "panel003",
        panelName: "SCOPE-CSE-Panel-3",
        facultyEmployeeIds: ["F004", "F005", "F009"],
        members: [
            { faculty: "fac004", facultyEmployeeId: "F004", name: "Dr. P. Verma" },
            { faculty: "fac005", facultyEmployeeId: "F005", name: "Dr. N. Rao" },
            { faculty: "fac009", facultyEmployeeId: "F009", name: "Dr. T. Das" },
        ],
        venue: "Room 103, SCOPE Building",
        academicYear: "2025-2026",
        semester: "Fall",
        school: "SCOPE",
        program: "B.Tech",
        specializations: ["Cybersecurity", "Cloud Computing"],
        type: "regular",
        panelType: "regular",
        maxProjects: 10,
        assignedProjectsCount: 2,
        isActive: true,
    },
];

// =============================================
// MARKING SCHEMA DATA
// =============================================
export const DUMMY_MARKING_SCHEMAS = [
    {
        _id: "schema001",
        school: "SCOPE",
        program: "B.Tech",
        academicYear: "2025-2026",
        reviews: [
            {
                reviewName: "review1",
                displayName: "Review 1 - Problem Definition",
                facultyType: "both",
                components: [
                    {
                        componentId: "comp001",
                        name: "Problem Definition",
                        maxMarks: 10,
                        subComponents: [
                            { title: "Clarity of Statement", maxMarks: 4, description: "Clear articulation of the problem" },
                            { title: "Scope & Feasibility", maxMarks: 3, description: "Realistic scope and technical feasibility" },
                            { title: "Objectives", maxMarks: 3, description: "Defined measurable objectives" }
                        ]
                    },
                    {
                        componentId: "comp002",
                        name: "Literature Survey",
                        maxMarks: 10,
                        subComponents: [
                            { title: "Relevance of Papers", maxMarks: 4, description: "Recent and relevant research papers" },
                            { title: "Depth of Analysis", maxMarks: 3, description: "Understanding of existing solutions" },
                            { title: "Gap Identification", maxMarks: 3, description: "Clear identification of research gaps" }
                        ]
                    },
                    {
                        componentId: "comp003",
                        name: "Proposed Methodology",
                        maxMarks: 10,
                        subComponents: [
                            { title: "Approach", maxMarks: 5, description: "Suitability of the proposed solution" },
                            { title: "Tools & Technologies", maxMarks: 5, description: "Appropriate selection of stack" }
                        ]
                    },
                ],
                deadline: {
                    from: new Date("2025-12-01"),
                    to: new Date("2026-01-05"), // Passed
                },
                pptRequired: true,
                draftRequired: false,
                order: 1,
                isActive: true,
            },
            {
                reviewName: "review2",
                displayName: "Review 2 - Design & Implementation",
                facultyType: "guide",
                components: [
                    {
                        componentId: "comp004",
                        name: "System Design",
                        maxMarks: 15,
                        subComponents: [
                            { title: "Architecture Diagram", maxMarks: 5, description: "High-level system architecture" },
                            { title: "Database Design", maxMarks: 5, description: "ER diagrams and schema" },
                            { title: "UI/UX Design", maxMarks: 5, description: "Wireframes and prototypes" }
                        ]
                    },
                    {
                        componentId: "comp005",
                        name: "Implementation Progress",
                        maxMarks: 20,
                        subComponents: [
                            { title: "Core Features", maxMarks: 10, description: "Implementation of key modules" },
                            { title: "Partial Execution", maxMarks: 10, description: "Working demo of implemented parts" }
                        ]
                    },
                    {
                        componentId: "comp006",
                        name: "Code Quality",
                        maxMarks: 10,
                        subComponents: [
                            { title: "Coding Standards", maxMarks: 5, description: "Indentation, variable naming, etc." },
                            { title: "Documentation", maxMarks: 5, description: "Inline comments and README" }
                        ]
                    },
                ],
                deadline: {
                    from: new Date("2026-01-01"),
                    to: new Date("2026-01-31"), // Active
                },
                pptRequired: true,
                draftRequired: true,
                order: 2,
                isActive: true,
            },
            {
                reviewName: "review3",
                displayName: "Review 3 - Final Review",
                facultyType: "panel",
                components: [
                    {
                        componentId: "comp007",
                        name: "Final Implementation",
                        maxMarks: 25,
                        subComponents: [
                            { title: "Completeness", maxMarks: 15, description: "All features implemented" },
                            { title: "Innovation", maxMarks: 10, description: "Novelty in the solution" }
                        ]
                    },
                    {
                        componentId: "comp008",
                        name: "Report Quality",
                        maxMarks: 15,
                        subComponents: [
                            { title: "Structure & Format", maxMarks: 5, description: "Adherence to thesis format" },
                            { title: "Content Quality", maxMarks: 10, description: "Clarity and depth of writing" }
                        ]
                    },
                    {
                        componentId: "comp009",
                        name: "Presentation & Demo",
                        maxMarks: 20,
                        subComponents: [
                            { title: "Presentation Skills", maxMarks: 8, description: "Clarity and time management" },
                            { title: "Live Demo", maxMarks: 12, description: "Smooth demonstration of the project" }
                        ]
                    },
                    {
                        componentId: "comp010",
                        name: "Q&A",
                        maxMarks: 10,
                        subComponents: [
                            { title: "Knowledge", maxMarks: 5, description: "Depth of technical knowledge" },
                            { title: "Response Clarity", maxMarks: 5, description: "Ability to answer questions" }
                        ]
                    },
                ],
                deadline: {
                    from: new Date("2026-03-15"),
                    to: new Date("2026-04-15"),
                },
                pptRequired: true,
                draftRequired: true,
                order: 3,
                isActive: true,
            },
        ],
        totalWeightage: 100,
    },
];

// =============================================
// COMPONENT LIBRARY DATA
// =============================================
export const DUMMY_COMPONENT_LIBRARY = [
    {
        _id: "lib001",
        academicYear: "2025-2026",
        school: "SCOPE",
        program: "B.Tech",
        components: [
            { _id: "comp001", name: "Problem Definition", category: "Research", description: "Understanding and defining the problem statement", suggestedWeight: 10, allowCustomSubComponents: true, isActive: true, applicableFor: ["both"] },
            { _id: "comp002", name: "Literature Survey", category: "Research", description: "Review of existing literature and solutions", suggestedWeight: 10, allowCustomSubComponents: true, isActive: true, applicableFor: ["both"] },
            { _id: "comp003", name: "Proposed Methodology", category: "Design", description: "Proposed approach and methodology", suggestedWeight: 10, allowCustomSubComponents: true, isActive: true, applicableFor: ["both"] },
            { _id: "comp004", name: "System Design", category: "Design", description: "Architecture and system design", suggestedWeight: 15, allowCustomSubComponents: true, isActive: true, applicableFor: ["software"] },
            { _id: "comp005", name: "Implementation", category: "Implementation", description: "Code implementation and development", suggestedWeight: 25, allowCustomSubComponents: true, isActive: true, applicableFor: ["both"] },
            { _id: "comp006", name: "Testing", category: "Testing", description: "Unit testing, integration testing", suggestedWeight: 10, allowCustomSubComponents: true, isActive: true, applicableFor: ["both"] },
            { _id: "comp007", name: "Documentation", category: "Documentation", description: "Project documentation and reports", suggestedWeight: 10, allowCustomSubComponents: true, isActive: true, applicableFor: ["both"] },
            { _id: "comp008", name: "Presentation", category: "Presentation", description: "Presentation and demo skills", suggestedWeight: 10, allowCustomSubComponents: true, isActive: true, applicableFor: ["both"] },
        ],
    },
];

// =============================================
// BROADCAST MESSAGES DATA
// =============================================
export const DUMMY_BROADCASTS = [
    {
        _id: "broadcast001",
        title: "Review 1 Deadline Extended",
        message: "The deadline for Review 1 submissions has been extended to January 31, 2026. Please ensure all documents are submitted before the deadline.",
        targetSchools: ["SCOPE"],
        targetPrograms: ["B.Tech"],
        targetAcademicYears: ["2025-2026"],
        createdBy: "admin001",
        createdByEmployeeId: "ADM001",
        createdByName: "Dr. Super Admin",
        expiresAt: new Date("2026-02-01"),
        isActive: true,
        action: "notice",
        priority: "high",
        createdAt: new Date("2026-01-05"),
    },
    {
        _id: "broadcast002",
        title: "Panel Assignment Completed",
        message: "Panel assignments for all projects have been completed. Faculty members can view their assigned projects in the dashboard.",
        targetSchools: ["SCOPE", "SITE"],
        targetPrograms: ["B.Tech", "MCA"],
        targetAcademicYears: ["2025-2026"],
        createdBy: "admin001",
        createdByEmployeeId: "ADM001",
        createdByName: "Dr. Super Admin",
        expiresAt: new Date("2026-03-01"),
        isActive: true,
        action: "notice",
        priority: "medium",
        createdAt: new Date("2026-01-03"),
    },
    {
        _id: "broadcast003",
        title: "System Maintenance Notice",
        message: "The system will undergo scheduled maintenance on January 15, 2026 from 10 PM to 2 AM. Please save your work before this time.",
        targetSchools: [],
        targetPrograms: [],
        targetAcademicYears: [],
        createdBy: "admin001",
        createdByEmployeeId: "ADM001",
        createdByName: "Dr. Super Admin",
        expiresAt: new Date("2026-01-16"),
        isActive: true,
        action: "block",
        priority: "urgent",
        createdAt: new Date("2026-01-07"),
    },
];

// =============================================
// ACCESS REQUESTS DATA (from Project Coordinator to Admin)
// =============================================
export const DUMMY_ACCESS_REQUESTS = [
    {
        _id: "areq001",
        featureName: "faculty_management",
        reason: "Need to add new faculty members for the upcoming semester",
        priority: "high",
        requiredDeadline: new Date("2026-01-20"),
        status: "pending",
        requestedBy: "coord001",
        requestedByName: "Dr. PC Sharma",
        school: "SCOPE",
        program: "B.Tech",
        submittedAt: new Date("2026-01-05"),
        isActive: true,
    },
    {
        _id: "areq002",
        featureName: "panel_management",
        reason: "Require panel creation access for emergency panel formation",
        priority: "medium",
        status: "approved",
        requestedBy: "coord001",
        requestedByName: "Dr. PC Sharma",
        school: "SCOPE",
        program: "B.Tech",
        approvedBy: "admin001",
        approvalReason: "Approved for current academic year",
        submittedAt: new Date("2026-01-02"),
        resolvedAt: new Date("2026-01-03"),
        grantStartTime: new Date("2026-01-03"),
        grantEndTime: new Date("2026-06-30"),
        isActive: true,
    },
    {
        _id: "areq003",
        featureName: "student_management",
        reason: "Need to update student records with incorrect registration numbers",
        priority: "low",
        status: "rejected",
        requestedBy: "coord001",
        requestedByName: "Dr. PC Sharma",
        school: "SCOPE",
        program: "B.Tech",
        approvedBy: "admin001",
        rejectionReason: "Please contact the admin directly for bulk student updates",
        submittedAt: new Date("2026-01-01"),
        resolvedAt: new Date("2026-01-02"),
        isActive: false,
    },
];

// =============================================
// FACULTY REQUESTS DATA (Deadline Extension, Mark Edit, Resubmission)
// =============================================
export const DUMMY_FACULTY_REQUESTS = [
    {
        _id: "freq001",
        faculty: "fac001",
        facultyName: "Dr. A. Kumar",
        facultyType: "guide",
        student: "stu001",
        studentName: "Aarav Kumar",
        studentRegNo: "21BCE2000",
        project: "proj001",
        projectName: "AI-Based Traffic Management System",
        academicYear: "2025-2026",
        school: "SCOPE",
        program: "B.Tech",
        reviewType: "review1",
        requestType: "deadline_extension",
        reason: "Student was unwell during the review period and needs additional time to complete the submission.",
        status: "pending",
        createdAt: new Date("2026-01-06"),
    },
    {
        _id: "freq002",
        faculty: "fac002",
        facultyName: "Dr. R. Mehta",
        facultyType: "guide",
        student: "stu003",
        studentName: "Aditya Singh",
        studentRegNo: "21BCE2002",
        project: "proj002",
        projectName: "Disease Prediction using Machine Learning",
        academicYear: "2025-2026",
        school: "SCOPE",
        program: "B.Tech",
        reviewType: "review1",
        requestType: "mark_edit",
        reason: "Error in marks calculation. Component marks were entered incorrectly.",
        status: "approved",
        resolvedBy: "coord001",
        resolvedAt: new Date("2026-01-05"),
        remarks: "Approved for mark correction. Please resubmit within 2 days.",
        createdAt: new Date("2026-01-04"),
    },
    {
        _id: "freq003",
        faculty: "fac004",
        facultyName: "Dr. P. Verma",
        facultyType: "panel",
        student: "stu009",
        studentName: "Karthik Joshi",
        studentRegNo: "21BCE2008",
        project: "proj005",
        projectName: "Cybersecurity Threat Detection",
        academicYear: "2025-2026",
        school: "SCOPE",
        program: "B.Tech",
        reviewType: "review1",
        requestType: "resubmission",
        reason: "Technical issues during the presentation. Student requests another chance.",
        status: "rejected",
        resolvedBy: "coord001",
        resolvedAt: new Date("2026-01-03"),
        remarks: "The recorded presentation is sufficient for evaluation.",
        createdAt: new Date("2026-01-02"),
    },
];

// =============================================
// MARKS DATA (Submitted marks for reviews)
// =============================================
export const DUMMY_MARKS = [
    {
        _id: "mark001",
        student: "stu003",
        studentDetails: { regNo: "21BCE2002", name: "Aditya Singh" },
        project: "proj002",
        projectName: "Disease Prediction using Machine Learning",
        reviewType: "review1",
        faculty: "fac002",
        facultyName: "Dr. R. Mehta",
        facultyType: "guide",
        academicYear: "2025-2026",
        school: "SCOPE",
        program: "B.Tech",
        componentMarks: [
            { componentId: "comp001", componentName: "Problem Definition", marks: 8, maxMarks: 10, componentTotal: 8, componentMaxTotal: 10, remarks: "Well defined problem statement" },
            { componentId: "comp002", componentName: "Literature Survey", marks: 9, maxMarks: 10, componentTotal: 9, componentMaxTotal: 10, remarks: "Excellent research" },
            { componentId: "comp003", componentName: "Proposed Methodology", marks: 8, maxMarks: 10, componentTotal: 8, componentMaxTotal: 10, remarks: "Good approach" },
        ],
        totalMarks: 25,
        maxTotalMarks: 30,
        remarks: "Great work overall. Keep it up!",
        isSubmitted: true,
        submittedAt: new Date("2026-01-05"),
    },
    {
        _id: "mark002",
        student: "stu004",
        studentDetails: { regNo: "21BCE2003", name: "Priya Patel" },
        project: "proj002",
        projectName: "Disease Prediction using Machine Learning",
        reviewType: "review1",
        faculty: "fac002",
        facultyName: "Dr. R. Mehta",
        facultyType: "guide",
        academicYear: "2025-2026",
        school: "SCOPE",
        program: "B.Tech",
        componentMarks: [
            { componentId: "comp001", componentName: "Problem Definition", marks: 9, maxMarks: 10, componentTotal: 9, componentMaxTotal: 10, remarks: "Excellent understanding" },
            { componentId: "comp002", componentName: "Literature Survey", marks: 8, maxMarks: 10, componentTotal: 8, componentMaxTotal: 10, remarks: "Good research" },
            { componentId: "comp003", componentName: "Proposed Methodology", marks: 9, maxMarks: 10, componentTotal: 9, componentMaxTotal: 10, remarks: "Innovative approach" },
        ],
        totalMarks: 26,
        maxTotalMarks: 30,
        remarks: "Excellent contribution to the team!",
        isSubmitted: true,
        submittedAt: new Date("2026-01-05"),
    },
];

// =============================================
// PROGRAM CONFIG DATA
// =============================================
export const DUMMY_PROGRAM_CONFIGS = [
    {
        _id: "config001",
        academicYear: "2025-2026",
        school: "SCOPE",
        program: "B.Tech",
        minTeamSize: 1,
        maxTeamSize: 4,
        defaultTeamSize: 2,
        minPanelSize: 2,
        maxPanelSize: 5,
        maxProjectsPerGuide: 8,
        maxProjectsPerPanel: 12,
        featureLocks: [
            { featureName: "faculty_creation", deadline: new Date("2026-01-15"), isLocked: false },
            { featureName: "panel_creation", deadline: new Date("2026-01-20"), isLocked: false },
            { featureName: "student_upload", deadline: new Date("2026-01-10"), isLocked: true },
            { featureName: "project_creation", deadline: new Date("2026-01-25"), isLocked: false },
            { featureName: "guide_assignment", deadline: new Date("2026-01-25"), isLocked: false },
            { featureName: "panel_assignment", deadline: new Date("2026-01-30"), isLocked: false },
        ],
    },
];

// =============================================
// PROJECT COORDINATORS DATA
// =============================================
export const DUMMY_COORDINATORS = [
    {
        _id: "pcord001",
        faculty: "fac001",
        facultyDetails: { _id: "fac001", name: "Dr. A. Kumar", emailId: "akumar1@vista.com", employeeId: "F001" },
        school: "SCOPE",
        program: "B.Tech",
        academicYear: "2025-2026",
        isPrimary: true,
        permissions: {
            canEdit: { enabled: true },
            canView: { enabled: true },
            canCreateFaculty: { enabled: true },
            canEditFaculty: { enabled: true },
            canDeleteFaculty: { enabled: false },
            canCreatePanels: { enabled: true },
            canEditPanels: { enabled: true },
            canDeletePanels: { enabled: false },
            canAssignPanels: { enabled: true },
            canUploadStudents: { enabled: true },
            canModifyStudents: { enabled: true },
            canDeleteStudents: { enabled: false },
            canCreateProjects: { enabled: true },
            canEditProjects: { enabled: true },
            canDeleteProjects: { enabled: false },
            canAssignGuides: { enabled: true },
            canReassignGuides: { enabled: true },
            canMergeTeams: { enabled: true },
            canSplitTeams: { enabled: true },
            canManageRequests: { enabled: true },
        },
        isActive: true,
        assignedAt: new Date("2025-08-01"),
    },
    {
        _id: "pcord002",
        faculty: "fac099",
        facultyDetails: { _id: "fac099", name: "Dr. L. Locked", emailId: "locked_coordinator@vista.com", employeeId: "F099" },
        school: "SCOPE",
        program: "B.Tech",
        academicYear: "2025-2026",
        isPrimary: true,
        permissions: {
            canEdit: { enabled: false },
            canView: { enabled: true },
            canCreateFaculty: { enabled: false },
            canEditFaculty: { enabled: false },
            canDeleteFaculty: { enabled: false },
            canCreatePanels: { enabled: false },
            canEditPanels: { enabled: false },
            canDeletePanels: { enabled: false },
            canAssignPanels: { enabled: false },
            canUploadStudents: { enabled: false },
            canModifyStudents: { enabled: false },
            canDeleteStudents: { enabled: false },
            canCreateProjects: { enabled: false },
            canEditProjects: { enabled: false },
            canDeleteProjects: { enabled: false },
            canAssignGuides: { enabled: false },
            canReassignGuides: { enabled: false },
            canMergeTeams: { enabled: false },
            canSplitTeams: { enabled: false },
            canManageRequests: { enabled: true },
        },
        isActive: true,
        assignedAt: new Date("2025-08-01"),
    },
];

// =============================================
// MASTER DATA (Schools, Programs, Academic Years)
// =============================================
export const DUMMY_MASTER_DATA = {
    schools: [
        { code: "SCOPE", name: "School of Computer Science and Engineering" },
        { code: "SITE", name: "School of Information Technology and Engineering" },
        { code: "SENSE", name: "School of Electronics Engineering" },
        { code: "SAS", name: "School of Advanced Sciences" },
    ],
    programs: [
        { code: "B.Tech", name: "Bachelor of Technology", school: "SCOPE" },
        { code: "M.Tech", name: "Master of Technology", school: "SCOPE" },
        { code: "MCA", name: "Master of Computer Applications", school: "SITE" },
        { code: "M.Sc", name: "Master of Science", school: "SAS" },
    ],
    academicYears: [
        { year: "2024-2025" },
        { year: "2025-2026" },
        { year: "2026-2027" },
    ],
    specializations: [
        "AI/ML",
        "Data Science",
        "Cybersecurity",
        "Cloud Computing",
        "IoT",
        "Blockchain",
        "Software Engineering",
        "Web Development",
        "VLSI",
        "General",
    ],
};

// =============================================
// DASHBOARD STATISTICS
// =============================================
export const DUMMY_DASHBOARD_STATS = {
    admin: {
        totalStudents: 12,
        totalFaculty: 10,
        totalProjects: 6,
        totalPanels: 3,
        pendingRequests: 2,
        activeBroadcasts: 3,
        reviewProgress: {
            review1: { completed: 2, total: 12 },
            review2: { completed: 0, total: 12 },
            review3: { completed: 0, total: 12 },
        },
    },
    coordinator: {
        totalStudents: 12,
        totalFaculty: 8,
        totalProjects: 6,
        totalPanels: 3,
        pendingFacultyRequests: 1,
        pendingAccessRequests: 1,
        studentsWithoutProject: 0,
        projectsWithoutPanel: 0,
    },
    faculty: {
        guideProjects: 1,
        panelProjects: 3,
        pendingReviews: 2,
        completedReviews: 2,
        upcomingDeadlines: [
            { reviewName: "Review 1", deadline: new Date("2026-01-31"), daysLeft: 24 },
        ],
    },
};

// =============================================
// HELPER: Check Demo Login
// =============================================
export const checkDemoLogin = (email, password) => {
    // Check admin
    if (email === DEMO_USERS.admin.emailId && password === DEMO_USERS.admin.password) {
        return { success: true, user: DEMO_USERS.admin, token: "demo-admin-token" };
    }
    // Check coordinator
    if (email === DEMO_USERS.coordinator.emailId && password === DEMO_USERS.coordinator.password) {
        return { success: true, user: DEMO_USERS.coordinator, token: "demo-coordinator-token" };
    }
    // Check locked coordinator
    if (email === DEMO_USERS.locked_coordinator.emailId && password === DEMO_USERS.locked_coordinator.password) {
        return { success: true, user: DEMO_USERS.locked_coordinator, token: "demo-locked-token" };
    }
    // Check faculty
    if (email === DEMO_USERS.faculty.emailId && password === DEMO_USERS.faculty.password) {
        return { success: true, user: DEMO_USERS.faculty, token: "demo-faculty-token" };
    }
    return { success: false };
};

// =============================================
// DEFAULT LOGIN CREDENTIALS (for display on login page)
// =============================================
export const DEFAULT_CREDENTIALS = [
    { role: "Admin", email: "admin@vista.com", password: "admin123" },
    { role: "Project Coordinator (Open)", email: "coordinator@vista.com", password: "coord123" },
    { role: "Project Coordinator (Locked)", email: "locked_coordinator@vista.com", password: "locked123" },
    { role: "Faculty", email: "faculty@vista.com", password: "faculty123" },
];

export default {
    DEMO_USERS,
    DUMMY_FACULTY,
    DUMMY_STUDENTS,
    DUMMY_PROJECTS,
    DUMMY_PANELS,
    DUMMY_MARKING_SCHEMAS,
    DUMMY_COMPONENT_LIBRARY,
    DUMMY_BROADCASTS,
    DUMMY_ACCESS_REQUESTS,
    DUMMY_FACULTY_REQUESTS,
    DUMMY_MARKS,
    DUMMY_PROGRAM_CONFIGS,
    DUMMY_COORDINATORS,
    DUMMY_MASTER_DATA,
    DUMMY_DASHBOARD_STATS,
    checkDemoLogin,
    DEFAULT_CREDENTIALS,
};
