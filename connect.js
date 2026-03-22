/* --------------------------
MSDB ADVANCED CONNECT ENGINE v3
-------------------------- */

let musicDB = null;
let adsDB = null;

let songsPlayed = 0;
let adTrigger = 0;

/* --------------------------
LOAD DATABASE
-------------------------- */

export async function loadMusic() {
  if (musicDB) return musicDB;
  const res = await fetch("/database/music.json");
  const data = await res.json();
  musicDB = filterEnabled(data);
  return musicDB;
}

export async function loadAds() {
  if (adsDB) return adsDB;
  const res = await fetch("/ads/ads.json");
  const data = await res.json();
  adsDB = data.filter(a => a.enabled);
  return adsDB;
}

/* --------------------------
FILTER ENABLED ITEMS
-------------------------- */

function filterEnabled(data) {
  const albums = data.albums
    .filter(a => a.enabled)
    .map(a => ({ ...a, tracks: a.tracks.filter(t => t.enabled) }));

  const eps = data.eps
    .filter(e => e.enabled)
    .map(e => ({ ...e, tracks: e.tracks.filter(t => t.enabled) }));

  const singles = data.singles.filter(s => s.enabled);

  return { albums, eps, singles, artists: data.artists, genres: data.genres };
}

/* --------------------------
FLATTEN SONG LIST
-------------------------- */

export async function getAllSongs() {
  const music = await loadMusic();
  const list = [];

  music.albums.forEach(a =>
    a.tracks.forEach(t => list.push({ ...t, album: a.title }))
  );

  music.eps.forEach(e =>
    e.tracks.forEach(t => list.push({ ...t, ep: e.title }))
  );

  music.singles.forEach(s => list.push(s));

  return list;
}

/* --------------------------
ULTRA SMART SHUFFLE
-------------------------- */

export function ultraSmartShuffle(songs) {
  const shuffled = [...songs].sort(() => Math.random() - 0.5);
  const result = [];

  shuffled.forEach(song => {
    const prev = result[result.length - 1];
    if (!prev) return result.push(song);

    if (prev.artists[0] === song.artists[0]) return result.unshift(song);

    if (prev.tags && song.tags) {
      if (prev.tags.some(t => song.tags.includes(t))) return result.unshift(song);
    }

    result.push(song);
  });

  return result;
}

/* --------------------------
SEARCH ENGINE
-------------------------- */

export function searchMusic(query, songs) {
  query = query.toLowerCase();
  return songs.filter(song => {
    if (song.title.toLowerCase().includes(query)) return true;
    if (song.artists.join(" ").toLowerCase().includes(query)) return true;
    if (song.tags && song.tags.join(" ").toLowerCase().includes(query)) return true;
    return false;
  });
}

/* --------------------------
TRENDING / VIRAL / SKIP
-------------------------- */

