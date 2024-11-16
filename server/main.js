import { Meteor } from 'meteor/meteor';
import { CurrentStore } from '../imports/api/store';
import { HistoryStore } from '../imports/api/store';

Meteor.methods({
    async create({ key, value }) {
      if (!key || !value) throw new Meteor.Error("invalid-arguments", "Key and value are required.");
      const cursor = CurrentStore.findOneAsync({ key });
      if (cursor) {
        throw new Meteor.Error("invalid-arguments", "Document with this key exists already.");
      }
      doc = {
        key,
        value,
        time: new Date()
      }
      
        StoreCollection.insertAsync(doc);
      
    },
});



Meteor.startup(async () => {
  
  Meteor.publish("store", function () {
    return StoreCollection.find();
  });
});
