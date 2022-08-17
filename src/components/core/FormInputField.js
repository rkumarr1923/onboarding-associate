import React from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const FormInputField = (props) => {
    const { label, fieldName, value, handleChange, placeHolder, validationErrors } = props;
    return <Form.Group as={Col} {...props}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        className='form-style'
        type="text"
        name={fieldName}
        value={value}
        placeholder={placeHolder}
        onChange={handleChange}
      />
      <p>{validationErrors[fieldName]}</p>
    </Form.Group>
  }
  
  export default FormInputField;