import React, { Component, useState } from 'react';
import CustomButton from '../core/Button';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FormInputField from '../core/FormInputField';
// import DatePicker from 'react-datepicker';
import '../styles/associate.css';

class AddNewAssociate extends Component {
  state = {
    firstName: '',
    lastName: '',
    ibmId: '',
    ibmEmail: '',
    location: '',
    role: '',
    engagementName: '',
    primaryContact: '',
    projectId: '',
    majorFunction: '',
    band: '',
    clientManager: '',
    clientEmail: '',
    xid: '',
    endDate: '',
    city: '',
    billType: '',
    billCode: '',
    asOnDate: '',
    experienceIT: '',
    experienceClient: '',
    experienceIBM: '',
    experienceWithClient: '',
    totalExperienceWithIBM: '',
    totalITExperience: '',
    resourceCriticality: '',
    atImmigrationVisaRisks: '',
    backupSuccessorResource: '',
    keyContingencyGroup: '',
    additionalContingency: '',
    visaType: '',
    workPermitValidUntil: '',
    extensionUpdates: '',
    visaMaxOutDate: '',
    timeLeftInUs: '',
    visaNominations: '',
    riskMitigationComments: '',
    planInCaseOfExtensionAmendmentRejection: '',
    h1bNominations: '',
    skillset: '',
    validationErrors: {}
  };

  validators = {
    firstName: (str) => str === '' ? 'Cannot be blank' : '',
    lastName: (str) => str === '' ? 'Cannot be blank' : '',
    ibmEmail: (str) => !/.+@.+\..+/.test(str) ? 'Invalid email address' : '',
    location: () => '',
    role: () => '',
    engagementName: () => '',
    primaryContact: () => '',
    projectId: () => '',
    majorFunction: () => '',
    band: () => '',
    clientManager: () => '',
    clientEmail: () => '',
    xid: () => '',
    endDate: () => '',
    city: () => '',
    billType: () => '',
    billCode: () => '',
    asOnDate: () => '',
    experienceIT: () => '',
    experienceClient: () => '',
    experienceIBM: () => '',
    experienceWithClient: () => '',
    totalExperienceWithIBM: () => '',
    totalITExperience: () => '',
    resourceCriticality: () => '',
    atImmigrationVisaRisks: () => '',
    backupSuccessorResource: () => '',
    keyContingencyGroup: () => '',
    additionalContingency: () => '',
    visaType: () => '',
    workPermitValidUntil: () => '',
    extensionUpdates: () => '',
    visaMaxOutDate: () => '',
    timeLeftInUs: () => '',
    visaNominations: () => '',
    riskMitigationComments: () => '',
    planInCaseOfExtensionAmendmentRejection: () => '',
    h1bNominations: () => '',
    skillset: () => ''
  }

  validate = (name) => {
    const value = this.state[name];
    let error = this.validators.hasOwnProperty(name) ? this.validators[name](value) : '';
    this.setState(({ validationErrors }) => ({ validationErrors: { ...validationErrors, [name]: error } }));
    return error;
  }

  handleChange = (e) => {
    const fieldName = e.currentTarget.name;
    this.setState(
      { [fieldName]: e.currentTarget.value },
      () => this.validate(fieldName)
    );
  }

  onSubmit = (e) => {
    e.preventDefault();

    const isValid = Object.keys(this.validators).map(this.validate).every((err) => !err);
    if (isValid) {
      // submit form
    }
  }

