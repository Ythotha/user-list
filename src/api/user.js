import axios from 'axios';

export default {
  async getUsersData(quantity = 100) {
    const response = await axios.get(`https://randomuser.me/api/?results=${quantity}`);

    return response.data.results;
  },
};
