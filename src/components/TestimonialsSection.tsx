import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote: "VideoAI has transformed how we manage and search through our massive video library. The AI understanding is remarkable.",
      author: "Sarah Chen",
      role: "VP of Engineering",
      company: "MediaStream Inc.",
    },
    {
      quote: "We've reduced our video processing time by 80% while gaining insights we never knew existed in our content.",
      author: "Marcus Johnson",
      role: "CTO",
      company: "ContentFlow",
    },
    {
      quote: "The accuracy and speed of VideoAI's video understanding capabilities have exceeded all our expectations.",
      author: "Elena Rodriguez",
      role: "Head of AI",
      company: "TechVision Labs",
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider text-center mb-12">
          What Our Partners Are Saying
        </p>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <Quote className="w-12 h-12 text-muted-foreground/20 mb-6" />
            
            <blockquote className="text-2xl lg:text-4xl font-medium leading-relaxed mb-8">
              "{testimonials[currentIndex].quote}"
            </blockquote>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-lg">{testimonials[currentIndex].author}</p>
                <p className="text-muted-foreground">
                  {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={prevTestimonial}
                  className="p-3 rounded-full border border-border hover:bg-muted transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="p-3 rounded-full border border-border hover:bg-muted transition-colors"
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
