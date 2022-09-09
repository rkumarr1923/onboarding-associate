import React from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const FormInputField = (props) => {
    const { label, fieldName, value, handleChange, placeHolder, validationErrors, controlId, md } = props;
    return <Form.Group as={Col} md={md} controlId={controlId} className='form-group-style'>
      <Form.Label className='form-label-style'>{label}</Form.Label>
      <Form.Control
        className='form-style'
        type="text"
        name={fieldName}
        value={value}
        placeholder={placeHolder}
        onChange={handleChange}
      />
      {validationErrors[fieldName] && <Form.Control.Feedback 
        type="invalid" 
        className="d-inline-block">
        <i class="fa fa-exclamation-circle" 
        aria-hidden="true"></i>
        {validationErrors[fieldName]}
      </Form.Control.Feedback>}
    </Form.Group>
  }
  
  export default FormInputField;