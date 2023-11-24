import logo from './logo.svg';
import './App.css';
import InvoiceProcessor from './Components/DataProcessor/InvoiceProcessor';
import { Header } from './Components/Common/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <InvoiceProcessor />
    </div>
  );
}

export default App;
