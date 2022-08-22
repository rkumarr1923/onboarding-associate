import React, { Component } from 'react';
import CustomButton from '../core/Button';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FormInputField from '../core/FormInputField';
import '../styles/associate.css';
import FormDatePickerField from '../core/FormDatePickerField';
import FormSkillInputField from '../core/FormSkillInputField';

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
        <div className='form-field-1'>
          <Row>
            <FormInputField
              md="4"
              controlId="firstName"
              label='Associate First Name'
              fieldName='firstName'
              value={this.state.firstName}
              handleChange={this.handleChange}
              placeHolder='First name'
              validationErrors={this.state.validationErrors}
            />
            <FormInputField
              md="4"
              controlId="lastName"
              label='Associate Last Name'
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
            <FormDatePickerField
              md="4"
              controlId="experienceIT"
              label="IT Experience"
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
            <FormDatePickerField
              md="4"
              controlId="endDate"
              label="End Date"
            />
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
              controlId="resourceCriticality"
              label='Resource Criticality'
              fieldName='resourceCriticality'
              value={this.state.resourceCriticality}
              handleChange={this.handleChange}
              placeHolder='Resource criticality'
              validationErrors={this.state.validationErrors}
            />
            <FormDatePickerField
              md="4"
              controlId="asOnDate"
              label="As On Date"
            />
            <FormDatePickerField
              md="4"
              controlId="experienceClient"
              label="Client Exp Date"
            />
            <FormDatePickerField
              md="4"
              controlId="experienceIBM"
              label="IBM Experience"
            />
            <FormInputField
              md="4"
              controlId="experienceIT"
              label='Total Career Experience'
              fieldName='experienceIT'
              value={this.state.experienceIT}
              handleChange={this.handleChange}
              placeHolder='Career experience'
              validationErrors={this.state.validationErrors}
            />
            <FormInputField
              md="4"
              controlId="experienceWithClient"
              label='Total Experience With Client'
              fieldName='experienceWithClient'
              value={this.state.experienceClient}
              handleChange={this.handleChange}
              placeHolder='Experience with client'
              validationErrors={this.state.validationErrors}
            />
            <FormInputField
              md="4"
              controlId="totalExperienceWithIBM"
              label='Total Experience With IBM'
              fieldName='totalExperienceWithIBM'
              value={this.state.totalExperienceWithIBM}
              handleChange={this.handleChange}
              placeHolder='Total experience with IBM'
              validationErrors={this.state.validationErrors}
            />
            <FormInputField
              md="4"
              controlId="skillset"
              label='Skill Set'
              fieldName='skillset'
              value={this.state.skillset}
              handleChange={this.handleChange}
              placeHolder='Skill set'
              validationErrors={this.state.validationErrors}
            />
          </Row>
        </div>
        <div className='form-field-2'>
          <h2>Skill</h2>
          <hr />
          <Row>
            <FormSkillInputField
              md="4"
              controlId="skill"
              label="Skill"
            />
          </Row>
        </div>
        <div className='form-field-3'>
          <h2>Visa Details</h2>
          <hr />
          <Row>
            <FormInputField
              md="4"
              controlId="visaType"
              label='Visa Type'
              fieldName='visaType'
              value={this.state.visaType}
              handleChange={this.handleChange}
              placeHolder='Visa type'
              validationErrors={this.state.validationErrors}
            />
            <FormInputField
              md="4"
              controlId="workPermitValidUntil"
              label='Work Permit Valid Until'
              fieldName='workPermitValidUntil'
              value={this.state.workPermitValidUntil}
              handleChange={this.handleChange}
              placeHolder='Work permit valid until'
              validationErrors={this.state.validationErrors}
            />
            <FormInputField
              md="4"
              controlId="extensionUpdates"
              label='Extension Updates'
              fieldName='extensionUpdates'
              value={this.state.extensionUpdates}
              handleChange={this.handleChange}
              placeHolder='Extension updates'
              validationErrors={this.state.validationErrors}
            />
            <FormDatePickerField
              md="4"
              controlId="visaMaxOutDate"
              label="Visa Max Out Date"
            />
            <FormInputField
              md="4"
              controlId="timeLeftInUs"
              label='Time Left In Us'
              fieldName='timeLeftInUs'
              value={this.state.timeLeftInUs}
              handleChange={this.handleChange}
              placeHolder='Time left in us'
              validationErrors={this.state.validationErrors}
            />
            <FormInputField
              md="4"
              controlId="visaNominations"
              label='Visa Nominations'
              fieldName='visaNominations'
              value={this.state.visaNominations}
              handleChange={this.handleChange}
              placeHolder='Visa nominations'
              validationErrors={this.state.validationErrors}
            />
            <FormInputField
              md="4"
              controlId="h1bNominations"
              label='H1B Nominations'
              fieldName='h1bNominations'
              value={this.state.h1bNominations}
              handleChange={this.handleChange}
              placeHolder='H1B nominations'
              validationErrors={this.state.validationErrors}
            />
            <FormInputField
              md="4"
              controlId="atImmigrationVisaRisks"
              label='At Immigration Visa Risks'
              fieldName='atImmigrationVisaRisks'
              value={this.state.atImmigrationVisaRisks}
              handleChange={this.handleChange}
              placeHolder='At immigration visa risks'
              validationErrors={this.state.validationErrors}
            />
            <FormInputField
              md="4"
              controlId="backupSuccessorResource"
              label='Backup Successor Resource'
              fieldName='backupSuccessorResource'
              value={this.state.backupSuccessorResource}
              handleChange={this.handleChange}
              placeHolder='Backup successor resource'
              validationErrors={this.state.validationErrors}
            />
            <FormInputField
              md="4"
              controlId="keyContingencyGroup"
              label='Key Contingency Group'
              fieldName='keyContingencyGroup'
              value={this.state.keyContingencyGroup}
              handleChange={this.handleChange}
              placeHolder='Key contingency group'
              validationErrors={this.state.validationErrors}
            />
            <FormInputField
              md="4"
              controlId="additionalContingency"
              label='Additional Contingency'
              fieldName='additionalContingency'
              value={this.state.additionalContingency}
              handleChange={this.handleChange}
              placeHolder='Additional contingency'
              validationErrors={this.state.validationErrors}
            />
            <FormInputField
              md="4"
              controlId="riskMitigationComments"
              label='Risk Mitigation Comments'
              fieldName='riskMitigationComments'
              value={this.state.riskMitigationComments}
              handleChange={this.handleChange}
              placeHolder='Risk mitigation comments'
              validationErrors={this.state.validationErrors}
            />
            <FormInputField
              md="4"
              controlId="planInCaseOfExtensionAmendmentRejection"
              label='Plan In Case Of Extension Amendment Rejection'
              fieldName='planInCaseOfExtensionAmendmentRejection'
              value={this.state.planInCaseOfExtensionAmendmentRejection}
              handleChange={this.handleChange}
              placeHolder='Plan in case of extension amendment rejection'
              validationErrors={this.state.validationErrors}
            />
          </Row>
        </div>
        <hr />
        <div className='d-flex-center'>
          <Button type="submit" className='submit-btn' >Submit</Button>
          <CustomButton clickHandler={() => { this.props.setFormVisiblity(false) }} label="Cancel" />
        </div>
      </Form>)
  }
}

export default AddNewAssociate;

const getValidationState = (validationErrors, name) => {
  const err = validationErrors[name];
  return typeof err === 'undefined' ? null : err === '' ? 'success' : 'error';
}
