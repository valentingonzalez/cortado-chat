import axios from 'axios';

const API_KEY = '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';

export const getLLMResponse = async (prompt: string) => {
  try {
    const response = await axios.post('/models/gpt2',
      { inputs: prompt },
      { headers: { Authorization: `Bearer ${API_KEY}` } }
    );
    return response.data[0].generated_text;
  } catch(error) {
    console.error('Error fetching LLM response:', error);
    return 'Error fetching response';
  }
};
