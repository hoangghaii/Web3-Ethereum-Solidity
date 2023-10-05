import Demo from './components/Demo';
import { EthProvider } from './contexts/EthContext';
import './styles.css';

function App() {
  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <Demo />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
