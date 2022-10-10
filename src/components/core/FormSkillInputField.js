import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from './Button';

function FormSkillInputField(props) {
  const { label, controlId, md, setSkillSet } = props;
  const skills = [
    {
      skillId: 1,
      skillName: 'ACME',
      status: 'Active',
    },
    {
      skillId: 2,
      skillName: 'Adobe Flex',
      status: 'Active',
    },
    {
      skillId: 3,
      skillName: 'ALM',
      status: 'Active',
    },
    {
      skillId: 4,
      skillName: '.Net VB/C#',
      status: 'Active',
    },
    {
      skillId: 5,
      skillName: 'Architecture',
      status: 'Active',
    },
    {
      skillId: 6,
      skillName: 'Autosys',
      status: 'Active',
    },
    {
      skillId: 7,
      skillName: 'Autosys - Unix',
      status: 'Active',
    },
    {
      skillId: 8,
      skillName: 'AIX/Unix',
      status: 'Active',
    },
    {
      skillId: 9,
      skillName: 'AJAX',
      status: 'Active',
    },
    {
      skillId: 10,
      skillName: 'Angular JS',
      status: 'Active',
    },
    {
      skillId: 11,
      skillName: 'Angular 4+',
      status: 'Active',
    },
    {
      skillId: 12,
      skillName: 'React JS',
      status: 'Active',
    },
    {
      skillId: 13,
      skillName: 'AWS',
      status: 'Active',
    },
    {
      skillId: 14,
      skillName: 'Bootstrap',
      status: 'Active',
    },
    {
      skillId: 15,
      skillName: 'Build (Maven, ANT, Jenkins)',
      status: 'Active',
    },
    {
      skillId: 16,
      skillName: 'C',
      status: 'Active',
    },
    {
      skillId: 17,
      skillName: 'C++',
      status: 'Active',
    },
    {
      skillId: 18,
      skillName: 'COBOL',
      status: 'Active',
    },
    {
      skillId: 19,
      skillName: 'COGNOS SDK',
      status: 'Active',
    },
    {
      skillId: 20,
      skillName: 'Core Java',
      status: 'Active',
    },
    {
      skillId: 21,
      skillName: 'CRM (Customer Relationship Management) - Sales Force.com',
      status: 'Active',
    },
    {
      skillId: 22,
      skillName: 'CSS (Cascading Style Sheets)',
      status: 'Active',
    },
    {
      skillId: 23,
      skillName: 'Design Patterns',
      status: 'Active',
    },
    {
      skillId: 24,
      skillName: 'DB2 - mainframe',
      status: 'Active',
    },
    {
      skillId: 25,
      skillName: 'DB2 - stored procedure',
      status: 'Active',
    },
    {
      skillId: 26,
      skillName: 'DB2v10',
      status: 'Active',
    },
    {
      skillId: 27,
      skillName: 'DB2',
      status: 'Active',
    },
    {
      skillId: 28,
      skillName: 'Docker',
      status: 'Active',
    },
    {
      skillId: 29,
      skillName: 'Eclipse',
      status: 'Active',
    },
    {
      skillId: 30,
      skillName: 'EPIC',
      status: 'Active',
    },
    {
      skillId: 31,
      skillName: 'ESB',
      status: 'Active',
    },
    {
      skillId: 32,
      skillName: 'Gradle',
      status: 'Active',
    },
    {
      skillId: 33,
      skillName: 'GitHub',
      status: 'Active',
    },
    {
      skillId: 34,
      skillName: 'HADOOP',
      status: 'Active',
    },
    {
      skillId: 35,
      skillName: 'Hibernate',
      status: 'Active',
    },
    {
      skillId: 36,
      skillName: 'HP Exstream',
      status: 'Active',
    },
    {
      skillId: 37,
      skillName: 'HTML 5',
      status: 'Active',
    },
    {
      skillId: 38,
      skillName: 'HTML',
      status: 'Active',
    },
    {
      skillId: 39,
      skillName: 'J2EE',
      status: 'Active',
    },
    {
      skillId: 40,
      skillName: 'JDBC',
      status: 'Active',
    },
    {
      skillId: 41,
      skillName: 'Jquery',
      status: 'Active',
    },
    {
      skillId: 42,
      skillName: 'Javascript',
      status: 'Active',
    },
    {
      skillId: 43,
      skillName: 'JAVA Runtime (JRE)',
      status: 'Active',
    },
    {
      skillId: 44,
      skillName: 'Java',
      status: 'Active',
    },
    {
      skillId: 45,
      skillName: 'Jboss',
      status: 'Active',
    },
    {
      skillId: 46,
      skillName: 'JIRA',
      status: 'Active',
    },
    {
      skillId: 47,
      skillName: 'JSON',
      status: 'Active',
    },
    {
      skillId: 48,
      skillName: 'JSP',
      status: 'Active',
    },
    {
      skillId: 49,
      skillName: 'Kubernetes',
      status: 'Active',
    },
    {
      skillId: 50,
      skillName: 'Microservices / Springboot',
      status: 'Active',
    },
    {
      skillId: 51,
      skillName: 'Microsoft Office - Excel',
      status: 'Active',
    },
    {
      skillId: 52,
      skillName: 'Microsoft Office - Word',
      status: 'Active',
    },
    {
      skillId: 53,
      skillName: 'Microsoft Office - Powerpoint',
      status: 'Active',
    },
    {
      skillId: 54,
      skillName: 'Microsoft Office - Visio',
      status: 'Active',
    },
    {
      skillId: 55,
      skillName: 'MQ Series',
      status: 'Active',
    },
    {
      skillId: 56,
      skillName: 'MS Access',
      status: 'Active',
    },
    {
      skillId: 57,
      skillName: 'NODE JS',
      status: 'Active',
    },
    {
      skillId: 58,
      skillName: 'ODS',
      status: 'Active',
    },
    {
      skillId: 59,
      skillName: 'Oracle',
      status: 'Active',
    },
    {
      skillId: 60,
      skillName: 'Oracle/SQL Server Databases',
      status: 'Active',
    },
    {
      skillId: 61,
      skillName: 'Portal Developer',
      status: 'Active',
    },
    {
      skillId: 62,
      skillName: 'PHP',
      status: 'Active',
    },
    {
      skillId: 63,
      skillName: 'PVCS',
      status: 'Active',
    },
    {
      skillId: 64,
      skillName: 'Python',
      status: 'Active',
    },
    {
      skillId: 65,
      skillName: 'RAD',
      status: 'Active',
    },
    {
      skillId: 66,
      skillName: 'RDBMS skills',
      status: 'Active',
    },
    {
      skillId: 67,
      skillName: 'SAML',
      status: 'Active',
    },
    {
      skillId: 68,
      skillName: 'SalesForce',
      status: 'Active',
    },
    {
      skillId: 69,
      skillName: 'SalesForce Lightning',
      status: 'Active',
    },
    {
      skillId: 70,
      skillName: 'Soap',
      status: 'Active',
    },
    {
      skillId: 71,
      skillName: 'Service Oriented Architecture',
      status: 'Active',
    },
    {
      skillId: 72,
      skillName: 'Solution Architecture',
      status: 'Active',
    },
    {
      skillId: 73,
      skillName: 'SQL',
      status: 'Active',
    },
    {
      skillId: 74,
      skillName: 'Struts',
      status: 'Active',
    },
    {
      skillId: 75,
      skillName: 'SQL Server',
      status: 'Active',
    },
    {
      skillId: 76,
      skillName: 'SQL Server Stored procedure',
      status: 'Active',
    },
    {
      skillId: 77,
      skillName: 'SOAPUI',
      status: 'Active',
    },
    {
      skillId: 78,
      skillName: 'Tiles',
      status: 'Active',
    },
    {
      skillId: 79,
      skillName: 'TopLink',
      status: 'Active',
    },
    {
      skillId: 80,
      skillName: 'TOAD',
      status: 'Active',
    },
    {
      skillId: 81,
      skillName: 'Unix',
      status: 'Active',
    },
    {
      skillId: 82,
      skillName: 'UI design',
      status: 'Active',
    },
    {
      skillId: 83,
      skillName: 'Visual Basic',
      status: 'Active',
    },
    {
      skillId: 84,
      skillName: 'WCM Content authoring model',
      status: 'Active',
    },
    {
      skillId: 85,
      skillName: 'Webservices & API',
      status: 'Active',
    },
    {
      skillId: 86,
      skillName: 'Web Content',
      status: 'Active',
    },
    {
      skillId: 87,
      skillName: 'Webservice',
      status: 'Active',
    },
    {
      skillId: 88,
      skillName: 'Websphere',
      status: 'Active',
    },
    {
      skillId: 89,
      skillName: 'WAS',
      status: 'Active',
    },
    {
      skillId: 90,
      skillName: 'Web Accessibility',
      status: 'Active',
    },
    {
      skillId: 91,
      skillName: 'WebMethods',
      status: 'Active',
    },
    {
      skillId: 92,
      skillName: 'Web 2.0 Technologies',
      status: 'Active',
    },
    {
      skillId: 93,
      skillName: 'Websphere Portal Server',
      status: 'Active',
    },
    {
      skillId: 94,
      skillName: 'WebSeal, TAM, API',
      status: 'Active',
    },
    {
      skillId: 95,
      skillName: 'XML',
      status: 'Active',
    },
    {
      skillId: 96,
      skillName: 'Javascript',
      status: 'Active',
    },
    {
      skillId: 97,
      skillName: 'Type Script/ Web Components',
      status: 'Active',
    },
    {
      skillId: 98,
      skillName: 'Automating processes',
      status: 'Active',
    },
    {
      skillId: 99,
      skillName: 'AIX/UNIX',
      status: 'Active',
    },
    {
      skillId: 100,
      skillName: 'Agile Automation',
      status: 'Active',
    },
    {
      skillId: 101,
      skillName: 'Insurance',
      status: 'Active',
    },
    {
      skillId: 102,
      skillName: 'Retirement',
      status: 'Active',
    },
    {
      skillId: 103,
      skillName: 'Call Center Client Fact Sheet',
      status: 'Active',
    },
    {
      skillId: 104,
      skillName: 'EPIC Resource Planning',
      status: 'Active',
    },
    {
      skillId: 105,
      skillName: 'Intranet - Prudential Retirement',
      status: 'Active',
    },
    {
      skillId: 106,
      skillName: 'Internet - Sponsor Site',
      status: 'Active',
    },
    {
      skillId: 107,
      skillName: 'Internet - Participant Site',
      status: 'Active',
    },
    {
      skillId: 108,
      skillName: 'Internet - Sales site',
      status: 'Active',
    },
    {
      skillId: 109,
      skillName: 'IVR',
      status: 'Active',
    },
    {
      skillId: 110,
      skillName: 'Income Flex',
      status: 'Active',
    },
    {
      skillId: 111,
      skillName: 'Income Flex Calculator',
      status: 'Active',
    },
    {
      skillId: 112,
      skillName: 'Income Flex 3rd party - Brokerage',
      status: 'Active',
    },
    {
      skillId: 113,
      skillName: 'NQ Plan Sponsor',
      status: 'Active',
    },
    {
      skillId: 114,
      skillName: 'Pega Services',
      status: 'Active',
    },
    {
      skillId: 115,
      skillName: 'Plan Sponsor Reporting',
      status: 'Active',
    },
    {
      skillId: 116,
      skillName: 'PPR - Prudential Performance Repository',
      status: 'Active',
    },
    {
      skillId: 117,
      skillName: 'Prudential Workplace',
      status: 'Active',
    },
    {
      skillId: 118,
      skillName: 'PruForce.com',
      status: 'Active',
    },
    {
      skillId: 119,
      skillName: 'Passport',
      status: 'Active',
    },
    {
      skillId: 120,
      skillName: 'RSC (eGAPF)',
      status: 'Active',
    },
    {
      skillId: 121,
      skillName: 'Unit Value (eProvider)',
      status: 'Active',
    },
    {
      skillId: 122,
      skillName: 'Web Tools - PPR',
      status: 'Active',
    },
    {
      skillId: 123,
      skillName: 'Agile Cert - Certified Scrum Master',
      status: 'Active',
    },
    {
      skillId: 124,
      skillName: 'Agile Project Management',
      status: 'Active',
    },
    {
      skillId: 125,
      skillName: 'Agile Delivery',
      status: 'Active',
    },
    {
      skillId: 126,
      skillName: 'Agile Dev Ops',
      status: 'Active',
    },
    {
      skillId: 127,
      skillName: 'Agile Facilitator',
      status: 'Active',
    },
    {
      skillId: 128,
      skillName: 'Analytical Skills',
      status: 'Active',
    },
    {
      skillId: 129,
      skillName: 'Application Logs / Debugging ',
      status: 'Active',
    },
    {
      skillId: 130,
      skillName: 'Business User Interaction',
      status: 'Active',
    },
    {
      skillId: 131,
      skillName: 'Ability to communicate process improvement to all levels',
      status: 'Active',
    },
    {
      skillId: 132,
      skillName: 'Architecture',
      status: 'Active',
    },
    {
      skillId: 133,
      skillName: 'Business Analyst',
      status: 'Active',
    },
    {
      skillId: 134,
      skillName: 'Beyond Compare',
      status: 'Active',
    },
    {
      skillId: 135,
      skillName: 'Business/Functional Requirements Development',
      status: 'Active',
    },
    {
      skillId: 136,
      skillName: 'Budgeting skills',
      status: 'Active',
    },
    {
      skillId: 137,
      skillName: 'Change control process',
      status: 'Active',
    },
    {
      skillId: 138,
      skillName: 'Code Quality',
      status: 'Active',
    },
    {
      skillId: 139,
      skillName: 'Confidence',
      status: 'Active',
    },
    {
      skillId: 140,
      skillName: 'Collaboration Skills',
      status: 'Active',
    },
    {
      skillId: 141,
      skillName: 'Communication Skills',
      status: 'Active',
    },
    {
      skillId: 142,
      skillName: 'Commitment/Work Ethic',
      status: 'Active',
    },
    {
      skillId: 143,
      skillName: 'Customer Service',
      status: 'Active',
    },
    {
      skillId: 144,
      skillName: 'Cultural Awareness',
      status: 'Active',
    },
    {
      skillId: 145,
      skillName: 'Data analysis and queries',
      status: 'Active',
    },
    {
      skillId: 146,
      skillName: 'Decision Making',
      status: 'Active',
    },
    {
      skillId: 147,
      skillName: 'Degree - Computer Science',
      status: 'Active',
    },
    {
      skillId: 148,
      skillName: 'Development Processes',
      status: 'Active',
    },
    {
      skillId: 149,
      skillName: 'Drive for Results',
      status: 'Active',
    },
    {
      skillId: 150,
      skillName: 'Effective Communication Skills',
      status: 'Active',
    },
    {
      skillId: 151,
      skillName: 'Effective Decision Making',
      status: 'Active',
    },
    {
      skillId: 152,
      skillName: 'Effective Listening Skills',
      status: 'Active',
    },
    {
      skillId: 153,
      skillName: 'Effective Verbal Communication',
      status: 'Active',
    },
    {
      skillId: 154,
      skillName: 'Effective Written Communication',
      status: 'Active',
    },
    {
      skillId: 155,
      skillName: 'Email Etiquette',
      status: 'Active',
    },
    {
      skillId: 156,
      skillName: 'Escalation management',
      status: 'Active',
    },
    {
      skillId: 157,
      skillName: 'Estimation Methodologies',
      status: 'Active',
    },
    {
      skillId: 158,
      skillName: 'Estimation process',
      status: 'Active',
    },
    {
      skillId: 159,
      skillName: 'Ethical Behavior',
      status: 'Active',
    },
    {
      skillId: 160,
      skillName: 'Facilitation skills',
      status: 'Active',
    },
    {
      skillId: 161,
      skillName: 'Information Seeking',
      status: 'Active',
    },
    {
      skillId: 162,
      skillName: 'Interpersonal Skills',
      status: 'Active',
    },
    {
      skillId: 163,
      skillName: 'IT Risk assessment',
      status: 'Active',
    },
    {
      skillId: 164,
      skillName: 'Language - Hindi',
      status: 'Active',
    },
    {
      skillId: 165,
      skillName: 'Leadership Skills',
      status: 'Active',
    },
    {
      skillId: 166,
      skillName: 'Listening Skills',
      status: 'Active',
    },
    {
      skillId: 167,
      skillName: 'Managing People',
      status: 'Active',
    },
    {
      skillId: 168,
      skillName: 'Meetings Planning',
      status: 'Active',
    },
    {
      skillId: 169,
      skillName: 'Mentoring skills',
      status: 'Active',
    },
    {
      skillId: 170,
      skillName: 'Methodical/Analytical',
      status: 'Active',
    },
    {
      skillId: 171,
      skillName: 'Multi Tasking',
      status: 'Active',
    },
    {
      skillId: 172,
      skillName: 'Negotiating skills',
      status: 'Active',
    },
    {
      skillId: 173,
      skillName: 'Organizational skills',
      status: 'Active',
    },
    {
      skillId: 174,
      skillName: 'Overall Process Adherence',
      status: 'Active',
    },
    {
      skillId: 175,
      skillName: 'Problem Solving',
      status: 'Active',
    },
    {
      skillId: 176,
      skillName: 'Project management',
      status: 'Active',
    },
    {
      skillId: 177,
      skillName: 'Requirements Analysis',
      status: 'Active',
    },
    {
      skillId: 178,
      skillName: 'Requirements Elicitation',
      status: 'Active',
    },
    {
      skillId: 179,
      skillName: 'Requirements Management',
      status: 'Active',
    },
    {
      skillId: 180,
      skillName: 'Research Skills',
      status: 'Active',
    },
    {
      skillId: 181,
      skillName: 'Resilient',
      status: 'Active',
    },
    {
      skillId: 182,
      skillName: 'Risk Management',
      status: 'Active',
    },
    {
      skillId: 183,
      skillName: 'Team building',
      status: 'Active',
    },
    {
      skillId: 184,
      skillName: 'Tech Lead',
      status: 'Active',
    },
    {
      skillId: 185,
      skillName: 'Technical Documentation',
      status: 'Active',
    },
    {
      skillId: 186,
      skillName: 'Selenium',
      status: 'Active',
    },
    {
      skillId: 187,
      skillName: 'SOAPUI',
      status: 'Active',
    },
    {
      skillId: 188,
      skillName: 'Test Automation',
      status: 'Active',
    },
    {
      skillId: 189,
      skillName: 'Test case development',
      status: 'Active',
    },
    {
      skillId: 190,
      skillName: 'Test Data Management',
      status: 'Active',
    },
    {
      skillId: 191,
      skillName: 'Test strategy',
      status: 'Active',
    },
    {
      skillId: 192,
      skillName: 'Test validation on data fixes',
      status: 'Active',
    },
    {
      skillId: 193,
      skillName: 'Testing',
      status: 'Active',
    },
    {
      skillId: 194,
      skillName: 'Testing Automation',
      status: 'Active',
    },
    {
      skillId: 195,
      skillName: 'Testing Web Based Applications',
      status: 'Active',
    },
    {
      skillId: 196,
      skillName: 'Testing Web Services',
      status: 'Active',
    },
    {
      skillId: 197,
      skillName: 'Agile Testing',
      status: 'Active',
    },
    {
      skillId: 198,
      skillName: 'Jenkins',
      status: 'Active',
    },
    {
      skillId: 199,
      skillName: 'Status',
      status: 'Active',
    },
  ];
  const [inputList, setInputList] = useState([
    { skillId: '', skillRating: '' },
  ]);

  // handle input change
  const handleInputChange = (e, index) => {
    const list = [...inputList];
    const { name, value } = e.target;
    if (name === 'skillId') {
      list[index][name] = parseInt(value);
    } else {
      list[index][name] = value;
    }
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { skillId: '', skillRating: '' }]);
    setSkillSet([...inputList]);
  };

  return (
    <div className="form-skill-container">
      {inputList.map((x, i) => {
        return (
          <>
            <Form.Label>
              {label} - {i}
            </Form.Label>
            <div className="d-flex mb-2">
              <Form.Group
                as={Col}
                md={md}
                controlId={controlId}
                className="d-flex"
              >
                <Form.Control
                  as="select"
                  name="skillId"
                  onChange={(e) => handleInputChange(e, i)}
                >
                  {skills.map((item) => (
                    <option key={item.skillId} value={item.skillId}>
                      {item.skillName}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control
                  type="text"
                  name="skillRating"
                  placeholder="Enter rating"
                  value={x.skillRating}
                  onChange={(e) => handleInputChange(e, i)}
                />
              </Form.Group>
              <div className="d-flex">
                {inputList.length !== 1 && (
                  <Button
                    className="remove-btn"
                    label="Remove"
                    clickHandler={() => handleRemoveClick(i)}
                  >
                    Remove
                  </Button>
                )}
                {inputList.length - 1 === i && (
                  <Button
                    className="add-btn"
                    label="Add"
                    clickHandler={handleAddClick}
                  >
                    Add
                  </Button>
                )}
              </div>
            </div>
          </>
        );
      })}
      {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
    </div>
  );
}

export default FormSkillInputField;
