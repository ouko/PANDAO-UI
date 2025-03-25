import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const BondList = ({ bonds, check, setCheck, loading, handleRetreiveBond, setOpenPay, setSelectedBond, setSelectedInfo, setShowInfo }) => {
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
                  <Button disabled={loading} onClick={async () => await handleRetreiveBond(bond)}>Withdraw</Button>
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
    </div>
  );
};

export default BondList;
