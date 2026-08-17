import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Our Story
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Closet is a premium fashion brand dedicated to delivering high-quality, minimalist clothing for the modern woman who values elegance, simplicity, and sustainability.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-secondary/50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                We&apos;re committed to creating timeless, premium clothing pieces that empower women to express their authentic selves. Our mission is to provide accessible luxury fashion without compromising on quality or ethical practices.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To become the go-to brand for women who seek elegance, sustainability, and confidence in their wardrobe. We envision a future where premium fashion is accessible to everyone and respects both people and the planet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <h2 className="text-4xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Quality First',
              description: 'We use premium materials and expert craftsmanship in every piece.',
            },
            {
              title: 'Sustainable Fashion',
              description: 'We&apos;re committed to environmentally responsible production methods.',
            },
            {
              title: 'Customer Focused',
              description: 'Your satisfaction and experience is our top priority.',
            },
            {
              title: 'Timeless Design',
              description: 'We create pieces that transcend trends and last for years.',
            },
            {
              title: 'Transparency',
              description: 'We believe in honest communication about our practices and products.',
            },
            {
              title: 'Empowerment',
              description: 'Fashion should make you feel confident and authentic.',
            },
          ].map((value, i) => (
            <div key={i} className="text-center">
              <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-secondary/50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { name: 'Sarah Johnson', role: 'Founder & CEO' },
              { name: 'Emma Davis', role: 'Creative Director' },
              { name: 'Michael Chen', role: 'Chief Operations Officer' },
              { name: 'Lisa Rodriguez', role: 'Head of Sustainability' },
            ].map((member, i) => (
              <div key={i} className="text-center">
                <div className="w-32 h-32 bg-muted rounded-full mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-muted-foreground text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <h2 className="text-4xl font-bold text-center mb-12">Awards & Recognition</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            'Best Sustainable Fashion Brand 2023',
            'Customer Choice Award 2023',
            'Premium Design Excellence Award 2022',
          ].map((award, i) => (
            <div key={i} className="border border-border rounded-lg p-6 text-center">
              <p className="font-semibold">{award}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-foreground text-background py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Join Our Community</h2>
          <p className="text-lg text-background/80 mb-8 max-w-2xl mx-auto">
            Be part of a community of women who value quality, sustainability, and authentic style.
          </p>
          <Link href="/shop">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 h-12">
              Start Shopping
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
