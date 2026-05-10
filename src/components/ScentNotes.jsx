const noteGroups = [
  { label: 'Top Notes', key: 'topNotes', desc: 'First impression' },
  { label: 'Heart Notes', key: 'heartNotes', desc: 'The character' },
  { label: 'Base Notes', key: 'baseNotes', desc: 'The memory' },
];

export default function ScentNotes({ topNotes, heartNotes, baseNotes }) {
  const data = { topNotes, heartNotes, baseNotes };

  return (
    <div style={{ borderTop: '1px solid #e8e4dd', borderBottom: '1px solid #e8e4dd', padding: '36px 0' }}>
      <p style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#aaa', marginBottom: 28 }}>Scent Pyramid</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {noteGroups.map(({ label, key, desc }) => (
          <div key={key}>
            <p style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a227', marginBottom: 12 }}>{label}</p>
            <p style={{ fontSize: 10, color: '#bbb', letterSpacing: '0.08em', marginBottom: 12 }}>{desc}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {(data[key] || []).map((note) => (
                <span key={note} style={{ fontSize: 13, color: '#1a1a1a', fontFamily: 'Cormorant Garamond, serif' }}>{note}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
