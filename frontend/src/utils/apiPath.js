const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

export const API_PATHS = {
  // Auth endpoints
  AUTH: {
    REGISTER: `${BASE_URL}/auth/register`,
    LOGIN: `${BASE_URL}/auth/login`,
    PROFILE: `${BASE_URL}/auth/profile`,
    UPLOAD_IMAGE: `${BASE_URL}/auth/upload-image`
  },
  
  // Session endpoints
  SESSIONS: {
    CREATE: `${BASE_URL}/sessions/create`,
    MY_SESSIONS: `${BASE_URL}/sessions/my-sessions`,
    GET_BY_ID: (id) => `${BASE_URL}/sessions/${id}`,
    DELETE: (id) => `${BASE_URL}/sessions/${id}`
  },
  
  // Question endpoints
  QUESTIONS: {
    ADD: `${BASE_URL}/questions/add`,
    TOGGLE_PIN: (id) => `${BASE_URL}/questions/${id}/pin`,
    UPDATE_NOTE: (id) => `${BASE_URL}/questions/${id}/note`
  },
  
  // AI endpoints
  AI: {
    GENERATE_QUESTIONS: `${BASE_URL}/ai/generate-questions`,
    GENERATE_EXPLANATION: `${BASE_URL}/ai/generate-explanation`
  }
}

export default API_PATHS