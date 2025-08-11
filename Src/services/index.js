import { link } from '../Constants';
import { create_Chat } from '../endPoints';

// const API_URL = 'https://api-glassdoctor.stackup.solutions/chat/aski';
export const apiClient = {
  stream: async (url, data) => {
    console.log('testingdata', url, data);

    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiaWF0IjoxNzUxNjQxMjQ5LCJleHAiOjE3NTUwOTcyNDl9.yjyuOtBDIa69lnWXHrCXhKyqoNAURJ2L41BpktfoAkc';
    const fullUrl = `${link.baseUrl}/${data}`;
    console.log(fullUrl);

    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      reactNative: { textStreaming: true }, // only used in React Native
    });

    return response;
  },
};
