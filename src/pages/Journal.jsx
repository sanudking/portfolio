import "../styles/journal.css";

const entries = [
  {
    date: "Sun, Aug 19",
    text: "Built an agentic AI assistant with LangChain and Tavily for live web access.",
  },
  {
    date: "Sun, Aug 16",
    text: "JavaScript fundamentals, DOM manipulation and WebAssembly basics.",
  },
  {
    date: "Sat, Aug 15",
    text: "Studied the JavaScript event loop with Coder Army and set up ngrok.",
  },
  {
    date: "Fri, Aug 14",
    text: "Learned end-to-end API testing with Postman — HTTP methods, collections, environment variables and test scripts. Practised React useRef and custom CSS layouts.",
  },
  {
    date: "Thu, Aug 13",
    text: "React useRef and reference management.",
  },
  {
    date: "Tue, Aug 11",
    text: "LeetCode arrays and stacks — prefix products, sliding window and heap/priority-queue problems.",
  },
  {
    date: "Mon, Aug 10",
    text: "Explored a custom chess game using python-chess, and practised responsive CSS square layouts.",
  },
  {
    date: "Thu, Aug 6",
    text: (
      <>
        Started learning low-level design from{" "}
        <a
          href="https://www.youtube.com/watch?v=UsNl8kcU4UA&list=PLQEaRBV9gAFvzp6XhcNFpk1WdOcyVo9qT&index=5"
          target="_blank"
          rel="noopener noreferrer"
        >
          Coder Army
        </a>
        .
      </>
    ),
  },
  {
    date: "Wed, Aug 5",
    text: (
      <>
        Completed the{" "}
        <a
          href="https://www.youtube.com/watch?v=Xv-gTGw4i_Y&list=PLQEaRBV9gAFvNWnpaGZOeRbt-CMr6z7t5&index=6"
          target="_blank"
          rel="noopener noreferrer"
        >
          CSS playlist
        </a>{" "}
        from Coder Army and started low-level design the same day.
      </>
    ),
  },
];

function Journal() {
  return (
    <div>
      <header className="page-head">
        <span className="eyebrow">Journal</span>
        <h1 className="page-title">Learning log</h1>
        <p className="page-subtitle">
          A running record of what I study, build and break — mostly so future me
          can see the progress.
        </p>
      </header>

      <div className="timeline">
        {entries.map((entry) => (
          <article key={entry.date} className="entry card">
            <h2>{entry.date}</h2>
            <p>{entry.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Journal;
