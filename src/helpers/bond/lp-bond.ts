import { Contract, ContractInterface, ethers } from "ethers";
import { Bond, BondOpts } from "./bond";
import { BondType } from "./constants";
import { Networks } from "../../constants/blockchain";
import { StaticJsonRpcProvider } from "@ethersproject/providers";
import { getBondCalculator } from "../bond-calculator";
import { getAddresses } from "../../constants/addresses";
import { abi as ERC20Contract } from "../../abi/tokens/MimContract.json";

export interface LPBondOpts extends BondOpts {
  readonly reserveContractAbi: ContractInterface;
  readonly lpUrl: string;
  readonly name: string;
}

export class LPBond extends Bond {
  readonly isLP = true;
  readonly lpUrl: string;
  readonly reserveContractAbi: ContractInterface;
  readonly displayUnits: string;
  readonly name: string;

  constructor(lpBondOpts: LPBondOpts) {
    super(BondType.LP, lpBondOpts);

    this.lpUrl = lpBondOpts.lpUrl;
    this.reserveContractAbi = lpBondOpts.reserveContractAbi;
    this.name = lpBondOpts.name;
    this.displayUnits = "LP";
  }

  async getTreasuryBalance(networkID: Networks, provider: StaticJsonRpcProvider) {
    const addresses = getAddresses(networkID);

    const token = this.getContractForReserve(networkID, provider);
    const tokenAddress = this.getAddressForReserve(networkID);
    const bondCalculator = getBondCalculator(networkID, provider, this.name);
    const tokenAmount = await token.balanceOf(addresses.TREASURY_ADDRESS);
    const valuation = await bondCalculator.valuation(tokenAddress, tokenAmount);
    const markdown = await bondCalculator.markdown(tokenAddress);

    const token1: string = await token.token1();
    const token1Contract = new ethers.Contract(token1, ERC20Contract, provider);
    const token1Decimals = await token1Contract.decimals();

    const token0: string = await token.token0();
    const token0Contract = new ethers.Contract(token0, ERC20Contract, provider);
    const token0Decimals = await token0Contract.decimals();

    const isSigma = token1.toLowerCase() === addresses.SIGMA_ADDRESS.toLowerCase();
    var tokenUSD;

    if (isSigma) {
      tokenUSD = (valuation / Math.pow(10, 9)) * (markdown / Math.pow(10, token0Decimals));
    } else {
      tokenUSD = (valuation / Math.pow(10, 9)) * (markdown / Math.pow(10, token1Decimals));
    }

    return tokenUSD;
  }

  public getTokenAmount(networkID: Networks, provider: StaticJsonRpcProvider) {
    return this.getReserves(networkID, provider, true);
  }

  public getSigmaAmount(networkID: Networks, provider: StaticJsonRpcProvider) {
    return this.getReserves(networkID, provider, false);
  }

  private async getReserves(networkID: Networks, provider: StaticJsonRpcProvider, isToken: boolean): Promise<number> {
    const addresses = getAddresses(networkID);

    const token = this.getContractForReserve(networkID, provider);

    let [reserve0, reserve1] = await token.getReserves();

    const token1: string = await token.token1();

    const isSigma = token1.toLowerCase() === addresses.SIGMA_ADDRESS.toLowerCase();

    return isToken
      ? this.toTokenDecimal(false, isSigma ? reserve0 : reserve1) //, isSigma ? Number(token0Decimals) : Number(token1Decimals))
      : this.toTokenDecimal(true, isSigma ? reserve1 : reserve0); //, isSigma ? Number(token1Decimals) : Number(token0Decimals));
  }

  private toTokenDecimal(isSigma: boolean, reserve: number) {
    //, decimals: number) {
    return isSigma ? reserve / Math.pow(10, 9) : reserve / Math.pow(10, 18);
  }
}

// These are special bonds that have different valuation methods
export interface CustomLPBondOpts extends LPBondOpts {}

export class CustomLPBond extends LPBond {
  constructor(customBondOpts: CustomLPBondOpts) {
    super(customBondOpts);

    this.getTreasuryBalance = async (networkID: Networks, provider: StaticJsonRpcProvider) => {
      const tokenAmount = await super.getTreasuryBalance(networkID, provider);
      const tokenPrice = this.getTokenPrice();

      return tokenAmount * tokenPrice;
    };

    this.getTokenAmount = async (networkID: Networks, provider: StaticJsonRpcProvider) => {
      const tokenAmount = await super.getTokenAmount(networkID, provider);
      const tokenPrice = this.getTokenPrice();

      return tokenAmount * tokenPrice;
    };
  }
}
