// Demo API layer - intercepts API calls and returns dummy data when in demo mode
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

// Check if demo mode is enabled
export const isDemoMode = () => {
    const token = localStorage.getItem("authToken");
    return token && token.startsWith("demo-");
};

// Get current demo user type
export const getDemoUserType = () => {
    const token = localStorage.getItem("authToken");
    if (token === "demo-admin-token") return "admin";
    if (token === "demo-coordinator-token") return "coordinator";
    if (token === "demo-faculty-token") return "faculty";
    return null;
};

// Simulated delay for realistic feel
const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

// =============================================
// FACULTY APIs
// =============================================
export const demoFetchFaculty = async (filters = {}) => {
    await delay();
    let data = [...DUMMY_FACULTY];

    if (filters.school) {
        data = data.filter((f) => f.school === filters.school);
    }
    if (filters.department) {
        data = data.filter((f) => f.department === filters.department);
    }
    if (filters.specialization) {
        data = data.filter((f) => f.specialization === filters.specialization);
    }
    if (filters.search) {
        const search = filters.search.toLowerCase();
        data = data.filter(
            (f) =>
                f.name.toLowerCase().includes(search) ||
                f.emailId.toLowerCase().includes(search) ||
                f.employeeId.toLowerCase().includes(search)
        );
    }

    return { success: true, data };
};

// =============================================
// STUDENT APIs
// =============================================
export const demoFetchStudents = async (filters = {}) => {
    await delay();
    let data = [...DUMMY_STUDENTS];

    if (filters.school) {
        data = data.filter((s) => s.school === filters.school);
    }
    if (filters.program) {
        data = data.filter((s) => s.program === filters.program);
    }
    if (filters.academicYear) {
        data = data.filter((s) => s.academicYear === filters.academicYear);
    }
    if (filters.search) {
        const search = filters.search.toLowerCase();
        data = data.filter(
            (s) =>
                s.name.toLowerCase().includes(search) ||
                s.regNo.toLowerCase().includes(search) ||
                s.emailId.toLowerCase().includes(search)
        );
    }

    return { success: true, data };
};

// =============================================
// PROJECT APIs
// =============================================
export const demoFetchProjects = async (filters = {}) => {
    await delay();
    let data = [...DUMMY_PROJECTS];

    if (filters.school) {
        data = data.filter((p) => p.school === filters.school);
    }
    if (filters.program) {
        data = data.filter((p) => p.program === filters.program);
    }
    if (filters.academicYear) {
        data = data.filter((p) => p.academicYear === filters.academicYear);
    }
    if (filters.specialization) {
        data = data.filter((p) => p.specialization === filters.specialization);
    }
    if (filters.guideFaculty) {
        data = data.filter((p) => p.guideFaculty === filters.guideFaculty);
    }
    if (filters.search) {
        const search = filters.search.toLowerCase();
        data = data.filter((p) => p.name.toLowerCase().includes(search));
    }

    return { success: true, data };
};

export const demoFetchGuideProjects = async (facultyId) => {
    await delay();
    const data = DUMMY_PROJECTS.filter((p) => p.guideFaculty === facultyId);
    return { success: true, data };
};

export const demoFetchPanelProjects = async (panelId) => {
    await delay();
    const data = DUMMY_PROJECTS.filter((p) => p.panel === panelId);
    return { success: true, data };
};

// =============================================
// PANEL APIs
// =============================================
export const demoFetchPanels = async (filters = {}) => {
    await delay();
    let data = [...DUMMY_PANELS];

    if (filters.school) {
        data = data.filter((p) => p.school === filters.school);
    }
    if (filters.program) {
        data = data.filter((p) => p.program === filters.program);
    }
    if (filters.academicYear) {
        data = data.filter((p) => p.academicYear === filters.academicYear);
    }

    return { success: true, panels: data, data };
};

export const demoFetchPanelSummary = async (filters = {}) => {
    await delay();
    const panels = DUMMY_PANELS.filter((p) => {
        if (filters.school && p.school !== filters.school) return false;
        if (filters.program && p.program !== filters.program) return false;
        if (filters.academicYear && p.academicYear !== filters.academicYear) return false;
        return true;
    });

    return {
        totalPanels: panels.length,
        activePanels: panels.filter((p) => p.isActive).length,
        totalCapacity: panels.reduce((sum, p) => sum + p.maxProjects, 0),
        assignedProjects: panels.reduce((sum, p) => sum + p.assignedProjectsCount, 0),
    };
};

// =============================================
// MARKING SCHEMA APIs
// =============================================
export const demoFetchMarkingSchemas = async (filters = {}) => {
    await delay();
    let data = [...DUMMY_MARKING_SCHEMAS];

    if (filters.school) {
        data = data.filter((s) => s.school === filters.school);
    }
    if (filters.program) {
        data = data.filter((s) => s.program === filters.program);
    }
    if (filters.academicYear) {
        data = data.filter((s) => s.academicYear === filters.academicYear);
    }

    return { success: true, data };
};

