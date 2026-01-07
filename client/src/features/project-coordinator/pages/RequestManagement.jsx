// src/features/project-coordinator/pages/RequestManagement.jsx
import React, { useState, useEffect, useMemo, useCallback } from "react";
import Navbar from "../../../shared/components/Navbar";
import CoordinatorTabs from "../components/shared/CoordinatorTabs";
import AcademicFilterSelector from "../components/shared/AcademicFilterSelector";
import Card from "../../../shared/components/Card";
import Button from "../../../shared/components/Button";
import Badge from "../../../shared/components/Badge";
import Modal from "../../../shared/components/Modal";
import Select from "../../../shared/components/Select";
import { useToast } from "../../../shared/hooks/useToast";
import { useAuth } from "../../../shared/hooks/useAuth";
import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  UserIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  CalendarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import {
  fetchRequests,
  approveRequest,
  rejectRequest,
  approveMultipleRequests,
} from "../services/coordinatorApi";

const REQUEST_TYPE_CONFIG = {
  deadline_extension: {
    label: "Deadline Extension",
    icon: CalendarIcon,
    color: "blue",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    borderColor: "border-blue-200",
  },
  mark_edit: {
    label: "Mark Edit",
    icon: DocumentTextIcon,
    color: "orange",
    bgColor: "bg-orange-50",
    textColor: "text-orange-700",
    borderColor: "border-orange-200",
  },
  resubmission: {
    label: "Resubmission",
    icon: ExclamationTriangleIcon,
    color: "purple",
    bgColor: "bg-purple-50",
    textColor: "text-purple-700",
    borderColor: "border-purple-200",
  },
};

const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    variant: "warning",
    icon: ClockIcon,
  },
  approved: {
    label: "Approved",
    variant: "success",
    icon: CheckCircleIcon,
  },
  rejected: {
    label: "Rejected",
    variant: "danger",
    icon: XCircleIcon,
  },
};

