const BASE_URL = import.meta.env.VITE_API_URL || ''

export const API_PATHS = {
  AUTH: {
    REGISTER: `${BASE_URL}/api/auth/register`,
    LOGIN: `${BASE_URL}/api/auth/login`,
    PROFILE: `${BASE_URL}/api/auth/profile`,
    UPLOAD_IMAGE: `${BASE_URL}/api/auth/upload-image`
  },
  SESSIONS: {
    CREATE: `${BASE_URL}/api/sessions/create`,
    MY_SESSIONS: `${BASE_URL}/api/sessions/my-sessions`,
    GET_BY_ID: (id) => `${BASE_URL}/api/sessions/${id}`,
    DELETE: (id) => `${BASE_URL}/api/sessions/${id}`
  },
  QUESTIONS: {
    ADD: `${BASE_URL}/api/questions/add`,
    TOGGLE_PIN: (id) => `${BASE_URL}/api/questions/${id}/pin`,
    UPDATE_NOTE: (id) => `${BASE_URL}/api/questions/${id}/note`
  },
  AI: {
    GENERATE_QUESTIONS: `${BASE_URL}/api/ai/generate-questions`,
    GENERATE_EXPLANATION: `${BASE_URL}/api/ai/generate-explanation`
  }
}

export default API_PATHS   // ← this line must exist