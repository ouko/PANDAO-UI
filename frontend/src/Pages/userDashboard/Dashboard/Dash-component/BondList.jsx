import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogTrigger } from '@radix-ui/react-dialog';
import { formatDate } from '@/utils/functions/ConvertDate'

const BondList = ({ bonds, check, setCheck, loading, handleRetrieveBond, setOpenPay, setSelectedBond, setSelectedInfo, setShowInfo , showInfo ,selectedInfo}) => {
  return (
    <div>
      <div className="bg-[#39246b] p-3 flex justify-between items-center rounded-md mb-6 ">
        <h2 className="text-white text-2xl font-medium">Created Bonds:</h2>
        <div className="flex items-center text-brand7 gap-2">
          <div>Purchased Bonds</div>
          <Switch checked={check} onCheckedChange={() => setCheck(!check)} />
        </div>
      </div>
      <div className="w-full md:col-span-3 flex mt-1 flex-col items-center md:items-start max-w-[1400px] mx-auto p-5 text-black">
      {bonds.length > 0 ? (
        bonds.map((bond) => (
          <div
            key={bond.bond_id}
            className={`w-full bg-gradient-to-br from-[rgba(39,18,76,0.68)] to-brand1 shadow-lg rounded-lg border border-brand3 p-5 mt-6 flex flex-col md:flex-row justify-between items-start md:items-center transition-transform transform hover:scale-95 duration-300 ${{
              'ring-2 ring-brand2': check && bond.maturity_date && new Date(bond.maturity_date) < new Date(),
              'ring-2 ring-purple-950': check && bond.maturity_date && new Date(bond.maturity_date) > new Date()
            }}`}
          >
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <img
                src={bond.community?.image || 'https://via.placeholder.com/150'}
                alt={bond.community?.name || 'Bond Image'}
                className="w-20 h-20 rounded-md object-cover shadow-md"
              />
              <div>
                <h2 className="text-xl text-white font-bold mb-1">{bond.name || 'Unnamed Bond'}</h2>
                <p className="text-sm text-gray-400">Community: <span className="text-white">{bond.community?.name || 'N/A'}</span></p>
                <p className="text-sm text-gray-400 mt-1">{bond.description || 'No description provided'}</p>
              </div>
            </div>

            <div className="mt-5 md:mt-0 flex flex-col space-y-2 items-start md:items-end">
              <p className="text-sm text-green-500 font-medium">Price: {bond.price ? `${bond.price} XRD` : 'Not Available'}</p>
              <p className="text-sm text-white">Interest Rate: {bond.interest_rate ? `${bond.interest_rate}%` : 'N/A'}</p>
              <p className="text-sm text-white">Maturity Date: {bond.maturity_date ? new Date(bond.maturity_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Not specified'}</p>
              <div className="flex items-center gap-3 mt-3">
                {check && (
                  <Button variant="outline" onClick={() => { setSelectedInfo(bond); setShowInfo(true); }}>Show Info</Button>
                )}
                {check && !bond.has_withdrawn && (
                <Button disabled={loading} onClick={() => handleRetrieveBond(bond)}>Withdraw</Button>


                )}
                {check && bond.has_withdrawn && (
                  <Button disabled={loading} onClick={() => { setOpenPay(true); setSelectedBond(bond); }}>Deposit</Button>
                )}
              </div>

              
            </div>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center h-28 w-full text-gray-300 font-normal text-xl">
          No Bond Created
        </div>
      )}
    </div>
    <Dialog open={showInfo} onOpenChange={setShowInfo}>
                  <DialogTrigger></DialogTrigger>

                  <DialogContent className="max-w-5xl  ">
                    {selectedInfo && (
                      <Card className="w-full max-w-5xl bg-gradient-to-br from-[rgba(39,18,76,0.68)] to-brand1 shadow-lg rounded-lg border border-brand3 text-white mx-5 my-5 ">
                        <div className='flex pt-5 items-center w-full text-center text-3xl justify-center font-bold'>
                          Bond Bucket Summary
                        </div>
                        <CardHeader>
                          <div className="flex items-center justify-between w-full ">
                            <h2 className="text-2xl font-bold capitalize">
                              {selectedInfo.name}
                            </h2>
                            <div className="flex gap-3 border border-brand3 ">
                              <div className="border-2 p-2 text-black bg-green-200">
                                <span className="font-semibold">
                                  Total Amount Put In Bucket:
                                </span>{' '}
                                {selectedInfo.amount_stored || '0'}
                              </div>
                              <div className="border-2 p-2 text-black bg-green-200">
                                <span className="font-semibold">
                                  Total Amount To Repay:
                                </span>{' '}
                                {selectedInfo.amount_owned || '0'}
                              </div>
                              <div className="border-2 p-2 text-black bg-blue-200">
                                <span className="font-semibold">
                                  Amount Left To Store:
                                </span>{' '}
                                {selectedInfo.amount_owned -
                                  selectedInfo.amount_stored || '0'}
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                              <div>
                                <h3 className="text-xl font-medium text-gray-500">
                                  Basic Information
                                </h3>
                                <div className="mt-2 space-y-2">
                                  <p>
                                    <span className="font-medium">
                                      Bond ID:
                                    </span>{' '}
                                    {selectedInfo.bond_id}
                                  </p>
                                  <p>
                                    <span className="font-medium">Name:</span>{' '}
                                    {selectedInfo.name || 'N/A'}
                                  </p>
                                  <p>
                                    <span className="font-medium">
                                      Contract Type:
                                    </span>{' '}
                                    {selectedInfo.contract_type || 'N/A'}
                                  </p>
                                  <p>
                                    <span className="font-medium">
                                      Currency:
                                    </span>{' '}
                                    {selectedInfo.currency.toUpperCase()}
                                  </p>
                                </div>
                              </div>

                              <div>
                                <h3 className="text-xl font-medium text-gray-500">
                                  Financial Terms
                                </h3>
                                <div className="mt-2 space-y-2">
                                  <p>
                                    <span className="font-medium">
                                      Interest Rate:
                                    </span>{' '}
                                    {selectedInfo.interest_rate}%
                                  </p>
                                  <p>
                                    <span className="font-medium">
                                      Notional Principle:
                                    </span>{' '}
                                    {selectedInfo.notional_principle}
                                  </p>
                                  <p>
                                    <span className="font-medium">Price:</span>{' '}
                                    {selectedInfo.price}
                                  </p>
                                  <p>
                                    <span className="font-medium">
                                      Number of Bonds:
                                    </span>{' '}
                                    {selectedInfo.number_of_bonds}
                                  </p>
                                  <p>
                                    <span className="font-medium">
                                      Discount:
                                    </span>{' '}
                                    {selectedInfo.discount}
                                  </p>
                                  <p>
                                    <span className="font-medium">
                                      Position:
                                    </span>{' '}
                                    {selectedInfo.bond_position
                                      .charAt(0)
                                      .toUpperCase() +
                                      selectedInfo.bond_position.slice(1)}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <h3 className="text-xl font-medium text-gray-500">
                                  Important Dates
                                </h3>
                                <div className="mt-2 space-y-2">
                                  <p>
                                    <span className="font-medium">
                                      Initial Exchange:
                                    </span>{' '}
                                    {formatDate(
                                      selectedInfo.initial_exchange_date,
                                    )}
                                  </p>
                                  <p>
                                    <span className="font-medium">
                                      Maturity:
                                    </span>{' '}
                                    {formatDate(selectedInfo.maturity_date)}
                                  </p>
                                </div>
                              </div>

                              <div>
                                <h3 className="text-xl font-medium text-gray-500">
                                  Asset Information
                                </h3>
                                <div className="mt-2 space-y-2">
                                  <p>
                                    <span className="font-medium">
                                      Asset Name:
                                    </span>{' '}
                                    {selectedInfo.asset_name}
                                  </p>
                                  <p>
                                    <span className="font-medium">
                                      Amount Stored:
                                    </span>{' '}
                                    {selectedInfo.amount_stored || 'N/A'}
                                  </p>
                                  <p>
                                    <span className="font-medium">
                                      Amount Owned:
                                    </span>{' '}
                                    {selectedInfo.amount_owned || 'N/A'}
                                  </p>
                                  <p>
                                    <span className="font-medium">
                                      Created on Blockchain:
                                    </span>{' '}
                                    {selectedInfo.created_on_blockchain
                                      ? 'Yes'
                                      : 'No'}
                                  </p>
                                </div>
                              </div>

                              <div>
                                <h3 className="text-xl font-medium text-gray-500">
                                  Community Details
                                </h3>
                                <div className="mt-2 space-y-2">
                                  <p>
                                    <span className="font-medium">
                                      Community Name:
                                    </span>{' '}
                                    {selectedInfo.community.name}
                                  </p>
                                  <p>
                                    <span className="font-medium">
                                      Total Tokens:
                                    </span>{' '}
                                    {selectedInfo.community.total_token}
                                  </p>
                                  <p>
                                    <span className="font-medium">
                                      Tokens Bought:
                                    </span>{' '}
                                    {selectedInfo.community.token_bought}
                                  </p>
                                  <p>
                                    <span className="font-medium">Funds:</span>{' '}
                                    {selectedInfo.community.funds}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </DialogContent>
                </Dialog>
    </div>
  );
};

export default BondList;
