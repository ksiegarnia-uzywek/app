// import {logger} from 'firebase-functions/v1';
// import {OpenAI} from 'openai';

// export async function sendMessageToGPTWithImage(
//   openai: OpenAI,
//   text: string,
//   imageUrl: string,
// ) {
//   const modelName = 'gpt-4-vision-preview';

//   logger.debug(`image: ${imageUrl}, text: ${text}`);

//   const chatCompletion = await openai.chat.completions.create({
//     model: modelName,
//     messages: [
//       {
//         role: 'system',
//         content: JSON.stringify([
//           {type: 'text', text: text},
//           {
//             type: 'image_url',
//             image_url: {url: imageUrl, detail: 'high'},
//           },
//         ]),
//       },
//     ],
//   });

//   return chatCompletion;
// }
