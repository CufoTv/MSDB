# 🎵 Music Database for Websites

A self-contained **music database** for websites and web apps.  
Easily include **albums, EPs, and singles** with covers, songs, artist profiles, and metadata in JSON format. Users can clone the repository and start using it immediately.

---

## 🌟 Features

- Organized support for **Albums**, **EPs**, and **Singles**  
- **JSON metadata** for songs, albums, and artists  
- Artist profile images and detailed info (monthly listeners, bio)  
- **Enable/disable any song, album, EP, or single** using an `enabled` flag  
- **Ads system** for free users:
  - Banner ads  
  - Audio ads  
- Ready-to-use file structure for web integration  
- Fully compatible with any JavaScript-based website or music player  

---

## 📁 Folder Structure

```

music-database/
├─ database/
│  └─ music.json            # Main JSON listing all albums, EPs, and singles
├─ ads/
│  └─ ads.json              # Banner and audio ads for free users
├─ cover/
│  ├─ albums/               # Album cover images
│  ├─ eps/                  # EP cover images
│  └─ singles/              # Single cover images
├─ songs/
│  ├─ albums/               # Songs in albums
│  ├─ eps/                  # Songs in EPs
│  └─ singles/              # Single songs
├─ artist/
│  └─ <artist_name>.jpg     # Artist profile pictures
├─ artist-info/
│  └─ <artist_name>.json    # Artist metadata (monthly listeners, bio)
├─ information.txt          # General info about this database
└─ connect.js               # Fetch and control music & ads data

````

---

## 📝 Example `music.json` with Enable/Disable

```json
{
  "albums": [
    {
      "title": "Album 1",
      "artist": "Artist 1",
      "cover": "cover/albums/album1.jpg",
      "songs": [
        "songs/albums/song1.mp3",
        "songs/albums/song2.mp3"
      ],
      "artist_profile": "artist/artist1.jpg",
      "artist_info": "artist-info/artist1.json",
      "release_date": "2025-06-01",
      "enabled": false
    }
  ],
  "eps": [
    {
      "title": "EP 1",
      "artist": "Artist 2",
      "cover": "cover/eps/ep1.jpg",
      "songs": [
        "songs/eps/ep1-song1.mp3",
        "songs/eps/ep1-song2.mp3"
      ],
      "artist_profile": "artist/artist2.jpg",
      "artist_info": "artist-info/artist2.json",
      "release_date": "2025-08-15",
      "enabled": false
    }
  ],
  "singles": [
    {
      "title": "Akoma",
      "artist": "Finem",
      "cover": "cover/singles/akoma.jpg",
      "song": "songs/singles/akoma.mp3",
      "artist_profile": "artist/finem.jpg",
      "artist_info": "artist-info/finem.json",
      "release_date": "2025-10-06",
      "enabled": true
    }
  ]
}
````

> ⚡ Tip: Disabled items (`"enabled": false`) are **completely hidden** until `"enabled": true`.

---

## 👤 Example Artist Info (`artist-info/<artist_name>.json`)

```json
{
  "name": "Finem",
  "monthly_listeners": 250000,
  "description": "Finem is an Afrobeat artist known for catchy rhythms and strong vocals."
}
```

---

## 📄 Example Ads (`ads/ads.json`)

```json
[
  {
    "type": "banner",
    "image": "/ads/banner/kfc.jpg",
    "link": "https://kfckosova.com/",
    "enabled": true
  },
  {
    "type": "audio",
    "file": "/ads/audio/KFC.mp3",
    "enabled": true
  }
]
```

> ⚡ Tip: Only **enabled ads** are shown for free users. Premium users skip ads completely.

---

## 🚀 Getting Started

### 1. Clone the repository:

```bash
git clone https://github.com/CufoTv/MSDB.git
```

### 2. Fetch and use music and ads with `connect.js`

```javascript
import { getMusic, getAds } from './connect.js';

// Free user
async function startFreeUser() {
    const music = await getMusic();  // Only enabled music
    const ads = await getAds();      // Only enabled ads
    console.log("Music:", music);
    console.log("Ads:", ads);
}

// Premium user
async function startPremiumUser() {
    const music = await getMusic();  // Only enabled music
    console.log("Music:", music);
}

startFreeUser();
```

> Disabled items are **completely removed** and cannot be accessed until `"enabled": true`.

---

## 🛠️ Adding Your Own Music

1. Add song files to the appropriate folder:

```
/songs/albums/
/songs/eps/
/songs/singles/
```

2. Add cover images:

```
/cover/albums/
/cover/eps/
/cover/singles/
```

3. Update `database/music.json` with your new entries.
4. Add artist profile images and info JSON in `/artist/` and `/artist-info/`.
5. Set `"enabled": true` to make the item visible.

---

## 🛠️ Adding Your Own Ads

1. Add banner images to `/ads/banner/` and audio ads to `/ads/audio/`
2. Update `/ads/ads.json` with your new ad entries
3. Set `"enabled": true` to show the ad for free users

---

## 🤝 Contributing

* Fork the repository
* Add your songs, covers, ads, and metadata
* Update `music.json` or `ads.json` accordingly
* Submit a pull request

---

## 📄 License

Free to use for personal and commercial projects.
