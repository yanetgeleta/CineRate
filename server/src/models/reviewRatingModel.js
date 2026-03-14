import db from "../config/database.js";

const ReviewRating = {
  addUpdateRating: async (userId, filmId, filmType, rating) => {
    const result = await db.query(
      `INSERT INTO ratings (user_id, tmdb_id, film_type, rating) 
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (user_id, tmdb_id) 
       DO UPDATE SET 
        rating = EXCLUDED.rating
       RETURNING film_type, rating, tmdb_id`,
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
  // updates an existing review row
  updateReview: async (reviewId, newReview, dateTime) => {
    const result = await db.query(
      `update reviews
      set review_text = $1, created_at = $2
      where id = $3 returning id, review_text, created_at, user_id`,
      [newReview, dateTime, reviewId],
    );
    return result.rows[0];
  },
  deleteReview: async (reviewId) => {
    const result = await db.query(
      `delete from reviews
      where id = $1 returning *`,
      [reviewId],
    );
    return result.rows[0];
  },
  // all the comments to a single film by user
  userFilmReview: async (filmId, userId) => {
    const result = await db.query(
      `select * from reviews
      where tmdb_id = $1 and user_id = $2`,
      [filmId, userId],
    );
    return result.rows;
  },
  // gets all the reviews for a single film
  filmReviewsData: async (filmId) => {
    const result = await db.query(
      `select r.id, r.review_text, r.created_at, r.user_id, u.display_name, u.profile_pic_url, u.email, u.username
      from reviews as r
      join users as u on r.user_id = u.id
      where tmdb_id = $1`,
      [filmId],
    );
    return result.rows;
  },
  // All the comments made by a user
  userReviewsData: async (userId) => {
    const result = await db.query(
      `select * from reviews
      where user_id = $1`,
      [userId],
    );
    return result.rows;
  },
  // all the ratings made by a user
  userRatingsData: async (userId) => {
    const result = await db.query(
      `select film_type, rating, tmdb_id from ratings
      where user_id = $1`,
      [userId],
    );
    const ratingsArray = result.rows;
    return ratingsArray;
  },
};
export default ReviewRating;
