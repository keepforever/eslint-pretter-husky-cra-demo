import React from 'react';
import { contractConfig } from './contractConfig';
import Select from '../form/Select';
import ReactHintFactory from 'react-hint';
import ContractDetailsSummaryAdmin from './ContractDetailsSummaryAdmin';
import ContractAdmin from './ContractAdmin';
// utils
import { makeUniqueKey } from './utils';

const ReactHint = ReactHintFactory(React);

const ContractsTabAdmin = ({
    contracts = [],
    userType = 'author',
    project,
    toggleConfirmSendContractModal,
    setActiveModalConfig,
    openHelloSignClient,
    openSimulateContractModal,
    onDownloadContractPdf,
    onDeleteContract
}) => {
    const authorContractRef = React.useRef();
    const narratorContractRef = React.useRef();
    return (
        <React.Fragment>
            <div className="contract-tab-admin">
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                    {contracts.map(contract => {
                        return (
                            <ContractAdmin
                                onDownloadContractPdf={onDownloadContractPdf}
                                onDeleteContract={onDeleteContract}
                                openHelloSignClient={openHelloSignClient}
                                key={contract.fake ? makeUniqueKey(12) : contract.template_id}
                                {...contract}
                            />
                        );
                    })}
                </div>
            </div>
            <div className="row contract-tab-admin">
                <div className="six columns">
                    <p className="para-bold" style={{ marginBottom: '15px' }}>
                        Project Summary
                    </p>
                    <ContractDetailsSummaryAdmin />
                </div>
                <div className="six columns">
                    <div
                        data-rh={!project.assigned_narrator ? 'No Narrator has been assigned. A Narrator is a required field in the contract.' : null}
                        className="flex-col"
                    >
                        <p
                            className="para-bold"
                            style={{ marginBottom: '10px' }}
                        >
                            Author/RH Contracts
                        </p>
                        <Select
                            ref={authorContractRef}
                            id="authorContract"
                            label="Choose Contract to Send"
                            value={''}
                            onChange={(id, value) => {
                                setActiveModalConfig(id, value);
                            }}
                            required={false}
                            showRequired={true}
                            readOnly={false}
                        >
                            <option value="">Select...</option>
                            {Object.keys(contractConfig)
                                .filter(el => {
                                    return (
                                        contractConfig[el]
                                            .eventUserTriggeredOn ===
                                        'rights_holder'
                                    );
                                })
                                .map(opt => {
                                    return (
                                        <option
                                            key={`email_${opt}`}
                                            value={opt}
                                        >
                                            {contractConfig[opt].contractTitle}
                                        </option>
                                    );
                                })}
                        </Select>
                        {/* <hr style={{margin: '5px 0px'}}/> */}
                        <p
                            className="para-bold"
                            style={{ marginBottom: '10px' }}
                        >
                            Narrator Contracts
                        </p>
                        <Select
                            ref={narratorContractRef}
                            id="narratorContract"
                            label="Choose Contract to Send"
                            value={''}
                            onChange={(id, value) => {
                                setActiveModalConfig(id, value);
                            }}
                            required={false}
                            showRequired={true}
                            readOnly={false}
                        >
                            <option value="">Select...</option>
                            {Object.keys(contractConfig)
                                .filter(el => {
                                    return (
                                        contractConfig[el]
                                            .eventUserTriggeredOn === 'narrator'
                                    );
                                })
                                .map(opt => {
                                    return (
                                        <option
                                            key={`email_${opt}`}
                                            value={opt}
                                        >
                                            {contractConfig[opt].contractTitle}
                                        </option>
                                    );
                                })}
                        </Select>
                        {/* <hr style={{margin: '5px 0px'}}/> */}
                        <p
                            className="para-bold"
                            style={{ marginBottom: '18px' }}
                        >
                            Manually Record Contract Signature
                        </p>
                        <button
                            style={{maxWidth: '300px'}}
                            className="button btn-info"
                            onClick={openSimulateContractModal}
                            disabled={false}
                        >
                            Create Contract Instance
                        </button>
                    </div>
                </div>
                <ReactHint events />
            </div>
        </React.Fragment>
    );
};

export default ContractsTabAdmin;
