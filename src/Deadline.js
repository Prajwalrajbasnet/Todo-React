import React from "react";
import DateTimePicker from "react-datetime-picker";

class Deadline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
    };
  }

  handleDateInput = (date) => {
    console.log("onchange of datetimepicker");
    this.setState({ date }, () => {
      this.props.setDeadline(this.state.date);
      console.log(this.state.date);
    });
  };

  resetInput = () => {
    this.setState({
      date: "",
    });
  };

  render() {
    console.log("rendered timepicker");
    return (
      <div>
        <DateTimePicker
          onChange={this.handleDateInput}
          value={this.state.date}
        />
      </div>
    );
  }
}

export default Deadline;
