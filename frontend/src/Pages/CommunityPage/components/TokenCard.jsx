import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useAccount } from '@/AccountContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSendTransaction } from '@/hooks/useSendTransaction';
import { toast } from 'sonner';
import useCustomAlertStore from '@/store/customAlertStore';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Label as Label2, Pie, PieChart } from "recharts"
import { Button } from '@/components/ui/button';


const TokenCard = ({ data, onSuccess }) => {
  const [openSellModal, setSellModal] = useState(false);
  const [openBuyModal, setBuyModal] = useState(false);
  const [tokenToSell, setTokenToSell] = useState(0);
  const sendTransaction = useSendTransaction()
  const { setOpen, setText } = useCustomAlertStore()


  const [token, setToken] = useState(0);

  const [loading, setLoading] = useState(false)
  const { accounts } = useAccount()
  const params = useParams()


  const handleSellToken = async () => {
    const data = {
      community_id: params.id,
      userAddress: accounts[0].address,
      tokenSupply: tokenToSell,
    }

    setLoading(true)

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL
        }/manifest/build/sell_token/token_weighted_dao`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      const responseData =
        typeof response.data === 'string'
          ? response.data.trim()
          : JSON.stringify(response.data)

      console.log('Response:', responseData)

      const { receipt } = await sendTransaction(responseData)

      const txId = receipt?.transaction?.intent_hash

      if (txId) {
        try {
          const submitResponse = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/submit-tx`,
            {
              tx_id: txId,
              user_address: accounts[0].address,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )

          console.log('Submit Transaction Response:', submitResponse.data)
          toast.success('Withdraw Request Sign Successfully!')
          setText('Token Sold')
          setOpen(true)
          setSellModal(false)
          setTokenToSell(0)
        } catch (submitError) {
          console.error('Error submitting transaction:', submitError)
          toast.error('Failed to submit transaction.')
          setTokenToSell(0)
        }
      } else {
        console.error('Transaction ID not found in receipt:', receipt)
        toast.error('Transaction failed. Please try again.')
        setTokenToSell(0)
      }
    } catch (error) {
      console.error('Error selling token:', error.response.data.detail)

      // Handle specific error cases
      if (error.response.data.detail === 'not a community participant') {
        setText('Please join the community')
        setOpen(true)
        setTokenToSell(0)
        return
      }

      toast.error('Something went wrong while selling tokens.')
    } finally {
      setLoading(false)
      setTokenToSell(0)
    }
  }
  const handleBuyToken = async () => {
    const data = {
      community_id: params.id,
      userAddress: accounts[0].address,
      tokenSupply: token,
    }
    setLoading(true)

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL
        }/manifest/build/buy_token/token_weighted_dao`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      const responseData =
        typeof response.data === 'string'
          ? response.data.trim()
          : JSON.stringify(response.data)

      console.log('Response:', responseData)


      const { receipt } = await sendTransaction(responseData)

      const txId = receipt?.transaction?.intent_hash

      if (txId) {
        try {
          const submitResponse = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/submit-tx`,
            {
              tx_id: txId,
              user_address: accounts[0].address,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )

          console.log('Submit Transaction Response:', submitResponse.data)

          toast.success('Token Bought Successfully!')
          setText('Token Bought')
          setOpen(true)
          setBuyModal(false)
          onSuccess()
        } catch (submitError) {
          console.error('Error submitting transaction:', submitError)
          toast.error('Failed to submit transaction.')
        }
      } else {
        console.error('Transaction ID not found in receipt:', receipt)
        toast.error('Transaction failed. Please try again.')
      }
    } catch (error) {
      console.error('Error buying token:', error.response.data.detail)
      if (error.response.data.detail === 'not a community participant') {
        setText('Please join the community')
        setOpen(true)
        return
      }
      toast.error('Something went wrong while buying tokens.')
    } finally {
      // Ensure loading is stopped regardless of success or failure
      setLoading(false)
    }
  }

  const chartData = [
    {
      browser: "Total Token",
      visitors: data.total_token - data.token_bought,
      fill: "#CBB2F0", // light purple
    },
    {
      browser: "Token Bought",
      visitors: data.token_bought,
      fill: "#9268E4", // slightly darker purple
    },
  ]

  const chartConfig = {
    "Total Token": {
      label: `Remaining Token  ${data.total_token - data.token_bought}`,
      color: "#CBB2F0",
    },
    "Token Bought": {
      label: `Token Bought  ${data.token_bought}`,
      color: "#9268E4",
    },
  }


  if (!data) return null;

  console.log(typeof (data.total_token), "fsdi");

  return (
    <div className="bg-[rgba(169,126,255,0.08)] rounded-[10px] border-solid border-[#5228A4] border pt-[13px] pr-[25px] pb-[13px] pl-[25px] shrink-0 min-h-[345px] relative overflow-hidden backdrop-blur-[6.7px]">

      <div className="bg-[#39246b] px-[13px] flex items-center justify-between w-full h-[63px]  absolute left-0 top-0">
        <div className="text-white text-2xl font-medium">{data.name}</div>
        <div className="flex gap-[5px]">
          {data.total_token > 0 && data.token_bought > 0 && (
            <div>
              <Dialog open={openSellModal} onOpenChange={setSellModal}>
                <DialogTrigger asChild>
                  <Button variant="brand" >Sell Token</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-[rgba(169,126,255,0.34)] backdrop-blur-md text-white  border-[1px] border-brand3 ">
                  <DialogHeader>
                    <DialogTitle>Sell Token</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 text-white items-center gap-4">
                      <Label htmlFor="sell-token" className="text-right">
                        Token
                      </Label>
                      <Input
                        id="sell-token"
                        className="col-span-3"
                        placeholder="How many tokens to sell"
                        type="number"
                        value={tokenToSell}
                        onChange={(e) => setTokenToSell(e.target.value)}
                        required
                        min={0}
                        max={data.token_bought}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    {loading ? (
                      <Button  variant="brand" disabled>
                        Selling...
                      </Button>
                    ) : (
                      <Button 
                        variant="brand"
                        onClick={() => handleSellToken(tokenToSell)}
                        disabled={!tokenToSell || tokenToSell <= 0}
                      >
                        Sell Token
                      </Button>
                    )}
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}


          {data.total_token > data.token_bought && (
            <div>
              <Dialog open={openBuyModal} onOpenChange={setBuyModal}>
                <DialogTrigger asChild>
                  <button className="rounded-[26px] py-2 px-[15px] bg-gradient-to-b from-[rgba(192,161,255,1)] to-[rgba(130,69,255,1)] shadow-inner text-black text-[14px] leading-5 font-medium" >Buy Token</button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-[rgba(169,126,255,0.34)] backdrop-blur-md text-white  border-[1px] border-brand3  ">
                  <DialogHeader>
                    <DialogTitle>Buy Token</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Token
                      </Label>
                      <Input
                        id="name"
                        className="col-span-3"
                        placeholder="How many tokens to buy"
                        type="number"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        required
                        min={0}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    {loading ? (
                      <Button variant="brand" disabled>
                        Buying...
                      </Button>
                    ) : (
                      <Button variant="brand" 
                        onClick={handleBuyToken}
                        disabled={!token}
                      >
                        Buy Token
                      </Button>
                    )}
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}

        </div>
      </div>


      <div className="flex flex-col gap-[25px] items-start justify-start mt-20 ">

        <div className="flex items-center gap-[26px] w-full">
          <div className="rounded-full w-[45px] h-[45px] overflow-hidden">
            <img
              className="w-[50.16px] h-[45px] object-cover"
              src="/radix.webp"
              alt="Token Icon"
            />
          </div>
          <div className="text-white text-4xl font-medium">{data.total_token} Tokens</div>
        </div>


        <div className="w-full text-left">
          <table className="table-auto w-full text-lg">
            <tbody className="text-white">
              <tr>
                <td className=" pr-4 text-purple-400 uppercase font-medium">Token Price:</td>
                <td className="">{data.token_price}</td>
              </tr>
              <tr>
                <td className=" pr-4 text-purple-400 uppercase font-medium">Token Buy Back Price:</td>
                <td className="">{data.token_buy_back_price}</td>
              </tr>
              <tr>
                <td className=" pr-4 text-purple-400 uppercase font-medium">Token Price in USD:</td>
                <td className="">{(Math.round(data.token_price_in_usd * 10000) / 10000).toFixed(4)} $</td>
              </tr>
              <tr>
                <td className=" pr-4 text-purple-400 uppercase font-medium">Token Buy Back Price in USD:</td>
                <td className="">
                  {(Math.round(data.token_buy_back_price_in_usd * 10000) / 10000).toFixed(4)} $
                </td>
              </tr>
            </tbody>
          </table>
        </div>



      </div>
      {data && <div className="mt-10 ">
        <div className="flex-1 pb-0 ">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[300px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="browser"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label2
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-white text-xl font-bold "
                          >
                            {data.total_token ? data.total_token.toLocaleString() : '0'}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Total Tokens
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </div>



      </div>}
    </div>
  );
};
TokenCard.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    total_token: PropTypes.number.isRequired,
    token_bought: PropTypes.number.isRequired,
    token_price: PropTypes.number.isRequired,
    token_buy_back_price: PropTypes.number.isRequired,
    token_price_in_usd: PropTypes.number.isRequired,
    token_buy_back_price_in_usd: PropTypes.number.isRequired,
  }).isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default TokenCard;
