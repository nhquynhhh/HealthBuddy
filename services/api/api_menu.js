import { new_genetic_algorithm, get_suggest_menu} from "./api_list";

export const callNewGeneticAlgorithm = async (accessToken) => {
	const url = new_genetic_algorithm.url;
	const headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${accessToken}`
	};
	const method = new_genetic_algorithm.method;
	return fetch(url, {
		method,
		headers
	});
}

export const callGetSuggestMenu = async (accessToken) => {
    const url = get_suggest_menu.url;
    const headers = {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${accessToken}`
    };
    const method = get_suggest_menu.method;
    return fetch(url, {
        method,
        headers
    });
}
