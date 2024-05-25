import React, { Component } from "react";
import { Button, Text, View } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { setReminderNoti } from "../../asyncStorage/auth";
import { getTime } from "date-fns";
import { select } from "d3";

export default class Clock extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isDateTimePickerVisible: false,
			selectedDate: '',
		};
	}
	convertTimeToDate(timeString) {
		const [time, modifier] = timeString.split(' ');
		let [hours, minutes, seconds] = time.split(':');
		if (modifier === 'PM' && hours !== '12') {
			hours = parseInt(hours, 10) + 12;
		}
		if (modifier === 'AM' && hours === '12') {
			hours = '00';
		}
		const now = new Date();
		now.setHours(hours);
		now.setMinutes(minutes);
		now.setSeconds(seconds);
		now.setMilliseconds(0);
		return now;
	}

	async componentDidMount() {
		if (this.props.reminderTime) {
			const date = this.convertTimeToDate(this.props.reminderTime);
			this.setState({ selectedDate: date });
		}
	}

	showDateTimePicker = () => {
		this.setState({ isDateTimePickerVisible: true });
	};

	hideDateTimePicker = () => {
		this.setState({ isDateTimePickerVisible: false });
		this.props.onClose();
	};

	handleDatePicked = async (date) => {

		// get time from date
		const time = date.toLocaleTimeString();

		console.log("A date has been picked: ", time);
		await setReminderNoti(time);
		// this.setState({ selectedDate: date });
		this.hideDateTimePicker();
		this.props.onClose(time);
	};

	render() {
		const { selectedDate, isDateTimePickerVisible } = this.state;
		return (
			<>
				<DateTimePicker
					mode="time"
					isVisible={true}
					onConfirm={this.handleDatePicked}
					onCancel={this.hideDateTimePicker}
					date={selectedDate ? new Date(selectedDate) : new Date()}
				/>
			</>
		);
	}
}