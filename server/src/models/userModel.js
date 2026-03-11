import db from "../config/database.js";

const User = {
  byEmailUsername: async (username) => {
    const result = await db.query(
      `select * from users where email = $1 or username = $1`,
      [username],
    );
    if (result.rows.length === 0) {
      return null;
    }
    const user = result.rows[0];
    return user;
  },
  byEmail: async (email) => {
    const result = await db.query(`select * from users where email = $1`, [
      email,
    ]);
    if (result.rows.length === 0) {
      return null;
    }
    const user = result.rows[0];
    return user;
  },
  newUserGoogle: async (email, id, displayName, photo) => {
    const result = await db.query(
      `insert into users(email, auth_provider, google_id, display_name, profile_pic_url)
                      values($1, 'google', $2, $3, $4)
                      returning *`,
      [email, id, displayName, photo],
    );
    const user = result.rows[0];
    return user;
  },
  newUserLocal: async (
    email,
    hashedPassword,
    displayName,
    profilePlaceholder,
    username,
  ) => {
    const result = await db.query(
      `
                insert into users (email,password_hash, auth_provider, display_name, profile_pic_url, username)
                values ($1, $2, 'local', $3, $4, $5)
                returning * 
            `,
      [email, hashedPassword, displayName, profilePlaceholder, username],
    );
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  },
  byId: async (id) => {
    const result = await db.query(
      `select id, email, auth_provider, google_id, display_name, profile_pic_url, created_at, username from users where id = $1`,
      [id],
    );
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  },
};

export default User;
