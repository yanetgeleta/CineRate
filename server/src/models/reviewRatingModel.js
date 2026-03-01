import db from "../config/database.js";

const ReviewRating = {
  addUpdateRating: async (userId, filmId, filmType, rating) => {
    const result = await db.query(
      `INSERT INTO ratings (user_id, tmdb_id, film_type, rating) 
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (user_id, tmdb_id) 
       DO UPDATE SET 
        rating = EXCLUDED.rating
       RETURNING *`,
      [userId, filmId, filmType, rating],
    );
    return result.rows[0];
  },
  addReview: async (userId, filmId, filmType, review) => {
    const result = await db.query(
      `insert into reviews(user_id, tmdb_id, film_type, review_text)
      values ($1,$2,$3,$4) returning *`,
      [userId, filmId, filmType, review],
    );
    return result.rows[0];
  },
  updateReview: async (reviewId, newReview) => {
    const result = await db.query(
      `update reviews
      set review_text = $1
      where id = $2 returning *`,
      [newReview, reviewId],
    );
    return result.rows[0];
  },
};
export default ReviewRating;
