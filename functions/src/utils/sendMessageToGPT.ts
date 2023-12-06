/**
 * Wysyła wiadomość do modelu GPT i otrzymuje odpowiedź.
 * @param {string} message - Wiadomość do wysłania do modelu GPT.
 * @return {Promise<OpenAI.Chat.ChatCompletion>} Obiekt zawierający odpowiedź
 */

import {OpenAI} from 'openai';

export async function sendMessageToGPT(openai: OpenAI, message: string) {
  const chatCompletion: OpenAI.Chat.ChatCompletion =
    await openai.chat.completions.create({
      messages: [{role: 'user', content: message}],
      model: 'gpt-4',
    });

  return chatCompletion;
}
