import { MongooseModuleOptions } from '@nestjs/mongoose';

export function getDevDatabaseConfig(): MongooseModuleOptions {
  process.env.TESTDBURL;

  return {
    uri: 'mongodb://localhost:27017', // Replace with your development MongoDB connection string
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
}
