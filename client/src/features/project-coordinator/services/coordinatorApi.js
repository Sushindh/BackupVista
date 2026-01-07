// src/features/project-coordinator/services/coordinatorApi.js
import api from "../../../services/api";
import * as demoApi from "../../../shared/utils/demoApi";
import { isDemoMode } from "../../../shared/utils/demoApi";

/**
 * Project Coordinator API Service
 * Handles all API calls for coordinator features with data adapters
 * Backend is the source of truth
 */

// ==================== Data Adapters ====================

const adaptStudent = (backendStudent) => {
  if (!backendStudent) return null;
  return {
    _id: backendStudent._id,
    regNo: backendStudent.regNo,
    name: backendStudent.name,
    email: backendStudent.emailId,
    emailId: backendStudent.emailId,
    school: backendStudent.school,
    department: backendStudent.department,
    academicYear: backendStudent.academicYear,
    PAT: backendStudent.PAT || false,
    isActive: backendStudent.isActive !== false,
    project: backendStudent.project,
    approvals: backendStudent.approvals || {},
  };
};

const adaptFaculty = (backendFaculty) => {
  if (!backendFaculty) return null;
  return {
    _id: backendFaculty._id,
    employeeId: backendFaculty.employeeId,
    name: backendFaculty.name,
    email: backendFaculty.emailId,
    emailId: backendFaculty.emailId,
    school: backendFaculty.school,
    department: backendFaculty.department,
    role: backendFaculty.role,
    specialization: backendFaculty.specialization,
    phoneNumber: backendFaculty.phoneNumber,
    isActive: backendFaculty.isActive !== false,
    projects: backendFaculty.projects || [],
  };
};

const adaptProject = (backendProject) => {
  if (!backendProject) return null;
  return {
    _id: backendProject._id,
    name: backendProject.name,
    type: backendProject.type || "Capstone Project",
    specialization: backendProject.specialization,
    school: backendProject.school,
    department: backendProject.department,
    academicYear: backendProject.academicYear,
    status: backendProject.status || "active",
    teamMembers: backendProject.students?.map((s) => ({
      _id: s._id,
      regNo: s.regNo,
      name: s.name,
      email: s.emailId,
    })) || [],
    guide: backendProject.guideFaculty
      ? {
        _id: backendProject.guideFaculty._id,
        name: backendProject.guideFaculty.name,
        employeeId: backendProject.guideFaculty.employeeId,
      }
      : null,
    panel: backendProject.panel || null,
    createdAt: backendProject.createdAt,
    updatedAt: backendProject.updatedAt,
  };
};

const adaptPanel = (backendPanel) => {
  if (!backendPanel) return null;
  const members = backendPanel.members?.map((m) => ({
    _id: m.faculty?._id || m._id,
    employeeId: m.faculty?.employeeId || m.employeeId,
    name: m.faculty?.name || m.name,
    email: m.faculty?.emailId || m.email,
  })) || [];

  return {
    _id: backendPanel._id,
    id: backendPanel._id, // Ensure id is also present
    members: members,
    faculty: members, // Alias for UI components expecting 'faculty'
    panelNumber: backendPanel.panelName?.split('-').pop() || backendPanel._id, // Extract number from name
    panelName: backendPanel.panelName,
    academicYear: backendPanel.academicYear,
    school: backendPanel.school,
    department: backendPanel.department,
    isActive: backendPanel.isActive !== false,
    assignedProjects: backendPanel.assignedProjects || 0,
    teams: backendPanel.projects || [], // Add projects/teams if available
    markingStatus: backendPanel.markingStatus || 'none'
  };
};

// ==================== Student Management APIs ====================

export const fetchStudents = async (filters = {}) => {
  if (isDemoMode()) return demoApi.demoFetchStudents(filters);
  const response = await api.get("/coordinator/students", { params: filters });
  if (response.data.success) {
    return {
      success: true,
      students: response.data.data.map(adaptStudent),
    };
  }
  return response.data;
};

export const fetchStudentDetails = async (regNo) => {
  if (isDemoMode()) {
    // Mock detail fetch usually reuses list fetch in demo
    return { success: false, message: "Detail view not fully mocked" };
  }
  const response = await api.get(`/coordinator/student/${regNo}`);
  if (response.data.success) {
    return {
      success: true,
      student: adaptStudent(response.data.data),
    };
  }
  return response.data;
};

export const createStudent = async (studentData) => {
  if (isDemoMode()) return { success: true, message: "Student created (Demo)" };
  const response = await api.post("/coordinator/student", studentData);
  return response.data;
};

