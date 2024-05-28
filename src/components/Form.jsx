import React, { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    height: "",
    weight: "",
    dietaryPreference: "vegetarian",
    healthGoal: "",
    exerciseFrequency: "",
    allergies: "",
  });
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResponse("");
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`, // Replace with your actual API key
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo-0125", // Choose a different model if needed
            messages: [
              {
                role: "user",
                content: `Hello there! To tailor a personalized diet chart for you, I'll need some essential details. Please provide the following information:

Name: ${formData.name}
Age:  ${formData.age}
Height (in cm): ${formData.height}
Weight (in kg): ${formData.weight}
Dietary Preference: Are you vegetarian or non-vegetarian? ${formData.dietaryPreference}
Health Goal: ${formData.healthGoal}
Exercise Frequency: How often do you engage in physical activity? (e.g., daily, 3-4 times a week, rarely) ${formData.exerciseFrequency}
Allergies: Do you have any food allergies or intolerances? If yes, please specify. ${formData.allergies}
Based on this information, I'll create a well-organized diet chart for you. The chart will include details such as food items, portion sizes, protein content (in grams), and calorie count for each item. Don't include this - You can also consult with a nutritionist or dietitian for further guidance. Don't include - Please let me know if you have any specific preferences or dietary restrictions for further customization.`,
              },
            ],
          }),
        }
      );
      const data = await response.json();
      // console.log(data);
      setResponse(data.choices[0].message.content);
    } catch (error) {
      console.error("Error:", error);
      setResponse("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const resetForm = () => {
    setFormData({
      name: "",
      age: "",
      height: "",
      weight: "",
      dietaryPreference: "vegetarian",
      healthGoal: "",
      exerciseFrequency: "",
      allergies: "",
    });
    setResponse("");
  };

  const renderResponse = () => {
    if (!response) return null;
    const responseLines = response
      .split("\n")
      .filter((line) => line.trim() !== "");
    const [intro, ...meals] = responseLines;

    return (
      <div className="mt-4 max-w-md w-full background-color: rgba(255, 0, 0, 0.4) backdrop-blur rounded-lg p-4 md:p-6 shadow-md">
        <h3 className="text-lg font-bold mb-2">Generated Diet Plan:</h3>
        <p className="mb-4">{intro}</p>
        {meals.map((meal, index) => (
          <p key={index} className="mb-2">
            {meal}
          </p>
        ))}
        <div className="text-center">
          <button
            onClick={resetForm}
            className="bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Generate Another Plan
          </button>
        </div>
      </div>
    );
  };
  return (
    <div className="flex justify-center items-center min-h-screen lg:w-96">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
        </div>
      ) : (
        <>
          {!response && (
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-md background-color: rgba(255, 0, 0, 0.4) backdrop-blur rounded-lg p-8 shadow-2xl "
            >
              <h2 className="text-2xl font-bold mb-4 text-center">
                Diet Wallah
              </h2>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-slate-950 font-bold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="age"
                  className="block text-slate-950 font-bold mb-2"
                >
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Your Age"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="height"
                  className="block text-slate-950 font-bold mb-2"
                >
                  Height (in cm)
                </label>
                <input
                  type="number"
                  id="height"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  placeholder="Your Height"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="weight"
                  className="block text-slate-950 font-bold mb-2"
                >
                  Weight (in kg)
                </label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="Your Weight"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="dietaryPreference"
                  className="block text-slate-950 font-bold mb-2"
                >
                  Dietary Preference
                </label>
                <select
                  id="dietaryPreference"
                  name="dietaryPreference"
                  value={formData.dietaryPreference}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                >
                  <option value="vegetarian">Vegetarian</option>
                  <option value="non-vegetarian">Non-Vegetarian</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="healthGoal"
                  className="block text-slate-950 font-bold mb-2"
                >
                  Health Goal
                </label>
                <input
                  type="text"
                  id="healthGoal"
                  name="healthGoal"
                  value={formData.healthGoal}
                  onChange={handleChange}
                  placeholder="Your Health Goal"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="exerciseFrequency"
                  className="block text-slate-950 font-bold mb-2"
                >
                  Exercise Frequency
                </label>
                <input
                  type="text"
                  id="exerciseFrequency"
                  name="exerciseFrequency"
                  value={formData.exerciseFrequency}
                  onChange={handleChange}
                  placeholder="Exercise Frequency"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="allergies"
                  className="block text-slate-950 font-bold mb-2"
                >
                  Allergies (if any)
                </label>
                <textarea
                  id="allergies"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  placeholder="Any allergies?"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-300 hover:bg-blue-500 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
          {renderResponse()}
        </>
      )}
    </div>
  );
};

export default Form;
