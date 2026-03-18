# 🎵 Music Database for Websites

A **self-contained music database** for websites and web apps.  
Easily include albums, EPs, and singles with covers, songs, artist profiles, and metadata in JSON format. Users can clone the repository and start using it immediately.

---

## 🌟 Features

- Organized support for **Albums**, **EPs**, and **Singles**
- **JSON metadata** for songs, albums, and artists
- Artist profile images and detailed info (monthly listeners, bio)
- **Enable/disable** any song, album, EP, or single using an `enabled` flag
- Ready-to-use file structure for web integration
- Fully compatible with any JavaScript-based website or music player

---

## 📁 Folder Structure

```

music-database/
├─ database/
│  └─ music.json            # Main JSON listing all albums, EPs, and singles
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
└─ information.txt          # General info about this database

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
      "enabled": true
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
      "enabled": true
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

> ⚡ **Tip:** Set `"enabled": false` to temporarily hide any album, EP, or single from your website without removing the files.

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

## 🚀 Getting Started

1. **Clone the repository:**

```bash
git clone https://github.com/CufoTv/MSDB.git
```

2. **Access the JSON data in your website:**

```javascript
fetch('database/music.json')
  .then(res => res.json())
  .then(data => {
    // Filter only enabled albums, EPs, and singles
    const albums = data.albums.filter(album => album.enabled);
    const eps = data.eps.filter(ep => ep.enabled);
    const singles = data.singles.filter(single => single.enabled);

    console.log("Albums:", albums);
    console.log("EPs:", eps);
    console.log("Singles:", singles);
  });
```

3. **Use file paths from `music.json`** to display:

* Songs (`songs/...`)
* Album/EP/Single covers (`cover/...`)
* Artist profiles (`artist/...`)
* Artist info (`artist-info/...`)

---

## 🛠️ Adding Your Own Music

1. Add song files to the appropriate folder:

   * `/songs/albums/`
   * `/songs/eps/`
   * `/songs/singles/`
2. Add cover images:

   * `/cover/albums/`
   * `/cover/eps/`
   * `/cover/singles/`
3. Update `database/music.json` with your new entries and set `"enabled": true` if you want it visible.
4. Add artist profile images and info JSON in `/artist/` and `/artist-info/`.

---

## 🤝 Contributing

* Fork the repository
* Add your songs, covers, and metadata
* Update `music.json` accordingly
* Submit a pull request

---

## 📄 License

This repository is free to use for personal and commercial projects.
