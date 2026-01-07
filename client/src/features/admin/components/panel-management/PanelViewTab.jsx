// src/features/admin/components/panel-management/PanelViewTab.jsx
import React, { useState, useEffect, useCallback } from "react";
import {
  UsersIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  UserIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import AcademicFilterSelector from "../student-management/AcademicFilterSelector";
import Card from "../../../../shared/components/Card";
import Badge from "../../../../shared/components/Badge";
import EmptyState from "../../../../shared/components/EmptyState";
import LoadingSpinner from "../../../../shared/components/LoadingSpinner";
import { useToast } from "../../../../shared/hooks/useToast";
import { fetchPanels } from "../../../../services/adminApi";
import {
  formatPanelName,
  getMarkingStatusColor,
  getMarkingStatusLabel,
} from "../../utils/panelUtils";

const PanelViewTab = () => {
  const [filters, setFilters] = useState(null);
  const [panels, setPanels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedPanel, setExpandedPanel] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [markingFilter, setMarkingFilter] = useState("all");
  const { showToast } = useToast();

  // Fetch panels when filters change
  useEffect(() => {
    if (filters) {
      fetchPanelsData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const fetchPanelsData = useCallback(async () => {
    try {
      setLoading(true);

      // DUMMY DATA FOR DEMO
      const DUMMY_PANELS = [
        {
          id: "p1",
          panelName: "Panel A - AI & ML Specialization",
          members: [
            { name: "Dr. Sarah Wilson", employeeId: "FAC001", role: "Chair" },
            { name: "Prof. James Chen", employeeId: "FAC002", role: "Member" },
            { name: "Dr. Anita Raj", employeeId: "FAC003", role: "Member" },
          ],
          assignedProjects: 5,
          projects: [
            {
              id: "proj1",
              title: "AI-Based Traffic Management",
              students: ["20BCE001 - John Doe", "20BCE002 - Jane Smith"],
              guide: "Dr. Alan Turing",
            },
            {
              id: "proj2",
              title: "Healthcare Chatbot",
              students: ["20BCE101 - Bob Brown", "20BCE102 - Alice White"],
              guide: "Prof. Grace Hopper",
            },
            {
              id: "proj3",
              title: "Stock Market Prediction",
              students: ["20BCE201 - Charlie Davis"],
              guide: "Dr. Sarah Wilson",
            },
            {
              id: "proj4",
              title: "Face Recognition Attendance",
              students: ["20BCE301 - Eve Black", "20BCE302 - Adam Green"],
              guide: "Dr. Anita Raj",
            },
            {
              id: "proj5",
              title: "Autonomous Drone",
              students: ["20BCE401 - Frank Wright"],
              guide: "Prof. James Chen",
            },
          ],
          markingStatus: "full",
          academicYear: "2023-2024",
          school: "School of Computer Science and Engineering",
          program: "Bachelor of Technology",
        },
        {
          id: "p2",
          panelName: "Panel B - Web Technologies",
          members: [
            { name: "Dr. Robert Brown", employeeId: "FAC004", role: "Chair" },
            { name: "Prof. Emily Davis", employeeId: "FAC005", role: "Member" },
          ],
          assignedProjects: 3,
          projects: [
            {
              id: "proj6",
              title: "E-Commerce Platform",
              students: ["20BCE501 - George Hall", "20BCE502 - Harry King"],
              guide: "Dr. Robert Brown",
            },
            {
              id: "proj7",
              title: "Social Media Dashboard",
              students: ["20BCE601 - Ian Lewis"],
              guide: "Prof. Emily Davis",
            },
            {
              id: "proj8",
              title: "Portfolio Generator",
              students: ["20BCE701 - Jack Moore", "20BCE702 - Kelly Nelson"],
              guide: "Dr. Robert Brown",
            },
          ],
          markingStatus: "partial",
          academicYear: "2023-2024",
          school: "School of Computer Science and Engineering",
          program: "Bachelor of Technology",
        },
        {
          id: "p3",
          panelName: "Panel C - Data Science",
          members: [
            { name: "Dr. Michael Chang", employeeId: "FAC006", role: "Chair" },
            { name: "Prof. Lisa Anderson", employeeId: "FAC007", role: "Member" },
            { name: "Dr. David Kumar", employeeId: "FAC008", role: "Member" },
          ],
          assignedProjects: 0,
          projects: [],
          markingStatus: "none",
          academicYear: "2023-2024",
          school: "School of Computer Science and Engineering",
          program: "Bachelor of Technology",
        },
        {
          id: "p4",
          panelName: "Panel D - Cloud Computing",
          members: [
            { name: "Dr. Patricia White", employeeId: "FAC009", role: "Chair" },
            { name: "Prof. Thomas Green", employeeId: "FAC010", role: "Member" },
          ],
          assignedProjects: 4,
          projects: [
            {
              id: "proj9",
              title: "Cloud File Storage",
              students: ["20BCE801 - Larry Page"],
              guide: "Dr. Patricia White",
            },
            {
              id: "proj10",
              title: "Serverless Chat",
              students: ["20BCE802 - Sergey Brin"],
              guide: "Prof. Thomas Green",
            },
            {
              id: "proj11",
              title: "Distributed Database",
              students: ["20BCE803 - Elon Musk"],
              guide: "Dr. Patricia White",
            },
            {
              id: "proj12",
              title: "Load Balancer Sim",
              students: ["20BCE804 - Bill Gates"],
              guide: "Prof. Thomas Green",
            },
          ],
          markingStatus: "full",
          academicYear: "2023-2024",
          school: "School of Computer Science and Engineering",
          program: "Bachelor of Technology",
        },
        {
          id: "p5",
          panelName: "Panel E - IoT & Embedded Systems",
          members: [
            { name: "Dr. Richard Taylor", employeeId: "FAC011", role: "Chair" },
            { name: "Prof. Susan Martin", employeeId: "FAC012", role: "Member" },
            { name: "Dr. Kevin Lee", employeeId: "FAC013", role: "Member" },
          ],
          assignedProjects: 2,
          projects: [
            {
              id: "proj13",
              title: "Smart Home System",
              students: ["20BCE901 - Mark Z"],
              guide: "Dr. Richard Taylor",
            },
            {
              id: "proj14",
              title: "Agri-Tech Sensor",
              students: ["20BCE902 - Steve J"],
              guide: "Dr. Kevin Lee",
            },
          ],
          markingStatus: "partial",
          academicYear: "2023-2024",
          school: "School of Computer Science and Engineering",
          program: "Bachelor of Technology",
        },
      ];

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 600));

      setPanels(DUMMY_PANELS);
      showToast("Panels loaded successfully (Demo Data)", "success");

      /* 
      // Original logic preserved for reference
      const response = await fetchPanels({
        school: filters.school,
        department: filters.department,
        academicYear: filters.academicYear,
      });

      if (response.success) {
        setPanels(response.panels || []);
        showToast("Panels loaded successfully", "success");
      } else {
        showToast(response.message || "Failed to load panels", "error");
      }
      */
    } catch (error) {
      console.error("Error fetching panels:", error);
      showToast(
        error.response?.data?.message || "Failed to load panels",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }, [filters, showToast]);

  const handleFilterComplete = useCallback((selectedFilters) => {
    setFilters(selectedFilters);
    setSearchQuery("");
    setMarkingFilter("all");
    setExpandedPanel(null);
  }, []);

  const togglePanelExpansion = useCallback((panelId) => {
    setExpandedPanel((prev) => (prev === panelId ? null : panelId));
  }, []);

  // Filter panels
  const filteredPanels = panels.filter((panel) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      formatPanelName(panel).toLowerCase().includes(searchLower) ||
      panel.members?.some(
        (m) =>
          m.name?.toLowerCase().includes(searchLower) ||
          m.employeeId?.toLowerCase().includes(searchLower)
      );

    const matchesMarking =
      markingFilter === "all" || panel.markingStatus === markingFilter;

    return matchesSearch && matchesMarking;
  });

  return (
    <div className="space-y-6">
      {/* Academic Context Selector */}
      <AcademicFilterSelector onFilterComplete={handleFilterComplete} />

      {/* Panel Management Section */}
      {filters && (
        <>
          {/* Search and Filter Controls */}
          <Card>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search panels, faculty, or projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Marking Status Filter */}
              <div className="sm:w-64">
                <div className="relative">
                  <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={markingFilter}
                    onChange={(e) => setMarkingFilter(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  >
                    <option value="all">All Panels</option>
                    <option value="full">Fully Marked</option>
                    <option value="partial">Partially Marked</option>
                    <option value="none">Not Marked</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>

          {/* Panels List */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <LoadingSpinner size="large" />
            </div>
          ) : filteredPanels.length === 0 ? (
            <EmptyState
              icon={UsersIcon}
              title="No panels found"
              description={
                searchQuery || markingFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "No panels have been created for this academic context yet"
              }
            />
          ) : (
            <div className="space-y-4">
              {filteredPanels.map((panel) => (
                <Card key={panel.id} className="overflow-hidden">
                  {/* Panel Header */}
                  <div
                    className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-4 -m-4"
                    onClick={() => togglePanelExpansion(panel.id)}
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <UsersIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {formatPanelName(panel)}
                        </h3>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-gray-600">
                            {panel.members?.length || 0} Faculty
                          </span>
                          <span className="text-sm text-gray-400">•</span>
                          <span className="text-sm text-gray-600">
                            {panel.assignedProjects || 0} Projects
                          </span>
                        </div>
                      </div>
                      <Badge
                        className={getMarkingStatusColor(panel.markingStatus)}
                      >
                        {getMarkingStatusLabel(panel.markingStatus)}
                      </Badge>
                      {expandedPanel === panel.id ? (
                        <ChevronUpIcon className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>

                  {/* Panel Details (Expanded) */}
                  {expandedPanel === panel.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      {/* Faculty List */}
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                          <UserIcon className="w-4 h-4 mr-2" />
                          Panel Members
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {panel.members?.map((member) => (
                            <div
                              key={member.employeeId}
                              className="bg-gray-50 rounded-lg p-3"
                            >
                              <p className="text-sm font-medium text-gray-900">
                                {member.name}
                              </p>
                              <p className="text-xs text-gray-600 mt-1">
                                {member.employeeId} -{" "}
                                <span className="text-xs text-blue-600">
                                  {member.role || "Member"}
                                </span>
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Projects List */}
                      {panel.projects && panel.projects.length > 0 ? (
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                            <DocumentTextIcon className="w-4 h-4 mr-2" />
                            Assigned Projects
                          </h4>
                          <div className="space-y-3">
                            {panel.projects.map((proj) => (
                              <div
                                key={proj.id}
                                className="bg-white border border-gray-200 rounded-lg p-3 hover:border-blue-300 transition-colors"
                              >
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h5 className="text-sm font-semibold text-gray-800">
                                      {proj.title}
                                    </h5>
                                    <div className="text-xs text-gray-500 mt-1">
                                      Students: {proj.students.join(", ")}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      Guide: {proj.guide}
                                    </div>
                                  </div>
                                  <span className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-full">
                                    Project
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-4 text-center">
                          <p className="text-sm text-gray-500">
                            No projects assigned to this panel yet.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PanelViewTab;
