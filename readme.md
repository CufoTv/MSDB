# MSDB – Music Database for Websites (Advanced Version)

A self-contained music database for websites and web apps with **Spotify-level features**. Includes albums, EPs, singles, artist profiles, metadata, smart recommendations, lyrics support, offline caching, and an advanced ad system.

---

## 🌟 Features

### Core Features
- Support for **Albums, EPs, and Singles**
- **JSON metadata** for songs, albums, artists
- **Artist profile images** and detailed info (monthly listeners, bio, genres)
- Enable/disable any song, album, EP, or single using an `enabled` flag
- **Music genres** and **tags** for categorization
- **Optional lyrics** (loaded only for signed-in users)
- **Automatic duration detection** from MP3s (not displayed in UI)
  
### Advanced Features
- **Ultra-smart shuffle** (avoids consecutive same artist or tag)
- **Play counts, skip counts, and listening analytics**
- **User listening history**
- **Collaborative filtering** (user-to-user recommendations)
- **Recommendation graph** (AI-like song suggestions)
- **Daily Mix generator** (personalized playlists)
- **Radio mode** (infinite similar songs)
- **Genre stations**
- **Playlist generator** (by artist, genre, or random)
- **Trending algorithm** (time-decay scoring)
- **Viral detection**
- **Skip-rate detection**
- **Music popularity heatmap**
- **Lyrics loader** (users only)
- **Offline caching** of music files
- **Ad system**:
  - Guests: ads every 1–2 songs
  - Signed-in users: ads every 2–4 songs
  - Premium users: no ads
  - Music pauses automatically during audio ads

---

## 📁 Folder Structure

```

music-database/
├─ database/
│  └─ music.json            # Main JSON with albums, EPs, singles, tracks, artists, genres
├─ ads/
│  └─ ads.json              # Banner and audio ads for free users
├─ cover/
│  ├─ albums/
│  ├─ eps/
│  └─ singles/
├─ songs/
│  ├─ albums/
│  ├─ eps/
│  └─ singles/
├─ artist/
│  └─ <artist_name>.jpg
├─ artist-info/
│  └─ <artist_name>.json    # Artist metadata including genres
├─ lyrics/
│  └─ <song_name>.lrc       # Optional song lyrics
├─ connect.js                # Advanced music & ad engine
└─ information.txt           # General info about the database

````

---

## 📝 Example `music.json`

```json
{
  "artists": [
    {
      "id": "art_artur",
      "name": "Artur",
      "profile": "artist/artur.jpg",
      "info": "artist-info/artur.json",
      "genres": ["rap", "albanian"]
    }
  ],
  "albums": [
    {
      "id": "alb_fmf",
      "title": "FMF",
      "artists": ["art_artur"],
      "release_date": "2022-09-27",
      "cover": "cover/albums/fmf.jpg",
      "enabled": true,
      "genre": ["rap"],
      "tags": ["rap", "albanian"],
      "tracks": ["trk_fmf_01", "trk_fmf_02"]
    }
  ],
  "tracks": [
    {
      "id": "trk_fmf_01",
      "title": "Enter",
      "artists": ["art_artur"],
      "album": "alb_fmf",
      "track_number": 1,
      "file": "songs/albums/enter.mp3",
      "release_date": "2022-09-27",
      "genre": ["rap"],
      "tags": ["intro"],
      "lyrics": "lyrics/enter.lrc",
      "analytics": {"plays":0,"recentPlays":0,"skips":0},
      "enabled": true
    }
  ],
  "genres": ["rap","afrobeats","pop","drill","trap","urban"]
}
````

⚡ Tip: If `lyrics` is missing or `null`, the song has **no lyrics**.

---

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/CufoTv/MSDB.git
```

2. Import and use the advanced engine:

```javascript
import { loadMusic, getAllSongs, autoplay, maybePlayAd } from './connect.js';
```

3. **Free user example**:

```javascript
async function startFreeUser() {
  const music = await getAllSongs();
  const player = new Audio();
  const playlist = music;

  autoplay(player, playlist, { value: 0 }, "guest");
  console.log("Music loaded:", music);
}
```

4. **Premium user example**:

```javascript
async function startPremiumUser() {
  const music = await getAllSongs();
  console.log("Music loaded:", music);
}
```

---

## 🛠️ Adding Your Own Music

1. Add song files to:

```
/songs/albums/  /songs/eps/  /songs/singles/
```

2. Add cover images:

```
/cover/albums/  /cover/eps/  /cover/singles/
```

3. Update `music.json` with:

* `albums`, `eps`, `singles`
* `tracks`
* `artists` if new artist
* `genres` and `tags`
* Optional lyrics in `/lyrics/` (only loaded for signed-in users)
* `enabled: true` to show

---

## 🛠️ Adding Ads

1. Add banner images to `/ads/banner/` and audio ads to `/ads/audio/`
2. Update `/ads/ads.json` with new ad entries
3. Set `"enabled": true` to show ads for free users

---

## 🤝 Contributing

1. Fork the repository
2. Add songs, covers, ads, and metadata
3. Update `music.json` or `ads.json`
4. Submit a pull request

---

## 📄 License

Free to use for personal and commercial projects.