const RequestItem = ({ request, onApprove, onReject }) => {
  const typeConfig =
    REQUEST_TYPE_CONFIG[request.requestType] ||
    REQUEST_TYPE_CONFIG.deadline_extension;
  const statusConfig = STATUS_CONFIG[request.status];
  const TypeIcon = typeConfig.icon;
  const StatusIcon = statusConfig.icon;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div
      className={`p-6 rounded-lg border-2 ${typeConfig.borderColor} ${typeConfig.bgColor} transition-all hover:shadow-md`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-lg bg-white border ${typeConfig.borderColor}`}
            >
              <TypeIcon className={`h-5 w-5 ${typeConfig.textColor}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-gray-900 text-lg">
                  {typeConfig.label}
                </h4>
                <Badge
                  variant={statusConfig.variant}
                  className="flex items-center gap-1"
                >
                  <StatusIcon className="h-3 w-3" />
                  {statusConfig.label}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Review: {request.reviewType}</span>
                <span>•</span>
                <span>Submitted: {formatDate(request.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Student & Project Info */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Student
                </p>
                <p className="font-semibold text-gray-900">
                  {request.studentName}
                </p>
                <p className="text-sm text-gray-600">{request.studentRegNo}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Project
                </p>
                <p className="font-semibold text-gray-900">
                  {request.projectName}
                </p>
              </div>
            </div>
          </div>

          {/* Request Reason */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              Reason
            </p>
            <p className="text-gray-700 leading-relaxed">{request.reason}</p>
          </div>

          {/* Resolution Details */}
          {request.status !== "pending" && (
            <div
              className={`rounded-lg p-4 border ${
                request.status === "approved"
                  ? "bg-green-50 border-green-200"
                  : "bg-red-50 border-red-200"
              }`}
            >
              <p
                className={`text-xs font-medium uppercase tracking-wide mb-2 ${
                  request.status === "approved"
                    ? "text-green-700"
                    : "text-red-700"
                }`}
              >
                {request.status === "approved" ? "Approval" : "Rejection"}{" "}
                Details
              </p>
              <p
                className={`leading-relaxed ${
                  request.status === "approved"
                    ? "text-green-800"
                    : "text-red-800"
                }`}
              >
                {request.remarks ||
                  (request.status === "approved"
                    ? request.approvalReason
                    : request.rejectionReason)}
              </p>
              {request.resolvedAt && (
                <p
                  className={`text-xs mt-2 ${
                    request.status === "approved"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  Resolved on {formatDate(request.resolvedAt)}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {request.status === "pending" && (
          <div className="flex flex-col gap-2 min-w-[120px]">
            <Button
              variant="primary"
              size="sm"
              onClick={() => onApprove(request._id)}
              className="w-full text-sm font-medium"
            >
              <CheckCircleIcon className="h-4 w-4 mr-1" />
              Approve
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onReject(request._id)}
              className="w-full text-sm font-medium"
            >
              <XCircleIcon className="h-4 w-4 mr-1" />
              Reject
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const FacultyGroup = ({
  faculty,
  requests,
  onApprove,
  onReject,
  onApproveAll,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const pendingCount = requests.filter((r) => r.status === "pending").length;
  const approvedCount = requests.filter((r) => r.status === "approved").length;
  const rejectedCount = requests.filter((r) => r.status === "rejected").length;

  return (
    <Card className="overflow-hidden">
      {/* Faculty Header */}
      <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="p-3 bg-white rounded-xl border border-blue-200 shadow-sm">
              <UserIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {faculty.name}
              </h3>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <AcademicCapIcon className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">{faculty.school}</span>
                </div>
                <div className="flex items-center gap-1">
                  <UserGroupIcon className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">{faculty.program}</span>
                </div>
                <span className="text-gray-500">•</span>
                <span className="text-gray-700 font-medium">
                  {requests.length} request{requests.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>

          {/* Status Summary & Actions */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              {pendingCount > 0 && (
                <Badge
                  variant="warning"
                  className="text-sm font-medium px-3 py-1"
                >
                  {pendingCount} Pending
                </Badge>
              )}
              {approvedCount > 0 && (
                <Badge
                  variant="success"
                  className="text-sm font-medium px-3 py-1"
                >
                  {approvedCount} Approved
                </Badge>
              )}
              {rejectedCount > 0 && (
                <Badge
                  variant="danger"
                  className="text-sm font-medium px-3 py-1"
                >
                  {rejectedCount} Rejected
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-2">
              {pendingCount > 0 && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() =>
                    onApproveAll(
                      faculty.id,
                      requests.filter((r) => r.status === "pending")
                    )
                  }
                  className="font-medium"
                >
                  Approve All ({pendingCount})
                </Button>
              )}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                aria-label={isExpanded ? "Collapse" : "Expand"}
              >
                {isExpanded ? (
                  <ChevronUpIcon className="h-5 w-5 text-gray-600" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Request List */}
      {isExpanded && (
        <div className="p-6">
          {(() => {
            const pendingRequests = requests.filter(
              (r) => r.status === "pending"
            );
            const completedRequests = requests.filter(
              (r) => r.status !== "pending"
            );

            return (
              <>
                {/* Pending Requests */}
                {pendingRequests.length > 0 && (
                  <div className="space-y-4">
                    {pendingRequests.map((request) => (
                      <RequestItem
                        key={request._id}
                        request={request}
                        onApprove={onApprove}
                        onReject={onReject}
                      />
                    ))}
                  </div>
                )}

                {/* Separator and Completed Requests */}
                {pendingRequests.length > 0 && completedRequests.length > 0 && (
                  <div className="my-6 border-t border-gray-200 pt-6">
                    <h4 className="text-sm font-medium text-gray-500 mb-4 flex items-center gap-2">
                      <CheckCircleIcon className="h-4 w-4" />
                      Completed Requests
                    </h4>
                  </div>
                )}

                {/* Completed Requests */}
                {completedRequests.length > 0 && (
                  <div
                    className={`space-y-4 opacity-75 ${
                      pendingRequests.length > 0 ? "" : "mt-0"
                    }`}
                  >
                    {completedRequests.map((request) => (
                      <div key={request._id} className="bg-gray-50 rounded-lg">
                        <RequestItem
                          request={request}
                          onApprove={onApprove}
                          onReject={onReject}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </>
            );
          })()}
        </div>
      )}
    </Card>
  );
};

const RequestManagement = () => {
  const { showToast } = useToast();
  const { user } = useAuth();

  const [academicContext, setAcademicContext] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    requestType: "",
  });

  // Modal states
  const [approveAllModal, setApproveAllModal] = useState({
    isOpen: false,
    faculty: null,
    requests: [],
    reason: "",
  });
  const [globalApproveModal, setGlobalApproveModal] = useState({
    isOpen: false,
    reason: "",
  });

  // Function to load requests
  const loadRequests = useCallback(async () => {
    try {
      setLoading(true);

      const response = await fetchRequests({
        school: user.school,
        department: user.department,
        academicYear: academicContext.year,
        ...filters,
      });

      if (response.success) {
        setRequests(response.requests || []);
      } else {
        showToast(response.message || "Failed to load requests", "error");
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
      showToast("Failed to load requests", "error");
    } finally {
      setLoading(false);
    }
  }, [
    user?.school,
    user?.department,
    academicContext?.year,
    filters,
    showToast,
  ]);

  // Load requests when academic context or filters change
  useEffect(() => {
    if (academicContext && user?.school && user?.department) {
      loadRequests();
    }
  }, [academicContext, user?.school, user?.department, loadRequests]);

  // Early return if user is not loaded yet
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <CoordinatorTabs />
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Card>
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-lg text-gray-600">Loading user data...</p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Group requests by faculty and sort by status (pending first, then approved/rejected)
  const facultyGroups = useMemo(() => {
    const grouped = {};

    requests.forEach((request) => {
      const facultyId = request.faculty || request.facultyId;
      if (!grouped[facultyId]) {
        grouped[facultyId] = {
          id: facultyId,
          name: request.facultyName,
          school: request.school,
          program: request.program,
          requests: [],
        };
      }
      grouped[facultyId].requests.push(request);
    });

    // Sort requests within each faculty group: pending first, then approved/rejected
    Object.values(grouped).forEach((group) => {
      group.requests.sort((a, b) => {
        if (a.status === "pending" && b.status !== "pending") return -1;
        if (a.status !== "pending" && b.status === "pending") return 1;
        // Within same status, sort by creation date (newest first)
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    });

    return Object.values(grouped);
  }, [requests]);

  // Since filters are now applied at API level, just use facultyGroups directly
  const filteredGroups = facultyGroups;

  // Statistics
  const stats = useMemo(() => {
    const allRequests = requests;
    return {
      total: allRequests.length,
      pending: allRequests.filter((r) => r.status === "pending").length,
      approved: allRequests.filter((r) => r.status === "approved").length,
      rejected: allRequests.filter((r) => r.status === "rejected").length,
    };
  }, [requests]);

  const handleApprove = async (requestId) => {
    try {
      const response = await approveRequest(
        requestId,
        "Approved by coordinator"
      );

      if (response.success) {
        setRequests((prev) =>
          prev.map((req) =>
            req._id === requestId
              ? {
                  ...req,
                  status: "approved",
                  resolvedAt: new Date().toISOString(),
                }
              : req
          )
        );
        showToast("Request approved successfully", "success");
      } else {
        showToast(response.message || "Failed to approve request", "error");
      }
    } catch (error) {
      showToast("Failed to approve request", "error");
    }
  };

  const handleReject = async (requestId) => {
    const reason = window.prompt("Please provide a reason for rejection:");
    if (!reason?.trim()) return;

    try {
      const response = await rejectRequest(requestId, reason);

      if (response.success) {
        setRequests((prev) =>
          prev.map((req) =>
            req._id === requestId
              ? {
                  ...req,
                  status: "rejected",
                  rejectionReason: reason,
                  resolvedAt: new Date().toISOString(),
                }
              : req
          )
        );
        showToast("Request rejected", "success");
      } else {
        showToast(response.message || "Failed to reject request", "error");
      }
    } catch (error) {
      showToast("Failed to reject request", "error");
    }
  };

  const handleApproveAllForFaculty = async () => {
    const { reason, requests: pendingRequests } = approveAllModal;

    if (!reason.trim()) {
      showToast("Please provide a reason for approval", "error");
      return;
    }

    try {
      const requestIds = pendingRequests.map((r) => r._id);
      const response = await approveMultipleRequests(requestIds, reason);

      if (response.success) {
        setRequests((prev) =>
          prev.map((req) =>
            requestIds.includes(req._id)
              ? {
                  ...req,
                  status: "approved",
                  approvalReason: reason,
                  resolvedAt: new Date().toISOString(),
                }
              : req
          )
        );

        showToast(
          `Approved ${requestIds.length} requests for ${approveAllModal.faculty.name}`,
          "success"
        );
        setApproveAllModal({
          isOpen: false,
          faculty: null,
          requests: [],
          reason: "",
        });
      } else {
        showToast(response.message || "Failed to approve requests", "error");
      }
    } catch (error) {
      showToast("Failed to approve requests", "error");
    }
  };

  const handleGlobalApproveAll = async () => {
    const { reason } = globalApproveModal;

    if (!reason.trim()) {
      showToast("Please provide a reason for approval", "error");
      return;
    }

    try {
      const allPendingRequests = requests.filter((r) => r.status === "pending");
      const requestIds = allPendingRequests.map((r) => r._id);

      const response = await approveMultipleRequests(requestIds, reason);

      if (response.success) {
        setRequests((prev) =>
          prev.map((req) =>
            requestIds.includes(req._id)
              ? {
                  ...req,
                  status: "approved",
                  approvalReason: reason,
                  resolvedAt: new Date().toISOString(),
                }
              : req
          )
        );

        showToast(
          `Approved all ${requestIds.length} pending requests`,
          "success"
        );
        setGlobalApproveModal({ isOpen: false, reason: "" });
      } else {
        showToast(response.message || "Failed to approve requests", "error");
      }
    } catch (error) {
      showToast("Failed to approve requests", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CoordinatorTabs />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Request Management
          </h1>
          <p className="text-lg text-gray-600">
            Review and manage faculty requests for deadline extensions, mark
            edits, and resubmissions
          </p>
        </div>

        {/* Academic Filter */}
        <div className="mb-6">
          <AcademicFilterSelector
            onFilterComplete={setAcademicContext}
            className="max-w-md"
          />
        </div>

        {academicContext ? (
          <>
            {/* Statistics & Global Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
              <Card className="lg:col-span-4">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Request Overview
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {stats.total}
                      </div>
                      <div className="text-sm text-gray-600">
                        Total Requests
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {stats.pending}
                      </div>
                      <div className="text-sm text-gray-600">Pending</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {stats.approved}
                      </div>
                      <div className="text-sm text-gray-600">Approved</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">
                        {stats.rejected}
                      </div>
                      <div className="text-sm text-gray-600">Rejected</div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Quick Actions
                  </h4>
                  {stats.pending > 0 ? (
                    <Button
                      variant="primary"
                      onClick={() =>
                        setGlobalApproveModal({ isOpen: true, reason: "" })
                      }
                      className="w-full font-medium"
                    >
                      Approve All
                      <br />
                      <span className="text-sm">({stats.pending} pending)</span>
                    </Button>
                  ) : (
                    <div className="text-sm text-gray-500">
                      No pending requests
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Filters */}
            <Card className="mb-6">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Filters
                  </h3>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setFilters({ status: "", requestType: "" })}
                  >
                    Clear All
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <Select
                      value={filters.status}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          status: e.target.value,
                        }))
                      }
                      options={[
                        { value: "", label: "All Status" },
                        { value: "pending", label: "Pending" },
                        { value: "approved", label: "Approved" },
                        { value: "rejected", label: "Rejected" },
                      ]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Request Type
                    </label>
                    <Select
                      value={filters.requestType}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          requestType: e.target.value,
                        }))
                      }
                      options={[
                        { value: "", label: "All Types" },
                        {
                          value: "deadline_extension",
                          label: "Deadline Extension",
                        },
                        { value: "mark_edit", label: "Mark Edit" },
                        { value: "resubmission", label: "Resubmission" },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Request List */}
            {loading ? (
              <Card>
                <div className="p-12 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-lg text-gray-600">Loading requests...</p>
                </div>
              </Card>
            ) : filteredGroups.length === 0 ? (
              <Card>
                <div className="p-12 text-center">
                  <DocumentTextIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Requests Found
                  </h3>
                  <p className="text-gray-600">
                    {requests.length === 0
                      ? "No requests have been submitted for this academic context."
                      : "No requests match your current filter criteria."}
                  </p>
                </div>
              </Card>
            ) : (
              <div className="space-y-6">
                {filteredGroups.map((faculty) => (
                  <FacultyGroup
                    key={faculty.id}
                    faculty={faculty}
                    requests={faculty.requests}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    onApproveAll={(facultyId, pendingRequests) =>
                      setApproveAllModal({
                        isOpen: true,
                        faculty: faculty,
                        requests: pendingRequests,
                        reason: "",
                      })
                    }
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <Card>
            <div className="p-12 text-center">
              <AcademicCapIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Select Academic Context
              </h3>
              <p className="text-gray-600">
                Please select an academic year and semester to view requests.
              </p>
            </div>
          </Card>
        )}

        {/* Approve All Faculty Modal */}
        <Modal
          isOpen={approveAllModal.isOpen}
          onClose={() =>
            setApproveAllModal({
              isOpen: false,
              faculty: null,
              requests: [],
              reason: "",
            })
          }
          title={`Approve All Requests for ${approveAllModal.faculty?.name}`}
        >
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800 mb-3">
                You are about to approve{" "}
                <strong>{approveAllModal.requests.length}</strong> pending
                request{approveAllModal.requests.length !== 1 ? "s" : ""}:
              </p>
              <div className="space-y-2">
                {approveAllModal.requests.map((req) => (
                  <div
                    key={req._id}
                    className="flex items-center gap-2 text-sm text-blue-700"
                  >
                    <CheckCircleIcon className="h-4 w-4 shrink-0" />
                    <span>
                      {req.studentName} -{" "}
                      {REQUEST_TYPE_CONFIG[req.requestType]?.label ||
                        req.requestType}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Approval Reason <span className="text-red-500">*</span>
              </label>
              <textarea
                value={approveAllModal.reason}
                onChange={(e) =>
                  setApproveAllModal((prev) => ({
                    ...prev,
                    reason: e.target.value,
                  }))
                }
                rows={3}
                placeholder="Please provide a reason for approving all these requests..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="secondary"
                onClick={() =>
                  setApproveAllModal({
                    isOpen: false,
                    faculty: null,
                    requests: [],
                    reason: "",
                  })
                }
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleApproveAllForFaculty}
                disabled={!approveAllModal.reason.trim()}
              >
                Approve All {approveAllModal.requests.length} Requests
              </Button>
            </div>
          </div>
        </Modal>

        {/* Global Approve All Modal */}
        <Modal
          isOpen={globalApproveModal.isOpen}
          onClose={() => setGlobalApproveModal({ isOpen: false, reason: "" })}
          title="Approve All Pending Requests"
        >
          <div className="space-y-4">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-sm text-orange-800">
                ⚠️ <strong>Important:</strong> You are about to approve{" "}
                <strong>ALL {stats.pending} pending requests</strong> from all
                faculty members. This action cannot be undone.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Approval Reason <span className="text-red-500">*</span>
              </label>
              <textarea
                value={globalApproveModal.reason}
                onChange={(e) =>
                  setGlobalApproveModal((prev) => ({
                    ...prev,
                    reason: e.target.value,
                  }))
                }
                rows={3}
                placeholder="Please provide a reason for approving all pending requests..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="secondary"
                onClick={() =>
                  setGlobalApproveModal({ isOpen: false, reason: "" })
                }
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleGlobalApproveAll}
                disabled={!globalApproveModal.reason.trim()}
                className="bg-orange-600 hover:bg-orange-700"
              >
                Approve All {stats.pending} Requests
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default RequestManagement;
