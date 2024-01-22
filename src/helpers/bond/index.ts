import { Networks } from "../../constants/blockchain";
import { LPBond, CustomLPBond } from "./lp-bond";
import { StableBond, CustomBond } from "./stable-bond";

import MimIcon from "../../assets/tokens/MIM.svg";
import USDCIcon from "../../assets/tokens/USDC.e.png";
import USDCSIGMAIcon from "../../assets/tokens/USDC-SIGMA.png";
import USDTIcon from "../../assets/tokens/USDT.e.png";
import AvaxIcon from "../../assets/tokens/AVAX.svg";
import MimSigmaIcon from "../../assets/tokens/SIGMA-MIM.svg";
import AvaxSigmaIcon from "../../assets/tokens/SIGMA-AVAX.svg";
import BenQiIcon from "../../assets/tokens/QI.png";

import {
  StableBondContract,
  LpBondContract,
  WavaxBondContract,
  StableReserveContract,
  LpReserveContract,
} from "../../abi";

export const mim = new StableBond({
  name: "mim",
  displayName: "MIM",
  bondToken: "MIM",
  bondIconSvg: MimIcon,
  bondContractABI: StableBondContract,
  reserveContractAbi: StableReserveContract,
  networkAddrs: {
    [Networks.AVAX]: {
      bondAddress: "0xB18ab414499E732554f67698d9214d3f5f1DCc73",
      reserveAddress: "0x130966628846BFd36ff31a822705796e8cb8C18D",
    },
  },
  available: false,
});

export const usdc = new StableBond({
  name: "usdc",
  displayName: "USDC",
  bondToken: "USDC",
  bondIconSvg: USDCIcon,
  bondContractABI: StableBondContract,
  reserveContractAbi: StableReserveContract,
  networkAddrs: {
    [Networks.AVAX]: {
      bondAddress: "0x790463505821987709E4C661F9aB56DEf8A6B682",
      reserveAddress: "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664",
    },
  },
  available: false,
});

export const usdt = new StableBond({
  name: "usdt",
  displayName: "USDT",
  bondToken: "USDT",
  bondIconSvg: USDTIcon,
  bondContractABI: StableBondContract,
  reserveContractAbi: StableReserveContract,
  networkAddrs: {
    [Networks.AVAX]: {
      bondAddress: "0x8Ab416d2DC33ed848A2B3FA75293C7E3B16F056e",
      reserveAddress: "0xc7198437980c041c805a1edcba50c1ce5db95118",
    },
  },
  available: true,
});

export const benqi = new CustomBond({
  name: "benqi",
  displayName: "QI",
  bondToken: "QI",
  bondIconSvg: BenQiIcon,
  bondContractABI: StableBondContract,
  reserveContractAbi: StableReserveContract,
  networkAddrs: {
    [Networks.AVAX]: {
      bondAddress: "0x96A03Ff213D47d0556A6Bd454779E59c12722D19",
      reserveAddress: "0x8729438eb15e2c8b576fcc6aecda6a148776c0f5",
    },
  },
  available: true,
});

export const wavax = new CustomBond({
  name: "wavax",
  displayName: "wAVAX",
  bondToken: "AVAX",
  bondIconSvg: AvaxIcon,
  bondContractABI: WavaxBondContract,
  reserveContractAbi: StableReserveContract,
  networkAddrs: {
    [Networks.AVAX]: {
      bondAddress: "0x3a93493e2E486F818672991de6828a27346Ab0Cb",
      reserveAddress: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
    },
  },
  available: true,
});

export const mimSigma = new LPBond({
  name: "mim_time_lp",
  displayName: "SIGMA-MIM JLP",
  bondToken: "MIM",
  bondIconSvg: MimSigmaIcon,
  bondContractABI: LpBondContract,
  reserveContractAbi: LpReserveContract,
  networkAddrs: {
    [Networks.AVAX]: {
      bondAddress: "0xD17Ac52710F77249D39F72bcbc0c3Fa7eefceF84",
      reserveAddress: "0x8b667C1e422c08f9874709939Bc90E71c2BEA167",
    },
  },
  lpUrl:
    "https://www.traderjoexyz.com/#/pool/0x130966628846BFd36ff31a822705796e8cb8C18D/0xb8EF3a190b68175000B74B4160d325FD5024760e",
  available: true,
});

export const usdcSigmaRlp = new LPBond({
  name: "usdc_sigma_lp",
  displayName: "SIGMA-USDC LP",
  bondToken: "USDC",
  bondIconSvg: USDCSIGMAIcon,
  bondContractABI: LpBondContract,
  reserveContractAbi: LpReserveContract,
  networkAddrs: {
    [Networks.AVAX]: {
      bondAddress: "0x845E9E30a5b6c1F3522D1489A2d8B6Cd9381bf19",
      reserveAddress: "0x24bD0F349Da6afE313A5AbffD45fC4D107700ADB",
    },
  },
  lpUrl:
    "https://swap.sigma.farm/#/add/0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664/0xb8EF3a190b68175000B74B4160d325FD5024760e",
  available: false,
});

export const avaxSigma = new CustomLPBond({
  name: "avax_sigma_lp",
  displayName: "SIGMA-AVAX JLP",
  bondToken: "AVAX",
  bondIconSvg: AvaxSigmaIcon,
  bondContractABI: LpBondContract,
  reserveContractAbi: LpReserveContract,
  networkAddrs: {
    [Networks.AVAX]: {
      bondAddress: "0x8a4E5B690EdFa273E59f28BBE2302aCEeCeEFc41",
      reserveAddress: "0xAef4B048a500140bE5F612D43f1bC13DFC987B30",
    },
  },
  lpUrl: "https://www.traderjoexyz.com/#/pool/AVAX/0xb8EF3a190b68175000B74B4160d325FD5024760e",
  available: true,
});

export default [mim, wavax, usdc, usdt];
