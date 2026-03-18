import { motion } from 'framer-motion';

const companies = [
  { name: 'Google', style: 'font-sans font-bold tracking-tighter text-2xl' },
  { name: 'Amazon', style: 'font-serif text-2xl' },
  { name: 'Microsoft', style: 'font-sans font-semibold text-2xl' },
  { name: 'Apple', style: 'font-sans font-medium tracking-tight text-2xl' },
  { name: 'Meta', style: 'font-sans font-bold tracking-tight text-2xl' },
  { name: 'Netflix', style: 'font-sans font-black tracking-widest text-[#E50914] uppercase text-xl dark:text-red-500' },
];

export const CompanyLogos = () => {
  return (
    <div className="py-20 bg-slate-50 border-y border-slate-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-wider mb-10">
          Our Students Work At Top Tech Companies
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 lg:gap-24 opacity-60 hover:opacity-100 transition-opacity duration-500">
          {companies.map((company, index) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
            >
              <span className={`${company.style} text-slate-900`}>
                {company.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
