import db from "../database/db.js";

const getAllUsersExceptCurrent = async (userId) => {
  try {
    const res = await db.query('SELECT * FROM users WHERE id != $1', [userId]);
    return res.rows;
  } catch (err) {
    console.error('Error fetching users:', err);
    throw err;
  }
};

export { getAllUsersExceptCurrent };
