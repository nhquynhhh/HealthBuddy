import { detect } from "./api_list";
import axios from "axios";

export const callDetectAPI = async (uri, accessToken) => {
	const url = detect.url;

	const formData = new FormData();
	let uriParts = uri.split(".");
	let fileType = uriParts[uriParts.length - 1];
	formData.append("image", {
		uri: uri,
		name: `photo.${fileType}`,
		type: `image/${fileType}`,
	});


	return fetch(url, {
		method: detect.method,
		headers: {
			"Authorization": `Bearer ${accessToken}`,
			"Accept": "application/json",
			"Content-Type": "multipart/form-data",
		},
		body: formData,
	});
}