// connect.js

// URLs to raw JSON files
const MUSIC_URL = "https://raw.githubusercontent.com/CufoTv/MSDB/refs/heads/main/database/music.json";
const ADS_URL = "https://raw.githubusercontent.com/CufoTv/MSDB/refs/heads/main/ads/ads.json";

/**
 * Fetch enabled items from a JSON URL
 * @param {string} url - JSON URL
 * @returns {Promise<Array>} - enabled items only
 */
async function fetchEnabled(url) {
    const res = await fetch(url);
    const data = await res.json();

    if (Array.isArray(data)) {
        // ads.json is an array
        return data.filter(item => item.enabled);
    } else {
        // music.json
        return {
            albums: data.albums.filter(a => a.enabled),
            eps: data.eps.filter(e => e.enabled),
            singles: data.singles.filter(s => s.enabled)
        };
    }
}

/**
 * Get music for all users (only enabled items)
 */
async function getMusic() {
    return await fetchEnabled(MUSIC_URL);
}

/**
 * Get ads for free users
 */
async function getAds() {
    return await fetchEnabled(ADS_URL);
}

/**
 * Example usage
 */
async function initUser(isFreeUser = true) {
    const music = await getMusic();
    console.log("Enabled music:", music);

    if (isFreeUser) {
        const ads = await getAds();
        console.log("Ads for free user:", ads);
    }
}

// Call for demo
initUser(true);
