import React from "react";
import BarChart from "react-bar-chart";

import "./App.css";

const letters = "abcdefghijklmnopqrstuvwxyz".split("");

export default function App() {
  const [text, setText] = React.useState("");
  const [analysis, setAnalysis] = React.useState({});

  const handleTextAnalyze = () => {
    const splittedText = text.trim().split("");
    const analysisRes = {};
    for (let i = 0; i < splittedText?.length; i++) {
      const currentLetter = splittedText[i].toLowerCase();
      if (!letters.includes(currentLetter)) {
        continue;
      }

      if (!analysisRes[currentLetter]) {
        analysisRes[currentLetter] = 1;
      } else {
        analysisRes[currentLetter] += 1;
      }
    }

    setAnalysis(analysisRes);
  };

  const totalCount = Object.values(analysis)?.reduce(
    (acc, next) => acc + next,
    0
  );

  const getPercentage = (value) => {
    return `${((value / totalCount) * 100).toFixed(2)}%`;
  };

  const sortedAnalysis = Object.keys(analysis).sort();

  const margin = { top: 20, right: 20, bottom: 30, left: 40 };

  const getChartData = () => {
    return sortedAnalysis?.map((letter) => ({
      text: letter,
      value: analysis[letter],
    }));
  };

  return (
    <div className="app">
      <p>Built with ❤️ by AbdulQaadir </p>
      <h1>Paste text here</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "80%", maxWidth: "800px" }}
        rows={10}
      />

      <div>
        <button
          disabled={!text}
          className="submit-btn"
          onClick={handleTextAnalyze}
        >
          Submit
        </button>
      </div>

      <div>
        {sortedAnalysis?.length > 0 && (
          <>
            <table>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Letter</th>
                  <th>No. Occurrence</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                {sortedAnalysis?.map((letter, index) => {
                  const value = analysis[letter];
                  return (
                    <tr key={`asd-${letter}`}>
                      <td>{index + 1}</td>
                      <td>{letter}</td>
                      <td>
                        <strong>{value}</strong>
                      </td>
                      <td>{getPercentage(value)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div>
              Total letter count: <strong>{totalCount}</strong>
            </div>

            <div style={{ width: "100%" }}>
              <BarChart
                ylabel="Letters"
                width={900}
                // width="100%"
                height={500}
                margin={margin}
                data={getChartData()}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
