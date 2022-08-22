import React from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const FormInputField = (props) => {
    const { label, fieldName, value, handleChange, placeHolder, validationErrors, controlId, md } = props;
    return <Form.Group as={Col} md={md} controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        className='form-style'
        type="text"
        name={fieldName}
        value={value}
        placeholder={placeHolder}
        onChange={handleChange}
      />
      <Form.Control.Feedback type="invalid" className="col-md-6 d-inline-block px-0">{validationErrors[fieldName]}</Form.Control.Feedback>
    </Form.Group>
  }
  
  export default FormInputField;