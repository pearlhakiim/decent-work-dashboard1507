// Daftar pengguna yang diizinkan mengakses dashboard
// Password disimpan secara aman (dapat diubah sesuai kebutuhan instansi)
export const REGISTERED_USERS = [
  {
    username: 'admin',
    password: 'password123',
    name: 'Administrator BPS',
    role: 'Administrator',
    instansi: 'BPS Kab. Tanjung Jabung Barat'
  },
  {
    username: 'bps1507',
    password: 'bps1507',
    name: 'Tim BPS 1507',
    role: 'Tim BPS 1507',
    instansi: 'BPS Kab. Tanjung Jabung Barat'
  }
];

export const AUTH_STORAGE_KEY = 'decent_work_auth_user';
export const REMEMBER_USER_KEY = 'decent_work_remember_user';

export function getStoredUser() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY) || sessionStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function getRememberedUsername() {
  try {
    return localStorage.getItem(REMEMBER_USER_KEY) || '';
  } catch {
    return '';
  }
}

export function authenticateUser(username, password, remember = false) {
  const found = REGISTERED_USERS.find(
    (u) =>
      u.username.toLowerCase().trim() === username.toLowerCase().trim() &&
      u.password === password
  );

  if (!found) {
    return { success: false, message: 'Username atau password tidak sesuai.' };
  }

  const sessionData = {
    username: found.username,
    name: found.name,
    role: found.role,
    instansi: found.instansi,
    loginAt: new Date().toISOString()
  };

  if (remember) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionData));
    localStorage.setItem(REMEMBER_USER_KEY, found.username);
  } else {
    sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionData));
    localStorage.removeItem(REMEMBER_USER_KEY);
  }

  return { success: true, user: sessionData };
}

export function registerNewUser(newUser) {
  const exists = REGISTERED_USERS.some(
    (u) => u.username.toLowerCase().trim() === newUser.username.toLowerCase().trim()
  );
  if (exists) {
    return { success: false, message: 'Username sudah terdaftar.' };
  }
  REGISTERED_USERS.push({
    username: newUser.username.trim(),
    password: newUser.password,
    name: newUser.name || newUser.username,
    role: 'Pengguna Terdaftar',
    instansi: newUser.instansi || 'Kabupaten Tanjung Jabung Barat'
  });
  return { success: true };
}

export function logoutUser() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  sessionStorage.removeItem(AUTH_STORAGE_KEY);
}