export const bulkUploadStudents = async (students) => {
  if (isDemoMode()) return { success: true, message: `Uploaded ${students.length} students (Demo)` };
  const response = await api.post("/coordinator/student/bulk", { students });
  return response.data;
};

export const updateStudent = async (regNo, data) => {
  if (isDemoMode()) return { success: true, message: "Student updated (Demo)" };
  const response = await api.put(`/coordinator/student/${regNo}`, data);
  return response.data;
};

export const deleteStudent = async (regNo) => {
  if (isDemoMode()) return { success: true, message: "Student deleted (Demo)" };
  const response = await api.delete(`/coordinator/student/${regNo}`);
  return response.data;
};

// ==================== Faculty Management APIs ====================

export const fetchFaculty = async (filters = {}) => {
  if (isDemoMode()) return demoApi.demoFetchFaculty(filters);
  const response = await api.get("/coordinator/faculty", { params: filters });
  if (response.data.success) {
    return {
      success: true,
      faculty: response.data.data.map(adaptFaculty),
    };
  }
  return response.data;
};

export const createFaculty = async (facultyData) => {
  if (isDemoMode()) return { success: true, message: "Faculty created (Demo)" };
  const response = await api.post("/coordinator/faculty", facultyData);
  return response.data;
};

export const bulkCreateFaculty = async (facultyList) => {
  if (isDemoMode()) return { success: true, message: "Faculty bulk created (Demo)" };
  const response = await api.post("/coordinator/faculty/bulk", { faculty: facultyList });
  return response.data;
};

export const updateFaculty = async (employeeId, data) => {
  if (isDemoMode()) return { success: true, message: "Faculty updated (Demo)" };
  const response = await api.put(`/coordinator/faculty/${employeeId}`, data);
  return response.data;
};

export const deleteFaculty = async (employeeId) => {
  if (isDemoMode()) return { success: true, message: "Faculty deleted (Demo)" };
  const response = await api.delete(`/coordinator/faculty/${employeeId}`);
  return response.data;
};

// ==================== Project Management APIs ====================

export const fetchProjects = async (filters = {}) => {
  if (isDemoMode()) return demoApi.demoFetchProjects(filters);
  const response = await api.get("/coordinator/projects", { params: filters });
  if (response.data.success) {
    return {
      success: true,
      projects: response.data.data.map(adaptProject),
    };
  }
  return response.data;
};

export const createProject = async (projectData) => {
  if (isDemoMode()) return { success: true, message: "Project created (Demo)" };
  const payload = {
    name: projectData.name,
    students: projectData.teamMembers || [],
    guideFacultyEmpId: projectData.guideFacultyEmpId,
    specialization: projectData.specialization || "",
    type: projectData.type || "Capstone Project",
    school: projectData.school,
    department: projectData.department,
    academicYear: projectData.academicYear,
  };
  const response = await api.post("/coordinator/projects", payload);
  return response.data;
};

export const bulkCreateProjects = async (projectsList) => {
  if (isDemoMode()) return { success: true, message: "Projects bulk created (Demo)" };
  const projects = projectsList.map((project) => ({
    name: project.name,
    students: project.teamMembers || [],
    guideFacultyEmpId: project.guideFacultyEmpId,
    specialization: project.specialization || "",
    type: project.type || "Capstone Project",
    school: project.school,
    department: project.department,
    academicYear: project.academicYear,
  }));
  const response = await api.post("/coordinator/projects/bulk", { projects });
  return response.data;
};

export const fetchProjectMarks = async (projectId) => {
  if (isDemoMode()) return { success: true, marks: [] };
  const response = await api.get(`/coordinator/projects/${projectId}/marks`);
  return response.data;
};

// ==================== Panel Management APIs ====================

export const fetchPanels = async (filters = {}) => {
  try {
    if (isDemoMode()) {
      console.log('Fetching panels in demo mode');
      const result = await demoApi.demoFetchPanels(filters);

      if (result.success && result.panels) {
        return {
          success: true,
          panels: result.panels.map(adaptPanel)
        };
      }
      return result;
    }
    const response = await api.get("/coordinator/panels", { params: filters });
    if (response.data.success) {
      return {
        success: true,
        panels: response.data.data.map(adaptPanel),
      };
    }
    return response.data;
  } catch (error) {
    console.error("Error in fetchPanels:", error);
    throw error;
  }
};

export const createPanel = async (panelData) => {
  if (isDemoMode()) return { success: true, message: "Panel created (Demo)" };
  const response = await api.post("/coordinator/panels", panelData);
  return response.data;
};

