/**
 * Utility functions for managing localStorage operations
 */
const LOCAL_STORAGE_KEYS = {
    PROPERTIES: 'realEstateAppProperties',
    USER: 'realEstateAppUser',
};

/**
 * Save data to localStorage
 * @param {string} key - The key to store the data under
 * @param {any} data - The data to store (will be stringified)
 */
export function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

/**
 * Load data from localStorage
 * @param {string} key - The key to retrieve the data from
 * @returns {any} The parsed data or null if not found
 */
export function loadFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return null;
    }
}

/**
 * Remove data from localStorage
 * @param {string} key - The key to remove
 */
export function removeFromLocalStorage(key) {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error('Error removing from localStorage:', error);
    }
}

/**
 * Clear all data from localStorage
 */
export function clearLocalStorage() {
    try {
        localStorage.clear();
    } catch (error) {
        console.error('Error clearing localStorage:', error);
    }
}

export { LOCAL_STORAGE_KEYS };

// User-specific localStorage functions for convenience
export function saveUserToLocalStorage(user) {
    saveToLocalStorage(LOCAL_STORAGE_KEYS.USER, user);
}

export function loadUserFromLocalStorage() {
    return loadFromLocalStorage(LOCAL_STORAGE_KEYS.USER);
}

export function clearUserFromLocalStorage() {
    removeFromLocalStorage(LOCAL_STORAGE_KEYS.USER);
}
