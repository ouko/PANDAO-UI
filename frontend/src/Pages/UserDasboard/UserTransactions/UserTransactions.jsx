import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const UserTransaction = ({ expneseData, failedTransaction }) => {
  return (

    <Tabs defaultValue="account" className="w-full text-white ">
      <TabsList className="bg-[rgba(169,126,255,0)] gap-4">
        <TabsTrigger
          value="account"
          className={`tab-trigger px-6 py-2 font-semibold transition-all duration-200
      data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-brand3
      data-[state=active]:text-white data-[state=active]:shadow-lg
      data-[state=inactive]:bg-transparent data-[state=inactive]:text-brand7
      hover:bg-brand2 focus:outline-none focus:ring-2 focus:ring-brand3`}
        >
          Success
        </TabsTrigger>
        <TabsTrigger
          value="password"
          className={`tab-trigger px-6 py-2 font-semibold transition-all duration-200
      data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-brand3
      data-[state=active]:text-white data-[state=active]:shadow-lg
      data-[state=inactive]:bg-transparent data-[state=inactive]:text-brand7
      hover:bg-brand2 focus:outline-none focus:ring-2 focus:ring-brand3`}
        >
          Pending
        </TabsTrigger>
      </TabsList>

      <TabsContent value="account">
        <div className=" min-h-screen  ">
          <div className="text-xl font-bold pl-2 pt-3">
            {' '}
            Successfull Transaction
          </div>
          <div className="w-full mt-4 flex flex-col gap-2 h-full">
            {expneseData.length === 0 && (
              <div className="flex items-center justify-center text-center h-full">
                No Successfull Transaction
              </div>
            )}
            {expneseData.length > 0 &&
              expneseData.map((activity, index) => (
                <div key={index} className='flex flex-col p-4 border-2 bg-gradient-to-br from-[rgba(39,18,76,0.68)] to-brand1 shadow-lg border-brand2 rounded-lg group hover:shadow-md'>
                  <div className=" flex items-center space-x-4 mb-4">
                    {/* Community Image */}
                    <img
                      src={activity.community_image}
                      alt={`${activity.community_name} image`}
                      className="w-16 h-16 rounded-sm"
                    />
                    {/* Activity Details */}
                    <div>
                      <h3 className="text-lg font-semibold">
                        {activity.community_name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {activity.xrd_spent_on}
                      </p>

                      <p className="text-sm font-bold text-red-500">
                        XRD Spent transactions: {activity.xrd_spent_on_transactions}
                      </p>

                      <p className="text-sm font-bold text-gray-500">
                        XRD Spent On Assets: {activity.xrd_spent_on_assets ?? 0}
                      </p>

                      <p
                        className={`text-sm font-bold ${activity.xrd_spent < 0
                          ? 'text-red-500'
                          : 'text-green-500'
                          }`}
                      >
                        Spent: {Math.abs(activity.xrd_spent)} XRD
                      </p>
                      <p className="text-sm text-gray-400">
                        Date: {new Date(activity.date).toLocaleString()}
                      </p>
                    </div>


                  </div>
                  <Separator className="bg-brand2" />
                  <div className='mt-4'>
                    <button className="rounded-[26px] py-2 px-[15px] bg-gradient-to-b from-[rgba(192,161,255,1)] to-[rgba(130,69,255,1)] shadow-inner text-black text-[14px] leading-5 font-medium" >
                      <Link
                        to={`/community/detail/${activity.community_id}`}
                      >
                        View Community
                      </Link>
                    </button>{' '}
                    <button className="rounded-[26px] py-2 px-[15px] bg-gradient-to-b from-[rgba(192,161,255,1)] to-[rgba(130,69,255,1)] shadow-inner text-black text-[14px] leading-5 font-extrabold" >
                      <Link
                        to={`https://stokenet-dashboard.radixdlt.com/transaction/${activity.tx_hash}/summary`}
                        target='_blank'
                      >
                        View Transaction
                      </Link>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="min-h-screen  ">
          <div className="text-xl font-bold pl-2 pt-3">
            {' '}
            Pending Transactions
          </div>
          <div className="w-full mt-4 flex flex-col gap-2 h-full">
            {failedTransaction.length === 0 && (
              <div className="flex items-center justify-center text-center h-full">
                No Pending Transaction
              </div>
            )}
            {failedTransaction.length > 0 &&
              failedTransaction.map((activity, index) => (
                <div
                  key={index}
                  className="w-full py-4 px-4 bg-gradient-to-br from-[rgba(39,18,76,0.68)] to-brand1 shadow-lg rounded-lg border border-brand3    items-start md:items-center transition-transform transform hover:scale-95 duration-300"
                 >
                  {/* Transaction Details */}
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <p className="text-lg font-bold text-red-500">
                        Pending Transaction
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <p className="text-sm text-gray-300">
                      <span className="font-semibold">Creator:</span>{' '}
                      {activity.creator}
                    </p>
                    <p className="text-sm text-gray-300">
                      <span className="font-semibold">Event Type:</span>{' '}
                      {activity.event_type}
                    </p>
                    <p className="text-sm text-gray-300">
                      <span className="font-semibold">Error:</span>{' '}
                      {activity.error}
                    </p>
                    <p className="text-sm text-gray-300">
                      <span className="font-semibold">Transaction Hash:</span>{' '}
                      {activity.tx_hash}
                    </p>
                    <p className="text-sm text-gray-400">
                      <span className="font-semibold">Date:</span>{' '}
                      {new Date(activity.date).toLocaleString()}
                    </p>
                  </div>
                  <Button className="w-40 mt-4">
                    <Link
                      to={`https://stokenet-dashboard.radixdlt.com/transaction/${activity.tx_hash}/summary`}
                    >
                      View Transaction
                    </Link>
                  </Button>
                </div>
              ))}
          </div>
        </div>
      </TabsContent>
    </Tabs>

  )
}
UserTransaction.propTypes = {
  expneseData: PropTypes.arrayOf(
    PropTypes.shape({
      community_image: PropTypes.string.isRequired,
      community_name: PropTypes.string.isRequired,
      xrd_spent_on: PropTypes.string.isRequired,
      xrd_spent: PropTypes.number.isRequired,
      date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
        .isRequired,
    }),
  ).isRequired,
}
export default UserTransaction
