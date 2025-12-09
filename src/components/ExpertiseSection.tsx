import { useState } from "react";

const ExpertiseSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  const expertise = [
    {
      number: "01",
      category: "AI & Machine Learning",
      title: "Deep expertise across the full AI stack",
      description: "From foundational ML to cutting-edge LLMs and AI agents. I stay at the forefront of AI research while maintaining practical, production-focused thinking.",
      skills: ["Large Language Models", "AI Agents & Automation", "Computer Vision", "NLP & Embeddings", "MLOps & Deployment"],
    },
    {
      number: "02",
      category: "Knowledge Systems",
      title: "Building intelligent knowledge infrastructure",
      description: "Specializing in knowledge graphs, semantic search, and RAG systems that transform unstructured data into actionable intelligence.",
      skills: ["Knowledge Graphs", "RAG Architecture", "Vector Databases", "Semantic Search", "Data Integration"],
    },
    {
      number: "03",
      category: "Business & Strategy",
      title: "Bridging technology and business value",
      description: "NYU Stern MBA combined with hands-on startup experience. I understand both the technical possibilities and business realities of AI adoption.",
      skills: ["AI Strategy", "Product Development", "Startup Advisory", "Due Diligence", "Team Leadership"],
    },
  ];

  return (
    <section id="expertise" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Expertise
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Where research meets reality
          </h2>
          <p className="text-lg text-muted-foreground">
            12+ years of experience across academia, startups, and enterprise — analyzing nearly 1,000 AI companies along the way.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-12">
          {expertise.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeTab === index
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {item.category}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="max-w-xl">
            <span className="text-6xl lg:text-8xl font-bold text-primary/10 mb-4 block">
              {expertise[activeTab].number}
            </span>
            <h3 className="text-2xl lg:text-4xl font-semibold leading-tight mb-6">
              {expertise[activeTab].title}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {expertise[activeTab].description}
            </p>
          </div>

          <div className="bg-muted/50 rounded-2xl p-8">
            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6">
              Core Skills
            </h4>
            <div className="space-y-4">
              {expertise[activeTab].skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-4 bg-background rounded-xl border border-border"
                >
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
