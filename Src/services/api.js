const STREAM_API_URL = 'https://therapy-pro.stackup.solutions/api';
const API_URL = 'https://therapy-pro-api.stackup.solutions/api';
export const apiClient = {
  stream: async (url, data) => {
    console.log('testingdata', url, data);

    const token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMTlkZjIxZjg1YmVkYzdlMTBjYjM5YTQwOWE2YTM1ZTNkZGZiZWVmYmQwNmM1OTE4ZTJlOGYyZDRiNTAzYjdmNzE4NDY2YTZmMDZkZDNlM2QiLCJpYXQiOjE3NDk3MTQ3NzguNDAwMTkzLCJuYmYiOjE3NDk3MTQ3NzguNDAwMTk1LCJleHAiOjE3ODEyNTA3NzguMzk4NDczLCJzdWIiOiIyNSIsInNjb3BlcyI6W119.BNgaJ5eUkVyskQS7Z8R6s9W79FoI_9mzVLibUWct3iFDGpCnf5GYfRd7EwF6qJrVWBqARUhoh9ejOqwvufelQ63pTYgkOQ5zXsTmKkhOXg3tMmHXM1T8dNUg-rfgrsC65bcD7h4xtiBSU0lIQ7RxxFOF7VizN56oiFRNciOddUO2_OUskg_oZdVKogxnqmhCZMFuTnCd1ZEpzPj64McK8_d7O-I5Myvh-Ne2_wbUIijc9iLoxP4JXOQmCb9pzJNFz_NgthxsdsVsRsqSZVi5hyfIeO1OwG83_I9LE9tI4WNbhop5Rc09SmeeXqQmT601PQ2KCgu2wFeBPV5q4_ZxBkbSgEO5KiIcolG0fncBzUHJCJT3Zc1-gpBSjTWeeEMP4P65UFQi-raku9OTsFU7MGhxuDm3M6y8F5hy1k5W5Aehuz0OuWDku97i40pWjO0auoGORoAA193MEUe8AwViqZUMlaFBaH_2C9w9iVEvDkY-asgEGfob_vyLWrkt8GUuB7l--U8IgxxeQB1QI9qacCcV8XEwntO1FCHvwaaBuVDpMpwqpS8ka48JeRV8Kk7a40ElUDOFJiertp1AsI-hQkHCKSqdeJLSliuNNJpo3WtfhsF8Eh3s_Qrpv_BB-suwtzGDm-b7a8S0n47FSmu97GoZgAKzfdCiWHXNr0PsFe4';
    const fullUrl = `${API_URL}${url}`;

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
