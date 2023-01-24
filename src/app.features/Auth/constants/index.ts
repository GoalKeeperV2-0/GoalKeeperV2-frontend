export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&scope=${process.env.REACT_APP_GOOGLE_SCOPE1} ${process.env.REACT_APP_GOOGLE_SCOPE2}&response_type=code`;

export const VALID_COLOR = 'primaryOrange-200';
export const INVALID_COLOR = 'primaryRed-300';
