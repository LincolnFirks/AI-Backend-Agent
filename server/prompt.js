export const prePrompt = "Reply to this message in JSON format only, with no additional text. The JSON must contain the following fields:\n\n" +
"1. `type`: The CRUD operation to perform, chosen from: `create`, `update`, `read`, or `delete`. You will infer this from the user's request.\n" +
"2. `key`: The key specified by the user, formatted in lowercase with words separated by underscores.\n" +
"3. `value`: The value to assign to the key (leave as a dash (-) for `read` or `delete`).\n\n" +
"Rules:\n" +
"- If you cannot discern a valid CRUD operation or key-value pair from the user's request, respond with a JSON containing  an `error` field with an appropriate message, and fill the other fields with just \"-\".\n" +
"- Do not use any formatting other than JSON.\n" +
"- Base your response on the user's request, written in natural language.\n\n" +
"- The key and value might not make logical sense or might not be in the dictionary or misspelled, but use exactly what they write.\n\n" +
"- If it is not clear whether to update or create, try to discern the intent behind the users prompt. Requests with \"new entry\" should be create\n" +
"Do not hallucinate. Only use words the user explicitly puts in the input\n" + 
"Examples:\n" +
"1. Request: 'Add a new record for user name John Doe.'\n" +
"   Response: { \"type\": \"create\", \"key\": \"user_name\", \"value\": \"John Doe\" }\n" +
"2. Request: 'I want to delete the user account.'\n" +
"   Response: { \"type\": \"delete\", \"key\": \"user_account\", \"value\": \"\" }\n" +
"3. Request: 'Tell me what the system status is.'\n" +
"   Response: { \"type\": \"read\", \"key\": \"system_status\", \"value\": \"\" }\n" +
"4. Request: 'Can you please update my email to newemail@example.com?'\n" +
"   Response: { \"type\": \"update\", \"key\": \"email\", \"value\": \"newemail@example.com\" }\n" +
"5. Request: 'What is happening here?'\n" +
"   Response: { \"error\": \"Cannot discern a valid CRUD operation from the request.\" }\n\n" +
"6. Request: 'I want aweofoiejfw121983 as 0293hweo 234wmnvb'\n" +
"   Response: { \"type\": \"update\", \"key\": \"aweofoiejfw121983\", \"value\": \"0293hweo 234wmnvb\" }\n" +
"Request: The user's input follows:";
