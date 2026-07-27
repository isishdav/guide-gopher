-- Create a table for blog posts
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL DEFAULT 'Blog',
  author TEXT NOT NULL DEFAULT 'Admin',
  date TEXT NOT NULL,
  read_time TEXT NOT NULL DEFAULT '5 min read',
  image TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (blog posts are public)
CREATE POLICY "Blog posts are publicly readable" 
ON public.blog_posts 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample blog posts
INSERT INTO public.blog_posts (title, slug, category, author, date, read_time, image, content) VALUES
(
  'How To Improve Payments Performance In Travel & Ticketing',
  'travel-ticketing',
  'Blog',
  'Admin',
  'Sept 2, 2025',
  '5 min read',
  '/images/blog-1.png',
  '<h2 id="no-code-meaning">First of all, what does no-code mean?</h2>
<p>This is basically what you expect to be paid for a day''s work. But sometimes it can be hard to find a good point of reference on which to base a fair rate. As a website developer, it''s common practice to charge an average daily rate.</p>
<p>Many freelancers intentionally lower their prices out of fear of driving potential clients away, but as a result they miss out on excellent professional opportunities.</p>

<h2 id="before-building">Things to have sorted before starting building</h2>
<p>Many freelancers intentionally lower their prices out of fear of driving potential clients away, but as a result they miss out on excellent professional opportunities.</p>

<h2 id="manage-tasks">Calculate the manage your tasks.</h2>
<p>It''s rare as a freelancer to work for one or more clients for an entire month. You''re the boss of your company. As a freelancer, it''s common practice to charge an average daily rate (in France, taux journalier moyen or TJM).</p>
<ol>
  <li>Create a Shopify account</li>
  <li>Create a Collection for your products in Framer</li>
  <li>Create a Collection for your products in Framer</li>
</ol>

<img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1200" alt="Work table" class="rounded-[32px] my-12 w-full aspect-[16/6] object-cover" />

<h2 id="growth-opportunities">Opportunities for learning and growth</h2>
<p>Similarly, time off can be a great opportunity for learning and growth. Depending on your priorities, you could use your time to:</p>
<ul>
  <li>Meet new people</li>
  <li>Visit new places</li>
  <li>Develop new skills</li>
</ul>

<h2 id="conclusions">Conclusions</h2>
<p>Similarly, time off can be a great opportunity for learning and growth. Depending on your priorities, you could use your time to.</p>'
),
(
  'What Are Alternative Payment Methods?',
  'alternative-payments',
  'Blog',
  'Admin',
  'Sept 2, 2025',
  '5 min read',
  '/images/blog-2.png',
  '<h2 id="introduction">Introduction to Alternative Payments</h2>
<p>Alternative payment methods are non-traditional ways of paying for goods and services beyond cash, checks, and credit cards.</p>

<h2 id="types">Types of Alternative Payments</h2>
<p>From digital wallets to buy-now-pay-later services, the landscape of payments continues to evolve.</p>

<h2 id="conclusions">Conclusions</h2>
<p>Understanding these payment methods is crucial for modern businesses.</p>'
),
(
  'How Checkout.com Is Thinking About Agentic Commerce',
  'agentic-commerce',
  'Blog',
  'Admin',
  'Sept 2, 2025',
  '5 min read',
  '/images/blog-3.png',
  '<h2 id="what-is-agentic">What is Agentic Commerce?</h2>
<p>Agentic commerce represents the next evolution in how consumers and businesses interact with payment systems.</p>

<h2 id="future">The Future of Payments</h2>
<p>AI-driven agents will transform how we think about transactions and commerce.</p>

<h2 id="conclusions">Conclusions</h2>
<p>The future of commerce is agentic, and businesses need to prepare now.</p>'
);