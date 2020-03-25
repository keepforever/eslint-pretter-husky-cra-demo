import React from 'react';
import Contract from './Contract';
// utils
import { makeUniqueKey } from './utils';

const ContractsTab = ({
    openHelloSignClient,
    contracts = [],
    contractHistory,
    userType = 'author',
    project,
    isAdmin = false,
    id,
    onDownloadContractPdf
}) => {
    return (
        <div className="flex-col">
            {isAdmin && userType === 'rights_holder' && (
                <h5>Rights Holder View</h5>
            )}
            {isAdmin && userType === 'narrator' && <h5>Narrator View</h5>}
            {!contracts.length && userType === 'narrator' && (
                <p>
                    There are no contracts for you yet.
                </p>
            )}
            {!contracts.length && userType === 'rights_holder' && (
                <p>
                    There are no contracts for you yet. Once you book a
                    narrator, we will prepare contracts for you and notify you
                    when they're ready to be signed.
                </p>
            )}
            {!!contracts.length && <p className="para-bold">Your Contracts</p>}

            {!!contracts.length && contracts.map(contract => {
                return (
                    <Contract
                        onDownloadContractPdf={onDownloadContractPdf}
                        openHelloSignClient={openHelloSignClient}
                        key={contract.fake ? makeUniqueKey(12) : contract.template_id}
                        {...contract}
                        isAdmin={isAdmin}
                    />
                );
            })}
        </div>
    );
};

export default ContractsTab;
