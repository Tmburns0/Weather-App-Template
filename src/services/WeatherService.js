const apiKey = import.meta.env.VITE_API_KEY;

export async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    );
    if (!response.ok) {
      throw new Error(`Unable to fetch weather data: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}
