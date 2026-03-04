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
  userRatingsData: async (userId) => {
    const result = await db.query(
      `select * from ratings
      where user_id = $1`,
      [userId],
    );
    const ratingsArray = result.rows;
    const ratingsObj = ratingsArray.reduce((acc, current) => {
      acc[current.tmdb_id] = current;
      return acc;
    }, {});
    return ratingsObj;
  },
  userReviewsData: async (userId) => {
    const result = await db.query(
      `select * from reviews
      where user_id = $1`,
      [userId],
    );
    return result.rows;
  },
  userLibraryData: async (userId) => {
    const result = await db.query(
      `select * from user_library
      where user_id = $1`,
      [userId],
    );
    const libraryArray = result.rows;
    const libraryObj = libraryArray.reduce((acc, current) => {
      acc[current.tmdb_id] = current;
      return acc;
    }, {});
    return libraryObj;
  },
  filmReviewsData: async (filmId) => {
    const result = await db.query(
      `select * from reviews
      where tmdb_id = $1`,
      [filmId],
    );
    return result.rows;
  },
};

export default Library;
