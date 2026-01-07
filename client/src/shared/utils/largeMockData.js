// src/shared/utils/largeMockData.js
// Re-exports from the comprehensive dummy data file for backward compatibility

import {
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
} from "../data/dummyData";

// 1. Master Data - Using comprehensive dummy data
export const MOCK_MASTER_DATA = {
    academicYears: DUMMY_MASTER_DATA.academicYears.map((y, i) => ({
        _id: `ay${i + 1}`,
        year: y.year,
        isActive: true,
    })),
    schools: DUMMY_MASTER_DATA.schools.map((s, i) => ({
        _id: `sch${i + 1}`,
        name: s.name,
        code: s.code,
        isActive: true,
    })),
    programs: DUMMY_MASTER_DATA.programs.map((p, i) => ({
        _id: `prog${i + 1}`,
        name: p.name,
        code: p.code,
        school: p.school,
        isActive: true,
    })),
    get departments() {
        return this.programs;
    },
};

// 2. Faculty - Using comprehensive dummy data
export const MOCK_FACULTY = DUMMY_FACULTY.map((f) => ({
    ...f,
    email: f.emailId,
}));

// 3. Panels - Using comprehensive dummy data
export const MOCK_PANELS = DUMMY_PANELS.map((p) => ({
    ...p,
    department: "B.Tech CSE",
    assignedProjects: p.assignedProjectsCount,
    createdAt: new Date().toISOString(),
}));

// 4. Projects - Using comprehensive dummy data
export const MOCK_PROJECTS = DUMMY_PROJECTS.map((p) => {
    const guide = MOCK_FACULTY.find((f) => f._id === p.guideFaculty);
    const panel = MOCK_PANELS.find((pan) => pan._id === p.panel);

    // Expand student IDs to full student objects
    const students = p.studentDetails || p.students?.map(sid => {
        const student = DUMMY_STUDENTS.find(s => s._id === sid);
        return student ? { _id: student._id, name: student.name, regNo: student.regNo } : null;
    }).filter(Boolean) || [];

    return {
        ...p,
        students: students, // Full student objects
        description: `This project focuses on ${p.name}. It aims to solve real world problems using advanced technology.`,
        type: "Capstone Project",
        department: "B.Tech CSE",
        guideId: p.guideFaculty,
        guideFaculty: guide || { _id: p.guideFaculty, name: "Unknown Guide" },
        panelId: p.panel,
        panel: panel || null,
        createdAt: new Date().toISOString(),
    };
});

// 5. Students - Using comprehensive dummy data
export const MOCK_STUDENTS = DUMMY_STUDENTS.map((s) => {
    const project = MOCK_PROJECTS.find((p) => p.students?.includes(s._id));
    return {
        ...s,
        email: s.emailId,
        PAT: true,
        projectId: project?._id || null,
        projectName: project?.name || null,
        projectType: project?.type || null,
        guide: project?.guideFaculty?.name || null,
        guideId: project?.guideFaculty?._id || null,
        panelId: project?.panelId || null,
        teamSize: project?.teamSize || null,
        approvals: { ppt: { approved: true, approvedAt: "2024-09-01" } },
    };
});

// 6. Requests - Using comprehensive dummy data
export const MOCK_REQUESTS = DUMMY_FACULTY_REQUESTS.map((r, i) => ({
    _id: r._id,
    type: r.requestType === "deadline_extension" ? "Deadline Extension" : r.requestType === "mark_edit" ? "Mark Edit" : "Resubmission",
    student: { name: r.studentName, regNo: r.studentRegNo },
    faculty: { name: r.facultyName },
    project: { name: r.projectName },
    reason: r.reason,
    status: r.status,
    createdAt: r.createdAt?.toISOString() || new Date().toISOString(),
}));

// 7. Broadcasts - Using comprehensive dummy data
export const MOCK_BROADCASTS = DUMMY_BROADCASTS.map((b) => ({
    ...b,
    createdAt: b.createdAt?.toISOString() || new Date().toISOString(),
    expiresAt: b.expiresAt?.toISOString() || new Date(Date.now() + 7 * 86400000).toISOString(),
    targetDepartments: b.targetPrograms,
}));

