import { BrowserRouter as Router, Route } from 'react-router-dom';
import AudioComponent from 'https://nsdr.b-cdn.net/new/1%20-%20NSDR.wav';

function App() {
  return (
    <Router>
      {/* other routes */}
      <Route path="https://nsdr.b-cdn.net/new/1%20-%20NSDR.wav" element={<AudioComponent/>} />
    </Router>
  );
}

export default App;
