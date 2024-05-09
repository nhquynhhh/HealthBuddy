import { save_calories } from './api_list';

async function saveCalories(meals, authToken) {
    const url = save_calories.url;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
    };
    const data = {
        morning_calo: meals.breakfast,
        noon_calo: meals.lunch,
        dinner_calo: meals.dinner,
        snack_calo: meals.snacks,
        exercise_calo: meals.workout
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Failed to save calories');
        }
        return response.json();
    } catch (error) {
        throw error;
    }
}

export { saveCalories };