// 8. Reports - Using comprehensive dummy data
export const MOCK_REPORTS = {
    overview: {
        totalStudents: DUMMY_STUDENTS.length,
        totalFaculty: DUMMY_FACULTY.length,
        totalProjects: DUMMY_PROJECTS.length,
        projectsAllocated: DUMMY_PROJECTS.length,
        activeReviews: 3,
    },
    projects: {
        distribution: [
            { type: "AI/ML", count: DUMMY_PROJECTS.filter((p) => p.specialization === "AI/ML").length },
            { type: "Cybersecurity", count: DUMMY_PROJECTS.filter((p) => p.specialization === "Cybersecurity").length },
            { type: "Cloud Computing", count: DUMMY_PROJECTS.filter((p) => p.specialization === "Cloud Computing").length },
            { type: "IoT", count: DUMMY_PROJECTS.filter((p) => p.specialization === "IoT").length },
            { type: "Blockchain", count: DUMMY_PROJECTS.filter((p) => p.specialization === "Blockchain").length },
        ],
        status: [
            { status: "Active", count: DUMMY_PROJECTS.filter((p) => p.status === "active").length },
            { status: "Completed", count: DUMMY_PROJECTS.filter((p) => p.status === "completed").length },
            { status: "Inactive", count: DUMMY_PROJECTS.filter((p) => p.status === "inactive").length },
        ],
    },
    marks: {
        average: 25.5,
        highest: 26,
        lowest: 25,
        distribution: [
            { range: "90-100%", count: 2 },
            { range: "80-89%", count: 0 },
            { range: "70-79%", count: 0 },
            { range: "<70%", count: 0 },
        ],
    },
    facultyWorkload: DUMMY_FACULTY.slice(0, 5).map((f) => ({
        name: f.name,
        projects: DUMMY_PROJECTS.filter((p) => p.guideFaculty === f._id).length,
        panels: DUMMY_PANELS.filter((p) => p.facultyEmployeeIds.includes(f.employeeId)).length,
    })),
    studentPerformance: {
        passPercentage: 100,
        averageGPA: 8.7,
        topPerformers: [
            { name: DUMMY_STUDENTS[2]?.name || "Student 1", gpa: 9.2 },
            { name: DUMMY_STUDENTS[3]?.name || "Student 2", gpa: 9.0 },
            { name: DUMMY_STUDENTS[0]?.name || "Student 3", gpa: 8.9 },
        ],
    },
};

// 9. Configs and Schemas - Using comprehensive dummy data
export const MOCK_DEPT_CONFIG = {
    academicYear: "2025-2026",
    school: "SCOPE",
    department: "B.Tech CSE",
    program: "B.Tech",
    minTeamSize: DUMMY_PROGRAM_CONFIGS[0]?.minTeamSize || 1,
    maxTeamSize: DUMMY_PROGRAM_CONFIGS[0]?.maxTeamSize || 4,
    defaultTeamSize: DUMMY_PROGRAM_CONFIGS[0]?.defaultTeamSize || 2,
    projectType: "Capstone Project",
    featureLocks: {
        studentRegistration: false,
        facultyRegistration: false,
        projectAllocation: false,
        panelAllocation: false,
        marksEntry: false,
    },
};

export const MOCK_MARKING_SCHEMA = DUMMY_MARKING_SCHEMAS[0] || {
    academicYear: "2025-2026",
    school: "SCOPE",
    program: "B.Tech",
    reviews: [
        { reviewName: "Review 1", displayName: "Review 1 - Problem Definition", weightage: 30, facultyType: "both" },
        { reviewName: "Review 2", displayName: "Review 2 - Design & Implementation", weightage: 45, facultyType: "guide" },
        { reviewName: "Review 3", displayName: "Review 3 - Final Review", weightage: 70, facultyType: "panel" },
    ],
};

// 10. Access Requests - Using comprehensive dummy data
export const MOCK_ACCESS_REQUESTS = DUMMY_ACCESS_REQUESTS;

// 11. Component Library - Using comprehensive dummy data
export const MOCK_COMPONENT_LIBRARY = DUMMY_COMPONENT_LIBRARY;

// 12. Dashboard Stats - Using comprehensive dummy data
export const MOCK_DASHBOARD_STATS = DUMMY_DASHBOARD_STATS;

// 13. Coordinators - Using comprehensive dummy data
export const MOCK_COORDINATORS = DUMMY_COORDINATORS;

// 14. Marks - Using comprehensive dummy data
export const MOCK_MARKS = DUMMY_MARKS;
