import { useEffect, useState } from 'react';
import lottery from './lottery';
import web3 from './libs/web3';

function App() {
  const [manager, setManager] = useState('');

  const [currentAccount, setCurrentAccount] = useState('');

  const [players, setPlayers] = useState([]);

  const [balance, setBalance] = useState('');

  const [amount, setAmount] = useState('');

  const [message, setMessage] = useState('');

  async function loadContract() {
    try {
      const [currentAccount, manager, players, balance] = await Promise.all([
        web3.eth.getAccounts(),
        lottery.methods.manager().call(),
        lottery.methods.getPlayers().call(),
        web3.eth.getBalance(lottery.options.address),
      ]);

      setCurrentAccount(currentAccount[0]);

      setManager(manager);

      setPlayers(players);

      setBalance(balance);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadContract();
  }, []);

  async function submitHandler(e) {
    e.preventDefault();

    try {
      setMessage('Waiting on transaction to success...');

      await lottery.methods.enter().send({
        from: currentAccount,
        value: web3.utils.toWei(amount, 'ether'),
      });

      setMessage('You have been entered!');

      setAmount('');
    } catch (error) {
      setMessage('Something went wrong!');
    }
  }

  async function pickWinner() {
    setMessage('Waiting on transaction to success...');

    await lottery.methods.pickWinner().send({ from: manager });

    setMessage('A winner has been picked!');
  }

  console.log({ currentAccount, manager, players, balance });

  return (
    <div className="w-[635px] mx-auto mt-10 flex flex-col gap-3">
      <h1 className=" self-center mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white underline underline-offset-3 decoration-6 decoration-gray-900 dark:decoration-blue-600">
        Lottery Contract
      </h1>

      <div className="flex items-center gap-1">
        <p className="text-gray-500 dark:text-gray-400">
          This contract is managed by
        </p>{' '}
        <blockquote className="text-sm italic font-semibold text-gray-900 dark:text-white">
          <p>{manager}</p>
        </blockquote>
      </div>

      <p className="text-gray-500 dark:text-gray-400">
        There are currently {players.length} people entered, competing to win{' '}
        {web3.utils.fromWei(balance, 'ether')} ether!
      </p>
      <hr />

      <form onSubmit={submitHandler}>
        <h4 className="mb-4 text-sm font-extrabold leading-none tracking-tight text-gray-900 md:text-xl dark:text-white">
          Want to try your luck?
        </h4>

        <div className="mb-6">
          <label
            htmlFor="amount"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Amount of ether to enter
          </label>

          <input
            type="text"
            id="amount"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter amount of ether"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Enter
        </button>
      </form>

      {currentAccount === manager && (
        <>
          <h4 className="mb-4 text-sm font-extrabold leading-none tracking-tight text-gray-900 md:text-xl dark:text-white">
            Ready to pick a winner?
          </h4>

          <button
            onClick={pickWinner}
            type="button"
            className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Pick a winner!
          </button>

          <hr />
        </>
      )}

      {message && (
        <>
          <hr />

          <h5 className="text-xl font-bold dark:text-white">{message}</h5>
        </>
      )}
    </div>
  );
}

export default App;
