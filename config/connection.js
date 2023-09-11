import { connect, connection } from 'mongoose';

const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetwork';

connect(connectionString);

export default connection;
