import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const UserTransaction = ({ expneseData, failedTransaction }) => {
  return (

    <Tabs defaultValue="account" className="w-full text-white ">
      <TabsList className=" min-h-12 bg-black/60 grid grid-cols-2 w-1/2 p-0">
        <TabsTrigger
          value="account"
          className="relative w-full h-[45px] py-5 text-lg rounded-none border-b-2 border-b-transparent bg-transparent px-4 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-white data-[state=active]:shadow-none data-[state=active]:bg-brand5/20 data-[state=active]:border-b-2 data-[state=active]:border-brand5"
        >
          Success
        </TabsTrigger>
        <TabsTrigger
          value="password"
          className="relative w-full h-[45px] py-5 text-lg rounded-none border-b-2 border-b-transparent bg-transparent px-4 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-white data-[state=active]:shadow-none data-[state=active]:bg-brand5/20 data-[state=active]:border-b-2 data-[state=active]:border-brand5"
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
                  <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4 p-4  rounded-xl">
                    <img
                      src={activity.community_image}
                      alt={`${activity.community_name} image`}
                      className="w-16 h-16 rounded-md object-cover self-start md:self-center"
                    />
                    <div className="flex-1 space-y-1">
                      <h3 className="text-base md:text-lg font-semibold text-white">
                        {activity.community_name}
                      </h3>

                      <p className="text-sm text-gray-400">
                        {activity.xrd_spent_on}
                      </p>

                      <p className="text-sm font-semibold text-red-500">
                        XRD Spent Transactions: {activity.xrd_spent_on_transactions}
                      </p>

                      <p className="text-sm font-semibold text-gray-300">
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

                      <p className="text-xs text-gray-500">
                        Date: {new Date(activity.date).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <Separator className="bg-brand2" />
                  <div className="mt-4 flex flex-col sm:flex-row gap-3 w-full">
                    <Link
                      to={`/community/detail/${activity.community_id}`}
                      className="w-full sm:w-auto text-center rounded-[26px] py-2 px-[15px] bg-gradient-to-b from-[rgba(192,161,255,1)] to-[rgba(130,69,255,1)] shadow-inner text-white text-[14px] leading-5 font-medium"
                    >
                      View Community
                    </Link>
                    <a
                      href={`https://stokenet-dashboard.radixdlt.com/transaction/${activity.tx_hash}/summary`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto text-center rounded-[26px] py-2 px-[15px] bg-gradient-to-b from-[rgba(192,161,255,1)] to-[rgba(130,69,255,1)] shadow-inner text-white text-[14px] leading-5 font-medium"
                    >
                      View Transaction
                    </a>
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
              <div className="flex items-center justify-center pt-20 text-center h-full">
                No Pending Transaction
              </div>
            )}
            {failedTransaction.length > 0 &&
              failedTransaction.map((activity, index) => (
                <div
                  key={index}
                  className="w-full p-4 sm:p-6 bg-gradient-to-br from-[rgba(39,18,76,0.68)] to-brand1 shadow-lg rounded-xl border border-brand3 flex flex-col gap-4 transition-transform transform"
                >
                  {/* Header */}
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <p className="text-sm sm:text-base md:text-lg font-bold text-red-500">
                      Pending Transaction
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 text-xs sm:text-sm text-gray-300">
                    <p className='break-all '>
                      <span className="font-semibold text-brand6 mx-[2px]">Creator:</span> {activity.creator}
                    </p>
                    <p>
                      <span className="font-semibold text-brand6 mx-1">Event Type:</span> {activity.event_type}
                    </p>
                    <p>
                      <span className="font-semibold text-brand6 mx-1">Error:</span> {activity.error}
                    </p>
                    <p className="break-all">
                      <span className="font-semibold text-brand6 mx-1">Transaction Hash:</span> {activity.tx_hash}
                    </p>
                    <p className="text-gray-400">
                      <span className="font-semibold text-brand6 mx-1">Date:</span> {new Date(activity.date).toLocaleString()}
                    </p>
                  </div>

                  <div className="mt-3">
                    <Link
                      to={`https://stokenet-dashboard.radixdlt.com/transaction/${activity.tx_hash}/summary`}
                      className="block w-full sm:w-1/2 text-center rounded-full py-2 px-4 bg-gradient-to-b from-purple-300 to-purple-600 text-white text-sm font-medium shadow-inner hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      View Transaction
                    </Link>
                  </div>
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
      community_id: PropTypes.string.isRequired,
      xrd_spent_on: PropTypes.string.isRequired,
      xrd_spent_on_transactions: PropTypes.number,
      xrd_spent_on_assets: PropTypes.number,
      xrd_spent: PropTypes.number.isRequired,
      tx_hash: PropTypes.string.isRequired,
      date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    })
  ).isRequired,
  failedTransaction: PropTypes.arrayOf(
    PropTypes.shape({
      creator: PropTypes.string,
      event_type: PropTypes.string,
      error: PropTypes.string,
      tx_hash: PropTypes.string.isRequired,
      date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    })
  ).isRequired,
};

export default UserTransaction
