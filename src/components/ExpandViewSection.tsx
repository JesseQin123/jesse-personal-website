import { useState } from "react";

const ExpandViewSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      number: "01",
      title: "People everywhere are moving to video. Our AI sees video like people do.",
    },
    {
      number: "02", 
      title: "No more tags, missed moments or unreachable data. Just human understanding, at AI scale.",
    },
    {
      number: "03",
      title: "This is AI that can see the whole story. This is video intelligence by VideoAI.",
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Expand your view.
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground">
            See beyond the frame and into a multi-sensory world of context, connections, causes and effects.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-12">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === index
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {tab.number}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="max-w-4xl">
          <h3 className="text-2xl lg:text-4xl font-semibold leading-relaxed transition-all duration-500">
            {tabs[activeTab].title}
          </h3>
        </div>
      </div>
    </section>
  );
};

export default ExpandViewSection;
