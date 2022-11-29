import React, { Component } from 'react';
import CustomButton from '../core/Button';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FormInputField from '../core/FormInputField';
import axios from 'axios';
import FormDatePickerField from '../core/FormDatePickerField';
import FormSkillInputField from '../core/FormSkillInputField';
import { useSelector, connect } from 'react-redux';
import { associates } from '../../store';
import '../styles/associate.css';

class AddNewAssociate extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    firstName: this.props?.associateData?.associateName
      ? this.props?.associateData?.associateName.split(' ')[0]
      : '',
    lastName: this.props?.associateData?.associateName
      ? this.props?.associateData?.associateName.split(' ')[1]
      : '',
    ibmId: this.props?.associateData?.ibmId
      ? this.props?.associateData?.ibmId
      : '',
    ibmEmail: this.props?.associateData?.emailIbm
      ? this.props?.associateData?.emailIbm
      : '',
    location: this.props?.associateData?.location
      ? this.props?.associateData?.location
      : '',
    role: this.props?.associateData?.role
      ? this.props?.associateData?.role
      : '',
    engagementName: this.props?.associateData?.engagementName
      ? this.props?.associateData?.engagementName
      : '',
    primaryContact: this.props?.associateData?.primaryContact
      ? this.props?.associateData?.primaryContact
      : '',
    projectId: this.props?.associateData?.projectId
      ? this.props?.associateData?.projectId
      : '',
    majorFunction: this.props?.associateData?.majorFunction
      ? this.props?.associateData?.majorFunction
      : '',
    band: this.props?.associateData?.band
      ? this.props?.associateData?.band
      : '',
    clientManager: this.props?.associateData?.clientManager
      ? this.props?.associateData?.clientManager
      : '',
    clientEmail: this.props?.associateData?.emailClient
      ? this.props?.associateData?.emailClient
      : '',
    email: this.props?.associateData?.email
      ? this.props?.associateData?.email
      : '',
    xid: this.props?.associateData?.xid ? this.props?.associateData?.xid : '',
    endDate: this.props?.associateData?.endDate
      ? this.props?.associateData?.endDate
      : '',
    city: this.props?.associateData?.city
      ? this.props?.associateData?.city
      : '',
    billType: this.props?.associateData?.billType
      ? this.props?.associateData?.billType
      : '',
    billCode: this.props?.associateData?.billCode
      ? this.props?.associateData?.billCode
      : '',
    asOnDate: this.props?.associateData?.asOnDate
      ? this.props?.associateData?.asOnDate
      : '',
    experienceIT: this.props?.associateData?.itExpDate
      ? this.props?.associateData?.itExpDate
      : '',
    experienceClient: this.props?.associateData?.experienceClient
      ? this.props?.associateData?.experienceClient
      : '',
    experienceIBM: this.props?.associateData?.experienceWithIbm
      ? this.props?.associateData?.experienceWithIbm
      : '',
    experienceWithClient: this.props?.associateData?.experienceWithClient
      ? this.props?.associateData?.experienceWithClient
      : '',
    totalExperienceWithIBM: this.props?.associateData?.totalExperienceWithIBM
      ? this.props?.associateData?.totalExperienceWithIBM
      : '',
    totalITExperience: this.props?.associateData?.totalITExperience
      ? this.props?.associateData?.totalITExperience
      : '',
    resourceCriticality: this.props?.associateData?.resourceCriticality
      ? this.props?.associateData?.resourceCriticality
      : '',
    atImmigrationVisaRisks: this.props?.associateData?.atImmigrationVisaRisks
      ? this.props?.associateData?.atImmigrationVisaRisks
      : '',
    backupSuccessorResource: this.props?.associateData?.backupSuccessorResource
      ? this.props?.associateData?.backupSuccessorResource
      : '',
    keyContingencyGroup: this.props?.associateData?.keyContingencyGroup
      ? this.props?.associateData?.keyContingencyGroup
      : '',
    additionalContingency: this.props?.associateData?.additionalContingency
      ? this.props?.associateData?.additionalContingency
      : '',
    visaType: this.props?.associateData?.visaType
      ? this.props?.associateData?.visaType
      : '',
    workPermitValidUntil: this.props?.associateData?.workPermitValidUntil
      ? this.props?.associateData?.workPermitValidUntil
      : '',
    extensionUpdates: this.props?.associateData?.extensionUpdates
      ? this.props?.associateData?.extensionUpdates
      : '',
    visaMaxOutDate: this.props?.associateData?.visaMaxOutDate
      ? this.props?.associateData?.visaMaxOutDate
      : '',
    timeLeftInUs: this.props?.associateData?.timeLeftInUs
      ? this.props?.associateData?.timeLeftInUs
      : '',
    visaNominations: this.props?.associateData?.visaNominations
      ? this.props?.associateData?.visaNominations
      : '',
    riskMitigationComments: this.props?.associateData?.riskMitigationComments
      ? this.props?.associateData?.riskMitigationComments
      : '',
    planInCaseOfExtensionAmendmentRejection: this.props?.associateData
      ?.planInCaseOfExtensionAmendmentRejection
      ? this.props?.associateData?.planInCaseOfExtensionAmendmentRejection
      : '',
    h1bNominations: this.props?.associateData?.h1bNominations
      ? this.props?.associateData?.h1bNominations
      : '',
    validationErrors: {},
    skillsSelected: [],
    skills: [],
    isAssociateExist: false,
  };

  validators = {
    firstName: (str) => (str === '' ? 'Firstname is required' : ''),
    lastName: (str) => (str === '' ? 'Lastname is required' : ''),
    ibmId: (str) =>
      str === ''
        ? 'IBM id is required'
        : this.state.isAssociateExist
        ? 'Employee already exist'
        : '',
    ibmEmail: (str) =>
      !/.+@.+\..+/.test(str) ? 'Invalid ibm email address' : '',
    location: (str) => (str === '' ? 'Location is required' : ''),
    role: (str) => (str === '' ? 'Role is required' : ''),
    engagementName: (str) => (str === '' ? 'Engagement name is required' : ''),
    primaryContact: (str) =>
      str === '' || !/^[0-9]*$/.test(str)
        ? 'Invalid primary contact, allow number only'
        : '',
    projectId: (str) => (!/^[0-9]*$/.test(str) ? 'Invalid project id' : ''),
    majorFunction: () => '',
    band: () => '',
    clientManager: () => '',
    clientEmail: (str) =>
      !/.+@.+\..+/.test(str) ? 'Invalid client email address' : '',
    email: (str) => (!/.+@.+\..+/.test(str) ? 'Invalid email address' : ''),
    xid: () => '',
    endDate: () => '',
    city: (str) => (str === '' ? 'City is required' : ''),
    billType: () => '',
    billCode: () => '',
    asOnDate: () => '',
    experienceIT: () => '',
    experienceClient: () => '',
    experienceIBM: () => '',
    experienceWithClient: (str) =>
      !/^[0-9]*$/.test(str) ? 'Allow number only' : '',
    totalExperienceWithIBM: (str) =>
      !/^[0-9]*$/.test(str) ? 'Allow number only' : '',
    totalITExperience: (str) =>
      !/^[0-9]*$/.test(str) ? 'Allow number only' : '',
    resourceCriticality: () => '',
    atImmigrationVisaRisks: () => '',
    backupSuccessorResource: (str) =>
      !/^[0-9]*$/.test(str)
        ? 'Invalid backup successor resource, allow number only'
        : '',
    keyContingencyGroup: () => '',
    additionalContingency: () => '',
    visaType: () => '',
    workPermitValidUntil: () => '',
    extensionUpdates: () => '',
    visaMaxOutDate: () => '',
    timeLeftInUs: (str) => (!/^[0-9]*$/.test(str) ? 'Allow number only' : ''),
    visaNominations: () => '',
    riskMitigationComments: () => '',
    planInCaseOfExtensionAmendmentRejection: () => '',
    h1bNominations: () => '',
  };

  validate = (name) => {
    const value = this.state[name];
    let error = this.validators.hasOwnProperty(name)
      ? this.validators[name](value)
      : '';
    this.setState(({ validationErrors }) => ({
      validationErrors: { ...validationErrors, [name]: error },
    }));
    return error;
  };

  handleChange = (e) => {
    const fieldName = e.currentTarget.name;
    this.setState({ [fieldName]: e.currentTarget.value }, () =>
      this.validate(fieldName)
    );
  };

  onDateChange = (fieldName, value) => {
    this.setState({ [fieldName]: value }, () => this.validate(fieldName));
  };

  handleIbmIdBlur = ({ event, fieldProps, fields, form }) => {
    this.state.isAssociateExist = !!this.props.list.find(
      (x) => x.ibmId === this.state.ibmId
    );
    this.validate('ibmId');
  };

  setSkillSet = (value) => {
    let sk = [
      {
        associateSkillId: 2,
        associateId: 13,
        skillId: 3,
        skillRating: 'skillRating',
      },
    ];
    console.log('skill set value ', sk);
    this.setState({ skillsSelected: sk });
  };

  componentDidMount() {
    const response = axios
      .get('http://localhost:9091/pru-skill/get-skill-master', {
        headers: { Authorization: 'Bearer ' + this.props.token },
      })
      .then((response) => {
        response.json().then((result) => {
          this.setState({ skills: result });
        });
      });
  }

  onSubmit = (e) => {
    e.preventDefault();
    let associateInfo = this.state;
    let associatepostReq = {
      associate: {
        associateName: associateInfo.firstName + ' ' + associateInfo.lastName,
        ibmId: associateInfo.ibmId,
        projectId: 3453,
        engagementName: associateInfo.engagementName,
        majorFunction: associateInfo.majorFunction,
        band: associateInfo.band,
        primaryContact: associateInfo.primaryContact,
        emailIbm: associateInfo.ibmEmail,
        emailPru: associateInfo.emailPru,
        emailClient: associateInfo.clientEmail,
        xid: associateInfo.xid,
        prudentialManager: associateInfo.prudentialManager,
        endDate: associateInfo.endDate,
        location: associateInfo.location,
        city: associateInfo.city,
        billType: associateInfo.billType,
        billCode: associateInfo.billCode,
        role: associateInfo.role,
        asOnDate: associateInfo.asOnDate,
        pruExpDate: associateInfo.pruExpDate,
        itExpDate: associateInfo.itExpDate,
        ibmDate: associateInfo.ibmDate,
        experienceWithPru: associateInfo.experienceWithPru,
        careerExperience: associateInfo.careerExperience,
        experienceWithIbm: associateInfo.experienceIBM,
        resourceCriticality: associateInfo.resourceCriticality,
        atImmigrationVisaRisks: associateInfo.atImmigrationVisaRisks,
        backupSuccessorResource: associateInfo.backupSuccessorResource,
        keyContingencyGroup: associateInfo.keyContingencyGroup,
        additionalContingency: associateInfo.additionalContingency,
        visaType: associateInfo.visaType,
        workPermitValidUntil: associateInfo.workPermitValidUntil,
        extensionUpdates: associateInfo.extensionUpdates,
        visaMaxOutDate: associateInfo.visaMaxOutDate,
        timeLeftInUs: associateInfo.timeLeftInUs,
        h1bNominations: associateInfo.h1bNominations,
        riskMitigationComments: associateInfo.riskMitigationComments,
        planInCaseOfExtensionAmendmentRejection:
          associateInfo.planInCaseOfExtensionAmendmentRejection,
        skillset: 'Test',
        clientManager: associateInfo.clientManager,
        email: associateInfo.email,
        experienceClient: associateInfo.experienceClient,
        totalITExperience: associateInfo.totalITExperience,
        experienceWithClient: associateInfo.experienceWithClient,
        totalExperienceWithIBM: associateInfo.totalExperienceWithIBM,
        visaNominations: associateInfo.visaNominations,
      },
      associateSkill: associateInfo.skillsSelected,
    };
    const isValid = Object.keys(this.validators)
      .map(this.validate)
      .every((err) => !err);
    if (isValid) {
      // update associate
      if (this.props?.associateData) {
        associatepostReq.associate.associateId =
          this.props?.associateData?.associateId;
        console.log(associatepostReq);
        console.log('Updated ');
      }
      // submit form
      console.log('submitted ');
      const response = axios.post(
        'http://localhost:9092/pru-associate/save-associate',
        associatepostReq,
        {
          headers: { Authorization: 'Bearer ' + this.props.token },
        }
      );
      this.props.setFormVisiblity(false);
    }
  };

  render() {
    return (
      <Form noValidate onSubmit={this.onSubmit} className="associate-form">
        <h2>
          {this.props?.associateData
            ? 'Update Associate Information'
            : 'Associate Information'}
        </h2>
        <hr />
        <div className="form-field-1">
          <Row>
            <FormInputField
              md="4"
              isRequired={true}
              controlId="firstName"
              label="Associate First Name"
              fieldName="firstName"
              value={this.state.firstName}
              handleChange={this.handleChange}
              placeHolder="First name"
              validationErrors={this.state.validationErrors}
            />
            <FormInputField
              md="4"
              isRequired={true}
              controlId="lastName"
              label="Associate Last Name"
              fieldName="lastName"
              value={this.state.lastName}
              handleChange={this.handleChange}
              placeHolder="Last name"
              validationErrors={this.state.validationErrors}
            />
            <FormInputField
              md="4"
              isRequired={true}
              controlId="ibmEmail"
              label="IBM Email"
              fieldName="ibmEmail"
              value={this.state.ibmEmail}
              handleChange={this.handleChange}
              placeHolder="Email address"
              validationErrors={this.state.validationErrors}
            />
            <FormInputField
              md="4"
              isRequired={true}
              controlId="ibmId"
              label="IBM Id"
              ibmIdBlur={this.handleIbmIdBlur}
              fieldName="ibmId"
              value={this.state.ibmId}
              handleChange={this.handleChange}
              placeHolder="Employee Id"
              validationErrors={this.state.validationErrors}
            />
            <FormInputField
              md="4"
              isRequired={true}
              controlId="location"
              label="Location"
              fieldName="location"
              value={this.state.location}
              handleChange={this.handleChange}
              placeHolder="location"
              validationErrors={this.state.validationErrors}
            />
            <FormInputField
              md="4"
              isRequired={true}
              controlId="role"
              label="Role"
              fieldName="role"
              value={this.state.role}
              handleChange={this.handleChange}
              placeHolder="role"
              validationErrors={this.state.validationErrors}
            />
            <FormDatePickerField
              md="4"
              isRequired={true}
              controlId="experienceIT"
              label="IT Experience"
              onDateChange={this.onDateChange}
            />
            <FormInputField
              md="4"
              isRequired={true}
              controlId="engagementName"
              label="Engagement Name"
              fieldName="engagementName"
              value={this.state.engagementName}
              handleChange={this.handleChange}
              placeHolder="Engagement name"
              validationErrors={this.state.validationErrors}
            />
            <FormInputField
              md="4"
              isRequired={true}
              controlId="primaryContact"
              label="Primary Contact"
              fieldName="primaryContact"
              value={this.state.primaryContact}
              handleChange={this.handleChange}
              placeHolder="Primary contact"
              validationErrors={this.state.validationErrors}
            />
            <FormInputField
              md="4"
              controlId="projectId"
              label="Project Id"
              fieldName="projectId"
              value={this.state.projectId}
              handleChange={this.handleChange}
              placeHolder="Project Id"
              validationErrors={this.state.validationErrors}
            />
            <FormInputField
              md="4"
              controlId="majorFunction"
              label="Major Function"
              fieldName="majorFunction"
              value={this.state.majorFunction}
              handleChange={this.handleChange}
              placeHolder="Major function"
              validationErrors={this.state.validationErrors}
            />
            <FormInputField
              md="4"
              controlId="band"
              label="Band"
              fieldName="band"
              value={this.state.band}
              handleChange={this.handleChange}
              placeHolder="Band"
              validationErrors={this.state.validationErrors}
            />
            <FormInputField
              md="4"
              isRequired={true}
              controlId="clientEmail"
              label="Client Email"
              fieldName="clientEmail"
              value={this.state.clientEmail}
              handleChange={this.handleChange}
              placeHolder="Client email"
              validationErrors={this.state.validationErrors}
            />
            <FormInputField
              md="4"
              isRequired={true}
              controlId="email"
              label="Email"
              fieldName="email"
              value={this.state.email}
              handleChange={this.handleChange}
              placeHolder="Email address"
              validationErrors={this.state.validationErrors}
            />
            <FormInputField
              md="4"
              controlId="xid"
              label="XID"
              fieldName="xid"
              value={this.state.xid}
              handleChange={this.handleChange}
              placeHolder="XID"
              validationErrors={this.state.validationErrors}
            />
            <FormInputField
              md="4"
              controlId="clientManager"
              label="Client Manager"
              fieldName="clientManager"
              value={this.state.clientManager}
              handleChange={this.handleChange}
              placeHolder="Client manager"
              validationErrors={this.state.validationErrors}
            />
            <FormDatePickerField
              md="4"
              controlId="endDate"
              label="End Date"
              onDateChange={this.onDateChange}
            />
            <FormInputField
              md="4"
              controlId="city"
              isRequired={true}
              label="City"
              fieldName="city"
              value={this.state.city}
              handleChange={this.handleChange}
              placeHolder="City"
              validationErrors={this.state.validationErrors}
            />
            <FormInputField
              md="4"
              controlId="billType"
              label="Bill Type"
              fieldName="billType"
              value={this.state.billType}
              handleChange={this.handleChange}
              placeHolder="Bill type"
              validationErrors={this.state.validationErrors}
            />
            <FormInputField
              md="4"
              controlId="billCode"
              label="Bill Code"
              fieldName="billCode"
              value={this.state.billCode}
              handleChange={this.handleChange}
              placeHolder="Bill code"
              validationErrors={this.state.validationErrors}
            />
            <FormInputField
              md="4"
              controlId="resourceCriticality"
              label="Resource Criticality"
              fieldName="resourceCriticality"
              value={this.state.resourceCriticality}
              handleChange={this.handleChange}
              placeHolder="Resource criticality"
              validationErrors={this.state.validationErrors}
            />
            <FormDatePickerField
              md="4"
              controlId="asOnDate"
              label="As On Date"
              onDateChange={this.onDateChange}
            />
            <FormDatePickerField
              md="4"
              controlId="experienceClient"
              label="Client Exp Date"
              onDateChange={this.onDateChange}
            />
            <FormDatePickerField
              md="4"
              controlId="experienceIBM"
              label="IBM Experience"
              onDateChange={this.onDateChange}
            />
            <FormInputField
              md="4"
              controlId="totalITExperience"
              label="Total Career Experience"
              fieldName="totalITExperience"
              value={this.state.totalITExperience}
              handleChange={this.handleChange}
              placeHolder="Career experience"
              validationErrors={this.state.validationErrors}
            />
            <FormInputField
              md="4"
              controlId="experienceWithClient"
              label="Total Experience With Client"
              fieldName="experienceWithClient"
              value={this.state.experienceWithClient}
              handleChange={this.handleChange}
              placeHolder="Experience with client"
              validationErrors={this.state.validationErrors}
            />
            <FormInputField
              md="4"
              controlId="totalExperienceWithIBM"
              label="Total Experience With IBM"
              fieldName="totalExperienceWithIBM"
              value={this.state.totalExperienceWithIBM}
              handleChange={this.handleChange}
              placeHolder="Total experience with IBM"
              validationErrors={this.state.validationErrors}
            />
          </Row>
        </div>
        <div className="form-field-2">
          <h2>Skill</h2>
          <hr />
          <Row>
            <FormSkillInputField
              md="4"
              controlId="skill"
              label="Skill"
              skills={this.state.skills}
              setSkillSet={this.setSkillSet}
            />
          </Row>
        </div>
        <div className="form-field-3">
          <h2>Visa Details</h2>
          <hr />
          <Row>
            <FormInputField
              md="4"
              controlId="visaType"
              label="Visa Type"
              fieldName="visaType"
              value={this.state.visaType}
              handleChange={this.handleChange}
              placeHolder="Visa type"
              validationErrors={this.state.validationErrors}
            />
            <FormInputField
              md="4"
              controlId="workPermitValidUntil"
              label="Work Permit Valid Until"
              fieldName="workPermitValidUntil"
              value={this.state.workPermitValidUntil}
              handleChange={this.handleChange}
              placeHolder="Work permit valid until"
              validationErrors={this.state.validationErrors}
            />
            <FormInputField
              md="4"
              controlId="extensionUpdates"
              label="Extension Updates"
              fieldName="extensionUpdates"
              value={this.state.extensionUpdates}
              handleChange={this.handleChange}
              placeHolder="Extension updates"
              validationErrors={this.state.validationErrors}
            />
            <FormDatePickerField
              md="4"
              controlId="visaMaxOutDate"
              label="Visa Max Out Date"
              onDateChange={this.onDateChange}
            />
            <FormInputField
              md="4"
              controlId="timeLeftInUs"
              label="Time Left In Us"
              fieldName="timeLeftInUs"
              value={this.state.timeLeftInUs}
              handleChange={this.handleChange}
              placeHolder="Time left in us"
              validationErrors={this.state.validationErrors}
            />
            <FormInputField
              md="4"
              controlId="visaNominations"
              label="Visa Nominations"
              fieldName="visaNominations"
              value={this.state.visaNominations}
              handleChange={this.handleChange}
              placeHolder="Visa nominations"
              validationErrors={this.state.validationErrors}
            />
            <FormInputField
              md="4"
              controlId="h1bNominations"
              label="H1B Nominations"
              fieldName="h1bNominations"
              value={this.state.h1bNominations}
              handleChange={this.handleChange}
              placeHolder="H1B nominations"
              validationErrors={this.state.validationErrors}
            />
            <FormInputField
              md="4"
              controlId="atImmigrationVisaRisks"
              label="At Immigration Visa Risks"
              fieldName="atImmigrationVisaRisks"
              value={this.state.atImmigrationVisaRisks}
              handleChange={this.handleChange}
              placeHolder="At immigration visa risks"
              validationErrors={this.state.validationErrors}
            />
            <FormInputField
              md="4"
              controlId="backupSuccessorResource"
              label="Backup Successor Resource"
              fieldName="backupSuccessorResource"
              value={this.state.backupSuccessorResource}
              handleChange={this.handleChange}
              placeHolder="Backup successor resource"
              validationErrors={this.state.validationErrors}
            />
            <FormInputField
              md="4"
              controlId="keyContingencyGroup"
              label="Key Contingency Group"
              fieldName="keyContingencyGroup"
              value={this.state.keyContingencyGroup}
              handleChange={this.handleChange}
              placeHolder="Key contingency group"
              validationErrors={this.state.validationErrors}
            />
            <FormInputField
              md="4"
              controlId="additionalContingency"
              label="Additional Contingency"
              fieldName="additionalContingency"
              value={this.state.additionalContingency}
              handleChange={this.handleChange}
              placeHolder="Additional contingency"
              validationErrors={this.state.validationErrors}
            />
            <FormInputField
              md="4"
              controlId="riskMitigationComments"
              label="Risk Mitigation Comments"
              fieldName="riskMitigationComments"
              value={this.state.riskMitigationComments}
              handleChange={this.handleChange}
              placeHolder="Risk mitigation comments"
              validationErrors={this.state.validationErrors}
            />
            <FormInputField
              md="4"
              controlId="planInCaseOfExtensionAmendmentRejection"
              label="Plan In Case Of Extension Amendment Rejection"
              fieldName="planInCaseOfExtensionAmendmentRejection"
              value={this.state.planInCaseOfExtensionAmendmentRejection}
              handleChange={this.handleChange}
              placeHolder="Plan in case of extension amendment rejection"
              validationErrors={this.state.validationErrors}
            />
          </Row>
        </div>
        <hr />
        <div className="d-flex center">
          <Button type="submit" className="submit-btn">
            {this.props?.associateData ? 'Update' : 'Submit'}
          </Button>
          <CustomButton
            clickHandler={() => {
              this.props.setFormVisiblity(false);
            }}
            label="Cancel"
          />
        </div>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewAssociate);

const getValidationState = (validationErrors, name) => {
  const err = validationErrors[name];
  return typeof err === 'undefined' ? null : err === '' ? 'success' : 'error';
};
