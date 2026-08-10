const port = Number(process.env.PORT) || 4000;
const mongooseURI = process.env.MONGO_DB_URI;

if (!mongooseURI) throw new Error('MONGO_DB_URI is not defined.');

export const env = {
  port,
  mongooseURI,
};
