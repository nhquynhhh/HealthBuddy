import React, { Component } from "react";
import { Button, Text, View } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
 
export default class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      selectedDate:'',
    };
  }
 
  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };
 
  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
    this.props.onClose();
  };
 
  handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    // setstate({selectedDate:date});
    this.hideDateTimePicker();
    this.props.onClose();

  };
 
  render() {
    return (
      <>
        <DateTimePicker
          mode="time"
          isVisible={true}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
      </>
    );
  }
}