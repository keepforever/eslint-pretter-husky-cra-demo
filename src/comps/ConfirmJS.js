import React, { useRef } from 'react';
import moment from 'moment';

import Input from '../form/Input.jsx';
import Checkbox from '../form/Checkbox.jsx';
import DatePicker from '../form/DatePicker.jsx';

import { useForm, determineIsButtonDisabled } from './utils';

const ConfirmSendContractModal = ({
    contractConfig = '',
    onClose,
    confirmSendContract,
    project,
    onCancel,
}) => {
    const { contractTitle, description, eventUserTriggeredOn } = contractConfig;

    const [values, setValues] = useForm({
        message: '',
        subject: '',
        authorPenName: '',
        narratorPseudonym: '',
        rightsHolderName: '',
        isEnglishCheckbox: false,
        isOtherLanguageCheckbox: false,
        specifiedOtherLanguage: '',
        dueDateWithYear: '',
    });
    const datePickerRef = useRef('');

    const isButtonDisabled = determineIsButtonDisabled(
        contractTitle,
        values,
        eventUserTriggeredOn
    );

    return (
        <div>
            <div className="row text-align-center">
                <h5
                    style={{ textTransform: 'capitalize', marginBottom: '0px' }}
                >
                    {contractTitle}
                </h5>
            </div>
            <hr style={{ margin: '10px 0px' }} />

            <div className="content">
                <p className="admin-send-paragraph-a">
                    {' '}
                    <strong>Description:</strong> {description}
                </p>
                <p className="admin-send-paragraph-a">
                    {' '}
                    <strong>Sends to:</strong> {eventUserTriggeredOn}
                </p>
                <br />
                {eventUserTriggeredOn === 'rights_holder' && (
                    <>
                        <Input
                            type="text"
                            id="authorPenName"
                            label="Author Pen Name"
                            placeholder="As it should appear on the contract..."
                            value={values.authorPenName}
                            required={true}
                            showRequired={true}
                            readOnly={false}
                            onChange={setValues}
                        />
                        <Input
                            type="text"
                            id="narratorPseudonym"
                            label="Narrator Pseudonym"
                            placeholder="As it should appear on the contract..."
                            value={values.narratorPseudonym}
                            required={true}
                            showRequired={true}
                            readOnly={false}
                            onChange={setValues}
                        />
                    </>
                )}
                {eventUserTriggeredOn === 'narrator' && (
                    <>
                        <Input
                            type="text"
                            id="authorPenName"
                            label="Author Pen Name"
                            placeholder="As it should appear on the contract..."
                            value={values.authorPenName}
                            required={true}
                            showRequired={true}
                            readOnly={false}
                            onChange={setValues}
                        />
                        <Input
                            type="text"
                            id="rightsHolderName"
                            label="Rights Holder Name"
                            placeholder="As it should appear on the contract..."
                            value={values.rightsHolderName}
                            required={true}
                            showRequired={true}
                            readOnly={false}
                            onChange={setValues}
                        />
                    </>
                )}
                {!values.isOtherLanguageCheckbox && (
                    <Checkbox
                        id="isEnglishCheckbox"
                        checked={values.isEnglishCheckbox}
                        onChange={setValues}
                        required
                    >
                        English Checkbox
                    </Checkbox>
                )}
                {!values.isEnglishCheckbox && (
                    <React.Fragment>
                        <Checkbox
                            id="isOtherLanguageCheckbox"
                            checked={values.isOtherLanguageCheckbox}
                            onChange={setValues}
                            required
                        >
                            Other Language Checkbox
                        </Checkbox>
                        {values.isOtherLanguageCheckbox && (
                            <Input
                                type="text"
                                id="specifiedOtherLanguage"
                                label="Specify Other Language"
                                placeholder="Enter other language..."
                                value={values.specifiedOtherLanguage}
                                required={true}
                                showRequired={true}
                                readOnly={false}
                                onChange={setValues}
                            />
                        )}
                    </React.Fragment>
                )}
                <br />
                {(contractTitle ===
                    'Schedule A Production Agreement - Narrator Standard Contract' ||
                    contractTitle ===
                        'Schedule A Production Agreement - Narrator SAG Contract' ||
                    contractTitle ===
                        'Voices Share DS W/Date Narrator Agreement') && (
                    <DatePicker
                        isBlock={true}
                        ref={datePickerRef}
                        label={'Due Date (with year)'}
                        id="dueDateWithYear"
                        isOutsideRange={(day) => day.isBefore(moment())}
                        date={values.dueDateWithYear}
                        required={true}
                        showRequired={true}
                        onChange={(id, value) => {
                            if (!value) {
                                setValues(id, '');
                            } else {
                                setValues(id, value);
                            }
                        }}
                    />
                )}
            </div>
            <div className="action-row">
                <button
                    disabled={false}
                    className="button btn-small"
                    onClick={onCancel}
                >
                    Cancel
                </button>
                <button
                    style={{ color: !project.assigned_narrator ? 'red' : null }}
                    disabled={!project.assigned_narrator || isButtonDisabled}
                    className="button btn-generic"
                    onClick={() => {
                        confirmSendContract(values);
                    }}
                >
                    {!project.assigned_narrator
                        ? 'No Narrator assigned'
                        : `Send To ${eventUserTriggeredOn} 🚀`}
                </button>
            </div>
        </div>
    );
};

export default ConfirmSendContractModal;
