const LOCAL_STORAGE_KEYS = {
    PROPERTIES: 'realEstateAppProperties',
    USER: 'realEstateAppUser',
};

export function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

export function loadFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return null;
    }
}

export function removeFromLocalStorage(key) {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error('Error removing from localStorage:', error);
    }
}

export function clearLocalStorage() {
    try {
        localStorage.clear();
    } catch (error) {
        console.error('Error clearing localStorage:', error);
    }
}

export { LOCAL_STORAGE_KEYS };

export function saveUserToLocalStorage(user) {
    saveToLocalStorage(LOCAL_STORAGE_KEYS.USER, user);
}

export function loadUserFromLocalStorage() {
    return loadFromLocalStorage(LOCAL_STORAGE_KEYS.USER);
}

export function clearUserFromLocalStorage() {
    removeFromLocalStorage(LOCAL_STORAGE_KEYS.USER);
}