export const demoFetchMarkingSchema = async (school, program, academicYear) => {
    await delay();
    const schema = DUMMY_MARKING_SCHEMAS.find(
        (s) => s.school === school && s.program === program && s.academicYear === academicYear
    );

    return { success: true, data: schema || null };
};

// =============================================
// COMPONENT LIBRARY APIs
// =============================================
export const demoFetchComponentLibrary = async (filters = {}) => {
    await delay();
    let data = [...DUMMY_COMPONENT_LIBRARY];

    if (filters.school) {
        data = data.filter((c) => c.school === filters.school);
    }
    if (filters.program) {
        data = data.filter((c) => c.program === filters.program);
    }
    if (filters.academicYear) {
        data = data.filter((c) => c.academicYear === filters.academicYear);
    }

    return { success: true, data: data[0] || null };
};

// =============================================
// BROADCAST APIs
// =============================================
export const demoFetchBroadcasts = async (filters = {}) => {
    await delay();
    let data = [...DUMMY_BROADCASTS];

    if (filters.isActive !== undefined) {
        data = data.filter((b) => b.isActive === filters.isActive);
    }

    return { success: true, data };
};

// =============================================
// ACCESS REQUEST APIs (Coordinator -> Admin)
// =============================================
export const demoFetchAccessRequests = async (filters = {}) => {
    await delay();
    let data = [...DUMMY_ACCESS_REQUESTS];

    if (filters.status) {
        data = data.filter((r) => r.status === filters.status);
    }

    return { success: true, data };
};

// =============================================
// FACULTY REQUEST APIs (Deadline Extension, Mark Edit, Resubmission)
// =============================================
export const demoFetchFacultyRequests = async (filters = {}) => {
    await delay();
    let data = [...DUMMY_FACULTY_REQUESTS];

    if (filters.status) {
        data = data.filter((r) => r.status === filters.status);
    }
    if (filters.requestType) {
        data = data.filter((r) => r.requestType === filters.requestType);
    }
    if (filters.faculty) {
        data = data.filter((r) => r.faculty === filters.faculty);
    }

    return { success: true, data };
};

// =============================================
// MARKS APIs
// =============================================
export const demoFetchMarks = async (filters = {}) => {
    await delay();
    let data = [...DUMMY_MARKS];

    if (filters.student) {
        data = data.filter((m) => m.student === filters.student);
    }
    if (filters.project) {
        data = data.filter((m) => m.project === filters.project);
    }
    if (filters.faculty) {
        data = data.filter((m) => m.faculty === filters.faculty);
    }
    if (filters.reviewType) {
        data = data.filter((m) => m.reviewType === filters.reviewType);
    }

    return { success: true, data };
};

export const demoFetchStudentMarks = async (studentId, reviewType) => {
    await delay();
    const data = DUMMY_MARKS.filter(
        (m) => m.student === studentId && (!reviewType || m.reviewType === reviewType)
    );
    return { success: true, data };
};

// =============================================
// PROGRAM CONFIG APIs
// =============================================
export const demoFetchProgramConfigs = async (filters = {}) => {
    await delay();
    let data = [...DUMMY_PROGRAM_CONFIGS];

    if (filters.school) {
        data = data.filter((c) => c.school === filters.school);
    }
    if (filters.program) {
        data = data.filter((c) => c.program === filters.program);
    }
    if (filters.academicYear) {
        data = data.filter((c) => c.academicYear === filters.academicYear);
    }

    return { success: true, data };
};

export const demoFetchProgramConfig = async (school, program, academicYear) => {
    await delay();
    const config = DUMMY_PROGRAM_CONFIGS.find(
        (c) => c.school === school && c.program === program && c.academicYear === academicYear
    );

    return { success: true, data: config || null };
};

// =============================================
// COORDINATOR APIs
// =============================================
export const demoFetchCoordinators = async (filters = {}) => {
    await delay();
    let data = [...DUMMY_COORDINATORS];

    if (filters.school) {
        data = data.filter((c) => c.school === filters.school);
    }
    if (filters.program) {
        data = data.filter((c) => c.program === filters.program);
    }
    if (filters.academicYear) {
        data = data.filter((c) => c.academicYear === filters.academicYear);
    }

    return { success: true, data };
};

export const demoFetchPermissions = async () => {
    await delay();
    const userStr = localStorage.getItem("user");
    if (userStr) {
        try {
            const user = JSON.parse(userStr);
            if (user.role === 'admin') {
                return { success: true, data: { isPrimary: true, permissions: { canEdit: { enabled: true } } } };
            }
            // Return specific permissions for the logged-in coordinator
            if (user.coordinatorDetails) {
                return { success: true, data: user.coordinatorDetails };
            }
        } catch (e) {
            console.error("Error parsing user for permissions", e);
        }
    }
    return { success: false, message: "Permissions not found" };
};

