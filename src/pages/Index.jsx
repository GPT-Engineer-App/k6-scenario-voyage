import { useState, useEffect } from "react";
import { Cat, Heart, Info, Paw, Star, ChevronLeft, ChevronRight, Moon, Sun, Sparkles, Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const catBreeds = [
  { name: "Siamese", origin: "Thailand", temperament: "Vocal, Intelligent, Social", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg" },
  { name: "Persian", origin: "Iran", temperament: "Gentle, Quiet, Dignified", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg" },
  { name: "Maine Coon", origin: "United States", temperament: "Friendly, Playful, Gentle", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Maine_Coon_cat_by_Tomitheos.JPG" },
  { name: "British Shorthair", origin: "United Kingdom", temperament: "Calm, Patient, Intelligent", image: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Britishblue.jpg" },
  { name: "Sphynx", origin: "Canada", temperament: "Energetic, Mischievous, Friendly", image: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Sphinx2_July_2006.jpg" },
];

const CatBreedCard = ({ breed }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Card className="mb-4 overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl">
      <img src={breed.image} alt={breed.name} className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110" />
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{breed.name}</CardTitle>
        <CardDescription className="text-sm text-gray-500">Origin: {breed.origin}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700"><strong>Temperament:</strong> {breed.temperament}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full group">
          <Paw className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" /> Learn More
        </Button>
      </CardFooter>
    </Card>
  </motion.div>
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
    <Carousel className="w-full max-w-md">
      <CarouselContent>
        {facts.map((fact, index) => (
          <CarouselItem key={index}>
            <Card className="bg-gradient-to-r from-purple-400 to-pink-500 text-white">
              <CardContent className="flex items-center justify-center p-8 h-40">
                <motion.p 
                  className="text-center text-lg font-semibold"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {fact}
                </motion.p>
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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [catName, setCatName] = useState("");

  const catImages = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/4/4d/Cat_November_2010-1a.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg/1280px-Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Kittyply_edit1.jpg/1280px-Kittyply_edit1.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Sleeping_cat_on_her_back.jpg/1280px-Sleeping_cat_on_her_back.jpg",
  ];

  const catPopulationData = [
    { year: 2015, population: 530 },
    { year: 2016, population: 552 },
    { year: 2017, population: 580 },
    { year: 2018, population: 600 },
    { year: 2019, population: 625 },
    { year: 2020, population: 650 },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  const changeImage = (direction) => {
    setCurrentImageIndex((prevIndex) => {
      if (direction === 'next') {
        return (prevIndex + 1) % catImages.length;
      } else {
        return prevIndex === 0 ? catImages.length - 1 : prevIndex - 1;
      }
    });
  };

  const handleNameCat = () => {
    const catNames = ["Whiskers", "Luna", "Milo", "Bella", "Oliver", "Lucy", "Leo", "Nala", "Charlie", "Lily"];
    const randomName = catNames[Math.floor(Math.random() * catNames.length)];
    setCatName(randomName);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-b from-purple-100 to-pink-100'} p-8 transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <motion.h1 
            className={`text-6xl font-bold flex items-center ${isDarkMode ? 'text-purple-300' : 'text-purple-800'}`}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Cat className="mr-4 h-12 w-12" /> Feline Fascination
          </motion.h1>
          <div className="flex items-center">
            <Sun className="h-4 w-4 mr-2" />
            <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
            <Moon className="h-4 w-4 ml-2" />
          </div>
        </div>

        {showAlert && (
          <Alert className="mb-4">
            <Sparkles className="h-4 w-4" />
            <AlertTitle>New Cat Named!</AlertTitle>
            <AlertDescription>
              You've named this cat {catName}. What a purr-fect choice!
            </AlertDescription>
          </Alert>
        )}
        
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
            className={`absolute top-1/2 left-4 transform -translate-y-1/2 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white/50 hover:bg-white/75'}`}
            onClick={() => changeImage('prev')}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button 
            className={`absolute top-1/2 right-4 transform -translate-y-1/2 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white/50 hover:bg-white/75'}`}
            onClick={() => changeImage('next')}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
          <Button
            className={`absolute bottom-4 right-4 ${isDarkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-pink-500 hover:bg-pink-600'} text-white`}
            onClick={handleNameCat}
          >
            <Sparkles className="mr-2 h-4 w-4" /> Name this cat
          </Button>
        </motion.div>

        <div className="flex justify-center space-x-2 mb-8">
          {catImages.map((_, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 rounded-full ${currentImageIndex === index ? (isDarkMode ? 'bg-purple-500' : 'bg-pink-500') : 'bg-gray-300'}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>

        <Card className={`mb-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white/80 backdrop-blur-sm'}`}>
          <CardContent className="pt-6">
            <div className="flex items-start mb-4">
              <Avatar className="mr-4">
                <AvatarImage src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/RedCat_8727.jpg/1280px-RedCat_8727.jpg" alt="Cat Avatar" />
                <AvatarFallback>CT</AvatarFallback>
              </Avatar>
              <div>
                <h3 className={`text-2xl font-semibold mb-2 ${isDarkMode ? 'text-purple-300' : 'text-purple-800'}`}>Cat Facts</h3>
                <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Cats are fascinating creatures that have been domesticated for thousands of years. They are known for their independence, agility, and affectionate nature.
                </p>
              </div>
            </div>
            <Separator className="my-4" />
            <motion.div 
              className="flex justify-center items-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button 
                variant="outline" 
                className={`flex items-center ${isDarkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-pink-500 hover:bg-pink-600'} text-white`}
                onClick={() => setLikes(likes + 1)}
              >
                <Heart className="mr-2" fill={likes > 0 ? "white" : "none"} color="white" /> Like
              </Button>
              <span className="ml-2 text-lg font-semibold">{likes} Likes</span>
            </motion.div>
          </CardContent>
        </Card>

        <Card className={`mb-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white/80 backdrop-blur-sm'}`}>
          <CardHeader>
            <CardTitle>Cat Population Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={catPopulationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Line type="monotone" dataKey="population" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Cat Popularity</h2>
          <Progress value={progress} className="w-full h-4 rounded-full" />
          <p className="text-center mt-2 text-lg">Cats are loved by <span className="font-bold text-purple-600">{progress}%</span> of people worldwide!</p>
        </motion.div>

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

        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Fun Cat Facts</h2>
          <FactCarousel />
        </motion.div>

        <Accordion type="single" collapsible className="mb-8">
          <AccordionItem value="item-1">
            <AccordionTrigger>Cat Trivia</AccordionTrigger>
            <AccordionContent>
              <p>A cat's purr vibrates at a frequency of 25 to 150 Hz, which is beneficial for bone density and healing!</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button variant="outline" className={`w-full ${isDarkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gradient-to-r from-purple-400 to-pink-500'} text-white border-none`}>
            <Star className="mr-2" /> More Cat Facts
          </Button>
        </motion.div>

        <footer className="mt-12 text-center">
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            © 2023 Feline Fascination. All rights reserved. Created with <Heart className="inline-block h-4 w-4 text-red-500" /> by cat lovers.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
