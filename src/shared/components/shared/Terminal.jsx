import { useEffect, useRef, useState } from 'react';
import '../../../styles/components/_terminal.scss';

const snippets = [
  [
    { t: 'comment', v: '// sync project state' },
    { t: 'break' },
    { t: 'keyword', v: 'const' },
    { t: 'plain', v: ' project = ' },
    { t: 'func', v: 'await' },
    { t: 'plain', v: ' sync(' },
    { t: 'string', v: "'workspace-01'" },
    { t: 'plain', v: ');' },
    { t: 'break' },
    { t: 'break' },
    { t: 'keyword', v: 'if' },
    { t: 'plain', v: ' (project.' },
    { t: 'func', v: 'hasChanges' },
    { t: 'plain', v: '()) {' },
    { t: 'break' },
    { t: 'plain', v: '  project.' },
    { t: 'func', v: 'commit' },
    { t: 'plain', v: '();' },
    { t: 'break' },
    { t: 'plain', v: '}' },
  ],
  [
    { t: 'comment', v: '// task queue processing' },
    { t: 'break' },
    { t: 'keyword', v: 'function' },
    { t: 'plain', v: ' ' },
    { t: 'func', v: 'processQueue' },
    { t: 'plain', v: '(tasks) {' },
    { t: 'break' },
    { t: 'plain', v: '  ' },
    { t: 'keyword', v: 'return' },
    { t: 'plain', v: ' tasks.' },
    { t: 'func', v: 'filter' },
    { t: 'plain', v: '(t =>' },
    { t: 'break' },
    { t: 'plain', v: '    !t.' },
    { t: 'func', v: 'completed' },
    { t: 'plain', v: ');' },
    { t: 'break' },
    { t: 'plain', v: '}' },
  ],
];

function CodeLine({ token }) {
  if (token.t === 'break') return <br />;
  const className = token.t !== 'plain' ? token.t : undefined;
  return <span className={className}>{token.v}</span>;
}

export default function Terminal({ref}) {
  const [lines, setLines] = useState([]);
  const [showCursor, setShowCursor] = useState(true);
  const snippetIndex = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    function typeSnippet(snippet) {
      let tokenIndex = 0;
      let charIndex = 0;
      const built = [];
      setLines([]);
      setShowCursor(false);

      function step() {
        if (cancelled) return;

        if (tokenIndex >= snippet.length) {
          setShowCursor(true);
          timeoutRef.current = setTimeout(() => {
            snippetIndex.current = (snippetIndex.current + 1) % snippets.length;
            typeSnippet(snippets[snippetIndex.current]);
          }, 2200);
          return;
        }

        const token = snippet[tokenIndex];

        if (token.t === 'break') {
          built.push({ t: 'break' });
          tokenIndex++;
          charIndex = 0;
          setLines([...built]);
          timeoutRef.current = setTimeout(step, 20);
          return;
        }

        charIndex++;
        const partial = { t: token.t, v: token.v.slice(0, charIndex) };
        setLines([...built, partial]);

        if (charIndex >= token.v.length) {
          built.push(partial);
          tokenIndex++;
          charIndex = 0;
        }

        timeoutRef.current = setTimeout(step, 20);
      }

      step();
    }

    typeSnippet(snippets[snippetIndex.current]);

    return () => {
      cancelled = true;
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="terminal" ref={ref} data-amplifier="20">
      <div className="terminal-header">
        <div className="dot dot-red" />
        <div className="dot dot-yellow" />
        <div className="dot dot-green" />
        <div className="terminal-title">workflow.sync</div>
      </div>
      <div className="terminal-body">
        {lines.map((line, i) => (
          <CodeLine key={i} token={line} />
        ))}
        {showCursor && <span className="cursor" />}
      </div>
    </div>
  );
}