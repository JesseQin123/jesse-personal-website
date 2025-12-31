import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote: "Jesse helped us avoid a $500K mistake. We were about to buy an enterprise AI platform that would have been completely wrong for our use case. His technical due diligence saved us—and pointed us to a solution that cost 10% as much.",
      author: "VP of Engineering",
      company: "Series B Fintech",
      context: "AI Strategy Engagement",
    },
    {
      quote: "We'd been trying to build a RAG system for 6 months with no success. Jesse came in, redesigned our architecture, and we had something working in 3 weeks. The difference was night and day.",
      author: "CTO",
      company: "Enterprise SaaS",
      context: "Knowledge System Build",
    },
    {
      quote: "As a non-technical founder, I was terrified of making wrong AI decisions. Jesse became my trusted technical partner—he explains things clearly, doesn't oversell, and always focuses on what actually matters for the business.",
      author: "Founder & CEO",
      company: "HealthTech Startup",
      context: "Fractional CTO",
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-12 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider text-center mb-2 md:mb-4">
          What Clients Say
        </p>
        <p className="text-center text-muted-foreground mb-6 md:mb-12 max-w-md mx-auto text-sm md:text-base">
          Names withheld to protect client confidentiality. References available upon request.
        </p>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <Quote className="w-8 h-8 md:w-12 md:h-12 text-primary/20 mb-4 md:mb-6" />

            <blockquote className="text-lg md:text-xl lg:text-3xl font-medium leading-relaxed mb-6 md:mb-8">
              "{testimonials[currentIndex].quote}"
            </blockquote>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-lg">{testimonials[currentIndex].author}</p>
                <p className="text-muted-foreground">
                  {testimonials[currentIndex].company}
                </p>
                <p className="text-sm text-primary mt-1">
                  {testimonials[currentIndex].context}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={prevTestimonial}
                  className="p-3 rounded-full border border-border hover:bg-muted transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="p-3 rounded-full border border-border hover:bg-muted transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? "bg-primary w-6" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
