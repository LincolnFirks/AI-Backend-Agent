import { Meteor } from 'meteor/meteor';
import { CurrentStore } from '/imports/api/store';
import { HistoryStore } from '/imports/api/store';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prePrompt } from './prompt';
import { GEMINI_MODEL, API_KEY } from './keys';

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: GEMINI_MODEL});

Meteor.methods({
    async GetJSON(userPrompt) {
        const fullPrompt = prePrompt + userPrompt;
        const result = await model.generateContent(fullPrompt);
        let parsed = {
            error: "Error when parsing:",
            method: "-",
            key: "-",
            value: "-"
        }
        try {
            const match = result.response.text().match(/```json\s*([\s\S]*?)\s*```/);
            if (match && match[1]) {
                parsed = JSON.parse(match[1]);
            } else {
                console.error('No JSON found in the input');
            }
        } catch(e) {
            console.error(e)
            return parsed
                
            
        }

        if (parsed.error) {
            parsed.method = '-';
            parsed.key = '-';
            parsed.value = '-';
            return parsed;
        }

        const validMethods = ['update', 'read', 'create', 'delete'];

        if (parsed && typeof parsed === 'object') {
            if (!parsed.hasOwnProperty('method') || 
                !parsed.hasOwnProperty('key') || 
                !parsed.hasOwnProperty('value') || 
                !validMethods.includes(parsed.method))  {
            parsed.method = '-';
            parsed.key = '-';
            parsed.value = '-';
            parsed.error = ("LLM JSON response was invalid");
        }
        return parsed;
        }
    },

    CallCRUD(result) {

        if (!result.method) {
            console.error( "Method is required.");
        }
        if (!result.key || !result.value) console.error("Key and value are required.");

        const method = result.method;
        
        if (method === "create") {
            Create(result.key,result.value);
        } else if (method === "delete") {
            Delete(result.key);
        } else if (method === "update") {
            Update(result.key,result.value);
        } else if (method === "read") {
            Read(result.key);
        }
    }
});

async function Create(key, value ) {
    if (!key || !value) console.error("invalid-arguments", "Key and value are required.");
    const cursor = await CurrentStore.findOneAsync({ key});
    if (cursor) {
        console.log(cursor);
        console.error("Document with this key exists already.");
    }

    const time = new Date()
    let doc = {
      key,
      value,
      created: time,
      updated: time

    }
    delete doc._id;
    CurrentStore.insertAsync(doc);
    
    HistoryStore.insertAsync({method: "create",key,value,time})
}

async function Update( key, value ) {
    if (!key || !value) console.error("invalid-arguments", "Key and value are required.");
    const cursor = await CurrentStore.findOneAsync({ key });
    if (!cursor) {
      console.error("No document with this key");
      return;
    }
    const time = new Date();
    const updatedDoc = {
        $set: { value, updated: time } 
    };
    
    CurrentStore.updateAsync({ key },updatedDoc);
    HistoryStore.insertAsync({method: "update",key,value,time})
}

async function Read(key) {
    const cursor = await CurrentStore.findOneAsync({ key });
    if (!cursor) {
      return;
    }
    HistoryStore.insertAsync({method: "read",key,value: cursor.value,time: new Date()})
    return cursor;

}

async function Delete(key) {
    console.log("Deleting")
    const cursor = await CurrentStore.findOneAsync({ key });
    if (!cursor) {
        console.error("No document with this key");
        return;
    }

    CurrentStore.removeAsync({key});
    HistoryStore.insertAsync({method: "delete",key,value: cursor.value,time: new Date()})
}



Meteor.startup(async () => {
  
  Meteor.publish("current", function () {
    return StoreCollection.find();
  });

  Meteor.publish("history", function () {
    return HistoryStore.find();
  });

});