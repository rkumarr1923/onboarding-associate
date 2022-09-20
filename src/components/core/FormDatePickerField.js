import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'moment-timezone';
import 'react-datepicker/dist/react-datepicker.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const FormDatePickerField = (props) => {
  const { label, md, controlId, isRequired, onDateChange } = props;
  const [startDate, setStartDate] = useState(new Date());
  const [valid, setValid] = useState(true);

  const handleChangeRaw = (value) => {
    console.log(value);
    if (value) {
      console.log(moment(value, 'MM/DD/YYYY', true).isValid());
      console.log(new Date(value));
      if (moment(value, 'MM/DD/YYYY', true).isValid()) {
        setStartDate(value);
        onDateChange(controlId, value);
        setValid(true);
        console.log(
          new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }).format(value)
        );
      } else {
        setValid(false);
        setStartDate(null);
      }
      let date = moment(value);
      console.log(' date ', date);
    } else {
      console.log(value);
    }
  };

  return (
    <Form.Group as={Col} md={md} controlId={controlId}>
      <Form.Label className="mb-0">
        {label} {isRequired && <span className="required">*</span>}{' '}
      </Form.Label>
      <div className="date-picker-element">
        <DatePicker
          id={controlId}
          selected={startDate}
          onChange={(date) => handleChangeRaw(date)}
          placeholderText="mm/dd/yyyy"
          todayButton={'TODAY'}
          className={
            valid ? 'form-control form-style' : 'form-control is-invalid'
          }
        />
        <span className="fa fa-calendar calendar-element"></span>
      </div>
      <Form.Control.Feedback
        type="invalid"
        className="col-md-6 d-inline-block px-0"
      >
        {!valid ? `${label} is incorrect` : ''}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default FormDatePickerField;
