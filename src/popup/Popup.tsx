import {useState} from "react";

function App(){
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const handleSummarise = async()=>{
    setLoading(true);
    setSummary("");

    //chrome types required
    chrome.tabs.query({active: true, currentWindow: true}, (tabs)=>{
      chrome.tabs.sendMessage(
        tabs[0].id!, {action:"summarise"},
        (_response)=> { //might use later for real AI, tsx will ignore _ vars
          setTimeout(()=>{
            setSummary("this is your dummy summary(ai soon enuf...");
            setLoading(false);
          }, 1500);
        }
      );
    });
  };

  return (
    <div className="p-4 w-80 text-gray-900">
      <h1 className="text-xl font-bold text-center mb-3">Summarae</h1>

      <button onClick={handleSummarise}
        disabled={loading}
        className={`w-full py-2 rounded text-white transition ${
          loading ? "bg-gray-400":"bg-indigo-600 hover:bg-indigo-700"
        }`}>

        {loading ? "Summarising..." :"Summarise"}

      </button>

      <div className="mt-4 text-sm whitespace-pre-wrap text-gray-800 min-h-16">
        {loading ? (
          <div className="animate-pulse text-center text-indigo-500">
            ⏳ Reading page...
          </div>
        ) : (
          summary
        )}
      </div>
    </div>
  );
}


export default App;