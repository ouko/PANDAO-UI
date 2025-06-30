import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { convertUnixTimestamp } from './functions/ConvertDate';

// Define internal functions 
function FeePaid({ xrdSpent }) {
    return (
        <div className="p-4 bg-[#1A0F3A] rounded-xl border border-purple-900/50 mt-4">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-purple-300">Transaction Fee</span>
                <div className="flex items-center">
                    <span className="text-red-400  font-bold">{`-${xrdSpent}`}</span>
                    <span className="ml-1 text-xs text-gray-400">XRD</span>
                </div>
            </div>
        </div>
    );
}

function ReceiptComponentAccount({ entityArrayAccount }) {
    if (entityArrayAccount.length === 0) return null;
    
    return (
        <div className="w-full bg-[#1A0F3A] rounded-xl border border-purple-900/50 p-5 mt-4">
            <h3 className="text-lg font-semibold text-purple-300 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Account Changes
            </h3>
            <div className="space-y-3">
                {entityArrayAccount.map((entity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-[#120A24] rounded-lg hover:bg-[#1E1338] transition-colors">
                        <div className="flex items-center space-x-3">
                            {entity.entityUrl ? (
                                <img 
                                    className="w-8 h-8 rounded-full object-cover" 
                                    src={entity.entityUrl} 
                                    alt={entity.entityName} 
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzhjN2ZmZiIgZD0iTTEyLDBDNS40LDAsMCw1LjQsMCwxMnM1LjQsMTIsMTIsMTJzMTItNS40LDEyLTEyUzE4LjYsMCwxMiwweiBNMTIsMjJjLTUuNSwwLTEwLTQuNS0xMC0xMGMwLTEuOSwwLjUtMy43LDEuNC01LjRsNi4xLDYuMWMwLjQsMC40LDEsMC40LDEuNCwwbDYuMS02LjFDMjEuNSwxOC4zLDIyLDE2LjUsMjIsMTVDMjIsMTcuNSwxOS41LDIyLDEyLDIyeiBNMTIsNGMtMC44LDAtMS41LDAuNy0xLjUsMS41UzExLjIsNywxMiw3czEuNS0wLjcsMS41LTEuNVMxMi44LDQsMTJ6Ii8+PC9zdmc+';
                                    }}
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-purple-900/50 flex items-center justify-center text-purple-300">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            )}
                            <span className="font-medium text-gray-200">{entity.entityName}</span>
                        </div>
                        <span className={`text-sm font-bold ${entity.balanceChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {entity.balanceChange > 0 ? `+${entity.balanceChange}` : entity.balanceChange}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ReceiptComponent({ entityArrayComponent }) {
    if (entityArrayComponent.length === 0) return null;
    
    return (
        <div className="w-full bg-[#1A0F3A] rounded-xl border border-purple-900/50 p-5 mt-4">
            <h3 className="text-lg font-semibold text-purple-300 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Component Changes
            </h3>
            <div className="space-y-3">
                {entityArrayComponent.map((entity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-[#120A24] rounded-lg hover:bg-[#1E1338] transition-colors">
                        <div className="flex items-center space-x-3">
                            {entity.entityUrl ? (
                                <img 
                                    className="w-8 h-8 rounded-full object-cover" 
                                    src={entity.entityUrl} 
                                    alt={entity.entityName}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzhjN2ZmZiIgZD0iTTIwLDRINEMyLjksNCwyLDQuOSwyLDZ2MTJjMCwxLjEsMC45LDIsMiwyaDE2YzEuMSwwLDItMC45LDItMlY2QzIyLDQuOSwyMS4xLDQsMjAsNHogTTIwLDE4SDRWOGgxNnYxMHoiLz48L3N2Zz4=';
                                    }}
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-purple-900/50 flex items-center justify-center text-purple-300">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>
                            )}
                            <span className="font-medium text-gray-200">{entity.entityName}</span>
                        </div>
                        <span className={`text-sm font-bold ${entity.balanceChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {entity.balanceChange > 0 ? `+${entity.balanceChange}` : entity.balanceChange}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

async function getEntityMetadata(entity) {
    let name;
    let description;
    let iconUrl;

    try {
        let reqBody = {
            "addresses": [entity],
            "aggregation_level": "Vault",
            "opt_ins": {
                "ancestor_identities": true,
                "component_royalty_config": true,
                "component_royalty_vault_balance": true,
                "package_royalty_vault_balance": true,
                "non_fungible_include_nfids": true,
                "explicit_metadata": [
                    "name",
                    "icon_url",
                    "description"
                ]
            }
        };

        const response = await axios.post('https://stokenet.radixdlt.com/state/entity/details', reqBody);
        const results = response.data;
        results.items[0].explicit_metadata.items.forEach((data) => {
            if (data.key === 'name') {
                name = data.value.typed.value;
            } else if (data.key === 'icon_url') {
                iconUrl = data.value.typed.value;
            } else if (data.key === 'description') {
                description = data.value.typed.value;
            }
        });

        return {
            name: name,
            iconUrl: iconUrl,
            description: description
        };
    } catch (error) {
        console.error('Error getting entity detail:', error);
        return null;
    }
}

async function extractTransactionsData(txId) {
    const accountRegex = /^account/i;
    const componentRegex = /^component/i;
    const entityArrayAccount = [];
    const entityArrayComponent = [];

    let body = {
        "intent_hash": txId,
        "opt_ins": {
            "affected_global_entities": true,
            "balance_changes": true
        }
    };

    try {
        const response = await axios.post('https://babylon-stokenet-gateway.radixdlt.com/transaction/committed-details', body);
        const results = await response.data;
        const entitiesEffected = results.transaction.affected_global_entities;
        const committedTime = results.transaction.confirmed_at;
        const xrdSpent = results.transaction.fee_paid;
        const TokenBalancesChanges = results.transaction.balance_changes.fungible_balance_changes;

        await Promise.all(TokenBalancesChanges.map(async (balance) => {
            if (accountRegex.test(balance.entity_address)) {
                const balanceChange = balance.balance_change;
                const changedEntityMetaData = await getEntityMetadata(balance.resource_address);
                entityArrayAccount.push({
                    balanceChange: balanceChange,
                    entityName: changedEntityMetaData.name,
                    entityUrl: changedEntityMetaData.iconUrl
                });
            }

            if (componentRegex.test(balance.entity_address)) {
                const balanceChange = balance.balance_change;
                const changedEntityMetaData = await getEntityMetadata(balance.resource_address);
                entityArrayComponent.push({
                    balanceChange: balanceChange,
                    entityName: changedEntityMetaData.name,
                    entityUrl: changedEntityMetaData.iconUrl
                });
            }
        }));

        const TransactionDetailsComponent = () => {
            
            return (
                <div className="w-full space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                        <span>Transaction Time</span>
                        <span className="text-purple-300">{convertUnixTimestamp(committedTime)}</span>
                    </div>
                    <FeePaid xrdSpent={xrdSpent} />
                    <ReceiptComponentAccount entityArrayAccount={entityArrayAccount} />
                    <ReceiptComponent entityArrayComponent={entityArrayComponent} />
                </div>
            );
        };

        return TransactionDetailsComponent;
    } catch (error) {
        console.error('Error fetching transaction details:', error);
        return null;
    }
}

export default extractTransactionsData;