import React from 'react';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
  } from '@/components/ui/dialog';
  import { Button } from '@/components/ui/button';
  import { Input } from '@/components/ui/input';
  import { Label } from '@/components/ui/label';
  import { useState } from 'react';

const TokenCard = ({  data, handleBuyToken, handleSellToken, loading }) => {
    const [openSellModal, setSellModal] = useState(false);
    const [openBuyModal, setBuyModal] = useState(false);
    const [tokenToSell, setTokenToSell] = useState('');
    const [token, setToken] = useState('');
  
  if (!data) return null;


  return (
    <div className="bg-[rgba(169,126,255,0.08)] rounded-[10px] border-solid border-[#5228A4] border pt-[13px] pr-[25px] pb-[13px] pl-[25px] shrink-0 h-[305px] relative overflow-hidden backdrop-blur-[6.7px]">
     
      <div className="bg-[#39246b] px-[13px] flex items-center justify-between w-full h-[63px] absolute left-0 top-0">
        <div className="text-white text-2xl font-medium">{data.name}</div>
        <div className="flex gap-[5px]">
        {data.total_token > 0 && data.token_bought > 0 && (
        <div>
          <Dialog open={openSellModal} onOpenChange={setSellModal}>
            <DialogTrigger asChild>
              <button className="rounded-[26px] py-2 px-[15px] bg-gradient-to-b from-[rgba(192,161,255,1)] to-[rgba(130,69,255,1)] shadow-inner text-black text-[14px] leading-5 font-medium" variant="radix">Sell Token</button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Sell Token</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
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
                  <button className="rounded-[26px] py-2 px-[15px] bg-gradient-to-b from-[rgba(192,161,255,1)] to-[rgba(130,69,255,1)] shadow-inner text-black text-[14px] leading-5 font-medium" variant="radix" disabled>
                    Selling...
                  </button>
                ) : (
                  <button className="rounded-[26px] py-2 px-[15px] bg-gradient-to-b from-[rgba(192,161,255,1)] to-[rgba(130,69,255,1)] shadow-inner text-black text-[14px] leading-5 font-medium"
                    variant="radix"
                    onClick={() => handleSellToken(tokenToSell)}
                    disabled={!tokenToSell || tokenToSell <= 0}
                  >
                    Sell Token
                  </button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}

      {/* Buy Token Button */}
      {data.total_token > data.token_bought && (
        <div>
          <Dialog open={openBuyModal} onOpenChange={setBuyModal}>
            <DialogTrigger asChild>
              <button className="rounded-[26px] py-2 px-[15px] bg-gradient-to-b from-[rgba(192,161,255,1)] to-[rgba(130,69,255,1)] shadow-inner text-black text-[14px] leading-5 font-medium" variant="radix">Buy Token</button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Buy Token</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="buy-token" className="text-right">
                    Token
                  </Label>
                  <Input
                    id="buy-token"
                    className="col-span-3"
                    placeholder="How many tokens to buy"
                    type="number"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    required
                    min={0}
                    max={data.total_token - data.token_bought}
                  />
                </div>
              </div>
              <DialogFooter>
                {loading ? (
                  <button className="rounded-[26px] py-2 px-[15px] bg-gradient-to-b from-[rgba(192,161,255,1)] to-[rgba(130,69,255,1)] shadow-inner text-black text-[14px] leading-5 font-medium" variant="radix" disabled>
                    Buying...
                  </button>
                ) : (
                  <button className="rounded-[26px] py-2 px-[15px] bg-gradient-to-b from-[rgba(192,161,255,1)] to-[rgba(130,69,255,1)] shadow-inner text-black text-[14px] leading-5 font-medium"
                    variant="radix"
                    onClick={() => handleBuyToken(token)}
                    disabled={!token || token <= 0}
                  >
                    Buy Token
                  </button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}

        </div>
      </div>

      {/* Token Details */}
      <div className="flex flex-col gap-[25px] items-start justify-start w-80 absolute left-[33px] top-[92px]">
        {/* Token Info */}
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

        {/* Pricing Info */}
        <div className="flex flex-col gap-5">
          {/* Token Price */}
          <div className="flex gap-[11px]">
            <div className="text-[#5228A4] text-xl uppercase">Token Price:</div>
            <div className="text-white text-xl">{data.token_price}</div>
          </div>
          {/* Buy Back Price */}
          <div className="flex gap-[11px]">
            <div className="text-[#5228A4] text-xl uppercase">Token Buy Back Price:</div>
            <div className="text-white text-xl">{data.token_buy_back_price}</div>
          </div>
     
          
        </div>
      </div>
    </div>
  );
};

export default TokenCard;
