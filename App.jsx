import { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function SymptomsAnalyzer() {
  const [symptoms, setSymptoms] = useState('');
  const [place, setPlace] = useState('');
  const [result, setResult] = useState('');
  const [visibleResult, setVisibleResult] = useState('');
  const [loading, setLoading] = useState(false);

  
const handleAnalyze = async () => {
   setLoading(true);
   setResult("");
   setVisibleResult("");
   try {
   const response = await fetch(`http://localhost:8080/api/symptoms?symptoms=${symptoms}&place=${place}`, {
   // Remove 'no-cors' mode
   });
   
   if (!response.ok) {
   throw new Error('Network response was not ok');
   }
  
   const data = await response.text();
   console.log(data);
   setResult(data);
  } catch (error) {
   setResult("An error occurred. Please try again.");
  } finally {
   setLoading(false);
  }
};
  

  useEffect(() => {
    if (result) {
      const timeout = setTimeout(() => {
        setVisibleResult(result);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [result]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 animate-gradient p-4 flex items-center justify-center">
      <Card className="shadow-2xl p-6 w-full max-w-xl bg-white/90">
        <CardContent className="space-y-4">
          <h1 className="text-3xl font-bold text-center text-purple-700">🩺 Symptoms Analyzer</h1>

          <Textarea
            placeholder="Enter your Symptoms (e.g., headache, fever)"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            className="bg-white/70"
          />

          <Input
            placeholder="Enter your location (e.g., Shimoga, Bangalore)"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            className="bg-white/70"
          />

          <Button onClick={handleAnalyze} disabled={loading} className="w-full">
            {loading ? "Analyzing..." : "Analyze"}
          </Button>

          {visibleResult && (
            <motion.div
              className="bg-green-100 border-l-4 border-green-500 p-4 rounded shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-green-800 whitespace-pre-wrap text-lg font-medium">
                {visibleResult}
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
