import { Meteor } from 'meteor/meteor';
import { CurrentStore } from '../imports/api/store';
import { HistoryStore } from '../imports/api/store';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prePrompt } from './prompt';
import dotenv from 'dotenv';
dotenv.config();


const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b"});

Meteor.methods({
    async GetJSON(userPrompt) {
        const fullPrompt = prePrompt + userPrompt;
        const result = await model.generateContent(fullPrompt);
        console.log(result.response.text());
        try {
            const match = result.response.text().match(/```json\s*([\s\S]*?)\s*```/);
            if (match && match[1]) {
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
            parsed.method = '-';
            parsed.key = '-';
            parsed.value = '-';
            return parsed;
        }

        const validMethods = ['update', 'read', 'create', 'delete'];

        if (!parsed.hasOwnProperty(method) || !parsed.hasOwnProperty(key) || !parsed.hasOwnProperty(value) || !validMethods.includes(parsed.method)) {
            parsed.method = '-';
            parsed.key = '-';
            parsed.value = '-';
            parsed.error = ("LLM JSON response was invalid");
        }

        return parsed;
    },

    CallCRUD(result) {

        if (!result.method) {
            throw new Meteor.Error("invalid-arguments", "Method is required.");
        }
        if (!key || !value) throw new Meteor.Error("invalid-arguments", "Key and value are required.");

        const method = result.method;

        if (method === "create") {
            Create(method.key,method.value);
        } else if (method === "delete") {
            Delete(method.key);
        } else if (method === "update") {
            Update(method.key,method.value);
        } else if (method === "read") {
            Read(method.key);
        }
    }



});

async function Create({ key, value }) {
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
}

async function Update({ key, value }) {
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
}

async function Read(key) {
    const cursor = await CurrentStore.findOneAsync({ key });
    if (!cursor) {
      throw new Meteor.Error("invalid-arguments", "No document with this key");
    }
    HistoryStore.insertAsync({method: "read",key,value: cursor.value,time: new Date()})
    return cursor;

}

async function Delete(key) {
    const cursor = await CurrentStore.findOneAsync({ key });
    if (!cursor) {
      throw new Meteor.Error("invalid-arguments", "No document with this key");
    }

    CurrentStore.removeAsync({key});
    HistoryStore.insertAsync({method: "delete",key,value: cursor.value,time: new Date()})
}



Meteor.startup(async () => {
  
  Meteor.publish("current", function () {
    return StoreCollection.find();
  });

  Meteor.publish("history", function () {
    return StoreCollection.find();
  });

});