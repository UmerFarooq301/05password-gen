import { useState, useCallback, useRef } from 'react';
import './App.css';

function App() {
  const [Length, setLength] = useState(0);
  const [numberAllowed, setNumbers] = useState(false);
  const [charAllowed, setCharacters] = useState(false);
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState('');

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*-_+=[]{}~`';
    for (let i = 1; i <= Length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
    checkStrength(pass);
  }, [Length, numberAllowed, charAllowed]);

  const checkStrength = (pass) => {
    if (pass.length < 8) {
      setStrength('Weak');
    } else if (pass.length >= 8 && pass.length < 15) {
      setStrength('Medium');
    } else if (pass.length >= 15) {
      setStrength('Strong');
    }
  };

  const copytoClipboardGenerate = useCallback(() => {
    alert(`Password copied: ${password}`)
    passwordRef.current.select();
    passwordRef.current.setSelectionRange(0, 101);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div className="w-full max-w-lg mx-auto shadow-lg rounded-lg px-6 py-5 my-10 bg-gray-900 text-orange-500 border border-orange-500">
      <h1 className="text-white text-center my-3 text-5xl font-bold uppercase tracking-wider">
        Password Generator
      </h1>

      <div className="flex shadow-lg rounded-lg overflow-hidden mb-4 bg-gray-800 border border-orange-500">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-2 px-3 bg-black text-orange-400 font-mono"
          placeholder="Generated Password"
          readOnly
          ref={passwordRef}
        />
        <button
          className="outline-none bg-orange-600 text-white px-4 py-1 shrink-0 hover:bg-orange-700 font-bold transition-all border-l border-orange-400"
          onClick={copytoClipboardGenerate}
        >
          Copy
        </button>
      </div>

      <div className="text-center text-lg text-white mb-3">
        Strength: <span className="font-bold">{strength}</span>
      </div>

      <button
        className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition-all"
        onClick={passwordGenerator}
      >
        Generate Password
      </button>

      <div className="flex text-sm gap-x-4 justify-between mt-4">
        <div className="flex items-center gap-x-2">
          <input
            type="range"
            min={6}
            max={100}
            value={Length}
            className="cursor-pointer accent-orange-500"
            onChange={(e) => setLength(Number(e.target.value))}
          />
          <label className="text-white font-semibold w-18">Length: {Length}</label>
        </div>

        <div className="flex items-center gap-x-2">
          <input
            type="checkbox"
            id="numberInput"
            checked={numberAllowed}
            className="accent-orange-500"
            onChange={() => setNumbers((prev) => !prev)}
          />
          <label htmlFor="numberInput" className="text-white font-semibold">
            Numbers
          </label>
        </div>

        <div className="flex items-center gap-x-2">
          <input
            type="checkbox"
            id="characterInput"
            checked={charAllowed}
            className="accent-orange-500"
            onChange={() => setCharacters((prev) => !prev)}
          />
          <label htmlFor="characterInput" className="text-white font-semibold w-24">
            Special Chars
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
