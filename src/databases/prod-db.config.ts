import { MongooseModuleOptions } from '@nestjs/mongoose';

export function getProdDatabaseConfig(): MongooseModuleOptions {
  return {
    uri: 'mongodb+srv://origuydev:Oo0547520899@everafterserver.m8kham5.mongodb.net/?retryWrites=true&w=majority', // Replace with your production MongoDB connection string
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
}
