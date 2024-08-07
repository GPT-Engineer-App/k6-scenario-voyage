import { useState } from "react";
import { Cat, Heart, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const catBreeds = [
  { name: "Siamese", origin: "Thailand", temperament: "Vocal, Intelligent, Social" },
  { name: "Persian", origin: "Iran", temperament: "Gentle, Quiet, Dignified" },
  { name: "Maine Coon", origin: "United States", temperament: "Friendly, Playful, Gentle" },
  { name: "British Shorthair", origin: "United Kingdom", temperament: "Calm, Patient, Intelligent" },
  { name: "Sphynx", origin: "Canada", temperament: "Energetic, Mischievous, Friendly" },
];

const CatBreedCard = ({ breed }) => (
  <Card className="mb-4">
    <CardHeader>
      <CardTitle>{breed.name}</CardTitle>
      <CardDescription>Origin: {breed.origin}</CardDescription>
    </CardHeader>
    <CardContent>
      <p><strong>Temperament:</strong> {breed.temperament}</p>
    </CardContent>
  </Card>
);

const Index = () => {
  const [likes, setLikes] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          className="text-5xl font-bold mb-6 flex items-center justify-center text-purple-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Cat className="mr-2" /> Feline Fascination
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg"
            alt="A cute cat"
            className="mx-auto object-cover w-full h-[400px] rounded-lg shadow-lg mb-6"
          />
        </motion.div>

        <Card className="mb-6">
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
                <Heart className="mr-2" /> Like
              </Button>
              <span className="ml-2 text-lg font-semibold">{likes}</span>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="characteristics" className="mb-6">
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
                    <li key={index} className="flex items-center">
                      <Badge variant="secondary" className="mr-2">{index + 1}</Badge>
                      {trait}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="breeds">
            {catBreeds.map((breed, index) => (
              <CatBreedCard key={index} breed={breed} />
            ))}
          </TabsContent>
        </Tabs>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" className="w-full">
                <Info className="mr-2" /> Did you know?
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Cats spend 70% of their lives sleeping!</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default Index;
