import React from 'react';
import './AIModelCards.scss';

const AIModelCards = () => {
  const tools = [
    {
      title: "Deep Research",
      description: "Autonomous agent that browses hundreds of sources to provide verified answers for complex queries.",
      image: "/assets/deep_research_card.png",
      badge: "NEW"
    },
    {
      title: "Code Assistant",
      description: "Pair programming with advanced LLMs. Debug, refactor, and write multi-file boilerplate in seconds.",
      image: "/assets/code_assistant_card.png"
    },
    {
      title: "Visual Studio",
      description: "Generative AI for stunning visuals. Create logos, UI components, and realistic renders with simple prompts.",
      image: "/assets/visual_studio_card.png"
    }
  ];

  return (
    <section className="tools-section" id="models">
      <div className="section-header">
        <h2 className="section-title">Powerful AI Tools</h2>
        <a href="#all-tools" className="view-all">View all tools <span className="arrow">→</span></a>
      </div>

      <div className="tools-grid">
        {tools.map((tool, i) => (
          <div key={i} className="tool-card">
            <div className="card-image-wrapper">
              <img src={tool.image} alt={tool.title} className="card-image" />
              {tool.badge && <span className="card-badge">{tool.badge}</span>}
              <div className="card-overlay"></div>
            </div>
            <div className="card-content">
              <h3 className="card-title">{tool.title}</h3>
              <p className="card-description">{tool.description}</p>
            </div>
            <div className="card-glow"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AIModelCards;