export const bulkCreatePanels = async (panelsList) => {
  if (isDemoMode()) return { success: true, message: "Panels bulk created (Demo)" };
  const response = await api.post("/coordinator/panels/bulk", { panels: panelsList });
  return response.data;
};

export const autoCreatePanels = async (data) => {
  if (isDemoMode()) return { success: true, message: "Auto-create simulation completed" };
  const response = await api.post("/coordinator/panels/auto-create", data);
  return response.data;
};

export const assignPanelToProject = async ({ projectId, panelId }) => {
  if (isDemoMode()) return { success: true, message: "Panel assigned (Demo)" };
  const response = await api.post("/coordinator/projects/assign-panel", { projectId, panelId });
  return response.data;
};

export const autoAssignPanels = async (filters) => {
  if (isDemoMode()) return { success: true, message: "Auto-assign properties simulated" };
  const response = await api.post("/coordinator/panels/auto-assign", filters);
  return response.data;
};

export const fetchPanelSummary = async (filters = {}) => {
  if (isDemoMode()) return demoApi.demoFetchPanelSummary(filters);
  const response = await api.get("/coordinator/panels/summary", { params: filters });
  return response.data;
};

export const fetchFacultyDetailsBulk = async (employeeIds) => {
  if (isDemoMode()) return { success: true, data: [] }; // difficult to mock without more logic
  const response = await api.post("/coordinator/faculty/details-bulk", { employeeIds });
  return response.data;
};

// ==================== Request Management APIs ====================

export const fetchRequests = async (filters = {}) => {
  if (isDemoMode()) return demoApi.demoFetchAccessRequests(filters); // Using access requests as placeholder or faculty requests
  // Actually coordinator/requests probably returns faculty requests TO the coordinator
  if (isDemoMode()) return demoApi.demoFetchFacultyRequests(filters);

  const response = await api.get("/coordinator/requests", { params: filters });
  if (response.data.success) {
    return {
      success: true,
      requests: response.data.data,
    };
  }
  return response.data;
};

export const approveRequest = async (requestId, remarks = "") => {
  if (isDemoMode()) return { success: true, message: "Request approved (Demo)" };
  const response = await api.put(`/coordinator/requests/${requestId}/status`, {
    status: "approved",
    remarks,
  });
  return response.data;
};

export const rejectRequest = async (requestId, remarks = "") => {
  if (isDemoMode()) return { success: true, message: "Request rejected (Demo)" };
  const response = await api.put(`/coordinator/requests/${requestId}/status`, {
    status: "rejected",
    remarks,
  });
  return response.data;
};

export const approveMultipleRequests = async (requestIds, remarks = "") => {
  if (isDemoMode()) return { success: true, message: "Requests approved (Demo)" };
  const response = await api.post("/coordinator/requests/approve-multiple", {
    requestIds,
    remarks,
  });
  return response.data;
};

// ==================== Master Data APIs ====================

export const fetchAcademicYears = async () => {
  if (isDemoMode()) return demoApi.demoFetchAcademicYears();
  const response = await api.get("/coordinator/academic-years");
  return response.data;
};

export const fetchDepartments = async () => {
  if (isDemoMode()) return { success: true, data: ["CSE", "IT", "ECE"] }; // simple mock
  const response = await api.get("/coordinator/departments");
  return response.data;
};

export const requestAccess = async (data) => {
  if (isDemoMode()) return { success: true, message: "Access requested (Demo)" };
  const response = await api.post("/coordinator/request-access", data);
  return response.data;
};

export const fetchPermissions = async () => {
  if (isDemoMode()) return demoApi.demoFetchPermissions();
  const response = await api.get("/coordinator/permissions");
  return response.data;
};

// Export all functions
export default {
  fetchStudents,
  fetchStudentDetails,
  createStudent,
  bulkUploadStudents,
  updateStudent,
  deleteStudent,
  fetchFaculty,
  createFaculty,
  bulkCreateFaculty,
  updateFaculty,
  deleteFaculty,
  fetchProjects,
  createProject,
  bulkCreateProjects,
  fetchProjectMarks,
  fetchPanels,
  createPanel,
  bulkCreatePanels,
  autoCreatePanels,
  assignPanelToProject,
  autoAssignPanels,
  fetchPanelSummary,
  fetchFacultyDetailsBulk,
  fetchRequests,
  approveRequest,
  rejectRequest,
  approveMultipleRequests,
  fetchAcademicYears,
  fetchDepartments,
  requestAccess,
  fetchPermissions,
};
