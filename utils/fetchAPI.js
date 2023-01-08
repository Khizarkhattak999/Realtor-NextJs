import axios from "axios";

export const baseURL = "https://bayut.p.rapidapi.com";

export const fetchAPI = async (url) => {
  const { data } = await axios.get((url), {
    headers: {
        'X-RapidAPI-Key': '3b25fc1c97msh6d6b3b3c1fd7412p1bb56fjsn133805cf3965',
        'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
      }
  });
  return data;
};
