import { add_morning } from './api_list';
import {getAccessToken
} from '../../asyncStorage/auth';


async function save_calories_morning(breakfast) {
    const authToken = await getAccessToken();
    const url = add_morning.url;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
    };
    console.log('breakfast', url, breakfast);
    const data = {
        morning_calo: parseInt(breakfast)
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });
        console.log(headers);
        if (!response.ok) {
            throw new Error('Failed to save calories');
        }
        return response.json();
    } catch (error) {
        throw error;
    }
}

export { save_calories_morning };