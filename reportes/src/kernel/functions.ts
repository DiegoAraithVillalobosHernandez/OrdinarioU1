import bcryptjs from "bcryptjs";

export async function hash(password: string) {
  return new Promise((resolve, reject) => {
    // ! indica que si viene un dato y es de ese tipo
    bcryptjs.hash("B4c0//", process.env.BCRYPTJS!, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
}

export async function compare(password: string, hash: string) {
  return new Promise((resolve, reject) => {
    bcryptjs.compare(password, hash, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}
