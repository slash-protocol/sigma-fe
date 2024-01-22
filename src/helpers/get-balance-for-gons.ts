import { ethers } from "ethers";
import { sSigmaTokenContract } from "../abi";
import { Networks } from "../constants/blockchain";
import { getAddresses } from "src/constants/addresses";

export async function getBalanceForGons(
  gons: number,
  networkID: Networks,
  provider: ethers.Signer | ethers.providers.Provider,
): Promise<number> {
  const addresses = getAddresses(networkID);
  const ssigmaContract = new ethers.Contract(addresses.sSIGMA_ADDRESS, sSigmaTokenContract, provider);
  const balanceWithRebases = await ssigmaContract.balanceForGons(gons);
  return balanceWithRebases;
}
