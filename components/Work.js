const projects = [
  { tag: 'Design / Dev', title: 'Luxe Retreat', desc: 'Luxury hospitality brand' },
  { tag: 'E-Commerce', title: 'Urban Threads', desc: 'Fashion marketplace' },
  { tag: 'Full Stack', title: 'FlowSpace', desc: 'Productivity platform' },
]

export default function Work() {
  return (
    <section className="work" id="work">
      <div className="section-header reveal">
        <span className="section-badge glass">Portfolio</span>
        <h2>Recent Work</h2>
        <p>Brands we&apos;ve helped bring to life.</p>
      </div>

      <div className="work-grid">
        {projects.map((p, i) => (
          <div key={i} className="work-item glass reveal">
            <div className="work-overlay" />
            <div className="work-info">
              <span className="work-tag">{p.tag}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
