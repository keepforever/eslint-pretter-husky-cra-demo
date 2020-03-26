import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

// import {formatDistanceStrict} from 'date-fns';

import { Link } from 'react-router';
import cartUtils from '../../utils/cart';
// import sopUtils from '../../utils/sopUtils';
// import {ReactComponent as FaqIcon} from '../../svg/faq.svg';
import { scrollToElement } from '../../pages/Account';

const SopTable = ({ subs, carts, currency, priceContracts, accountId }) => (
    <table className="table cart-table carts-table table-slim">
        <thead>
            <tr>
                <th>Name</th>
                <th className="txt-center">Min QTY</th>
                <th className="txt-center">Complete</th>
            </tr>
        </thead>
        <tbody>
            {subs.map((sub) => {
                const cart = carts.find((cart) => cart.sop_id === sub.internal_id);
                if (!cart) return null;
                return (
                    <tr key={sub.internal_id}>
                        <td>
                            <Link to={`${cartUtils.getUrl(cart, accountId)}?ref=dashboard`}>
                                {cartUtils.getName(cart, sub)}
                            </Link>
                        </td>
                        <td className="txt-center">{sub.quantity}</td>
                        <td className="txt-center">{cartUtils.getPercentComplete({ ...sub, items: cart.items })}%</td>
                    </tr>
                );
            })}
        </tbody>
    </table>
);

const SopStatus = ({ sub, isOpen, programOpen }) => {
    // const distance = formatDistanceStrict(new Date(), sopUtils.nextCloseDate(sub, new Date(), programOpen), { unit: 'day' });
    return (
        <>
            {isOpen && <span className="text-success">Open</span>}
            {!isOpen && <span className="text-danger">Closed</span>}
        </>
    );
};

const SopWidget = ({ account_id, org_id, org_currency, sop, carts, price_contracts, sopState, location }) => {
    const [type, setType] = useState('monthly');
    const monthly = sop.filter((sub) => sub.frequency === 'monthly');
    const quarterly = sop.filter((sub) => sub.frequency === 'quarterly' && sub.soptype !== 'recorded books');
    const rb = sop.filter((sub) => sub.soptype === 'recorded books');

    const hasMonthly = !!monthly.length;
    const hasQuarterly = !!quarterly.length;
    const hasRb = !!rb.length;

    const hasSOP = hasMonthly || hasQuarterly || hasRb;

    useEffect(() => {
        if (!hasMonthly && hasQuarterly) {
            setType('quarterly');
            return;
        }
        if (!hasMonthly && !hasQuarterly && hasRb) {
            setType('rb');
            return;
        }
        setType('monthly');
    }, [hasMonthly, hasQuarterly, hasRb, sop]);

    useEffect(() => {
        const scroll =
            (location.hash === '#sop' || location.query.ref === 'sop') &&
            window.localStorage.getItem('hide-dashboard-sop-modal');
        if (scroll) {
            scrollToElement('SOP-widget');
        }
    }, [location.hash, location.query.ref]);

    return (
        <div id="SOP-widget" className="dashboard-widget">
            <h3>SOP</h3>

            {!hasSOP && (
                <>
                    <p>You have no SOP subscriptions at this time.</p>
                    <p>
                        <Link to="/sop">
                            Learn more about how our Standing Order Plans can help you keep the freshest content on your
                            shelves
                        </Link>
                        .
                    </p>
                </>
            )}

            {hasSOP && (
                <div className="tabs tabs-slim">
                    {hasMonthly && (
                        <a
                            href="#monthly"
                            className={classnames({ active: type === 'monthly' })}
                            onClick={(e) => {
                                e.preventDefault();
                                setType('monthly');
                            }}
                        >
                            Monthly
                        </a>
                    )}
                    {hasQuarterly && (
                        <a
                            href="#quarterly"
                            className={classnames({ active: type === 'quarterly' })}
                            onClick={(e) => {
                                e.preventDefault();
                                setType('quarterly');
                            }}
                        >
                            Quarterly
                        </a>
                    )}
                    {hasRb && (
                        <a
                            href="#rb"
                            className={classnames({ active: type === 'rb' })}
                            onClick={(e) => {
                                e.preventDefault();
                                setType('rb');
                            }}
                        >
                            RB
                        </a>
                    )}
                </div>
            )}

            {hasMonthly && type === 'monthly' && (
                <div className="tab-content-slim" id="carts">
                    <h4 className="mt-2">
                        Currently{' '}
                        <SopStatus sub={monthly[0]} programOpen={sopState.is_open} isOpen={sopState.is_open} />
                    </h4>
                    <SopTable carts={carts} subs={monthly} currency={org_currency} priceContracts={price_contracts} />
                </div>
            )}

            {hasQuarterly && type === 'quarterly' && (
                <div className="tab-content-slim" id="quarterly">
                    <h4 className="mt-2">
                        Currently{' '}
                        <SopStatus sub={quarterly[0]} programOpen={sopState.is_open} isOpen={sopState.is_open} />
                    </h4>
                    <SopTable
                        carts={carts}
                        subs={quarterly}
                        currency={org_currency}
                        priceContracts={price_contracts}
                        accountId={account_id}
                    />
                </div>
            )}

            {hasRb && type === 'rb' && (
                <div className="tab-content-slim" id="rb">
                    <h4 className="mt-2">
                        Currently <SopStatus sub={rb[0]} programOpen={sopState.is_open} isOpen={sopState.is_open} />
                    </h4>
                    <SopTable
                        carts={carts}
                        subs={rb}
                        currency={org_currency}
                        priceContracts={price_contracts}
                        accountId={account_id}
                    />
                </div>
            )}
        </div>
    );
};

const mapStateToProps = ({ account, carts, sopState, routing }) => {
    return {
        location: routing.locationBeforeTransitions,
        account_id: account.info._id,
        org_id: account.org.entity_id,
        org_currency: account.org.currency,
        price_contracts: account.org.price_contracts,
        sop: account.sop,
        sopState,
        carts: carts.filter((cart) => cart.sop_id),
    };
};

export default connect(mapStateToProps)(SopWidget);
