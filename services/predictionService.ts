
import { Prediction, Category } from '../types/index';

const generateMockPredictions = (): Prediction[] => {
  const categories: Category[] = ['Politics', 'Economy', 'Science', 'Sports', 'Stock Market'];
  const predictions: Prediction[] = [];

  const data: Record<Category, { questions: string[], images: string[] }> = {
    Politics: {
      questions: [
        "Will the proposed Digital India Act be passed in the upcoming Parliament session?",
        "Will India reach a consensus on the 'One Nation, One Election' proposal by 2025?",
        "Will a major state election resulting in a majority for the ruling party occur this quarter?",
        "Will the government announce a new farm policy framework before the next fiscal year?",
        "Will India hold a bilateral summit with its immediate western neighbor before year-end?",
        "Will the Women's Reservation Bill implementation timeline be fast-tracked by 2026?",
        "Will a new union territory be proposed or restructured in North India this year?",
        "Will the national infrastructure pipeline reach 80% completion of its phase 1 targets by Dec?",
        "Will India's diplomatic mission in Canada return to full pre-2023 capacity by Q4?",
        "Will the Lok Sabha witness a major structural reform in its digital voting system this session?"
      ],
      images: ['https://images.unsplash.com/photo-1529107386315-e1a2ed48a620']
    },
    Economy: {
      questions: [
        "Will India's GDP growth rate exceed 7.2% for the current fiscal year?",
        "Will the RBI maintain the current repo rate throughout the next two quarters?",
        "Will India's foreign exchange reserves cross the $650 billion mark by December?",
        "Will the retail inflation (CPI) stay below 4.5% consistently for three months?",
        "Will India and the UK sign the Free Trade Agreement (FTA) by Q3 2024?",
        "Will the fiscal deficit target of 5.1% be met successfully for FY2024-25?",
        "Will India's manufacturing sector contribution to GDP cross 18% by year-end?",
        "Will the Direct Tax collection exceed the budget estimate by more than 10%?",
        "Will at least two more Indian states announce a complete transition to a new pension scheme?",
        "Will the UPI transaction volume exceed 15 billion transactions in a single month this year?"
      ],
      images: ['https://images.unsplash.com/photo-1526304640581-d334cdbbf45e']
    },
    Science: {
      questions: [
        "Will ISRO successfully complete the Gaganyaan TV-D2 test flight by Q4?",
        "Will India's first indigenous 700 MWe nuclear power plant reach full capacity by Dec?",
        "Will a major Indian city announce a fully functional 6G testbed this year?",
        "Will the Aditya-L1 mission discover a major solar phenomenon documented by Jan 2025?",
        "Will India increase its total operational satellite count by 15% before 2025?",
        "Will the National Quantum Mission establish its first regional hub by October?",
        "Will a private Indian aerospace firm launch a satellite into LEO this quarter?",
        "Will the Deep Ocean Mission reach its first 5,000-meter depth milestone this year?",
        "Will India announce a new regulatory framework for commercial generative AI usage?",
        "Will the semi-conductor manufacturing plant in Gujarat begin pilot production by year-end?"
      ],
      images: ['https://images.unsplash.com/photo-1518770660439-4636190af475']
    },
    Sports: {
      questions: [
        "Will India reach the final of the upcoming ICC Champions Trophy?",
        "Will an Indian athlete win at least two gold medals in the next major athletics meet?",
        "Will the Indian Men's Football team break into the top 90 of FIFA rankings this year?",
        "Will a new city be announced as a permanent venue for future IPL play-offs?",
        "Will India host a major international Chess tournament before December?",
        "Will the Pro Kabaddi League viewership see a 20% year-on-year growth this season?",
        "Will an Indian female tennis player reach the top 100 in WTA singles by Dec?",
        "Will India's medal tally in the next Asian Games exceed its previous best of 107?",
        "Will a second Indian city express official interest in hosting the 2036 Olympics?",
        "Will the Indian badminton contingent win at least three BWF World Tour titles this year?"
      ],
      images: ['https://images.unsplash.com/photo-1504450758481-7338eba7524a']
    },
    'Stock Market': {
      questions: [
        "Will the NIFTY 50 index close above the 24,500 level by September end?",
        "Will the SENSEX hit a new all-time high of 82,000 before December 2024?",
        "Will Reliance Industries (RIL) report a 10%+ increase in quarterly net profit this FY?",
        "Will the IT sector index (NIFTY IT) outperform the NIFTY 50 this calendar year?",
        "Will there be more than 15 major IPOs (above ₹500 Cr) in the second half of 2024?",
        "Will HDFC Bank's share price recover to its pre-merger highs by Q4?",
        "Will the NSE implement the T+0 settlement cycle for all stocks by year-end?",
        "Will FII (Foreign Institutional Investors) be net buyers for three consecutive months?",
        "Will a major Indian startup unicorn announce its IPO plans for early 2025 this quarter?",
        "Will the PSU Bank index continue its double-digit growth trend into the next fiscal?"
      ],
      images: ['https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f']
    },
    Culture: {
      questions: [
        "Will an Indian film win an award at the next major international film festival?",
        "Will a major Indian monument receive a new UNESCO heritage status this year?",
        "Will the domestic tourism volume in religious circuits increase by 30% this year?"
      ],
      images: ['https://images.unsplash.com/photo-1524492412937-b28074a5d7da']
    }
  };

  Object.entries(data).forEach(([cat, content]) => {
    content.questions.forEach((q, i) => {
      predictions.push({
        id: `${cat.replace(' ', '_')}_${i}`,
        question: q,
        description: `Analytical forecast for ${cat} trends in the Indian market. Based on current data points and historical performance.`,
        category: cat as Category,
        probability: 40 + Math.floor(Math.random() * 40),
        totalPredictions: 5000 + Math.floor(Math.random() * 20000),
        predictionsLast24h: 100 + Math.floor(Math.random() * 900),
        tags: [cat, 'India', '2024'],
        resolved: false,
        createdAt: new Date(Date.now() - (Math.random() * 30) * 24 * 60 * 60 * 1000),
        expiresAt: new Date(Date.now() + (Math.random() * 180 + 30) * 24 * 60 * 60 * 1000),
        imageUrl: `${content.images[0]}?auto=format&fit=crop&q=80&w=1200`
      });
    });
  });

  return predictions;
};

const MOCK_PREDICTIONS: Prediction[] = generateMockPredictions();

// Store user votes in-memory for the session
const USER_VOTES: Record<string, { probability: number, updatedAt: Date }> = {};

export const predictionService = {
  getPredictions: async (): Promise<Prediction[]> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return MOCK_PREDICTIONS;
  },
  
  getPredictionById: async (id: string): Promise<Prediction | null> => {
    return MOCK_PREDICTIONS.find(p => p.id === id) || null;
  },

  submitPrediction: async (userId: string, predictionId: string, probability: number) => {
    const key = `${userId}:${predictionId}`;
    USER_VOTES[key] = {
      probability,
      updatedAt: new Date()
    };
    console.log('Mock submit/update forecast:', { userId, predictionId, probability });
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true };
  },

  getUserPrediction: (userId: string, predictionId: string) => {
    return USER_VOTES[`${userId}:${predictionId}`] || null;
  }
};
