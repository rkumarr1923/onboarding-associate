import React, { useState } from 'react';
import Button from "../core/Button";
import AddNewAssociate from './AddNewAssociate';
import AllAssociates from './AllAssociates';
import ExportAssociates from '../associate/AssociatesData/ExportAssociates';
import ImportAssociates from './AssociatesData/ImportAssociates';
import '../styles/associate.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "flatpickr/dist/flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/dark.css";

const Associates = ({ }) => {

    const [isFormVisible, setFormVisiblity] = useState(false);
    const [isImportAssociateVisible, setImportAssociateVisiblity] = useState(false);

    return (
        <div className='all-associate-container'>
            {(!isFormVisible && !isImportAssociateVisible) && <div className='top-container'>
                <div className='left-container'>
                    <ul className="all-associate-links">
                        <li>
                            <Button label="Add New Associate" clickHandler={() => setFormVisiblity(!isFormVisible)} />
                        </li>
                        <li>
                            <Button label="Import Associates" clickHandler={() => setImportAssociateVisiblity(!isImportAssociateVisible)} />
                        </li>
                    </ul>
                </div>
                <div className='right-container'>
                    <ExportAssociates />
                </div>
            </div>}
            {
                isFormVisible || isImportAssociateVisible ? isImportAssociateVisible ? <ImportAssociates setImportAssociateVisiblity={setImportAssociateVisiblity} /> : <AddNewAssociate setFormVisiblity={setFormVisiblity} /> : <AllAssociates />
            }
        </div>
    )
}

export default Associates;