  render() {
    return (
      <Form noValidate onSubmit={this.onSubmit} className="associate-form" >
        <h2>Associate Information</h2>
        <hr />
        <Row>
          <FormInputField
            md="4"
            controlId="firstName"
            label='Associate first name'
            fieldName='firstName'
            value={this.state.firstName}
            handleChange={this.handleChange}
            placeHolder='First name'
            validationErrors={this.state.validationErrors}
          />
          <FormInputField
            md="4"
            controlId="lastName"
            label='Associate last name'
            fieldName='lastName'
            value={this.state.lastName}
            handleChange={this.handleChange}
            placeHolder='Last name'
            validationErrors={this.state.validationErrors}
          />
          <FormInputField
            md="4"
            controlId="ibmEmail"
            label='IBM Email'
            fieldName='ibmEmail'
            value={this.state.ibmEmail}
            handleChange={this.handleChange}
            placeHolder='Email address'
            validationErrors={this.state.validationErrors}
          />
          <FormInputField
            md="4"
            controlId="ibmId"
            label='IBM Id'
            fieldName='ibmId'
            value={this.state.ibmId}
            handleChange={this.handleChange}
            placeHolder='Employee Id'
            validationErrors={this.state.validationErrors}
          />
          <FormInputField
            md="4"
            controlId="location"
            label='Location'
            fieldName='location'
            value={this.state.location}
            handleChange={this.handleChange}
            placeHolder='location'
            validationErrors={this.state.validationErrors}
          />
          <FormInputField
            md="4"
            controlId="role"
            label='Role'
            fieldName='role'
            value={this.state.role}
            handleChange={this.handleChange}
            placeHolder='role'
            validationErrors={this.state.validationErrors}
          />
          <FormInputField
            md="4"
            controlId="experienceIT"
            label='IT Experience'
            fieldName='experienceIT'
            value={this.state.experienceIT}
            handleChange={this.handleChange}
            placeHolder='IT experience'
            validationErrors={this.state.validationErrors}
          />
          <FormInputField
            md="4"
            controlId="engagementName"
            label='Engagement Name'
            fieldName='engagementName'
            value={this.state.engagementName}
            handleChange={this.handleChange}
            placeHolder='Engagement name'
            validationErrors={this.state.validationErrors}
          />
          <FormInputField
            md="4"
            controlId="primaryContact"
            label='Primary Contact'
            fieldName='primaryContact'
            value={this.state.primaryContact}
            handleChange={this.handleChange}
            placeHolder='Primary contact'
            validationErrors={this.state.validationErrors}
          />
          <FormInputField
            md="4"
            controlId="projectId"
            label='Project Id'
            fieldName='projectId'
            value={this.state.projectId}
            handleChange={this.handleChange}
            placeHolder='Project Id'
            validationErrors={this.state.validationErrors}
          />
          <FormInputField
            md="4"
            controlId="majorFunction"
            label='Major Function'
            fieldName='majorFunction'
            value={this.state.majorFunction}
            handleChange={this.handleChange}
            placeHolder='Major function'
            validationErrors={this.state.validationErrors}
          />
          <FormInputField
            md="4"
            controlId="band"
            label='Band'
            fieldName='band'
            value={this.state.band}
            handleChange={this.handleChange}
            placeHolder='Band'
            validationErrors={this.state.validationErrors}
          />
          <FormInputField
            md="4"
            controlId="clientEmail"
            label='Client Email'
            fieldName='clientEmail'
            value={this.state.clientEmail}
            handleChange={this.handleChange}
            placeHolder='Client email'
            validationErrors={this.state.validationErrors}
          />
          <FormInputField
            md="4"
            controlId="email"
            label='Email'
            fieldName='email'
            value={this.state.email}
            handleChange={this.handleChange}
            placeHolder='Email address'
            validationErrors={this.state.validationErrors}
          />
          <FormInputField
            md="4"
            controlId="xid"
            label='XID'
            fieldName='xid'
            value={this.state.xid}
            handleChange={this.handleChange}
            placeHolder='XID'
            validationErrors={this.state.validationErrors}
          />
          <FormInputField
            md="4"
            controlId="clientManager"
            label='Client Manager'
            fieldName='clientManager'
            value={this.state.clientManager}
            handleChange={this.handleChange}
            placeHolder='Client manager'
            validationErrors={this.state.validationErrors}
          />
          <FormInputField
            md="4"
            controlId="endDate"
            label='End Date'
            fieldName='endDate'
            value={this.state.endDate}
            handleChange={this.handleChange}
            placeHolder='End Date'
            validationErrors={this.state.validationErrors}
          />
          {/* <DatePicker selected={this.state.endDate} onChange={(date) => console.log('date ss ')} /> */}
          <FormInputField
            md="4"
            controlId="city"
            label='City'
            fieldName='city'
            value={this.state.city}
            handleChange={this.handleChange}
            placeHolder='City'
            validationErrors={this.state.validationErrors}
          />
          <FormInputField
            md="4"
            controlId="billType"
            label='Bill Type'
            fieldName='billType'
            value={this.state.billType}
            handleChange={this.handleChange}
            placeHolder='Bill type'
            validationErrors={this.state.validationErrors}
          />
          <FormInputField
            md="4"
            controlId="billCode"
            label='Bill Code'
            fieldName='billCode'
            value={this.state.billCode}
            handleChange={this.handleChange}
            placeHolder='Bill code'
            validationErrors={this.state.validationErrors}
          />
          <FormInputField
            md="4"
            controlId="asOnDate"
            label='As On Date'
            fieldName='asOnDate'
            value={this.state.asOnDate}
            handleChange={this.handleChange}
            placeHolder='As on date'
            validationErrors={this.state.validationErrors}
          />
          <FormInputField
            md="4"
            controlId="experienceClient"
            label='Client Exp Date'
            fieldName='experienceClient'
            value={this.state.experienceClient}
            handleChange={this.handleChange}
            placeHolder='Client exp date'
            validationErrors={this.state.validationErrors}
          />
          <FormInputField
            md="4"
            controlId="experienceIBM"
            label='IBM Experience'
            fieldName='experienceIBM'
            value={this.state.experienceIBM}
            handleChange={this.handleChange}
            placeHolder='IBM experience'
            validationErrors={this.state.validationErrors}
          />
          <FormInputField
            md="4"
            controlId="experienceWithClient"
            label='Experience with client'
            fieldName='experienceWithClient'
            value={this.state.experienceClient}
            handleChange={this.handleChange}
            placeHolder='Experience with client'
            validationErrors={this.state.validationErrors}
          />
          <FormInputField
            md="4"
            controlId="experienceIT"
            label='Career experience'
            fieldName='experienceIT'
            value={this.state.experienceIT}
            handleChange={this.handleChange}
            placeHolder='Career experience'
            validationErrors={this.state.validationErrors}
          />
          <FormInputField
            md="4"
            controlId="totalExperienceWithIBM"
            label='Total experience with IBM'
            fieldName='totalExperienceWithIBM'
            value={this.state.totalExperienceWithIBM}
            handleChange={this.handleChange}
            placeHolder='Total experience with IBM'
            validationErrors={this.state.validationErrors}
          />
          <FormInputField
            md="4"
            controlId="resourceCriticality"
            label='Resource criticality'
            fieldName='resourceCriticality'
            value={this.state.resourceCriticality}
            handleChange={this.handleChange}
            placeHolder='Resource criticality'
            validationErrors={this.state.validationErrors}
          />

        </Row>
        <div className='form-buttons'>
          <Button type="submit" className='submit-btn' >Submit</Button>
          <CustomButton clickHandler={() => { this.props.setFormVisiblity(false) }} label="Cancel" />
          {/* <Button type="button">Cancel</Button> */}
        </div>
      </Form>)
  }
}

export default AddNewAssociate;

const getValidationState = (validationErrors, name) => {
  const err = validationErrors[name];
  return typeof err === 'undefined' ? null : err === '' ? 'success' : 'error';
}
