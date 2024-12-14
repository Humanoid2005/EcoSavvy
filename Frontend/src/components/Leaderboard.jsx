import { Trophy, Medal, Crown, ChevronUp } from 'lucide-react';
import React,{ useState, useEffect } from 'react';
import Navbar from './NavBar';

const LeaderboardsPage = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentUserRank, setCurrentUserRank] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const generateLeaderboard = () => {
      const leaderboard = [];
      for (let i = 0; i < 100; i++) {
        const p1 = {name: "Person"+i,height: Math.floor(Math.random() * 200) + 150,rank: i + 1,isCurrentUser: i === 11,}
        leaderboard.push(p1);
      }
      leaderboard.sort((a, b) => b.height - a.height);
      for (let j = 0; j < 100; j++) {
        leaderboard[j].rank = j + 1;
        if (leaderboard[j].isCurrentUser) {
          setCurrentUserRank(j + 1);
        }
      }
      setLeaderboard(leaderboard);
    };
    generateLeaderboard();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <Trophy className="w-5 h-5 text-[#0d43b9bd] opacity-50" />;
    }
  };

  /*const getEcoComparison = (height) => {
    if (height > 190) return "Taller than 98% of people";
    if (height > 180) return "Taller than 85% of people";
    if (height > 170) return "Above average height";
    if (height > 160) return "Average height";
    return "Below average height";
  };*/

  return (
    <>
        <Navbar isLogged={true} showInfo={true}/>
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-4xl mx-auto p-4 pt-8">
            <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Eco Leaderboard</h1>
            <p className="text-gray-600">See how much you save up against others</p>
            </div>

            <div className="space-y-3">
            {leaderboard.map((item, index) => (
                <div
                key={index}
                className={`transform transition-all duration-200 hover:scale-[1.01] ${
                    item.isCurrentUser
                    ? 'bg-[#6EE7B7] text-white shadow-lg ring-2 ring-[#6EE7B7] ring-opacity-50'
                    : 'bg-white shadow hover:shadow-md'
                } rounded-xl p-4`}
                id={item.isCurrentUser?"current-user":"user"+index}
                >
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-opacity-10 bg-blue-100">
                        {getRankIcon(item.rank)}
                    </div>
                    <div>
                        <div className="flex items-center space-x-2">
                        <span className="font-semibold">
                            {item.isCurrentUser ? 'You' : item.name}
                        </span>
                        {item.rank <= 3 && (
                            <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                            Top {item.rank}
                            </span>
                        )}
                        </div>
                        {/*<div className="text-sm opacity-75">
                        {getEcoComparison(item.height)}
                        </div>*/}
                    </div>
                    </div>
                    <div className="flex items-center space-x-4">
                    <div className="text-2xl font-bold">{item.height}</div>
                    <div className="text-sm opacity-75">#{item.rank}</div>
                    </div>
                </div>
                </div>
            ))}
            </div>

            {currentUserRank >= 9 && scrollPosition < 500 && (
            <div className="fixed bottom-4 left-4 right-4 max-w-4xl mx-auto">
                <div className="bg-[#6EE7B7] text-white p-4 rounded-xl shadow-lg flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <ChevronUp className="animate-bounce" />
                    <div>
                    <div className="font-medium">Your Position</div>
                    <div className="text-sm opacity-75">
                        Rank #{currentUserRank} • {leaderboard.find(item => item.isCurrentUser)?.height}cm
                    </div>
                    </div>
                </div>
                <button 
                    //onClick={() => window.scrollTo({ id:"current-user", behavior: 'smooth' })}
                    onClick={()=>{window.scrollTo()}}
                    className="px-4 py-2 hover:bg-green-600 hover:text-black text-white rounded-lg font-medium bg-[#0D9488] transition-colors"
                >
                    Your Rank
                </button>
                </div>
            </div>
            )}
        </div>
        </div>
    </>
  );
};

export default LeaderboardsPage;