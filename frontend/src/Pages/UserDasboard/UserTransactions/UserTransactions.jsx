import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const UserTransaction = ({ expneseData, failedTransaction }) => {
  console.log(expneseData, 'faisal')
  return (
    <Card className="w-full md:col-span-3 flex mt-1  flex-col shadow-md items-center md:items-start max-w-[1400px] mx-auto rounded-sm p-5 text-black  ">
      <Tabs defaultValue="account" className="w-full">
        <TabsList>
          <TabsTrigger value="account">Success</TabsTrigger>
          <TabsTrigger value="password">Pending</TabsTrigger>
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
                  <div key={index} className='flex flex-col p-4 border-2 rounded-lg group hover:shadow-md'>
                    <div className=" flex items-center space-x-4 mb-4">
                      {/* Community Image */}
                      <img
                        src={activity.community_image}
                        alt={`${activity.community_name} image`}
                        className="w-16 h-16 rounded-full"
                      />
                      {/* Activity Details */}
                      <div>
                        <h3 className="text-lg font-semibold">
                          {activity.community_name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {activity.xrd_spent_on}
                        </p>
                        <p
                          className={`text-sm font-bold ${
                            activity.xrd_spent < 0
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
                    <Separator/>
                    <div className='mt-4'>
                        <Button >
                          <Link
                            to={`/community/detail/${activity.community_id}`}
                          >
                            View Community
                          </Link>
                        </Button>{' '}
                        <Button >
                          <Link
                            to={`https://stokenet-dashboard.radixdlt.com/transaction/${activity.tx_hash}/summary`}
                            target='_blank'
                          >
                            View Transaction
                          </Link>
                        </Button>
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
                    className="p-4 border-2 rounded-lg group overflow-hidden flex flex-col space-y-4"
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
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Creator:</span>{' '}
                        {activity.creator}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Event Type:</span>{' '}
                        {activity.event_type}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Error:</span>{' '}
                        {activity.error}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Transaction Hash:</span>{' '}
                        {activity.tx_hash}
                      </p>
                      <p className="text-sm text-gray-400">
                        <span className="font-semibold">Date:</span>{' '}
                        {new Date(activity.date).toLocaleString()}
                      </p>
                    </div>
                    <Button className="w-40">
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
    </Card>
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
