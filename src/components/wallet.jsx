// import React from 'react'
// import { Navigate } from 'react-router-dom'
// import authStore from '../stores/authStore.tsx'

// export default function wallet() {
//   const s = authStore()

//   if (s.loggedIn) return <Navigate to="/" />

//   return (
//     <div>
//       {s.address === '' ? (
//         <>
//           <button onClick={s.connectWallet}>Connect wallet</button>
//         </>
//       ) : (
//         <>
//           <button onClick={s.signin}>Sign in</button>
//         </>
//       )}
//     </div>
//   )
// }


import React from 'react';
import '../styles/wallet.css'; // Import your CSS file

function App() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission if needed
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <section onSubmit={handleSubmit} className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Log in to your account</h2>

        <button
          id="connectWalletBtn"
          className="button"
        >
          Connect Wallet
        </button>

        <button
          id="siweBtn"
          className="button"
        >
          Sign in with Ethereum
        </button>

        <button
          id="infoBtn"
          className="button"
        >
          Get session information
        </button>
      </section>
    </div>
  );
}

export default App;
