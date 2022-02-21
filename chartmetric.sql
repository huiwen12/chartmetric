SELECT users.id AS user_id,
        users.username,
        users.email,
        artists.id AS artist_id,
        artists.tagline,
        tracks.name AS track_name,
        tracks.isrc AS track_isrc
    FROM users
    JOIN artists ON users.id = artists.user_id
    LEFT JOIN tracks ON artists.id = tracks.artist_id ;