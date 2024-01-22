import SigmaImg from "../assets/tokens/SIGMA.png";
import sSigmaImg from "../assets/tokens/sSIGMA.png";

function toUrl(tokenPath: string): string {
  const host = window.location.origin;
  return `${host}/${tokenPath}`;
}

export function getTokenUrl(name: string) {
  if (name === "sigma") {
    return toUrl(SigmaImg);
  }

  if (name === "ssigma") {
    return toUrl(sSigmaImg);
  }

  throw Error(`Token url doesn't support: ${name}`);
}
