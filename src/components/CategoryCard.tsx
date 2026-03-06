import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Department } from "@/data/products";

import catKids from "@/assets/category-kids.jpg";
import catMensCasual from "@/assets/category-mens-casual.jpg";
import catWomensCasual from "@/assets/category-womens-casual.jpg";
import catMensParty from "@/assets/category-mens-party.jpg";
import catWomensParty from "@/assets/category-womens-party.jpg";
import catWedding from "@/assets/category-wedding.jpg";

const imageMap: Record<string, string> = {
  "/category-kids": catKids,
  "/category-mens-casual": catMensCasual,
  "/category-womens-casual": catWomensCasual,
  "/category-mens-party": catMensParty,
  "/category-womens-party": catWomensParty,
  "/category-wedding": catWedding,
};

interface Props {
  department: Department;
  index: number;
}

const CategoryCard = ({ department, index }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Link
        to={`/category/${department.slug}`}
        className="group block relative overflow-hidden rounded-lg aspect-[3/4]"
      >
        <img
          src={imageMap[department.image] || catKids}
          alt={department.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-xl font-display font-semibold text-cream mb-1">
            {department.name}
          </h3>
          <p className="text-cream/70 text-sm font-body">
            {department.description}
          </p>
          <span className="inline-block mt-3 text-gold-light text-xs tracking-[0.2em] uppercase font-medium group-hover:tracking-[0.3em] transition-all duration-300">
            Shop Now →
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
