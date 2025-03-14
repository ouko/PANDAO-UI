import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const BondList = ({ bonds, check, setCheck, loading, handleRetreiveBond, setOpenPay, setSelectedBond, setSelectedInfo, setShowInfo }) => {
  return (
    <div>
      <div className="bg-[#39246b] p-3 flex justify-between items-center rounded-md mb-6 ">
        <h2 className="text-white text-2xl font-medium">Created Bonds:</h2>
        <div className="flex items-center gap-2">
          <div>Purchased Bonds</div>
          <Switch checked={check} onCheckedChange={() => setCheck(!check)} />
        </div>
      </div>
      <div className="w-full md:col-span-3 flex mt-1 flex-col shadow-md items-center md:items-start max-w-[1400px] mx-auto rounded-sm p-5 text-black">
        {bonds.length > 0 ? (
          bonds.map((bond) => (
            <div
              key={bond.bond_id}
              className={`w-full shadow-sm rounded-md border border-brand1 p-4 mt-4 flex flex-col md:flex-row justify-between items-start md:items-center transition-colors duration-300 hover:border-brand1 ${
                check && bond.maturity_date && new Date(bond.maturity_date) < new Date()
                  ? 'ring-2 ring-brand2'
                  : check && bond.maturity_date && new Date(bond.maturity_date) > new Date()
                  ? 'ring-2 ring-purple-950'
                  : ''
              }`}
            >
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                <img
                  src={bond.community?.image || 'https://via.placeholder.com/150'}
                  alt={bond.community?.name || 'Bond Image'}
                  className="w-16 h-16 rounded-sm object-cover"
                />
                <div>
                  <h2 className="text-lg font-bold">{bond.name || 'Unnamed Bond'}</h2>
                  <p className="text-sm text-gray-600">Community: {bond.community?.name || 'N/A'}</p>
                  <p className="text-sm text-gray-600">Description: {bond.description || 'No description provided'}</p>
                </div>
              </div>

              <div className="mt-4 md:mt-0 flex flex-col space-y-1 items-start md:items-end">
                <p className="text-sm text-gray-600">Price: {bond.price ? `${bond.price} XRD` : 'Not Available'}</p>
                <p className="text-sm text-gray-600">Interest Rate: {bond.interest_rate ? `${bond.interest_rate}%` : 'N/A'}</p>
                <p className="text-sm text-gray-600">Maturity Date: {bond.maturity_date ? new Date(bond.maturity_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Not specified'}</p>
                <div className="flex items-center gap-3">
                  {check && (
                    <Button className="mt-3" variant="secondary" onClick={() => { setSelectedInfo(bond); setShowInfo(true); }}>Show Info</Button>
                  )}
                  {check && !bond.has_withdrawn && (
                    <Button disabled={loading} className="mt-3" onClick={async () => await handleRetreiveBond(bond)}>Withdraw</Button>
                  )}
                  {check && bond.has_withdrawn && (
                    <Button disabled={loading} className="mt-3" onClick={() => { setOpenPay(true); setSelectedBond(bond); }}>Deposit</Button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-28 w-full font-normal text-xl">No Bond Created</div>
        )}
      </div>
    </div>
  );
};

export default BondList;
