import { ethers } from "ethers";
import { LpReserveContract } from "../abi";
import { mimSigma } from "./bond";
import { Networks } from "../constants/blockchain";

export async function getMarketPrice(
  networkID: Networks,
  provider: ethers.Signer | ethers.providers.Provider,
): Promise<number> {
  const mimSigmaAddress = mimSigma.getAddressForReserve(networkID);
  const pairContract = new ethers.Contract(mimSigmaAddress, LpReserveContract, provider);
  const reserves = await pairContract.getReserves();
  const marketPrice = reserves[0] / reserves[1];
  return marketPrice;
}
