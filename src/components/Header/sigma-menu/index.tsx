import { useState } from "react";
import { getAddresses, TOKEN_DECIMALS, DEFAULD_NETWORK } from "../../../constants";
import { useSelector } from "react-redux";
import { Link, Fade, Popper } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import "./sigma-menu.scss";
import { IReduxState } from "../../../store/slices/state.interface";
import { getTokenUrl } from "../../../helpers";

const addTokenToWallet = (tokenSymbol: string, tokenAddress: string) => async () => {
  const tokenImage = getTokenUrl(tokenSymbol.toLowerCase());

  if (window.ethereum) {
    try {
      await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: TOKEN_DECIMALS,
            image: tokenImage,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
};

function TimeMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const isEthereumAPIAvailable = window.ethereum;

  const networkID = useSelector<IReduxState, number>(state => {
    return (state.app && state.app.networkID) || DEFAULD_NETWORK;
  });

  const addresses = getAddresses(networkID);

  const sSIGMA_ADDRESS = addresses.sSIGMA_ADDRESS;
  const SIGMA_ADDRESS = addresses.SIGMA_ADDRESS;

  const handleClick = (event: any) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);

  return (
    <div className="sigma-menu-root" onMouseEnter={e => handleClick(e)} onMouseLeave={e => handleClick(e)}>
      <div className="sigma-menu-btn">
        <p>BUY SIGMA</p>
      </div>

      <Popper className="sigma-menu-popper" open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={200}>
            <div className="tooltip">
              <Link component={NavLink as any} to="/buy/tjDex" className="tooltip-item">
                <p>Buy on TradeJoe</p>
              </Link>
              {isEthereumAPIAvailable && (
                <div className="add-tokens">
                  <div className="divider" />
                  <p className="add-tokens-title">ADD TOKEN TO WALLET</p>
                  <div className="divider" />
                  <div className="tooltip-item" onClick={addTokenToWallet("SIGMA", SIGMA_ADDRESS)}>
                    <p>SIGMA</p>
                  </div>
                  <div className="tooltip-item" onClick={addTokenToWallet("sSIGMA", sSIGMA_ADDRESS)}>
                    <p>sSIGMA</p>
                  </div>
                </div>
              )}
            </div>
          </Fade>
        )}
      </Popper>
    </div>
  );
}

export default TimeMenu;
