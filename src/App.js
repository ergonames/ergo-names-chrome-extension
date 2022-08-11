import { useState } from "react";
import { resolve_ergoname } from "ergonames";

function App() {
  const [ergoName, setErgoName] = useState("~balb");
  const [address, setAddress] = useState("");
  const [resolved, setResolved] = useState(false);

  async function handle_resolve() {
    console.log(ergoName);
    let resolved_address = await resolve_ergoname(ergoName);
    console.log(resolved_address);
    if (resolved_address == null) {
      setAddress("Not Registered");
      setResolved(true);
      return;
    } else {
      setResolved(true);
      setAddress(resolved_address);
    }
  };

  function onTodoChange(value) {
    setErgoName(value);
    console.log(ergoName)
  }

  if (resolved) {
    return (
      <div className="bg-[#252525] text-[#ff5537] h-screen">
        <h1 className="pt-8 text-2xl text-[#ff5537] text-center font-bold">ErgoNames Resolver</h1>
        <div className="text-center">
          <input onChange={e => onTodoChange(e.target.value)} className="mx-auto mt-4 w-5/6 p-2 border-2 border-[#ff5537] bg-black rounded-lg text-[#ff5537]" type="text" placeholder="Enter an ErgoName" />
          <button onClick={handle_resolve} className="mx-auto mt-4 w-5/6 p-2 border-2 border-[#ff5537] rounded-lg text-white hover:bg-slate-300 hover:text-[#ff5537] duration-300">Resolve</button>
        </div>
        <div className="text-center">
          <button onClick={() => {navigator.clipboard.writeText(address)}} className="mx-auto h-24 mt-4 w-5/6 p-2 bg-black border-2 border-white rounded-lg text-white hover:bg-slate-300 hover:text-slate-800 duration-300 break-all">{address}</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-[#252525] text-[#ff5537] h-screen">
        <h1 className="pt-8 text-2xl text-[#ff5537] text-center font-bold">ErgoNames Resolver</h1>
        <div className="text-center">
          <input onChange={e => onTodoChange(e.target.value)} className="mx-auto mt-4 w-5/6 p-2 border-2 border-[#ff5537] bg-black rounded-lg text-[#ff5537]" type="text" placeholder="Enter an ErgoName" />
          <button onClick={handle_resolve} className="mx-auto mt-4 w-5/6 p-2 border-2 border-[#ff5537] rounded-lg bg-black text-white hover:bg-black hover:text-[#ff5537] duration-300">Resolve</button>
        </div>
      </div>
    );
  }
} 

export default App;
