import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      'pk_test_51KxWTEImKPfyMpcSrrqeDVuzfvdANLOOVNqeD9nAJASOVwpIU1zA9cizU8SUihWYXaJposQBLrbjvl2P2gOPHjKf00vVmA2exJ'
    );
  }

  return stripePromise;
};

export default getStripe;