// =============================================
// MASTER DATA APIs
// =============================================
export const demoFetchMasterData = async () => {
    await delay();
    return { success: true, data: DUMMY_MASTER_DATA };
};

export const demoFetchSchools = async () => {
    await delay();
    return { success: true, data: DUMMY_MASTER_DATA.schools };
};

export const demoFetchPrograms = async (school) => {
    await delay();
    let programs = DUMMY_MASTER_DATA.programs;
    if (school) {
        programs = programs.filter((p) => p.school === school);
    }
    return { success: true, data: programs };
};

export const demoFetchAcademicYears = async () => {
    await delay();
    return { success: true, data: DUMMY_MASTER_DATA.academicYears };
};

export const demoFetchSpecializations = async () => {
    await delay();
    return { success: true, data: DUMMY_MASTER_DATA.specializations };
};

// =============================================
// DASHBOARD STATS APIs
// =============================================
export const demoFetchDashboardStats = async (role) => {
    await delay();
    const userType = role || getDemoUserType();

    switch (userType) {
        case "admin":
            return { success: true, data: DUMMY_DASHBOARD_STATS.admin };
        case "coordinator":
            return { success: true, data: DUMMY_DASHBOARD_STATS.coordinator };
        case "faculty":
            return { success: true, data: DUMMY_DASHBOARD_STATS.faculty };
        default:
            return { success: true, data: {} };
    }
};

// =============================================
// REPORTS APIs
// =============================================
export const demoFetchReviewProgress = async (filters = {}) => {
    await delay();

    // Generate review progress based on dummy marks
    const projects = DUMMY_PROJECTS.filter((p) => {
        if (filters.school && p.school !== filters.school) return false;
        if (filters.program && p.program !== filters.program) return false;
        if (filters.academicYear && p.academicYear !== filters.academicYear) return false;
        return true;
    });

    const reviewProgress = {
        review1: {
            total: projects.length * 2, // 2 students per project
            completed: DUMMY_MARKS.filter((m) => m.reviewType === "review1" && m.isSubmitted).length,
            pending: projects.length * 2 - DUMMY_MARKS.filter((m) => m.reviewType === "review1" && m.isSubmitted).length,
        },
        review2: {
            total: projects.length * 2,
            completed: DUMMY_MARKS.filter((m) => m.reviewType === "review2" && m.isSubmitted).length,
            pending: projects.length * 2 - DUMMY_MARKS.filter((m) => m.reviewType === "review2" && m.isSubmitted).length,
        },
        review3: {
            total: projects.length * 2,
            completed: DUMMY_MARKS.filter((m) => m.reviewType === "review3" && m.isSubmitted).length,
            pending: projects.length * 2 - DUMMY_MARKS.filter((m) => m.reviewType === "review3" && m.isSubmitted).length,
        },
    };

    return { success: true, data: reviewProgress };
};

export const demoFetchMarksReport = async (filters = {}) => {
    await delay();

    // Generate marks report for students
    const reports = DUMMY_STUDENTS.map((student) => {
        const studentMarks = DUMMY_MARKS.filter((m) => m.student === student._id);
        const project = DUMMY_PROJECTS.find((p) => p.students.includes(student._id));

        return {
            student: {
                _id: student._id,
                name: student.name,
                regNo: student.regNo,
            },
            project: project
                ? { _id: project._id, name: project.name }
                : null,
            marks: {
                review1: studentMarks.find((m) => m.reviewType === "review1") || null,
                review2: studentMarks.find((m) => m.reviewType === "review2") || null,
                review3: studentMarks.find((m) => m.reviewType === "review3") || null,
            },
            totalMarks: studentMarks.reduce((sum, m) => sum + m.totalMarks, 0),
            maxTotalMarks: studentMarks.reduce((sum, m) => sum + m.maxTotalMarks, 0),
        };
    });

    return { success: true, data: reports };
};

// Export all demo APIs
export default {
    isDemoMode,
    getDemoUserType,
    demoFetchFaculty,
    demoFetchStudents,
    demoFetchProjects,
    demoFetchGuideProjects,
    demoFetchPanelProjects,
    demoFetchPanels,
    demoFetchPanelSummary,
    demoFetchMarkingSchemas,
    demoFetchMarkingSchema,
    demoFetchComponentLibrary,
    demoFetchBroadcasts,
    demoFetchAccessRequests,
    demoFetchFacultyRequests,
    demoFetchMarks,
    demoFetchStudentMarks,
    demoFetchProgramConfigs,
    demoFetchProgramConfig,
    demoFetchCoordinators,
    demoFetchPermissions,
    demoFetchMasterData,
    demoFetchSchools,
    demoFetchPrograms,
    demoFetchAcademicYears,
    demoFetchSpecializations,
    demoFetchDashboardStats,
    demoFetchReviewProgress,
    demoFetchMarksReport,
};
