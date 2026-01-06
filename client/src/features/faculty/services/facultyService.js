import api from '../../../services/api';
import { MOCK_MASTER_DATA, MOCK_FACULTY } from '../../../shared/utils/largeMockData';

const USE_MOCK_DATA = true;

/**
 * Get master data (schools, programs, years)
 */
export const getMasterData = async () => {
    if (USE_MOCK_DATA) return MOCK_MASTER_DATA;
    try {
        const response = await api.get('/faculty/master-data');
        return response.data.data;
    } catch (error) {
        console.error("Failed to fetch master data:", error);
        throw error;
    }
};

/**
 * Get faculty profile
 */
export const getProfile = async () => {
    if (USE_MOCK_DATA) return MOCK_FACULTY[0];
    try {
        const response = await api.get('/faculty/profile');
        return response.data.data;
    } catch (error) {
        console.error("Failed to fetch profile:", error);
        throw error;
    }
};
