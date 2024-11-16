import { Mongo } from 'meteor/mongo';

export const CurrentStore = new Mongo.Collection('current');
export const HistoryStore = new Mongo.Collection('history');
