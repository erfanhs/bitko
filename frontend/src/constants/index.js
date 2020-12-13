const host = window.location.host;
const ROOT_PATH = host + '/';
const API_BASE = 'http://' + ROOT_PATH + 'api/v1/';

export const API_LOGIN = API_BASE + 'auth/login/';
export const API_SIGNUP = API_BASE + 'auth/signup/';
export const API_REFRESH = API_BASE + 'auth/refreshToken/';
export const API_ROOMS = API_BASE + 'get-rooms/';
export const API_DELETE_ACCOUNT = API_BASE + 'delete-account/';
export const API_CHANGE_PASSWORD = API_BASE + 'change-password/';
export const API_CREATE_ROOM = API_BASE + 'create-room/';
export const API_JOIN_ROOM = API_BASE + 'join-room/';
export const API_MESSAGES = API_BASE + 'messages-list/';
export const CHAT_SOCKET = 'ws://' + ROOT_PATH + 'ws/method/chat/';


export const GUEST_USER_ENDPOINTS = [API_LOGIN, API_SIGNUP, API_REFRESH]