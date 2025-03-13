import ReactMarkdown from 'react-markdown';

const markdownContent = `\n\
| Wave  | Retracement Levels | Extension Levels |\n\
|-------|-------------------|-----------------|\n\
| Wave 1 | Typically no retracement | Can extend to 1.618 or more |\n\
| Wave 2 | 0.5 - 0.618 (sometimes 0.786) | N/A |\n\
| Wave 3 | Rarely retraces much | 1.618 - 2.618 (or even 4.236) |\n\
| Wave 4 | 0.236 - 0.382 (rarely 0.5) | N/A |\n\
| Wave 5 | 0.382 - 0.618 of Wave 4 | 0.618 - 1.618 of Wave 1 |\n\
| Wave A | 0.5 - 0.618 of previous move | Can extend to 1.0 - 1.382 |\n\
| Wave B | 0.382 - 0.886 of Wave A | Usually does not extend |\n\
| Wave C | 1.0 - 1.618 of Wave A | Can reach 2.618 in strong trends |\n\
`;

export default function MarkdownTable() {
  return (
    <div className='prose max-w-full'>
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
    </div>
  );
}
