import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedinIn } from "react-icons/fa";

// Form validation schema
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(3, { message: "Subject must be at least 3 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/contact", data);
      
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
        variant: "default",
      });
      
      reset();
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "Your message couldn't be sent. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-dark-lighter">
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-64 md:h-96">
          <img 
            src="/images/casual1.jpg" 
            alt="Vincent Kioko on railway tracks" 
            className="w-full h-full object-cover opacity-20 dark:opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-dark-lighter"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative pt-40 md:pt-72">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 flex items-center">
            <span className="text-primary">#</span> Get In Touch
            <div className="h-px bg-light-darker dark:bg-dark flex-grow ml-4"></div>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              <p className="mb-6 text-dark/80 dark:text-light/80">
                I'm currently available for freelance work, remote positions, and interesting projects. 
                Feel free to reach out if you'd like to collaborate or have any questions.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <FaEnvelope className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <a href="mailto:kiokovincent12@gmail.com" className="text-primary hover:underline">
                      kiokovincent12@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <FaPhone className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <a href="tel:+25470318918" className="text-primary hover:underline">
                      +254 70 318 918
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <FaMapMarkerAlt className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Location</h4>
                    <p>Nairobi, Kenya</p>
                    <p className="text-dark/70 dark:text-light/70">Available for remote work worldwide</p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <h4 className="font-medium mb-2">Connect with me</h4>
                  <div className="flex gap-4">
                    <a 
                      href="https://github.com/kiokogit" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="GitHub Profile"
                      className="bg-light-darker dark:bg-dark hover:bg-primary/10 dark:hover:bg-primary/10 p-3 rounded-full text-dark/70 dark:text-light/70 hover:text-primary dark:hover:text-primary transition-colors"
                    >
                      <FaGithub />
                    </a>
                    <a 
                      href="https://linkedin.com/in/kiokogit" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="LinkedIn Profile"
                      className="bg-light-darker dark:bg-dark hover:bg-primary/10 dark:hover:bg-primary/10 p-3 rounded-full text-dark/70 dark:text-light/70 hover:text-primary dark:hover:text-primary transition-colors"
                    >
                      <FaLinkedinIn />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Send Me a Message</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-1 font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className={`w-full px-4 py-2 rounded border ${
                      errors.name 
                        ? "border-red-500 focus:ring-red-500" 
                        : "border-light-darker dark:border-dark focus:ring-primary"
                    } bg-white dark:bg-dark-lighter focus:outline-none focus:ring-2`}
                    placeholder="Your name"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-1 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={`w-full px-4 py-2 rounded border ${
                      errors.email 
                        ? "border-red-500 focus:ring-red-500" 
                        : "border-light-darker dark:border-dark focus:ring-primary"
                    } bg-white dark:bg-dark-lighter focus:outline-none focus:ring-2`}
                    placeholder="your.email@example.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="subject" className="block mb-1 font-medium">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className={`w-full px-4 py-2 rounded border ${
                      errors.subject 
                        ? "border-red-500 focus:ring-red-500" 
                        : "border-light-darker dark:border-dark focus:ring-primary"
                    } bg-white dark:bg-dark-lighter focus:outline-none focus:ring-2`}
                    placeholder="How can I help you?"
                    {...register("subject")}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-1 font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className={`w-full px-4 py-2 rounded border ${
                      errors.message 
                        ? "border-red-500 focus:ring-red-500" 
                        : "border-light-darker dark:border-dark focus:ring-primary"
                    } bg-white dark:bg-dark-lighter focus:outline-none focus:ring-2`}
                    placeholder="Your message here..."
                    {...register("message")}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 bg-primary text-white rounded hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaEnvelope className="mr-2" /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
