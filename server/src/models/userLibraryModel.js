import db from "../config/database.js";

const Library = {
  updateFavorite: async (userId, filmId, mediaType, filmStatus) => {
    const result = await db.query(
      `insert into user_library (user_id, tmdb_id, film_type, is_favorited)
        values ($1, $2, $3, $4)
        on CONFLICT (user_id, tmdb_id)
        do UPDATE set is_favorited=EXCLUDED.is_favorited
        returning *`,
      [userId, filmId, mediaType, filmStatus],
    );
    return result.rows[0];
  },
  updateFilmStatus: async (userId, filmId, mediaType, filmStatus) => {
    const result = await db.query(
      `insert into user_library (user_id, tmdb_id, film_type, status)
        values ($1, $2, $3, $4)
        on CONFLICT (user_id, tmdb_id)
        do UPDATE set status=EXCLUDED.status
        returning *`,
      [userId, filmId, mediaType, filmStatus],
    );
    return result.rows[0];
  },
  // status and favorites of movies and shows for a user
  userLibraryData: async (userId) => {
    const result = await db.query(
      `select status, is_favorited, tmdb_id from user_library
      where user_id = $1`,
      [userId],
    );
    const libraryArray = result.rows;
    return libraryArray;
  },
};

export default Library;
