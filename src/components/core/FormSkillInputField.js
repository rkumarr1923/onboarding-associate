import React, { Fragment, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from './Button';

function FormSkillInputField(props) {
  const { label, controlId, md, setSkillSet, skills } = props;
  const [inputList, setInputList] = useState([
    { skillId: '', skillRating: '',},
  ]);

  // handle input change
  const handleInputChange = (e, index) => {    
    const list = [...inputList];
    const { name, value } = e.target;
    console.log("name "+name+" , value "+value+" , index "+index);
    list[index][name] = value;
    setInputList(list);
  };

  const handleInputChangeTxt = (e, index) => {
    const list = [...inputList];
    const { name, value } = e.target;
    console.log("lname "+name+" , lvalue "+value+" , lindex "+index);
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = (v,i) => {
    console.log(i+" mlk skillName "+v.skillName);
    console.log("inputList bfr : "+inputList[i].skillId);
    
    setInputList([...inputList, { skillId: '', skillRating: '' }]);
    console.log("inputList aftr : "+inputList);
    setSkillSet([...inputList]);
  };

  

  return (
    <div className="form-skill-container">
      {inputList.map((x, i) => {
        return (
          <Fragment key={`skill-list-${i}`}>
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
                <Form.Select
                  as="select"
                  name="skillId"
                  className='select'
                  onChange={(e) => handleInputChange(e, i)}
                >
                  {skills.map((item) => (
                    <option key={item.skillId} value={item.skillId}>
                      {item.skillName}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control
                  type="text"
                  name="skillRating"
                  placeholder="Enter rating"
                  value={x.skillRating}
                  onChange={(e) => handleInputChangeTxt(e, i)}
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
                    clickHandler={() =>handleAddClick(x,i)}
                  >
                    Add
                  </Button>
                )}
              </div>
            </div>
          </Fragment>
        );
      })}
      {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
    </div>
  );
}

export default FormSkillInputField;
