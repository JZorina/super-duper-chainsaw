import { ConfigModal } from "../Models/ConfigModal";


export const config: ConfigModal = {
    api: 'https://localhost:6001',
    useMockData: true,
    paths: {
        getTestResult: '/api/labResults/getTestResult'
    }
};
