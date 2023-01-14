import { Text, View } from 'native-base'
import React, { useEffect, useState } from 'react';
import { fetchLeagueData } from '../api';
import { ILeague } from '../models/League';

export default function StandingsScreen() {
    const [leagueData, setLeagueData] = useState<ILeague | null>(null);

    useEffect(() => {
        // Fetch the league data
        async function fetchData() {
            const data = await fetchLeagueData();
            setLeagueData(data);
        }
        fetchData();
    }, []);

    // function that will iterate through ITeam stats list of object.

    if (!leagueData) {
        return <Text>Loading...</Text>;
    }

    return (
        <View>
            <Text>Leaderboard</Text>
            <Text>{leagueData.data.name}</Text>
            <Text>Season: {leagueData.data.seasonDisplay}</Text>
            {leagueData.data.standings.map((standing, index) => {
                const teamWins = standing.stats.find(stat => stat.name === 'wins')?.value;
                return <Text key={index}>{index + 1}. {standing.team.displayName} - {teamWins} wins</Text>
            })}
        </View>
    );
}