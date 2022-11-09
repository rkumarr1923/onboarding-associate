import axios from 'axios';

const BASE_URL = 'http://localhost:9094/training';

class TrainingService {
  getTrainings() {
    return axios.get(BASE_URL + '/get-all-training');
  }

  createTraining(training, headers) {
    return axios.post(BASE_URL + '/add-training', training, {
      headers: headers,
    });
  }

  getTrainingById(trainingId) {
    return axios.get(BASE_URL + '/' + trainingId);
  }

  updateTraining(training, trainingId, headers) {
    return axios.put(BASE_URL + '/' + trainingId, training, {
      headers: headers,
    });
  }

  deleteTraining(trainingId, headers) {
    return axios.delete(BASE_URL + '/' + trainingId, {
      headers: headers,
    });
  }
}

export default new TrainingService();
