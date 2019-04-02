import React, { Component } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';

class PPGSimpleSelect extends Component {
  state = {
    selectedOption: this.props.defaultValue
  };
  handleChange = selectedOption => {
    this.setState({ selectedOption }, () => {
      this.props.handleChange(selectedOption);
    });
  };
  render() {
    const { selectedOption } = this.state;
    const { options, isMulti } = this.props;
    return (
      <Select
        value={selectedOption}
        components={makeAnimated()}
        onChange={this.handleChange}
        options={options}
        isLoading={this.props.isLoading}
        isMulti={isMulti}
      />
    );
  }
}

export default PPGSimpleSelect;