export function getTrendingSongs(songs) {
  const now = Date.now();
  return songs
    .map(song => {
      const ageDays = song.release_date
        ? (now - new Date(song.release_date)) / 86400000
        : 365;
      const decay = Math.exp(-ageDays / 30);
      const score = (song.plays || 0) * decay;
      return { song, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 20)
    .map(r => r.song);
}

export function detectViralSongs(songs) {
  return songs.filter(song => {
    const recent = song.recentPlays || 0;
    const total = song.plays || 1;
    return recent / total > 0.4;
  });
}

export function registerSkip(song) {
  song.skips = (song.skips || 0) + 1;
}

export function skipRate(song) {
  if (!song.plays) return 0;
  return (song.skips || 0) / song.plays;
}

export function generatePopularityHeatmap(songs) {
  const heatmap = {};
  songs.forEach(song => {
    song.artists.forEach(artist => {
      heatmap[artist] = (heatmap[artist] || 0) + (song.plays || 0);
    });
  });
  return heatmap;
}

/* --------------------------
PLAY COUNTER & HISTORY
-------------------------- */

export function registerPlay(song) {
  song.plays = (song.plays || 0) + 1;
  song.recentPlays = (song.recentPlays || 0) + 1;
}

export function saveHistory(song) {
  const history = JSON.parse(localStorage.getItem("listenHistory") || "[]");
  history.unshift(song.id);
  localStorage.setItem("listenHistory", JSON.stringify(history.slice(0, 100)));
}

export function getHistory() {
  return JSON.parse(localStorage.getItem("listenHistory") || "[]");
}

/* --------------------------
COLLABORATIVE FILTERING
-------------------------- */

export function collaborativeRecommendations(allSongs, allUsersHistory) {
  const recommendations = {};
  allUsersHistory.forEach(user => {
    user.history.forEach(songID => {
      if (!recommendations[songID]) recommendations[songID] = {};
      user.history.forEach(otherSong => {
        if (songID === otherSong) return;
        recommendations[songID][otherSong] = (recommendations[songID][otherSong] || 0) + 1;
      });
    });
  });
  return recommendations;
}

/* --------------------------
RECOMMENDATION GRAPH
-------------------------- */

export function buildRecommendationGraph(songs) {
  const graph = {};
  songs.forEach(song => {
    graph[song.id] = [];
    songs.forEach(other => {
      if (song.id === other.id) return;
      let score = 0;
      if (song.artists[0] === other.artists[0]) score += 5;
      if (song.tags && other.tags) {
        song.tags.forEach(tag => {
          if (other.tags.includes(tag)) score += 2;
        });
      }
      if (score > 0) graph[song.id].push({ id: other.id, score });
    });
    graph[song.id].sort((a, b) => b.score - a.score);
  });
  return graph;
}

/* --------------------------
DAILY MIX
-------------------------- */

export function generateDailyMix(songs) {
  const history = getHistory();
  if (!history.length) return ultraSmartShuffle(songs).slice(0, 40);

  const favArtists = {};
  history.forEach(id => {
    const song = songs.find(s => s.id === id);
    if (!song) return;
    song.artists.forEach(a => {
      favArtists[a] = (favArtists[a] || 0) + 1;
    });
  });

  return songs
    .filter(song => song.artists.some(a => favArtists[a]))
    .sort(() => Math.random() - 0.5)
    .slice(0, 40);
}

/* --------------------------
RADIO MODE
-------------------------- */

export function startRadio(seedSong, songs) {
  const playlist = [];
  let current = seedSong;
  for (let i = 0; i < 100; i++) {
    const recs = buildRecommendationGraph(songs)[current.id] || [];
    const next = recs[Math.floor(Math.random() * recs.length)];
    if (!next) break;
    playlist.push(songs.find(s => s.id === next.id));
    current = songs.find(s => s.id === next.id);
  }
  return playlist;
}

/* --------------------------
GENRE STATIONS
-------------------------- */

export function generateGenreStations(songs) {
  const stations = {};
  songs.forEach(song => {
    if (!song.tags) return;
    song.tags.forEach(tag => {
      if (!stations[tag]) stations[tag] = [];
      stations[tag].push(song);
    });
  });
  return stations;
}

/* --------------------------
PLAYLIST GENERATOR
-------------------------- */

export function generatePlaylist(type, songs, value) {
  if (type === "artist") return songs.filter(s => s.artists.includes(value));
  if (type === "genre") return songs.filter(s => s.tags && s.tags.includes(value));
  if (type === "random") return ultraSmartShuffle(songs).slice(0, 25);
  return [];
}

/* --------------------------
LYRICS LOADER (users only)
-------------------------- */

export async function loadLyrics(song, userType) {
  if (userType === "guest") return null;
  if (!song.lyrics) return null; // song has no lyrics
  try {
    const res = await fetch(song.lyrics);
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

/* --------------------------
AD SYSTEM
-------------------------- */

export function configureAds(userType) {
  if (userType === "guest") adTrigger = rand(1, 2);
  if (userType === "user") adTrigger = rand(2, 4);
  if (userType === "premium") adTrigger = Infinity;
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function maybePlayAd(player, userType) {
  if (userType === "premium") return;
  songsPlayed++;
  if (songsPlayed < adTrigger) return;

  const ads = await loadAds();
  const audioAds = ads.filter(a => a.type === "audio");
  if (!audioAds.length) return;

  const ad = audioAds[Math.floor(Math.random() * audioAds.length)];
  player.pause();

  const adPlayer = new Audio(ad.file);
  await adPlayer.play();
  adPlayer.onended = () => player.play();

  songsPlayed = 0;
  configureAds(userType);
}

/* --------------------------
AUTOPLAY ENGINE
-------------------------- */

export function autoplay(player, playlist, indexRef, userType) {
  player.onended = async () => {
    await maybePlayAd(player, userType);
    indexRef.value++;
    if (indexRef.value >= playlist.length) indexRef.value = 0;

    const next = playlist[indexRef.value];
    registerPlay(next);
    saveHistory(next);

    player.src = next.file;
    player.play();
  };
}

/* --------------------------
OFFLINE CACHING
-------------------------- */

export async function cacheSongs(songs) {
  if (!("caches" in window)) return;
  const cache = await caches.open("msdb-songs");
  songs.forEach(song => cache.add(song.file));
}
