const { load, save, mergeById } = require('../../utils/jsonStore');
const { sendNotification } = require('../../utils/notification');
const youtubeApi = require('./api');

const CACHE_FILE = 'youtube.json';

function getState(client) {
    return client.platforms.youtube;
}

async function fetchChannelInfo(client) {
    const { apiKey, channelId } = client.config.youtube;
    return youtubeApi.fetchChannelInfo(apiKey, channelId);
}

function loadCache(client) {
    const state = getState(client);
    const stored = load(CACHE_FILE, { videos: [] });
    state.videos = stored.videos || [];
    console.log(`Loaded ${state.videos.length} videos from cache.`);
}

function isVideoCached(client, videoId) {
    const state = getState(client);
    return state.videos.some((v) => v.id === videoId);
}

function addVideoToCache(client, video) {
    const state = getState(client);

    state.videos = mergeById(
        state.videos,
        [video],
        client.config.youtube.cacheMaxVideos
    );

    save(CACHE_FILE, { videos: state.videos });
}

function isToday(dateString) {
    const date = new Date(dateString);
    const now = new Date();

    return date.getUTCFullYear() === now.getUTCFullYear()
        && date.getUTCMonth() === now.getUTCMonth()
        && date.getUTCDate() === now.getUTCDate();
}

async function syncVideos(client, maxResults = 10) {
    const state = getState(client);
    if (!state.channelInfo) {
        return { fetched: 0, added: 0, notified: 0, todayVideo: null };
    }

    const fetched = await youtubeApi.fetchVideos(
        client.config.youtube.apiKey,
        state.channelInfo.uploadsPlaylistId,
        maxResults
    );

    if (!fetched) {
        return { fetched: 0, added: 0, notified: 0, todayVideo: null, failed: true };
    }

    let added = 0;
    let notified = 0;
    let todayVideo = null;

    for (const video of fetched) {
        if (isVideoCached(client, video.id)) continue;

        const isFromToday = isToday(video.publishedAt);

        addVideoToCache(client, video);
        added += 1;

        if (isFromToday) {
            todayVideo = video;
            await sendNotification(client, video);
            notified += 1;
        }
    }

    return {
        fetched: fetched.length,
        added,
        notified,
        todayVideo
    };
}

module.exports = {
    fetchChannelInfo,
    loadCache,
    syncVideos,
    isVideoCached
};