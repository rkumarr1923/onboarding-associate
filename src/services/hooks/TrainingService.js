import axios from 'axios';

const BASE_URL = "http://localhost:9094/training";

class TrainingService {

    getTrainings(){
        return axios.get(BASE_URL+'/get-all-training');
    }

    createTraining(training){
        return axios.post(BASE_URL+'/add-training', training);
    }

    getTrainingById(trainingId){
        return axios.get(BASE_URL + '/' + trainingId);
    }

    updateTraining(training, trainingId){
        return axios.put(BASE_URL + '/' + trainingId, training);
    }

    deleteTraining(trainingId){
        return axios.delete(BASE_URL + '/' + trainingId);
    }
}

export default new TrainingService()