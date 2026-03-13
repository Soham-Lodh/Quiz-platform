export default function GuidelinesInfo() {
  return (
    <div className="text-left w-full font-sans text-[#222222]">
      
      <p className="font-medium text-xl mb-2">
        Make sure to read the guidelines in details for a happy quizzing time!!!
      </p>

      <h2 className="font-bold text-2xl mb-3">GUIDELINES:</h2>
      
      <ol className="list-decimal pl-6 text-[1.25rem] leading-relaxed space-y-3 font-medium">
        
        <li>
          <strong>No Tab Switching:</strong> Do not switch tabs, open new windows, or minimize the browser. Any attempt to navigate away will be recorded and will result in immediate elimination.
        </li>

        <li>
          <strong>No AI or External Help:</strong> The use of AI tools, search engines, or any unauthorized external resources is strictly prohibited.
        </li>

        <li>
          <strong>Maintain Sincerity:</strong> Complete the quiz honestly and to the best of your abilities. Suspicious activity will be flagged.
        </li>

        <li>
          <strong>General Rules:</strong> Ensure a stable internet connection. Once you proceed, the timer cannot be paused or reset.
        </li>

      </ol>

    </div>
  );
}