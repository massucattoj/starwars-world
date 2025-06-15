import Image from "next/image";
import heroStarWars from "../assets/hero_star_wars.png";

const HeroSection = () => {
  return (
    <>
      <div className="mb-8 flex justify-center">
        <Image
          src={heroStarWars}
          alt="Star Wars Hero"
          width={400}
          height={200}
          className="rounded-lg"
          priority
        />
      </div>
      <h2 className="font-orbitron mb-4 text-3xl font-bold md:text-4xl">
        Welcome to a Galaxy Far, Far Away
      </h2>
      <p className="text-lg text-gray-300">
        Embark on an epic journey through the Star Wars universe. Explore the
        legendary films that shaped generations and meet the unforgettable
        characters who brought this galaxy to life.
      </p>
    </>
  );
};

export default HeroSection;
