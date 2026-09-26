const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');

function ensureDataDir() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }
}

function getFilePath(fileName) {
    return path.join(DATA_DIR, fileName);
}

function load(fileName, fallback = {}) {
    ensureDataDir();
    const filePath = getFilePath(fileName);

    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2));
        return fallback;
    }

    try {
        const raw = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(raw);
    } catch (error) {
        console.error(`Error reading ${fileName}:`, error.message);
        return fallback;
    }
}

function save(fileName, data) {
    ensureDataDir();
    const filePath = getFilePath(fileName);
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error(`Error writing ${fileName}:`, error.message);
    }
}

function mergeById(existingItems, newItems, maxItems, sortKey = 'publishedAt') {
    const map = new Map();
    for (const item of existingItems) map.set(item.id, item);
    for (const item of newItems) map.set(item.id, item);

    return Array.from(map.values())
        .sort((a, b) => new Date(b[sortKey]) - new Date(a[sortKey]))
        .slice(0, maxItems);
}

module.exports = {
    load,
    save,
    mergeById,
    DATA_DIR
};