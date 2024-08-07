import { useState, useEffect } from "react";
import { Cat, Heart, Info, Paw, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const catBreeds = [
  { name: "Siamese", origin: "Thailand", temperament: "Vocal, Intelligent, Social", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg" },
  { name: "Persian", origin: "Iran", temperament: "Gentle, Quiet, Dignified", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg" },
  { name: "Maine Coon", origin: "United States", temperament: "Friendly, Playful, Gentle", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Maine_Coon_cat_by_Tomitheos.JPG" },
  { name: "British Shorthair", origin: "United Kingdom", temperament: "Calm, Patient, Intelligent", image: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Britishblue.jpg" },
  { name: "Sphynx", origin: "Canada", temperament: "Energetic, Mischievous, Friendly", image: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Sphinx2_July_2006.jpg" },
];

const CatBreedCard = ({ breed }) => (
  <Card className="mb-4 overflow-hidden">
    <img src={breed.image} alt={breed.name} className="w-full h-48 object-cover" />
    <CardHeader>
      <CardTitle>{breed.name}</CardTitle>
      <CardDescription>Origin: {breed.origin}</CardDescription>
    </CardHeader>
    <CardContent>
      <p><strong>Temperament:</strong> {breed.temperament}</p>
    </CardContent>
    <CardFooter>
      <Button variant="outline" className="w-full">
        <Paw className="mr-2 h-4 w-4" /> Learn More
      </Button>
    </CardFooter>
  </Card>
);

const FactCarousel = () => {
  const facts = [
    "Cats sleep for 70% of their lives",
    "A group of cats is called a clowder",
    "Cats can't taste sweetness",
    "A cat's nose print is unique, like a human's fingerprint",
    "Cats can jump up to 6 times their length",
  ];

  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {facts.map((fact, index) => (
          <CarouselItem key={index}>
            <Card>
              <CardContent className="flex items-center justify-center p-6">
                <p className="text-center">{fact}</p>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

const Index = () => {
  const [likes, setLikes] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [progress, setProgress] = useState(13);

  const catImages = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/4/4d/Cat_November_2010-1a.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg/1280px-Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg",
  ];

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % catImages.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          className="text-6xl font-bold mb-8 flex items-center justify-center text-purple-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Cat className="mr-4 h-12 w-12" /> Feline Fascination
        </motion.h1>
        
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={catImages[currentImageIndex]}
              alt="A cute cat"
              className="mx-auto object-cover w-full h-[500px] rounded-lg shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
          <Button 
            className="absolute bottom-4 right-4 bg-white/50 hover:bg-white/75"
            onClick={nextImage}
          >
            Next Image
          </Button>
        </motion.div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <p className="text-xl text-gray-700 mb-4">
              Cats are fascinating creatures that have been domesticated for thousands of years. They are known for their independence, agility, and affectionate nature.
            </p>
            <div className="flex justify-center items-center">
              <Button 
                variant="outline" 
                className="flex items-center" 
                onClick={() => setLikes(likes + 1)}
              >
                <Heart className="mr-2" fill={likes > 0 ? "red" : "none"} color={likes > 0 ? "red" : "currentColor"} /> Like
              </Button>
              <span className="ml-2 text-lg font-semibold">{likes}</span>
            </div>
          </CardContent>
        </Card>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Cat Popularity</h2>
          <Progress value={progress} className="w-full" />
          <p className="text-center mt-2">Cats are loved by {progress}% of people worldwide!</p>
        </div>

        <Tabs defaultValue="characteristics" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="characteristics">Characteristics</TabsTrigger>
            <TabsTrigger value="breeds">Popular Breeds</TabsTrigger>
          </TabsList>
          <TabsContent value="characteristics">
            <Card>
              <CardHeader>
                <CardTitle>Characteristics of Cats</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-none space-y-2">
                  {["Excellent hunters with sharp claws and teeth", 
                    "Flexible bodies and quick reflexes", 
                    "Keen senses, especially hearing and night vision", 
                    "Communicate through vocalizations, body language, and scent"].map((trait, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-center"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Badge variant="secondary" className="mr-2">{index + 1}</Badge>
                      {trait}
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="breeds">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {catBreeds.map((breed, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <CatBreedCard breed={breed} />
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Fun Cat Facts</h2>
          <FactCarousel />
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" className="w-full">
                <Star className="mr-2" /> Cat Trivia
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>A cat's purr vibrates at a frequency of 25 to 150 Hz, which is beneficial for bone density and healing!</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default Index;
