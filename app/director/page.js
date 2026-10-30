import { getInquiries } from "../../lib/bookings.js";

export const dynamic = "force-dynamic";

export default function DirectorPage() {
  const inquiries = getInquiries();
  const byLanguage = inquiries.reduce((acc, i) => {
    acc[i.language] = (acc[i.language] || 0) + 1;
    return acc;
  }, {});
  const tours = inquiries.filter((i) => i.tourTime);
  const waitlist = inquiries.filter((i) => i.waitlist);
  const handoffs = inquiries.filter((i) => i.handoff);
  const tuitionTotal = tours.reduce((sum, t) => sum + (t.tuitionAtStake || 0), 0);

  if (inquiries.length === 0) {
    return (
      <main>
        <h1>Welcome - Director briefing</h1>
        <p>English briefing only.</p>
        <p>No inquiries yet. No bookings yet.</p>
        <p><a href="/">Back to parent view</a></p>
      </main>
    );
  }

  return (
    <main>
      <h1>Welcome - Director briefing</h1>
      <p>English briefing only.</p>
      <p>Total inquiries: {inquiries.length}</p>
      <h2>Inquiries by language</h2>
      <ul>
        {Object.entries(byLanguage).map(([lang, count]) => (
          <li key={lang}>{lang}: {count}</li>
        ))}
      </ul>
      <h2>Tours booked ({tours.length})</h2>
      {tours.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <ul>
          {tours.map((t) => (
            <li key={t.id}>
              {t.ageGroup} - {t.tourTime} - {t.seatsOpen} seat(s) open - ${t.tuitionAtStake} per month at stake
            </li>
          ))}
        </ul>
      )}
      <p>Total tuition at stake: ${tuitionTotal} per month.</p>
      <h2>Waitlist ({waitlist.length})</h2>
      {waitlist.length === 0 ? (
        <p>No waitlist entries yet.</p>
      ) : (
        <ul>
          {waitlist.map((w) => (
            <li key={w.id}>{w.ageGroup} - {w.language} - {w.question}</li>
          ))}
        </ul>
      )}
      <h2>Handoffs to follow up ({handoffs.length})</h2>
      {handoffs.length === 0 ? (
        <p>No handoffs. All questions were in the FAQ.</p>
      ) : (
        <ul>
          {handoffs.map((h) => (
            <li key={h.id}>{h.language} - {h.question}</li>
          ))}
        </ul>
      )}
      <p><a href="/">Back to parent view</a></p>
    </main>
  );
}
