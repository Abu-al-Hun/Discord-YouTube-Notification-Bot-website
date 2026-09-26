const axios = require('axios');

const BASE_URL = 'https://www.googleapis.com/youtube/v3';

async function fetchChannelInfo(apiKey, channelId) {
    try {
        const response = await axios.get(`${BASE_URL}/channels`, {
            params: {
                part: 'snippet,contentDetails',
                id: channelId,
                key: apiKey
            }
        });

        if (!response.data.items || response.data.items.length === 0) {
            console.error('YouTube channel not found. Check the channel ID.');
            return null;
        }

        const channel = response.data.items[0];
        return {
            title: channel.snippet.title,
            description: channel.snippet.description,
            thumbnail: channel.snippet.thumbnails.high.url,
            uploadsPlaylistId: channel.contentDetails.relatedPlaylists.uploads
        };
    } catch (error) {
        console.error('Error fetching channel info:',
            error.response?.data?.error?.message || error.message);
        return null;
    }
}

async function fetchVideos(apiKey, uploadsPlaylistId, maxResults = 10) {
    if (!uploadsPlaylistId) {
        console.error('Missing uploads playlist ID');
        return null;
    }

    try {
        const response = await axios.get(`${BASE_URL}/playlistItems`, {
            params: {
                part: 'snippet,contentDetails',
                playlistId: uploadsPlaylistId,
                maxResults,
                key: apiKey
            }
        });

        if (!response.data.items || response.data.items.length === 0) {
            return [];
        }

        return response.data.items.map((item) => {
            const videoId = item.contentDetails.videoId;
            return {
                id: videoId,
                title: item.snippet.title,
                description: item.snippet.description,
                publishedAt: item.snippet.publishedAt,
                link: `https://www.youtube.com/watch?v=${videoId}`,
                thumbnail: item.snippet.thumbnails.maxres?.url
                    || item.snippet.thumbnails.high?.url
                    || item.snippet.thumbnails.medium?.url
                    || item.snippet.thumbnails.default?.url
            };
        });
    } catch (error) {
        console.error('Error fetching videos:',
            error.response?.data?.error?.message || error.message);
        return null;
    }
}

async function fetchLatestVideo(apiKey, uploadsPlaylistId) {
    const videos = await fetchVideos(apiKey, uploadsPlaylistId, 1);
    return videos && videos.length > 0 ? videos[0] : null;
}

module.exports = {
    fetchChannelInfo,
    fetchVideos,
    fetchLatestVideo
};