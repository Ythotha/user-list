import axios from 'axios';

export default {
  async getUsersData() {
    const response = await axios.get('https://randomuser.me/api/?results=100');

    return response.data.results;
  },
};
