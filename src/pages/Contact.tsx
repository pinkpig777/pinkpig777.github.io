import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  FolderGit2,
  Link2,
  Mail,
  MapPin,
  MessageSquareShare,
} from 'lucide-react';
import BentoPanel from '../components/BentoPanel';
import SectionHeading from '../components/SectionHeading';

type FloatingFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email';
  multiline?: boolean;
};

function FloatingField({
  id,
  label,
  value,
  onChange,
  type = 'text',
  multiline = false,
}: FloatingFieldProps) {
  const baseClassName =
    'peer w-full rounded-3xl border border-zinc-200/80 bg-white/85 px-4 pb-3 pt-6 text-sm text-zinc-950 outline-none transition focus:border-emerald-500/40 focus:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:focus:border-emerald-400/40';

  return (
    <div className="relative">
      {multiline ? (
        <textarea
          id={id}
          required
          rows={6}
          placeholder=" "
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`${baseClassName} resize-y`}
        />
      ) : (
        <input
          id={id}
          type={type}
          required
          placeholder=" "
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={baseClassName}
        />
      )}

      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-4 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 transition peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-placeholder-shown:font-medium peer-placeholder-shown:tracking-normal peer-focus:top-4 peer-focus:text-xs peer-focus:font-semibold peer-focus:tracking-[0.18em] dark:text-zinc-400"
      >
        {label}
      </label>
    </div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`,
    );
    window.location.href = `mailto:charly729.chiu@gmail.com?subject=${subject}&body=${body}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const contactLinks = [
    {
      label: 'Email',
      value: 'charly729.chiu@gmail.com',
      href: 'mailto:charly729.chiu@gmail.com',
      icon: Mail,
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/charliechiu0729',
      href: 'https://www.linkedin.com/in/charliechiu0729/',
      icon: Link2,
    },
    {
      label: 'GitHub',
      value: 'github.com/pinkpig777',
      href: 'https://github.com/pinkpig777',
      icon: FolderGit2,
    },
  ];

  return (
    <motion.div
      className="w-full space-y-6 lg:space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <SectionHeading
        eyebrow="Get in Touch"
        title="Minimal form, clearer signal, better interaction."
        description="Whether it’s a product idea, AI collaboration, or an engineering opportunity, feel free to reach out."
      />

      <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <motion.div variants={itemVariants} className="space-y-6">
          <BentoPanel className="rounded-[32px] p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
                <MessageSquareShare className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-semibold tracking-[-0.03em] text-zinc-950 dark:text-white">
                  Connect with me
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Prefer direct channels? These are the fastest.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {contactLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group flex items-center justify-between rounded-3xl border border-zinc-200/80 bg-white/80 p-4 transition hover:border-emerald-500/30 hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-emerald-400/30"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-950 text-white transition group-hover:bg-emerald-500 dark:bg-white dark:text-zinc-950 dark:group-hover:bg-emerald-400">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                          {item.label}
                        </p>
                        <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                          {item.value}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-zinc-400 transition group-hover:text-emerald-500 dark:group-hover:text-emerald-400" />
                  </a>
                );
              })}
            </div>
          </BentoPanel>

          <BentoPanel className="rounded-[32px] p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
              Based in
            </p>
            <div className="mt-4 flex items-center gap-3 text-zinc-950 dark:text-white">
              <MapPin className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
              <p className="text-lg font-semibold tracking-[-0.03em]">
                Texas A&amp;M University, United States
              </p>
            </div>
            <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              Open to meaningful engineering work across AI products, backend systems,
              and full-stack applications with real users.
            </p>
          </BentoPanel>
        </motion.div>

        <motion.div variants={itemVariants}>
          <BentoPanel className="rounded-[32px] p-7 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <FloatingField
                id="name"
                label="Name"
                value={formData.name}
                onChange={(name) => setFormData((current) => ({ ...current, name }))}
              />
              <FloatingField
                id="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={(email) => setFormData((current) => ({ ...current, email }))}
              />
              <FloatingField
                id="message"
                label="Message"
                multiline
                value={formData.message}
                onChange={(message) => setFormData((current) => ({ ...current, message }))}
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                Send message
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </form>
          </BentoPanel>
        </motion.div>
      </div>
    </motion.div>
  );
}
