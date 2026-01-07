import { useState, useEffect } from 'react';
import {
    MOCK_MARKING_SCHEMA,
    MOCK_PROJECTS,
    MOCK_MARKS,
    MOCK_FACULTY
} from '../../../shared/utils/largeMockData';
import { isDeadlinePassed, isReviewActive } from '../../../shared/utils/dateHelpers';

export const useFacultyReviews = (facultyId = 'fac001') => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoading(true);
                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 800));

                // 1. Get Schema Reviews
                const schemaReviews = MOCK_MARKING_SCHEMA.reviews;

                // 2. Build Reviews with Teams
                const constructedReviews = schemaReviews.map(schemaReview => {
                    // Find projects assigned to this faculty
                    const relevantProjects = MOCK_PROJECTS.filter(p => {
                        // Check if faculty is guide or in panel
                        // Handle potential undefined objects safely
                        const isGuide = p.guideFaculty?._id === facultyId || p.guideFaculty === facultyId;
                        const isPanel = p.panel?.members?.some(m => m.faculty === facultyId || m.facultyEmployeeId === facultyId);
                        return isGuide || isPanel;
                    });

                    // Map projects to "teams" format expected by UI
                    const teams = relevantProjects.map(proj => {
                        const marksForReview = MOCK_MARKS.find(m =>
                            m.project === proj._id &&
                            m.reviewType === schemaReview.reviewName &&
                            m.isSubmitted
                        );

                        return {
                            id: proj._id,
                            team_id: proj._id,
                            name: `Team ${proj.name?.substring(0, 15) || 'Unknown'}...`,
                            projectTitle: proj.name || 'Untitled Project',
                            students: proj.students ? proj.students.map(s => ({
                                student_id: s._id,
                                student_name: s.name,
                                roll_no: s.regNo
                            })) : [],
                            marksEntered: !!marksForReview,
                            totalMarks: marksForReview ? marksForReview.totalMarks : 0
                        };
                    });

                    // Safe date conversion
                    const toIsoString = (dateVal) => {
                        if (!dateVal) return new Date().toISOString();
                        if (dateVal instanceof Date) return dateVal.toISOString();
                        return String(dateVal);
                    };

                    const startDate = toIsoString(schemaReview.deadline?.from);
                    const endDate = toIsoString(schemaReview.deadline?.to);

                    return {
                        id: schemaReview.reviewName,
                        review_id: schemaReview.reviewName,
                        name: schemaReview.displayName || schemaReview.reviewName,
                        startDate: startDate,
                        endDate: endDate,
                        type: schemaReview.facultyType,
                        rubric_structure: schemaReview.components?.map(c => {
                            // Transform subComponents into levels for the marking interface
                            // Create a granular scale from 0 to maxMarks
                            const levels = [];
                            const maxMarks = c.maxMarks || 10;

                            // Generate levels based on subComponents if they exist
                            if (c.subComponents && c.subComponents.length > 0) {
                                // Use subComponents to create meaningful levels
                                c.subComponents.forEach((sub, idx) => {
                                    const score = sub.maxMarks || Math.ceil(maxMarks / c.subComponents.length);
                                    levels.push({
                                        score: score,
                                        label: sub.title || `Level ${idx + 1}`,
                                        description: sub.description || ''
                                    });
                                });
                            } else {
                                // Fallback: Create a simple 0-maxMarks scale
                                for (let i = 0; i <= maxMarks; i++) {
                                    levels.push({
                                        score: i,
                                        label: i === 0 ? 'None' : i === maxMarks ? 'Perfect' : i < maxMarks / 2 ? 'Basic' : 'Good',
                                        description: `${i} out of ${maxMarks} marks`
                                    });
                                }
                            }

                            return {
                                rubric_id: c.componentId,
                                component_name: c.name,
                                component_description: c.description || `Evaluate ${c.name}`,
                                max_marks: maxMarks,
                                levels: levels
                            };
                        }) || [],
                        teams: teams
                    };
                });

                setReviews(constructedReviews);
                setError(null);
            } catch (err) {
                console.error('Error fetching reviews:', err);
                setError('Failed to load reviews');
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [facultyId]);

    // Helper to check if a team is fully marked
    const isAllTeamsMarked = (review) => {
        return review.teams?.length > 0 && review.teams.every(team => team.marksEntered);
    };

    // Derived state: Categorize reviews
    const active = reviews.filter(r => isReviewActive(r.startDate, r.endDate) && !isAllTeamsMarked(r));

    const deadlinePassed = reviews.filter(r =>
        isDeadlinePassed(r.endDate) && !isAllTeamsMarked(r)
    );

    const past = reviews.filter(r =>
        isAllTeamsMarked(r) || (isDeadlinePassed(r.endDate) && isAllTeamsMarked(r))
    );

    return {
        reviews,
        active,
        deadlinePassed,
        past,
        loading,
        error,
        refreshReviews: () => {
            // Simple force update simulation could be added here
            console.log("Refreshed (simulated)");
        }
    };
};
