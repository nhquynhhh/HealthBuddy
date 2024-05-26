import AsyncStorage from '@react-native-async-storage/async-storage';



const setAccessToken = async (accessToken) => {
	try {
		await AsyncStorage.setItem("accessToken", accessToken);
	} catch (e) {
		console.log(e);
	}
}

const setRefreshToken = async (token) => {
	try {
		await AsyncStorage.setItem("refreshToken", token);
	} catch (e) {
		console.log(e);
	}
}

const removeAccessTokenAsync = async () => {
	try {
		await AsyncStorage.removeItem("accessToken");
	} catch (e) {
		console.log(e);
	}
}

const removeRefreshTokenAsync = async () => {
	try {
		await AsyncStorage.removeItem("refreshToken");
	} catch (e) {
		console.log(e);
	}
}

const getAccessToken = async () => {
	try {
		const value = await AsyncStorage.getItem("accessToken");
		if (value !== null) {
			return value;
		}
	} catch (e) {
		console.log(e);
	}

}

const getRefreshToken = async () => {
	try {
		const value = await AsyncStorage.getItem("refreshToken");
		if (value !== null) {
			return value;
		}
		return null;
	} catch (e) {
		console.log(e);
	}
}

const setEncrypted = async (encrypted) => {
	try {
		await AsyncStorage.setItem("encrypted", encrypted);
	} catch (e) {
		console.log(e);
	}
}


const getEncrypted = async () => {
	try {
		const value = await AsyncStorage.getItem("encrypted");
		if (value !== null) {
			return value;
		}
	} catch (e) {
		console.log(e);
	}
}

const removeEncrypted = async () => {
	try {
		await AsyncStorage.removeItem("encrypted");
	} catch (e) {
		console.log(e);
	}
}

const setReminderNoti = async (reminderTime) => {
	try {
		await AsyncStorage.setItem("reminderTime", reminderTime);
	} catch (e) {
		console.log(e);
	}
}

const getReminderTime = async () => {
	try {
		const value = await AsyncStorage.getItem("reminderTime");
		if (value !== null) {
			return value;
		}
		return null;
	} catch (e) {
		console.log(e);
	}
}

const removeReminderTime = async () => {
	try {
		await AsyncStorage.removeItem("reminderTime");
	} catch (e) {
		console.log(e);
	}
}

const setPaymentURL = async (paymentURL) => {
	try {
		await AsyncStorage.setItem("paymentURL", paymentURL);
	} catch (e) {
		console.log(e);
	}
}

const getPaymentURL = async () => {
	try {
		const value = await AsyncStorage.getItem("paymentURL");
		if (value !== null) {
			return value;
		}
		return null;
	} catch (e) {
		console.log(e);
	}
}

const removePaymentURL = async () => {
	try {
		await AsyncStorage.removeItem("paymentURL");
	} catch (e) {
		console.log(e);
	}
}

export {
	setAccessToken,
	setRefreshToken,
	getAccessToken,
	getRefreshToken,
	setEncrypted,
	getEncrypted,
	removeAccessTokenAsync,
	removeRefreshTokenAsync,
	removeEncrypted,
	setReminderNoti,
	getReminderTime,
	removeReminderTime,
	setPaymentURL,
	getPaymentURL,
	removePaymentURL
};

