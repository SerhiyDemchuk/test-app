import axios from 'axios';
import { IModes } from '../models/IMode';

export const getModes = () => {
    return axios.get<IModes>('https://demo1030918.mockable.io/')
        .then(response => response.data);
}