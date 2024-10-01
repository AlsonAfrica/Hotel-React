import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './Redux/store.jsx'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe('pk_test_51Pwumx07fzn9gsZcHOkGrOiFXrw1LWj5rxbnavl9oO0gPP0Kau3MJp7f2UdqQKY15UCnZE3LgPoWfsUgYD3kZR9500pQH2tJdo')

createRoot(document.getElementById('root')).render(
  <Elements stripe={stripePromise}>
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
 </Elements>
)
