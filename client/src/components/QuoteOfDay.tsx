const quotes = [
  'Consistency beats intensity. Ship small wins every day.',
  'Clean code is not just readable; it is dependable under pressure.',
  'A great developer solves user problems, not only coding problems.',
  'Strong systems come from simple decisions made repeatedly.',
  'Performance is a feature, not an afterthought.',
  'Build first for clarity, then optimize for scale.',
  'Every bug fixed today saves ten support messages tomorrow.',
  'The best portfolio is proof of execution, not just ideas.',
  'Make it work, make it solid, then make it fast.',
  'Good engineering balances speed, quality, and maintainability.',
  'Small refactors today prevent large rewrites later.',
  'Reliable products are built by reliable habits.',
  'Design for users, architect for growth, code for maintainers.',
  'Progress compounds when learning is continuous.',
]

function getDailyIndex(total: number): number {
  const now = new Date()
  const daySeed =
    now.getFullYear() * 1000 +
    (now.getMonth() + 1) * 100 +
    now.getDate() * 7
  return Math.abs(daySeed) % total
}

export function QuoteOfDay() {
  const quote = quotes[getDailyIndex(quotes.length)]

  return (
    <div className="quote-day-card" role="note" aria-label="Quote of the day">
      <p className="quote-day-title">Quote of the Day</p>
      <p className="quote-day-text">{quote}</p>
    </div>
  )
}
