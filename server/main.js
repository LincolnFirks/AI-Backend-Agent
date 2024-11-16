import { Meteor } from 'meteor/meteor';
import { CurrentStore } from '../imports/api/store';
import { HistoryStore } from '../imports/api/store';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const prePrompt = "Reply to this message in json format only, nothing else. The json should have a type, a key and a value. The method will be one of: update, read, create or delete. The key will be what the user specifies.  The value will be the value to change the data for key too (can leave blank for delete and read). I want you to discern the key and value from the users request, which will be natural language. If you cannot discern a valid CRUD operation from the prompt, you should respond with a JSON with an error message only. If the user's key is multiple words, use only underscores to separate them. Make all keys lowercase. "

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });


Meteor.methods({
    async GetJSON(userPrompt) {
        const fullPrompt = prePrompt + userPrompt;
        const result = await model.generateContent(fullPrompt);
        console.log(result.response.text());
        try {
            const match = result.response.text().match(/```json\s*([\s\S]*?)\s*```/);
            if (match && match[1]) {
                // Parse the extracted JSON
                const parsed = JSON.parse(match[1]);
        
                console.log(`Type: ${jsonData.type}`);
                console.log(`Key: ${jsonData.key}`);
                console.log(`Value: ${jsonData.value}`);
            } else {
                console.error('No JSON found in the input');
            }
        } catch(e) {
            throw new Meteor.Error(e);
        }

        if (parsed.error) {
            return parsed.error;
        }

        const validMethods = ['update', 'read', 'create', 'delete'];

        if (!parsed.hasOwnProperty(method) || !parsed.hasOwnProperty(key) || !parsed.hasOwnProperty(value) || !validMethods.includes(parsed.method)) {
            throw new Meteor.Error("Invalid JSON format.");
        }

        return parsed;
    },


    

    async create({ key, value }) {
        if (!key || !value) throw new Meteor.Error("invalid-arguments", "Key and value are required.");
        const cursor = CurrentStore.findOneAsync({ key});
        if (cursor) {
          throw new Meteor.Error("invalid-arguments", "Document with this key exists already.");
        }
        const time = new Date()
        doc = {
          key,
          value,
          created: time,
          updated: time

        }
        delete doc._id;
        CurrentStore.insertAsync(doc);

        HistoryStore.insertAsync({method: "create",key,value,time})
    },
    async update({ key, value }) {
        if (!key || !value) throw new Meteor.Error("invalid-arguments", "Key and value are required.");
        const cursor = await CurrentStore.findOneAsync({ key });
        if (!cursor) {
          throw new Meteor.Error("invalid-arguments", "No document with this key");
        }
        const time = new Date();
        const updatedDoc = {
            $set: { value, updated: time } 
        };
        
        CurrentStore.updateAsync(updatedDoc);
        HistoryStore.insertAsync({method: "update",key,value,time})
    },
    async read(key) {
        const cursor = await CurrentStore.findOneAsync({ key });
        if (!cursor) {
          throw new Meteor.Error("invalid-arguments", "No document with this key");
        }
        HistoryStore.insertAsync({method: "read",key,value: cursor.value,time: new Date()})
        return cursor;

    },   
    async delete(key) {
        const cursor = await CurrentStore.findOneAsync({ key });
        if (!cursor) {
          throw new Meteor.Error("invalid-arguments", "No document with this key");
        }
  
        CurrentStore.removeAsync({key});
        HistoryStore.insertAsync({method: "delete",key,value: cursor.value,time: new Date()})
    },

});



Meteor.startup(async () => {
  
  Meteor.publish("current", function () {
    return StoreCollection.find();
  });

  Meteor.publish("history", function () {
    return StoreCollection.find();
  });

});
